const bird = document.querySelector(".angryBird");
const pause = document.querySelector(".feature div:nth-of-type(2)");
const play = document.querySelector(".feature div:nth-of-type(1)")
const tree=document.querySelector(".moving-object");
const score = document.querySelector("#score");
const highestScore = document.querySelector("#highest_score")
const congrats = document.querySelector(".congrats");

const playAnime = () => {
    tree.style.animationPlayState = 'running';
    console.log("clicked");
}

play.addEventListener("click", playAnime);
pause.addEventListener("click", () => {
    tree.style.animationPlayState = 'paused';
})

const body = document.body;
body.addEventListener("keypress", (e) => {
    console.log(e);
    if (e.key === " ") {
        bird.classList.add('spaceBar')
    }
})
bird.addEventListener('animationend', () => {
    bird.classList.remove('spaceBar');
});

console.log(document.body.getBoundingClientRect())  // Responsiveness

let min = -1;
let intervalId = setInterval(checkOverlap, 100);
let intervalId1 = setInterval(scoreIncrease, 2020);
let sum = 0;

function scoreIncrease() {
    if (sum > min) {
        min = sum;
        highestScore.textContent = `Highest Score : ${min}`;
    }

    if (!checkOverlap() && tree.style.animationPlayState === 'paused') {
        score.textContent = `Score : ${sum}`;
        sum += 0;
    }
    else if (!checkOverlap()) {
        score.textContent = `Score : ${sum}`;
        sum += 5;
    }
    else {
        sum = 0;
        score.textContent = `Score : ${sum}`;
        congrats.style.backgroundColor = "red";
        setTimeout(() => {
            congrats.style.backgroundColor = "transparent";
        }, 1000);
    }

}

function isOverlap() {
    const rect1 = tree.getBoundingClientRect();
    const rect2 = bird.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function checkOverlap() {
    if (isOverlap(bird, tree)) {
        tree.style.animationPlayState = 'paused';
        return 1;
    }
}
