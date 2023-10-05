const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX = document.querySelector(".x-option");
const optionO = document.querySelector(".o-option");

const global = {
	isUserTurn: true,
	userMark: "o",
	oppMark: "",
	isUserWinner: false,
	isDraw: false,
};

// SET GAME MARKS
const initMarks = () => {
	optionX?.addEventListener("click", function () {
		global.userMark = "x";
		global.oppMark = "o";
		console.log(global.userMark, global.oppMark);
	});
	optionO?.addEventListener("click", function () {
		global.userMark = "o";
		global.oppMark = "x";
		console.log(global.userMark, global.oppMark);
	});
};

// RESET GAME
resetBtn?.addEventListener("click", function () {
	gameBoxArr.forEach((gameBox) => {
		const image = gameBox.querySelector("img");
		if (image) {
			image.style.visibility = "hidden";
			console.log("clicked");
		}
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
	initMarks();
};

initGame();
