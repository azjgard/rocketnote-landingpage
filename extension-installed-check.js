$(() => {
		let inlineInstallButtons = $(".inline-install");

		if (document.getElementById('rn_extension-is-installed')) {
			inlineInstallButtons.addClass("inline-added");
			inlineInstallButtons.find("span").text("View Docs");
			inlineInstallButtons.click(() => {

			});
		} else {
			inlineInstallButtons.click(() => {
				chrome.webstore.install()
			});
		}
	}
);