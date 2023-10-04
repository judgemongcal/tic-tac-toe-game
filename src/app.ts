const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");

const global = {
	isUserTurn: true,
	userCurrentMark: "",
	isUserWinner: false,
	isDraw: false,
};

resetBtn?.addEventListener("click", function () {
	gameBoxArr.forEach((gameBox) => {
		const image = gameBox.querySelector("img");
		if (image) {
			image.style.visibility = "hidden";
			console.log("clicked");
		}

		// gameBox.innerHTML = "";
	});
});

gameBoxArr.forEach((gameBox) => {
	gameBox?.addEventListener("click", function () {
		gameBox.innerHTML = "";
		if (gameBox.id === "x-mark") {
			console.log("X");
			gameBox.innerHTML = `
            <img src="../assets/images/icon-x.svg" alt="" class="p-3" />
            `;
		} else {
			console.log("O");
			gameBox.innerHTML = `
            <img src="../assets/images/icon-o.svg" alt="" class="p-3" />
            `;
		}
	});
});

const initGame = (): void => {
	gameBoxArr.forEach((gameBox) => {
		const image = gameBox.querySelector("img");
		if (image) {
			image.style.visibility = "hidden";
		}
	});
};

document.addEventListener("DOMContentLoaded", initGame);
