
const store = {
  questions: [
  {
    question: "The rain in Spain stays mainly in the ____",
    answers: [
      'grain',
     'frame',
      'plane',
      'plain'
    ],
    correctAnswer: 'plane'
  },

  {
  question: "Who’s that hiding in the treetops? It’s that ____ the jitterbug!",
    answers: [
      'rascal',
      'bug',
      'gangster',
      'uncle'
    ],
    correctAnswer: 'rascal'
  },

 {
  question: "Everything’s coming up ___ for me and for ____",
    answers: [
      'roses, you',
      'roses, Stew',
      'flowers, Lou',
      'sunshine, you'
    ],
    correctAnswer: 'roses, you'
  },

  {
  question: "How do you solve a problem like ____ ",
    answers: [
      'Sophia',
      'Maria',
      'Anita',
     'Florida'
    ],
    correctAnswer: 'Maria'
  },

  {
  question: "So if you care defy me, look to the _____",
    answers: [
      'House of Pies',
      'orange flies',
      'western sky',
      'country road'
    ],
    correctAnswer: 'western sky'
  },

  {
  question: "Why so silent, ____? Did you think that I had left you for good?",
    answers: [
      'good messieurs',
      'des fleurs',
      'gentlemen',
      'dear old friends'
    ],
    correctAnswer: 'good messieurs'
  }, 
],
  questionNumber: 0,
  score: 0
};
  
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

/* These functions handle events (submit, click, etc) */


function renderQuiz(){
  //render quiz on the DOM
  console.log('renderQuiz ran');
  startScreen();
  //populateQuestion();
  submitButton();
  nextButton();

}

function startScreen(){
  console.log('start screen rendered');//displays welcome message and button
  $('h2').append('Test your knowledge of Musical Theatre Songs!');
  $(".form").append('<div><button type="button" id="start-btn" tabindex="5">Start!</button></div>');
  $('form').on('click', '#start-btn', event =>{
    $(".form").empty(); //empty current question and answer
    $("h2").empty();
    populateQuestion();
  })
  
}
 
function populateQuestion(){ 
  //populate new questions
  console.log('populateQuestion');
  $('.currentScore').append('Score: ' + store.score + '/6'); //show current score
  $('.questionNum').append('Question Number: '+ (store.questionNumber +1)
  + '/6'); //current question Number
  $('h2').append(store.questions[store.questionNumber].question); //display current question
  //store.questionNumber ++
  //console.log(store.questionNumber)
  for( let i=0; i<store.questions[store.questionNumber].answers.length; i++){ //runs loop on array making radio buttons
    $(".form").append('<input type="radio" name="options" value="' + store.questions[store.questionNumber].answers[i] + '"required><label for="' + store.questions[store.questionNumber].answers[i] +'">' + store.questions[store.questionNumber].answers[i] +'</label><br>');  
  }
  $(".form").append('<input type="submit" id="submit-answer-btn" tabindex="5"></button>');
  console.log('for loop complete');
}

function submitButton(){
  $('section').on('submit', '.form', event =>{
    event.preventDefault(); //when submit is clicked 
    console.log('submit button clicked'); //check to see if submit was pressed
    //var checked = $("input:checked").val();
    //console.log(checked);
    //if($("input").not(":checked") {
    var correct = "Correct!" //create variable with correct/incorrect message
    
    if($("input:checked").val()=== store.questions[store.questionNumber].correctAnswer){ //if answer is correct, increase score by 1 and update correct statment to relflect answer
      store.score++;
      console.log('Correct!') ;
      correct ="Your Answer Was Correct!"
    }

    else{ //if answer is incorrect, update correct var to tell user they were wrong and what the correct answer should have been
      console.log('Incorrect');
      correct = "Your Answer Was Incorrect! The correct answer was: <br><i>" +store.questions[store.questionNumber].correctAnswer + "</i>" ;
    }
    $('h3').empty();//emptys question and scores
    $(".form").empty(); //empty current question and answer
    $("h2").empty();
    store.questionNumber++; //increase store.questionNumber by 1
    $('h2').append(correct);
    $(".form").append('<button type="button" id="next-btn" tabindex="6">Next Question</button>') //make the next button visible
    
  });
} 

function nextButton(){
  $('.form').on('click', '#next-btn', event =>{ //when next is clicked 
    console.log('next button clicked');
    console.log('question number is: ' + (store.questionNumber + 1));
    console.log('length of array: ' + store.questions.length);
   $(".form").empty(); //empty current question and answer
    $("h2").empty();
    
  if ((store.questionNumber + 1) > store.questions.length){
     endScreen();
  }
  else{
    populateQuestion(); //run populateQuestion function to get next question
  }
  }); //updates score
}
function renderEndScreen(){
  endScreen();
  restartQuiz();
}
function endScreen(){
  //displays the final score and a restart button
  console.log('end screen');
  $('h4').append("Congratulations! You've finished the Quiz!");
  $('.score').append("Your Final Score Was: <br><b>" + store.score +"/6</b>");
  $('.form').append('<button type="button" id="restart">Restart Quiz</button>'); 

  $(".form").on('click', '#restart', event => // when restart is clicked, the page is refreshed and the quiz starts over
  { console.log('restart button clicked');
      location.reload();
  });
}


$(renderQuiz);