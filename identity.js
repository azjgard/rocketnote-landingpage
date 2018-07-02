(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	$("#coupon-bar").hide();

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

    if (document.referrer.match(/^https?:\/\/([^\/]+\.)?producthunt\.com(\/|$)/i)) {
        let unlimitedButton = $("#checkout-unlimited");

        if (unlimitedButton) {
            $(unlimitedButton).attr("data-coupon", "PHF4M");
        }

        localStorage.setItem("site_referrer", "Product Hunt");
        localStorage.setItem("button_closed", "false");

        console.log("Referred from PH.");
    }

    if (localStorage.getItem("site_referrer") === "Product Hunt" && localStorage.getItem("button_closed") !== "true") {
        $("#coupon-bar").show();
    } else {
		$("#coupon-bar").hide();
	}

	$("#checkout-unlimited").click(function() {
		localStorage.setItem("button_closed", "true");
	});

	$("#coupon-bar").find(".close-btn").click(function() {
		localStorage.setItem("button_closed", "true");
		$("#coupon-bar").hide();
	});
})();