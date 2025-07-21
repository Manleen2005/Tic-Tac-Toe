let playerX = prompt("Enter game name for player X");
let playerO = prompt("Enter game name for player O");

const playerxnameEl = document.querySelector(".nameX");
const playeronameEl = document.querySelector(".nameO");

playerxnameEl.innerHTML = `${playerX} (X): <span class="score-x">0</span>`;
playeronameEl.innerHTML = `${playerO} (O): <span class="score-o">0</span>`;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let arr1 = [];
let arr2 = [];
let SX = 0;
let SO = 0;

const result = document.querySelector(".result");

let isOn = false;

document.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("click", (e) => {
    handleClick(e);
    fetchId(e);
  });
});

document.querySelector(".reset").addEventListener("click", resetBoard);
document.querySelector(".reset-scores").addEventListener("click", resetScores);

function handleClick(e) {
  if (e.target.innerHTML !== "") return;
  isOn = !isOn;
  e.target.innerHTML = isOn ? "❌" : "⭕️";
}

function fetchId(e) {
  const ID = Number(e.target.id);
  if (isOn) {
    arr1.push(ID);
    if (checkWin(arr1)) {
      result.innerHTML = `${playerX} Wins`;
      SX++;
      updateScores();
    }
  } else {
    arr2.push(ID);
    if (checkWin(arr2)) {
      result.innerHTML = `${playerO} Wins`;
      SO++;
      updateScores();
    }
  }
}

function checkWin(winner) {
  return winningCombinations.some((combo) =>
    combo.every((val) => winner.includes(val))
  );
}

function updateScores() {
  document.querySelector(".score-x").innerHTML = SX;
  document.querySelector(".score-o").innerHTML = SO;
}

function resetBoard() {
  document.querySelectorAll(".square").forEach((square) => {
    square.innerHTML = "";
  });
  arr1 = [];
  arr2 = [];
  isOn = false;
  result.innerHTML = "Let's see who wins!";
}

function resetScores() {
  SX = 0;
  SO = 0;
  updateScores();
  result.innerHTML = "Let's see who wins!";
}