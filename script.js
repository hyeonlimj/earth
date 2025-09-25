const questions = [
  {
    question: "There are 89 seconds left until Earth's destruction.",
    options: [
      { text: "In a world without humans?", result: "Time left until Earth's destruction: ∞", next: 1 },
      { text: "In the world after the end?", result: "Time left until Earth's destruction: v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕", next: 2 }
    ]
  },
  {
    question: "Time left until Earth's destruction: ∞",
    options: [
      { text: "In a world with humans?", result: "Time left until Earth's destruction: 89 seconds.", next: 0 },
      { text: "In the world after the end?", result: "Time left until Earth's destruction: v̵̬͉̬̟̣̩͔͊͗̋̊̇̇̚̚͟ơ̧̭̱̤̟͖̭͎͛͂̍̀͢í̴̧̫̥͙̬̀́̐̾͋̿͑̄̅͢͢d̸̼̙̣͍̪̟̣͉̼̎́̑͌͗͆̓̕", next: 2 }
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

  if (text.includes("89")) {
    display.style.visibility = "visible";
    displayCount = 89;
    direction = -1;
    isCounting = true;
  } else if (text.includes("??")) {
    display.textContent = "??:??:??";
    display.style.visibility = "visible";
    isCounting = false;
  } else if (text.includes("∞")) {
    display.textContent = "∞";
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

  // ?? 상태면 카운트하지 않음
  if (display.textContent.includes("??")) return;

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

    document.getElementById('question-box').classList.add('centered');

    autoClickLoop();
  }, 2000);
}

function autoClickLoop() {
  if (count >= 100) return;

  // 🔥 20번째 이후 암전 + 타이머 멈춤
  if (count >= 20) {
    const blackout = document.getElementById('blackout');
    const timer = document.getElementById('count-display');

    // 암전 켜기
    blackout.classList.remove('hide');


    // 타이머 00:00:00으로 세팅하고 깜빡임 멈춤
    timer.textContent = "00:00:00";
    isCounting = false;

    setTimeout(() => {
      blackout.classList.add('hide');      // 암전 해제
      timer.style.visibility = "visible"; // 타이머 다시 표시
      // 필요한 경우 displayCount도 0으로 초기화
      displayCount = 0;
      direction = 1;
    }, 2000); // 2초 후 암전 해제

    return; // 자동 클릭 중단
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
