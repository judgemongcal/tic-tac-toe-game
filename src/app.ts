const cpuBtn = document.querySelector(".vs-cpu");
const humanBtn = document.querySelector(".vs-player");
const gameBoxArr = document.querySelectorAll(".game-box");
const resetBtn: HTMLButtonElement | null = document.querySelector(".reset");
const optionX: HTMLDivElement | null = document.querySelector(".x-option");
const xPath: HTMLOrSVGImageElement | null = document.querySelector(".x-path");
const oPath: HTMLOrSVGImageElement | null = document.querySelector(".o-path");
const optionO = document.querySelector(".o-option");
const turnMarker = document.querySelector(".turn-img");
const userScoreEl: HTMLParagraphElement | null =
	document.querySelector(".user-score");
const drawScoreEl: HTMLParagraphElement | null =
	document.querySelector(".draw-score");
const oppScoreEl: HTMLParagraphElement | null =
	document.querySelector(".opp-score");
const resultModal: HTMLDivElement | null =
	document.querySelector(".result-modal");
const winnerP1: HTMLParagraphElement | null = document.querySelector(".winner");
const markModal: HTMLDivElement | null = document.querySelector(".modal-mark");
const textModal: HTMLDivElement | null = document.querySelector(".modal-text");
const quitBtn: HTMLButtonElement | null = document.querySelector(".modal-quit");
const nextRoundBtn: HTMLButtonElement | null =
	document.querySelector(".modal-next-round");

type Global = {
	isOpponentHuman: boolean;
	isUserTurn: boolean;
	userMark: string;
	oppMark: string;
	isUserWinner: boolean;
	isOppWinner: boolean;
	isDraw: boolean;
	userScore: number;
	oppScore: number;
	drawScore: number;
};
const global: Global = {
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
	optionX?.addEventListener("click", function () {
		checkActive();
		if (optionO?.classList.contains("bg-silver")) {
			optionO.classList.remove("bg-silver");
			oPath!.style.fill = "#A8BFC9";
		}
		optionX.classList.add("bg-silver");
		xPath!.style.fill = "#1A2A33";
		localStorage.setItem("userMark", "x");
		localStorage.setItem("oppMark", "o");
	});
	optionO?.addEventListener("click", function () {
		checkActive();
		if (optionX?.classList.contains("bg-silver")) {
			optionX.classList.remove("bg-silver");
			xPath!.style.fill = "#A8BFC9";
		}
		optionO.classList.add("bg-silver");
		oPath!.style.fill = "#1A2A33";
		localStorage.setItem("userMark", "o");
		localStorage.setItem("oppMark", "x");
	});
	cpuBtn?.addEventListener("click", function () {
		localStorage.setItem("isOppHuman", "false");
	});
	humanBtn?.addEventListener("click", function () {
		localStorage.setItem("isOppHuman", "true");
	});
};

const checkOpp = () => {
	global.isOpponentHuman = JSON.parse(localStorage.getItem("isOppHuman") || "");
	console.log(global.isOpponentHuman);
};

const assignMarks = (): void => {
	global.userMark = localStorage.getItem("userMark") || "";
	global.oppMark = localStorage.getItem("oppMark") || "";
	if (global.oppMark === "x") {
		setTimeout(function () {
			cpuMove();
		}, 800);
	}
};

const fetchScores = (): void => {
	global.userScore = Number(localStorage.getItem("userScore"));
	global.oppScore = Number(localStorage.getItem("oppScore"));
	global.drawScore = Number(localStorage.getItem("drawScore"));
	updateScore();
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
	console.log("Reset");
};

gameBoxArr.forEach((gameBox) => {
	gameBox?.addEventListener("click", function () {
		if (gameBox.id) {
			console.log("Invalid Move");
			return;
		} else {
			gameBox.innerHTML = "";
			if (global.isUserTurn) {
				gameBox.innerHTML = `
            <img src="../assets/images/icon-${global.userMark}.svg" alt="" class="p-3" id=""/>
            `;
				gameBox.id = `${global.userMark}-mark`;
				global.isUserTurn = false;
			} else if (global.isOpponentHuman && !global.isUserTurn) {
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
			if (
				isGameOver() === false &&
				global.isUserWinner === false &&
				global.isOppWinner === false
			) {
				console.log(isGameOver(), global.isUserWinner, global.isOppWinner);
				setTimeout(function () {
					cpuMove();
				}, 800);
			} else {
				return;
			}
		}
	});
});

const generateRandomNum = (): number => {
	const numOfBoxes = gameBoxArr.length;
	const random = Math.abs(Math.floor(Math.random() * numOfBoxes - 1));
	return random;
};

const cpuMove = (): void => {
	const randomNum = generateRandomNum();
	console.log(randomNum);
	if (gameBoxArr[randomNum].id && !isGameOver()) {
		cpuMove();
	} else {
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
const checkTurn = (): void => {
	global.isUserTurn
		? turnMarker?.setAttribute(
				"src",
				`../assets/images/icon-${global.userMark}.svg`,
		  )
		: turnMarker?.setAttribute(
				"src",
				`../assets/images/icon-${global.oppMark}.svg`,
		  );
};

// CHECK WINNER
const checkWinner = (): void => {
	if (
		// First Row
		gameBoxArr[0].id != "" &&
		gameBoxArr[0].id === gameBoxArr[1].id &&
		gameBoxArr[1].id === gameBoxArr[2].id
	) {
		console.log("First Row Win");
		if (gameBoxArr[0].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Second Row
		gameBoxArr[3].id != "" &&
		gameBoxArr[3].id === gameBoxArr[4].id &&
		gameBoxArr[3].id === gameBoxArr[5].id
	) {
		console.log("Second Row Win");
		if (gameBoxArr[3].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Third Row
		gameBoxArr[6].id != "" &&
		gameBoxArr[6].id === gameBoxArr[7].id &&
		gameBoxArr[6].id === gameBoxArr[8].id
	) {
		console.log("Third Row Win");
		if (gameBoxArr[6].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// First Col
		gameBoxArr[0].id != "" &&
		gameBoxArr[0].id === gameBoxArr[3].id &&
		gameBoxArr[0].id === gameBoxArr[6].id
	) {
		console.log("First Col Win");
		if (gameBoxArr[0].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Second Col
		gameBoxArr[1].id != "" &&
		gameBoxArr[1].id === gameBoxArr[4].id &&
		gameBoxArr[1].id === gameBoxArr[7].id
	) {
		console.log("Second Col Win");
		if (gameBoxArr[1].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Third Col
		gameBoxArr[2].id != "" &&
		gameBoxArr[2].id === gameBoxArr[5].id &&
		gameBoxArr[2].id === gameBoxArr[8].id
	) {
		console.log("Third Col Win");
		if (gameBoxArr[2].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Left to Right Diagonal
		gameBoxArr[0].id != "" &&
		gameBoxArr[0].id === gameBoxArr[4].id &&
		gameBoxArr[0].id === gameBoxArr[8].id
	) {
		console.log("Left to Right Diagonal Win");
		if (gameBoxArr[0].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (
		// Right to Left Diagonal
		gameBoxArr[2].id != "" &&
		gameBoxArr[2].id === gameBoxArr[4].id &&
		gameBoxArr[2].id === gameBoxArr[6].id
	) {
		console.log("Right to Left Diagonal Win");
		if (gameBoxArr[2].id === `${global.userMark}-mark`) {
			global.isUserWinner = true;
			global.isOppWinner = false;
		} else {
			global.isUserWinner = false;
			global.isOppWinner = true;
		}
	} else if (isGameOver()) {
		global.isUserWinner = false;
		global.isOppWinner = false;
		global.isDraw = true;
	}

	if (
		global.isUserWinner === true ||
		global.isOppWinner === true ||
		global.isDraw === true
	) {
		console.log("Winner Found");
		GetWinner();
	}

	// }
};

const isGameOver = (): boolean => {
	if (
		gameBoxArr[0].id != "" &&
		gameBoxArr[1].id != "" &&
		gameBoxArr[2].id != "" &&
		gameBoxArr[3].id != "" &&
		gameBoxArr[4].id != "" &&
		gameBoxArr[5].id != "" &&
		gameBoxArr[6].id != "" &&
		gameBoxArr[7].id != "" &&
		gameBoxArr[8].id != ""
	) {
		return true;
	} else if (global.isUserWinner || global.isOppWinner || global.isDraw) {
		return true;
	} else {
		return false;
	}
};

// DISPLAY WINNER
const GetWinner = (): void => {
	if (isGameOver()) {
		if (global.isUserWinner) {
			console.log("Player 1 Wins!");
			global.userScore++;
			localStorage.setItem("userScore", global.userScore.toString());
		} else if (global.isOppWinner) {
			console.log("Player 2 Wins!");
			global.oppScore++;
			localStorage.setItem("oppScore", global.oppScore.toString());
		} else if (global.isDraw) {
			console.log("Draw!");
			global.drawScore++;
			global.isDraw = true;
			localStorage.setItem("drawScore", global.drawScore.toString());
		}
		console.log(global);
		updateScore();
		displayModal();
	} else {
		return;
	}
};

// DISPLAY MODAL
const displayModal = (): void => {
	markModal!.innerHTML = "";
	textModal!.innerHTML = "";
	winnerP1!.innerText = "";

	if (global.isUserWinner) {
		markModal!.innerHTML = `<img src="/assets/images/icon-${global.userMark}.svg" alt="" class="w-[30px] lg:w-[64px]">`;
		textModal!.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold text-${
			global.userMark === "x" ? "light-blue" : "light-yellow"
		} ">TAKES THE ROUND</h1>`;
	} else if (global.isOppWinner) {
		markModal!.innerHTML = `<img src="/assets/images/icon-${global.oppMark}.svg" alt="" class="w-[30px] lg:w-[64px]">`;
		textModal!.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold ${
			global.oppMark === "x" ? "text-light-blue" : "text-light-yellow"
		} ">TAKES THE ROUND</h1>`;
		global.isOpponentHuman
			? (winnerP1!.innerText = `PLAYER 2 WINS!`)
			: (winnerP1!.innerText = `OH NO, YOU LOST...`);
	} else if (!global.isOppWinner && global.isUserWinner) {
		markModal!.style.display = "hidden";
		textModal!.innerHTML = `<h1 class="text-[24px] lg:text-[40px] font-bold text-silver ">ROUND TIED/h1>`;
	}
	resultModal!.style.display = "block";

	quitBtn?.addEventListener("click", function () {
		quitGame();
	});
	nextRoundBtn?.addEventListener("click", function () {
		reset();
		hideModal();
		if (!global.isUserTurn && !global.isOpponentHuman) {
			setTimeout(function () {
				cpuMove();
			}, 800);
		}
	});
};

const hideModal = (): void => {
	resultModal!.style.display = "none";
};

const quitGame = (): void => {
	window.location.href = `http://127.0.0.1:5501/dist/index.html`;
};

const updateScore = (): void => {
	userScoreEl!.innerText = `${global.userScore}`;
	oppScoreEl!.innerText = `${global.oppScore}`;
	drawScoreEl!.innerText = `${global.drawScore}`;

	// if (global.isUserWinner || global.isOppWinner || global.isDraw) {
	// 	setTimeout(function () {
	// 		reset();
	// 	}, 2000);
	// }
};

const initGame = (): void => {
	gameBoxArr.forEach((gameBox) => {
		const image = gameBox.querySelector("img");
		if (image) {
			image.style.visibility = "hidden";
		}
	});
	resetBtn?.addEventListener("click", reset);
	assignMarks();
	fetchScores();
};

// Router
const InitApp = (): void => {
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
