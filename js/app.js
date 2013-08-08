$(function() {

  var $mainHeight = $("section.main").height();

  $(document).on("scroll", function() {

    if ($("body").scrollTop() > $mainHeight) $("nav").addClass("fixed");
    else $("nav").removeClass("fixed");

  });
});
