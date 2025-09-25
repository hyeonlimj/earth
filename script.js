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
let timerLocked = false; 

/***** 유틸 *****/
function $(sel) {
  return document.querySelector(sel);
}

/***** 타이머 표시 업데이트 *****/
function updateTimerDisplay(text) {
  const display = $("#count-display");
  if (!display) return;

  // ✅ 잠금이 최우선
  if (timerLocked) {
    display.style.visibility = "visible";
    display.textContent = "00:00:00";
    isCounting = false;
    return;
  }

  const hasUnknown = text.includes("??");
  if (hasUnknown) {
    display.textContent = "??:??:??";
    display.style.visibility = "visible";
    isCounting = false; // 카운터 완전 정지
    return;
  }

  const hasVoid = text.includes("void") || text.includes("v͊");
  const has89sec = /89\s*seconds|89초/i.test(text);

  if (has89sec) {
    display.style.visibility = "visible";
    displayCount = 89;
    direction = -1;
    isCounting = true;
  } else if (hasVoid) {
    display.textContent = "v͊͗̋̊̇̇̚̚...";
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
  if (!display || !isCounting || timerLocked) return; // ✅ 잠금 시 아무 것도 안 함

  display.textContent = `00:00:${String(displayCount).padStart(2, "0")}`;
  displayCount += direction;
  if (displayCount <= 88 || displayCount >= 89) direction *= -1;
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

  // 카운터는 그대로 두고, 질문/옵션만 교체
  $("#question-box").innerHTML = `
    <div id="count-display">${$("#count-display")?.textContent || ""}</div>
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
    <div id="count-display">${$("#count-display")?.textContent || ""}</div>
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

function triggerAutomatedMode() {
  const blackout = document.getElementById('blackout');
  const stage = document.getElementById('stage');
  const dim = document.getElementById('dim');

  blackout.classList.remove('hide');
  document.getElementById('bgm').pause();
  clickSoundEnabled = true;

  setTimeout(() => {
    blackout.classList.add('hide');
    dim.classList.remove('hide');
    stage.classList.add('shrink');

    // ✅ 여기서 타이머 끝(00:00:00)으로 고정
    const display = document.getElementById('count-display');
    if (display) {
      display.style.visibility = 'visible';
      display.textContent = '00:00:00';
    }
    isCounting = false;   // 카운터 멈춤
    timerLocked = true;   // 이후 어떤 로직도 타이머를 바꾸지 못하게 잠금

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
