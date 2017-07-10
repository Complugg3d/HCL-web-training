var cells = document.getElementsByClassName('cell');
var activePlayer = 1; // 0 is O 1 is x
var gameState = [2, 2, 2, 2, 2, 2, 2, 2, 2]; // 2 means unplayed
var winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
var gameIsActive = true;
var msgOutput = document.getElementById('msgOutput');

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClick);
}

function changeCursor(swap) {
  for (var i = 0; i < cells.length; i++) {
    if (swap) {
      cells[i].classList.remove("cross-cursor");
      cells[i].classList.add("circle-cursor");
    } else {
      cells[i].classList.remove("circle-cursor");
      cells[i].classList.add("cross-cursor");
    }
  }
}

function cellClick(e) {
  console.log(e);
  checkIfWon(e);
}

function checkIfWon(e) {
  var tapCounter = e.srcElement.getAttribute("cell-no");
  console.log(tapCounter);

  if (gameState[tapCounter] == 2 && gameIsActive) {

    gameState[tapCounter] = activePlayer;

    if (activePlayer === 1) {
      changeCursor(true);
      e.srcElement.classList.add("cross");
      activePlayer = 0;
    } else {
      changeCursor(false);
      activePlayer = 1;
      e.srcElement.classList.add("circle");
    }

    for (var winningPosition of winningPositions) {
      if (gameState[winningPosition[0]] == gameState[winningPosition[1]] &&
        gameState[winningPosition[1]] == gameState[winningPosition[2]] &&
        gameState[winningPosition[0]] != 2) {
        var winnerStr = "X";

        if (gameState[winningPosition[0]] == 0) {
          winnerStr = "O";
        }

        msgOutput.innerText = winnerStr + " a ganado!";

        gameIsActive = false;
      } else {
        var gameIsOver = true;
        for (var counterState of gameState) {
          if (counterState == 2) {
            gameIsOver = false;
          }
        }

        if (gameIsOver) {
          msgOutput.innerText = "Fue un empate!";
          gameIsActive = false;
        }
      }
    }

  }