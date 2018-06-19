(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	if (Cookies.get("auth") === "true") {
		changeNavStateToLoggedIn();
	} else {
		changeNavStateToLoggedOut();
	}

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		if (userProfile.email) {
			convertfox.identify(userProfile.email);
			Cookies.set('auth', 'true');
			Cookies.set('identity', userProfile.email);
			console.log(userProfile.email);
			changeNavStateToLoggedIn();
		} else {
			Cookies.set('auth', 'false');
			changeNavStateToLoggedOut();
		}
	});

	$(document).on("click", ".login-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "login"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			let authCheck = setInterval(() => {
				chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
					if (userProfile.email) {
						clearInterval(authCheck);
						Cookies.set("auth", "true");
						Cookies.set('identity', userProfile.email);
						window.location.replace("/notes");
					}
				});
			}, 500);
		});
	});

	$(document).on("click", ".logout-button", () => {
		chrome.runtime.sendMessage(clientId, {context: "external", type: "logout"}, isLoggedIn => {
			Cookies.set("auth", isLoggedIn ? "true" : "false");
			window.location.reload();
		});
	});

	function changeNavStateToLoggedIn() {
		$("#logout-button").show();
		$("#login-button").hide();
		$("#nav-notes").show();
	}

	function changeNavStateToLoggedOut() {
		$("#login-button").show();
		$("#logout-button").hide();
		$("#nav-notes").hide();
	}
})();