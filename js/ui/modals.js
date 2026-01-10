class ModalSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.init();
  }

  init() {
    // Event listeners para modais
    document.addEventListener("click", (e) => {
      const action = e.target.dataset.action;

      switch (action) {
        case "show-help":
          this.showHelpModal();
          break;
        case "close-help":
          this.closeHelpModal();
          break;
        case "pause-game":
          this.showPauseModal();
          break;
        case "resume-game":
          this.closePauseModal();
          break;
        case "next-level":
          this.closeLevelCompleteModal();
          this.gameManager.goToNextLevel();
          break;
        case "replay-level":
          this.closeLevelCompleteModal();
          this.gameManager.replayLevel();
          break;
        case "next-theme":
          this.closeAllLevelsCompleteModal();
          this.gameManager.screenManager.showScreen("islands");
          break;
        case "replay-theme":
          this.closeAllLevelsCompleteModal();
          this.gameManager.replayLevel();
          break;
        case "show-theme-screen":
          this.closeAllModals();
          this.gameManager.screenManager.showScreen("start");
          break;
        case "show-level-screen":
          this.closeAllModals();
          this.gameManager.screenManager.showScreen("level");
          break;
        case "show-info-modal":
          this.showInfoModal();
          break;
        case "close-info-modal":
          this.closeInfoModal();
          break;
        case "close-level-complete":
          this.closeLevelCompleteModal();
          break;
        case "close-all-levels-complete":
          this.closeAllLevelsCompleteModal();
          break;
        case "close-pause-modal":
          this.closePauseModal();
          break;
        case "show-skill-modal":
          if (this.gameManager.informacoesSystem) {
            this.gameManager.informacoesSystem.showSkillDetails(
              e.target.dataset.code
            );
          }
          break;
        case "close-skill-modal":
          if (this.gameManager.informacoesSystem) {
            this.gameManager.informacoesSystem.closeSkillModal();
          }
          break;
      }
    });

    document.addEventListener("click", (e) => {
      // Fechar modal quando clicar no overlay (background)
      if (e.target.classList.contains("modal")) {
        // Não fechar se for um clique dentro do modal content
        if (!e.target.closest(".modal-content")) {
          this.closeAllModals();
        }
      }
    });

    // Fechar modal com ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });
  }

  showHelpModal() {
    document.getElementById("help-modal").classList.add("active");
    if (this.gameManager.pauseGame) {
      this.gameManager.pauseGame();
    }
  }

  showPauseModal() {
    document.getElementById("pause-modal").classList.add("active");
    if (this.gameManager.pauseGame) {
      this.gameManager.pauseGame();
    }
  }

  closeHelpModal() {
    document.getElementById("help-modal").classList.remove("active");
    this.gameManager.resumeGame();
  }

  closePauseModal() {
    document.getElementById("pause-modal").classList.remove("active");
    this.gameManager.resumeGame();
  }

  showLevelCompleteModal(level) {
    const starsEarned = 5;

    const messageElement = document.querySelector("#level-complete-modal p");
    if (messageElement) {
      messageElement.innerHTML = `Você ganhou <span id="stars-earned">${starsEarned}</span> estrelas!`;
    }

    this.updateStarsProgress(this.gameManager.currentIsland);
    document.getElementById("level-complete-modal").classList.add("active");
    this.gameManager.pauseGame();
  }

  closeLevelCompleteModal() {
    document.getElementById("level-complete-modal").classList.remove("active");
    this.gameManager.resumeGame();
  }

  showAllLevelsCompleteModal(islandId) {
    const island = ILHAS[islandId];
    const totalStars = 25; // 5 níveis × 5 estrelas cada

    // Atualizar a mensagem para celebrar todas as estrelas
    const messageElement = document.querySelector(
      "#all-levels-complete-modal p"
    );
    if (messageElement) {
      messageElement.innerHTML = `Parabéns! Você completou todos os níveis da <strong>${island.name}</strong> e coletou <strong>todas as 25 estrelas</strong>! 🎉`;
    }

    document
      .getElementById("all-levels-complete-modal")
      .classList.add("active");
    this.gameManager.pauseGame();
  }

  closeAllLevelsCompleteModal() {
    document
      .getElementById("all-levels-complete-modal")
      .classList.remove("active");
    this.gameManager.resumeGame();
  }

  showInfoModal() {
    const infoScreen = document.getElementById("info-screen");
    const modalContent = document.getElementById("modal-info-content");

    if (infoScreen && modalContent) {
      const mainContent = infoScreen.querySelector(".info-content");

      if (mainContent) {
        modalContent.innerHTML = mainContent.innerHTML;
      }
    }
    document.getElementById("info-modal").classList.add("active");
    this.gameManager.pauseGame();
  }

  closeInfoModal() {
    document.getElementById("info-modal").classList.remove("active");
    this.gameManager.resumeGame();
  }

  closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });

    if (this.gameManager && this.gameManager.resumeGame) {
      this.gameManager.resumeGame();
    }
  }

  updateStarsProgress(islandId) {
    const totalStars = 25; // 5 níveis × 5 estrelas cada
    let collectedStars = 0;

    // Conta quantas estrelas foram coletadas nesta ilha
    if (this.gameManager.unlockedLevels[islandId]) {
      for (let level = 1; level <= 5; level++) {
        if (this.gameManager.unlockedLevels[islandId][level]) {
          collectedStars += 5; // Cada nível completo dá 5 estrelas
        }
      }
    }

    // Atualiza o texto dentro da barra
    const progressText = document.getElementById("progress-text");
    if (progressText) {
      progressText.textContent = `${collectedStars}/${totalStars} estrelas`;
    }

    // Atualiza a barra de progresso
    const progressFill = document.getElementById("stars-progress-fill");
    const progressBar = document.getElementById("progress-bar");

    if (progressFill && progressBar) {
      const progressPercent = (collectedStars / totalStars) * 100;
      progressFill.style.width = `${progressPercent}%`;

      // Adiciona classe "full" quando estiver completa
      if (collectedStars === totalStars) {
        progressBar.classList.add("full");
      } else {
        progressBar.classList.remove("full");
      }
    }

    // Animação na estrela quando há progresso
    const starBadge = document.getElementById("star-badge");
    if (starBadge && collectedStars > 0) {
      starBadge.classList.add("pulse");
      setTimeout(() => {
        starBadge.classList.remove("pulse");
      }, 1000);
    }
  }
}
