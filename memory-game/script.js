const cards = document.querySelectorAll('.game__card');
const gameBox = document.querySelector('.game__container');
let isFlipped = false;
let isLocked = false;
let firstCard, secondCard;

let move = 0;
let matchCounter = 0;

const overlay =  document.querySelector('.overlay');
const startModal = document.querySelector('.startgame');
const startInput = startModal.querySelector('input');
const startInputBtn = startModal.querySelector('.input-btn');
const startBtn = startModal.querySelector('.startgame__btn');
let username, movesPerGame;

const endModal = document.querySelector('.endgame');
const endText = document.querySelector('.endgame__moves');
const endBtn = document.querySelector('.endgame__btn');

const winAudio = document.querySelector('.audio-gameover');
const clickAudio = document.querySelector('.audio-click');
const goodAudio = document.querySelector('.audio-job');

const table = document.querySelector('.game__score-content');
const tableBody = document.querySelector('.table__content');
const tableSubtitles = document.querySelector('.table__subtitles');
const tableBtn = document.querySelector('.game__score-btn');
const tapleSpecification = document.querySelector('.taple__specification');

//Startgame
startInput.addEventListener('keyup', () => {
    startBtn.disabled = !startInput.value;
});

const startgame = (e) => {
    e.preventDefault();
    shuffle();
    move = 0;
    username = startInput.value;
    overlay.classList.remove('active');
    startModal.classList.remove('active');

    tableBody.innerHTML = highScores
    .map(gamer => {
        return `<tr class="table__row"><td>${gamer.name}</td><td>${gamer.score}</td></tr>`;
    })
    .join('');
};
startBtn.addEventListener('click', startgame);
startInputBtn.onclick = () => startInput.value = '';

//Game
function flipCard() {
    goodAudio.pause();
    clickAudio.currentTime = 0;
    clickAudio.play();

    if (isLocked) return;
    if (this === firstCard) return; //prevent clicking twice the same card
    this.classList.add('flip');

    if (!isFlipped) {
        //first click
        isFlipped = true;
        firstCard = this;
        move++;
        return;
    } 

    //second click
    secondCard = this;
    isLocked = true;
    move++;
    checkForMAtch();
}

const checkForMAtch = () => {
    let isMAtch = firstCard.dataset.image === secondCard.dataset.image;
    isMAtch ? disableCards() : unflipCards();
};

const disableCards = () => {
    clickAudio.pause();
    goodAudio.currentTime = 0;
    goodAudio.play();

    isLocked = true;
    matchCounter++;
    checkDataAtribute();

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    setTimeout(() => {
        if(matchCounter === (cards.length / 2)) endGame();
    }, 3000);
};

const checkDataAtribute = () => {
    let atr = firstCard.dataset.image;
    firstCard.classList.add('matched', `matched--${atr}`);
    secondCard.classList.add('matched', `matched--${atr}`);
};

const unflipCards = () => {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
};

const resetBoard = () => { //reset variables
    [isFlipped, isLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
};

const shuffle = () => {
    cards.forEach(card => {
      let randomOrder = Math.floor(Math.random() * 16);
      card.style.order = randomOrder;
    });
};  /*shuffle function to change card's order*/

cards.forEach(card => card.addEventListener('click', flipCard));

// Endgame
const playAgain = () => {
    // e.preventDefault();
    endModal.classList.remove('active');
    startModal.classList.add('active');
    [isFlipped, isLocked] = [false, false];
    cards.forEach(card => card.classList.remove('flip', 'matched', 'matched--cat', 'matched--cool', 'matched--flower', 'matched--trees', 'matched--heart', 'matched--sun', 'matched--cloud', 'matched--star'));
    cards.forEach(card => card.addEventListener('click', flipCard));
};
endBtn.addEventListener('click', playAgain)


const endGame = () => {
    winAudio.play();
    overlay.classList.add("active");
    endModal.classList.add("active");
    startInput.value = '';
    movesPerGame = move;
    endText.innerHTML = `Game over!\n Moves per game - ${move}.`;
    matchCounter = 0;
};

// Local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const numberOfHighScores = 10;

const saveHighScore = (e) => {
    e.preventDefault();
    const gamer = {
        score: movesPerGame,
        name: username
    };

    highScores.push(gamer);
    highScores.sort((a, b) => a.score - b.score);
    highScores.splice(numberOfHighScores);

    localStorage.setItem('highScores', JSON.stringify(highScores)); //update local storage
};
endBtn.addEventListener('click', saveHighScore);

// Score table
const openTable = () => {
    table.classList.toggle('hidden');
    tapleSpecification.classList.toggle('hidden');
    (tableBtn.innerHTML === 'Close high scores') ? tableBtn.innerHTML = 'Show high scores' : tableBtn.innerHTML = 'Close high scores';
};
tableBtn.addEventListener('click', openTable);


// tableBody.innerHTML = highScores
// .map(gamer => {
//   return `<tr class="table__row"><td>${gamer.name}</td><td>${gamer.score}</td></tr>`;
//   })
// .join('');