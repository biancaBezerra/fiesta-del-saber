class FeedbackSystem {
  constructor() {
    this.feedbackElement = document.getElementById("feedback-message");
    this.timeoutId = null;
  }

  show(message, type = "info") {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.feedbackElement.textContent = message;
    this.feedbackElement.className = `feedback-message feedback-${type}`;

    this.feedbackElement.offsetHeight;

    this.feedbackElement.classList.add("show", "slide-in");

    this.timeoutId = setTimeout(() => {
      this.feedbackElement.classList.remove("show", "slide-in");
      this.feedbackElement.classList.add("slide-out");

      setTimeout(() => {
        this.feedbackElement.classList.remove("slide-out");
      }, 300);
    }, 1500);
  }

  // === MENSAGENS GERAIS ===
  showCorrect() {
    this.show("Correto!", "correct");
  }

  showIncorrectObject() {
    this.show("Este objeto não combina com esta sombra!", "incorrect");
  }

  showPrecisionNeeded() {
    this.show("Tente encaixar o objeto no centro da sombra.", "incorrect");
  }

  showTimeUp() {
    this.show("Tempo esgotado!", "error");
  }

  // === MENSAGENS DE EXERCÍCIOS ESPECÍFICOS ===

  // Multiple Choice
  showSelectOption() {
    this.show("Selecione uma opção!", "error");
  }

  // Fill Blank
  showFillBlank() {
    this.show("Preencha a lacuna!", "error");
  }

  // Translation
  showEnterTranslation() {
    this.show("Digite sua tradução!", "error");
  }

  // Emoji Translation
  showSelectEmojiOption() {
    this.show("Selecione uma opção!", "error");
  }

  // Picture Match
  showSelectWordFirst() {
    this.show("Selecione uma palavra primeiro!", "error");
  }

  showCombineAllWords() {
    this.show("Combine todas as palavras com os emojis!", "error");
  }

  showSomeCombinationsIncorrect() {
    this.show("Algumas combinações estão incorretas!", "error");
  }

  showUseClickSystem() {
    this.show("Use o sistema de cliques para combinar imagens!", "info");
  }

  // === MENSAGENS DE SUCESSO ===
  showExerciseCorrect() {
    this.show("Correto! Vamos ao próximo!", "success");
  }

  showExerciseIncorrect() {
    this.show("Incorreto! Tente novamente.", "error");
  }
}
