"use strict";
const cpuBtn = document.querySelector('.vs-cpu');
const humanBtn = document.querySelector('.vs-player');
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const xPath = document.querySelector('.x-path');
const oPath = document.querySelector('.o-path');
const optionO = document.querySelector(".o-option");
const turnMarker = document.querySelector(".turn-img");
const userScoreEl = document.querySelector(".user-score");
const drawScoreEl = document.querySelector(".draw-score");
const oppScoreEl = document.querySelector(".opp-score");
const resultModal = document.querySelector('.result-modal');
const winnerP1 = document.querySelector('.winner');
const markModal = document.querySelector('.modal-mark');
const textModal = document.querySelector('.modal-text');
const quitBtn = document.querySelector('.modal-quit');
const nextRoundBtn = document.querySelector('.modal-next-round');
const global = {
    isOpponentHuman: false,
    isUserTurn: true,
    userMark: "",
    oppMark: "",
    isUserWinner: false,
    isOppWinner: false,
    isDraw: false,
    userScore: 0,
    oppScore: 0,
    drawScore: 0,
};
// -------------- INDEX
// SET GAME MARKS
const initMarks = () => {
    optionX === null || optionX === void 0 ? void 0 : optionX.addEventListener("click", function () {
        checkActive();
        if (optionO === null || optionO === void 0 ? void 0 : optionO.classList.contains('bg-silver')) {
            optionO.classList.remove("bg-silver");
            oPath.style.fill = '#A8BFC9';
        }
        optionX.classList.add("bg-silver");
        xPath.style.fill = '#1A2A33';
        localStorage.setItem("userMark", "x");
        localStorage.setItem("oppMark", "o");
    });
    optionO === null || optionO === void 0 ? void 0 : optionO.addEventListener("click", function () {
        checkActive();
        if (optionX === null || optionX === void 0 ? void 0 : optionX.classList.contains('bg-silver')) {
            optionX.classList.remove("bg-silver");
            xPath.style.fill = '#A8BFC9';
        }
        optionO.classList.add("bg-silver");
        oPath.style.fill = '#1A2A33';
        localStorage.setItem("userMark", "o");
        localStorage.setItem("oppMark", "x");
    });
    cpuBtn === null || cpuBtn === void 0 ? void 0 : cpuBtn.addEventListener('click', function () {
        localStorage.setItem('isOppHuman', 'false');
    });
    humanBtn === null || humanBtn === void 0 ? void 0 : humanBtn.addEventListener('click', function () {
        localStorage.setItem('isOppHuman', 'true');
    });
};
const checkOpp = () => {
    global.isOpponentHuman = JSON.parse((localStorage.getItem('isOppHuman') || ""));
    console.log(global.isOpponentHuman);
};
const assignMarks = () => {
    global.userMark = localStorage.getItem("userMark") || "";
    global.oppMark = localStorage.getItem("oppMark") || "";
    if (global.oppMark === 'x') {
        setTimeout(function () { cpuMove(); }, 800);
    }
};
const fetchScores = () => {
    global.userScore = Number(localStorage.getItem("userScore"));
    global.oppScore = Number(localStorage.getItem("oppScore"));
    global.drawScore = Number(localStorage.getItem("drawScore"));
    updateScore();
};
const checkActive = () => {
    switch (global.userMark) {
        case "o":
            if (optionO === null || optionO === void 0 ? void 0 : optionO.classList.contains("bg-silver")) {
                optionO.classList.remove("bg-silver");
            }
            break;
        case "x":
            if (optionX === null || optionX === void 0 ? void 0 : optionX.classList.contains("bg-silver")) {
                optionX.classList.remove("bg-silver");
            }
            break;
    }
};
// -------------- GAME
// RESET GAME
const reset = () => {
    gameBoxArr.forEach((gameBox) => {
        const image = gameBox.querySelector("img");
        if (image) {
            image.style.visibility = "hidden";
            console.log("clicked");
        }
        gameBox.id = "";
        global.isUserWinner = false;
        global.isOppWinner = false;
        global.isDraw = false;
        global.userMark === "x"
            ? (global.isUserTurn = true)
            : (global.isUserTurn = false);
        checkTurn();
    });
    console.log('Reset');
};
gameBoxArr.forEach((gameBox) => {
    gameBox === null || gameBox === void 0 ? void 0 : gameBox.addEventListener("click", function () {
        if (gameBox.id) {
            console.log('Invalid Move');
            return;
        }
        else {
            gameBox.innerHTML = "";
            if (global.isUserTurn) {
                gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.userMark}.svg" alt="" class="p-3" id=""/>
            `;
                gameBox.id = `${global.userMark}-mark`;
                global.isUserTurn = false;
            }
            else if (global.isOpponentHuman && !global.isUserTurn) {
                gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.oppMark}.svg" alt="" class="p-3"/>
            `;
                gameBox.id = `${global.oppMark}-mark`;
                global.isUserTurn = true;
            }
        }
        checkTurn();
        checkWinner();
        if (global.isOpponentHuman === false) {
            if (isGameOver() === false && global.isUserWinner === false && global.isOppWinner === false) {
                console.log(isGameOver(), global.isUserWinner, global.isOppWinner);
                setTimeout(function () { cpuMove(); }, 800);
            }
            else {
                return;
            }
        }
    });
});
const generateRandomNum = () => {
    const numOfBoxes = gameBoxArr.length;
    const random = Math.abs(Math.floor(Math.random() * numOfBoxes - 1));
    return random;
};
const cpuMove = () => {
    const randomNum = generateRandomNum();
    console.log(randomNum);
    if (gameBoxArr[randomNum].id && !isGameOver()) {
        cpuMove();
    }
    else {
        gameBoxArr[randomNum].innerHTML = `
            <img src="../assets/images/icon-${global.oppMark}.svg" alt="" class="p-3" id=""/>
            `;
        gameBoxArr[randomNum].id = `${global.oppMark}-mark`;
        global.isUserTurn = true;
        checkTurn();
        checkWinner();
    }
};
// CHECK TURN
const checkTurn = () => {
    global.isUserTurn
        ? turnMarker === null || turnMarker === void 0 ? void 0 : turnMarker.setAttribute("src", `../assets/images/icon-${global.userMark}.svg`)
        : turnMarker === null || turnMarker === void 0 ? void 0 : turnMarker.setAttribute("src", `../assets/images/icon-${global.oppMark}.svg`);
};
// CHECK WINNER
const checkWinner = () => {
    if (
    // First Row
    gameBoxArr[0].id != "" &&
        gameBoxArr[0].id === gameBoxArr[1].id &&
        gameBoxArr[1].id === gameBoxArr[2].id) {
        console.log("First Row Win");
        if (gameBoxArr[0].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Second Row
    gameBoxArr[3].id != "" &&
        gameBoxArr[3].id === gameBoxArr[4].id &&
        gameBoxArr[3].id === gameBoxArr[5].id) {
        console.log("Second Row Win");
        if (gameBoxArr[3].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Third Row
    gameBoxArr[6].id != "" &&
        gameBoxArr[6].id === gameBoxArr[7].id &&
        gameBoxArr[6].id === gameBoxArr[8].id) {
        console.log("Third Row Win");
        if (gameBoxArr[6].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // First Col
    gameBoxArr[0].id != "" &&
        gameBoxArr[0].id === gameBoxArr[3].id &&
        gameBoxArr[0].id === gameBoxArr[6].id) {
        console.log("First Col Win");
        if (gameBoxArr[0].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Second Col
    gameBoxArr[1].id != "" &&
        gameBoxArr[1].id === gameBoxArr[4].id &&
        gameBoxArr[1].id === gameBoxArr[7].id) {
        console.log("Second Col Win");
        if (gameBoxArr[1].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Third Col
    gameBoxArr[2].id != "" &&
        gameBoxArr[2].id === gameBoxArr[5].id &&
        gameBoxArr[2].id === gameBoxArr[8].id) {
        console.log("Third Col Win");
        if (gameBoxArr[2].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Left to Right Diagonal
    gameBoxArr[0].id != "" &&
        gameBoxArr[0].id === gameBoxArr[4].id &&
        gameBoxArr[0].id === gameBoxArr[8].id) {
        console.log("Left to Right Diagonal Win");
        if (gameBoxArr[0].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (
    // Right to Left Diagonal
    gameBoxArr[2].id != "" &&
        gameBoxArr[2].id === gameBoxArr[4].id &&
        gameBoxArr[2].id === gameBoxArr[6].id) {
        console.log("Right to Left Diagonal Win");
        if (gameBoxArr[2].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else {
        global.isUserWinner = false;
        global.isOppWinner = false;
    }
    if (global.isUserWinner === true || global.isOppWinner === true || global.isDraw === true) {
        console.log('Winner Found');
        GetWinner();
    }
    // }
};
const isGameOver = () => {
    if (gameBoxArr[0].id != "" &&
        gameBoxArr[1].id != "" &&
        gameBoxArr[2].id != "" &&
        gameBoxArr[3].id != "" &&
        gameBoxArr[4].id != "" &&
        gameBoxArr[5].id != "" &&
        gameBoxArr[6].id != "" &&
        gameBoxArr[7].id != "" &&
        gameBoxArr[8].id != "") {
        return true;
    }
    else if (global.isUserWinner || global.isOppWinner || global.isDraw) {
        return true;
    }
    else {
        return false;
    }
};
// DISPLAY WINNER
const GetWinner = () => {
    if (isGameOver()) {
        if (global.isUserWinner) {
            console.log("Player 1 Wins!");
            global.userScore++;
            localStorage.setItem("userScore", global.userScore.toString());
        }
        else if (global.isOppWinner) {
            console.log("Player 2 Wins!");
            global.oppScore++;
            localStorage.setItem("oppScore", global.oppScore.toString());
        }
        else if (isGameOver()) {
            console.log("Draw!");
            global.drawScore++;
            global.isDraw = true;
            localStorage.setItem("drawScore", global.drawScore.toString());
        }
        console.log(global);
        updateScore();
    }
    else {
        return;
    }
};
const updateScore = () => {
    userScoreEl.innerText = `${global.userScore}`;
    oppScoreEl.innerText = `${global.oppScore}`;
    drawScoreEl.innerText = `${global.drawScore}`;
    if (global.isUserWinner || global.isOppWinner || global.isDraw) {
        setTimeout(function () {
            reset();
        }, 2000);
    }
};
const initGame = () => {
    gameBoxArr.forEach((gameBox) => {
        const image = gameBox.querySelector("img");
        if (image) {
            image.style.visibility = "hidden";
        }
    });
    resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', reset);
    assignMarks();
    fetchScores();
};
// Router
const InitApp = () => {
    switch (window.location.pathname) {
        case "/dist/index.html":
            console.log("Index");
            initMarks();
            break;
        case "/dist/game.html":
            console.log("Game");
            // fetchScores();
            initGame();
            checkOpp();
            // fetchScores();
            // assignMarks();
            break;
    }
};
InitApp();
