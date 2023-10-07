"use strict";
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const optionO = document.querySelector(".o-option");
const turnMarker = document.querySelector(".turn-img");
const global = {
    isUserTurn: true,
    userMark: "",
    oppMark: "",
    isUserWinner: false,
    isOppWinner: false,
    isDraw: false,
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
const checkTurn = () => {
    global.isUserTurn
        ? turnMarker === null || turnMarker === void 0 ? void 0 : turnMarker.setAttribute("src", `../assets/images/icon-${global.userMark}.svg`)
        : turnMarker === null || turnMarker === void 0 ? void 0 : turnMarker.setAttribute("src", `../assets/images/icon-${global.oppMark}.svg`);
};
const checkWinner = () => {
    // First Row
    if (gameBoxArr[0].id === gameBoxArr[1].id &&
        gameBoxArr[1].id === gameBoxArr[2].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
        console.log("1st Row Win");
    }
    else if (
    // Second Row
    gameBoxArr[3].id === gameBoxArr[4].id &&
        gameBoxArr[3].id === gameBoxArr[5].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
        console.log("2nd Row Win");
    }
    else if (
    // Third Row
    gameBoxArr[6].id === gameBoxArr[7].id &&
        gameBoxArr[6].id === gameBoxArr[8].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
    }
    else if (
    // First Column
    gameBoxArr[0].id === gameBoxArr[3].id &&
        gameBoxArr[0].id === gameBoxArr[6].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
    }
    else if (
    // Second Column
    gameBoxArr[1].id === gameBoxArr[4].id &&
        gameBoxArr[1].id === gameBoxArr[7].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
    }
    else if (
    // Third Column
    gameBoxArr[2].id === gameBoxArr[5].id &&
        gameBoxArr[2].id === gameBoxArr[8].id) {
        gameBoxArr[0].id === global.userMark
            ? (global.isUserWinner = true)
            : (global.isOppWinner = false);
    }
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
            console.log(global);
            break;
    }
};
InitApp();
