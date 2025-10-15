const words = ["javascript", "programa", "ahorcado", "desarrollo", "computadora"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = Array(selectedWord.length).fill("_");
let attempts = 6;
let wrongLetters = [];

const wordDisplay = document.getElementById("word");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const restartBtn = document.getElementById("restart-btn");
const hangmanFigure = document.getElementById("hangman-figure");

const hangmanStages = [
    `
   +---+
   |   |
       |
       |
       |
       |
=========
`,
    `
   +---+
   |   |
   O   |
       |
       |
       |
=========
`,
    `
   +---+
   |   |
   O   |
   |   |
       |
       |
=========
`,
    `
   +---+
   |   |
   O   |
  /|   |
       |
       |
=========
`,
    `
   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========
`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========
`,
    `
   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========
`
];

function updateDisplay() {
    wordDisplay.textContent = hiddenWord.join(" ");
    attemptsDisplay.textContent = attempts;
    wrongLettersDisplay.textContent = wrongLetters.join(", ");
    hangmanFigure.textContent = hangmanStages[6 - attempts];
}

function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    if (!letter || !/[a-zñ]/.test(letter)) {
        message.textContent = "Ingresa una letra válida.";
        return;
    }
    if (hiddenWord.includes(letter) || wrongLetters.includes(letter)) {
        message.textContent = "Ya intentaste esa letra.";
        return;
    }

    message.textContent = "";
    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((l, i) => {
            if (l === letter) hiddenWord[i] = letter;
        });
    } else {
        wrongLetters.push(letter);
        attempts--;
    }

    updateDisplay();
    letterInput.value = "";
    letterInput.focus();

    if (!hiddenWord.includes("_")) {
        message.textContent = "🎉 ¡Ganaste!";
        guessBtn.disabled = true;
    } else if (attempts <= 0) {
        message.textContent = `💀 Perdiste. La palabra era: ${selectedWord}`;
        guessBtn.disabled = true;
    }
}

guessBtn.addEventListener("click", guessLetter);
letterInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") guessLetter();
});

restartBtn.addEventListener("click", () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    hiddenWord = Array(selectedWord.length).fill("_");
    attempts = 6;
    wrongLetters = [];
    message.textContent = "";
    guessBtn.disabled = false;
    updateDisplay();
});

updateDisplay();
