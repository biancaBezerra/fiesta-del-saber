class InformacoesSystem {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.codigosDetalhados = {
      // EDUCAÇÃO INFANTIL / ANOS INICIAIS - PERCEPÇÃO E ASSOCIAÇÃO
      EI03TS01: {
        codigo: "EI03TS01",
        unidade: "TRAÇOS, SONS, CORES E FORMAS",
        habilidade:
          "RECONHECER SEMELHANÇAS E DIFERENÇAS ENTRE OBJETOS, FORMAS E FIGURAS.",
        conhecimento: "FORMAS GEOMÉTRICAS E RECONHECIMENTO VISUAL",
        aplicacao:
          "O JOGADOR OBSERVA A IMAGEM E IDENTIFICA SUA SILHUETA CORRESPONDENTE, RECONHECENDO SIMILARIDADES E DIFERENÇAS ENTRE CONTORNOS.",
      },
      EI03EF01: {
        codigo: "EI03EF01",
        unidade: "ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES",
        habilidade:
          "ESTABELECER RELAÇÕES DE COMPARAÇÃO E CORRESPONDÊNCIA ENTRE OBJETOS.",
        conhecimento: "RELAÇÕES ESPACIAIS E DE SEMELHANÇA",
        aplicacao:
          "AO ARRASTAR A FIGURA ATÉ SUA SOMBRA, A CRIANÇA ASSOCIA FORMA E POSIÇÃO, DESENVOLVENDO PERCEPÇÃO ESPACIAL E COMPARAÇÃO VISUAL.",
      },

      // EDUCAÇÃO FÍSICA / DESENVOLVIMENTO PSICOMOTOR
      EF01EF03: {
        codigo: "EF01EF03",
        unidade: "CORPO, GESTOS E MOVIMENTOS",
        habilidade:
          "APERFEIÇOAR PROGRESSIVAMENTE A COORDENAÇÃO MOTORA FINA POR MEIO DE ATIVIDADES E JOGOS.",
        conhecimento:
          "COORDENAÇÃO MOTORA FINA E USO DE TECNOLOGIAS EDUCACIONAIS",
        aplicacao:
          "O JOGADOR REALIZA MOVIMENTOS DE ARRASTAR E SOLTAR, APRIMORANDO A COORDENAÇÃO MOTORA FINA E A INTERAÇÃO COM ELEMENTOS DIGITAIS.",
      },

      // TECNOLOGIA E COMPUTAÇÃO – INTERAÇÃO COM INTERFACES DIGITAIS
      PC1EF02: {
        codigo: "PC1EF02",
        unidade: "PENSAMENTO COMPUTACIONAL",
        habilidade:
          "INTERAGIR COM INTERFACES DIGITAIS, UTILIZANDO ARRASTAR E SOLTAR PARA RESOLUÇÃO DE DESAFIOS.",
        conhecimento: "INTERAÇÃO DIGITAL E RESOLUÇÃO DE PROBLEMAS",
        aplicacao:
          "O JOGADOR UTILIZA COMANDOS DE ARRASTAR E SOLTAR PARA ASSOCIAR IMAGENS, DESENVOLVENDO COORDENAÇÃO E COMPREENSÃO DE ALGORITMOS SIMPLES.",
      },
      EF05MA15: {
        codigo: "EF05MA15",
        unidade: "PENSAMENTO COMPUTACIONAL E RESOLUÇÃO DE PROBLEMAS",
        habilidade:
          "DESENVOLVER ESTRATÉGIAS PARA SOLUCIONAR DESAFIOS USANDO LÓGICA E SEQUENCIAMENTO.",
        conhecimento: "PLANEJAMENTO LÓGICO E TOMADA DE DECISÃO",
        aplicacao:
          "O JOGADOR ANALISA E TESTA HIPÓTESES AO ENCONTRAR A CORRESPONDÊNCIA CORRETA ENTRE IMAGEM E SOMBRA.",
      },

      // MATEMÁTICA – GEOMETRIA E RACIOCÍNIO ESPACIAL
      EF01MA12: {
        codigo: "EF01MA12",
        unidade: "GEOMETRIA",
        habilidade:
          "RECONHECER, NOMEAR E COMPARAR FIGURAS GEOMÉTRICAS PLANAS EM DIFERENTES POSIÇÕES E TAMANHOS.",
        conhecimento: "FORMAS GEOMÉTRICAS PLANAS",
        aplicacao:
          "AS IMAGENS (ANIMAIS, FRUTAS, OBJETOS) POSSUEM SILHUETAS COM DIFERENTES FORMAS GEOMÉTRICAS, QUE O JOGADOR IDENTIFICA AO FAZER A CORRESPONDÊNCIA CORRETA.",
      },
      EF02MA13: {
        codigo: "EF02MA13",
        unidade: "GEOMETRIA",
        habilidade:
          "DESCREVER E REPRESENTAR A LOCALIZAÇÃO E MOVIMENTAÇÃO DE OBJETOS NO ESPAÇO, UTILIZANDO VOCABULÁRIO APROPRIADO.",
        conhecimento: "LOCALIZAÇÃO E MOVIMENTO NO PLANO",
        aplicacao:
          "O JOGADOR ARRASTA AS FIGURAS ATÉ SUAS SOMBRAS, PRATICANDO NOÇÕES ESPACIAIS COMO 'ACIMA', 'ABAIXO', 'AO LADO' E 'SOBRE'.",
      },

      // LINGUAGENS – ARTES VISUAIS
      EF15AR03: {
        codigo: "EF15AR03",
        unidade: "ARTES VISUAIS",
        habilidade:
          "EXPERIMENTAR E RECONHECER ELEMENTOS VISUAIS (COR, FORMA, TEXTURA, LINHA) EM DIFERENTES CONTEXTOS.",
        conhecimento: "ELEMENTOS VISUAIS DA ARTE",
        aplicacao:
          "AO OBSERVAR IMAGENS DE CATEGORIAS VARIADAS (ANIMAIS, FRUTAS, NATUREZA), O JOGADOR RECONHECE FORMAS E CORES, DESENVOLVENDO PERCEPÇÃO ESTÉTICA E VISUAL.",
      },
    };

    this.init();
  }

  init() {}

  showSkillDetails(code) {
    const detalhe = this.codigosDetalhados[code];
    if (!detalhe) {
      console.error("Código BNCC não encontrado:", code);
      return;
    }

    try {
      // FUNÇÃO PARA CRIAR TÍTULO RAINBOW
      this.createRainbowTitle(detalhe.codigo);

      // Atualizar conteúdo do modal
      // document.querySelector(".modal-title").textContent = detalhe.codigo;
      document.getElementById("modalSubtitle").textContent = "Detalhes da BNCC";
      document.getElementById("unidade").textContent = detalhe.unidade;
      document.getElementById("habilidade").textContent = detalhe.habilidade;
      document.getElementById("conhecimento").textContent = detalhe.conhecimento;
      document.getElementById("aplicacao").textContent = detalhe.aplicacao;

      // Mostrar modal
      const modal = document.getElementById("skill-modal");
      if (modal) {
        modal.classList.add("active");

        // Pausar jogo se estiver em alguma tela de jogo
        if (this.gameManager && this.gameManager.pauseGame) {
          this.gameManager.pauseGame();
        }
      } else {
        console.error("Modal de habilidade não encontrado");
      }
    } catch (error) {
      console.error("Erro ao mostrar detalhes da habilidade:", error);
    }
  }

  // CRIAR TÍTULO COM EFEITO RAINBOW
  createRainbowTitle(text) {
    const modalTitle = document.querySelector(".modal-title");
    
    if (!modalTitle) {
      console.error("Elemento .modal-title não encontrado");
      return;
    }
    
    // Limpar conteúdo atual
    modalTitle.innerHTML = '';
    
    // Quebrar cada caractere em spans individuais
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      modalTitle.appendChild(span);
    }
  }

  closeSkillModal() {
    const modal = document.getElementById("skill-modal");
    if (modal) {
      modal.classList.remove("active");

      // Retomar jogo se estava pausado
      if (this.gameManager && this.gameManager.resumeGame) {
        this.gameManager.resumeGame();
      }
    }
  }
}
