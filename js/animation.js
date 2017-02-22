//Declaring the splash screen-start
var $start = $("<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><a href='#' class='button'>Start game</a></header></div>");
var $end = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>');
//Appending it to the body
$("body").append($end);
$("body").append($start);
$end.hide();
var currentGame = new Game();

//When the start button is clicked
$("#start .button").click(function () {
  //Fade the start splash screen out
  $start.fadeOut();
  currentGame.start();
});

//When the mouse hovers a box
$(".box").hover(function () {
  //Call the hoverIn method
    currentGame.hoverMarker($(this))
  });


//When the mouse clicks a box
$(".box").click(function () {
  //Call the addMarker method on the clicked box
  currentGame.addMarker($(this));
  currentGame.checkWinner(currentGame.playerBoxes1, 1);
  currentGame.checkWinner(currentGame.playerBoxes2, 2);
  currentGame.checkDraw();
  currentGame.gameOver();
});

$("#finish .button").click(function () {
  $end.fadeOut();
  currentGame.start();
})
