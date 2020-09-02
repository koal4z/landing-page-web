const logoEl = document.querySelector('.nav__logo')
const headerContentBoxEl = Array.from(document.querySelector('.header__content--box').childNodes)
const haveHeaderContentEl = headerContentBoxEl.filter((el) => el.localName)

function setStyle(el, act, val) {
  const El = el
  El.style[`${act}`] = val
}

function moveLogoText(data) {
  setStyle(logoEl, 'opacity', 0)
  setTimeout(() => {
    logoEl.classList.add('logo-animation')
    setStyle(logoEl, 'opacity', 1)
  }, data.t)
}

function moveTextDown(data) {
  let { time } = data
  const { elements, element } = data
  if (elements) {
    elements.forEach((el) => {
      const El = el
      setStyle(El, 'opacity', 0)
      setTimeout(() => {
        El.classList.add('text-animation')
        setStyle(El, 'opacity', 1)
      }, time)
      time += 400
    })
  }
  if (element) {
    setTimeout(() => {
      element.classList.add('text-animation')
      setStyle(element, 'opacity', 1)
    }, time)
  }
}

const allTextEls = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,img')).filter(
  (el) => !/footer|header/i.test(el.className),
)

const allInputButtonEls = Array.from(document.querySelectorAll('input,button')).filter(
  (el) => !/footer|header/i.test(el.className),
)

window.addEventListener('DOMContentLoaded', () => {
  moveLogoText({ time: 500 })
  moveTextDown({ time: 600, elements: haveHeaderContentEl })

  allTextEls.forEach((el) => {
    const El = el
    setStyle(El, 'opacity', 0)
  })
  allInputButtonEls.forEach((el) => {
    const El = el
    setStyle(El, 'opacity', 0)
  })
})

window.addEventListener('scroll', () => {
  allTextEls.forEach((el) => {
    const rect = el.getBoundingClientRect()

    if (rect.y < 400) {
      moveTextDown({ time: 0, element: el })
    }
  })
  allInputButtonEls.forEach((el) => {
    const El = el
    const rect = El.getBoundingClientRect()

    if (rect.y < 400) {
      setStyle(El, 'opacity', 1)
      El.classList.add('opacity-animation')
    }
  })
})

const searchEl = document.querySelector('.nav__search')
const navMenuEl = document.querySelector('.nav__menu')

function handlerHideInput() {
  const searchInputEl = document.querySelector('.nav__search--input')
  setStyle(searchEl.querySelector('i'), 'color', '#FFFFFF')
  setStyle(searchEl.querySelector('i'), 'transform', 'scale(1)')
  searchInputEl.remove()
}

function handlerShowInput() {
  const searchInputEl = document.querySelector('.nav__search--input')
  setStyle(searchEl.querySelector('i'), 'transform', 'scale(1.2)')
  setStyle(searchEl.querySelector('i'), 'color', 'rgb(255, 127, 127)')
  if (!searchInputEl) {
    setTimeout(() => {
      searchEl.insertAdjacentHTML(
        'beforebegin',
        '<input type="text" class="nav__search--input input" />',
      )
      setStyle(searchInputEl, 'margin', '0 0 0 auto')
    }, 100)
  }
}

function handlerNavBox() {
  if (navMenuEl.style.display !== 'none') {
    navMenuEl.classList.add('moveFadeOut-animation')
    navMenuEl.classList.remove('moveFadeIn-animation')
    setTimeout(() => setStyle(navMenuEl, 'display', 'none'), 500)
    setTimeout(() => handlerShowInput(), 500)
  } else {
    setStyle(navMenuEl, 'display', 'flex')
    navMenuEl.classList.add('moveFadeIn-animation')
    navMenuEl.classList.remove('moveFadeOut-animation')
    setTimeout(() => handlerHideInput(), 0)
  }
}

searchEl.addEventListener('click', () => {
  handlerNavBox()
})

const navHamburger = document.querySelector('.nav__menu--hamburger')
const navMenuBoxEl = document.querySelector('.nav__menu--box')
function handlerHamburger() {
  navHamburger.classList.toggle('active')
  navMenuBoxEl.classList.toggle('active-bar')
}
navHamburger.addEventListener('click', handlerHamburger)
