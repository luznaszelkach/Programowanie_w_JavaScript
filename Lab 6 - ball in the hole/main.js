const playBoard = document.querySelector(".play_board");
let hole;
let stopwatch = document.getElementById("stopwatch");
let ball = document.querySelector("#ball");
let bin = document.getElementsByClassName("bin")[0];
let rules = document.getElementById("rulesForm");
let btnStart = document.getElementById("start");
let score1 = document.getElementById("score");
let score = 0;
let ballY, ballX;
let speedX = 0,
  speedY = 0;
let posX = 1000,
  posY = 500;
let m = 0;
let s = -1;
let highScore = 0;
let highScore1 = document.querySelector("#highscore")
let minW = 40;
let maxW = minW + parseInt(playBoard.offsetWidth) - 85;
let minH = 150;
let maxH = minH + parseInt(playBoard.offsetHeight) - 85;

const maxY = playBoard.clientWidth - ball.clientWidth;
const maxX = playBoard.clientHeight - ball.clientHeight;

console.log(typeof(playBoard.offsetHeight));
console.log(typeof(playBoard.offsetWidth));

window.addEventListener("deviceorientation", moveBall)

function start() {
  putHole();
  console.log(posX, posY, ballX, ballY);
  rules.style.visibility = "hidden";
  ball.style.visibility = "visible";

  counter();
  setInterval(() => {
    counter();
  }, 1000);
}

btnStart.addEventListener("click", start);

function counter() {
  s++;

  if (s == 60) {
    s = 0;
    m++;
  }

  if (m == 1){
    collisionDone();
    m = 0;
  }
  displayTime();
}

function checkCollision(ball, hole){
  const ballX = parseInt(ball.style.left)
  const ballY = parseInt(ball.style.top)
  const holeX = parseInt(hole.style.left)
  const holeY = parseInt(hole.style.top)

  if (
    ballY < holeY + 20 &&
    ballY > holeY - 20 &&
    ballX < holeX + 20 &&
    ballX > holeX - 20
  ){
    score++
    score1.textContent=`${score}`

    hole.remove()
    putHole()
  }
}

function collisionDone() {
    let info = `Two wynik to: ${score}`;
    if(score >= highScore){
      highScore = score 
      highScore1.textContent = highScore;
    }
    score = 0;
    score1.textContent = score;
    
    alert(info);
}

function moveBall(e) {
  let x = e.beta;
  let y = e.gamma;
  if (x > 90) x = 90;
  if (x < -90) x = -90;
  x += 90;
  y += 90;
  ball.style.top = `${(maxY * y) / 180}px`;
  ball.style.left = `${(maxX * x) / 180}px`;
  checkCollision(ball, hole)
}


function putHole() {
  hole = document.createElement("div");
  hole.classList.add("hole");
  hole.style.visibility = "visible";
  let rndW = Math.random()* (playBoard.clientWidth - 75)
  let rndH = Math.random()* (playBoard.clientHeight - 75)
  console.log(rndH)
  console.log(rndW)
  hole.style.left = rndW + "px";
  hole.style.top = rndH + "px";
  bin.appendChild(hole);
}

function displayTime() {
  let time;
  if (s < 10) {
    displayS = "0" + s;
  } else displayS = s;
  if (m < 10) {
    displayM = "0" + m;
  } else displayM = m;
  time = displayM + ":" + displayS;
  stopwatch.innerHTML = time;
}