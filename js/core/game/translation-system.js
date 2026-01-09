class TranslationSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.autoFocus();

    document.addEventListener("keydown", (e) => {
      if (!this.isActive) return;

      const translationInput = document.querySelector(".translation-input");
      if (translationInput && e.key === "Enter") {
        if (e.shiftKey) {
          return;
        } else {
          e.preventDefault();
          if (this.gameManager) {
            this.gameManager.handleCheckButton();
          }
        }
      }
    });
  }

  autoFocus() {
    setTimeout(() => {
      const translationInput = document.querySelector(".translation-input");
      if (translationInput) {
        translationInput.focus();
      }
    }, 100);
  }

  checkAnswer(exerciseData) {
    const translationInput = document.querySelector(".translation-input");

    if (!translationInput || !translationInput.value.trim()) {
      if (this.gameManager && this.gameManager.feedbackSystem) {
        this.gameManager.feedbackSystem.showEnterTranslation();
      }
      return false;
    }

    const userTranslation = translationInput.value.trim().toLowerCase();
    const correctAnswer = exerciseData.answer.toLowerCase();
    const isCorrect = userTranslation === correctAnswer;

    if (isCorrect) {
      translationInput.classList.add("correct");
      translationInput.classList.remove("incorrect");
    } else {
      translationInput.classList.add("incorrect");
      translationInput.classList.remove("correct");
    }

    return isCorrect;
  }

  activate(exerciseData = null) {
    this.isActive = true;
    this.autoFocus();
  }

  deactivate() {
    this.isActive = false;
  }

  cleanup() {
    this.deactivate();
    const translationInput = document.querySelector(".translation-input");
    if (translationInput) {
      translationInput.classList.remove("correct", "incorrect");
    }
  }
}
