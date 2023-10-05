window.addEventListener('load', start)

function start() {
  document.querySelector('#toogle-menu').addEventListener('click', toogleMenu)
  document.querySelector('#nav-close').addEventListener('click', toogleMenu)

  // Particles.js
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', './assets/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
  });

  typeEffect()
}


function toogleMenu() {
  const menu = document.querySelector('#menu')
  if (menu) {
    menu.classList.toggle('hide-menu')
  }
}

// >>>>>>>>>>>>>> typing effect <<<<<<<<<<<<<<<<<

const dynamicText = document.querySelector('.typing-effect span')
const words = ['Pasión', 'Arte', 'Futuro', 'Todo']
let wordIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentWord = words[wordIndex]
  const currentChar = currentWord.substring(0, charIndex)

  dynamicText.textContent = currentChar;
  dynamicText.classList.add('stop-blinking')

  if (!isDeleting && charIndex < currentWord.length) {
    // type the next character
    charIndex++
    setTimeout(typeEffect, 200)
  } else if (isDeleting && charIndex > 0) {
    // remove the previous character
    charIndex--
    setTimeout(typeEffect, 100)
  } else {
    // if word is deleted then switch to the next word
    isDeleting = !isDeleting
    dynamicText.classList.remove('stop-blinking')
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex
    setTimeout(typeEffect, 1200)

  }
}