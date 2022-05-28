// HTML элементы модального окна опроса
const modalInterview = document.getElementById('modal-interview')
      questionImage = modalInterview.querySelector('#question-image')
      questionText = modalInterview.querySelector('#question')
      buttonsBox = modalInterview.querySelector('#modal-interview-buttons')
      answerButtonTrue = modalInterview.querySelector('#answer-button-true')
      answerButtonFalse = modalInterview.querySelector('#answer-button-false');


// HTML элементы модального окна результатов
const modalResult = document.getElementById('modal-result')
      resultImage = modalResult.querySelector('#result-image')
      resultText = modalResult.querySelector('#result-text')
      buttonActionAfterInterview = modalResult.querySelector('#action');


// Функция вызова модального окна с ответами
function askQuestion(q) {
  shuffleAnswers();

  let rand = Math.floor(Math.random() * q.length);
  current_question = q[rand];

  if (current_question) {
    if (current_question.imgUrl) {
      questionImage.src = current_question.imgUrl
    }

    questionText.innerText = current_question.question;

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
    resultImage.src = 'img/you-winner.png'
    resultText.innerText = "text";
    buttonActionAfterInterview.innerText = "Продолжить играть";
    
    buttonActionAfterInterview.addEventListener('click', () => {
      modalResult.style.display = 'none';
      paused = false;
      Update();
    }, { once: true })

  } else {
    resultImage.src = 'img/you-lose.png'
    resultText.innerText = "text";
    buttonActionAfterInterview.innerText = "Начать заново";

    buttonActionAfterInterview.addEventListener('click', () => {
      modalResult.style.display = 'none';
      window.localStorage.setItem('highscore', highscore);
      paused = false;
      Start();
    }, { once: true })
  }

  current_question = undefined;
  questionImage.src = '';
  questionText.innerText = '';
  modalResult.style.display = 'flex';
}

// Функция перемешивания ответов
function shuffleAnswers() {
  const index = RandomIntInRange(0, 1)
  buttonsBox.style['flex-direction'] = ['column', 'column-reverse'][index]
}

// Колбэк для отслеживания верного ответа на вопрос
answerButtonTrue.addEventListener('click', function(evt) {
  callResultModal(true);
})

// Колбэк для отслеживания неверного ответа на вопрос
answerButtonFalse.addEventListener('click', function(evt) {
  callResultModal(false);
})