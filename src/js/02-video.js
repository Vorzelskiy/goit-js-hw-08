import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoPlayer = document.getElementById('vimeo-player');

const player = new Player(videoPlayer, playerOptions);


function saveCurrentTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}


function getSavedCurrentTime() {
  return localStorage.getItem('videoplayer-current-time');
}

function setCurrentTime(time) {
  player.setCurrentTime(time);
}


player.on('timeupdate', throttle(function(data) {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
}, 1000));


const savedCurrentTime = getSavedCurrentTime();
if (savedCurrentTime !== null) {
  setCurrentTime(savedCurrentTime);
}
