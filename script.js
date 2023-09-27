const clearButton = document.getElementById("clear_button");

clearButton.addEventListener("click", function () {
  const container = document.getElementById("container");
  container.innerHTML = "";
});

const confirmButton = document.querySelector("#confirm_button");
const container = document.querySelector("#container");

confirmButton.addEventListener("click", async () => {
  const width = document.querySelector("#width_input").value;
  const height = document.querySelector("#height_input").value;

  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => true)
  );

  const startRow = Number(document.querySelector("#row_start").value);
  const startCol = Number(document.querySelector("#column_start").value);

  grid[startRow][startCol] = false;

  const wallColor = document.querySelector("#wall_selector").value;
  const pathColor = document.querySelector("#path_selector").value;

  function getNeighbors(row, col) {
    const neighbors = [];
    if (row >= 2) neighbors.push([row - 2, col]);
    if (row <= height - 3) neighbors.push([row + 2, col]);
    if (col >= 2) neighbors.push([row, col - 2]);
    if (col <= width - 3) neighbors.push([row, col + 2]);
    return neighbors;
  }

  function generateMaze(row, col) {
    const neighbors = getNeighbors(row, col);
    neighbors.sort(() => Math.random() - 0.5);

    for (const [nextRow, nextCol] of neighbors) {
      if (grid[nextRow][nextCol]) {
        const wallRow = (row + nextRow) / 2;
        const wallCol = (col + nextCol) / 2;
        grid[wallRow][wallCol] = false;
        grid[nextRow][nextCol] = false;
        generateMaze(nextRow, nextCol);
      }
    }
  }

  generateMaze(startRow, startCol);

  const titleDisplay = document.createElement("div");
  titleDisplay.textContent = `MAZE ${width}x${height}`;
  container.appendChild(titleDisplay);

  for (let i = 0; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      row += grid[i][j] ? wallColor : pathColor;
    }
    const rowDisplay = document.createElement("div");

    rowDisplay.textContent = row;

    container.appendChild(rowDisplay);
  }
});
