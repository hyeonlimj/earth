const questions = [
  {
    question: "지구멸망까지 남은 시간은 89초이다.",
    options: [
      { text: "인간이 없는 세계에선?", result: "지구멸망까지 남은 시간은 ∞이다.", next: 1 },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 void이다.", next: 2 }
    ]
  },
  {
    question: "지구멸망까지 남은 시간은 ∞이다.",
    options: [
      { text: "인간이 있는 세계에선?", result: "지구멸망까지 남은 시간은 89초이다.", next: 0 },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 void이다.", next: 2 }
    ]
  },
  {
    question: "지구멸망까지 남은 시간은 ??이다.",
    options: [
      { text: "인간이 있는 세계에선?", result: "지구멸망까지 남은 시간은 89초이다.", next: 0 },
      { text: "인간이 없는 세계에선?", result: "지구멸망까지 남은 시간은 ∞이다.", next: 1 }
    ]
  }
];

const easterEgg = {
  question: "이것이 정말 끝이 맞을까요?",
  options: [
    { text: "반복은 영원이야", result: "당신은 순환 속에 있습니다." },
    { text: "모든 건 우연일 뿐", result: "깨달음은 여기에 없습니다." }
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
    // ✅ 이스터에그 후 다시 0번 질문으로 돌아가도록 지정
    btn.textContent = opt.text;
    btn.onclick = () => showResult(opt.result, 0, true);
    optionBox.appendChild(btn);
  });
}


function showResult(result, nextIndex, isFromEasterEgg = false) {
  const box = document.getElementById("question-box");
  const isVoid = result.includes("void") || result.includes("v͊");
  box.innerHTML = `<p class="${isVoid ? 'glitch' : ''}">${result}</p>`;
  updateTimerDisplay(result);

  setTimeout(() => {
    count++;
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
  }, 1500);
}

setInterval(toggleCounter, 1000);
window.onload = loadQuestion;
