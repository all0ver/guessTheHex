const body = document.querySelector("body");
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
body.addEventListener("keypress", (event) => {
  const input = document.querySelectorAll(".guess");
  if (hex.includes(event.key.toUpperCase())) {
    if (letter < 6) {
      input[round].children[letter+1].textContent = event.key.toUpperCase();
      letter += 1;
    }
  }
  if (event.key == "Enter") {
    console.log("enter")
  }
})
}

newGame();
