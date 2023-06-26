let buttonColors = ['red', 'blue', 'green', 'yellow'];

let userClickedPattern = [];

let gamePattern = [];

let started = false;
let level = 0;

const handleStart = (event) => {
    if(!started){
        $('#level-title').text('Level ' + level )
        nextSequence()
        started = true
    }
}
$(document).on('keydown', handleStart)
$('.click-start-btn').on('click', handleStart)



$('.btn').on('click', function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length -1)
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if( userClickedPattern.length === gamePattern.length ){
            setTimeout(()=> {
                nextSequence()
            }, 1000)
        }
    } else {
         
        playSound('wrong')
        
        $('h1').text('Game Over, Press Any Key to Restart')
        $('body').addClass('game-over')
        
        setTimeout(() => {
            $('body').removeClass('game-over')           
        },2000)
        startOver()
    }

}

function nextSequence(){

    userClickedPattern = [];

    level++
    $('#level-title').text('Level ' + level )
    
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $('#'+ currentColor).addClass('pressed')
    setTimeout(()=> {
        $('#' + currentColor).removeClass('pressed')
    }, 100)
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;

}






