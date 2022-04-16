"use strict";
// const log = (log) => console.log(log);

// -------------------- STICKY NAV -----------------------//

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// -------------- SCROLL BY CLICK----------------------- //
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  const siblings = e.target
    .closest(".nav__links")
    .querySelectorAll(".nav__item--link");

  siblings.forEach((sibling) => sibling.classList.remove("active"));

  if (e.target.classList.contains("nav__item--link")) {
    const ref = e.target.getAttribute("href");
    e.target.classList.add("active");

    document.querySelector(ref).scrollIntoView({ behavior: "smooth" });
  }
  // Dynamic selection
});

// ---------- REVEALING ELEMENTS ON SCROLL ---------- //
const sections = document.querySelectorAll(".section");

const fixedId = function (str) {
  return str.padStart(str.length + 1, "#");
};

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  const navObserve = document.querySelectorAll(".nav__item--link");
  const idMatch = entry.target.getAttribute("id");

  navObserve.forEach((link) => {
    link.getAttribute("href") === fixedId(idMatch)
      ? link.classList.add("active")
      : link.classList.remove("active");
  });
  // observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// ------------- SLIDER ------------------- //

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
  goToSlide(curSlide);
};
goToSlide(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// ------------------------ TAB COMPONENT --------------------//
const tabsContainer = document.querySelector(".service__container__btns");
const serviceBtns = document.querySelectorAll(".service--btn");
const tabsContent = document.querySelectorAll(".service__content");

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
