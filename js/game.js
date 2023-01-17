let userSequence = [];
let gameSequece = [];
let gameStarted = false;
const options = {
  green: 0,
  red: 1,
  yellow: 2,
  blue: 3,
};
const optionNames = Object.keys(options);
const sounds = {
  green: new Audio("sounds/green.mp3"),
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  var userChoice = $(this).attr("id");
  playSound(userChoice);
  animateClick(userChoice);
  addUserSequence(userChoice);
  compareSequences(userSequence, gameSequece);
});

function playSound(id) {
  sounds[id].play();
}

function animateClick(key) {
  $(`.${key}`).addClass("pressed", 300);
  setTimeout(() => {
    $(`.${key}`).removeClass("pressed");
  }, 100);
}

function addUserSequence(key) {
  userSequence.push(options[key]);
}

function compareSequences(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      gameOver();
      return;
    }
  }
  if (userSequence.length === gameSequece.length) {
    nextSequence();
    userSequence = [];
  }
}

function gameAnimation(key) {
  $(`.${key}`).fadeOut("fast").fadeIn("fast");
}

function nextSequence() {
  var randomColor = Math.floor(Math.random() * 4);
  gameSequece.push(randomColor);
  $("#level-title").text(`Level ${gameSequece.length}`);

  setTimeout(() => {
    playSound(optionNames[randomColor]);
    gameAnimation(optionNames[randomColor]);
  }, 800);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");

  playSound("wrong");

  gameSequece = [];
  userSequence = [];
  gameStarted = false;
}
