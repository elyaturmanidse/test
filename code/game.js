const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); /* convert choice collection to an array */
console.log(choices); /* is a js collection */
// lesson 5 
const progressText = document.getElementById("progressText");
const scoreText= document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    // {
    //   question: "Inside which HTML element do we put the JavaScript??",
    //   choice1: "<script>",
    //   choice2: "<javascript>",
    //   choice3: "<js>",
    //   choice4: "<scripting>",
    //   answer: 1
    // },
    // {
    //   question:
    //     "What is the correct syntax for referring to an external script called 'xxx.js'?",
    //   choice1: "<script href='xxx.js'>",
    //   choice2: "<script name='xxx.js'>",
    //   choice3: "<script src='xxx.js'>",
    //   choice4: "<script file='xxx.js'>",
    //   answer: 3
    // },
    // {
    //   question: " How do you write 'Hello World' in an alert box?",
    //   choice1: "msgBox('Hello World');",
    //   choice2: "alertBox('Hello World');",
    //   choice3: "msg('Hello World');",
    //   choice4: "alert('Hello World');",
    //   answer: 4
    // }
  ];

  //lesson 10 
fetch("questions.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

const CORRECT_BONUS = 10; 
const MAX_QUESTIONS = 5; 

startGame = () => {
    questionCounter = 0; 
    score = 0;
    availableQuestions = [...questions]; //spread operator -> copied all questions  
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  //lesson 5
  //how many quastions out of max -> 2/3
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  //update progress bar 
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number]; 
  });
  availableQuestions.splice(questionIndex, 1); //0 where to splice,splice out 1
  acceptingAnswers = true;
};

document.getElementById.

//add an event listener to every choice 
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    //when dont want them to click 
    if (!acceptingAnswers) return; //ignore someone clicking
    acceptingAnswers = false; //??
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
   
    //display if answer correct or incorrect 
    //correct or inc?
    const classToApply =

      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //green and red assigned to corr and inc 
    //add corr or inc aka green or red to the class 

    //lesson 5 
    if (classToApply == "correct"){
        incrementScore(CORRECT_BONUS);
    }

      selectedChoice.parentElement.classList.add(classToApply);
    //timeout to show the color green/red for only a sec (for that remove color) 
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
  });
});

//lesson 5 
incrementScore = num => {
    score +=num;
    scoreText.innerText = score; 
};
