
function submitForm(e) {

  e && e.preventDefault();
  e && e.stopPropagation();

  check(function() {

    $.ajax({
      type: "POST",
      url: "http://re3hackathon.us7.list-manage1.com/subscribe/post",
      data: $("form.nominate").serialize(),
      success: function(data) {

        var
        $field = $("form").find(".field.submit"),
        $input = $field.find("a"),
        msg    = i18n[lang].sentSuccess,
        $msg   = $('<div class="msg success">' + msg + '</div>');

        $input.after($msg);
        $msg.fadeIn(250);

        $("form input[type='text'], form input[type='email'], textarea").val("");

      }
    });

  });

}

function updateNavPosition() {

  var $mainHeight = $("section.main").height();

  if ($(document).scrollTop() > $mainHeight) {
    $("nav").addClass("fixed");
    $("nav .re3").fadeIn(150);
    $("nav ul.navigation").addClass("with_logo");
    $("nav ul.actions").fadeIn(150);
  } else {
    $("nav").removeClass("fixed");
    $("nav .re3").fadeOut(150);
    $("nav ul.navigation").removeClass("with_logo");
    $("nav ul.actions").fadeOut(150);
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
  var $el = $("section." + n);

  window.location.hash = n;

  $("nav li").removeClass("active");
  $("nav li a." + n).parent().addClass("active");

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

  //$(window).resize(function() {
    //$('.breakpoint .coordinates').text($(window).width() + "x" + $(window).height());
  //});

  var device = (/android|webos|iphone|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
  var attribute = device ? "mobile" : "original";

  $(".cover").lazyload({
    effect : "fadeIn",
    data_attribute: "mobile"
  });

  updateNavPosition();

  $('select').select2();

  $('a[data-action="submit-email"]').on("click", function(e) {
    $("form.email").submit();
  });

  $('a[data-action="submit-email"]').on("keypress", function(e){
    if(e.which == 13) {
      $("form.email").submit();
    }
  });

  $('.nominate .submit').on("click", function() {
    $("form.nominate").submit();
  });

  $('form.nominate input').on("keypress", function(e){
    if(e.which == 13) {
      $("form.nominate").submit();
    }
  });

  $(document).on("scroll", updateNavPosition);
  $("a.scroll").on("click", go);

  if(window.location.hash) {
    setTimeout(function() {
    go(null, window.location.hash);
    }, 500);
  }

});
