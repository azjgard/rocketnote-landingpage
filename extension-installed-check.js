$(() => {
		if (document.getElementById('rn_extension-is-installed')) {
			console.log("Extension is installed!");
			let inlineInstallButtons = $(".inline-install");
			inlineInstallButtons.addClass("inline-added").off();
			inlineInstallButtons.find("span").text("Added To Chrome");
		}
	}
);