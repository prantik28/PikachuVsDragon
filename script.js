score = 0;
cross = true; 

let audio = new Audio('./music.mp3');
audio.preload = "auto";
audio.volume = 0.5;

let audiogo = new Audio('./gameover.mp3');
audiogo.preload = "auto";

document.addEventListener('click', () => {
    audio.play();
});

document.addEventListener('keydown', () => {
    audio.play();
});

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e){
    console.log("Key code is: ", e.keyCode)
    if(e.keyCode==32){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() =>{
            console.log("yes")
            dino.classList.remove('animateDino')
        }, 700);
    }

    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 150 + "px";
        }
        
    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 140) + "px";
        }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));


    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    console.log(offsetX, offsetY)

    if(offsetX< 100 && offsetY< 52){
        gameOver.innerHTML = "Game Over - Reload to play again";
        gameOver.style.display = 'block';
        document.getElementById('restartBtn').style.display = 'block';
        obstacle.classList.remove('obstacleAni')
        audiogo.play();

        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000)

    }

    else if(offsetX< 145 && cross){
        score+=1;
        updateScore(score);
        cross = false;

        setTimeout(() =>{
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
        
            // ✅ Only update duration if it's not too fast
            if (newDur >= 1.5) {
                obstacle.style.animationDuration = newDur + 's';
        
                // ✅ Avoid re-adding the class; just update duration mid-run
                console.log('New animation duration:', newDur);
            }
        }, 500);
        
}
}, 10);

function updateScore(score){
    document.getElementById('scoreCont').innerHTML = "Your Score: " + score;
}

function restartGame() {
    // Reset score
    score = 0;
    updateScore(score);

    // Reset positions
    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');
    dino.style.left = '25px';
    obstacle.classList.add('obstacleAni');
    obstacle.style.left = '52vw';

    // Hide game over text and restart button
    document.querySelector('.gameOver').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';

    // Resume music
    audio.currentTime = 0;
    audio.play();
}

