class ScreenManager {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.currentScreen = null;
    this.previousScreen = null;
    this.currentIsland = null;
    this.currentLevel = 1;

    setTimeout(() => {
      this.init();
    }, 0);
  }

  init() {
    // Garantir que comece na tela inicial
    setTimeout(() => {
      if (!this.currentScreen || this.currentScreen !== "start-screen") {
        this.showScreen("start");
      }
    }, 100);

    document.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (action) {
        this.handleAction(action, e);
      }

      // Clique nas ilhas
      const islandCard = e.target.closest(".island-card");
      if (islandCard) {
        const islandId = islandCard.dataset.island;
        this.handleIslandSelected(islandId);
      }

      // Clique nos níveis
      const levelCard = e.target.closest(".level-card.unlocked");
      if (levelCard) {
        const level = parseInt(levelCard.dataset.level);
        this.handleLevelSelected(level);
      }
    });
  }

  // === NOVAS FUNÇÕES PARA PROGRESSO DAS ILHAS ===
  updateIslandsProgress() {
    const islandCards = document.querySelectorAll(".island-card");

    islandCards.forEach((card) => {
      const islandId = card.dataset.island;
      const progress = this.calculateIslandProgress(islandId);

      this.updateIslandCard(card, islandId, progress);
    });
  }

  calculateIslandProgress(islandId) {
    if (!this.gameManager || !ILHAS || !ILHAS[islandId]) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    const island = ILHAS[islandId];
    const totalLevels = Object.keys(island.levels).length;
    const unlockedLevels = this.gameManager.getUnlockedLevels(islandId);

    // O nível mais alto desbloqueado indica o progresso
    const completedLevels =
      unlockedLevels.length > 0 ? Math.max(...unlockedLevels) : 0;

    // Calcular porcentagem
    const percentage = Math.min(
      100,
      Math.round((completedLevels / totalLevels) * 100)
    );

    return {
      completed: completedLevels,
      total: totalLevels,
      percentage: percentage,
    };
  }

  updateIslandCard(card, islandId, progress) {
    const description = card.querySelector(".island-progress-text");
    const progressFill = card.querySelector(".island-progress-fill");
    const progressText = card.querySelector(".island-percentage");

    if (!description || !progressFill || !progressText) return;

    // Atualizar descrição
    if (progress.percentage === 100) {
      description.textContent = `🎉 Todos os ${progress.total} níveis completos!`;
    } else if (progress.percentage > 0) {
      description.textContent = `${progress.completed} de ${progress.total} níveis desbloqueados`;
    } else {
      description.textContent = `${progress.total} níveis de desafios esperando por você`;
    }

    // Atualizar barra de progresso
    progressFill.style.width = `${progress.percentage}%`;
    progressText.textContent = `${progress.percentage}%`;

    // Atualizar cor baseada no progresso
    progressFill.className = "island-progress-fill";
    if (progress.percentage === 100) {
      progressFill.classList.add("progress-complete");
    } else if (progress.percentage >= 70) {
      progressFill.classList.add("progress-high");
    } else if (progress.percentage >= 30) {
      progressFill.classList.add("progress-medium");
    } else {
      progressFill.classList.add("progress-low");
    }
  }

  // === FIM DAS NOVAS FUNÇÕES ===

  handleAction(action, e) {
    switch (action) {
      case "show-islands-screen":
        this.showScreen("islands");
        break;

      case "show-level-screen":
        this.showScreen("level");
        break;

      case "show-game-screen":
        this.showScreen("game");
        break;

      case "show-info-screen":
        this.previousScreen = this.currentScreen;
        this.showScreen("info");
        break;

      case "show-credits-screen":
        this.showScreen("credits");
        break;

      case "show-start-screen":
        this.showScreen("start");
        break;

      case "back-from-info":
        if (this.previousScreen) {
          const previousScreenId = this.previousScreen.replace("-screen", "");
          this.showScreen(previousScreenId);
          this.previousScreen = null;
        } else {
          this.showScreen("start");
        }
        break;
    }
  }

  handleIslandSelected(islandId) {
    if (typeof ILHAS === "undefined") {
      console.error("❌ ILHAS não está definido!");
      return;
    }

    if (this.gameManager) {
      this.gameManager.currentIsland = islandId;

      // Atualizar o nome da ilha na tela de níveis
      const themeNameElement = document.getElementById("current-theme-name");
      if (themeNameElement && ILHAS[islandId]) {
        themeNameElement.textContent = ILHAS[islandId].name;
      }
    }

    this.showScreen("level");

    setTimeout(() => {
      if (this.gameManager && this.gameManager.renderLevelsPath) {
        this.gameManager.renderLevelsPath(islandId);
      }
    }, 100);
  }

  handleLevelSelected(level) {
    if (this.gameManager) {
      // Verificar se o nível está desbloqueado
      if (!this.gameManager.isLevelUnlocked(level)) {
        this.gameManager.showFeedback(
          "🔒 Este nível ainda está bloqueado!",
          "error"
        );
        return;
      }

      this.gameManager.startLevel(level);
      this.showScreen("game");
    }
  }

  showScreen(screenId) {
    const mainScreens = document.querySelectorAll(".screen:not(.modal)");
    mainScreens.forEach((screen) => {
      screen.classList.remove("active");
      screen.style.display = "none";
    });

    // Mostrar a tela solicitada
    const targetScreen = document.getElementById(`${screenId}-screen`);
    if (targetScreen) {
      targetScreen.classList.add("active");
      targetScreen.style.display = "flex";
      this.currentScreen = `${screenId}-screen`;
    } else {
      console.error("❌ Tela não encontrada:", `${screenId}-screen`);
      this.showScreen("start");
    }

    // Ações específicas para cada tela
    switch (screenId) {
      case "level":
        if (this.gameManager && this.gameManager.renderLevelsPath) {
          // Só renderizar se tiver uma ilha selecionada
          if (this.gameManager.currentIsland) {
            setTimeout(() => {
              this.gameManager.renderLevelsPath(this.gameManager.currentIsland);
            }, 50);
          }
        }
        break;

      case "game":
        if (this.gameManager && this.gameManager.showCurrentExercise) {
          setTimeout(() => {
            this.gameManager.showCurrentExercise();
          }, 50);
        }
        break;

      case "islands":
        setTimeout(() => {
          this.updateIslandsProgress();
        }, 100);
        break;

      case "start":
        if (this.gameManager) {
          this.gameManager.currentIsland = null;
          this.gameManager.currentLevel = 1;
        }
        break;
    }
  }

  getCurrentScreen() {
    return this.currentScreen;
  }
}
