$(function() {

  var $mainHeight = $("section.main").height();

  $(document).on("scroll", function() {
    if ($("*, body").scrollTop() > $mainHeight) $("nav").addClass("fixed");
    else $("nav").removeClass("fixed");
  });

  $("nav li a").on("click", goto);

  function goto(e){

    e.preventDefault();
    e.stopPropagation();

    var t = $(this).attr("href"),
    n = t.substring(t.indexOf("#") + 1);

    var $el = $("." + n);

    var position;
    var paddingTop = parseInt($("nav").css("paddingTop"), 10);

    if (n == 'about') {
      position = $(".main").height()
    } else {

      if (!$("nav").hasClass("fixed")) position = Math.round($el.position().top - $("nav").outerHeight(true)*2);
      else position = Math.round($el.position().top - $("nav").outerHeight(true));

    }


    $("body,html").animate({ scrollTop: position }, { easing: "easeInSine", duration: 300 });

  }

});
