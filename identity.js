(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		if (userProfile.email) {
			convertfox.identify(userProfile.email);
			Cookies.set('auth', 'true');
			$("#logout-button").show();
			$("#login-button").hide();
			$("#nav-notes").show();
		} else {
			Cookies.set('auth', 'false');
			$("#login-button").show();
			$("#logout-button").hide();
			$("#nav-notes").hide();
		}
	});

	$(document).on("click", "#login-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "login"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			let authCheck = setInterval(() => {
				chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
					if (userProfile.email) {
						clearInterval(authCheck);
						Cookies.set("auth", "true");
						window.location.replace("/notes");
					}
				});
			}, 1000);
		});
	});

	$(document).on("click", "#logout-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "logout"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			window.location.reload();
		});
	});
})();