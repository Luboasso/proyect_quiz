const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const progressBar = document.getElementById("progress-bar");
const scoreCardElement = document.querySelector(".score-card");
const welcomeCardElement =  document.getElementById("welcome-card");
const quizCardElement =  document.getElementById("quiz-div");
const questionTitle =  document.getElementById("question-title");
let questions = []
let currentQuestionIndex;
let correctAnswers = 0;



function getQuestion () {
axios
.get("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
.then((res) => {
questions = res.data.results,
console.log(res.data.results)})
.catch((err) => console.error(err));
}
getQuestion ();


function startGame() {
    startButton.classList.add("hide");
    welcomeCardElement.classList.add("hide")
    currentQuestionIndex = 0;
    correctAnswers = 0;
    progressBar.style.width = "0%";
    quizCardElement.classList.remove("hide");
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
  }
  function shuffleArray(answerArray) {
    for (let i = answerArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArray[i], answerArray[j]] = [answerArray[j], answerArray[i]];
    }
    return answerArray;
}
function showQuestion(question) {
    questionElement.innerHTML = question.question;
    const answers = [];
    questionTitle.innerHTML = `Question ${currentQuestionIndex + 1}`
    answers.push({ text: question.correct_answer, correct: true });
    question.incorrect_answers.forEach((answer) => {
        answers.push({ text: answer });
    });

    shuffleArray(answers);

    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn", "btn-outline-dark", "m-2");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
    
    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
        
        }

        function setStatusClass(button) { console.log(button)
            if (button.dataset.correct) {
              button.classList.add("correct");
            } else {
              button.classList.add("wrong");
            }
          }
          
        
          function selectAnswer(event) {
            const selectedButton = event.target;
            
            setStatusClass(selectedButton);
          
           
            if (questions.length > currentQuestionIndex + 1) {
                const increment = 10;
              let currentProgress = parseInt(progressBar.style.width);
              currentProgress += increment;
              progressBar.style.width = `${currentProgress}%`;
              setTimeout(() => {
                currentQuestionIndex++;
                setNextQuestion();
              }, 1000); 
            } else { 
              setTimeout(() => {
                showScoreCard(); 
              }, 3000); 
          
              
              nextButton.classList.add("hide");
              startButton.innerText = "Restart";
              startButton.classList.remove("hide");
            }
          }
        
 
function showScoreCard() {
    quizCardElement.classList.add("hide");
    questionContainerElement.classList.add("hide");
    scoreCardElement.classList.remove("hide");
  
    startButton.innerHTML = "Restart";
    startButton.classList.remove("hide");
  
    document.getElementById("score").textContent = correctAnswers;
    const correctAnswersList = document.getElementById("correct-answers");
    correctAnswersList.innerHTML = "";
  
    questions.forEach((question, index) => {
      if (question.userAnswerIndex === question.correctAnswerIndex) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Question ${index + 1}: ${question.correct_answer}`;
        correctAnswersList.appendChild(listItem);
      }
    });
  }         

function resetState() {
            nextButton.classList.add("hide");
            answerButtonsElement.innerHTML=""
          }

          
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});