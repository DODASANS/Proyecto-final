const colors = ['#FF5733', '#33FF57', '#3333FF', '#FFFF33', '#33FFFF', '#FF33FF', '#ff333a', '#4e3afc', '#fc3ab2'];
let sequence = [];
let playerSequence = [];
let playerTurn = false;
let round = 1;
let bestScore = 0;
let messageDisplay = document.getElementById('message');
let gameBoard = document.getElementById('game-board');
let startButton = document.querySelector('#start-button');
let playAgainButton = document.querySelector('#play-again');
let levelDisplay = document.getElementById('level-display');
let bestScoreDisplay = document.getElementById('best-score');
let title = document.querySelector('h1'); 
let instructions = document.querySelector('p'); 

startButton.style.display = 'block';

function startGame() {
    sequence = [];
    playerSequence = [];
    round = 1;
    messageDisplay.textContent = '';
    generateSequence();
    gameBoard.style.display = 'block';
    startButton.style.display = 'none';
    playAgainButton.style.display = 'none';
    levelDisplay.textContent = 'Level ' + round;
    bestScoreDisplay.textContent = 'Best Score: ' + bestScore;
    title.classList.add('hidden'); 
    instructions.classList.add('hidden'); 
}

function generateSequence() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    sequence.push(randomIndex);
    playSequence();
}

function playSequence() {
    let index = 0;
    playerTurn = false;
    const intervalId = setInterval(() => {
        if (index >= sequence.length) {
            clearInterval(intervalId);
            playerTurn = true;
            messageDisplay.textContent = 'Your turn!';
            return;
        }
        flashTile(sequence[index]);
        index++;
    }, 1000);
}

function flashTile(index) {
    const color = colors[index];
    const tile = document.querySelectorAll('.tile')[index];
    tile.style.backgroundColor = color;
    setTimeout(() => {
        tile.style.backgroundColor = '#0C8294';
    }, 500);
}

function playerClick(index) {
    if (!playerTurn) return;
    playerSequence.push(index);
    flashTile(index);
    const sequenceIndex = playerSequence.length - 1;
    if (playerSequence[sequenceIndex] !== sequence[sequenceIndex]) {
        endGame();
    } else if (playerSequence.length === sequence.length) {
        playerSequence = [];
        round++;
        playerTurn = false;
        messageDisplay.textContent = 'Next round starting...';
        setTimeout(() => {
            generateSequence();
        }, 1000);
        levelDisplay.textContent = 'Level ' + round;
    }
}

function endGame() {
    if (round > bestScore) {
        bestScore = round;
        bestScoreDisplay.textContent = 'Best Score: ' + bestScore;
    }
    messageDisplay.textContent = 'Game over! You reached round ' + round + '. Best Score: ' + bestScore + '. Click Play Again to start a new game.';
    gameBoard.style.display = 'none';
    playAgainButton.style.display = 'block';
}

function playAgain() {
    startGame();
}
