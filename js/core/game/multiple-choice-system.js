class MultipleChoiceSystem {
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
        this.gameManager.feedbackSystem.showSelectOption();
      }
      return false;
    }

    const selectedIndex = parseInt(selectedOption.dataset.index);
    const isCorrect = selectedIndex === exerciseData.correctIndex;

    document.querySelectorAll(".option").forEach((option) => {
      const optionIndex = parseInt(option.dataset.index);

      if (optionIndex === exerciseData.correctIndex) {
        option.classList.add("correct");
      } else if (optionIndex === selectedIndex && !isCorrect) {
        option.classList.add("incorrect");
      }
    });

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
