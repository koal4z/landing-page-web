"use strict";

var logoEl = document.querySelector('.nav__logo');
var headerContentBoxEl = Array.from(document.querySelector('.header__content--box').childNodes);
var haveHeaderContentEl = headerContentBoxEl.filter(function (el) {
  return el.localName;
});

function setStyle(el, act, val) {
  var El = el;
  El.style["".concat(act)] = val;
}

function moveLogoText(data) {
  setStyle(logoEl, 'opacity', 0);
  setTimeout(function () {
    logoEl.classList.add('logo-animation');
    setStyle(logoEl, 'opacity', 1);
  }, data.t);
}

function moveTextDown(data) {
  var time = data.time;
  var elements = data.elements,
      element = data.element;

  if (elements) {
    elements.forEach(function (el) {
      var El = el;
      setStyle(El, 'opacity', 0);
      setTimeout(function () {
        El.classList.add('text-animation');
        setStyle(El, 'opacity', 1);
      }, time);
      time += 400;
    });
  }

  if (element) {
    setTimeout(function () {
      element.classList.add('text-animation');
      setStyle(element, 'opacity', 1);
    }, time);
  }
}

var allTextEls = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,img')).filter(function (el) {
  return !/footer|header/i.test(el.className);
});
var allInputButtonEls = Array.from(document.querySelectorAll('input,button')).filter(function (el) {
  return !/footer|header/i.test(el.className);
});
window.addEventListener('DOMContentLoaded', function () {
  moveLogoText({
    time: 500
  });
  moveTextDown({
    time: 600,
    elements: haveHeaderContentEl
  });
  allTextEls.forEach(function (el) {
    var El = el;
    setStyle(El, 'opacity', 0);
  });
  allInputButtonEls.forEach(function (el) {
    var El = el;
    setStyle(El, 'opacity', 0);
  });
});
window.addEventListener('scroll', function () {
  allTextEls.forEach(function (el) {
    var rect = el.getBoundingClientRect();

    if (rect.y < 400) {
      moveTextDown({
        time: 0,
        element: el
      });
    }
  });
  allInputButtonEls.forEach(function (el) {
    var El = el;
    var rect = El.getBoundingClientRect();

    if (rect.y < 400) {
      setStyle(El, 'opacity', 1);
      El.classList.add('opacity-animation');
    }
  });
});
var searchEl = document.querySelector('.nav__search');
var navMenuEl = document.querySelector('.nav__menu');

function handlerHideInput() {
  var searchInputEl = document.querySelector('.nav__search--input');
  setStyle(searchEl.querySelector('i'), 'color', '#FFFFFF');
  setStyle(searchEl.querySelector('i'), 'transform', 'scale(1)');
  setStyle(searchEl, 'padding-top', '0');
  searchInputEl.remove();
}

function handlerShowInput() {
  var searchInputEl = document.querySelector('.nav__search--input');
  setStyle(searchEl.querySelector('i'), 'transform', 'scale(1.2)');
  setStyle(searchEl.querySelector('i'), 'color', 'rgb(255, 127, 127)');
  setStyle(searchEl, 'padding-top', '1.2rem');

  if (!searchInputEl) {
    setTimeout(function () {
      searchEl.insertAdjacentHTML('beforebegin', '<input type="text" class="nav__search--input input" />');
      setStyle(searchInputEl, 'margin', '0 0 0 auto');
    }, 100);
  }
}

function handlerNavBox() {
  if (navMenuEl.style.display !== 'none') {
    navMenuEl.classList.add('moveFadeOut-animation');
    navMenuEl.classList.remove('moveFadeIn-animation');
    setTimeout(function () {
      return setStyle(navMenuEl, 'display', 'none');
    }, 500);
    setTimeout(function () {
      return handlerShowInput();
    }, 500);
  } else {
    setStyle(navMenuEl, 'display', 'flex');
    navMenuEl.classList.add('moveFadeIn-animation');
    navMenuEl.classList.remove('moveFadeOut-animation');
    setTimeout(function () {
      return handlerHideInput();
    }, 0);
  }
}

searchEl.addEventListener('click', function () {
  handlerNavBox();
});
var navHamburger = document.querySelector('.nav__menu--hamburger');
var navMenuBoxEl = document.querySelector('.nav__menu--box');

function handlerHamburger() {
  navHamburger.classList.toggle('active');
  navMenuBoxEl.classList.toggle('active-bar');
}

navHamburger.addEventListener('click', handlerHamburger);