const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = Array(9).fill("");
let current = "X";
let running = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function setStatus(msg){
  statusEl.innerHTML = msg;
}

function renderTurn(){
  setStatus(`Turn: <strong>${current}</strong>`);
}

function handleClick(e){
  if(!running) return;

  const idx = +e.currentTarget.dataset.index;
  if(board[idx] !== "") return;

  board[idx] = current;
  e.currentTarget.textContent = current;
  e.currentTarget.classList.add(current.toLowerCase(), "filled");

  const win = getWinner();
  if(win){
    win.forEach(i => cells[i].classList.add("winner"));
    setStatus(`Player <strong>${current}</strong> wins!`);
    running = false;
    return;
  }

  if(board.every(v => v !== "")){
    setStatus(`It's a <strong>draw</strong>.`);
    running = false;
    return;
  }

  current = current === "X" ? "O" : "X";
  renderTurn();
}

function getWinner(){
  for(const trio of wins){
    const [a,b,c] = trio;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      return trio; // winning indices
    }
  }
  return null;
}

function restart(){
  board.fill("");
  current = "X";
  running = true;
  cells.forEach(c=>{
    c.textContent = "";
    c.classList.remove("x","o","winner","filled");
  });
  renderTurn();
}

// init
cells.forEach(c => c.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restart);
renderTurn();
