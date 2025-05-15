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
  playClickSound();
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
    if (isVoid) document.body.classList.remove("glitch-effect");

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
}

let clickSoundEnabled = false;

function playClickSound() {
  if (!clickSoundEnabled) return;
  const audio = document.getElementById("click-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

let autoClickStarted = false;

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

// 모달 사용 시 필요한 함수 (수동 호출 가능)
function showLoopModal(messages) {
  const modal = document.getElementById("loop-modal");
  const text = document.getElementById("loop-modal-text");
  const nextBtn = document.getElementById("modal-next-btn");

  let i = 0;
  modal.classList.remove("hide");
  text.textContent = messages[i];

  nextBtn.onclick = () => {
    i++;
    if (i < messages.length) {
      text.textContent = messages[i];
    } else {
      modal.classList.add("hide");
      showFinalEnd();
    }
  };
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
