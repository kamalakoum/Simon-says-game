const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const title = document.querySelector("#level-title");
const audioGreen = document.getElementById('clip1');
const audioRed = document.getElementById('clip2');
const audioYellow = document.getElementById('clip3');
const audioBlue = document.getElementById('clip4');
const audioGameOver = document.getElementById('clip5');

let levelCount = 1;
let canClick = false;
let gameStarted = false;


const getRandomBtn = () => {
    const btns = [green, red, yellow, blue];
    return btns[Math.floor(Math.random() * btns.length)];
};

let sequence = [];
let sequenceToGuess = [];

const flash = (btn) => {
    return new Promise((resolve) => {
        btn.classList.add('pressed');
        if(btn == green){
             audioGreen.play();
        }
        if(btn == red){
             audioRed.play();
        }
        if(btn == yellow){
             audioYellow.play();
        }
        if(btn == blue){
             audioBlue.play();
        }
        setTimeout(() => {
            btn.classList.remove('pressed');
            setTimeout(() => {
                resolve();
            }, 250);
        }, 800);
    });
};

const startFlashing = async () => {
    canClick = false;
    await new Promise(resolve => setTimeout(resolve, 800));
    await flash(sequence[sequence.length - 1]);
    canClick = true;
};

const startGame = () => {
    if (!gameStarted) {
        gameStarted = true;
        title.textContent = `Level ${levelCount}`;
        sequence.push(getRandomBtn());
        sequenceToGuess = [...sequence];
        startFlashing();
    }
};

const handleClick = (btn) => {
    if (!canClick) {
        return; // Ignore user clicks during computer's turn
    }

    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === btn) {
        btn.classList.add('pressed');
        setTimeout(() => {
            btn.classList.remove('pressed');
            if (sequenceToGuess.length === 0) {
                levelCount++;
                title.textContent = `Level ${levelCount}`;
                sequence.push(getRandomBtn());
                sequenceToGuess = [...sequence];
                startFlashing();
            }
        }, 250);
    } else {
        document.body.classList.add('game-over');
        audioGameOver.play();
        setTimeout(() => {
            document.body.classList.remove('game-over');
        }, 1000);
        levelCount = 1;
        title.textContent = "Game Over, Press Any Key to Restart";
        sequence = [];
        gameStarted = false;
        canClick = false;
    }
};

green.addEventListener('click', function () {
    if(!gameStarted){
        startGame();
    } else {
    audioGreen.play();
    handleClick(green);
    }
});

red.addEventListener('click', function () {
    if(!gameStarted){
        startGame();
    } else {
        audioRed.play();
        handleClick(red);
    }
});

yellow.addEventListener('click', function () {
    if(!gameStarted){
        startGame();
    } else {
        audioYellow.play();
        handleClick(yellow);
    }
});

blue.addEventListener('click', function () {
    if(!gameStarted){
        startGame();
    } else {
        audioBlue.play();
        handleClick(blue);
    }
});
