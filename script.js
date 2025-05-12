const fullQuestionSet = [
  { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], answer: "JavaScript" },
  { question: "What does CSS stand for?", options: ["Central Style Sheets", "Cascading Style Sheets", "Colorful Style System", "None"], answer: "Cascading Style Sheets" },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Mark Language", "Home Tool Markup Language", "None"], answer: "Hyper Text Markup Language" },
  { question: "What year was JavaScript launched?", options: ["1996", "1995", "1994", "None of the above"], answer: "1995" },
  { question: "Which one is a JavaScript package manager?", options: ["Node.js", "TypeScript", "npm", "Python"], answer: "npm" },
  { question: "What is the capital of France?", options: ["Berlin", "Paris", "Madrid", "London"], answer: "Paris" },
  { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "HTML tag for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], answer: "<br>" },
  { question: "CSS property to change text color?", options: ["font-color", "color", "text-color", "background-color"], answer: "color" },
  { question: "JS keyword for variable declaration?", options: ["var", "int", "let", "Both var and let"], answer: "Both var and let" }
];

let currentQuestion = 0;
let score = 0;
let questions = [];

// Page elements
const homePage = document.getElementById("home");
const quizPage = document.getElementById("quiz");
const resultPage = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

document.querySelectorAll(".select-btn").forEach(button => {
  button.addEventListener("click", () => {
    const count = parseInt(button.dataset.count);
    startQuiz(count);
  });
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz(count) {
  questions = shuffle(fullQuestionSet).slice(0, count);
  currentQuestion = 0;
  score = 0;
  homePage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(option, li);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected, li) {
  const correct = questions[currentQuestion].answer;
  const allOptions = optionsEl.querySelectorAll("li");

  allOptions.forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) opt.style.backgroundColor = "green";
    else opt.style.backgroundColor = "crimson";
  });

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "lightgreen";
    score++;
  } else {
    feedbackEl.textContent = `❌ Incorrect! Correct answer: ${correct}`;
    feedbackEl.style.color = "pink";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    scoreEl.textContent = score;
    totalEl.textContent = questions.length;
  }
});


function goHome() {
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
}
