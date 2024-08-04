// ########################################
// HTML REFERENCES
// ########################################
const navigation = document.querySelector('.navigation');
const buttonOpenNav = document.querySelector('.header__icon--menu');
const buttonCloseNav = document.querySelector('.header__icon--close');
const questionsContainer = document.querySelector('.questions__container');

// ########################################
// VARIABLES
// ########################################

const questionsAnswers = {}

// ########################################
// FUNCTIONS
// ########################################

const toggleMenu = function() {
  navigation.classList.toggle('navigation--open');
}

const createOptions = function( options = [] ) {
  let questionHTML = "";
  
  options.forEach( ({title, text}, i) => {
    questionHTML += `
      <div class="question__option ${ i === 0 && 'question__option--selected'}">
        <h3 class="heading-4 question__option-title">${title}</h3>
        <p class="question__option-text">${text}</p>
      </div>
    `
  })

  return questionHTML;
}

const displayQuestions = async function() {
  const resp = await fetch('/src/assets/data/questions.json');
  const { questions } = await resp.json();

  questions.forEach( function({ id, question, options }) {
    
    const questionEle = `
      <li class="question" data-id="${id}">
        <header class="question__header flex flex__between">
          <h2 class="heading-4 question__title">${question}</h2>
          <i class='bx bx-chevron-up question__icon hidden'></i>
          <i class='bx bx-chevron-down question__icon'></i>
        </header>
        <div class="question__content">
          <div class="question__options">${ createOptions( options ) }</div>
        </div>
      </li>
    `;

    questionsContainer.insertAdjacentHTML('beforeend', questionEle );
  });
}

const init = async function() {
  await handleQuestions();
}

// ########################################
// EVENT LISTENERS
// ########################################

buttonOpenNav.addEventListener('click', toggleMenu );
buttonCloseNav.addEventListener('click', toggleMenu );

const handleQuestions = async function() {

  await displayQuestions();

  document.querySelectorAll('.question__option--selected').forEach( (selectedOption, i) => {
    questionsAnswers[`question-${i + 1}`] = selectedOption.firstElementChild.textContent;
  })
  
  document.querySelectorAll('.question__icon').forEach( function( icon ) {
    icon.addEventListener('click', function() {
      const clickedQuestion = icon.closest('.question');
      
      const content = clickedQuestion.lastElementChild;
      content.classList.toggle('question__content--show');

      const header = clickedQuestion.firstElementChild;
      const [ , firstIcon, secondIcon ] = header.children;
      firstIcon.classList.toggle('hidden');
      secondIcon.classList.toggle('hidden');
    })
  })

  document.querySelectorAll('.question__options').forEach( function( questionOptions ) {
    questionOptions.addEventListener('click', function(e) {
      const optionClicked = e.target.closest('.question__option')
      const optionsContainer = Array.from(e.target.closest('.question__options').children);
      optionsContainer.forEach( option => option.classList.remove('question__option--selected') );
      optionClicked.classList.add('question__option--selected')
    });
  });
}

document.addEventListener('DOMContentLoaded', init)