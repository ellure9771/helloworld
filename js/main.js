$(function() {
    if ($("#menu").length != 0) {
        $("#menu").treeview({
            animated: "fast",
            //collapsed: true,
        });
        $("#menu a").click(function(e){
            e.preventDefault();
            $this = $(this);
            $link = $this.attr("href");
            $("iframe").attr("src", $link);
        });
    };

    var hHeight = $("header").outerHeight();
    var fHeight = $("footer").outerHeight();
    $("iframe").css("height", $(window).height() - hHeight - fHeight - 50 + "px");
});
