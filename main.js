const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let questions = []
let currentQuestionIndex;

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
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    let answers = []
    answers.push({text:question.correct_answer, correct:true})
    question.incorrect_answers.forEach((answer) => {
        answers.push({text:answer, correct: false})
    })
    console.log(answers)

      const button = document.createElement("button");
      button.innerText = answer.text;
  
      if (answers.correct) {
        button.dataset.correct = true;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    };
    
    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
        
        }

        function resetState() {
            nextButton.classList.add("hide");
            answerButtonsElement.innerHTML=""
          }
  
          function selectAnswer() {
            Array.from(answerButtonsElement.children).forEach((button) => {
              setStatusClass(button);
            });
            if (questions.length > currentQuestionIndex + 1) {
              nextButton.classList.remove("hide");
            } else {
              startButton.innerText = "Restart";
              startButton.classList.remove("hide");
            }
          }
          

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});