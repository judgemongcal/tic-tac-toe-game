"use strict";
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const optionO = document.querySelector(".o-option");
const turnMarker = document.querySelector(".turn-img");
const userScoreEl = document.querySelector(".user-score");
const drawScoreEl = document.querySelector(".draw-score");
const oppScoreEl = document.querySelector(".opp-score");
const global = {
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
        optionX.classList.add("bg-silver");
        localStorage.setItem("userMark", "x");
        localStorage.setItem("oppMark", "o");
    });
    optionO === null || optionO === void 0 ? void 0 : optionO.addEventListener("click", function () {
        checkActive();
        optionO.classList.add("bg-silver");
        localStorage.setItem("userMark", "o");
        localStorage.setItem("oppMark", "x");
    });
};
const assignMarks = () => {
    global.userMark = localStorage.getItem("userMark") || "";
    global.oppMark = localStorage.getItem("oppMark") || "";
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
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", function () {
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
    });
});
gameBoxArr.forEach((gameBox) => {
    gameBox === null || gameBox === void 0 ? void 0 : gameBox.addEventListener("click", function () {
        gameBox.innerHTML = "";
        if (global.isUserTurn) {
            gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.userMark}.svg" alt="" class="p-3"/>
            `;
            gameBox.id = `${global.userMark}-mark`;
            global.isUserTurn = false;
        }
        else {
            gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.oppMark}.svg" alt="" class="p-3" id="${global.oppMark}"/>
            `;
            gameBox.id = `${global.oppMark}-mark`;
            global.isUserTurn = true;
        }
        checkTurn();
        checkWinner();
    });
});
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
        if (gameBoxArr[0].id === `${global.userMark}-mark`) {
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
        global.isDraw = true;
    }
    GetWinner();
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
    else {
        return false;
    }
};
// DISPLAY WINNER
const GetWinner = () => {
    if (global.isUserWinner) {
        console.log("Player 1 Wins!");
        global.userScore++;
    }
    else if (global.isOppWinner) {
        console.log("Player 2 Wins!");
        global.oppScore++;
    }
    else if (isGameOver()) {
        console.log("Draw!");
        global.drawScore++;
    }
    console.log(global);
    updateScore();
};
const updateScore = () => {
    userScoreEl.innerText = `${global.userScore}`;
    oppScoreEl.innerText = `${global.oppScore}`;
    drawScoreEl.innerText = `${global.drawScore}`;
};
const initGame = () => {
    gameBoxArr.forEach((gameBox) => {
        const image = gameBox.querySelector("img");
        if (image) {
            image.style.visibility = "hidden";
        }
    });
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
            initGame();
            assignMarks();
            break;
    }
};
InitApp();
