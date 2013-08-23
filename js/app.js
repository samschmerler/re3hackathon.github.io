
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
    $("body.home nav").addClass("fixed");
    $("body.home nav .re3").fadeIn(150);
    $("body.home nav ul.navigation").addClass("with_logo");
    $("body.home nav ul.actions").fadeIn(150);
  } else {
    $("body.home nav").removeClass("fixed");
    $("body.home nav .re3").fadeOut(150);
    $("body.home nav ul.navigation").removeClass("with_logo");
    $("body.home nav ul.actions").fadeOut(150);
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

  var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
  var isiPad = navigator.userAgent.match(/iPad/i) != null;

  var mapOptions = {
    center: new google.maps.LatLng(40.7350, -73.9946),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    zoomControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

  if (isiPad) {
    mapOptions.draggable = false;
    mapOptions.disableDoubleClickZoom = true;
  }

  if (isiPhone) {
    mapOptions.draggable = false;
    mapOptions.disableDoubleClickZoom = true;
    mapOptions.center = new google.maps.LatLng(40.7400, -73.9956),
    mapOptions.zoom = 15;
  }

  var styles = [ { "featureType": "landscape", "stylers": [ { "visibility": "on" }, { "color": "#39c2c9" } ] },{ "featureType": "road", "stylers": [ { "visibility": "simplified" }, { "color": "#3acbc9" }, { "lightness": 16 }, { "weight": 3 } ] },{ "featureType": "water", "stylers": [ { "color": "#4897cb" } ] },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "invert_lightness": true }, { "weight": 3.8 }, { "color": "#4ec9e2" } ] },{ },{ "elementType": "labels.text.fill", "stylers": [ { "color": "#5e31cb" }, { "visibility": "on" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "simplified" }, { "saturation": -85 }, { "color": "#41b1cb" } ] },{ } ];

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.7350, -73.9949),
    map: map,
    icon: 'img/marker.png',
  });


  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

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
