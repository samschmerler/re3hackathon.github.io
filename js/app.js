window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

function updateNavPosition() {

  var $mainHeight = $("section.main").height();

  if ($(document).scrollTop() > $mainHeight) {
    $("nav").addClass("fixed");
  } else {
    $("nav").removeClass("fixed");
  }

}

function go(e, hash) {

  e && e.preventDefault();
  e && e.stopPropagation();

  var t;

  if (hash) {
    t = hash
  } else {
    t = $(this).attr("href");
  }

  n = t.substring(t.indexOf("#") + 1);
  var $el = $("." + n);

    window.location.hash = n;

  $("nav li").removeClass("active");
  $(this).parent().addClass("active");

  var position;
  var paddingTop = parseInt($("nav").css("paddingTop"), 10);

  if (n == 'about') {
    position = $(".main").height()
  } else {

    if (!$("nav").hasClass("fixed")) position = Math.round($el.position().top - $("nav").outerHeight(true)*2 + 2);
    else position = Math.round($el.position().top - $("nav").outerHeight(true) + 1);

  }

  $("body,html").animate({ scrollTop: position }, { easing: "easeInSine", duration: 300 });

}

$(function() {

  updateNavPosition();

  $(document).on("scroll", updateNavPosition);
  $("nav li a").on("click", go);

  if(window.location.hash) {
    go(null, window.location.hash);
  } else {
    // Fragment doesn't exist
  }


});
