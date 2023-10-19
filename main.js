const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const progressBar = document.getElementById("progress-bar");
const scoreCardElement = document.getElementById("score-card");
const welcomeCardElement = document.getElementById("welcome-card");
const quizCardElement = document.getElementById("quiz-div");
const questionTitle = document.getElementById("question-title");
const winkGif = document.getElementById("ladybug-wink");
const ewGif = document.getElementById("ladybug-ew")
const marinetteHappy = document.getElementById("marinette-happy");
const marinetteMad = document.getElementById("marinette-mad");
const score = document.getElementById("score")
const failedText = document.getElementById("failed-text")
const passedText = document.getElementById("passed-text")
const restartButton = document.getElementById("restart-btn");
let questions = []
let currentQuestionIndex;
let userScore = 0;


function getQuestion() {
    axios
        .get("https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple")
        .then((res) => {
            questions = res.data.results,
                console.log(res.data.results)
        })
        .catch((err) => console.error(err));
}
getQuestion();


function startGame() {
    startButton.classList.add("hide");
    welcomeCardElement.classList.add("hide")
    currentQuestionIndex = 0;
    userScore = 0;
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
        button.classList.add("btn", "btn-outline-dark", "m-2", "w-100");
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

function setStatusClass(button) {
    console.log(button)
    if (button.dataset.correct) {
        button.classList.add("correct")
        userScore++;
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
        progressBar.style.width = `${100}%`;
        setTimeout(() => {
            showScoreCard();
        }, 2000);


        nextButton.classList.add("hide");
        document.getElementById("score").innerHTML = userScore;
    }
}


function showScoreCard() {
    quizCardElement.classList.add("hide");
    questionContainerElement.classList.add("hide");
    scoreCardElement.classList.remove("hide");

    restartButton.addEventListener("click", () => {

        welcomeCardElement.classList.remove("hide")
        startButton.classList.remove("hide");
        scoreCardElement.classList.add("hide");
    });

    score.innerText = userScore;
    console.log(userScore)

    if (userScore <= 2) {
        ewGif.classList.add("hide");
        winkGif.classList.add("hide");
        marinetteHappy.classList.add("hide");
        marinetteMad.classList.remove("hide");
        failedText.classList.remove("hide");
        passedText.classList.add("hide");
    } else if (userScore >= 3 && userScore < 7) {
        ewGif.classList.remove("hide");
        winkGif.classList.add("hide");
        marinetteHappy.classList.add("hide");
        marinetteMad.classList.add("hide");
        failedText.classList.remove("hide");
        passedText.classList.add("hide");
    } else if (userScore >= 7 && userScore <= 8) {
        ewGif.classList.add("hide");
        winkGif.classList.remove("hide");
        marinetteHappy.classList.add("hide");
        marinetteMad.classList.add("hide");
        failedText.classList.add("hide");
        passedText.classList.remove("hide");
    } else if (userScore >= 9) {
        ewGif.classList.add("hide");
        winkGif.classList.add("hide");
        marinetteHappy.classList.remove("hide");
        marinetteMad.classList.add("hide");
        failedText.classList.add("hide");
        passedText.classList.remove("hide");
    }
}

function resetState() {
    nextButton.classList.add("hide");
    answerButtonsElement.innerHTML = ""
}


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    button.classList.remove("disabled")

    setNextQuestion();
});
