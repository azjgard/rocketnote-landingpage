(() => {
    // let identity = Cookies.get('identity');
    //
    // if (identity) {
    //     $(".paddle_button").attr("data-email", identity);
    // } else {
    //     console.log("Can't do it, man!");
    // }

    $("input[name='selected-service']").change(function(e) {
        if ($(e.target).attr('id') === 'yearly') {
            $("#unlimited-price").text("40");
            $(".duration").text("Yearly");
            $("#checkout-unlimited").attr("data-product", "531766");
        } else {
            $("#unlimited-price").text("5");
            $(".duration").text("Monthly");
            $("#checkout-unlimited").attr("data-product", "531765");
        }
    });

    if (Cookies.get("site_referrer") === "Product Hunt") {
        $("#checkout-unlimited").attr("data-coupon", "PHF4M");
    }
})();