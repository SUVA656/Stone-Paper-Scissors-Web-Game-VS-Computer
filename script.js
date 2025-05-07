let userScore = 0;
let computerScore = 0;
let winningScore = null;
let gameStarted = false;

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) return 'tie';
  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) return 'user';
  return 'computer';
}

function updateScore(winner) {
  if (winner === 'user') userScore++;
  else if (winner === 'computer') computerScore++;
  document.getElementById('user-score').textContent = `User: ${userScore}`;
  document.getElementById('computer-score').textContent = `Computer: ${computerScore}`;
}

function showResult(userChoice, computerChoice, winner) {
  const resultDiv = document.getElementById('result');
  const messages = {
    user: '🎉 You win this round!',
    computer: '💻 Computer wins this round!',
    tie: '🤝 It\'s a tie!'
  };
  resultDiv.innerHTML = `
    <p>${messages[winner]}</p>
    <div class="choices">
      <div>
        <p>User</p>
        <img src="${userChoice}.png" alt="${userChoice}" />
      </div>
      <div>
        <p>Computer</p>
        <img src="${computerChoice}.png" alt="${computerChoice}" />
      </div>
    </div>
  `;
}

function checkGameEnd() {
  if (userScore === winningScore || computerScore === winningScore) {
    const winnerText = userScore === winningScore ? '🎉 You win the game!' : '💻 Computer wins the game!';
    document.getElementById('winner-message').textContent = winnerText;
    document.getElementById('modal').classList.remove('hidden');
  }
}

function playGame(userChoice) {
  if (!gameStarted) return;

  const computerChoice = getComputerChoice();
  const winner = determineWinner(userChoice, computerChoice);

  updateScore(winner);
  showResult(userChoice, computerChoice, winner);
  checkGameEnd();
}

function startGame() {
  const inputScore = parseInt(document.getElementById('target-score').value);
  if (isNaN(inputScore) || inputScore <= 0) {
    alert('Please enter a valid number greater than 0');
    return;
  }

  winningScore = inputScore;
  gameStarted = true;

  document.getElementById('target-score-container').classList.add('hidden');
  document.getElementById('score-section').classList.remove('hidden');
  document.getElementById('buttons-container').classList.remove('hidden');
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  gameStarted = false;
  document.getElementById('user-score').textContent = 'User: 0';
  document.getElementById('computer-score').textContent = 'Computer: 0';
  document.getElementById('result').innerHTML = '';
  document.getElementById('target-score').disabled = false;
  document.getElementById('target-score-container').classList.remove('hidden');
  document.getElementById('score-section').classList.add('hidden');
  document.getElementById('buttons-container').classList.add('hidden');
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
document.getElementById('play-again-btn').addEventListener('click', resetGame);