class GameManager {
  constructor() {
    this.currentIsland = null;
    this.currentLevel = 1;
    this.currentExerciseIndex = 0;
    this.currentExercises = [];
    this.score = 0;
    this.unlockedLevels = this.loadProgress();

    this.timer = {
      interval: null,
      timeLeft: 0,
      timeLimit: 0,
      isPaused: false,
      element: null,
      secondsElement: null,
    };

    this.feedbackSystem = new FeedbackSystem();
    this.informacoesSystem = new InformacoesSystem(this);
    this.modalSystem = new ModalSystem(this);
    this.currentExerciseSystem = null;

    this.screenManager = new ScreenManager(this);

    this.init();
  }

  init() {
    this.setupGameEventListeners();

    setTimeout(() => {
      if (this.screenManager.getCurrentScreen() !== "start-screen") {
        this.screenManager.showScreen("start");
      }
    }, 100);
  }

  renderLevelsPath(islandId) {
    const levelsGrid = document.getElementById("levels-grid");
    if (!levelsGrid) {
      console.error("Elemento levels-grid não encontrado!");
      return;
    }

    levelsGrid.innerHTML = "";
    levelsGrid.className = "levels-path";

    const island = ILHAS[islandId];
    if (!island || !island.levels) {
      console.error("Ilha ou níveis não encontrados:", islandId);
      return;
    }

    const pathContainer = document.createElement("div");
    pathContainer.className = "path-container";

    const totalLevels = Object.keys(island.levels).length;
    const levelPositions = this.calculateLevelPositions(totalLevels);
    const unlockedLevels = this.getUnlockedLevels(islandId);

    Object.keys(island.levels).forEach((levelNum, index) => {
      const levelData = island.levels[levelNum];
      const isUnlocked = unlockedLevels.includes(parseInt(levelNum));
      const position = levelPositions[index];
      const isLastLevel = index === totalLevels - 1;

      const levelCircle = document.createElement("div");
      levelCircle.className = `level-circle ${
        isUnlocked ? "unlocked" : "locked"
      } ${isLastLevel ? "final-island" : ""}`;
      levelCircle.dataset.level = levelNum;

      levelCircle.innerHTML = `
        <div class="level-circle-content">
          ${
            isLastLevel
              ? '<div class="level-circle-icon"></div>'
              : `<div class="level-circle-number">${levelNum}</div>`
          }
          <div class="level-circle-name">${levelData.name}</div>
          ${
            !isUnlocked
              ? '<div class="level-circle-icon locked-icon">🔒</div>'
              : ""
          }
        </div>
      `;

      if (isUnlocked) {
        levelCircle.addEventListener("click", () => {
          this.handleLevelClick(islandId, parseInt(levelNum));
        });
      }

      pathContainer.appendChild(levelCircle);
    });

    levelsGrid.appendChild(pathContainer);
  }

  calculateLevelPositions(totalLevels) {
    return Array(totalLevels).fill({});
  }

  handleLevelClick(islandId, levelNum) {
    this.currentIsland = islandId;
    this.currentLevel = levelNum;

    setTimeout(() => {
      this.startLevel(levelNum);
      if (this.screenManager) {
        this.screenManager.showScreen("game");
      }
    }, 1000);
  }

  startLevel(level) {
    this.currentLevel = level;
    this.currentExerciseIndex = 0;
    this.score = 0;

    const island = ILHAS[this.currentIsland];
    const levelData = island.levels[level];

    if (!levelData || !levelData.exercises.length) {
      alert("Nível não disponível!");
      return;
    }

    this.currentExercises = levelData.exercises;
    this.showCurrentExercise();
  }

  showCurrentExercise() {
    if (this.currentTimer) {
      clearInterval(this.currentTimer);
      this.currentTimer = null;
    }

    if (this.currentExerciseSystem) {
      this.currentExerciseSystem.cleanup();
      this.currentExerciseSystem = null;
    }

    if (this.currentExerciseIndex >= this.currentExercises.length) {
      this.completeLevel();
      return;
    }

    const exerciseData = this.currentExercises[this.currentExerciseIndex];
    const template = EXERCISE_TEMPLATES[exerciseData.type];

    if (!template) {
      console.error("Template não encontrado para:", exerciseData.type);
      return;
    }

    const appContainer = document.getElementById("app-container");
    appContainer.innerHTML = template(exerciseData.content);

    this.initializeExerciseSystem(exerciseData.type, exerciseData.content);

    if (exerciseData.content.timeLimit) {
      this.startTimer(exerciseData.content.timeLimit);
    }

    this.updateGameProgress();
  }

  initializeExerciseSystem(exerciseType, exerciseData) {
    switch (exerciseType) {
      case "listening":
        this.currentExerciseSystem = new ListeningSystem(this);
        break;
      case "multiple-choice":
        this.currentExerciseSystem = new MultipleChoiceSystem(this);
        break;
      case "fill-blank":
        this.currentExerciseSystem = new FillBlankSystem(this);
        break;
      case "translation":
        this.currentExerciseSystem = new TranslationSystem(this);
        break;
      case "emoji-translation":
        this.currentExerciseSystem = new EmojiTranslationSystem(this);
        break;
      case "picture-match":
        this.currentExerciseSystem = new PictureMatchSystem(this);
        break;
      case "word-match":
        this.currentExerciseSystem = new WordMatchSystem(this);
        break;
      case "word-order":
        this.currentExerciseSystem = new WordOrderSystem(this);
        if (exerciseData.words || exerciseData.correctOrder) {
          this.currentExerciseSystem.setCorrectOrder(
            exerciseData.correctOrder || exerciseData.words
          );
        }
        break;
      default:
        console.warn("Sistema não implementado para:", exerciseType);
        this.currentExerciseSystem = null;
    }

    if (this.currentExerciseSystem) {
      this.currentExerciseSystem.activate(exerciseData);
    }
  }

  handleCheckButton() {
    const exerciseData = this.currentExercises[this.currentExerciseIndex];
    let isCorrect = false;

    if (this.currentExerciseSystem && this.currentExerciseSystem.checkAnswer) {
      isCorrect = this.currentExerciseSystem.checkAnswer(exerciseData.content);
    } else {
      isCorrect = this.checkExerciseFallback(exerciseData);
    }

    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }

  checkExerciseFallback(exerciseData) {
    switch (exerciseData.type) {
      case "multiple-choice":
        return this.checkMultipleChoice(exerciseData.content);
      case "fill-blank":
        return this.checkFillBlank(exerciseData.content);
      case "translation":
        return this.checkTranslation(exerciseData.content);
      case "emoji-translation":
        return this.checkEmojiTranslation(exerciseData.content);
      case "picture-match":
        return this.checkPictureMatch(exerciseData.content);
      case "word-match":
        return this.checkWordMatch(exerciseData.content);
      case "word-order":
        return this.checkWordOrder(exerciseData.content);
      default:
        console.warn("Fallback não implementado para:", exerciseData.type);
        return true;
    }
  }

  checkMultipleChoice(exercise) {
    const selected = document.querySelector(".option.selected");
    if (!selected) {
      this.feedbackSystem.showSelectOption();
      return false;
    }
    return parseInt(selected.dataset.index) === exercise.correctIndex;
  }

  checkFillBlank(exercise) {
    const input = document.querySelector(".blank-input");
    if (!input.value.trim()) {
      this.feedbackSystem.showFillBlank();
      return false;
    }
    return input.value.trim().toLowerCase() === exercise.answer.toLowerCase();
  }

  checkTranslation(exercise) {
    const textarea = document.querySelector(".translation-input");
    if (!textarea.value.trim()) {
      this.feedbackSystem.showEnterTranslation();
      return false;
    }
    return (
      textarea.value.trim().toLowerCase() === exercise.answer.toLowerCase()
    );
  }

  checkEmojiTranslation(exercise) {
    const selected = document.querySelector(".option.selected");
    if (!selected) {
      tthis.feedbackSystem.showSelectEmojiOption();
      return false;
    }
    return parseInt(selected.dataset.index) === exercise.correctOption;
  }

  handleCorrectAnswer() {
    this.stopTimer();
    this.score += 1;
    this.currentExerciseIndex++;
    this.updateGameProgress();
    this.feedbackSystem.showExerciseCorrect();

    setTimeout(() => {
      if (this.currentExerciseIndex < this.currentExercises.length) {
        this.showCurrentExercise();
      } else {
        this.completeLevel();
      }
    }, 1500);
  }

  handleIncorrectAnswer() {
    this.feedbackSystem.showExerciseIncorrect();

    setTimeout(() => {
      this.showCurrentExercise();
    }, 2000);
  }

  completeLevel() {
    this.stopTimer();

    this.currentExerciseIndex = this.currentExercises.length;
    this.updateGameProgress();

    const island = ILHAS[this.currentIsland];
    const totalLevels = Object.keys(island.levels).length;
    const isLastLevel = this.currentLevel === totalLevels;

    if (!isLastLevel) {
      this.unlockLevel(this.currentLevel + 1);
    }

    if (this.screenManager && this.screenManager.updateIslandsProgress) {
      this.screenManager.updateIslandsProgress();
    }

    if (this.modalSystem) {
      if (isLastLevel) {
        this.modalSystem.showAllLevelsCompleteModal(this.currentIsland);
      } else {
        this.modalSystem.showLevelCompleteModal(this.currentLevel);
      }
    }
  }

  goToNextLevel() {
    const island = ILHAS[this.currentIsland];
    const nextLevel = this.currentLevel + 1;
    const totalLevels = Object.keys(island.levels).length;

    if (nextLevel <= totalLevels) {
      this.currentLevel = nextLevel;
      this.startLevel(nextLevel);
      this.screenManager.showScreen("game");
    } else {
      if (this.modalSystem) {
        this.modalSystem.showAllLevelsCompleteModal(this.currentIsland);
      } else {
        this.screenManager.showScreen("level");
      }
    }
  }

  replayLevel() {
    this.startLevel(this.currentLevel);
    this.screenManager.showScreen("game");
  }

  updateGameProgress() {
    const scoreElements = document.querySelectorAll("#score");
    const progressElements = document.querySelectorAll("#progress");
    const totalPairsElements = document.querySelectorAll("#total-pairs");

    scoreElements.forEach((el) => (el.textContent = this.score));
    totalPairsElements.forEach(
      (el) => (el.textContent = this.currentExercises.length)
    );

    if (this.currentExercises.length > 0) {
      let progress;

      if (this.currentExerciseIndex >= this.currentExercises.length) {
        progress = 100;
      } else {
        progress = Math.round(
          (this.currentExerciseIndex / this.currentExercises.length) * 100
        );
      }
      progressElements.forEach((el) => (el.textContent = `${progress}%`));
    }
  }

  loadProgress() {
    const saved = localStorage.getItem("languageGameProgress");
    return saved
      ? JSON.parse(saved)
      : {
          numbers: { 1: true },
          verbs: { 1: true },
        };
  }

  saveProgress() {
    localStorage.setItem(
      "languageGameProgress",
      JSON.stringify(this.unlockedLevels)
    );
  }

  unlockLevel(level) {
    if (!this.unlockedLevels[this.currentIsland]) {
      this.unlockedLevels[this.currentIsland] = {};
    }
    this.unlockedLevels[this.currentIsland][level] = true;
    this.saveProgress();
  }

  getUnlockedLevels(islandId) {
    const saved = this.unlockedLevels[islandId];
    return saved
      ? Object.keys(saved)
          .map(Number)
          .filter((level) => saved[level])
      : [1];
  }

  setupGameEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("check-button")) {
        this.handleCheckButton();
      }
    });
  }

  startTimer(timeLimit) {
    this.stopTimer();

    const timerElement = document.querySelector(".exercise-timer");
    const secondsElement = document.querySelector(".timer-seconds");

    if (!timerElement || !secondsElement) return;

    this.timer = {
      interval: null,
      timeLeft: timeLimit,
      timeLimit: timeLimit,
      isPaused: false,
      element: timerElement,
      secondsElement: secondsElement,
    };

    timerElement.classList.remove("warning", "danger");
    secondsElement.textContent = timeLimit;

    this.timer.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    if (this.timer.isPaused) return;

    this.timer.timeLeft--;
    this.timer.secondsElement.textContent = this.timer.timeLeft;

    if (this.timer.timeLeft <= 10) {
      this.timer.element.classList.add("danger");
      this.timer.element.classList.remove("warning");
    } else if (this.timer.timeLeft <= 20) {
      this.timer.element.classList.add("warning");
      this.timer.element.classList.remove("danger");
    }

    if (this.timer.timeLeft <= 0) {
      this.stopTimer();
      this.handleTimeUp();
    }
  }

  stopTimer() {
    if (this.timer.interval) {
      clearInterval(this.timer.interval);
      this.timer.interval = null;
    }
  }

  handleTimeUp() {
    this.feedbackSystem.showTimeUp();
    setTimeout(() => this.showCurrentExercise(), 2000);
  }

  pauseGame() {
    this.timer.isPaused = true;
    if (this.currentExerciseSystem && this.currentExerciseSystem.pause) {
      this.currentExerciseSystem.pause();
    }
  }

  resumeGame() {
    this.timer.isPaused = false;
    if (this.currentExerciseSystem && this.currentExerciseSystem.resume) {
      this.currentExerciseSystem.resume();
    }
  }

  cleanup() {
    this.stopTimer();
    if (this.currentExerciseSystem) {
      this.currentExerciseSystem.cleanup();
      this.currentExerciseSystem = null;
    }
  }
}

//comentarioteste
