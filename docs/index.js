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


let activeGameListener; 

function newGame() {
  let answer = randomHex();
  colorDiv.style.background = answer;
  let round = 0;
  let letter = 0; 
  let playerAnswer = "#";

  if (activeGameListener) {
    body.removeEventListener("keydown", activeGameListener);
  }

  function handleKeyPress(event) {
    if (event.key == "Backspace" || event.key == "Delete") {
      if (letter >= 1) {
        input[round].children[letter].textContent = "";
        letter -= 1;
        playerAnswer = playerAnswer.slice(0, -1);
      }
    }
    if (hex.includes(event.key.toUpperCase())) {
      if (letter < 6) {
        input[round].children[letter + 1].textContent = event.key.toUpperCase();
        playerAnswer += event.key.toUpperCase();
        letter += 1;
      }
    } 
    
    if (event.key == "Enter" && letter == 6) {
      if (answer == playerAnswer) {
        check(answer, playerAnswer, round);
        end("You won!", answer);
      } else {
        if (round == 5) {
          end("You lost!", answer);
          check(answer, playerAnswer, round);
        } else {
          check(answer, playerAnswer, round);
          round += 1;
          letter = 0;
          playerAnswer = "#";
        }
      }
    }
  }

  activeGameListener = handleKeyPress;

  body.addEventListener("keydown", activeGameListener);
}

function end(state, answer) {
  const mainDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const mainDivClasses = ['absolute','h-screen','w-screen','flex','justify-center','items-center','top-0'];
  const contentDivClasses = ['w-1/2','h-96','bg-zinc-700','flex', 'flex-col','justify-center','items-center','rounded-xl'];
  const h1Classes = ['text-4xl','font-bold'];
  const buttonClasses = ['px-8','py-4','bg-blue-500', 'rounded'];
  addManyClasses(mainDivClasses,mainDiv);
  addManyClasses(contentDivClasses,contentDiv);
  addManyClasses(h1Classes,h1);
  addManyClasses(buttonClasses,button);
  p.classList.add("p-4")
  mainDiv.appendChild(contentDiv);
  contentDiv.appendChild(h1);
  contentDiv.appendChild(p);
  contentDiv.appendChild(button);
  h1.textContent = state;
  p.textContent = "The answer was: "+answer;
  button.textContent = "Play again";
  button.addEventListener("click",() => {
    mainDiv.remove();
    clear();
    newGame();    
  })

  body.appendChild(mainDiv);
}

function clear() {
  for (let i = 0; i < 6;i++) {
    for (let j = 1; j <= 6; j++) {
      input[i].children[j].textContent = "";
      input[i].children[j].style.background = "#27272a";
    }
  }
}

function addManyClasses(classes, element) {
  classes.forEach(className => {
    element.classList.add(className)
  });
}

function check(answer, playerAnswer, round) { 
  for (let i = 0; i < 6; i++) {
          if (answer.includes(playerAnswer[i+1])) {
            input[round].children[i+1].style.background = "#dd8000";
          }
          if (answer[i+1] == playerAnswer[i+1]) {
            input[round].children[i+1].style.background = "green";
          }
          let repeat = 0;
          for (let j = 0; j < 6; j++) {
            if (playerAnswer[i+1] == answer[j+1]) {
              repeat += 1;
            }
           }
          switch (repeat) {
            case 2:
              input[round].children[i+1].style.color = "#F03366"; 
              break;
            case 3:
              input[round].children[i+1].style.color = "#8A2BE2"; 
              break;
            case 4:
              input[round].children[i+1].style.color = "F0F418"; 
              break;
            default:
              break;
          }
        }
}
newGame();
