class PictureMatchSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.selectedItems = []; // Array para armazenar itens selecionados
    this.correctPairs = new Map(); // Mapa para pares corretos
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (!this.isActive) return;

      // Verificar se clicou em um item interativo (palavra ou imagem)
      const item = e.target.closest(".picture-word, .picture-image");
      if (item) {
        this.handleItemClick(item);
      }
    });
  }

  handleItemClick(item) {
    // Se já está correta, não fazer nada
    if (item.classList.contains("correct")) return;

    // Se já está selecionado, desselecionar
    if (item.classList.contains("selected")) {
      this.removeSelection(item);
      return;
    }

    // Limpar TODOS os erros antes de fazer nova seleção
    this.clearAllErrors();

    // Selecionar novo item
    this.selectItem(item);

    // Se temos 2 itens selecionados, verificar o par
    if (this.selectedItems.length === 2) {
      this.checkPair();
    }
  }

  selectItem(item) {
    // Remover seleção de todos os outros itens
    document
      .querySelectorAll(".picture-word.selected, .picture-image.selected")
      .forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("selected");
        }
      });

    // Adicionar seleção ao item atual
    item.classList.add("selected");

    // Se já temos 2 itens, substituir o mais antigo
    if (this.selectedItems.length >= 2) {
      const oldestItem = this.selectedItems.shift();
      oldestItem.classList.remove("selected");
    }

    this.selectedItems.push(item);
  }

  removeSelection(item) {
    item.classList.remove("selected");
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  clearAllErrors() {
    // Remover TODOS os erros visuais (mantém apenas os corretos)
    document
      .querySelectorAll(".picture-word.incorrect, .picture-image.incorrect")
      .forEach((item) => {
        item.classList.remove("incorrect");
      });
  }

  checkPair() {
    if (this.selectedItems.length !== 2) return;

    const [item1, item2] = this.selectedItems;

    // Verificar se temos uma palavra e uma imagem
    const isWord1 = item1.classList.contains("picture-word");
    const isWord2 = item2.classList.contains("picture-word");

    if (isWord1 === isWord2) {
      // Ambos são do mesmo tipo - não é um par válido
      this.clearSelections();
      return;
    }

    // Identificar qual é palavra e qual é imagem
    const wordItem = isWord1 ? item1 : item2;
    const imageItem = isWord1 ? item2 : item1;

    const word = wordItem.dataset.word;
    const emoji = imageItem.dataset.emoji;

    // Obter exercício atual
    const exercise = this.getCurrentExercise();
    if (!exercise || !exercise.pairs) return;

    // Verificar se é um par correto
    const isCorrect = exercise.pairs.some(
      (pair) => pair.word === word && pair.image === emoji
    );

    if (isCorrect) {
      // ✅ PAR CORRETO

      // IMPORTANTE: Primeiro remover TODOS os erros (lógica 3)
      this.clearAllErrors();

      // Marcar como correto
      wordItem.classList.remove("selected");
      wordItem.classList.add("correct");
      imageItem.classList.remove("selected");
      imageItem.classList.add("correct");

      // Salvar no mapa de pares corretos
      this.correctPairs.set(word, emoji);
      this.correctPairs.set(emoji, word);

      // Feedback
      if (this.gameManager?.feedbackSystem) {
        this.gameManager.feedbackSystem.showCorrect();
      }

      // Limpar seleções
      this.selectedItems = [];

      // Verificar se todas estão corretas
      setTimeout(() => this.checkAllCorrect(exercise), 300);
    } else {
      // ❌ PAR INCORRETO

      // Marcar como incorreto (APENAS estes dois itens)
      wordItem.classList.add("incorrect");
      imageItem.classList.add("incorrect");

      // IMPORTANTE: Manter selecionados para o usuário poder corrigir (lógica 2)
      // NÃO limpar as seleções - o usuário pode clicar na correta depois

      // Feedback
      if (this.gameManager?.feedbackSystem) {
        this.gameManager.feedbackSystem.showExerciseIncorrect();
      }
    }
  }

  // Método para quando o usuário quiser corrigir manualmente
  forceClearErrorsForItem(item) {
    // Se este item está em um par incorreto, limpar o erro do par inteiro
    if (item.classList.contains("incorrect")) {
      const partner = this.findIncorrectPartner(item);
      if (partner) {
        item.classList.remove("incorrect");
        partner.classList.remove("incorrect");
      }
    }
  }

  findIncorrectPartner(item) {
    // Encontrar o parceiro incorreto deste item
    const allIncorrect = document.querySelectorAll(
      ".picture-word.incorrect, .picture-image.incorrect"
    );

    for (const otherItem of allIncorrect) {
      if (otherItem !== item) {
        // Verificar se são um par (um é palavra, outro é imagem)
        const isItemWord = item.classList.contains("picture-word");
        const isOtherWord = otherItem.classList.contains("picture-word");

        if (isItemWord !== isOtherWord) {
          return otherItem;
        }
      }
    }

    return null;
  }

  getCurrentExercise() {
    if (
      !this.gameManager ||
      !this.gameManager.currentExercises ||
      this.gameManager.currentExerciseIndex >=
        this.gameManager.currentExercises.length
    ) {
      return null;
    }

    return this.gameManager.currentExercises[
      this.gameManager.currentExerciseIndex
    ].content;
  }

  checkAllCorrect(exercise) {
    const allCorrect = exercise.pairs.every((pair) => {
      return this.correctPairs.get(pair.word) === pair.image;
    });

    if (allCorrect && this.gameManager?.feedbackSystem) {
      this.gameManager.feedbackSystem.showAllCorrect();
    }
  }

  checkAnswer(exerciseData) {
    const allCorrect = exerciseData.pairs.every((pair) => {
      return this.correctPairs.get(pair.word) === pair.image;
    });

    if (!allCorrect && this.gameManager?.feedbackSystem) {
      this.gameManager.feedbackSystem.showCombineAllWords();
      return false;
    }

    return true;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
    this.clearSelections();
  }

  clearSelections() {
    // Limpar apenas seleções
    this.selectedItems.forEach((item) => {
      item.classList.remove("selected");
    });
    this.selectedItems = [];
  }

  cleanup() {
    this.deactivate();
    this.correctPairs.clear();

    document
      .querySelectorAll(".picture-word, .picture-image")
      .forEach((item) => {
        item.classList.remove("selected", "correct", "incorrect");
      });
  }
}
