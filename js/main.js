
window.addEventListener('load', start)

function start() {
  // menu
  document.querySelector('#toggle-menu').addEventListener('click', toogleMenu)
  document.querySelector('#nav-close').addEventListener('click', toogleMenu)

  // Particles.js
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', './assets/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
  });

  // trayectoria
  document.querySelectorAll('[data-target]').forEach(tab => tab.addEventListener('click', trayectoriaActive))

  // typing effect
  typeEffect()

  // scroll section active link
  window.addEventListener('scroll',scrollActive)

  // scroll header
  window.addEventListener('scroll',scrollHeader)

  // scrollTop
  window.addEventListener('scroll',scrollTop)

	//form validation
	const btnEnviar = document.getElementById("enviar")
	btnEnviar.addEventListener('click', formValidation)
}


function toogleMenu() {
  const menu = document.querySelector('#menu')
  if (menu) {
    menu.classList.toggle('hide-menu')
  }
}

// >>>>>>>>>>>>>> typing effect <<<<<<<<<<<<<<<<<

const dynamicText = document.querySelector('.typing-effect span')
const words = ['Pasión', 'Arte', 'Futuro', 'Divertido']
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

// >>>>>>>>>>>>>> Trayectoria <<<<<<<<<<<<<<<<<

const tabs = document.querySelectorAll('[data-target]')
const trayectoriaContents = document.querySelectorAll('.trayectoria-section-content')

function trayectoriaActive(e){
  // recuperamos el id del content que deseamos ver
  const targetId = e.target.dataset.target
  const target = document.querySelector(targetId)

  // eliminamos la clase active de los contents
  trayectoriaContents.forEach(content => {
    content.classList.remove('active')
  })

  // agregamos la clase active al content que deseamos visualizar
  target.classList.add('active')

  // eliminamos la clase active de los tabs
  tabs.forEach(tab => {
    tab.classList.remove('active')
  })

  //añadimos la clase active al tab seleccionado
  e.target.classList.add('active')
}

// Scroll section and active link
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  // constante con la cual tenemos el valor del scroll en todo momento
  const scrollY = window.scrollY

  sections.forEach((section) => {
    //obtenemos el height de cada section
    const sectionHeight = section.offsetHeight

    //obtenemos la distancia a la que se encuentra cada section del top de la ventana
    const sectionTop = section.offsetTop - 60
    
    // obtenemos el id de la section
    const sectionId = section.getAttribute('id')
    // console.log(section.id, sectionHeight, sectionTop)

    // si el valor del scrollY es mayor que sectionTop, 
    // osea que estamos a la altura o hemos pasado la altura de la section 
    // y 
    // scrollY menor igual que la suma de sectionTop más sectionHeight
    // osea que estemos dentro de la section y que no nos salgamos de ella
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document
        .querySelector(`.menu-content a[href*=${sectionId}]`)
        .classList.add('active-link')
    }else{
      document
        .querySelector(`.menu-content a[href*=${sectionId}]`)
        .classList.remove('active-link')
    }
  })

}

// Scroll Header, apply box shadow to header
function scrollHeader (){
  const header = document.getElementsByTagName('header')
  
  // el this en este caso hace referencia a window ya que es el 
  // elemento al que hemos aplicado el evento

  //si el valor del scroll es superior a 100
  if(this.scrollY > 100){
    header[0].classList.add('scroll-header')
  }else{
    header[0].classList.remove('scroll-header')
  }
}

// show arrow to navigate to top page
function scrollTop () {
  const scrollTop = document.getElementById('scroll-top')

  if(this.scrollY > (this.innerHeight / 2)){
    scrollTop.classList.add('show-scroll-top')
  }else{
    scrollTop.classList.remove('show-scroll-top')
  }
}


// form validation
function formValidation(e){
	e.preventDefault()
	// get form by id
	const form = document.getElementById("formContact")

	// create FormData object
	const formData = new FormData(form)

	// check inputs not empty
	for ( let pair of formData.entries()){
		if(pair[1] == 0){
			alert("Debes rellenar todos los campos")
			
			return
		}
	}

	// format email
	// create email body
	const subject = "Contacto desde portfolio"
	const emailBody = "Nombre: " + formData.get("name") + 
									"\nEmail: " + formData.get("email") +
									"\n" + formData.get("message") 


	// add parameters to the mailto link
	const emailLink = `mailto:thedezz360@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}` 

	// open email client with custom link
	window.location.href = emailLink
}