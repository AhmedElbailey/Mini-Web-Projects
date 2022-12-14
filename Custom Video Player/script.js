const video = document.querySelector('video');

const btnStart = document.querySelector('.start-btn');
const btnStop = document.querySelector('.stop-btn');
const btnRestart = document.querySelector('.restart-btn');

const progressBar = document.querySelector('.progress');

const VideoTime = document.querySelector('.timestamp');

let mouseDown;
let changing;
/////////////////////////////////
// FUNCTIONS
const startVideo = function () {
  // Start video
  video.play();

  // Render stop icon
  btnStart.classList.add('hidden');
  btnStop.classList.remove('hidden');
};

const stopVideo = function () {
  // Stop video
  video.pause();

  // Render play icon
  btnStart.classList.remove('hidden');
  btnStop.classList.add('hidden');
};

const toggleVideoStatus = function () {
  video.paused ? startVideo() : stopVideo();
};

const restartVideo = function () {
  stopVideo();
  video.currentTime = 0;
};

const setVideoTime = function () {
  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime - minutes * 60);

  const minutesText = minutes.toString().padStart(2, '0');
  const secondsText = seconds.toString().padStart(2, '0');

  VideoTime.innerHTML = `${minutesText}:${secondsText}`;
};

const updateProgressBar = function () {
  progressBar.value = (video.currentTime / video.duration) * 100;
};

const setVideoProgress = function () {
  // Set video by progress bar
  video.currentTime = (+progressBar.value / 100) * video.duration;
};
/////////////////////////////////
// EVENT HANDLERS
btnStart.addEventListener('click', startVideo);

btnStop.addEventListener('click', stopVideo);

btnRestart.addEventListener('click', restartVideo);

video.addEventListener('click', toggleVideoStatus);

window.addEventListener('keydown', function (e) {
  if (e.key === ' ') toggleVideoStatus();
});

video.addEventListener('timeupdate', () => {
  // Update time stamp
  setVideoTime();

  //If mouse is down on progress-bar donot change progress-bar
  if (mouseDown) return;
  updateProgressBar();
});

progressBar.addEventListener('change', () => {
  setVideoProgress();
  setVideoTime();
});

progressBar.addEventListener('mousedown', () => {
  mouseDown = true;
});
progressBar.addEventListener('mouseup', () => {
  mouseDown = false;
});
////////////////////////////
//LEARNED
// mdn video/audio API
// video.play()  -- video.pause() -- video.currntTime (seconds) -- video.duration (seconds)
//video.addEventListener('ended' , stopmMedia)
//video.addEventListener('timeupdate' , setVideoTime)
// if(video.paused)
