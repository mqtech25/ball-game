var moveX, moveY;
var barMove = 60;
var isPlaying = false;
var screen = document.getElementById("screen");
var ball = document.getElementById("ball");
var bar = document.getElementById("bar");
var playBtn = document.getElementById("playBtn");
var topWall = screen.getBoundingClientRect().top;
var leftWall = screen.getBoundingClientRect().left;
var rightWall = screen.getBoundingClientRect().right;
var bottomWall = screen.getBoundingClientRect().bottom;
var ballHeight = document.getElementById("ball").clientHeight;
var ballWidth = document.getElementById("ball").clientWidth;
var barWidth = document.getElementById("bar").clientWidth;
var ballSize = ballHeight;
var tiles = '<div id="tiles"></div>';

window.addEventListener("load", function () {
  setInterval(moveBall, 30);

  playBtn.addEventListener("click", function () {
    if (!isPlaying) {
      playBtn.style.display = "none";
      play();
      isPlaying = true;
      moveX = 5;
      moveY = -5;
      ball.style.left = "10%";
      ball.style.top = "90%";
    }
  });
});
function play() {
  screen.insertAdjacentHTML("afterbegin", tiles);
  document.addEventListener("keydown", moveBar);
}
function moveBall() {
  var ballX = ball.getBoundingClientRect().left;
  var ballY = ball.getBoundingClientRect().top;
  if (ballY <= topWall) {
    moveY = 5;
  } else if (ballY + ballSize + 10 >= bottomWall) {
    moveY = 0;
    moveX = 0;
    isPlaying = false;
    playBtn.innerHTML = "Play Again";
    playBtn.style.display = "block";
  } else if (ballX + ballSize >= rightWall) {
    moveX = -5;
  } else if (ballX <= leftWall) {
    moveX = 5;
  } else if (
    ballX + ballWidth >= bar.getBoundingClientRect().left &&
    ballX + ballWidth <= bar.getBoundingClientRect().right &&
    ballY + ballHeight == bar.getBoundingClientRect().top
  ) {
    moveY = -5;
  }
  ball.style.left = ballX + moveX + "px";
  ball.style.top = ballY + moveY + "px";
}
function moveBar(key) {
  var barLeft = bar.getBoundingClientRect().left;
  if (key.code == "ArrowLeft") {
    if (barLeft > leftWall) bar.style.left = barLeft - barMove + "px";
  } else if (key.code == "ArrowRight") {
    if (barLeft + barWidth + 40 < rightWall)
      bar.style.left = barLeft + barMove + "px";
  }
}
