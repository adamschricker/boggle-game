"use strict";

(() => {
  /***************/
  /** VARIABLES **/
  /***************/

  // Based this array on dice from a Boggle game
  const dice = [
    ["Qu", "A", "M", "O", "B", "J"],
    ["F", "I", "R", "O", "B", "X"],
    ["P", "D", "C", "M", "E", "A"],
    ["D", "E", "N", "O", "D", "N"],
    ["Y", "L", "G", "U", "K", "L"],
    ["G", "T", "N", "V", "I", "E"],
    ["U", "L", "E", "P", "T", "S"],
    ["A", "L", "E", "R", "C", "S"],
    ["F", "I", "H", "E", "E", "Y"],
    ["O", "R", "A", "M", "S", "H"],
    ["O", "C", "A", "T", "A", "I"],
    ["O", "T", "U", "K", "N", "D"],
    ["P", "H", "N", "S", "E", "I"],
    ["N", "V", "D", "Z", "A", "E"],
    ["T", "L", "Y", "B", "A", "I"],
    ["G", "W", "R", "L", "I", "U"],
  ];

  let rotate = 0;
  let timer = 0;

  const gameBoard = document.querySelector("#game-board");
  const gameInfo = document.querySelector("#game-info");
  const gameTimer = document.querySelector("#game-timer");
  const rotateButton = document.querySelector("#rotate-button");
  const startButton = document.querySelector("#start-button");



  /***************************/
  /** General Use Functions **/
  /***************************/

  const setClass = (element, CSSclass) => {
    element.classList.remove(...element.classList);
    if (typeof CSSclass !== "undefined") {
      element.classList.add(CSSclass);
    }
  }

  const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const randomArrayEntry = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }



  /*************************/
  /** GameBoard Functions **/
  /*************************/

  const sizeBoard = () => {
    gameBoard.style.height = "100%";
    gameBoard.style.width = "100%";
    const height = gameBoard.clientHeight;
    const width = gameBoard.clientWidth;
    const max = Math.min(height, width);
    gameBoard.style.fontSize = Math.floor(max / 6) + "px";
    gameBoard.style.height = max + "px";
    gameBoard.style.width = max + "px";
  }

  const rotateBoard = () => {
    rotate++;
    if (rotate > 3) { rotate = 0; }
    setClass(gameBoard, "rotate" + rotate);
  }

  const displayGameBoard = () => {
    clearElement(gameBoard);
    shuffleArray(dice);
    dice.forEach((_, index) => {
      const die = document.createElement("div");
      die.innerHTML = randomArrayEntry(_);
      gameBoard.appendChild(die);
    });
    sizeBoard();
    startTimer();
  }



  /*********************/
  /** Timer Functions **/
  /*********************/

  const startTimer = () => {
    timer = 181;
    updateTimer();
    setClass(gameTimer);
  }

  const updateTimer = () => {
    timer--;
    if (timer > 0) {
      const minutes = Math.floor(timer / 60);
      let seconds = (timer % 60).toString();
      if (seconds.length < 2) {
        seconds = "0" + seconds;
      }
      gameTimer.innerHTML = "TIME LEFT: " + minutes + ":" + seconds;
      setTimeout(updateTimer, 1000);
    } else {
      gameTimer.innerHTML = "TIME'S UP";
      setClass(gameTimer, "timeOut");
    }
  }



  /*************************************/
  /** Game Buttons and Start Function **/
  /*************************************/

  const startGame = () => {
    setClass(gameInfo, "hide");
    setClass(rotateButton);
    displayGameBoard();
  }

  rotateButton.addEventListener("click", () => { rotateBoard(); });

  startButton.addEventListener("click", () => { startGame(); });

})();
