(() => {
	let allNotes = [];
	linkify.options.defaults.format = function(value) {
		return value.trunc(21);
	};

	if (Cookies.get("auth") === "true") {
		const clientId = "hemjflepggljigpcaneoeldgipbpcbmg";

		chrome.runtime.sendMessage(clientId, {context: "external", type: "getNotes"}, notes => {
			allNotes = notes;
			notes.slice().reverse().map(({timestamp, createdAt, videoId, content, id, tags, meta, updatedAt}) => {
				const thumbnailUrl = getVideoThumbnailUrl(videoId);
				let newNote = $(".note").first().clone().attr({
					createdAt,
					noteId: id,
					timestamp,
					content,
					tags,
					updatedAt
				}).show();

				newNote.find(".note-timestamp").text(formatTimestamp(timestamp)).attr({
					href: getTimestampedUrl(timestamp, videoId),
					target: "_blank",
				});
				let noteContent = newNote.find(".note-content");
				noteContent.text(content.trunc(180));
				addClassToHashtags(noteContent);
				$(noteContent).linkify();
				newNote.find(".video-thumbnail").attr("href", getTimestampedUrl(timestamp, videoId)).append($(document.createElement("img")).attr("src", thumbnailUrl));
				newNote.find(".note-created-at").text(moment(createdAt).fromNow()).attr("tooltip", moment(createdAt).format('MMMM Do YYYY, h:mm a'));
				if (content.length <= 0) {
					let thumbtackContainer = $(document.createElement("div")).addClass("thumbtack-container");
					let thumbtack = $(document.createElement("img")).attr("src", "./assets/img/thumbtack_light.svg");
					thumbtackContainer.append(thumbtack);

					newNote.find(".note-details").append(thumbtackContainer);
				}
				$("#all-notes").append(newNote);
			});

			$(".note").first().remove();
		});
	} else {
		$("html").html("You are not logged in. Redirecting to home page...");
		setTimeout(function () {
			window.location.replace("/");
		}, 1000);
	}

	watchSortByDateOldest();
	watchSortByDateNewest();
	watchSearchFilter();
	watchTagsForFilter();
	watchToggleViewGrid();
	watchToggleViewList();
	watchShowFullNote();

	function getVideoThumbnailUrl(videoId) {
		return "https://i1.ytimg.com/vi/" + videoId + "/mqdefault.jpg";
	}

	function getHdVideoThumbnailUrl(videoId) {
		return "https://i1.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
	}

	const formatTimestamp = timestamp => {
		return String(moment.utc(timestamp * 1000).format('mm:ss'));
	};

	const getTimestampedUrl = (timestamp, videoId) => {
		return "https://youtube.com/watch?v=" + videoId + "&t=" + timestamp + "s";
	};

	const sortByDateOldest = notes => {
		notes.sort(function (a, b) {
			let contentA = moment($(a).attr('createdAt')).unix();
			let contentB = moment($(b).attr('createdAt')).unix();
			return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
		});

		$("#all-notes").html(notes);
	};

	const sortByDateNewest = notes => {
		notes.sort(function (a, b) {
			let contentA = moment($(a).attr('createdAt')).unix();
			let contentB = moment($(b).attr('createdAt')).unix();
			return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0;
		});

		$("#all-notes").html(notes);
	};

	function watchSortByDateOldest() {
		$(document).on("click", "#filter-oldest-date", e => {
			sortByDateOldest($(".note"));
			$(".filter-buttons").not(".white").find(" .filter-button").removeClass("current");
			$(e.target).addClass("current");
		});
	}

	function watchSortByDateNewest() {
		$(document).on("click", "#filter-newest-date", e => {
			sortByDateNewest($(".note"));
			$(".filter-buttons").not(".white").find(" .filter-button").removeClass("current");
			$(e.target).addClass("current");
		});
	}

	function watchSearchFilter() {
		$(document).on("keyup", "#search-filter", e => {
			let filterText = $(e.target).val();
			let allNotesContainer = $("#all-notes");
			$(".note").hide();
			$(".note:contains('" + filterText + "')").show();
			if (!$(".note").is(":visible")) {
				if ($(".placeholder").length === 0) {
					allNotesContainer.append("<p class='placeholder'>No results found.</p>");
				}
			} else {
				$(".placeholder").remove();
			}
		});
	}

	function watchTagsForFilter() {
		$(document).on("click", ".rn_tag", e => {
			$("#search-filter").val($(e.target).text()).keyup();
		});
	}

	function watchToggleViewGrid() {
		$(document).on("click", "#view-toggle-grid", e => {
			$(".view-toggle").removeClass("current");
			$(e.target).addClass("current");
			$("#all-notes").removeClass("list-view");
		})
	}

	function watchToggleViewList() {
		$(document).on("click", "#view-toggle-list", e => {
			$(".view-toggle").removeClass("current");
			$(e.target).addClass("current");
			$("#all-notes").addClass("list-view");
		})
	}

	function watchShowFullNote() {
		$(document).on("click", ".note-content", e => {
			const note = $(e.target).closest(".note");
			const modalContainer = $(document.createElement("div")).addClass("modal-container");
			note.clone().appendTo(modalContainer).find(".note-content").text(note.attr("content"));
			note.find("img").attr("src", getHdVideoThumbnailUrl(note.attr("videoId")));
			modalContainer.hide().appendTo($("body")).fadeIn();
		})
	}

	const addClassToHashtags = note => {
		note.html(function (_, html) {
			return html.replace(/(\#\w+)/g, '<span class="rn_tag">$1</span>');
		});
	};

	String.prototype.trunc = function (n) {
		return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
	};
})();