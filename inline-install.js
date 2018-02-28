$(() => {
	checkIfExtensionHasBeenInstalled();
	// watchInlineInstallButtons();
	//
	// function watchInlineInstallButtons() {
	// 	$(document).on("click", ".inline-install", () => {
	// 		chrome.webstore.install();
	// 	});
	// }

	function checkIfExtensionHasBeenInstalled() {
		if (chrome.app.isInstalled) {
			$(".inline-install").addClass("inline-added").find("span").text("Added To Chrome");
		}
	}
});