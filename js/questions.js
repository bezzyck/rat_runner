// Массив вопросов
const questions = [
  [
    // Вопросы и ответы для иконки "Письмо"
    {
      imgUrl: 'img/questions/email-adress.png',
      question: '', 
      true_answer: 'Придумать новый', 
      false_answer: 'Оставить так',
      description: "Почтовый адрес должен быть удобен для произношения — kучше всего использовать реальное имя и фамилию."
    },
    {
      imgUrl: 'img/questions/easy-password.png',
      question: '', 
      true_answer: 'Придумать новый', 
      false_answer: 'Оставить так',
      description: 'Такой пароль легко угадать, лучше придумать более сложное сочетание.'
    },
    {
      imgUrl: 'img/questions/hard-password.png',
      question: '', 
      true_answer: 'Оставить так', 
      false_answer: 'Придумать новый',
      description: 'Этот пароль вполне удачный — он состоит из сложного сочетания букв, цифр и знаков.'
    }
  ],
  [
    // Вопросы и ответы для иконки "Сообщение"
    {
      imgUrl: 'img/questions/selfie.png',
      question: 'Алиске очень нравится, как она получилась на фото.', 
      true_answer: 'Удалить', 
      false_answer: 'Опубликовать',
      description: 'Не стоит выкладывать в сеть фото, которое может испортить чью-либо репутацию.'
    },
    {
      imgUrl: 'img/questions/comment.png',
      question: '', 
      true_answer: 'Удалить комментарий и заблокировать пользователя', 
      false_answer: 'Ответить обидчику',
      description: 'Если просто игнорировать обидчика, у него пропадёт интерес доставлять вам неудобства.'
    }
  ],
  [
    // Вопросы и ответы для иконки "Компьютер"
    {
      imgUrl: 'img/questions/TV.png',
      question: 'Как долго можно смотреть телевизор?',
      true_answer: 'Не более 30 минут в день', 
      false_answer: 'Сколько хочется',
      description: 'Если долго смотреть телевизор, то может закружиться голова, появиться усталость, раздражение и проблемы со здоровьем.'
    },
    {
      imgUrl: 'img/questions/parents.png',
      question: '',
      true_answer: 'Отложить телефон и пообщаться с родителями', 
      false_answer: 'Игнорировать',
      description: 'Лучше отложить телефон и провести время с родителями — поговорить о том, как прошел день '
    }
  ],
  [
    // Вопросы и ответы для иконки "Газета"
    {
      imgUrl: 'img/questions/you-win.png',
      question: 'Чтобы получить приз, введите свои данные!', 
      true_answer: 'Закрыть сообщение', 
      false_answer: 'Ввести данные',
      description: 'Ничего не бывает просто так. Твои личные данные могут использовать в различных незаконных сделках.'
    },
    {
      imgUrl: 'img/questions/iphone.png',
      question: '', 
      true_answer: 'Игнорировать', 
      false_answer: 'Перейти по ссылке',
      description: 'Лучше не переходить по подозрительным ссылкам.'
    }
  ],
]