(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		if (userProfile.email) {
			convertfox.identify(userProfile.email);
			Cookies.set('auth', 'true');
			$("#logout-button").show();
			$("#login-button").hide();
		} else {
			Cookies.set('auth', 'false');
			$("#login-button").show();
			$("#logout-button").hide();
		}
	});

	$(document).on("click", "#login-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "login"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			window.location.reload("/notes");
		});
	});

	$(document).on("click", "#logout-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "logout"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			setTimeout(() => {
				window.location.reload();
			}, 5000);
		});
	});
})();