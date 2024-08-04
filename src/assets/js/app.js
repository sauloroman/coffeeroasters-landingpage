// ########################################
// HTML REFERENCES
// ########################################
const navigation = document.querySelector('.navigation');
const buttonOpenNav = document.querySelector('.header__icon--menu');
const buttonCloseNav = document.querySelector('.header__icon--close');
const questionsContainer = document.querySelector('.questions__container');
const summaryText = document.querySelector('.summary__text');

// ########################################
// VARIABLES
// ########################################

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
      <div class="question__option ${ i === 0 ? 'question__option--selected' : ''}">
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

const displaySummary = function( summary = {} ) {

  summaryText.innerHTML = `
    &quot; I drink my coffee as <span class="summary__text-span">${summary['question-1']}</span>, with a <span class="summary__text-span">${summary['question-2']}</span> type of bean. <span class="summary__text-span">${summary['question-3']}</span> ground ala <span class="summary__text-span">${summary['question-4']}</span>, sent to me <span class="summary__text-span">${summary['question-5']}</span>&quot;
  `;

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

  const questionsAnswers = {}

  await displayQuestions();

  document.querySelectorAll('.question__option--selected').forEach( (selectedOption, i) => {
    questionsAnswers[`question-${i + 1}`] = selectedOption.firstElementChild.textContent;
    displaySummary( questionsAnswers );
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
      const questionClicked = e.target.closest('.question');

      questionsAnswers[`question-${questionClicked.dataset.id}`] = optionClicked.firstElementChild.textContent;

      const optionsContainer = Array.from(e.target.closest('.question__options').children);

      optionsContainer.forEach( option => option.classList.remove('question__option--selected') );

      optionClicked.classList.add('question__option--selected')

      displaySummary( questionsAnswers );
    });
  });
}

document.addEventListener('DOMContentLoaded', init)