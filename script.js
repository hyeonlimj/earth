/***** 데이터 *****/
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

/***** 상태 *****/
let current = 0;
let count = 0;
let showingEasterEgg = false;
let displayCount = 89;
let direction = -1;
let isCounting = false;
let autoClickStarted = false;
let clickSoundEnabled = false;

/***** 유틸 *****/
function $(sel) {
  return document.querySelector(sel);
}

/***** 타이머 표시 업데이트 *****/
function updateTimerDisplay(text) {
  const display = $("#count-display");
  if (!display) return;

  const hasVoid = text.includes("void") || text.includes("v͊");
  const hasUnknown = text.includes("??");
  const has89sec = /89\s*seconds|89초/i.test(text);

  if (has89sec) {
    display.style.visibility = "visible";
    displayCount = 89;
    direction = -1;
    isCounting = true;
  } else if (hasUnknown) {
    display.textContent = "00:00:??";
    display.style.visibility = "visible";
    isCounting = false;
  } else if (hasVoid) {
    display.textContent =
      "v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕";
    display.style.visibility = "visible";
    isCounting = false;
  } else {
    display.style.visibility = "hidden";
    isCounting = false;
  }
}

/***** 1초마다 깜빡이는 카운터 *****/
function toggleCounter() {
  const display = $("#count-display");
  if (!display || !isCounting) return;

  display.textContent = `00:00:${String(displayCount).padStart(2, "0")}`;
  displayCount += direction;

  // 89 ↔ 88 사이 왕복
  if (displayCount <= 88 || displayCount >= 89) {
    direction *= -1;
  }
}

/***** 옵션 선택 *****/
function handleSelection(selectedOption) {
  playClickSound();
  const nextQuestionIndex = selectedOption.next;
  const resultText = selectedOption.result;
  showResult(resultText, nextQuestionIndex);
}

/***** 질문 로드 *****/
function loadQuestion() {
  const q = questions[current];
  $("#question-box").innerHTML = `
    <div id="count-display">${$("#count-display")?.textContent || "00:00:89"}</div>
    <p id="question">${q.question}</p>
    <div id="options"></div>
  `;
  updateTimerDisplay(q.question);

  const optionBox = $("#options");
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleSelection(opt);
    optionBox.appendChild(btn);
  });
}

/***** 이스터에그 로드 *****/
function loadEasterEgg() {
  const q = easterEgg;
  $("#question-box").innerHTML = `
    <div id="count-display">${$("#count-display")?.textContent || "00:00:89"}</div>
    <p id="question">${q.question}</p>
    <div id="options"></div>
  `;
  const optionBox = $("#options");

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => showResult(opt.result, 0, true);
    optionBox.appendChild(btn);
  });
}

/***** 결과 표시 후 다음 진행 *****/
function showResult(result, nextIndex, isFromEasterEgg = false) {
  const box = $("#question-box");
  const isVoid = result.includes("void") || result.includes("v͊");

  let displayText = result;
  if (isVoid) {
    // 결과 문자열 일부를 글리치 스팬으로 감싸기
    displayText = result.replace(
      /(v͊.*?d̎[^ ]*)/gi,
      '<span class="glitch" data-text="$1">$1</span>'
    );
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

    if (count === 10) showMidMessage("Has the Earth ever questioned what humans are?");
    if (count === 15) showMidMessage("Still, humans see the Earth as something they cannot live without.");
    if (count === 19) showMidMessage("But have they ever truly seen the Earth for what it is?");

    if (count >= 20 && !autoClickStarted) {
      autoClickStarted = true;
      triggerAutomatedMode();
    }

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

/***** 클릭 사운드 *****/
function playClickSound() {
  if (!clickSoundEnabled) return;
  const audio = $("#click-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

/***** 자동 모드 진입 *****/
function triggerAutomatedMode() {
  const blackout = $("#blackout");
  blackout.classList.remove("hide");
  $("#bgm").pause();
  clickSoundEnabled = true;

  setTimeout(() => {
    blackout.classList.add("hide");
    document.body.classList.add("shrinked-view");
    // 축소 후 중앙정렬
    $("#question-box").classList.add("centered");
    autoClickLoop();
  }, 2000);
}

/***** 자동 클릭 루프 *****/
function autoClickLoop() {
  if (count >= 100) return;

  const options = document.querySelectorAll("#options button");
  if (options.length === 0) {
    setTimeout(autoClickLoop, 500);
    return;
  }

  const randomIndex = Math.floor(Math.random() * options.length);
  playClickSound();
  options[randomIndex].click();

  // 자동 클릭 간격 (기본 4000ms)
  setTimeout(autoClickLoop, 4000);
}

/***** 중간 메시지 *****/
function showMidMessage(message) {
  const msgBox = $("#mid-message");
  msgBox.textContent = message;
  msgBox.style.opacity = "1";
  setTimeout(() => {
    msgBox.style.opacity = "0";
  }, 3000);
}

/***** 초기화 *****/
setInterval(toggleCounter, 1000);
window.onload = loadQuestion;
