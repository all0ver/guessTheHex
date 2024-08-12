const body = document.querySelector("body");
const input = document.querySelectorAll(".guess");
console.log(input);
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
body.addEventListener("keypress", (event) => {
  if (hex.includes(event.key.toUpperCase())) {
    if (letter < 6) {
      input[round].children[letter+1].textContent = event.key.toUpperCase();
      playerAnswer += event.key.toUpperCase();
      letter += 1;
    }
  } 
  console.log(round)
 if (event.key == "Enter" && round == 5 && letter == 6) {
    console.log("You lost!");
    console.log("The answer was"+answer);
  } else if (event.key == "Enter" && letter == 6) {
    if (answer == playerAnswer) {
      console.log("You won!");
    } else {
      console.log("next round!");
      round += 1;
      letter = 0;
    } 
  }})
}

newGame();
