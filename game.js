/** This game was made by following the instructions of
 the MDN GameDev docs */

// https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Move_the_ball

// storing a reference to the canvas 
var canvas = document.getElementById("myCanvas");
var audio = document.getElementById("audio");

// stores all 2d rendering
var ctx = canvas.getContext("2d");

canvas.style.background = "url('images/8BitBeach.jpg') 480px 490px";

//Color of the ball
var color = "#0095DD";

/** Defining a paddle to hit the ball */

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
console.log(paddleX);

/** PADLLE CONTROLS */

var rightPressed = false;
var leftPressed = false;

var ballSpeed = 10;

/** BRICK VARIABLES */

var brickRowCount = 3;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 75;

/** Holds all the bricks in a 2-d array
  each brick will create an object with x/y coords */

// Loops thru the rows and columns and create new bricks
var bricks = [];

for(c = 0; c < brickColumnCount;c++){
  bricks[c] = [];

  for(r = 0; r < brickRowCount; r++){
    bricks[c][r] = {x: 0, y:0, status: 1}; // status --> aids in bricks dissapearing
  } // if status = 0, don't repaint this brick
}

/** SCORE */

var score = 0;

var lives = 3;





// Technically, we will be painting the ball on the screen, clearing it and then painting it again in a slightly 
// different position every frame to make the impression of movement — just like how movement works with the movies.

/** DEFINING A DRAWING LOOP */


// You can run a function over and over again using 
// a JavaScript timing function such as setInterval() 
// or requestAnimationFrame().

// define a starting point at the bottom center part of the Canvas:
var x = canvas.width/2;
var y = canvas.height-30;
console.log("Height:" + canvas.height);


 // add a small value to x and y after every frame has been drawn to make it appear that the ball is moving.
var dx = -1;
var dy = -2;

var ballRadius = 10;

function draw()
{
    /** MAKING IT MOVE */
    // Clears the screen
    // 4 params: x/y of bottom right corners of a rect. --> whole area will be cleared of any content painted
    ctx.clearRect(0,0, canvas.width, canvas.height);
   
   drawBall();
   drawBricks();
   drawPaddle();
   drawScore();
   drawLives();

  /** COLLISION DETECTION */
   // ball bouncing off top edge
  // If the y value of the ball is lower than zero, change the direction of the y axis by setting it = to itself.. reversed.
   // If the ball was moving upwards with a speed of 2px/fm, set to moving down by 2px (-2)
   if(y + dy < ballRadius)  // calcs collision point of wall and ball's radius
   {                        // prevents ball from going halfway into the wall
     dy = -dy;
     color = randomColor();
   }

   /** GAME OVER */

   //ball bouncing off bottom edge
   else if(y+ballRadius > canvas.height-ballRadius)
   {
      if(x > paddleX && x < paddleX + paddleWidth)
      {
        audio.setAttribute("src","sound/paddle.wav"); //plays fx for paddle-hit
        audio.play();
        dy = -dy;
        ballSpeed--;
        console.log(ballSpeed);
      }
      else
     {
        lives--;
        if(!lives)
        {
          audio.setAttribute("src","sound/lose.wav"); //plays fx for paddle-hit
          audio.play();
          setInterval(alert("GAME OVER"),500);
          
          //document.location.reload();
        }
        else
        {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width-paddleWidth)/2;
        }
     }
   }

  // ballRadius replaces 0
  if(x + dx < ballRadius || x+dx > canvas.width - ballRadius){
    dx = -dx;
    color = randomColor();

  }
    // update x and y with our dx and dy variable on every frame
    x += dx;
    y += dy;
  
  /** PADDLE MOVING LOGIC */

  if(rightPressed && paddleX < canvas.width-paddleWidth)
  {
    paddleX += 7; // 7px to right
  }
  else if(leftPressed && paddleX > 0)
  {
    paddleX -= 7;  // moves 7 pixels to the left 
  }
  
  //Detects if ball hits a brick
  collisionDetection();


  requestAnimationFrame(draw); //replaces setInterval(draw,10) outside of the function
  /**
  Instead of the fixed 10ms frame rate, framerate is det. by browser.  It will sync the 
  framerate accordingly and render the shapes only when needed.  
  Produces a more efficient/smoother animation loop than setInterval */
}

function drawBall()
{
   // drawing code
  ctx.beginPath();
  //why the Math.PI * 2???
  ctx.arc(x,y,ballRadius,0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle()
{
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function drawBricks()
{
  for(c = 0; c < brickColumnCount; c++)
  {
    for(r=0; r < brickRowCount; r++)
    {
      if(bricks[c][r].status == 1) //checks to see if brick hasn't been hit (1), rewrite
      {
        // Calculation to set x/y coords for each brick (so they won't stack on eachother)
        var brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth,brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath(); 
      }
    }
  }
}

// to gen colors for ball hits
function randomColor()
{
var randomOne = Math.floor(Math.random() * 355) + 50;
var randomTwo = Math.floor(Math.random() * 355) + 50;
var randomThree = Math.floor(Math.random() * 355) + 50;

var color = "rgb("+randomOne+","+randomTwo+","+randomThree+")";

return color;
}

draw();

//setInterval(draw, ballSpeed);  //calls draw() every 10ms

document.addEventListener("mousemove", mouseMoveHandler, false);

// Adding mouse functionality
function mouseMoveHandler(e)
{
  // e.clientX --> Horizonal mouse position
  // canvas.offsetLeft --> dist b/w left edge of canvas and left edge of viewport
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width)
  {
    paddleX = relativeX - paddleWidth/2;
  }
}
/** Allow user to control paddle */

//Add event listeners for the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// when the keys are pressed, set to true
function keyDownHandler(e)
{
  if(e.keyCode == 39)  // keyCode 39 is the right cursor
  {
    rightPressed = true;
  }
  else if(e.keyCode == 37)  // keycode 37 is left
  {
    leftPressed = true;
  }
}

///when key is released, set to false
function keyUpHandler(e)  // e --> event
{
  if(e.keyCode == 39)
  {
    rightPressed = false;
  }
  else if(e.keyCode == 37)
  {
    leftPressed = false;
  }
}

/*
For the center of the ball to be inside the brick, all four of the following statements need to be true:

The x position of the ball is greater than the x position of the brick.
The x position of the ball is lesser than the x position of the brick minus its width.
The y position of the ball is greater than the y position of the brick.
The y position of the ball is less than the y position of the brick minus its width.
*/

function collisionDetection()
{
  for(c=0; c < brickColumnCount; c++)
  {
    for(r = 0; r < brickRowCount; r++)
    {
      var b = bricks[c][r];
      if(b.status == 1)
      {
        // x--> current pos. of ball
        // x + ballRadius > b.x compares right side of ball w/ left side of box
        // x - ballRadius < b.x + brickWidth compares right side of ball w/ right side of box
        // y + ballRadius > b.y compares bottom of ball with top side of box
        // y - ballRadius < b.y + brickHeight compares top of ball, bottom of box
        if(x + ballRadius > b.x && x - ballRadius < b.x +brickWidth && y + ballRadius > b.y && y - ballRadius < b.y + brickHeight)
        {
          audio.setAttribute("src","sound/hit.wav"); //plays fx for paddle-hit
          audio.play();
          dy = -dy; //change dir of ball
          b.status = 0;  // mark as a hit
          score++;

          // Checks for a win
          if(score == brickRowCount * brickColumnCount)
          {
            audio.setAttribute("src","sound/success.wav"); //plays fx for paddle-hit
            audio.play();
            alert("YOU WIN!!!!");
            document.location.reload(); // reloads page and starts game again once alert button is clicked
          }
        } 
      }
    }
  }
}


function drawScore()
{
  ctx.font = "16px Arial"; // sets size and font type
  ctx.fillStyle = "#0095DD"; // color of text
  ctx.fillText("Score: " + score, 8, 20);  //.fillText(text, coordX,coordY)
}

function drawLives()
{
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}



