(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "getNotes"}, notes => {
		notes.slice().reverse().map(({timestamp, createdAt, videoId, content, tags}) => {
			const thumbnailUrl = getVideoThumbnailUrl(videoId);
			let newNote = $(".note").first().clone();
			newNote.find(".note-timestamp").text(timestamp);
			newNote.find(".note-content").text(content);
			newNote.find(".video-thumbnail").append($(document.createElement("img")).attr("src", thumbnailUrl));
			newNote.find(".note-created-at").text(createdAt);
			newNote.find(".note-tags").text(tags);
			$("#all-notes").append(newNote);
		});

		$(".note").first().remove();
	});

	function getVideoThumbnailUrl(videoId) {
		return "https://i1.ytimg.com/vi/" + videoId + "/mqdefault.jpg";
	}
})();