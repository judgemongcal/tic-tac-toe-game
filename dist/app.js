"use strict";
const cpuBtn = document.querySelector(".vs-cpu");
const humanBtn = document.querySelector(".vs-player");
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const xPath = document.querySelector(".x-path");
const oPath = document.querySelector(".o-path");
const optionO = document.querySelector(".o-option");
const turnMarker = document.querySelector(".turn-img");
const userScoreEl = document.querySelector(".user-score");
const drawScoreEl = document.querySelector(".draw-score");
const oppScoreEl = document.querySelector(".opp-score");
const resultModal = document.querySelector(".result-modal");
const winnerP1 = document.querySelector(".winner");
const markModal = document.querySelector(".modal-mark");
const textModal = document.querySelector(".modal-text");
const quitBtn = document.querySelector(".modal-quit");
const nextRoundBtn = document.querySelector(".modal-next-round");
const global = {
    isOpponentHuman: false,
    isUserTurn: false,
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
        if (optionO === null || optionO === void 0 ? void 0 : optionO.classList.contains("bg-silver")) {
            optionO.classList.remove("bg-silver");
            oPath.style.fill = "#A8BFC9";
        }
        optionX.classList.add("bg-silver");
        xPath.style.fill = "#1A2A33";
        localStorage.setItem("userMark", "x");
        localStorage.setItem("oppMark", "o");
    });
    optionO === null || optionO === void 0 ? void 0 : optionO.addEventListener("click", function () {
        checkActive();
        if (optionX === null || optionX === void 0 ? void 0 : optionX.classList.contains("bg-silver")) {
            optionX.classList.remove("bg-silver");
            xPath.style.fill = "#A8BFC9";
        }
        optionO.classList.add("bg-silver");
        oPath.style.fill = "#1A2A33";
        localStorage.setItem("userMark", "o");
        localStorage.setItem("oppMark", "x");
    });
    cpuBtn === null || cpuBtn === void 0 ? void 0 : cpuBtn.addEventListener("click", function () {
        localStorage.setItem("isOppHuman", "false");
    });
    humanBtn === null || humanBtn === void 0 ? void 0 : humanBtn.addEventListener("click", function () {
        localStorage.setItem("isOppHuman", "true");
    });
};
const checkOpp = () => {
    global.isOpponentHuman = JSON.parse(localStorage.getItem("isOppHuman") || "");
};
const assignMarks = () => {
    global.userMark = localStorage.getItem("userMark") || "";
    global.oppMark = localStorage.getItem("oppMark") || "";
    if (global.oppMark === "x") {
        setTimeout(function () {
            cpuMove();
        }, 800);
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
        const svg = gameBox.querySelector("svg");
        if (image) {
            image.style.visibility = "hidden";
        }
        else if (svg) {
            svg.style.visibility = "hidden";
        }
        gameBox.removeAttribute("id");
        gameBox.classList.remove("bg-light-blue");
        gameBox.classList.remove("bg-light-yellow");
        gameBox.classList.add("bg-semi-dark-navy");
    });
    global.isUserWinner = false;
    global.isOppWinner = false;
    global.isDraw = false;
    global.userMark === "x"
        ? (global.isUserTurn = true)
        : (global.isUserTurn = false);
    if (!global.isOpponentHuman && !global.isUserTurn) {
        setTimeout(function () {
            cpuMove();
        }, 800);
    }
    checkTurn();
};
gameBoxArr.forEach((gameBox) => {
    gameBox === null || gameBox === void 0 ? void 0 : gameBox.addEventListener("click", function () {
        if (gameBox.id) {
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
        if (!global.isOpponentHuman && !global.isUserTurn) {
            if (isGameOver() === false &&
                global.isUserWinner === false &&
                global.isOppWinner === false) {
                setTimeout(function () {
                    cpuMove();
                }, 1200);
            }
            else {
                return;
            }
        }
    });
});
const cpuMove = () => {
    if (!isGameOver() && !global.isUserTurn && !global.isOpponentHuman) {
        let numOfBoxes = gameBoxArr.length;
        let random = Math.floor(Math.random() * numOfBoxes);
        while (gameBoxArr[random].id) {
            random = Math.floor(Math.random() * numOfBoxes);
        }
        const randomNum = random;
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
// ANIMATE WINNING COMBO
const animateCombo = (winningCombo) => {
    if (global.isDraw) {
        return;
    }
    else {
        winningCombo.forEach((number) => {
            gameBoxArr[number].classList.remove("bg-semi-dark-navy");
            if (global.isUserWinner) {
                gameBoxArr[number].classList.add(global.userMark == "x" ? "bg-light-blue" : "bg-light-yellow");
                gameBoxArr[number].innerHTML = "";
                gameBoxArr[number].innerHTML =
                    global.userMark === "x"
                        ? `<svg width="64" height="64" class='scale-[0.50]' xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" stroke-width="2" fill="#1A2A33"/></svg>`
                        : `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="#F2B137" stroke-width="2" fill="#1A2A33"/></svg>`;
            }
            else {
                gameBoxArr[number].classList.add(global.oppMark == "x" ? "bg-light-blue" : "bg-light-yellow");
                gameBoxArr[number].innerHTML = "";
                gameBoxArr[number].innerHTML =
                    global.oppMark === "x"
                        ? `<svg width="64" height="64" class='scale-[0.50]' xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="#31C3BD" stroke-width="2" fill="#1A2A33"/></svg>`
                        : `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="#F2B137" stroke-width="2" fill="#1A2A33"/></svg>`;
            }
        });
    }
};
// CHECK FOR WINNER
const checkWinner = () => {
    const winningCombo = [];
    if (
    // First Row
    gameBoxArr[0].id != "" &&
        gameBoxArr[0].id === gameBoxArr[1].id &&
        gameBoxArr[1].id === gameBoxArr[2].id) {
        winningCombo.push(0, 1, 2);
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
        winningCombo.push(3, 4, 5);
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
        winningCombo.push(6, 7, 8);
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
        winningCombo.push(0, 3, 6);
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
        winningCombo.push(1, 4, 7);
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
        winningCombo.push(2, 5, 8);
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
        winningCombo.push(0, 4, 8);
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
        winningCombo.push(2, 4, 6);
        if (gameBoxArr[2].id === `${global.userMark}-mark`) {
            global.isUserWinner = true;
            global.isOppWinner = false;
        }
        else {
            global.isUserWinner = false;
            global.isOppWinner = true;
        }
    }
    else if (isGameOver()) {
        global.isUserWinner = false;
        global.isOppWinner = false;
        global.isDraw = true;
    }
    if (global.isUserWinner === true ||
        global.isOppWinner === true ||
        global.isDraw === true) {
        GetWinner();
        animateCombo(winningCombo);
    }
    // }
};
// CHECK IF GAME IS OVER
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
            global.userScore++;
            localStorage.setItem("userScore", global.userScore.toString());
        }
        else if (global.isOppWinner) {
            global.oppScore++;
            localStorage.setItem("oppScore", global.oppScore.toString());
        }
        else if (global.isDraw) {
            global.drawScore++;
            global.isDraw = true;
            localStorage.setItem("drawScore", global.drawScore.toString());
        }
        updateScore();
        displayModal();
    }
    else {
        return;
    }
};
// DISPLAY MODAL
const displayModal = () => {
    markModal.innerHTML = "";
    textModal.innerHTML = "";
    winnerP1.innerText = "";
    if (global.isUserWinner) {
        winnerP1.innerText = `PLAYER 1 WINS!`;
        markModal.innerHTML = `<img src="/assets/images/icon-${global.userMark}.svg" alt="" class="w-[30px] lg:w-[64px]">`;
        textModal.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold text-${global.userMark === "x" ? "light-blue" : "light-yellow"} ">TAKES THE ROUND</h1>`;
    }
    else if (global.isOppWinner) {
        markModal.innerHTML = `<img src="/assets/images/icon-${global.oppMark}.svg" alt="" class="w-[30px] lg:w-[64px]">`;
        textModal.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold ${global.oppMark === "x" ? "text-light-blue" : "text-light-yellow"} ">TAKES THE ROUND</h1>`;
        global.isOpponentHuman
            ? (winnerP1.innerText = `PLAYER 2 WINS!`)
            : (winnerP1.innerText = `OH NO, YOU LOST...`);
    }
    else if (global.isDraw) {
        markModal.style.display = "hidden";
        textModal.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold text-silver mb-2 ">ROUND TIED</h1>`;
    }
    resultModal.style.display = "block";
    quitBtn === null || quitBtn === void 0 ? void 0 : quitBtn.addEventListener("click", function () {
        quitGame();
    });
    nextRoundBtn === null || nextRoundBtn === void 0 ? void 0 : nextRoundBtn.addEventListener("click", function () {
        hideModal();
        reset();
    });
};
// HIDE MODAL
const hideModal = () => {
    resultModal.style.display = "none";
};
// QUIT GAME
const quitGame = () => {
    localStorage.removeItem("userScore");
    localStorage.removeItem("oppScore");
    localStorage.removeItem("drawScore");
    localStorage.removeItem("userMark");
    localStorage.removeItem("oppMark");
    localStorage.removeItem("isOppHuman");
    window.location.href = `https://judgemongcal-tic-tac-toe.netlify.app/`;
};
// UPDATE SCORE
const updateScore = () => {
    userScoreEl.innerText = `${global.userScore}`;
    oppScoreEl.innerText = `${global.oppScore}`;
    drawScoreEl.innerText = `${global.drawScore}`;
};
// INIT GAME
const initGame = () => {
    gameBoxArr.forEach((gameBox) => {
        const image = gameBox.querySelector("img");
        if (image) {
            image.style.visibility = "hidden";
        }
    });
    resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", reset);
    assignMarks();
    fetchScores();
    global.userMark === "x"
        ? (global.isUserTurn = true)
        : (global.isUserTurn = false);
    if (!global.isOpponentHuman && global.isUserTurn) {
        setTimeout(function () {
            cpuMove();
        }, 800);
    }
};
// ROUTER
const InitApp = () => {
    switch (window.location.pathname) {
        case "/":
            initMarks();
            break;
        case "/game":
            initGame();
            checkOpp();
            break;
    }
};
InitApp();
