(() => {
	const clientId = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzC2WGW9HXEL44NpgIbmYvQmKW60ZNQ4eTnCGcVWQqbZlpBfa9FaHW/3aPlkGfgy0xOvrlUCDd8qC8TF9mSiTVE9EwHTrlIuw/4YYL5U9aXbh92cqxB6t+zyZLMDm7qj5RLTeTMiAGAQ7rnsW11uGw7PeQVOnnQIKk+N/JgSF9ToZ1OglOiuorBHLYjhRjBKDN/tkvGWtwm10UwYdF9H//z72ABdWyaMXGNTIibzOEJzUXAD9WWZcdhRTohtcPt+YS+uOfAnsdYoPxUVzPBHg8UxxjHTmaZUl0g9a+5iSKv6yiAGjkYQg/I1TVd86LoDqgSs2f4L9FFYRs6mb/7GvjwIDAQAB";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "identity"}, userProfile => {
		console.log(userProfile);
		convertfox.identity(userProfile.email);
	});
})();