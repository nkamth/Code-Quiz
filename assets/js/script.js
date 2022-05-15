var timerEl=document.getElementById('countdown');
var startQuizBtn=document.querySelector('.startQuizBtn');
var info_box= document.querySelector('.quizRules');
// var answerDiv=document.querySelector('.answer');
var quizQuesDiv=document.querySelector('.quizQuestions');
var optionList = document.querySelector(".optionList");
var inputResultsDiv=document.querySelector('.inputResult');
var question_length=questions.length;
var nameInitial=document.getElementById("fname");
var scoreH2=document.querySelector('.scoreH2');
var finalScoreH3=document.querySelector('.finalScoreH3');
var quesSection=document.querySelector('.quesSection');
var timeScore;
var timeInterval;
var doneBtn=document.createElement('button');
console.log(">>>question length is",question_length);
let index=0;
let que_count=0;
let userScore =0;
var timeLeft = 75;

doneBtn.addEventListener('click',function(){
  quizQuesDiv.remove('ActiveQuestions');
  inputResultsDiv.removeAttribute('class', 'hidden');
  finalScoreH3.textContent="Final Score is : "+timeScore;
  inputResults(timeScore);
  quesSection.append(doneBtn);
})
//input initials and store in local database
function inputResults(userScore)
{
  document.getElementById('end-quiz').addEventListener('click', function() {
    console.log(">>>check input result function");
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
        //userScore += 1; //upgrading score value with 1
        console.log("Correct Answer");
       // console.log("Your correct answers = " + userScore);
        answerDiv.innerHTML="Correct!!";
    }else{
        console.log("Wrong Answer");
        timeLeft-=10;
        answerDiv.innerHTML="Wrong!!";
    }
    quesSection.append(lineDraw);
    quesSection.append(answerDiv);
  showQuetions();
}
// getting questions and options from array

doneBtn.setAttribute('type','button');
doneBtn.setAttribute('class','doneBtn');
doneBtn.innerHTML="Done";
function showQuetions(){
  console.log(">>> check 1");
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
        console.log(">>> check 2");
        option[i].setAttribute("onclick", "optionSelected(this)");
      }
      question_length--;

  }else{
    
    timeScore=timeLeft;
    console.log(">>>time left",timeScore);
    timerEl.textContent = 'Timer : '+timeLeft;
    clearInterval(timeInterval);
    quesSection.append(doneBtn);
    
  }
}
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
    console.log(">>>time left",timeScore);
    timerEl.textContent = 'Timer : '+timeLeft;
    clearInterval(timeInterval);
    quesSection.append(doneBtn);
    }
  }, 1000);
}


startQuizBtn.addEventListener('click', function(){
    info_box.remove("activeInfo");
    countdown();
});