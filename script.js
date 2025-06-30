let userScore = 0;
let compScore = 0;
let countdown = 10;
let timer;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const countdownSpan = document.getElementById("countdown");
const playAgainBtn = document.getElementById("play-again");
const startGameBtn = document.getElementById("start-game");
const stopGameBtn = document.getElementById("stop-game");
const resumeGameBtn = document.getElementById("resume-game");

// Disable choices initially
choices.forEach(choice => choice.style.pointerEvents = "none");
resumeGameBtn.style.display = "none"; // Hide Resume initially

// Generate computer choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Draw! Try again.";
  msg.style.backgroundColor = "#999";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const resetRound = () => {
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  countdown = 10;
  countdownSpan.innerText = countdown;
  startTimer();
};

const playGame = (userChoice) => {
  clearInterval(timer);

  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") userWin = compChoice !== "paper";
    else if (userChoice === "paper") userWin = compChoice !== "scissors";
    else userWin = compChoice !== "rock";
    showWinner(userWin, userChoice, compChoice);
  }

  setTimeout(() => {
    resetRound();
  }, 2000);
};

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    countdown--;
    countdownSpan.innerText = countdown;
    if (countdown === 0) {
      clearInterval(timer);
      msg.innerText = "⏳ Time’s up! Click 'Play Again' to restart.";
      msg.style.backgroundColor = "orange";
      choices.forEach(choice => choice.style.pointerEvents = "none");
    }
  }, 1000);
}

// Choice selection
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Start game
startGameBtn.addEventListener("click", () => {
  choices.forEach(choice => choice.style.pointerEvents = "auto");
  startGameBtn.disabled = true;
  startGameBtn.style.display = "none";
  resumeGameBtn.style.display = "none";
  startTimer();
});

// Play again
playAgainBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  countdown = 10;
  countdownSpan.innerText = countdown;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  choices.forEach(choice => choice.style.pointerEvents = "auto");
  startTimer();
});

// Stop game
stopGameBtn.addEventListener("click", () => {
  clearInterval(timer);
  msg.innerText = "⏹️ Game stopped. Click Resume to continue.";
  msg.style.backgroundColor = "#444";
  choices.forEach(choice => choice.style.pointerEvents = "none");
  resumeGameBtn.style.display = "inline-block";
});

// Resume game
resumeGameBtn.addEventListener("click", () => {
  msg.innerText = "Resumed! Play your move.";
  msg.style.backgroundColor = "#081b31";
  choices.forEach(choice => choice.style.pointerEvents = "auto");
  resumeGameBtn.style.display = "none";
  startTimer();
});
