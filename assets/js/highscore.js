// Declaring variables that holds the selected HTML elements from highscore.html
var highscoreContainer = document.getElementById('highscoreContainer');
var backBtn = document.querySelector('.goBackBtn');
var clearScore = document.querySelector('.clearHighscore');
//getting the data from local storage and assigning to a variable
var storage = JSON.parse(localStorage.getItem('userScoreLocal'));

if (storage === null || storage === []) {
    highscoreContainer.textContent = "No Highscores";

} else  {
    highscoreContainer.textContent = "";
    //creating and appending the ol and li tags to display the results retrieved from local storage
    var ol = document.createElement('ol');
    highscoreContainer.append(ol);
        for(var i=0;i<storage.length;i++){
            var li = document.createElement('li');
            li.textContent = storage[i].name + '-'+ storage[i].score;
            ol.append(li);
        }
}
//added event listener to Back button that will load the index.html page
backBtn.addEventListener('click',function(){
    window.location.href='index.html';
})
//added event listener to clear highscore button that will clear the local storage
clearScore.addEventListener('click',function(){
    localStorage.clear();
    highscoreContainer.textContent = "No Highscores";
})