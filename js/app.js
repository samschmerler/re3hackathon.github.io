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

    $("nav").removeClass("fixed");

    var t = $(this).attr("href"),
    n = t.substring(t.indexOf("#") + 1);

    var $el = $("." + n);

    var position;
    var paddingTop = parseInt($("nav").css("paddingTop"), 10);

    if (n == 'about') {
      position = $(".main").height()
    } else {
      position = Math.round($el.offset().top) - $("nav").outerHeight(true) ;
      console.log(position);
    }

    $("body,html").animate({ scrollTop: position }, { easing: "easeInSine", duration: 300 });

  }

});
