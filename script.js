const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll('.cell');
    const btnX = document.querySelector('#X');
    const btnO = document.querySelector('#O');
    let currentPlayer = null;

    //gameboard marker
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-cell-index');
            if (board[index] === '' && e.target.innerText === '' && currentPlayer !== null) {
                board[index] = currentPlayer;
                e.target.innerText = currentPlayer;
            }

            if (checkWin(board, currentPlayer)) {
                alert(`Player ${currentPlayer} wins!`);
                gameReset();
                currentPlayer = null;
            } else if (checkDraw(board)) {
                alert('The game is a draw.');
                gameReset();
                currentPlayer = null;
            }
        
            if (currentPlayer === 'X' || currentPlayer === 'O')
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });   
    });

    btnX.addEventListener('click', () => {
        currentPlayer = 'X';
    });

    btnO.addEventListener('click', () => {
        currentPlayer = 'O';
    });

    function gameReset() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
            cells[i].innerText = "";
        }
    }

    function checkWin(board, player) {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winCondition.length; i++) {
            if (board[winCondition[i][0]] === player &&
                board[winCondition[i][1]] === player &&
                board[winCondition[i][2]] === player) {
                return true;
            }
        }

        return false;
    }

    function checkDraw(board) {
        return !board.includes('');
    }
})();