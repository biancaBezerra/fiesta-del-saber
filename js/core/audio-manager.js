class SoundManager {
  constructor() {
    this.sounds = {};
    // Carregar estado do mute do localStorage
    this.isMuted = localStorage.getItem("soundMuted") === "true";
    this.init();
  }

  init() {
    // Sons principais que vamos usar
    this.sounds = {
      "background-music": new Audio(
        "../../assets/components/background-music.mp3"
      ),
      "correct-match": new Audio("../../assets/components/correct-sound.mp3"),
      "incorrect-match": new Audio(
        "../../assets/components/incorrect-sound.mp3"
      ),
    };

    // Configurar música de fundo (volume mais baixo)
    this.sounds["background-music"].loop = true;
    this.sounds["background-music"].volume = 0.3;

    // Configurar sons de efeito (volume mais alto)
    this.sounds["correct-match"].volume = 0.8;
    this.sounds["incorrect-match"].volume = 0.8;
  }

  play(soundName) {
    if (this.isMuted || !this.sounds[soundName]) return;

    try {
      // Para a música de fundo, usar o mesmo audio para loop
      if (soundName === "background-music") {
        this.sounds[soundName].play();
      } else {
        // Para outros sons, criar clone para evitar conflitos
        const sound = this.sounds[soundName].cloneNode();
        sound.volume = this.sounds[soundName].volume;
        sound.play();
      }
    } catch (error) {
      console.log("Erro ao tocar som:", error);
    }
  }

  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    // Salvar estado no localStorage
    localStorage.setItem("soundMuted", this.isMuted);

    if (this.isMuted) {
      this.stopAll();
    } else {
      // Tocar música de fundo se estiver em uma página apropriada
      this.playBackgroundMusic();
    }

    // Atualizar todos os botões de mute na página
    this.updateMuteButtons();

    return this.isMuted;
  }

  playBackgroundMusic() {
    if (!this.isMuted) {
      setTimeout(() => {
        this.play("background-music");
      }, 1000);
    }
  }

  stopBackgroundMusic() {
    this.stop("background-music");
  }

  // NOVOS MÉTODOS PARA OS SONS DE FEEDBACK
  playCorrectSound() {
    this.play("correct-match");
  }

  playIncorrectSound() {
    this.play("incorrect-match");
  }

  updateMuteButtons() {
    // SELECIONAR TODOS OS BOTÕES MUTE
    const muteBtns = document.querySelectorAll(".global-mute-btn");

    muteBtns.forEach((muteBtn) => {
      if (muteBtn) {
        const hasMuteStructure = muteBtn.querySelector(".global-mute-icon");

        if (hasMuteStructure) {
          muteBtn.querySelector(".mute-icon").textContent = this.isMuted
            ? "🔇"
            : "🔊";
        } else {
          muteBtn.textContent = this.isMuted ? "🔇" : "🔊";
        }
      }
    });
  }

  // Método para inicializar quando a página carrega
  initializePage() {
    this.updateMuteButtons();
    this.setupMuteButton();
    this.playBackgroundMusic();
  }

  // Configurar o event listener para o botão de mute
  setupMuteButton() {
    // CONFIGURAR TODOS OS BOTÕES MUTE
    const muteBtns = document.querySelectorAll(".global-mute-btn");

    muteBtns.forEach((muteBtn) => {
      if (muteBtn && !muteBtn.hasAttribute("data-listener-added")) {
        muteBtn.setAttribute("data-listener-added", "true");
        muteBtn.addEventListener("click", () => {
          this.toggleMute();
        });

        // REMOVER qualquer style inline
        muteBtn.removeAttribute("style");
      }
    });
  }
}

// Criar instância global
window.soundManager = new SoundManager();

// Inicializar automaticamente quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  window.soundManager.initializePage();
});
