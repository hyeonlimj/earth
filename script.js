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

function handleSelection(selectedOption) {
  playClickSound(); // 클릭 사운드 재생
  const nextQuestionIndex = selectedOption.next;
  const resultText = selectedOption.result;
  showResult(resultText, nextQuestionIndex);
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

    if (count === 10) showMidMessage("Has the Earth ever questioned what humans are?");
    if (count === 15) showMidMessage("Still, humans see the Earth as something they cannot live without.");
    if (count === 18) showMidMessage("But have they ever truly seen the Earth for what it is?");

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
} // ✅ 이 중괄호가 빠져 있었음!!


let clickSoundEnabled = false;

function playClickSound() {
  if (!clickSoundEnabled) return;
  const audio = document.getElementById("click-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

let autoClickInterval;

function triggerAutomatedMode() {
  const blackout = document.getElementById('blackout');
  blackout.classList.remove('hide');

  document.getElementById('bgm').pause();
  clickSoundEnabled = true;

  setTimeout(() => {
    blackout.classList.add('hide');
    document.body.classList.add('shrinked-view');

    // 💡 여기서 중앙 정렬 클래스 추가
    document.getElementById('question-box').classList.add('centered');

    autoClickLoop(); // 자동 클릭 시작
  }, 2000);
}

let autoClickStarted = false;
let loopTriggered = false;

function autoClickLoop() {
  if (count >= 100) return;

  // 🔥 트리거 타이밍: 35번째에만 자동 커서 & 메시지
  if (count === 35 && !loopTriggered) {
    loopTriggered = true;

    // 트리거 요소를 보여주고 커서 이동
    document.getElementById("trigger-area").style.display = "block";
    autoTriggerLoopMessage();

    return; // 자동 클릭 멈춤
  }

  const options = document.querySelectorAll('#options button');
  if (options.length === 0) {
    setTimeout(autoClickLoop, 500);
    return;
  }

  const randomIndex = Math.floor(Math.random() * options.length);
  playClickSound();
  options[randomIndex].click();

  setTimeout(autoClickLoop, 4000);
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

function autoTriggerLoopMessage() {
  const trigger = document.getElementById('trigger-area');
  const cursor = document.getElementById('fake-cursor');
  if (!trigger || !cursor) return;

  // 트리거 위치 계산
  const rect = trigger.getBoundingClientRect();
  const targetX = rect.left + rect.width / 2;
  const targetY = rect.top + rect.height / 2;

  // 커서 이동
  cursor.style.left = `${targetX}px`;
  cursor.style.top = `${targetY}px`;
  cursor.style.opacity = "1";

  // 클릭처럼 연출 후 사라짐
  setTimeout(() => {
    trigger.click();
    cursor.style.opacity = "0"; // 클릭 후 커서 사라짐
  }, 2000);
}

document.getElementById("trigger-area").addEventListener("click", () => {
  showLoopMessages([
    "We arrived, uninvited.",
    "We hold on, pretending it’s ours.",
    "We walk on its skin, but never meet its gaze.",
    "Just a breath in time.",
    "It waits, patient and whole."
  ]);
});

function showLoopMessages(messages) {
  const loopBox = document.getElementById("loop-message");
  const text = document.getElementById("loop-text");
  let i = 0;

  loopBox.classList.remove("hide");

  function nextLine() {
    if (i >= messages.length) {
      setTimeout(() => {
        loopBox.classList.add("hide");
        showFinalEnd(); // 종료 연출
      }, 3000);
      return;
    }

    text.textContent = messages[i];
    text.style.opacity = "1";

    setTimeout(() => {
      text.style.opacity = "0";
      i++;
      setTimeout(nextLine, 1000);
    }, 4000);
  }

  nextLine();
}

function showFinalEnd() {
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: black;
      color: white;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 9999;">
      The cycle ends here.
    </div>
  `;
}
