"use strict";
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", function () {
    gameBoxArr.forEach((gameBox) => {
        gameBox.innerHTML = "";
    });
});
gameBoxArr.forEach((gameBox) => {
    gameBox === null || gameBox === void 0 ? void 0 : gameBox.addEventListener("click", function () {
        gameBox.innerHTML = "";
        if (gameBox.id === "x-mark") {
            console.log("X");
            gameBox.innerHTML = `
            <img src="../assets/images/icon-x.svg" alt="" class="p-3" />
            `;
        }
        else {
            console.log("O");
            gameBox.innerHTML = `
            <img src="../assets/images/icon-o.svg" alt="" class="p-3" />
            `;
        }
    });
});
// <img src="../assets/images/icon-o.svg" alt="" class="p-3" />
