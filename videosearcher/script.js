const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=99fb50d5fb7758f9ab56107bd9fb8bf6';

const urlSearch = 'https://api.themoviedb.org/3/search/movie?api_key=99fb50d5fb7758f9ab56107bd9fb8bf6&query=';

const moviesSection = document.querySelector('.movies__container');

async function getData(link, event) {
    const res = await fetch(link);
    const data = await res.json();
    showData(data);

    if(data.results.length === 0){
      moviesSection.innerHTML = '';
      moviesSection.classList.toggle('centered');
      const noResults = document.createElement('p');
      noResults.classList.add('noresults');
      noResults.innerHTML = 'There is no such a movie. Please, try again!';
      moviesSection.append(noResults);
    }
  }

getData(url);

function showData(data) {
  const moviesContainer = document.querySelector('.movies__container');
  const movies = data.results;

  document.querySelector(".movies__container").innerHTML = ''; /* очистить контейнер*/ 

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const movieCover = document.createElement('div');
    movieCover.classList.add('movie__cover');
    movieCover.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie__info');

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie__header');

    const movieLink = document.createElement('a');
    movieLink.classList.add('movie__link');
    movieLink.href = 'https://www.themoviedb.org/';
    movieLink.innerHTML = `${movie.title}`;

    const movieRating = document.createElement('span');
    movieRating.classList.add('movie__rating');
    movieRating.innerHTML = `${movie.vote_average}`;
    movie.vote_average >= 8 ? movieRating.classList.add('movie__rating--red') : movieRating.classList.add('movie__rating--orange');

    const movieOverview = document.createElement('div');
    movieOverview.classList.add('movie__overview');
    movieOverview.classList.add('overview');

    const overviewTitle = document.createElement('h3');
    overviewTitle.classList.add('overview__title');
    overviewTitle.innerHTML = 'Overview';

    const overviewDescr = document.createElement('p');
    overviewDescr.classList.add('overview__descr');
    overviewDescr.innerHTML = `${movie.overview}`;

    moviesContainer.append(movieElement);
    movieElement.append(movieCover);
    movieCover.after(movieInfo);
    movieInfo.append(movieTitle);
    movieTitle.append(movieLink);
    movieTitle.after(movieRating);
    movieInfo.after(movieOverview);
    movieOverview.append(overviewTitle);
    movieOverview.append(overviewDescr);
  });
}

// Searcher and input
const form = document.querySelector('.search-form');
const input = form.querySelector('.search-form__field');
const inputSearchBtn = form.querySelector('.search-form__btn--search');
const inputDeleteBtn = form.querySelector('.search-form__btn--delete');

function searchMovie(event) {
  event.preventDefault();

  const searchItem = `${urlSearch}${input.value}`;
  if (input.value) getData(searchItem);
}

form.addEventListener('submit', searchMovie);

function increaseForm() {
  form.classList.toggle('active');
}

function cleanInput() {
  input.value = '';
  input.focus();
  getData(url);
}

inputSearchBtn.addEventListener('click', increaseForm);
inputSearchBtn.addEventListener('click', (event) => {
  input.focus();
  searchMovie(event);
});
inputDeleteBtn.addEventListener('click', cleanInput);


  