'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const buttonRoll = document.querySelector('.btn--roll');
const buttonNew = document.querySelector('.btn--new');
const buttonHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores = [0, 0];
let currentscore = 0;
let activePlayer = 0;
let currentscore1 = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  currentscore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

buttonRoll.addEventListener('click', function () {
  if (playing) {
    const number = Math.floor(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${number}.png`;
    if (number != 1) {
      currentscore = currentscore + number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  currentscore1 = 0;
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});
