var highscoreContainer = document.getElementById('highscoreContainer')
var storage = JSON.parse(localStorage.getItem('userScoreLocal'))
var backBtn = document.querySelector('.goBackBtn');
var clearScore = document.querySelector('.clearHighscore');

if (storage === null || storage === []) {
    highscoreContainer.textContent = "No Highscores"

} else  {
    highscoreContainer.textContent = ""
    // for (var i = 0; i < storage.length; i++) {
    //     var p = document.createElement('p')
    //     p.textContent =  'Name: ' + storage[i].name + '------- Score: ' + storage[i].score
    //     highscoreContainer.append(p)
    // }
    var ol = document.createElement('ol');
    highscoreContainer.append(ol);
        for(var i=0;i<storage.length;i++){
            console.log('>>> li loop');
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
    highscoreContainer.textContent = "No Highscores"
})