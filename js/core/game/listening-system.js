class ListeningSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.isActive = true;
    this.selectedOption = null;
    this.currentAudio = "";
    this.audioElement = null;
    this.isAnswered = false;

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (!this.isActive) return;

      // Botões de áudio
      if (e.target.closest(".play-audio-btn, .replay-audio-btn")) {
        this.handleAudioButtonClick(e.target.closest("button"));
        return;
      }

      // Opções de resposta
      if (e.target.closest(".listening-option")) {
        this.handleOptionClick(e.target.closest(".listening-option"));
        return;
      }

      // Botão de verificar
      if (e.target.closest(".check-button")) {
        this.handleCheckButton();
        return;
      }
    });
  }

  handleAudioButtonClick(button) {
    const audioUrl = button.dataset.audio;
    const textToSpeak = button.dataset.text;

    if (audioUrl) {
      this.playAudioFromFile(audioUrl);
    } else if (textToSpeak) {
      this.playAudioWithTTS(textToSpeak);
    }
  }

  handleOptionClick(option) {
    if (this.isAnswered) return;

    // Remover seleção anterior
    document.querySelectorAll(".listening-option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    // Selecionar nova opção
    option.classList.add("selected");
    this.selectedOption = option;
  }

  handleCheckButton() {
    // REMOVIDO: Não mostrar feedback aqui - deixe o GameManager fazer isso
    if (!this.selectedOption) {
      // Deixe o GameManager lidar com o feedback
      return false;
    }

    this.isAnswered = true;
    const isCorrect = this.selectedOption.dataset.correct === "true";

    // Mostrar resultado visual
    this.showResult(isCorrect);

    // Desabilitar mais interações
    document.querySelectorAll(".listening-option").forEach((opt) => {
      opt.style.pointerEvents = "none";
    });

    // Parar áudio se estiver tocando
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }

    // Não notificar GameManager aqui - ele já fará isso
    return isCorrect;
  }

  // MÉTODO checkAnswer para ser chamado pelo GameManager
  checkAnswer(exerciseData) {
    if (!this.selectedOption) {
      this.gameManager.feedbackSystem.showSelectOption();
      return false;
    }

    const isCorrect = this.selectedOption.dataset.correct === "true";

    if (this.isAnswered === false) {
      this.isAnswered = true;

      // APENAS aplicar classes CSS - sem criar HTML
      if (isCorrect) {
        this.selectedOption.classList.add("correct");
      } else {
        this.selectedOption.classList.add("incorrect");

        // Mostrar opção correta em caso de erro
        document.querySelectorAll(".listening-option").forEach((opt) => {
          if (opt.dataset.correct === "true") {
            opt.classList.add("correct");
          }
        });
      }

      // Desabilitar interações
      document.querySelectorAll(".listening-option").forEach((opt) => {
        opt.style.pointerEvents = "none";
      });

      // Parar áudio
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }
    }

    return isCorrect;
  }

  playAudioFromFile(audioUrl) {
    // Parar áudio anterior se existir
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }

    // Criar novo elemento de áudio
    this.audioElement = new Audio(audioUrl);

    // Efeitos visuais
    const audioStatus = document.querySelector(".audio-status");
    const wave = document.querySelector(".audio-wave");
    const statusText = document.querySelector(".status-text");

    if (audioStatus && wave && statusText) {
      audioStatus.classList.add("audio-playing");
      statusText.textContent = "Ouvindo...";
      wave.style.display = "flex";

      this.audioElement.onended = () => {
        audioStatus.classList.remove("audio-playing");
        statusText.textContent = "Áudio concluído";
        setTimeout(() => {
          statusText.textContent = "Clique para ouvir novamente";
          wave.style.display = "none";
        }, 1000);
      };

      this.audioElement.onerror = () => {
        audioStatus.classList.remove("audio-playing");
        statusText.textContent = "Erro ao carregar áudio";
        wave.style.display = "none";
        console.error("Erro ao carregar áudio:", audioUrl);
      };
    }

    // Tocar áudio
    this.audioElement.play().catch((error) => {
      console.error("Erro ao reproduzir áudio:", error);
      if (statusText) {
        statusText.textContent = "Erro: clique para tentar novamente";
      }
    });
  }

  playAudioWithTTS(text) {
    // Parar qualquer áudio anterior
    if (this.audioElement) {
      if (this.audioElement.pause) this.audioElement.pause();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }

    // Usar Web Speech API
    if (!window.speechSynthesis) {
      console.error("Web Speech API não suportada");
      alert("Seu navegador não suporta síntese de voz!");
      return;
    }

    // Criar utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.volume = 1;
    utterance.pitch = 1;

    // Efeitos visuais
    const audioStatus = document.querySelector(".audio-status");
    const wave = document.querySelector(".audio-wave");
    const statusText = document.querySelector(".status-text");

    if (audioStatus && wave && statusText) {
      audioStatus.classList.add("audio-playing");
      statusText.textContent = "Ouvindo...";
      wave.style.display = "flex";

      utterance.onstart = () => {
        wave.style.display = "flex";
      };

      utterance.onend = () => {
        audioStatus.classList.remove("audio-playing");
        statusText.textContent = "Áudio concluído";
        setTimeout(() => {
          statusText.textContent = "Clique para ouvir novamente";
          wave.style.display = "none";
        }, 1000);
      };

      utterance.onerror = (event) => {
        audioStatus.classList.remove("audio-playing");
        statusText.textContent = "Erro na síntese de voz";
        wave.style.display = "none";
        console.error("Erro na síntese de voz:", event);
      };
    }

    // Tocar áudio
    window.speechSynthesis.speak(utterance);
  }

  showResult(isCorrect) {
    const feedback = document.querySelector(".listening-feedback");
    const feedbackContent = document.querySelector(".feedback-content");

    if (feedback) feedback.style.display = "block";

    if (isCorrect) {
      this.selectedOption.classList.add("correct");
      if (feedbackContent) {
        feedbackContent.innerHTML = `
          <div style="color: #2ecc71; font-weight: bold;">
            ✅ <span style="font-size: 1.2rem;">Correto!</span>
          </div>
        `;
      }
    } else {
      this.selectedOption.classList.add("incorrect");

      // Mostrar opção correta
      document.querySelectorAll(".listening-option").forEach((opt) => {
        if (opt.dataset.correct === "true") {
          opt.classList.add("correct");
        }
      });

      if (feedbackContent) {
        feedbackContent.innerHTML = `
          <div style="color: #e74c3c; font-weight: bold;">
            ❌ <span style="font-size: 1.2rem;">Incorreto</span>
          </div>
        `;
      }
    }
  }

  checkAnswer(exerciseData) {
    if (!this.selectedOption) {
      this.gameManager.feedbackSystem.showSelectOption();
      return false;
    }

    return this.selectedOption.dataset.correct === "true";
  }

  activate(exerciseData = null) {
    this.isActive = true;
    this.isAnswered = false;
    this.selectedOption = null;

    // NÃO tocar áudio automaticamente - só quando o jogador clicar
    if (exerciseData?.audio) {
      this.currentAudio = exerciseData.audio;
    } else if (exerciseData?.text_to_speak) {
      this.currentText = exerciseData.text_to_speak;
    }
  }

  deactivate() {
    this.isActive = false;

    // Parar áudio de arquivo
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }

    // Parar síntese de voz
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  cleanup() {
    this.deactivate();
    this.selectedOption = null;
    this.isAnswered = false;
    this.audioElement = null;
    this.currentAudio = "";
    this.currentText = "";
  }

  pause() {
    // Parar áudio de arquivo
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }

    // Parar síntese de voz
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    // Retomar áudio de arquivo
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play();
    }

    // Retomar síntese de voz
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}
