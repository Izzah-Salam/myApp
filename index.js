const board = document.getElementById("board");
const cells = board.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart");
const player = document.querySelector(".player");
let currentPlayer = "0";
let gameOver = false;

// Function to check for a win
function checkWin(player) {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // Rows
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // Columns
		[0, 4, 8],
		[2, 4, 6], // Diagonals
	];

	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (
			cells[a].textContent === player &&
			cells[b].textContent === player &&
			cells[c].textContent === player
		) {
			return true;
		}
	}

	return false;
}

// Function to handle cell click
function handleCellClick(e) {
	const cell = e.target;

	if (cell.textContent || gameOver) return;

	//changing cell color
	cell.style.color = getColor(currentPlayer);
	//changing cell text
	cell.textContent = currentPlayer;

	if (checkWin(currentPlayer)) {
		alert(`Player ${currentPlayer} wins!`);
		gameOver = true;
		restartButton.removeAttribute("disabled");
	} else if ([...cells].every((cell) => cell.textContent)) {
		alert("It's a draw!");
		gameOver = true;
		restartButton.removeAttribute("disabled");
	} else {
		currentPlayer = currentPlayer === "0" ? "X" : "0";
		player.textContent = `Player ${currentPlayer}'s turn`;
	}
}

//function to apply style
function getColor(player) {
	return player === "X" ? "#983333" : "#000";
}

// Function to restart the game
function restartGame() {
	cells.forEach((cell) => {
		cell.textContent = "";
	});
	currentPlayer = coinToss();
	gameOver = false;
	player.textContent = `Player ${currentPlayer}'s turn`;
	restartButton.setAttribute("disabled", "disabled");
}

// Function to simulate a coin toss to decide the first player
function coinToss() {
	return Math.random() < 0.5 ? "0" : "X";
}

// Add a click event listener to the restart button
restartButton.addEventListener("click", restartGame);
// Add click event listener to each cell
cells.forEach((cell) => {
	cell.addEventListener("click", handleCellClick);
});
// Initialize the first player based on the coin toss
currentPlayer = coinToss();
player.textContent = `Player ${currentPlayer}'s turn`;
