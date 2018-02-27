(() => {
	const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

	chrome.runtime.sendMessage(clientId, {context: "external", type: "getNotes"}, notes => {
		notes.slice().reverse().map(({timestamp, createdAt, videoId, content, tags}) => {
			const thumbnailUrl = getVideoThumbnailUrl(videoId);
			let newNote = $(".note").first().clone();
			newNote.find(".note-timestamp").text(formatTimestamp(timestamp)).attr("href", getTimestampedUrl(timestamp, videoId));
			newNote.find(".note-content").text(content.trunc(40));
			newNote.find(".video-thumbnail").append($(document.createElement("img")).attr("src", thumbnailUrl));
			newNote.find(".note-created-at").text(moment(createdAt).fromNow());
			newNote.find(".note-tags").text(tags);
			$("#all-notes").append(newNote);
		});

		$(".note").first().remove();
	});

	function getVideoThumbnailUrl(videoId) {
		return "https://i1.ytimg.com/vi/" + videoId + "/mqdefault.jpg";
	}

	const formatTimestamp = timestamp => {
		return String(moment.utc(timestamp * 1000).format('mm:ss'));
	};

	const getTimestampedUrl = (timestamp, videoId) => {
		return "/watch?v=" + videoId + "&t=" + timestamp + "s";
	};

	String.prototype.trunc = function(n) {
		return (this.length > n) ? this.substr(0, n-1) + '...' : this;
	};
})();