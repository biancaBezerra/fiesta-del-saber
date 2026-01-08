class EmojiTranslationSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (!this.isActive) return;
      const option = e.target.closest(".option");
      if (option) {
        this.handleOptionClick(option);
        return;
      }
    });
  }

  handleOptionClick(clickedOption) {
    document.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("selected");
    });
    clickedOption.classList.add("selected");
  }

  checkAnswer(exerciseData) {
    const selectedOption = document.querySelector(".option.selected");

    if (!selectedOption) {
      if (this.gameManager && this.gameManager.feedbackSystem) {
        this.gameManager.feedbackSystem.showSelectEmojiOption();
      }
      return false;
    }

    const selectedIndex = parseInt(selectedOption.dataset.index);
    const isCorrect = selectedIndex === exerciseData.correctOption;

    if (isCorrect) {
      selectedOption.classList.add("correct");
    } else {
      selectedOption.classList.add("incorrect");
      const correctOption = document.querySelector(
        `.option[data-index="${exerciseData.correctOption}"]`
      );
      if (correctOption) {
        correctOption.classList.add("correct");
      }
    }

    return isCorrect;
  }

  activate(exerciseData = null) {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
    document.querySelectorAll(".option.selected").forEach((option) => {
      option.classList.remove("selected");
    });
  }

  cleanup() {
    this.deactivate();
    document.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("correct", "incorrect");
    });
  }
}
