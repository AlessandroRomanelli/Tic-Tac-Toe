//Immediately invoked function expression
!function () {
  //Var declaration
  var currentGame = {},
      //Declaring the jquery rappresentation of start and end splash screens
      $start = $("<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><a href='#' id='friend' class='button'>Start a new game</a></header></div>"),
      $end = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" id="retry" class="button">Rematch</a></header></div>'),
      userName = "Player 1",
      opponent = "Player 2";

  //function that checks for winning conditions, takes the players' checked boxes as argument
  function winCondition(playerBoxList) {
    //defining the winning patterns
    var hor1=[1,2,3],               //
        hor2=[4,5,6],               //  1   ||   2  ||   3
        hor3=[7,8,9],               //_______________________
        ver1=[1,4,7],               //
        ver2=[2,5,8],               //  4   ||   5   ||  6
        ver3=[3,6,9],               //_______________________
        diag1=[1,5,9],              //
        diag2=[3,5,7];              //  7   ||   8   ||   9
   //returning true if any of these combinations is achieved
  return  isContained(playerBoxList, hor1)||
          isContained(playerBoxList, hor2)||
          isContained(playerBoxList, hor3)||
          isContained(playerBoxList, ver1)||
          isContained(playerBoxList, ver2)||
          isContained(playerBoxList, ver3)||
          isContained(playerBoxList, diag1)||
          isContained(playerBoxList, diag2)
  }

  //defining a function that checks if an array is fully contained within another one
  //it's dependency for winCondition function
  function isContained(outer, inner) {
      outer.sort();
      inner.sort();
      var i, j;
      for (i=0,j=0; i<outer.length && j<inner.length;) {
          if (outer[i] < inner[j]) {
              ++i;
          } else if (outer[i] == inner[j]) {
              ++i; ++j;
          } else {
              return false;
          }
      }
      return j == inner.length;
  };

  //constructor function for the game
  function GameVsHuman() {
    this.player1score = 0;
    this.player2score = 0;
    this.playerBoxes1 = [];
    this.playerBoxes2 = [];
    this.activePlayer = 1;
    this.isWinner = -1;
    this.moves = 0;
  };

  GameVsHuman.prototype.start = function(userName, opponent) {
    //Adding the scores to the scoreboard
    $("#player1 h1").text(this.player1score);
    $("#player2 h1").text(this.player2score);
    //Adding the names to the scoreboard
    $("#userName").text(userName);
    $("#opponent").text(opponent);
    //Removing previously placed markers
    $(".box").removeClass("box-filled-1 box-filled-2 boxhover1 boxhover2");
    //Removing the previously assigned active classes on a player
    $(".players").removeClass("active");
    $("#finish").removeClass("screen-win-one screen-win-two screen-win-tie");
    //Resets some properties (nobody's won, no boxes have been selected, etc..)
    this.activePlayer = 1;
    this.playerBoxes1 = [];
    this.playerBoxes2 = [];
    this.isWinner = -1;
    this.moves = 0;
    //Select player 1 for start
    $("#player"+this.activePlayer).addClass("active");
  };

  GameVsHuman.prototype.addMarker = function($box) {
    //Variable to check if the clicked box is empty
    var boxEmpty = !($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2"));
    //If it's empty (else do nothing)
    if (boxEmpty) {
      //Add the marker of the active player to the clicked box
      $box.addClass("box-filled-"+this.activePlayer);
      //Add the box index to respective player's boxes
      var boxIndex = $box.index() + 1;
      if (this.activePlayer === 1) {
        this.playerBoxes1.push(boxIndex);
      } else {
        this.playerBoxes2.push(boxIndex);
      };
      //Order the arrays from smallest to greatest
      this.playerBoxes1.sort();
      this.playerBoxes2.sort();
        //Switch player
          //Remove the active class from the current player
          $("#player"+this.activePlayer).removeClass("active");
          this.activePlayer ++;
          //If the activePlayer is player2, return to player1
          if (this.activePlayer > 2) {
            this.activePlayer = 1;
          };
          //Selects the new player with the active class
          $("#player"+this.activePlayer).addClass("active");
      this.moves ++;
    };
  };

  GameVsHuman.prototype.hoverMarker = function($box) {
    var boxEmpty = !($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2"));
    //If the box is empty
    if (boxEmpty) {
      //toggle the hover class, activates on hover, deactivates upon leave
      $box.toggleClass("boxhover"+this.activePlayer);
    };
  };


  GameVsHuman.prototype.checkWinner = function (playerBoxList, playerNumber) {}
    var hasWon = winCondition(playerBoxList);
    //Checks if there is a winner
    if (hasWon) {
          //Assigns victory to the matched player with the valid array
          this.isWinner = playerNumber;
        }
  };

  GameVsHuman.prototype.checkDraw = function () {
    //If there is not a winner yet when the moves are 9
    if (this.isWinner == -1 && this.moves == 9) {
      //It's a draw!
      this.isWinner = 0;
    }
  }

  GameVsHuman.prototype.gameOver = function () {
    //If player one wins
    if (this.isWinner !== -1) {
      if (this.isWinner == 1) {
        //Increase player score by one
        this.player1score ++;
        //Customize end splash screen
        $end.addClass("screen-win-one");
        $("#finish p").text(userName+" Wins");
        //Otherwise if player two wins, do the same
      } else if (this.isWinner == 2) {
        this.player2score ++;
        $end.addClass("screen-win-two");
        $("#finish p").text(opponent+" Wins");
        //Otherwise it's a draw customization
      } else {
        $end.addClass("screen-win-tie");
        $("#finish p").text("It's a draw");
      };
      //Show the end splash screen
      $end.show();
    };
  };

  //Appending them to the body
  $("body").append($end);
  $("body").append($start);
  //Hiding the end splash screen
  $end.hide();

  //When the page is ready
  $(document).ready(function () {
    //Prompt user to insert his name
    userName = prompt("Please insert user name");
    //If name is not valid (empty or too long)
    while (userName.length == 0 || userName.length > 12) {
      userName = prompt ("Please insert a VALID name! (Between 1 and 12 characters long)")
    };
  });

  //When the start button is clicked
  $("#friend").click(function () {
    //Ask for opponent's name
    opponent = prompt("Insert your friend's name");
    //Validation
    while (opponent.length == 0 || opponent.length > 12) {
      opponent = prompt ("Please insert a VALID name! (Between 1 and 12 characters long)");
    };
    //Fade the start splash screen out
    $start.fadeOut();
    //Generated a new instance of GameVSHuman
    currentGame = new GameVsHuman();
    currentGame.start(userName, opponent);
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
    //Checks both player for winning conditions or draw
    currentGame.checkWinner(currentGame.playerBoxes1, 1);
    currentGame.checkWinner(currentGame.playerBoxes2, 2);
    currentGame.checkDraw();
    //If a condition is met, gameOver activates
    currentGame.gameOver();
  });

  //When rematch is clicked
  $("#retry").click(function () {
    //Fade out the end splash screen
    $end.fadeOut();
    //Restart the game
    currentGame.start();
  });
}();
