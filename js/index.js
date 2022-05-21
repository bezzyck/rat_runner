const canvas = document.getElementById('game');
const modal = document.getElementById('modal-wrapper');
const fg = document.getElementById('fg');
const bg = document.getElementById('bg');
const answerButtons = document.querySelectorAll('.answer-button');
// const restartGame = document.getElementById('restart');
// const continueGame = document.getElementById('continue');

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
let offset = 450;
let current_question;


// Game Functions
function SpawnObstacle () {
  let size = RandomIntInRange(80, 120);
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

  gameSpeed = 5;
  gravity = 1;

  score = 0;
  highscore = 0;
  if (localStorage.getItem('highscore')) {
    highscore = localStorage.getItem('highscore');
  }

  player = new Player(25, 0, 120, 150);

  scoreText = new Text("Счет: " + score, 25, 50, "left", "#ffffff", "45");
  highscoreText = new Text("Рекорд: " + highscore, canvas.width - 25, 50, "right", "#ffffff", "45");

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(fg, 0, canvas.height - offset, canvas.width, offset);

  Update()
}

let initialSpawnTimer = 300;
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

function askQuestion(q) {
  let rand = Math.floor(Math.random() * q.length)
  current_question = q[rand]

  if (current_question) {
    modal.querySelector('#question').innerText = current_question.question
    modal.style.display = 'flex'
    console.log(answerButtons);
  } else {
    window.localStorage.setItem('highscore', highscore);
    paused = false
    Start()
  }
}


// Event Listeners
canvas.addEventListener('touchstart', function (evt) {
  keys['touch'] = true;
});

canvas.addEventListener('touchend', function (evt) {
  keys['touch'] = false;
});

answerButtons.forEach(element => {
  element.addEventListener('click', function(evt) {
    if (current_question && evt.target.value === current_question.answer) {
      modal.style.display = 'none'
      paused = false
      Update()
    } else {
        modal.style.display = 'none'
        window.localStorage.setItem('highscore', highscore);
        paused = false
        Start()
    }
  })
});
// restartGame.addEventListener('click', () => {
//   modal.style.display = 'none'
//   window.localStorage.setItem('highscore', highscore);
//   paused = false
//   Start()
// });

// continueGame.addEventListener('click', () => {
//   modal.style.display = 'none'
//   paused = false
//   Update()
// });

