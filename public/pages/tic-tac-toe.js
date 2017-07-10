var cells = document.getElementsByClassName('cell');
var activePlayer = 1; // 0 is O 1 is x
var gameState = [2,2,2,2,2,2,2,2,2]; // 2 means unplayed
var winningPositions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

for(var i = 0; i < cells.length; i++) {
   cells[i].addEventListener("click", cellClick);
}

function changeCursor(swap) {
  for(var i = 0; i < cells.length; i++) {
    if(swap) {
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
  
  var tapCounter = e.srcElement.getAttribute("cell-no");
  console.log(tapCounter);

  if(activePlayer === 1 ) {
    changeCursor(true);
    e.srcElement.classList.add("cross");
    activePlayer = 0;
  } else {
    changeCursor(false);
    activePlayer = 1;
    e.srcElement.classList.add("circle");
  }
}
