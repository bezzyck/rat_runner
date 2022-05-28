// Элементы стартового экрана
const startGame = document.getElementById('start')
      startScreen = document.getElementById('start-screen')
      openRules = document.getElementById('open-rules')
      closeRules = document.getElementById('close-rules')
      modalRules = document.getElementById('modal-rules');

// Коллбэк для клика по кнопке "Старт"
startGame.addEventListener('click', () => {
  canvas.style.display = 'block'
  startScreen.style.display = 'none'
  Start()
});

// Коллбэк для клика по кнопке "Правила"
openRules.addEventListener('click', () => {
  modalRules.style.display = 'flex'
});

// Коллбэк для клика по кнопке "Хорошо!" (Закрыть правила)
closeRules.addEventListener('click', () => {
  modalRules.style.display = 'none'
});