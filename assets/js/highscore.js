var highscoreContainer = document.getElementById('highscoreContainer');
var storage = JSON.parse(localStorage.getItem('userScoreLocal'));
var backBtn = document.querySelector('.goBackBtn');
var clearScore = document.querySelector('.clearHighscore');

if (storage === null || storage === []) {
    highscoreContainer.textContent = "No Highscores";

} else  {
    highscoreContainer.textContent = "";
    var ol = document.createElement('ol');
    highscoreContainer.append(ol);
        for(var i=0;i<storage.length;i++){
            var li = document.createElement('li');
            li.textContent = storage[i].name + '-'+ storage[i].score;
            ol.append(li);
        }
}
backBtn.addEventListener('click',function(){
    window.location.href='index.html';
})
clearScore.addEventListener('click',function(){
    localStorage.clear();
    highscoreContainer.textContent = "No Highscores";
})