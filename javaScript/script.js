"use strict";

let isMenuClicked = false;
let windowWidth = 0;
let year = document.querySelector(".year");
let currentYear = new Date().getFullYear();
const hero = document.querySelector(".hero-section");
const header = document.querySelector(".main-header");
const menuButton = document.querySelector(".mobile-menu-open");
const menuCloseButton = document.querySelector(".mobile-menu-close");
const websiteLogo = document.querySelector(".navigation-logo-list");
const navigation = document.querySelector(".navigation");
const mobileNavigation = document.querySelector(
  ".mobile-nav-hidden-at-the-largest-screen"
);

const allLinks = document.querySelectorAll("a:link");

// Implementing mobile navigation
const showMobileNavigation = function () {
  mobileNavigation.classList.add("mobile-navigation");
  websiteLogo.classList.add("hidden");
  navigation.classList.add("hidden");
  menuCloseButton.classList.remove("hidden");
  menuButton.classList.add("hidden");
  isMenuClicked = true;
};

const removeMobileNavigation = function () {
  mobileNavigation.classList.remove("mobile-navigation");
  websiteLogo.classList.remove("hidden");
  navigation.classList.remove("hidden");
  menuCloseButton.classList.add("hidden");
  menuButton.classList.remove("hidden");
};

const detectWidthChange = function () {
  windowWidth = window.innerWidth;
  removeMobileNavigationOnWidthChange();
};

window.addEventListener("resize", detectWidthChange);

menuButton.addEventListener("click", function () {
  showMobileNavigation();
});

menuCloseButton.addEventListener("click", function () {
  removeMobileNavigation();
});

const removeMobileNavigationOnWidthChange = function () {
  if (windowWidth > 864 && isMenuClicked) {
    removeMobileNavigation();
  }
};

// implementing smooth scrolling

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    if (href === "#") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      removeMobileNavigation();
    }

    if (href !== "#" && href.startsWith("#")) {
      e.preventDefault();
      let element = document.querySelector(href);

      element.scrollIntoView({ behavior: "smooth" });
    }
    removeMobileNavigation();
  });
});

// Implementing year

year.textContent = currentYear;
year.style.color = "inherit";
year.style.fontWeight = "inherit";

/// implementing sticky navigation

const observer = new IntersectionObserver(
  function (entries) {
    console.log(entries[0].isIntersecting);
    if (entries[0].isIntersecting) {
      header.classList.remove("sticky");
    }

    if (!entries[0].isIntersecting) {
      header.classList.add("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(hero);
