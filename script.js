'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0'); //basicamente dar uma variável ao player--0 que é a secção toda do player1
const player1El = document.querySelector('.player--1'); //basicamente dar uma variável ao player--0 que é a secção toda do player2
const score0El = document.querySelector('#score--0'); //basicamente dar uma variável ao score--0 que é o score (não é o current) do jogador 1
const score1El = document.getElementById('score--1'); // mesma coisa que queryselector mas escusamos de meter # //basicamente dar uma variável ao score--0 que é o score (não é o current) do jogador 1
const current0El = document.getElementById('current--0'); //variável ao current score do player 1
const current1El = document.getElementById('current--1'); //variável ao current score do player 1

const diceEl = document.querySelector('.dice'); //variável ao dado
const btnNew = document.querySelector('.btn--new'); //variável botao new
const btnRoll = document.querySelector('.btn--roll'); //variável botao roll
const btnHold = document.querySelector('.btn--hold'); //variável botao hold

let scores, currentScore, activePlayer, playing; //precisamos de ter estas  variaveis na global scope porque sao utilizadas em  funções

// Starting conditions
const init = function () {
  //função que basicamente reseta o jogo
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //função que troca de jogador
  document.getElementById(`current--${activePlayer}`).textContent = 0; // quando muda de jogador entao o current score volta para 0
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // dá sempre toggle de um para o outro aos jogadores. ou seja, quando esta função acontece, muda de jogador 1 para jogador 2 e ao contrario
  player1El.classList.toggle('player--active');
};
-(
  // Rolling dice functionality
  btnRoll.addEventListener('click', function () {
    if (playing) {
      //playing está true no inicio do programa
      // 1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;

      // 2. Display dice
      diceEl.classList.remove('hidden'); //mostra o dado
      diceEl.src = `dice-${dice}.png`; //mostra a imagem do dado q foi gerado
      console.log(dice); //so p checkar se esta a dar a imagem correta

      // 3. Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  })
);

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false; //passa o valor de playing para false e termina o jogo
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
