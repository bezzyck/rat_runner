// HTML элементы для игры
const canvas = document.getElementById('game')
      fg = document.getElementById('fg')
      bg = document.getElementById('bg')
      ctx = canvas.getContext('2d');

// Основные переменные для работы игры
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let initialSpawnTimer = 300;
let spawnTimer = initialSpawnTimer;
let paused = false;
let offset = 450;
let current_question;


// Функция спавна препятствий
function SpawnObstacle () {
  let size = RandomIntInRange(80, 120)
      type = RandomIntInRange(0, 3)
      obstacle = new Obstacle(canvas.width + size, canvas.height - size - offset, size, size, type);

  obstacles.push(obstacle);
}

// Функция для вычисления рандомного числа из диапазона (вспомогательная)
function RandomIntInRange (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Функция для старта игры
function Start () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gameSpeed = 5;
  gravity = 1;
  score = 0;
  highscore = 0;

  if (localStorage.getItem('highscore')) highscore = localStorage.getItem('highscore');

  player = new Player(25, 0, 120, 150);
  scoreText = new Text("Счет: " + score, 25, 50, "left", "#ffffff", "45");
  highscoreText = new Text("Рекорд: " + highscore, canvas.width - 25, 50, "right", "#ffffff", "45");

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(fg, 0, canvas.height - offset, canvas.width, offset);

  Update()
}


// Функция обновляющая канвас
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

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.w < 0) obstacles.splice(i, 1);

    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      obstacles = [];
      paused = true
      askQuestion(questions[o.type])
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


// Колбэк для отслеживания тапа по экрану
canvas.addEventListener('touchstart', function (evt) {
  keys['touch'] = true;
});

// Колбэк для отслеживания окончания тапа по экрану
canvas.addEventListener('touchend', function (evt) {
  keys['touch'] = false;
});
