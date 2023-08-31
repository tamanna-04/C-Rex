
//board
let board;
let boardWidth = 750;
let boardHeight = 500;
let boardMid = 250;
let context;

//dino
let dinoWidth = 70;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardMid - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
    isDucking: false
}

//dino duck
let DdinoWidth = 116;
let DdinoHeight = 60;
let DdinoX = dinoX;
let DdinoY = boardMid - DdinoHeight;
let DdinoImg;

let Ddino = {
    x: DdinoX,
    y: DdinoY,
    width: DdinoWidth,
    height: DdinoHeight,
    isDucking: true
}
//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardMid - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


// bird
let birdArray = [];

let bird1Width = 65;
let bird1Height = 65;

let bird2Width = 93;
let bird2Height = 62;

let birdX = 700;
let bird1Y = boardMid - dinoHeight;
let bird2Y = boardMid - dinoHeight - 40;

let bird1Img;
let bird2Img;



//physics
let velocityX = -8; //cactus moving left speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    //dino
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    //Ddino
    DdinoImg = new Image();
    DdinoImg.src = "./img/dino-duck2.png";

    //cactus
    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    //bird
    bird1Img = new Image();
    bird1Img.src = "./img/bird1.png";

    bird2Img = new Image();
    bird2Img.src = "./img/bird2.png";

    requestAnimationFrame(update);

    setInterval(placeObstacle, 1000);
    document.addEventListener("keydown", jumpDino);
    document.addEventListener("keydown", dino2Ddino);
    document.addEventListener("keyup", Ddino2dino);

}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //dino jump mecanics
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground


    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //baseline
    context.fillStyle = "black";
    context.fillRect(0, 250, boardWidth, 2);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function () {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    // bird
    for (let i = 0; i < birdArray.length; i++) {
        let bird = birdArray[i];
        bird.x += velocityX;

        context.drawImage(bird.img, bird.x, bird.y);

        if (detectCollision(dino, bird)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function () {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function jumpDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        //update jump mechanics to jump
        velocityY = -10;
    }
}

function dino2Ddino(e) {
    if (gameOver) {
        return;
    }
    if (e.code == "KeyC" && dino.y == dinoY && !dino.isDucking) {
        dinoImg = DdinoImg;
        dino.height = Ddino.height;
        dino.width = Ddino.width;
        dinoY = DdinoY;
        dino.isDucking = true;
    }
}

function Ddino2dino(e) {
    if (e.code == "KeyC" && Ddino.y == DdinoY && dino.isDucking) {
        if (gameOver) {
            DdinoImg = dinoImg;
            Ddino.height = dino.height;
            Ddino.width = dino.width;
            DdinoY = dinoY;
            return;
        }
        DdinoImg = dinoImg;
        DdinoHeight = dinoHeight;
        Ddino.width = dino.width;
        DdinoY = dinoY;
        dino.isDucking = false;
    }
}

function placeObstacle() {
    if (gameOver) {
        return;
    }

    const placeObstacleChance = Math.random();

    // Place cacti obstacles
    if (placeObstacleChance < 0.5) { // 50% chance for cacti
        const cactusOptions = [
            { img: cactus1Img, width: cactus1Width },
            { img: cactus2Img, width: cactus2Width },
            { img: cactus3Img, width: cactus3Width }
        ];

        const selectedCactus = cactusOptions[Math.floor(Math.random() * cactusOptions.length)];

        cactusArray.push({
            img: selectedCactus.img,
            x: cactusX,
            y: cactusY,
            width: selectedCactus.width,
            height: cactusHeight
        });

        if (cactusArray.length > 10) {
            cactusArray.shift();
        }
    }

    // Place bird obstacles
    if (placeObstacleChance > 0.5 && cactusArray.length < 5) { // 50% chance if fewer cacti
        const birdOptions = [
            { img: bird1Img, y: bird1Y, width: bird1Width, height: bird1Height },
            { img: bird2Img, y: bird2Y, width: bird2Width, height: bird2Height }
        ];

        const selectedBird = birdOptions[Math.floor(Math.random() * birdOptions.length)];

        birdArray.push({
            img: selectedBird.img,
            x: birdX,
            y: selectedBird.y,
            width: selectedBird.width,
            height: selectedBird.height
        });

        if (birdArray.length > 5) {
            birdArray.shift();
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}