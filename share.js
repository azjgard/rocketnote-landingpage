$(function() {
   let player = $(document.createElement('iframe')).attr({
       id: 'player',
       width: "853",
       height: "480",
       allowfullscreen: true,
       frameborder: "0",
       allow: "autoplay"
   });

   setVideoIdFromShareUrl();
   $("#player-container").append(player);

    function setVideoIdFromShareUrl() {
        $.get('https://api.getrocketnote.com/v1/notes/share?share_url=' + getParameterByName('share_url'), function(result) {
            $("#player").attr("src", "https://www.youtube.com/embed/" + result[0].videoId + "?enablejsapi=1&widgetid=1&start=" + result[0].timestamp + "&autoplay=1&enable_js=1&rel=0");
            window.note = result[0];
            $("#note-share-content").text(formatTimestamp(window.note.timestamp) + " " + window.note.content);
            $("#sharer-name").text(window.note.meta.userChannel);
            $("#note-share-date").text(moment(window.note.createdAt).fromNow()).attr("tooltip", moment(window.note.created).format('MMMM Do YYYY, h:mm a'));
            if (window.note.meta.userChannel.length > 0) {
                document.title = window.note.meta.userChannel + "'s Shared Note | Rocket Note"
            }
        });
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function formatTimestamp(timestamp) {
        return String(moment.utc(timestamp * 1000).format('m:ss'));
    }
});