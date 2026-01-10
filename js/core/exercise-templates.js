// Templates para TODOS os tipos de exercício EXISTENTES
// ✅ SISTEMA DE TIMER UNIVERSAL
function createTimedExerciseWrapper(exercise, content) {
  // ✅ CORREÇÃO: exercise já é o content, então busca timeLimit diretamente
  const timeLimit = exercise.timeLimit || 60;

  return `
    <div class="timed-exercise-wrapper">
      <div class="exercise-timer" id="exercise-timer">
        ⏱️ <span class="timer-seconds">${timeLimit}</span>s
      </div>
      ${content}
    </div>
  `;
}

function startExerciseTimer(timeLimit, onTimeUp) {
  const timerElement = document.querySelector(".exercise-timer");
  const secondsElement = timerElement.querySelector(".timer-seconds");

  let timeLeft = timeLimit;

  const timer = setInterval(() => {
    timeLeft--;
    secondsElement.textContent = timeLeft;

    // Efeitos visuais
    if (timeLeft <= 10) {
      timerElement.classList.add("danger");
    } else if (timeLeft <= 20) {
      timerElement.classList.add("warning");
    }

    // Tempo esgotado
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (onTimeUp) onTimeUp();
    }
  }, 1000);

  return timer; // Retorna para poder parar se necessário
}

// Templates para TODOS os tipos de exercício EXISTENTES
const EXERCISE_TEMPLATES = {
  // 📝 Exercício de Escolha Múltipla
  "multiple-choice": (exercise) => {
    const content = `
      <div class="exercise-container multiple-choice">
        <div class="question">${exercise.question}</div>
        <div class="options-container">
          ${exercise.options
            .map(
              (option, index) => `
            <div class="option" data-index="${index}">${option}</div>
          `
            )
            .join("")}
        </div>
        <button class="check-button">Verificar</button>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // ✍️ Complete a Frase
  "fill-blank": (exercise) => {
    const content = `
      <div class="exercise-container fill-blank">
      <div class="match-instructions">Complete com um desses: am – is – are</div>
        <div class="sentence">${exercise.sentence.replace(
          "___",
          '<span class="blank-placeholder">_____</span>'
        )}</div>
        
        <div class="input-container">
          <input type="text" class="blank-input" placeholder="Digite a resposta...">
          
          ${
            exercise.hint
              ? `
            <div class="hint-section">
              <button class="hint-button">💡 Mostrar Dica</button>
              <div class="hint-content" style="display: none;">
                <strong>Dica:</strong> ${exercise.hint}
              </div>
            </div>
          `
              : ""
          }
        </div>
        
        <button class="check-button">Verificar</button>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // 🔤 Combinação de Palavras
  "word-match": (exercise) => {
    const words = exercise.pairs.map((pair) => pair.word);
    const translations = exercise.pairs.map((pair) => pair.translation);

    const content = `
      <div class="exercise-container word-match">
        <div class="match-instructions">Arraste as palavras para suas traduções corretas</div>
        <div class="words-container">
          ${words
            .map(
              (word) => `
            <div class="word-item draggable" data-word="${word}">${word}</div>
          `
            )
            .join("")}
        </div>
        <div class="translations-container">
          ${translations
            .sort(() => Math.random() - 0.5)
            .map(
              (translation) => `
            <div class="translation-slot" data-translation="${translation}">
              <div class="slot-placeholder">${translation}</div>
            </div>
          `
            )
            .join("")}
        </div>
        <button class="check-button">Verificar</button>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // 🖼️ Combinação de Imagens
  "picture-match": (exercise) => {
    const words = exercise.pairs.map((pair) => pair.word);
    const emojis = exercise.pairs.map((pair) => pair.image);

    // Embaralhar as palavras
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    const content = `
    <div class="exercise-container picture-match">
        <div class="match-instructions">Combine cada palavra com sua imagem correspondente</div>
        <div class="picture-match-container">
            <!-- COLUNA DE PALAVRAS -->
            <div class="picture-words-column">
                <h3>Palavras</h3>
                ${shuffledWords
                  .map(
                    (word) => `
                    <div class="picture-word" data-word="${word}">
                        ${word}
                    </div>
                    `
                  )
                  .join("")}
            </div>

            <!-- COLUNA DE IMAGENS -->
            <div class="picture-images-column">
                <h3>Imagens</h3>
                ${emojis
                  .map(
                    (emoji) => `
                    <div class="picture-image" data-emoji="${emoji}">
                        <div class="emoji-display">${emoji}</div>
                    </div>
                    `
                  )
                  .join("")}
            </div>
        </div>
        <button class="check-button">Verificar</button>
    </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // 🌐 Exercício de Tradução MELHORADO
  translation: (exercise) => {
    const content = `
      <div class="exercise-container translation">
        <div class="question">Traduza para português:</div>
        <div class="text-to-translate">"${exercise.question}"</div>
        <div class="input-container">
          <textarea 
            class="translation-input" 
            placeholder="Digite sua tradução aqui..."
            rows="4"
          ></textarea>
          <div class="input-instructions">
            💡 Dica: Pressione Enter para verificar • Shift+Enter para nova linha
          </div>
          <button class="check-button">Verificar Tradução</button>
        </div>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // 😊 Tradução com Emojis
  "emoji-translation": (exercise) => {
    const content = `
      <div class="exercise-container emoji-translation">
        <div class="question">Escolha a alternativa que mais se encaixa:</div>
        <div class="emoji-translation-display">${exercise.question}</div>
        <div class="options-container">
          ${exercise.options
            .map(
              (option, index) => `
            <div class="option" data-index="${index}">${option}</div>
          `
            )
            .join("")}
        </div>
        <button class="check-button">Verificar</button>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  // 🔄 Ordene as Palavras
  "word-order": (exercise) => {
    const shuffledWords = [...exercise.words].sort(() => Math.random() - 0.5);

    const content = `
      <div class="exercise-container word-order">
        <div class="match-instructions">Arraste as palavras para a área abaixo e forme a frase correta:</div>
        
        <div class="words-container">
          ${shuffledWords
            .map(
              (word) => `
            <div class="word-item" data-word="${word}">${word}</div>
          `
            )
            .join("")}
        </div>
        
        <div class="sentence-area"></div>
        
        <div class="sentence-preview">Monte a frase acima ↑</div>
        
        <button class="check-button">Verificar Frase</button>
      </div>
    `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, content)
      : content;
  },

  /// 🔊 Exercício de Audição
  listening: (exercise) => {
    // SEMPRE embaralhar as opções
    const options = [...exercise.options].sort(() => Math.random() - 0.5);

    const hasAudioFile = exercise.audio;
    const audioSource = hasAudioFile ? exercise.audio : exercise.text_to_speak;
    const dataAttribute = hasAudioFile
      ? `data-audio="${audioSource}"`
      : `data-text="${audioSource}"`;

    const baseContent = `
    <div class="exercise-container listening-exercise">
      <div class="listening-header">
        <div class="question">Ouça o áudio e escolha a alternativa correta:</div>
      </div>
      
      <!-- ÁREA DO ÁUDIO -->
      <div class="audio-player-section">
        <div class="audio-controls">
          <button class="play-audio-btn" ${dataAttribute}>
            <span class="play-icon">▶️</span> Reproduzir Áudio
          </button>
        </div>
        <div class="audio-status">
          <span class="status-text">Clique para ouvir</span>
          <div class="audio-wave" style="display: none;">
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
            <div class="wave-bar"></div>
          </div>
        </div>
      </div>
      
      <!-- OPÇÕES DE RESPOSTA -->
      <div class="listening-options-container">
        ${options
          .map(
            (option, index) => `
            <div class="listening-option" data-index="${index}" data-correct="${option.correct}">
              <div class="option-text">${option.text}</div>
            </div>
          `
          )
          .join("")}
      </div>
      
      <!-- CONTROLES -->
      <div class="listening-controls">
        <button class="check-button">Verificar Resposta</button>
      </div>
    </div>
  `;

    return exercise.timeLimit
      ? createTimedExerciseWrapper(exercise, baseContent)
      : baseContent;
  },
};
