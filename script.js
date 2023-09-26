const confirmButton = document.querySelector("#confirm_button");
const container = document.querySelector("#container");

confirmButton.addEventListener("click", async () => {
  const width = document.querySelector("#width_input").value;
  const height = document.querySelector("#height_input").value;
  // Create a grid filled with walls
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => true)
  );

  // Initialize starting point
  const startRow = Number(document.querySelector("#row_start").value);
  const startCol = Number(document.querySelector("#column_start").value);

  // Mark the starting point as a passage
  grid[startRow][startCol] = false;
  console.log(grid);

  // Helper function to get neighbors of a cell
  function getNeighbors(row, col) {
    const neighbors = [];
    if (row >= 2) neighbors.push([row - 2, col]);
    if (row <= height - 3) neighbors.push([row + 2, col]);
    if (col >= 2) neighbors.push([row, col - 2]);
    if (col <= width - 3) neighbors.push([row, col + 2]);
    return neighbors;
  }

  // Function to generate the maze
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

  // Start generating the maze from the starting point
  generateMaze(startRow, startCol);

  // Print the maze (for demonstration purposes)
  for (let i = 0; i < height; i++) {
    let row = "";
    for (let j = 0; j < width; j++) {
      row += grid[i][j] ? "⬛" : "⬜";
    }
    console.log(row);
    const rowDisplay = document.createElement("div");
    rowDisplay.textContent = row;
    container.appendChild(rowDisplay);
  }
});
