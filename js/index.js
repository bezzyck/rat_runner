const canvas = document.getElementById('game');
const modal = document.getElementById('modal-wrapper');
const fg = document.getElementById('fg');
const bg = document.getElementById('bg');
const restartGame = document.getElementById('restart');
const continueGame = document.getElementById('continue');

const ctx = canvas.getContext('2d');

// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let paused = false;
let offset = 300;

// Event Listeners
canvas.addEventListener('touchstart', function (evt) {
  keys['touch'] = true;
});
canvas.addEventListener('touchend', function (evt) {
  keys['touch'] = false;
});
restartGame.addEventListener('click', () => {
  modal.style.display = 'none'
  window.localStorage.setItem('highscore', highscore);
  paused = false
  Start()
})
continueGame.addEventListener('click', () => {
  modal.style.display = 'none'
  paused = false
  Update()
})


// Game Functions
function SpawnObstacle () {
  let size = RandomIntInRange(50, 100);
  let type = RandomIntInRange(0, 3);
  let obstacle = new Obstacle(canvas.width + size, canvas.height - size - offset, size, size, type);
  obstacles.push(obstacle);
}


function RandomIntInRange (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Start () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "30px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highscore = 0;
  if (localStorage.getItem('highscore')) {
    highscore = localStorage.getItem('highscore');
  }

  player = new Player(25, 0, 100, 100, document.getElementById('player'));

  scoreText = new Text("Счет: " + score, 25, 25, "left", "#ffffff", "30");
  highscoreText = new Text("Рекорд: " + highscore, canvas.width - 25, 25, "right", "#ffffff", "30");

  requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update () {
  if (!paused) requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(fg, 0, canvas.height - offset, canvas.width, offset);



  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    spawnTimer = initialSpawnTimer - gameSpeed * 8;
    
    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }

  // Spawn Enemies
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.w < 0) {
      obstacles.splice(i, 1);
    }

    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      obstacles = [];
      paused = true
      modal.style.display = 'flex'
    }
    o.Update();
  }

  player.Animate();

  score++;
  scoreText.t = "Счет: " + score;
  scoreText.Draw();

  if (score > highscore) {
    highscore = score;
    highscoreText.t = "Рекорд: " + highscore;
  }
  
  highscoreText.Draw();

  gameSpeed += 0.003;
}

Start();