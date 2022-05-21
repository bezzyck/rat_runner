const startGame = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const openRules = document.getElementById('open-rules');
const closeRules = document.getElementById('close-rules');
const rules = document.getElementById('modal-wrapper-rules');

startGame.addEventListener('click', () => {
  canvas.style.display = 'block'
  startScreen.style.display = 'none'
  Start()
});

openRules.addEventListener('click', () => {
  rules.style.display = 'flex'
});

closeRules.addEventListener('click', () => {
  rules.style.display = 'none'
});