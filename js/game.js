function Game() {
  this.player1score = 0;
  this.player2score = 0;
  this.playerBoxes1 = [];
  this.playerBoxes2 = [];
  this.activePlayer = 1;
  this.isWinner = -1;
  this.moves = 0;
}

Game.prototype.start = function() {
  $end = $("#finish");
  $(".box").removeClass("box-filled-1 box-filled-2 boxhover1 boxhover2");
  this.activePlayer = 1;
  this.playerBoxes1 = [];
  this.playerBoxes2 = [];
  this.isWinner = -1;
  this.moves = 0;
  $("#player"+this.activePlayer).addClass("active");
  $("#finish").removeClass("screen-win-one screen-win-two screen-win-tie");
};

Game.prototype.addMarker = function($box) {
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

Game.prototype.hoverMarker = function($box) {
  var boxEmpty = !($box.hasClass("box-filled-1") || $box.hasClass("box-filled-2"));
  if (boxEmpty) {
    $box.toggleClass("boxhover"+this.activePlayer);
  };
};

Game.prototype.checkWinner = function (playerBoxList, playerNumber) {
  var hasWon = winCondition(playerBoxList);
  if (hasWon) {
        this.isWinner = playerNumber;
      }
};

Game.prototype.checkDraw = function () {
  if (this.isWinner == -1 && this.moves == 9) {
    this.isWinner = 0;
  }
}

Game.prototype.gameOver = function () {
  if (this.isWinner !== -1) {
    if (this.isWinner == 1) {
      $end.addClass("screen-win-one");
      $("#finish p").text("Player 1 Wins");
    } else if (this.isWinner == 2) {
      $end.addClass("screen-win-two");
      $("#finish p").text("Player 2 Wins");
    } else {
      $end.addClass("screen-win-tie");
      $("#finish p").text("It's a draw");
    };
    $end.show();
  };
};

function winCondition(playerBoxList) {
  var hor1=[1,2,3],
      hor2=[4,5,6],
      hor3=[7,8,9],
      ver1=[1,4,7],
      ver2=[2,5,8],
      ver3=[3,6,9],
      diag1=[1,5,9],
      diag2=[3,5,7];
  return  isContained(playerBoxList, hor1)||
          isContained(playerBoxList, hor2)||
          isContained(playerBoxList, hor3)||
          isContained(playerBoxList, ver1)||
          isContained(playerBoxList, ver2)||
          isContained(playerBoxList, ver3)||
          isContained(playerBoxList, diag1)||
          isContained(playerBoxList, diag2)
}

function isContained(sup, sub) {
    sup.sort();
    sub.sort();
    var i, j;
    for (i=0,j=0; i<sup.length && j<sub.length;) {
        if (sup[i] < sub[j]) {
            ++i;
        } else if (sup[i] == sub[j]) {
            ++i; ++j;
        } else {
            return false;
        }
    }
    return j == sub.length;
}
