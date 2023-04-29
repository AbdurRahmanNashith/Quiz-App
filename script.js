  const startBtn = document.querySelector('#start-btn');
  const quizContainer = document.querySelector('.quiz-container');
  const timerEl = document.querySelector('#timer');
  const optionEls = document.querySelectorAll('label');
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const submitBtn = document.querySelector('#submit-btn');
  const questionEl = document.querySelector('.question');

  const audio = new Audio('sound-3.mp3'); 

  let currentQuestion = 0;
  let score = 0;
  let timerInterval;
  let startTime; // Define startTime outside of startQuiz function
  const maxTime = 5 * 60 * 1000; // 5 minutes in milliseconds

  startBtn.addEventListener('click', startQuiz);
  optionEls.forEach(optionEl => {
    optionEl.addEventListener('click', selectOption);
  });

  prevBtn.addEventListener('click', navigateQuestion);
  nextBtn.addEventListener('click', navigateQuestion);
  submitBtn.addEventListener('click', submitQuiz);

  function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    startTime = new Date().getTime(); // Assign value to startTime here
    function updateTimer() {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      const remainingTime = maxTime - elapsedTime;
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      timerEl.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      if (remainingTime < 0) {
        clearInterval(timerInterval);
        timerEl.innerText = 'Time is up!';
        submitQuiz();
      }
    }

    timerInterval = setInterval(updateTimer, 1000);
  }

  const quizData = [
    {
      question: 'How do you measure the effectiveness of your company\'s diversity and inclusion initiatives?',
      options: [
        'Employee satisfaction surveys',
        'Diversity and inclusion training attendance',
        'Retention rates of diverse employees',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'Can you describe your company\'s approach to talent development and retention, and how it has evolved over time?',
      options: [
        'Formal mentorship programs',
        'Opportunities for job shadowing and cross-training',
        'Performance-based promotions',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'How do you ensure that your company\'s compensation and benefits packages remain competitive in the marketplace?',
      options: [
        'Regular market surveys to benchmark compensation and benefits',
        'Offering unique and creative perks, such as flexible schedules and remote work options',
        'Offering a comprehensive benefits package, including health insurance, retirement plans, and paid time off',
        'All of the above'
      ],
      answer: 'Regular market surveys to benchmark compensation and benefits'
    },
    {
      question: 'What are the most significant challenges you face in attracting and retaining top talent, and how do you address them?',
      options: [
        'Competition from other employers',
        'Offering a competitive compensation package',
        'Maintaining a positive and inclusive company culture',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'How do you foster a positive and inclusive company culture, and what steps do you take to maintain it?',
      options: [
        'Encouraging employee feedback and suggestions',
        'Offering diversity and inclusion training',
        'Promoting work-life balance',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'Can you explain how your company manages performance evaluations and what metrics are used to assess employee performance?',
      options: [
        'Annual performance reviews',
        'Setting measurable goals and objectives',
        'Regular feedback and coaching from managers',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'How do you identify and address employee engagement issues within your organization?',
      options: [
        'Employee engagement surveys',
        'One-on-one meetings with employees',
        'Regular team-building activities',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'Can you describe your company\'s approach to career development and advancement, and how it aligns with employee goals?',
      options: [
        'Offering opportunities for training and skill development',
        'Providing mentorship and coaching',
        'Providing a clear career path and growth opportunities',
        'All of the above'
      ],
      answer: 'All of the above'
    },
    {
      question: 'How do you stay up-to-date on industry trends and changes that impact HR practices, and what steps do you take to incorporate them into your company\'s policies and procedures?',
      options: ['Attending industry conferences and seminars',
        'Networking with other HR professionals',
        'Regularly reviewing industry publications and research',
        'All of the above'],
      answer: 'All of the above'
    },
    {
      question: 'What strategies does your company use to attract and hire diverse candidates, and how do you measure the success of these efforts?',
      options: ['Posting job openings in diverse publications and online job boards',
        'Partnering with diversity organizations and minority-serving institutions',
        'Providing training to reduce bias in hiring practices',
        'All of the above'],
      answer: 'All of the above'
    },
  ];

  function displayQuestion() {
    const quiz = quizData[currentQuestion];
    questionEl.innerText = quiz.question;
    optionEls.forEach((optionEl, index) => {
      optionEl.innerText = quiz.options[index];
      optionEl.previousElementSibling.value = quiz.options[index];
      optionEl.classList.remove('selected');
    });
    if (currentQuestion === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    if (currentQuestion === quizData.length - 1) {
      nextBtn.disabled = true;
      submitBtn.disabled = false;
    } else {
      nextBtn.disabled = false;
      submitBtn.disabled = true;
    }
  }

  function selectOption(e) {
    const selectedOption = e.target.value;
    const correctOption = quizData[currentQuestion].answer;
    if (selectedOption === correctOption) {
      score++;
      audio.src = 'Sound Effects Button.mp3';
    } else {
      audio.src = 'Sound Effects Button (mp3cut.net).mp3';
    }
    audio.play();
  }



  function navigateQuestion(event) {
    if (timerInterval) {
      if (event.target.id === 'prev-btn') {
        currentQuestion--;
      } else if (event.target.id === 'next-btn') {
        currentQuestion++;
      }
      displayQuestion();
      if (currentQuestion === 0) {
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }
      if (currentQuestion === quizData.length - 1) {
        nextBtn.disabled = true;
        submitBtn.disabled = false;
      } else {
        nextBtn.disabled = false;
        submitBtn.disabled = true;
      }
    } else {
      alert('Please start the quiz timer before navigating questions.');
    }
  }


  optionEls.forEach(optionEl => {
    optionEl.addEventListener('click', selectOption);
  });


  function submitQuiz() {
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    if (elapsedTime > maxTime) {
      alert('Time is up!');
    } else {
      const percentage = Math.round(score / quizData.length * 100);
      alert(`Your score is ${score}/${quizData.length} (${percentage}%)`);
    }

    clearInterval(timerInterval); // stop the timer

  }



  optionEls.forEach(optionEl => {
    optionEl.addEventListener('click', selectOption);
  });



  prevBtn.addEventListener('click', navigateQuestion);
  nextBtn.addEventListener('click', navigateQuestion);
  submitBtn.addEventListener('click', submitQuiz);

  displayQuestion();

