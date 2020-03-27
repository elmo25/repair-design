$(document).ready(function() {
  var modal = $(".modal"),
    modalBtn = $("[data-toggle=modal]"),
    closeBtn = $(".modal__close"),
    modalDialog = $(".modal__dialog"),
    modalThx = $(".modal-thanks"),
    closeThx = $(".modal-thanks__close"),
    button = $(".go-top");

  modalBtn.on("click", function(e) {
    modal.toggleClass("modal--visible");
  });
  closeBtn.on("click", function() {
    modal.toggleClass("modal--visible");
  });
  closeThx.on("click", function() {
    modalThx.toggleClass("modal-thanks--visible");
  });
  $(window).on("scroll", e => {
    if ($(this).scrollTop() >= 50) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on("click", e => {
    e.preventDefault();
    $("html").animate({ scrollTop: 0 }, 1000);
  });
  //кнопка на вверх
  $(document).keyup(function(event) {
    if (event.which == "27") {
      $(".modal").removeClass("modal--visible");
    }
  });
  //закрыть на esc
  $(document).on("click", function(event) {
    if (event.target == ".modal") {
      modal.removeClass("modal--visible");
    }
  });
  modal.on("click", function(e) {
    if (!modalDialog.is(e.target) && modalDialog.has(e.target).length === 0) {
      modal.toggleClass("modal--visible");
    }
  });
  var mySwiper = new Swiper(".projects__swiper-container", {
    // Optional parameters
    loop: true,
    pagination: {
      el: ".projects__swiper-pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".projects__swiper-button-next",
      prevEl: ".projects__swiper-button-prev"
    }
  });
  var next = $(".projects__swiper-button-next");
  var prev = $(".projects__swiper-button-prev");
  var bullets = $(".projects__swiper-pagination");

  next.css("left", prev.width() + 10 + bullets.width() + 10);
  bullets.css("left", prev.width() + 10);

  var steps = new Swiper(".steps__swiper-container", {
    // Optional parameters
    loop: true,

    pagination: {
      el: ".steps__swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".steps__swiper-button-next",
      prevEl: ".steps__swiper-button-prev"
    }
  });
  var next = $(".steps__swiper-button-next");
  var prev = $(".steps__swiper-button-prev");
  var bullets = $(".steps__swiper-pagination");

  next.css("left", prev.width() + 10 + bullets.width() + 10);
  bullets.css("left", prev.width() + 10);

  $(".left-item").on("click", function() {
    $(".left-item").removeClass("active");
    $(this).addClass("active");
    const e = $(this).data("index");
    steps[0].slideTo(e);
    steps[1].slideTo(e);
    steps.on("slideChange", function() {
      const e = steps[0].activeIndex - 1;
      if (e === 6) {
        e = 0;
      }
      $(".left-item").removeClass("active");
      $(".left-item")
        .eq(e)
        .addClass("active");
    });
  });

  steps[0].on("slideChange", function() {
    let e = steps[0].activeIndex - 1;
    if (e === 6) {
      e = 0;
    }
    $(".left-item").removeClass("active");
    $(".left-item")
      .eq(e)
      .addClass("active");
  });
  new WOW().init();

  var target = $(".control__text");
  var targetPos = target.offset().top;
  var winHeight = $(window).height();
  var scrollToElem = targetPos - winHeight;

  $(window).scroll(function() {
    var winScrollTop = $(this).scrollTop();
    if (winScrollTop > scrollToElem) {
      target.addClass("slidein");
    }
  });
  //Валидация формы
  $(".modal__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 11
      },
      // compound rule
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Не короче двух букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Должно быть 11 цифр"
      },
      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате name@domain.com"
      },
      policyCheckbox: {
        required: "Нужно ваше согласие"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(form)[0].reset();
          modal.removeClass("modal--visible");
          modalThx.toggleClass("modal-thanks--visible");
        },
        error: function(response) {
          console.error("Ошибка запроса" + response);
        }
      });
    }
  });

  $(".control__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 11
      },
      policyCheckbox: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя должно быть не короче двух букв",
        maxlength: "Имя должно быть не длиннее 15 символов"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Должно быть 11 цифр"
      },
      policyCheckbox: {
        required: "Нужно ваше согласие"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(form)[0].reset();
          modal.removeClass("modal--visible");
          modalThx.toggleClass("modal-thanks--visible");
        },
        error: function(response) {
          console.error("Ошибка запроса" + response);
        }
      });
    }
  });

  $("[type=tel]").mask("+7(000) 00-00-000", {
    placeholder: "+7(000) 00-00-000"
  });
  $(".footer__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 11
      },
      policyCheckbox: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя должно быть не короче двух букв",
        maxlength: "Имя должно быть не длиннее 15 символов"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Должно быть 11 цифр"
      },
      policyCheckbox: {
        required: "Нужно ваше согласие"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(form)[0].reset();
          modal.removeClass("modal--visible");
          modalThx.toggleClass("modal-thanks--visible");
        },
        error: function(response) {
          console.error("Ошибка запроса" + response);
        }
      });
    }
  });
  $(".footer__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 11
      },
      policyCheckbox: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя должно быть не короче двух букв",
        maxlength: "Имя должно быть не длиннее 15 символов"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Должно быть 11 цифр"
      },
      policyCheckbox: {
        required: "Нужно ваше согласие"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(form)[0].reset();
          modal.removeClass("modal--visible");
          modalThx.toggleClass("modal-thanks--visible");
        },
        error: function(response) {
          console.error("Ошибка запроса" + response);
        }
      });
    }
  });
  $(".info-modal__form").validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 11
      },
      // compound rule
      userEmail: {
        required: true,
        email: true
      },
      policyCheckbox: {
        required: true
      }
    },
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Не короче двух букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Должно быть 11 цифр"
      },
      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате name@domain.com"
      },
      policyCheckbox: {
        required: "Нужно ваше согласие"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function(response) {
          $(form)[0].reset();
          modal.removeClass("modal--visible");
          modalThx.toggleClass("modal-thanks--visible");
        },
        error: function(response) {
          console.error("Ошибка запроса" + response);
        }
      });
    }
  });
  // map
  ymaps.ready(function() {
    var myMap = new ymaps.Map(
        "map",
        {
          center: [47.244729, 39.723187],
          zoom: 20
        },
        {
          searchControlProvider: "yandex#search"
        }
      ),
      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: "Это наш офис",
          balloonContent: "Вход со двора"
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: "image/marker.png",
          // Размеры метки.
          iconImageSize: [16, 16],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
        }
      );
    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.add(myPlacemark);
    function loadScript(url, callback) {
      var script = document.createElement("script");

      if (script.readyState) {
        // IE
        script.onreadystatechange = function() {
          if (
            script.readyState == "loaded" ||
            script.readyState == "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Другие браузеры
        script.onload = function() {
          callback();
        };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  });
});
