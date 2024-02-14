let size, board, playerSign, gameOver;

const boardEl = document.getElementById("board");
const startGameButton = document.getElementById("startGameButton");

boardEl.addEventListener("click", onMarkCell);
startGameButton.addEventListener("click", startGame);

function startGame() {
  size = 3;
  playerSign = "X";
  gameOver = false;
  initBoard();
  renderPlayerSign();
  renderBoard();
}

function initBoard() {
  board = new Array(size);
  for (let i = 0; i < size; i++) board[i] = new Array(size).fill("");
}

function renderPlayerSign() {
  const playerSignEl = document.getElementById("playerSign");
  playerSignEl.textContent = playerSign;
}

function renderBoard() {
  const boardFragment = document.createDocumentFragment();
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("p");
      cell.classList.add("cell");
      cell.textContent = board[i][j];
      cell.dataset.row = i;
      cell.dataset.col = j;
      row.appendChild(cell);
    }
    boardFragment.appendChild(row);
  }
  boardEl.replaceChildren(boardFragment);
}

function onMarkCell(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (gameOver || !row || !col) return;

  if (board[row][col] !== "") return;

  board[row][col] = playerSign;
  renderBoard();
  checkForPlayerWinCondition(row, col);
  checkForBoardFill();
  togglePlayerSign();
  renderPlayerSign();
}

function checkForPlayerWinCondition(row, col) {
  let pDiagonal = 0,
    sDiagonal = 0,
    j = size - 1,
    horizontal = 0,
    vertical = 0;
  for (let i = 0; i < size; i++) {
    if (board[i][i] === playerSign) pDiagonal += 1;
    if (board[i][j] === playerSign) sDiagonal += 1;
    if (board[row][i] === playerSign) horizontal += 1;
    if (board[i][col] === playerSign) vertical += 1;
    j -= 1;
  }

  if ([pDiagonal, sDiagonal, horizontal, vertical].includes(size)) {
    endGame();
    return;
  }

  // Primary diagonal check
  let count = 0,
    i = 0;
  for (i = 0; i < size; i++) {
    if (board[i][i] === playerSign) count += 1;
  }

  if (count === size) {
    endGame();
    return;
  }

  // Secondary diagonal check
  count = 0;
  i = 0;
  j = size - 1;
  while (i < size && j >= 0) {
    if (board[i][j] === playerSign) count += 1;

    i += 1;
    j -= 1;
  }

  if (count === size) {
    endGame();
    return;
  }

  // Rows
  for (i = 0; i < size; i++) {
    count = 0;
    for (j = 0; j < size; j++) {
      if (board[i][j] === playerSign) count += 1;
    }

    if (count === size) {
      endGame();
      return;
    }
  }

  // Columns
  for (j = 0; j < size; j++) {
    count = 0;
    for (i = 0; i < size; i++) {
      if (board[i][j] === playerSign) count += 1;
    }

    if (count === size) {
      endGame();
      return;
    }
  }
}

function checkForBoardFill() {
  if (gameOver) return;

  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (board[i][j] === "") return;
    }
  }

  endGame(true);
}

function endGame(tie = false) {
  console.log(tie ? "Tied" : `${playerSign} won`);
  gameOver = true;
}

function togglePlayerSign() {
  if (playerSign === "X") playerSign = "O";
  else playerSign = "X";
}
