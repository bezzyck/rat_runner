// HTML элементы модального окна опроса
const modalInterview = document.getElementById('modal-interview')
      questionImage = modalInterview.querySelector('#question-image')
      answerButtonTrue = modalInterview.querySelector('#answer-button-true')
      answerButtonFalse = modalInterview.querySelector('#answer-button-false');

// HTML элементы модального окна результатов
const modalResult = document.getElementById('modal-result')
      resultText = modalResult.querySelector('#result-text')
      buttonActionAfterInterview = modalResult.querySelector('#action');

// Функция вызова модального окна с ответами
function askQuestion(q) {

  let rand = Math.floor(Math.random() * q.length)
  current_question = q[rand];

  if (current_question) {
    if (current_question.imgUrl) {
      questionImage.src = current_question.imgUrl
    }

    modalInterview.querySelector('#question').innerText = current_question.question;

    answerButtonTrue.innerText = answerButtonTrue.value = current_question.true_answer;
    answerButtonFalse.innerText = answerButtonFalse.value = current_question.false_answer;

    modalInterview.style.display = 'flex';
  } else {
    window.localStorage.setItem('highscore', highscore);
    paused = false;
    Start();
  }
}

// Функция вызова модального окна с результатом
function callResultModal(result = false) {
  modalInterview.style.display = 'none';
  
  if (result) {
    resultText.innerText = "Ты молодец!"
    buttonActionAfterInterview.innerText = "Продолжить играть"
    
    buttonActionAfterInterview.addEventListener('click', () => {
      modalResult.style.display = 'none'
      paused = false;
      Update();
    }, { once: true })

  } else {
    resultText.innerText = "В следущий раз справишься!"
    buttonActionAfterInterview.innerText = "Начать заново"

    buttonActionAfterInterview.addEventListener('click', () => {
      modalResult.style.display = 'none'
      window.localStorage.setItem('highscore', highscore);
      paused = false;
      Start();
    }, { once: true })

  }

  modalResult.style.display = 'flex'
}

// Колбэк для отслеживания верного ответа на вопрос
answerButtonTrue.addEventListener('click', function(evt) {
  callResultModal(true)
})

// Колбэк для отслеживания неверного ответа на вопрос
answerButtonFalse.addEventListener('click', function(evt) {
  callResultModal(false)
})