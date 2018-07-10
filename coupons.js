$(function() {
    let couponCode = getParameterByName("coupon_code") || Cookies.get("coupon_code") || "";
    console.log(couponCode);

    if (couponCode.length > 0) {
        Cookies.set("coupon_code", couponCode);
    }

    $("#checkout-unlimited").attr("data-coupon", couponCode);

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});