/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */

import "@fortawesome/fontawesome-free/css/all.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/js/bootstrap.min.js";

+(function () {
  window.addEventListener("resize", function () {
    toggleMenuMobile();
  });

  toggleMenuMobile();

  AOS.init();
})();

function isMobile() {
  return document.documentElement.clientWidth <= 428;
}

function toggleMenuMobile() {
  let button = document.querySelector(".nav__button");
  let menu = document.getElementById("menu");
  if (isMobile()) {
    button.style.display = "block";
    menu.classList.remove("nav__list--inline");
  } else {
    button.style.display = "none";
    menu.classList.remove("dropdown-menu");
    menu.classList.add("nav__list--inline");
  }
}
