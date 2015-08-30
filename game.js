


// storing a reference to the canvas 
var canvas = document.getElementById("myCanvas");

// stores all 2d rendering
var ctx = canvas.getContext("2d");

//this example prints a red square on the canvas


// All the instructions are between the beginPath() and closePath() methods.
ctx.beginPath();

// .rect = method for creating rectangles.
// -- first 2 values specify the x/y coordinates for the top left corner of the triangle.
// -- 2nd 2 values specify width/height. 
ctx.rect(20,40,50,50);  //20 px from left and 40 pixels from top of the screen. 50x50
ctx.fillStyle = "#FF0000";  //stores a color that will be used by fill()
ctx.fill();  //paints the square
ctx.closePath();


//prints out a circle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//We can use stroke() to only colour the outer stroke.

ctx.beginPath();
ctx.rect(160,10,100,40);
//using the rgb color value gives a transparent alpha channel
// vs. using just "blue" -- which is solid.
ctx.strokeStyle = "rgba(0,0,255,0.5)";
ctx.stroke();
ctx.closePath();