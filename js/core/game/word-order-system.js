class WordOrderSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.draggedItem = null;
    this.ghost = null;
    this.correctOrder = [];
    this.isActuallyDragging = false;
    this.startX = 0;
    this.startY = 0;

    // ✅ SISTEMA DE SCROLL
    this.autoScrollInterval = null;
    this.scrollSpeed = 15;
    this.scrollThreshold = 80;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("mousedown", (e) => {
      if (!this.isActive) return;
      this.handleStart(e.target, e.clientX, e.clientY);
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.isActive || !this.draggedItem) return;
      this.handleMove(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", (e) => {
      if (!this.isActive || !this.draggedItem) return;
      this.handleEnd(e.clientX, e.clientY);
    });

    document.addEventListener(
      "touchstart",
      (e) => {
        if (!this.isActive) return;
        const touch = e.touches[0];
        this.handleStart(e.target, touch.clientX, touch.clientY);
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isActive || !this.draggedItem) return;
        const touch = e.touches[0];
        this.handleMove(touch.clientX, touch.clientY);
        if (this.isActuallyDragging) e.preventDefault();
      },
      { passive: false }
    );

    document.addEventListener("touchend", (e) => {
      if (!this.isActive || !this.draggedItem) return;
      const touch = e.changedTouches[0];
      this.handleEnd(touch.clientX, touch.clientY);
    });
  }

  // ✅ MÉTODOS DE CONTROLE PRINCIPAIS
  handleStart(target, clientX, clientY) {
    const wordItem = target.closest(".word-item, .sentence-slot");
    if (!wordItem) return;

    this.startX = clientX;
    this.startY = clientY;
    this.isActuallyDragging = false;
    this.draggedItem = wordItem;
  }

  handleMove(clientX, clientY) {
    if (!this.draggedItem) return;

    const deltaX = Math.abs(clientX - this.startX);
    const deltaY = Math.abs(clientY - this.startY);
    const threshold = 5;

    // Iniciar drag se passou do threshold
    if (
      (deltaX > threshold || deltaY > threshold) &&
      !this.isActuallyDragging
    ) {
      this.isActuallyDragging = true;
      this.startDrag(this.draggedItem, clientX, clientY);
    }

    // Atualizar posição e verificar scroll
    if (this.isActuallyDragging && this.ghost) {
      this.updateGhostPosition(clientX, clientY);
      this.checkScrollPosition(clientY); // ✅ SCROLL AUTOMÁTICO
    }
  }

  handleEnd(clientX, clientY) {
    if (!this.draggedItem) return;

    this.stopAutoScroll(); // ✅ PARAR SCROLL
    this.cleanupGhost();

    if (this.isActuallyDragging) {
      this.drop(clientX, clientY);
    }

    this.cleanupDrag();
  }

  // ✅ SISTEMA DE SCROLL AUTOMÁTICO
  startAutoScroll(direction) {
    if (this.autoScrollInterval) return;

    this.autoScrollInterval = setInterval(() => {
      if (direction === "up") {
        window.scrollBy(0, -this.scrollSpeed);
      } else if (direction === "down") {
        window.scrollBy(0, this.scrollSpeed);
      }
    }, 16);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  checkScrollPosition(clientY) {
    const viewportHeight = window.innerHeight;

    if (clientY < this.scrollThreshold) {
      this.startAutoScroll("up");
    } else if (clientY > viewportHeight - this.scrollThreshold) {
      this.startAutoScroll("down");
    } else {
      this.stopAutoScroll();
    }
  }

  // ✅ MÉTODOS DE DRAG
  startDrag(wordItem, clientX, clientY) {
    this.draggedItem = wordItem;
    this.draggedItem.classList.add("dragging");

    // Criar ghost
    this.ghost = this.draggedItem.cloneNode(true);
    this.setupGhostStyles();
    document.body.appendChild(this.ghost);

    this.updateGhostPosition(clientX, clientY);
  }

  setupGhostStyles() {
    this.ghost.classList.add("ghost");
    this.ghost.style.position = "fixed";
    this.ghost.style.pointerEvents = "none";
    this.ghost.style.zIndex = "10000";
    this.ghost.style.opacity = "0.9";
    this.ghost.style.transform = "scale(1.1)";
    this.ghost.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
    this.ghost.style.border = "3px solid #667eea";
    this.ghost.style.borderRadius = "12px";
    this.ghost.style.background = "white";
    this.ghost.style.padding = "15px 20px";
    this.ghost.style.fontSize = "1.2em";
    this.ghost.style.fontWeight = "600";
    this.ghost.style.color = "#2c3e50";
    this.ghost.style.maxWidth = "200px";
    this.ghost.style.textAlign = "center";
  }

  updateGhostPosition(x, y) {
    if (!this.ghost) return;

    const ghostWidth = this.ghost.offsetWidth;
    const ghostHeight = this.ghost.offsetHeight;

    this.ghost.style.left = x - ghostWidth / 2 + "px";
    this.ghost.style.top = y - ghostHeight / 2 + "px";
  }

  drop(clientX, clientY) {
    const sentenceArea = document.querySelector(".sentence-area");
    if (!sentenceArea) return;

    const rect = sentenceArea.getBoundingClientRect();
    const isInArea =
      clientX >= rect.left - 20 &&
      clientX <= rect.right + 20 &&
      clientY >= rect.top - 20 &&
      clientY <= rect.bottom + 20;

    if (isInArea) {
      this.addWordToSentence(this.draggedItem);
    } else {
      this.returnToOrigin(this.draggedItem);
    }
  }

  cleanupGhost() {
    if (this.ghost) {
      this.ghost.remove();
      this.ghost = null;
    }
  }

  cleanupDrag() {
    this.stopAutoScroll();

    if (this.draggedItem) {
      this.draggedItem.classList.remove("dragging");
      this.draggedItem = null;
    }
    this.cleanupGhost();
    this.isActuallyDragging = false;
    this.startX = 0;
    this.startY = 0;
  }

  // ✅ MÉTODOS EXISTENTES (mantenha estes do seu código original)
  addWordToSentence(wordItem) {
    const word = wordItem.dataset.word || wordItem.textContent;

    // ✅ VERIFICAR se a palavra JÁ está na área da frase
    const sentenceArea = document.querySelector(".sentence-area");
    const existingWords = Array.from(
      sentenceArea.querySelectorAll(".sentence-slot")
    );
    const wordAlreadyExists = existingWords.some(
      (slot) => slot.dataset.word === word && slot !== wordItem
    );

    if (wordAlreadyExists && wordItem.classList.contains("sentence-slot")) {
      return; // Já existe, não duplicar
    }

    // Se a palavra já está na frase (sentence-slot), remover da posição atual
    if (wordItem.classList.contains("sentence-slot")) {
      // ✅ Só remover se não for o mesmo elemento
      if (
        !sentenceArea.contains(wordItem) ||
        wordItem.parentElement !== sentenceArea
      ) {
        wordItem.remove();
      }
    }

    // ✅ VERIFICAR se a palavra já não está na área da frase
    if (
      !sentenceArea.contains(wordItem) ||
      wordItem.parentElement !== sentenceArea
    ) {
      // Criar novo slot na frase apenas se não estiver já
      const sentenceSlot = document.createElement("div");
      sentenceSlot.className = "sentence-slot";
      sentenceSlot.dataset.word = word;
      sentenceSlot.textContent = word;

      sentenceArea.appendChild(sentenceSlot);
    }

    // Se a palavra veio do container de palavras, removê-la de lá
    if (wordItem.parentElement.classList.contains("words-container")) {
      wordItem.remove();
    }

    this.updateSentencePreview();
  }

  returnToOrigin(wordItem) {
    if (wordItem.classList.contains("sentence-slot")) {
      this.returnToContainer(wordItem);
    }
  }

  returnToContainer(wordElement) {
    const wordsContainer = document.querySelector(".words-container");
    if (!wordsContainer) return;

    // ✅ VERIFICAR se a palavra já não está no container
    if (wordsContainer.contains(wordElement)) {
      return;
    }

    // Criar nova palavra no container
    const newWord = document.createElement("div");
    newWord.className = "word-item";
    newWord.dataset.word = wordElement.dataset.word || wordElement.textContent;
    newWord.textContent = wordElement.textContent;

    wordsContainer.appendChild(newWord);

    // Remover a palavra da frase
    wordElement.remove();
    this.updateSentencePreview();
  }

  updateSentencePreview() {
    const sentenceSlots = document.querySelectorAll(".sentence-slot");
    const currentSentence = Array.from(sentenceSlots)
      .map((slot) => slot.dataset.word)
      .join(" ");

    const preview = document.querySelector(".sentence-preview");
    if (preview) {
      preview.textContent = currentSentence || "Monte a frase acima ↑";
    }
  }

  checkAnswer(exerciseData) {
    const correctOrder = exerciseData.correctOrder || exerciseData.words;
    const sentenceSlots = document.querySelectorAll(".sentence-slot");
    const currentOrder = Array.from(sentenceSlots).map(
      (slot) => slot.dataset.word
    );

    const isCorrect =
      JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

    sentenceSlots.forEach((slot, index) => {
      if (isCorrect) {
        slot.classList.add("correct");
        slot.classList.remove("incorrect");
      } else {
        if (slot.dataset.word === correctOrder[index]) {
          slot.classList.add("correct");
          slot.classList.remove("incorrect");
        } else {
          slot.classList.add("incorrect");
          slot.classList.remove("correct");
        }
      }
    });

    if (!isCorrect) {
      this.showCorrectAnswer(correctOrder);
    }

    return isCorrect;
  }

  showCorrectAnswer(correctOrder) {
    const sentencePreview = document.querySelector(".sentence-preview");
    if (sentencePreview) {
      sentencePreview.innerHTML = `
        <div class="correct-answer">
          <strong>Frase correta:</strong> ${correctOrder.join(" ")}
        </div>
      `;
      sentencePreview.classList.add("show-correct");
    }
  }

  setCorrectOrder(correctOrder) {
    this.correctOrder = correctOrder;
  }

  activate(exerciseData = null) {
    this.isActive = true;
    if (exerciseData) {
      const correctOrder = exerciseData.correctOrder || exerciseData.words;
      this.setCorrectOrder(correctOrder);
    }
  }

  deactivate() {
    this.isActive = false;
    this.cleanupDrag();
    this.correctOrder = [];
  }

  cleanup() {
    this.deactivate();
  }
}
