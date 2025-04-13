
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

const easterEgg = {
  question: "당신은 이 반복을 몇 번이나 경험했습니까?",
  options: [
    { text: "기억나지 않아", result: "그럼에도 다시 돌아왔군요." },
    { text: "무한히 반복 중", result: "모든 것은 순환한다." }
  ]
};

let current = 0;
let loopCount = 0;

function loadQuestion() {
  const q = (loopCount > 0 && loopCount % 5 === 0) ? easterEgg : questions[current];
  document.getElementById("question").textContent = q.question;

  const optionBox = document.getElementById("options");
  optionBox.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      showResult(opt.result);
    };
    optionBox.appendChild(btn);
  });
}

function showResult(result) {
  const box = document.getElementById("question-box");
  box.innerHTML = `<p>${result}</p>`;

  setTimeout(() => {
    loopCount++;
    current = (current + 1) % questions.length;  // 순환
    loadQuestion();
  }, 2000); // 2초 후 다음 질문
}

window.onload = loadQuestion;
