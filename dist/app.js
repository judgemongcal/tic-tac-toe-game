"use strict";
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const optionO = document.querySelector(".o-option");
const global = {
    isUserTurn: true,
    userMark: "",
    oppMark: "",
    isUserWinner: false,
    isDraw: false,
};
// -------------- INDEX
// SET GAME MARKS
const initMarks = () => {
    optionX === null || optionX === void 0 ? void 0 : optionX.addEventListener("click", function () {
        checkActive();
        optionX.classList.add("bg-silver");
        localStorage.setTime("userMark", "x");
        localStorage.setTime("oppMark", "o");
    });
    optionO === null || optionO === void 0 ? void 0 : optionO.addEventListener("click", function () {
        checkActive();
        optionO.classList.add("bg-silver");
        localStorage.setTime("userMark", "o");
        localStorage.setTime("oppMark", "x");
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
            <img src="../assets/images/icon-${global.userMark}.svg" alt="" class="p-3" />
            `;
            global.isUserTurn = false;
        }
        else {
            gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.oppMark}.svg" alt="" class="p-3" />
            `;
            global.isUserTurn = true;
        }
    });
});
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
            break;
        case "/dist/game.html":
            console.log("Game");
            initGame();
            break;
    }
};
InitApp();
