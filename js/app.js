$(function() {

  var $mainHeight = $("section.main").height();

  $(document).on("scroll", function() {
    if ($("body").scrollTop() > $mainHeight) $("nav").addClass("fixed");
    else $("nav").removeClass("fixed");
  });

  $("nav li a").on("click", goto);

  function goto(e){
    e.preventDefault();
    e.stopPropagation();

    var t = $(this).attr("href"),
    n = t.substring(t.indexOf("#") + 1);

    var $el = $("." + n);

    var paddingTop = parseInt($el.find(".inner").css("paddingTop"), 10);
    var position = $el.offset().top - paddingTop;

    console.log($el.offset().top, position, paddingTop);

    $("body,html").animate({ scrollTop: position + 4 }, { easing: "easeInSine", duration: 300});

  }

});
