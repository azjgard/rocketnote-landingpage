(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		console.log(userProfile);
		convertfox.identity(userProfile.email);
	});
})();