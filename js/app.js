
function submitForm(e) {

  e && e.preventDefault();
  e && e.stopPropagation();

  check(function() {

    $.ajax({
      type: "GET",
      url: "/form/endpoint",
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


  var device = (/android|webos|iphone|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
  var attribute = device ? "mobile" : "original";

  $(".cover").lazyload({
    effect : "fadeIn",
    data_attribute: "mobile"
  });

  updateNavPosition();

  $('select').select2();

  $('a[data-action="submit-email"]').on("click", function(e) {

    e.preventDefault();
    e.stopPropagation();

    var data = { email: $("input.email").val() };

    $.ajax({
      type: "GET",
      url: "/email/endpoint",
      data: data,
      success: function(data) {
        console.log('success');
      }
    });

  });

  $('.nominate .submit').on("click", submitForm);
  $('form.nominate input').on("keypress", function(e){
    if(e.which == 13) {
      submitForm(e);
    }
  });

  $(document).on("scroll", updateNavPosition);
  $("nav .navigation li a.scroll").on("click", go);

  if(window.location.hash) {
    setTimeout(function() {
    go(null, window.location.hash);
    }, 500);
  }

});
