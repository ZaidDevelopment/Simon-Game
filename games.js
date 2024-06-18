var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//start game by pressing a key
$(document).on("keypress", function () {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//animate and play sound when user clicks
//build user click pattern
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkResults();
});

//next sequence in game
function nextSequence() {
  //reset userClickedPattern for next level
  userClickedPattern = [];
  //increase the level by 1
  level++;
  //update the value of level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash chosen colour
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //play sound for chosen colour
  playSound(randomChosenColour);
}

//check game results
function checkResults() {
  for (i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      gameOver();
    }
  }
  if (
    gamePattern.length == userClickedPattern.length &&
    JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern) &&
    started
  ) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

//play sound for chosen colour
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//animate button when clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//GAME OVER
function gameOver() {
  $("#level-title").html("Game Over. Press any key to restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}
