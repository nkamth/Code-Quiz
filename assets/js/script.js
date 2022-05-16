// Declaring variables that holds the selected HTML elements
var timerEl=document.getElementById('countdown');
var startQuizBtn=document.querySelector('.startQuizBtn');
var info_box= document.querySelector('.quizRules');
var quizQuesDiv=document.querySelector('.quizQuestions');
var optionList = document.querySelector(".optionList");
var inputResultsDiv=document.querySelector('.inputResult');
var nameInitial=document.getElementById("fname");
var scoreH2=document.querySelector('.scoreH2');
var finalScoreH3=document.querySelector('.finalScoreH3');
var quesSection=document.querySelector('.quesSection');
var doneBtn=document.createElement('button');
//Declaring variable that hold the length of the array of objects from questions.js
var question_length=questions.length;

//Declaring few initial count variables
var timeScore;
var timeInterval;
let index=0;
let que_count=0;
let userScore =0;
var timeLeft = 75;

//input initials and store in local database
function inputResults(userScore)
{
  document.getElementById('end-quiz').addEventListener('click', function() {
    var storage = JSON.parse(localStorage.getItem('userScoreLocal'))
    if (storage === null) {
      storage = []
    }
    var user = {
      name: nameInitial.value,
      score: userScore
    }
    storage.push(user)
    localStorage.setItem('userScoreLocal', JSON.stringify(storage))

  })
}
//added event listener to the Done button that will invoke function inputResults()
doneBtn.addEventListener('click',function(){
  quizQuesDiv.remove('ActiveQuestions');
  inputResultsDiv.removeAttribute('class', 'hidden');
  finalScoreH3.textContent="Final Score is : "+timeScore;
  inputResults(timeScore);
  quesSection.append(doneBtn);
})

//creating and setting the attribute for div that displays if the selected option is correct or wrong 
var answerDiv=document.createElement('div');
answerDiv.setAttribute('class','answer');
var lineDraw=document.createElement('hr');

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    que_count++;
    const allOptions = optionList.children.length; //getting all option items
    console.log(">>>user ans is:",userAns);
    console.log(">>>correct ans is:",correcAns);
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        answerDiv.innerHTML="Correct!!";
    }else{
        timeLeft-=10;
        answerDiv.innerHTML="Wrong!!";
    }
    quesSection.append(lineDraw);
    quesSection.append(answerDiv);
  showQuetions();
}

//setting attributes to Done button that will be appended to html file once all the questions are done 
doneBtn.setAttribute('type','button');
doneBtn.setAttribute('class','doneBtn');
doneBtn.innerHTML="Done";
// function showQuestions() is defined for getting questions and options from array
function showQuetions(){
  const que_text = document.querySelector(".questionText");
  if(question_length>0)
  {
      //creating a new span and div tag for question and option and passing the value using array index
      let que_tag = '<span>'+questions[index].question +'</span>';
      let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
      + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
      + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
      + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
      que_text.innerHTML = que_tag; //adding new span tag inside que_tag
      optionList.innerHTML = option_tag; //adding new div tag inside option_tag
      index ++;
      const option = optionList.querySelectorAll(".option");
      // set onclick attribute to all available options
      for(i=0; i < option.length; i++){
        //invoking fnction optionSelected(this) to find which option was clicked by the user
        option[i].setAttribute("onclick", "optionSelected(this)");
      }
      question_length--;

  }else{
    timeScore=timeLeft;
    timerEl.textContent = 'Timer : '+timeLeft;
    clearInterval(timeInterval);
    quesSection.append(doneBtn);
  }
}

//function countdown() is defined to start the timer once the quiz starts and therefore invoke function showQuestions()
function countdown() {
  showQuetions();
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    }
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    }
    else {
    timeScore=timeLeft;
    timerEl.textContent = 'Timer : '+timeLeft;
    clearInterval(timeInterval);
    quesSection.append(doneBtn);
    }
  }, 1000);
}

//Added event listener to start button that invoke the function countdown() for timer
startQuizBtn.addEventListener('click', function(){
    info_box.remove("activeInfo");
    countdown();
});