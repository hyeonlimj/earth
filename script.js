const questions = [
  {
    question: "지구멸망까지 남은 시간은 89초이다.",
    options: [
      { text: "인간이 없는 세계에선?", result: "지구멸망까지 남은 시간은 ∞이다." },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 void이다." }
    ]
  },
  {
    question: "지구멸망까지 남은 시간은 ∞이다.",
    options: [
      { text: "인간이 있는 세계에선?", result: "지구멸망까지 남은 시간은 89초이다." },
      { text: "멸망한 후 세계에선?", result: "지구멸망까지 남은 시간은 void이다." }
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

let current = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;

  const optionBox = document.getElementById("options");
  optionBox.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => showResult(opt.result);
    optionBox.appendChild(btn);
  });
}

function showResult(result) {
  const box = document.getElementById("question-box");
  box.innerHTML = `<p>${result}</p>`;
  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      box.innerHTML = `<p>게임 종료. 당신의 우주는 무엇을 말하고 있는가?</p>`;
    }
  }, 2000);
}

window.onload = loadQuestion;
