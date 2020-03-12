/*
document.addEventListener("DOMContentLoaded", function(event) {
  const modal = document.querySelector(".modal");
  const modalBtn = document.querySelectorAll("[data-toggle=modal]");
  const closeBtn = document.querySelector(".modal__close");
  const switchModal = () => {
    modal.classList.toggle("modal--visible");
  };
  modalBtn.forEach(element => {
    element.addEventListener("click", switchModal);
  });
  closeBtn.addEventListener("click", switchModal);
  //закрыть по крестику
  document.addEventListener("keyup", e => {
    const key = e.keyCode;
    if (key == 27) {
      document.querySelector(".modal").classList.remove("modal--visible");
    }
  });
  //закрыть при нажатии esc
  document.addEventListener("click", e => {
    if (e.target == modal) {
      modal.classList.remove("modal--visible");
    }
  });
  //закрыть по клику вне окна
});
*/
$(document).ready(function() {
  var modal = $(".modal"),
    modalBtn = $("[data-toggle=modal]"),
    closeBtn = $(".modal__close"),
    button = $(".go-top");

  modalBtn.on("click", function() {
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
});
