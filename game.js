/** This game was made by following the instructions of
 the MDN GameDev docs */

// https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Move_the_ball



// storing a reference to the canvas 
var canvas = document.getElementById("myCanvas");

// stores all 2d rendering
var ctx = canvas.getContext("2d");


//Color of the ball
var color = "#0095DD";



// Technically, we will be painting the ball on the screen, clearing it and then painting it again in a slightly 
// different position every frame to make the impression of movement — just like how movement works with the movies.

/** DEFINING A DRAWING LOOP */


// You can run a function over and over again using 
// a JavaScript timing function such as setInterval() 
// or requestAnimationFrame().

// define a starting point at the bottom center part of the Canvas:
var x = canvas.width/2;
var y = canvas.height-30;
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

/** COLLISION DETECTION */
 // ball bouncing off top edge
// If the y value of the ball is lower than zero, change the direction of the y axis by setting it = to itself.. reversed.
 // If the ball was moving upwards with a speed of 2px/fm, set to moving down by 2px (-2)
 if(y + dy < ballRadius)  // calcs collision point of wall and ball's radius
 {                        // prevents ball from going halfway into the wall
   dy = -dy;
   color = randomColor();
 }
 //ball bouncing off bottom edge
 if(y + dy > canvas.height - ballRadius){
  dy = -dy;
  color = randomColor();

 }

// ballRadius replaces 0
if(x + dx < ballRadius || x+dx > canvas.width - ballRadius){
  dx = -dx;
  color = randomColor();

}
  // update x and y with our dx and dy variable on every frame
  x += dx;
  y += dy;
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


setInterval(draw, 10);  //calls draw() every 10ms

function randomColor()
{
var randomOne = Math.floor(Math.random() * 355) + 50;
var randomTwo = Math.floor(Math.random() * 355) + 50;
var randomThree = Math.floor(Math.random() * 355) + 50;

var color = "rgb("+randomOne+","+randomTwo+","+randomThree+")";

return color;
}





