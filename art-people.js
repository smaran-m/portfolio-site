console.log("art-people.js is loaded and running");

document.addEventListener('DOMContentLoaded', function() {
    let animationContainer = document.getElementById('asciiAnimation');

    if (!animationContainer) {
        console.log("Animation container not found. Creating one.");
        animationContainer = document.createElement('div');
        animationContainer.id = 'asciiAnimation';
        animationContainer.className = 'ascii-animation';
        document.body.appendChild(animationContainer);
    }

    const backgroundChars = 'ㅍㅁㅍㅁㅍㅁㅍ';
    const movingChars = ['홋', '옷', '𖨆', '𐀪', '𖠋'];
    const stoppedChar = '𖧀';
    //const movingChars = ['👥', '👤'];
    //const stoppedChar = '🤔';
    const numRows = 2;
    const charsPerRow = 5; // Number of moving characters per row
    let numCols;
    let grid = [];
    let characters = [];

    function updateColumnCount() {
        const charWidth = 0.7; // Assuming each character is roughly 0.7em wide
        numCols = Math.floor(window.innerWidth / (charWidth * 16)); // 16 is the font-size in pixels
        animationContainer.style.width = `${numCols * charWidth}em`;
    }

    function createCharacter(row, col) {
        return {
            id: Math.random().toString(36).substr(2, 9),
            char: movingChars[Math.floor(Math.random() * movingChars.length)],
            row: row,
            col: col,
            direction: Math.random() < 0.5 ? -1 : 1,
            isStopped: false,
            stopCounter: 0
        };
    }

    function createGrid() {
        grid = [];
        characters = [];
        for (let i = 0; i < numRows; i++) {
            let row = [];
            for (let j = 0; j < numCols; j++) {
                row.push({
                    char: backgroundChars[j % backgroundChars.length],
                    characterId: null
                });
            }
            grid.push(row);
        }

        // Add moving characters
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < charsPerRow; j++) {
                let col;
                do {
                    col = Math.floor(Math.random() * numCols);
                } while (grid[i][col].characterId !== null);

                const character = createCharacter(i, col);
                characters.push(character);
                grid[i][col].characterId = character.id;
                grid[i][col].char = character.char;
            }
        }
    }

    function renderGrid() {
        animationContainer.innerHTML = '';
        for (let i = 0; i < numRows; i++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'ascii-row';
            for (let j = 0; j < numCols; j++) {
                const cellElement = document.createElement('span');
                cellElement.textContent = grid[i][j].char;
                cellElement.style.color = grid[i][j].characterId !== null ? 'black' : 'brown';
                rowElement.appendChild(cellElement);
            }
            animationContainer.appendChild(rowElement);
        }
    }

    function updateGrid() {
        const newGrid = JSON.parse(JSON.stringify(grid)); // Deep copy of the grid

        characters.forEach(character => {
            if (character.isStopped) {
                character.stopCounter++;
                if (character.stopCounter >= 2) { // Stop for 2 cycles (1 second)
                    character.isStopped = false;
                    character.stopCounter = 0;
                    character.char = movingChars[Math.floor(Math.random() * movingChars.length)];
                    newGrid[character.row][character.col].char = character.char;
                }
                return;
            }

            const newCol = character.col + character.direction;

            if (newCol < 0 || newCol >= numCols) {
                character.direction *= -1;
                return;
            }

            if (Math.random() < 0.05) { // 1% chance to stop
                character.isStopped = true;
                character.char = stoppedChar;
                newGrid[character.row][character.col].char = stoppedChar;
                return;
            }

            if (newGrid[character.row][newCol].characterId === null) {
                // Move to the new cell
                newGrid[character.row][newCol].characterId = character.id;
                newGrid[character.row][newCol].char = character.char;
                newGrid[character.row][character.col].characterId = null;
                newGrid[character.row][character.col].char = backgroundChars[character.col % backgroundChars.length];
                character.col = newCol;
            } else {
                // Collision: change direction
                character.direction *= -1;
            }
        });

        grid = newGrid;
        renderGrid();
    }

    function initializeAnimation() {
        updateColumnCount();
        createGrid();
        renderGrid();
    }

    // Initial setup
    initializeAnimation();

    // Update grid and render every 500ms
    setInterval(updateGrid, 300);

    // Update on window resize
    window.addEventListener('resize', initializeAnimation);
});