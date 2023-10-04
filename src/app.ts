const gameBoxArr = document.querySelectorAll(".game-box");

gameBoxArr.forEach((gameBox) => {
	gameBox?.addEventListener("click", function () {
		if (gameBox.id === "x-mark") {
			console.log("X");
		} else {
			console.log("O");
		}
	});
});

// <img src="../assets/images/icon-o.svg" alt="" class="p-3" />
