$(document).ready(function() {
  var modal = $(".modal"),
    modalBtn = $("[data-toggle=modal]"),
    closeBtn = $(".modal__close"),
    container = $(".contaienr"),
    button = $(".go-top");

  modalBtn.on("click", function(e) {
    modal.toggleClass("modal--visible");
  });
  closeBtn.on("click", function() {
    modal.toggleClass("modal--visible");
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
  var mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });
  var next = $(".swiper-button-next");
  var prev = $(".swiper-button-prev");
  var bullets = $(".swiper-pagination");

  next.css("left", prev.width() + 10 + bullets.width() + 10);
  bullets.css("left", prev.width() + 10);
});
