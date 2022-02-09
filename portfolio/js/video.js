const videoBox = document.querySelector('.video__box');
const playBtnMain = videoBox.querySelector('.video__btn');
const poster = videoBox.querySelector('.video__image');
const video = videoBox.querySelector('.video');
const controls = videoBox.querySelector('.controls');
const play = controls.querySelector('.video__btn--small');
let isPlay = false;

const progress = controls.querySelector('.video__progress');
const progressBar = controls.querySelector('.video__progress-bar');

const volumeBtn = videoBox.querySelector('.volume__btn');
const controlVolume = videoBox.querySelector('.volume__progress');
const videoCurTime = document.querySelector('.current-time');

const increaseBtn = document.querySelector('.increase-btn');

// Play video
function playVideo() {
    if(!isPlay) {
        // playBtnMain.classList.toggle('none');
        play.classList.remove('video__btn--small');
        play.classList.add('video__btn-pause');
        // video.currentTime = 0;
        video.play();
        playBtnMain.classList.add('none');
        isPlay = true;
    }
    else {
        playBtnMain.classList.toggle('none');
        play.classList.add('video__btn--small');
        play.classList.remove('video__btn-pause');
        video.pause();
        playBtnMain.classList.remove('none');
        isPlay = false;
    }
}

play.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);

function playVideoMain() {
    video.classList.toggle('none');
    controls.classList.toggle('none');
    poster.classList.toggle('none');
    playVideo();
}

playBtnMain.addEventListener('click', playVideoMain);


// Progress and update time
function updateProgress(event) {
    let currentTime = event.target.currentTime;
    progress.value = (video.currentTime / video.duration) * 100;
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #808080 ${value}%, #808080 100%)`;


    video.addEventListener('loadeddata', () => {
        // update total time
       let videoDuration = audio.duration;
       let totalMin = Math.floor(videoDuration / 60);
       let totalSec = Math.floor(videoDuration % 60);
       if (totalSec < 10) totalSec = `0${totalSec}`;
       videoDuration.innerHTML = `${totalMin}:${totalSec}`;
       });

        // update current time
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) currentSec = `0${currentSec}`;      
        videoCurTime.innerHTML = `${currentMin}:${currentSec}`;
}

video.addEventListener('timeupdate', updateProgress);

// Rewind
function rewind() {
    video.currentTime = (progress.value * video.duration) / 100;
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #808080 ${value}%, #808080 100%)`;
}

progress.addEventListener('change', rewind);

// Volume
function updateVol() {
    let volume = this.value;
    video.volume = volume / 100;
    video.volume <= 0 ? volumeBtn.classList.toggle('volume__btn--mute') : volumeBtn.classList.toggle('volume__btn--mute');
    volume > 0 ? volumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)' : volumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)';
}

controlVolume.addEventListener('change', updateVol);

function mute() {
    if (video.muted) {
        video.muted = false;
        volumeBtn.style.backgroundImage = 'url(./assets/svg/volume.svg)'
    }
    else {
        video.muted = true;
        volumeBtn.style.backgroundImage = 'url(./assets/svg/mute.svg)'
    }
}

volumeBtn.addEventListener('click', mute);

// // Change progress color
function changeProgressColor() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #808080 ${value}%, #808080 100%)`;
}

controlVolume.addEventListener('input', changeProgressColor);


// Increase video
function increaseVideo() {
    if(video.webkitSupportsFullscreen) video.webkitEnterFullScreen();
}

increaseBtn.addEventListener('click', increaseVideo);


