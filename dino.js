



//board
let board;
let boardWidth = 750;
let boardHeight = 250;      // 250
// let boardMid = 250;
let context;

//dino
let dinoWidth = 70;   //88
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

//dino duck
let DdinoWidth = 116;
let DdinoHeight = 60;
let DdinoX = dinoX;
let DdinoY = boardHeight - DdinoHeight;
let DdinoImg;

let Ddino = {
    x: DdinoX,
    y: DdinoY,
    width: DdinoWidth,
    height: DdinoHeight
}

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


// bird
let birdArray = [];

let bird1Width = 65;    //85
let bird1Height = 65;

let bird2Width = 93;
let bird2Height = 62;

let birdX = 700;
let bird1Y = boardHeight - dinoHeight;
let bird2Y = boardHeight - dinoHeight - 40;

let bird1Img;
let bird2Img;



//physics
let velocityX = -8; //cactus moving left speed    //increase with score
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    //draw initial dinosaur
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);


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
    setInterval(placeObstacle, 1000);                           // cactus placement
    document.addEventListener("keydown", moveDino);

    // add keydown to duck
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground

    /////////////////////////
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    // context.drawImage(DdinoImg, DdinoX, DdinoY, DdinoWidth, DdinoHeight);


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

        if (detectCollision(Ddino, bird)) {
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



function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        //jump
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && dino.y == dinoY) {
        //duck                                                                        // duck motion 
    }
}

function placeObstacle() {
    if (gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }

    //place bird
    let bird = {
        img: null,
        x: birdX,
        y: null,
        width: null,
        height: null
    }
    let placeObstacleChance = Math.random(); //0 - 0.9999...                         // cactus placement 

    if (.80 > placeObstacleChance > .90) { //10% you get cactus3   20
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (.50 > placeObstacleChance > .70) { //30% you get cactus2    
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (.10 > placeObstacleChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }
    else if (0.10 > placeObstacleChance > 0.40) {
        bird.img = bird2Img;
        bird.y = bird2Y;
        bird.width = bird2Width;
        bird.height = bird2Height;
        birdArray.push(bird);
    }
    else if (0.90 > placeObstacleChance > .80) {
        bird.img = bird1Img;
        bird.y = bird1Y;
        bird.width = bird1Width;
        bird.height = bird1Height;
        birdArray.push(bird);
    }

    if (cactusArray.length > 10) {
        cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
    if (birdArray.length > 5) {
        birdArray.shift();
    }
}

// function placeCactus() {
//     if (gameOver) {
//         return;
//     }

//     //place cactus
//     let cactus = {
//         img : null,
//         x : cactusX,
//         y : cactusY,
//         width : null,
//         height: cactusHeight
//     }

//     let placeCactusChance = Math.random(); //0 - 0.9999...                         // cactus placement 

//     if (placeCactusChance > .90) { //10% you get cactus3   20
//         cactus.img = cactus3Img;
//         cactus.width = cactus3Width;
//         cactusArray.push(cactus);
//     }
//     else if (placeCactusChance > .70) { //30% you get cactus2    
//         cactus.img = cactus2Img;
//         cactus.width = cactus2Width;
//         cactusArray.push(cactus);
//     }
//     else if (placeCactusChance > .50) { //50% you get cactus1
//         cactus.img = cactus1Img;
//         cactus.width = cactus1Width;
//         cactusArray.push(cactus);
//     }

//     if (cactusArray.length > 10) {
//         cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
//     }
// }

// // place bird

// function placeBird()
// {
//     if(gameOver)
//     {
//         return;
//     }

//     //place bird
//     let bird = {
//         img : null,
//         x : birdX,
//         y : null,
//         width : null,
//         height : null
//     }

//     let placeBirdChance = Math.random();

//     if(placeBirdChance > .70) {
//         bird.img = bird2Img;
//         bird.y = bird2Y;
//         bird.width = bird2Width;
//         bird.height = bird2Height;
//         birdArray.push(bird);
//     }
//     else if(placeBirdChance > .30) {
//         bird.img = bird1Img;
//         bird.y = bird1Y;
//         bird.width = bird1Width;
//         bird.height = bird1Height;
//         birdArray.push(bird);
//     }

//     if(birdArray.length > 5) {
//         birdArray.shift();
//     }
// }

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
        a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}