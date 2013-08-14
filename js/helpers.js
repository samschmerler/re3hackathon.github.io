lang = "en";

function isEmpty(str) {
  if (str) {
    return !str.match(/\S/)
  } else { return true; }
}

function isValid(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );
}

var sendErrors = 0;
var i18n = {
  en: {
    invalidEmail: "Invalid email",
    mandatory:    "Mandatory",
    sentSuccess:  "Thanks! We'll get in touch with you soon.",
    error: {
      tryAgain: "Please, try again.",
      send: "There are some erros in the form, please review it",
      writeToUs: "Please, write us at: seeyou@re3hackathon.com"
    }
  }
};


function check(callback) {
  var errors = 0;

   var $errors = $(".msg");

   if ($("form .msg").length > 0) {

     $errors.each(function(i, error) {

       $(error).fadeOut(250, function(){
         $(error).remove();
         if ($("form .msg").length == 0) check();
       });

     });
   }



  $("form").find(".field.radio.mandatory").each(function(i, field) {
    var $field = $(field);

    if ($field.find("input:checked").length == 0) {
      var msg    = $field.attr("data-msg") || i18n[lang].mandatory;
      var $error = $('<div class="msg error">' + msg + '</div>')
      $field.find("ul").after($error);
      $error.fadeIn(250);
      errors++;
    }

  });

  $("form").find("select.mandatory").each(function(i, field) {
    var $field = $(field);

    if ($field.find("option:selected").val() == "-1") {
      var msg    = $field.attr("data-msg") || i18n[lang].mandatory;
      var $error = $('<div class="msg error">' + msg + '</div>')
      $field.after($error);
      $error.fadeIn(250);
      errors++;
    }
  });

  $("form").find(".input").each(function(i, field) {

    var $field = $(field);
    var $input = $(field).find("input, textarea");
    var name = $input.attr("type");
    var mandatory = $field.hasClass("mandatory");
    var val = $input.val();

    if (name == 'email') {

      if (isEmpty(val) && mandatory) {
        var msg    = $field.attr("data-msg") || i18n[lang].mandatory;
        var $error = $('<div class="msg error">' + msg + '</div>')
        $field.append($error);
        $error.fadeIn(250);
        errors++;
      } else if (!isValid(val) && mandatory) {
        var msg    = $field.attr("data-msg") || i18n[lang].invalidEmail;
        var $error = $('<div class="msg error">' + msg + '</div>')
        $field.append($error);
        $error.fadeIn(250);
        errors++;
      }


    } else {

      if (isEmpty(val) && mandatory) {
        var msg    = $field.attr("data-msg") || i18n[lang].mandatory;
        var $error = $('<div class="msg error">' + msg + '</div>')
        $field.append($error);
        $error.fadeIn(250);
        errors++;
      }
    }

  });

  if (errors) {
    var $field = $("form").find(".field.submit");
    var $input = $field.find("a");
    var msg    = $field.attr("data-msg") || i18n[lang].error.send;
    var $error = $('<div class="msg error">' + msg + '</div>')

    $input.after($error);
    $error.fadeIn(250);

    errors = true;
    console.log('error');

    return;
  } else {
    console.log('error');
    callback && callback();
  }


}

