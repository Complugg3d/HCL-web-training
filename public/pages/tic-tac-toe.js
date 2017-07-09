var cells = document.getElementsByClassName('cell');
var activePlayer = 1; // 0 is O 1 is x
for(var i = 0; i < cells.length; i++) {
   cells[i].addEventListener("click", cellClick);
}

function changeCursor(swap) {
  for(var i = 0; i < cells.length; i++) {
    if(swap) {
      cells[i].classList.remove("cross");
      cells[i].classList.add("circle");
    } else {
      cells[i].classList.remove("circle");
      cells[i].classList.add("cross");
    }
  }
}

function cellClick(e) {
  if(activePlayer === 1 ) {
    changeCursor(true);
    activePlayer = 0;
  } else {
    changeCursor(false);
    activePlayer = 1;
  }
}
