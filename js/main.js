$(document).ready(function() {
  var modal = $(".modal"),
    modalBtn = $("[data-toggle=modal]"),
    closeBtn = $(".modal__close"),
    modalDialog = $(".modal__dialog"),
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

  var steps = new Swiper(".steps__swiper-container", {
    // Optional parameters
    loop: true,

    pagination: {
      el: ".steps__swiper-pagination",
      type: "bullets"
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
    steps.slideTo(e);
  });
  steps.on("slideChange", function() {
    let e = steps.activeIndex - 1;
    if (e === 6) {
      e = 0;
    }
    $(".left-item").removeClass("active");
    $(".left-item")
      .eq(e)
      .addClass("active");
  });
});
