class FillBlankSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.hintVisible = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (!this.isActive) return;

      const hintButton = e.target.closest(".hint-button");
      if (hintButton) {
        this.toggleHint();
        return;
      }

      const blankInput = e.target.closest(".blank-input");
      if (blankInput) {
        this.setupInputListener(blankInput);
        return;
      }
    });

    document.addEventListener("keypress", (e) => {
      if (!this.isActive) return;

      if (e.key === "Enter" && e.target.classList.contains("blank-input")) {
        if (this.gameManager) {
          this.gameManager.handleCheckButton();
        }
      }
    });
  }

  toggleHint() {
    const hintContent = document.querySelector(".hint-content");
    const hintButton = document.querySelector(".hint-button");

    if (!hintContent || !hintButton) return;

    this.hintVisible = !this.hintVisible;

    if (this.hintVisible) {
      hintContent.style.display = "block";
      hintButton.textContent = "Ocultar Dica";
      hintButton.classList.add("hint-active");
    } else {
      hintContent.style.display = "none";
      hintButton.textContent = "Mostrar Dica";
      hintButton.classList.remove("hint-active");
    }
  }

  setupInputListener(input) {
    input.focus();
    input.classList.remove("correct", "incorrect");
  }

  checkAnswer(exerciseData) {
    const input = document.querySelector(".blank-input");

    if (!input || !input.value.trim()) {
      if (this.gameManager && this.gameManager.feedbackSystem) {
        this.gameManager.feedbackSystem.showFillBlank();
      }
      return false;
    }

    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = exerciseData.answer.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("incorrect");
    } else {
      input.classList.add("incorrect");
      input.classList.remove("correct");
    }

    return isCorrect;
  }

  activate(exerciseData = null) {
    this.isActive = true;
    this.hintVisible = false;

    setTimeout(() => {
      const input = document.querySelector(".blank-input");
      if (input) input.focus();
    }, 100);
  }

  deactivate() {
    this.isActive = false;
    this.hintVisible = false;
  }

  cleanup() {
    this.deactivate();
    const input = document.querySelector(".blank-input");
    if (input) {
      input.classList.remove("correct", "incorrect");
    }
  }
}
