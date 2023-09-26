const confirmButton = document.querySelector("#confirm_button");
const container = document.querySelector("#container");

confirmButton.addEventListener("click", () => {
  const rows = document.querySelector("#row_input").value;
  const columns = document.querySelector("#column_input").value;

  const maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < columns; j++) {
      maze[i][j] = 1;
    }
  }

  function generateMaze(x, y) {
    if (x < 0 || y < 0 || x >= rows || y >= columns || maze[x][y] === 0) {
      return;
    }

    maze[x][y] = 0;

    const directions = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    // Shuffle the directions randomly
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    // Recursively visit neighboring cells
    for (const [dx, dy] of directions) {
      generateMaze(x + 2 * dx, y + 2 * dy);
    }
  }

  generateMaze(0, 0);
  maze[0][1] = 0; // Opening at the beginning (start)
  maze[rows - 1][columns - 2] = 0; // Opening at the end (finish)
  console.log("Maze Generated.", maze);
  maze.forEach((row) => {
    const convertedRow = row.map((element) => {
      return element === 1 ? "⌧" : "☐";
    });
    console.log(convertedRow.join(""));
    const rowDisplay = document.createElement("div");
    rowDisplay.textContent = convertedRow.join("");
    container.appendChild(rowDisplay);
  });
});
