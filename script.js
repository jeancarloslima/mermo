const dictionary = ['mermo','amigo', 'terra', 'aurea', 'pouco', 'carro', 'barro', 'jarro', 'sagaz','amago', 'negro', 'exito','mexer',
'termo','senso','nobre','algoz','afeto','plena','etica','mutua','tenue','sutil','vigor','aquem','fazer','porem','audaz','sanar','secao','assim','inato','cerne','ideia','fosse','desde','poder','moral','torpe','muito','honra','justo','futil','anexo','razao','etnia','quica','sobre','icone','sonho','tange','egide','lapso','mutuo','expor','haver','habil','casal','tempo','porra','seara','pesar','avido','posse','então','dengo','boçal','genro','coser','ardil','corja','causa','prole','paria','dizer','detem','tenaz','dever','digno','saber','obice','crivo','apice','graça','ansia','animo','ceder','brado','orgia','gleba','comum','assaz','sendo','culto','atroz','temor','mundo','pauta','censo','fugaz','ainda','denso','cozer','valha','nenem','forte','vicio','estar','vulgo','reves','pudor','regra','dogma','louco','criar','banal','impor','tenro','pifio',
]
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
        currentRow: 0,
        currentCol: 0,
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j <state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);  
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('Palavra Inválida!!!');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    }
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        if (letter === state.secret[i]) {
            box.classList.add('right');
        } else if (state.secret.includes(letter)) {
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }
        
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    if (isWinner) {
        alert('Parabéns, amigo');
    } else if (isGameOver) {
        alert(`Mas tu é burro, hein. A palavra era ${state.secret}.`);
    }
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    registerKeyboardEvents();

    console.log(state.secret);
}

startup();