const questions = [
  {
    question: "There are 89 seconds left until Earth's destruction.",
    options: [
      { text: "In a world without humans?", result: "Time left until Earth's destruction: ∞", next: 1 },
      { text: "In the world after the end?", result: "Time left until Earth's destruction: v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕", next: 2 }
    ]
  },
  {
    question: "Time left until Earth's destruction: ∞",
    options: [
      { text: "In a world with humans?", result: "Time left until Earth's destruction: 89 seconds.", next: 0 },
      { text: "In the world after the end?", result: "Time left until Earth's destruction: v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕", next: 2 }
    ]
  },
  {
    question: "Time left until Earth's destruction: ??",
    options: [
      { text: "In a world with humans?", result: "Time left until Earth's destruction: 89 seconds.", next: 0 },
      { text: "In a world without humans?", result: "Time left until Earth's destruction: ∞", next: 1 }
    ]
  }
];

const easterEgg = {
  question: "Is this truly the end?",
  options: [
    { text: "Repetition is eternal.", result: "You exist within the cycle." },
    { text: "It’s all just coincidence.", result: "No enlightenment lies here." }
  ]
};

let current = 0;
let count = 0;
let showingEasterEgg = false;
let displayCount = 89;
let direction = -1;
let isCounting = false;

function updateTimerDisplay(text) {
  const display = document.getElementById('count-display');
  if (!display) return;

  if (text.includes("89초")) {
    display.style.visibility = "visible";
    displayCount = 89;
    direction = -1;
    isCounting = true;
  } else if (text.includes("??")) {
    display.textContent = "00:00:??";
    display.style.visibility = "visible";
    isCounting = false;
  } else if (text.includes("void") || text.includes("v͊")) {
    display.textContent = "v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕";
    display.style.visibility = "visible";
    isCounting = false;
  } else {
    display.style.visibility = "hidden";
    isCounting = false;
  }
}

function toggleCounter() {
  const display = document.getElementById('count-display');
  if (!display || !isCounting) return;
  display.textContent = `00:00:${displayCount}`;
  displayCount += direction;
  if (displayCount <= 88 || displayCount >= 89) {
    direction *= -1;
  }
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-box").innerHTML = `
    <p id="question">${q.question}</p>
    <div id="options"></div>
  `;
  updateTimerDisplay(q.question);

  const optionBox = document.getElementById("options");
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleSelection(opt);
    optionBox.appendChild(btn);
  });
}

function handleSelection(selectedOption) {
  const nextQuestionIndex = selectedOption.next;
  const resultText = selectedOption.result;
  showResult(resultText, nextQuestionIndex);
}

function loadEasterEgg() {
  const q = easterEgg;
  document.getElementById("question-box").innerHTML = `
    <p id="question">${q.question}</p>
    <div id="options"></div>
  `;
  const optionBox = document.getElementById("options");
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => showResult(opt.result, 0, true);
    optionBox.appendChild(btn);
  });
}

function showResult(result, nextIndex, isFromEasterEgg = false) {
  const box = document.getElementById("question-box");
  const isVoid = result.includes("void") || result.includes("v͊");

  // ✅ glitch 효과를 정확히 void에만 적용
  let displayText = result;
  if (isVoid) {
    displayText = result.replace(/(v͊.*?d̎[^ ]*)/gi, '<span class="glitch" data-text="$1">$1</span>');
  }

  box.innerHTML = `<p>${displayText}</p>`;
  updateTimerDisplay(result);

  if (isVoid) {
    document.body.classList.add("glitch-effect");
  }

  const delayTime = isFromEasterEgg ? 4000 : 2000;

  setTimeout(() => {
    if (isVoid) {
      document.body.classList.remove("glitch-effect");
    }

    count++;

    if (count === 15) showMidMessage("Has the Earth ever questioned what humans are?");
    if (count === 25) showMidMessage("Still, humans see the Earth as something they cannot live without.");
    if (count === 30) showMidMessage("But have they ever truly seen the Earth for what it is?");

    if (isFromEasterEgg) {
      showingEasterEgg = false;
      current = nextIndex;
      loadQuestion();
    } else {
      if (count % 10 === 0) {
        showingEasterEgg = true;
        loadEasterEgg();
      } else {
        current = nextIndex;
        loadQuestion();
      }
    }
  }, delayTime);
}



// ✅ 중간 메시지 함수는 함수 바깥에 위치해야 함
function showMidMessage(message) {
  const msgBox = document.getElementById("mid-message");
  msgBox.textContent = message;
  msgBox.style.opacity = "1";

  setTimeout(() => {
    msgBox.style.opacity = "0";
  }, 3000);
}

setInterval(toggleCounter, 1000);
window.onload = loadQuestion;
