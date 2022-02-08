const audio = document.querySelector('.player-audio');
const playBtn = document.querySelector('.info-play');
let isPlay = false;
const animImage = document.querySelector('.player-record');
const player = document.querySelector('.player__container');

let playNum = 0;
const songs = [
    {
        singerName: 'Beyonce',
        songName: 'Don\'t Hurt Yourself',
        songSrc: './assets/audio/beyonce.mp3',
        bg: './assets/img/lemonade.png',
        cover: 'url(./assets/img/lemonade.png)',
    }, 

    {
        singerName: 'Dua Lipa',
        songName: 'Don\'t Start Now',
        songSrc: './assets/audio//assets_audio_dontstartnow.mp3',
        bg: './assets/img/dontstartnow.png',
        cover: 'url(./assets/img/dontstartnow.png)',
    }
];

let prevSong, nextSong;
const prevBtn = document.querySelector('.actions__btn--prev');
const nextBtn = document.querySelector('.actions__btn--next');

const singerName = document.querySelector('.info__singer-name');
const singerSong = document.querySelector('.info__singer-song');
const playerCover = document.querySelector('.player__cover');
const playerBg = document.querySelector('.player-bg');

const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const songCurrentTime = document.querySelector('.progreess-current');
const songDuration = document.querySelector('.progreess-duration');


// Play and pause
function playAudio() {
    if(!isPlay) {
        audio.currentTime = 0;
        animImage.classList.add('active');
        audio.play();
        isPlay = true;
        changeBtnClass()
    }
    else {
        animImage.classList.remove('active');
        audio.pause();
        isPlay = false;
        changeBtnClass()
    }
}

function changeBtnClass() {
    !isPlay ? playBtn.classList.remove('info-pause') : playBtn.classList.add('info-pause');
}

playBtn.addEventListener('click', playAudio);

// Prev and next
function switchSong(playNum) {
    // audio.src = songs[playNum];
    audio.src = songs[playNum].songSrc;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    changeBtnClass();
}

function changeSongImage() {
    singerName.innerHTML = songs[playNum].singerName;
    singerSong.innerHTML = songs[playNum].songName;
    playerCover.style.backgroundImage = songs[playNum].cover;
    playerBg.src = songs[playNum].bg;
}

function playPrev() {
    if (playNum > 0) {
        playNum--; 
        switchSong(playNum); 
    } else { 
        playNum = songs.length - 1; 
        switchSong(playNum); 
    }

    changeSongImage(playNum);
}

function playNext() {
  if (playNum < songs.length - 1) { 
      playNum++; 
      switchSong(playNum); 
    } else {
        playNum = 0; 
        progress.value = '0';
        switchSong(playNum); 
    }

    changeSongImage(playNum);
}

prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);


// Progress and update time

// function updateProgress(event) {
//     const {duration, currentTime} = event.target;
//     const progressPercent = (currentTime / duration) * 100;
//     progressBar.style.width = `${progressPercent}%`;
// }

// audio.addEventListener('timeupdate', updateProgress);

function updateProgress(event) {
    let currentTime = event.target.currentTime;
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    const value = progressBar.value;
    progressBar.style.background = `linear-gradient(to right, royalblue 0%, royalblue ${value}%, #000 ${value}%, #000 100%)`;

    audio.addEventListener('loadeddata', () => {
      // update current time
      let currentMin = Math.floor(currentTime / 60);
      let currentSec = Math.floor(currentTime % 60);
      if (currentSec < 10) currentSec = `0${currentSec}`;      
      songCurrentTime.innerHTML = `${currentMin}:${currentSec}`;
       });
    }

audio.addEventListener('timeupdate', updateProgress);

// Rewind

// function rewind(event) {
//     let width = this.clientWidth;
//     let clickX = event.offsetX;
//     let audioDuration = audio.duration;
//     audio.currentTime = (clickX / width) * audioDuration;
// }

// progress.addEventListener('click', rewind);

function rewind() {
    const value = progressBar.value;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
    progressBar.style.background = `linear-gradient(to right, royalblue 0%, royalblue ${value}%, #000 ${value}%, #000 100%)`;
}

progressBar.addEventListener('change', rewind);



  



