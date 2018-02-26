(() => {
	const clientId = "772398796773-oiofjsr6bbquchgpujodu1ireue92a70.apps.googleusercontent.com";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		console.log(userProfile);
		convertfox.identity(userProfile.email);
	});
})();