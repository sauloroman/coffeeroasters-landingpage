// ########################################
// HTML REFERENCES
// ########################################
const navigation = document.querySelector('.navigation');
const buttonOpenNav = document.querySelector('.header__icon--menu');
const buttonCloseNav = document.querySelector('.header__icon--close');

// ########################################
// FUNCTIONS
// ########################################

const toggleMenu = function() {
  navigation.classList.toggle('navigation--open');
}

// ########################################
// EVENT LISTENERS
// ########################################

buttonOpenNav.addEventListener('click', toggleMenu );
buttonCloseNav.addEventListener('click', toggleMenu );