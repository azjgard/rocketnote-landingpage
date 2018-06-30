(() => {
    let identity = Cookies.get('identity');

    if (identity) {
        $(".paddle_button").attr("data-email", identity);
    } else {
        console.log("Can't do it, man!");
    }
})();