// DECLARATIONS: 
//board
let board;
let boardWidth = 750;
let boardHeight = 500;      // 250
let boardMid = 250;
let context;

//dino
let dinoWidth = 70;   //88
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardMid - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight,
    isDucking : false               //////
}

//dino duck
let DdinoWidth = 116;
let DdinoHeight = 60;
let DdinoX = dinoX;
let DdinoY = boardMid - DdinoHeight;
let DdinoImg;

let Ddino = {
    x : DdinoX,
    y : DdinoY,
    width : DdinoWidth,
    height : DdinoHeight,
    isDucking : true           //////////
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

let bird1Width = 65;    //85
let bird1Height = 65;

let bird2Width = 93;
let bird2Height = 62;

let birdX = 700; 
let bird1Y = boardMid - dinoHeight;        
let bird2Y = boardMid - dinoHeight-40;

let bird1Img;
let bird2Img;



//physics
let velocityX = -8; //cactus moving left speed                //increase with score
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
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
    dinoImg.onload = function() {
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
    setInterval(placeObstacle, 1000);                           // obstacles
    document.addEventListener("keydown", moveDino);

}
///////                              !!!!!!!!!!!!! UPDATE FUNCTION !!!!!!!!!!!!!!!!!!!
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground

    
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    if (dino.isDucking) {
        dino.img = DdinoImg; 
        dino.height = Ddino.height; 
    } else {
        dino.img = dinoImg; 
        dino.height = dinoHeight; 
    }

    //dino box
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);
    
    // if(document.addEventListener("keydown")) {
    //     context.drawImage(DdinoImg, DdinoX, DdinoY, DdinoWidth, DdinoHeight);
    // }
    //baseline
    context.fillStyle="black";
    context.fillRect(0, 250, boardWidth, 2);


    // if( code == "b" && dino.y == dinoY) {
    //     dinoImg = context.drawImage(DdinoImg, Ddino.x, Ddino.y, Ddino.width, Ddino.height); 
    // }
    

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function() {
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
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //score
    context.fillStyle="black";
    context.font="20px courier";
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
    else if (e.code == "KeyC    " && dino.y == dinoY) {
        //duck
        dino.isDucking = true;
    }
}

function stopDucking() {
    if(gameOver) {
        return;
    }
    dino.isDucking = false;
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


function placeObstacle0() {
    if(gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    let placeObstacleChance = Math.random(); //0 - 0.9999...                         // cactus placement 

    if (placeObstacleChance > .90) { //10% you get cactus3   20
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeObstacleChance > .70) { //30% you get cactus2    
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeObstacleChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 10) {
        cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }

    //place bird
    let bird = {
        img : null,
        x : birdX,
        y : null,
        width : null,
        height : null
    }

    if(placeObstacleChance > .30 && !cactusArray.length) {
        bird.img = bird2Img;
        bird.y = bird2Y;
        bird.width = bird2Width;
        bird.height = bird2Height;
        birdArray.push(bird);
    }
    else if(placeObstacleChance > .30 && !cactusArray.length) {
        bird.img = bird1Img;
        bird.y = bird1Y;
        bird.width = bird1Width;
        bird.height = bird1Height;
        birdArray.push(bird);
    }

    if(birdArray.length > 5) {
        birdArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}












//Controls flip
//Connection
//inverted merging
//mathematics
///INVERTED GAME

//board
//Flip dino
let FdinoWidth = dinoWidth;
let FdinoHeight = dinoHeight;
let FdinoX = dinoX;
let FdinoY = boardMid;
let FdinoImg;

let Fdino = {
     x: FdinoX,
     y: FdinoY,
     width: FdinoWidth,
     height: FdinoHeight
}

//cactus
let FcactusArray = [];

let Fcactus1Width = cactus1Width;
let Fcactus2Width = cactus2Width;
let Fcactus3Width = cactus3Width;

let FcactusHeight = cactusHeight;
let FcactusX = cactusX;

let FcactusY = boardMid;
let Fcactus1Img;
let Fcactus2Img;
let Fcactus3Img;

window.onload = function () {
    //  board = document.getElementById("board");
    //  board.height = boardHeight;
    //  board.width = boardWidth;

    //  context = board.getContext("2d");

     FdinoImg = new Image();
     FdinoImg.src = "./img_inverted/dino.png";
     FdinoImg.onload = function () {
          context.drawImage(FdinoImg, Fdino.x, Fdino.y, Fdino.width, Fdino.height);
     }

     Fcactus1Img = new Image();
     Fcactus1Img.src = "./img_inverted/cactus1.png";

     Fcactus2Img = new Image();
     Fcactus2Img.src = "./img_inverted/cactus2.png";

     Fcactus3Img = new Image();
     Fcactus3Img.src = "./img_inverted/cactus3.png";

     requestAnimationFrame(update);
     setInterval(placeCactus, 1000);
     document.addEventListener("keyup", moveDino);
     if (onKeyDown) {
          moveDino();
     }
}
setInterval(flip, 10000);
function flip() {
    
}



function update() {
     requestAnimationFrame(update);
     if (gameOver) {
          return;
     }
     context.clearRect(0, 0, board.width, board.height);

     //dino
     velocityY += gravity;
     dino.y = Math.max(dino.y - velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
     context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

     //baseline
     context.fillStyle="black";
     context.fillRect(0, 250, boardWidth, 2);

     //cactus
     for (let i = 0; i < cactusArray.length; i++) {
          let cactus = cactusArray[i];
          cactus.x += velocityX;
          context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

          if (detectCollision(dino, cactus)) {
               gameOver = true;
               FdinoImg.src = "./img_inverted/dino-dead.png";
               FdinoImg.onload = function () {
                    context.drawImage(FdinoImg, Fdino.x, Fdino.y, Fdino.width, Fdino.height);
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
          velocityY = -10; //-10
     }
}

function placeCactus() {
     if (gameOver) {
          return;
     }

     //place cactus
     let cactus = {
          img: null,
          x: FcactusX,
          y: FcactusY,
          width: null,
          height: FcactusHeight
     }

     let placeFCactusChance = Math.random(); //0 - 0.9999...       

     if (placeFCactusChance > .90) { //10% you get cactus3
          cactus.img = cactus3Img;
          cactus.width = cactus3Width;
          cactusArray.push(cactus);
     }
     else if (placeFCactusChance > .70) { //30% you get cactus2
          cactus.img = cactus2Img;
          cactus.width = cactus2Width;
          cactusArray.push(cactus);
     }
     else if (placeFCactusChance > .50) { //50% you get cactus1
          cactus.img = cactus1Img;
          cactus.width = cactus1Width;
          cactusArray.push(cactus);
     }

     if (FcactusArray.length > 5) {
          FcactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
     }
}

function detectCollision(a, b) {
     return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
          a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
          a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
          a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}