const body = document.querySelector("body");
const input = document.querySelectorAll(".guess");
const colorDiv = document.querySelector(".color");
const hex = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];

function randomHex() {
  let color = "#";
 for (let i = 0; i < 6; i++) {
  color += hex[Math.floor(Math.random()*16)];
 } 
  console.log(color);
  return color;
}

function newGame() {
let answer = randomHex();
colorDiv.style.background = answer;
let round = 0;
let letter = 0; 
let playerAnswer = "#";
body.addEventListener("keydown", (event) => {
  if (event.key == "Backspace" || event.key == "Delete") {
    if (letter >= 1) {
      input[round].children[letter].textContent = "";
      letter -= 1;
      playerAnswer = playerAnswer.slice(0, -1);
    }
  }
  if (hex.includes(event.key.toUpperCase())) {
    if (letter < 6) {
      input[round].children[letter+1].textContent = event.key.toUpperCase();
      playerAnswer += event.key.toUpperCase();
      letter += 1;
    }
  } 
  
  if (event.key == "Enter" && letter == 6) {
    if (answer == playerAnswer) {
      for (let i = 0; i < 6; i++) {
        if (answer[i+1] == playerAnswer[i+1]) {
          input[round].children[i+1].style.background = "green";
        }
      }
      console.log("You won!");
    } else {
      if (round == 5) {
        console.log("You lost!");
      } else {
        for (let i = 0; i < 6; i++) {
          if (answer.includes(playerAnswer[i+1])) {
            input[round].children[i+1].style.background = "#dd8000";
          }
          if (answer[i+1] == playerAnswer[i+1]) {
            input[round].children[i+1].style.background = "green";
          }
        }
        playerAnswer = "#";
        round += 1;
        letter = 0;
      }
    }
  }
})
}

newGame();
