const questions = [
  {
    question: "지구멸망까지 남은 시간은 89초이다.",
    options: [
      { text: "인간이 없는 세계에선?", result: "지구멸망까지 남은 시간은 ∞이다." },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕이다." }
    ]
  },
  {
    question: "지구멸망까지 남은 시간은 ∞이다.",
    options: [
      { text: "인간이 있는 세계에선?", result: "지구멸망까지 남은 시간은 89초이다." },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕이다." }
    ]
  },
  {
    question: "지구멸망까지 남은 시간은 ??이다.",
    options: [
      { text: "인간이 있는 세계에선?", result: "지구멸망까지 남은 시간은 89초이다." },
      { text: "인간이 없는 세계에선?", result: "지구멸망까지 남은 시간은 ∞이다." }
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

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-box").innerHTML = `
    <p id="question">${q.question}</p>
    <div id="options"></div>
  `;

  const optionBox = document.getElementById("options");
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => showResult(opt.result);
    optionBox.appendChild(btn);
  });
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
    btn.onclick = () => showResult(opt.result, true);
    optionBox.appendChild(btn);
  });
}

function showResult(result, isFromEasterEgg = false) {
  const box = document.getElementById("question-box");
  const isVoid = result.includes("void") || result.includes("v͊");

  box.innerHTML = `<p class="${isVoid ? 'glitch' : ''}">${result}</p>`;

  setTimeout(() => {
    count++;

    if (isFromEasterEgg) {
      showingEasterEgg = false;
      current = count % questions.length; // 원래대로 복귀
      loadQuestion();
    } else {
      if (count % 10 === 0) {
        showingEasterEgg = true;
        loadEasterEgg();
      } else {
        current = (current + 1) % questions.length;
        loadQuestion();
      }
    }
  }, 2000);
}

function playBGM() {
  const audio = document.getElementById("bgm");
  if (audio.paused) {
    audio.play();
  }
}

window.onload = loadQuestion;
