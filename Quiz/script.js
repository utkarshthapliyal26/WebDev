const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "Which language runs in browser?",
        options: ["C++", "Java", "Python", "JavaScript"],
        answer: 3
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("scoreText");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    const currentQuestion = questions[currentIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => selectAnswer(index);
        optionsEl.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (selectedIndex === questions[currentIndex].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreText.textContent = "Your Score: " + score + "/" + questions.length;

    if (score === questions.length) {
        message.textContent = "Excellent!";
    } else if (score > 0) {
        message.textContent = "Good Job!";
    } else {
        message.textContent = "Try Again!";
    }
}

restartBtn.onclick = function () {
    currentIndex = 0;
    score = 0;
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    loadQuestion();
};

loadQuestion();
