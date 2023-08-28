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
let duckingDinoWidth = 116;
let duckingDinoHeight = 60;
let duckingDinoX = dinoX;
let duckingDinoY = boardHeight - duckingDinoHeight;
let duckingDinoImg;

let duckingDino = {
     x: duckingDinoX,
     y: duckingDinoY,
     width: duckingDinoWidth,
     height: duckingDinoHeight
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

function moveDino(e) {
     if (gameOver) {
          return;
     }

     if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
          //jump
          velocityY = -10;
     }
     else if (e.code == "ArrowDown" && dino.y == dinoY) {
          //duck                                                                        
          // duck motion 
     }
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
     // context.drawImage(duckingDinoImg, duckingDinoX, duckingDinoY, duckingDinoWidth, duckingDinoHeight);


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

          if (detectCollision(duckingDino, bird)) {
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
































