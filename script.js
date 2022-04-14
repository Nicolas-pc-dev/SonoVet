"use strict";
const log = (log) => console.log(log);

const slides = document.querySelectorAll(".about__container--card");
const btnLeft = document.querySelector(".about__btn--left");
const btnRight = document.querySelector(".about__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const nextSlide = function () {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
};

const prevSlide = function () {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  console.log(curSlide);
  goToSlide(curSlide);
};
goToSlide(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// ------------------------ TAB COMPONENT --------------------//
const tabsContainer = document.querySelector(".service__container__btns");
const serviceBtns = document.querySelectorAll(".service--btn");
const tabsContent = document.querySelectorAll(".service__content");

// serviceBtns.forEach((button) =>
//   button.addEventListener("click", function () {
//     console.log("click");
//   })
// );

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".service--btn");
  if (!clicked) return;

  serviceBtns.forEach((button) => button.classList.remove("btn--active"));
  tabsContent.forEach((content) => {
    content.classList.remove("service__container--active");
  });

  clicked.classList.add("btn--active");

  document
    .querySelector(`.service__container--${clicked.dataset.tab}`)
    .classList.add("service__container--active");
});

// -------------------- STICKY NAV -----------------------//

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
