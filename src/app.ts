const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn = document.querySelector(".reset");
const optionX: HTMLDivElement | null = document.querySelector(".x-option");
const optionO = document.querySelector(".o-option");

type Global = {
	isUserTurn: boolean;
	userMark: string;
	oppMark: string;
	isUserWinner: boolean;
	isDraw: boolean;
};
const global: Global = {
	isUserTurn: true,
	userMark: "",
	oppMark: "",
	isUserWinner: false,
	isDraw: false,
};

// -------------- INDEX
// SET GAME MARKS
const initMarks = () => {
	optionX?.addEventListener("click", function () {
		checkActive();
		optionX.classList.add("bg-silver");
		localStorage.setTime("userMark", "x");
		localStorage.setTime("oppMark", "o");
	});
	optionO?.addEventListener("click", function () {
		checkActive();
		optionO.classList.add("bg-silver");
		localStorage.setTime("userMark", "o");
		localStorage.setTime("oppMark", "x");
	});
};

const assignMarks = (): void => {
	global.userMark = localStorage.getItem("userMark") || "";
	global.oppMark = localStorage.getItem("oppMark") || "";
};

const checkActive = () => {
	switch (global.userMark) {
		case "o":
			if (optionO?.classList.contains("bg-silver")) {
				optionO.classList.remove("bg-silver");
			}
			break;
		case "x":
			if (optionX?.classList.contains("bg-silver")) {
				optionX.classList.remove("bg-silver");
			}
			break;
	}
};

// -------------- GAME

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
		if (global.isUserTurn) {
			gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.userMark}.svg" alt="" class="p-3" />
            `;
			global.isUserTurn = false;
		} else {
			gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.oppMark}.svg" alt="" class="p-3" />
            `;
			global.isUserTurn = true;
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

// Router
const InitApp = (): void => {
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
