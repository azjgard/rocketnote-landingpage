$(() => {
		let inlineInstallButtons = $(".inline-install");

		if (document.getElementById('rn_extension-is-installed')) {
			inlineInstallButtons.addClass("inline-added");
			inlineInstallButtons.find("span").text("Added To Chrome");
			$("#login-button").show();
		} else {
			$("#login-button").hide();
			inlineInstallButtons.click(() => {
				chrome.webstore.install();
			});
		}
	}
);