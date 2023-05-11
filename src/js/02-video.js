import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerOptions = {
  url: 'https://player.vimeo.com/video/236203659',
  width: 640,
  height: 360
};

const videoPlayer = document.getElementById('video-container');

const player = new Player(videoPlayer, playerOptions);

// Отримуємо поточний час відтворення та зберігаємо його у локальному сховищі
function saveCurrentTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}

// Отримуємо збережений час відтворення з локального сховища
function getSavedCurrentTime() {
  return localStorage.getItem('videoplayer-current-time');
}

// Встановлюємо час відтворення плеєра
function setCurrentTime(time) {
  player.setCurrentTime(time);
}

// Підписуємося на подію timeupdate, використовуючи lodash.throttle для обмеження частоти оновлення часу
player.on('timeupdate', throttle(function(data) {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
}, 1000));

// Відновлюємо відтворення з збереженого часу
const savedCurrentTime = getSavedCurrentTime();
if (savedCurrentTime !== null) {
  setCurrentTime(savedCurrentTime);
}
