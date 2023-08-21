"use strict";
const scoreZero = document.getElementById("score--0");
const scoreOne = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const currentScoreZero = document.getElementById("current--0");
const currentScoreOne = document.getElementById("current--1");
const playerZero = document.querySelector(".player--0");
const playerOne = document.querySelector(".player--1");
const currentScoreForReset = document.querySelectorAll(".current-score");

let scores, currentScore,activePlayer, playing

const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  diceImg.classList.add("hidden");
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  playerZero.classList.remove("player--winner");
  playerOne.classList.remove("player--winner");
  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");
};

reset();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
};

const roll = function () {
  if (playing) {
    let dice = Math.round(Math.random() * 5) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const hold = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
};

rollDice.addEventListener("click", roll);
btnHold.addEventListener("click", hold);
newGame.addEventListener("click", reset);
