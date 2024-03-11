window.onload = function() {
    app.init();
}

class App {
    constructor() {
        this.winningVariants = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        this.currentPlayer = "X";
        this.cells = document.querySelectorAll(".cell");
        this.winnerElement = document.getElementById("winner");
        this.restartButton = document.getElementById("restart-game");
        this.init();
    }

    init = () => {
        this.cells.forEach(cell => {
            cell.addEventListener("click", this.cellClick);
        });
        this.restartButton.addEventListener("click", this.initGame);
    }

    cellClick = (e) => {
        const cell = e.target;
        if (cell.textContent) return;
        cell.textContent = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer === "X") ? "O" : "X";
        this.checkWinner();
    }

    initGame = () => {
        this.currentPlayer = "X";
        this.cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("highlighted");
            cell.addEventListener("click", this.cellClick);
        });
        this.setWinner("");
    }

    checkWinner = () => {
        for (let i = 0; i < this.winningVariants.length; i++) {
            const variant = this.winningVariants[i];
            const [a, b, c] = variant.map(index => this.cells[index].textContent);
            if (a && a === b && b === c) {
                this.setWinner("The winner is: " + a);
                this.highlightCells(variant);
                this.cells.forEach(cell => cell.removeEventListener("click", this.cellClick));
            }
        }
    }

    highlightCells = (array) => {
        array.forEach(index => {
            this.cells[index].classList.add("highlighted");
        });
    }

    setWinner = (str) => {
        this.winnerElement.textContent = str;
    }
}

const app = new App();