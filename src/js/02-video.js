import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const playerSaveTime = throttle(data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000);

const playerCurrentTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(playerCurrentTime || 0);

player.on('timeupdate', playerSaveTime);
