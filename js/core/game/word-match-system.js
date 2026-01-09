class WordMatchSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.draggedItem = null;
    this.ghost = null;
    this.currentExercise = null;
    this.isActuallyDragging = false;
    this.startX = 0;
    this.startY = 0;

    // ✅ SISTEMA DE SCROLL SIMPLIFICADO
    this.autoScrollInterval = null;
    this.scrollSpeed = 15;
    this.scrollThreshold = 80;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // MOUSE EVENTS
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

    // TOUCH EVENTS
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

  handleStart(target, clientX, clientY) {
    const wordItem = target.closest(".word-item, .matched-word");
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

  // ✅ SISTEMA DE SCROLL (igual ao seu anterior)
  startAutoScroll(direction) {
    if (this.autoScrollInterval) return;

    this.autoScrollInterval = setInterval(() => {
      const gameScreen =
        document.querySelector(".exercise-container") || document.body;

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

  // ✅ MÉTODOS BÁSICOS DE DRAG
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
    const dropZones = document.querySelectorAll(".translation-slot");
    let targetZone = null;
    let minDistance = Infinity;

    // Encontrar zone mais próxima
    dropZones.forEach((zone) => {
      const rect = zone.getBoundingClientRect();
      const zoneCenterX = rect.left + rect.width / 2;
      const zoneCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(clientX - zoneCenterX, 2) + Math.pow(clientY - zoneCenterY, 2)
      );

      if (distance < minDistance && distance < 100) {
        minDistance = distance;
        targetZone = zone;
      }
    });

    if (targetZone) {
      this.moveWordToSlot(this.draggedItem, targetZone);
    } else {
      this.returnWordToContainer(this.draggedItem);
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
  }

  moveWordToSlot(wordItem, targetSlot) {
    const word = wordItem.dataset.word;
    const translation = targetSlot.dataset.translation;

    // Se a palavra já está em algum slot, limpar esse slot primeiro
    const currentSlot = wordItem.closest(".translation-slot");
    if (currentSlot && currentSlot !== targetSlot) {
      this.clearSlot(currentSlot);
    }

    // Se o slot destino já tem uma palavra, devolvê-la
    const existingWord = targetSlot.querySelector(".matched-word");
    if (existingWord && existingWord !== wordItem) {
      this.returnWordToContainer(existingWord);
    }

    // ✅ REMOVER classes de estado anteriores antes de mover
    wordItem.classList.remove("correct", "incorrect");
    targetSlot.classList.remove("correct", "incorrect");

    // Se já é um matched-word, apenas mover
    if (wordItem.classList.contains("matched-word")) {
      targetSlot.appendChild(wordItem);

      // ✅ REAVALIAR se está correto após mover
      const isCorrect = this.currentExercise.pairs.some(
        (pair) => pair.word === word && pair.translation === translation
      );

      if (isCorrect) {
        wordItem.classList.add("correct");
        targetSlot.classList.add("correct");
      } else {
        wordItem.classList.add("incorrect");
        targetSlot.classList.add("incorrect");
      }
    } else {
      // Criar nova palavra no slot destino
      const newWord = document.createElement("div");
      newWord.className = "matched-word";
      newWord.dataset.word = word;
      newWord.textContent = word;

      // Verificar se está correto
      const isCorrect = this.currentExercise.pairs.some(
        (pair) => pair.word === word && pair.translation === translation
      );

      if (isCorrect) {
        newWord.classList.add("correct");
        targetSlot.classList.add("correct");
      } else {
        newWord.classList.add("incorrect");
        targetSlot.classList.add("incorrect");
      }

      targetSlot.innerHTML = "";
      targetSlot.appendChild(newWord);

      // Se a palavra original estava no container, removê-la de lá
      if (wordItem.parentElement.classList.contains("words-container")) {
        wordItem.remove();
      }
    }
  }

  returnWordToContainer(wordElement) {
    const wordsContainer = document.querySelector(".words-container");
    if (!wordsContainer) return;

    // ✅ VERIFICAR se a palavra já não está no container
    if (wordElement.parentElement === wordsContainer) {
      return;
    }

    // ✅ SE for uma palavra colocada (matched-word), criar nova no container
    if (wordElement.classList.contains("matched-word")) {
      const newWord = document.createElement("div");
      newWord.className = "word-item draggable";
      newWord.dataset.word = wordElement.dataset.word;
      newWord.textContent = wordElement.textContent;

      wordsContainer.appendChild(newWord);

      // Remover a palavra do slot
      if (wordElement.parentElement) {
        this.clearSlot(wordElement.parentElement);
      }
    }
  }

  clearSlot(slot) {
    // ✅ LIMPAR completamente o slot
    slot.classList.remove("correct", "incorrect");
    slot.innerHTML = "";

    // Restaurar placeholder
    const placeholder = document.createElement("div");
    placeholder.className = "slot-placeholder";
    placeholder.textContent = slot.dataset.translation;
    slot.appendChild(placeholder);
  }

  checkAnswer(exerciseData) {
    const dropZones = document.querySelectorAll(".translation-slot");
    let allCorrect = true;

    dropZones.forEach((zone) => {
      const matchedWord = zone.querySelector(".matched-word");
      const translation = zone.dataset.translation;

      if (!matchedWord) {
        allCorrect = false;
        zone.classList.add("incorrect");
        return;
      }

      const word = matchedWord.dataset.word;
      const isCorrect = exerciseData.pairs.some(
        (pair) => pair.word === word && pair.translation === translation
      );

      // ✅ APENAS aplicar cores, não bloquear interação
      if (isCorrect) {
        zone.classList.add("correct");
        matchedWord.classList.add("correct");
        matchedWord.classList.remove("incorrect");
      } else {
        allCorrect = false;
        zone.classList.add("incorrect");
        matchedWord.classList.add("incorrect");
        matchedWord.classList.remove("correct");
      }
    });

    if (!allCorrect && this.gameManager && this.gameManager.feedbackSystem) {
      this.gameManager.feedbackSystem.showSomeCombinationsIncorrect();
    }

    return allCorrect;
  }

  activate(exerciseData = null) {
    this.isActive = true;
    this.currentExercise = exerciseData;
  }

  deactivate() {
    this.isActive = false;
    this.cleanupDrag();
    this.currentExercise = null;
  }

  cleanup() {
    this.deactivate();
  }
}
