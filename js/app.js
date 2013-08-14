
function submitForm(e) {

  e && e.preventDefault();
  e && e.stopPropagation();

  check(function() {

    $.ajax({
      type: "GET",
      url: "/form/endpoint",
      data: $("form.nominate").serialize(),
      success: function(data) {
        console.log('success');
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
