const ILHAS = {
  numbers: {
    id: "numbers",
    name: "Ilha dos números",
    description: "Números, contagem e operações matemáticas",
    levels: {
      1: {
        name: "Fácil",
        exercises: [
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[0],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[0],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[0],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[0],
          },
          // INSERIDO: Listening para Ilha dos Números (Fácil)
          {
            type: "listening",
            content: LISTENING_TYPE.objects[0], // "Bom dia"
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[0],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[1], // "Eu estou com fome"
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[1],
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[0],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[1],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[1],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[1],
          },
          // INSERIDO: Mais listening (Fácil)
          {
            type: "listening",
            content: LISTENING_TYPE.objects[2], // "Como você está?"
          },
        ],
      },
      2: {
        name: "Médio",
        exercises: [
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[2],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[3],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[2],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[2],
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[1],
          },
          // INSERIDO: Listening para Ilha dos Números (Médio)
          {
            type: "listening",
            content: LISTENING_TYPE.objects[3], // "Eu tenho um cachorro"
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[1],
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[3],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[4],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[3],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[3],
          },
          // INSERIDO: Mais listening (Médio)
          {
            type: "listening",
            content: {
              ...LISTENING_TYPE.objects[4], // "Eu moro no Brasil"
              timeLimit: 30,
            },
          },
        ],
      },
      3: {
        name: "Difícil",
        exercises: [
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[4],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[5],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[4],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[4],
          },
          // INSERIDO: Listening para Ilha dos Números (Difícil)
          {
            type: "listening",
            content: {
              ...LISTENING_TYPE.objects[5], // "Eu gosto de jogar futebol"
              timeLimit: 25,
            },
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[2],
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[2],
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[5],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[6],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[5],
          },
          // INSERIDO: Mais listening (Difícil)
          {
            type: "listening",
            content: {
              ...LISTENING_TYPE.objects[6], // "Ele está estudando inglês"
              timeLimit: 30,
            },
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[5],
          },
        ],
      },
      4: {
        name: "Expert",
        exercises: [
          {
            type: "emoji-translation",
            content: { ...EMOJI_TYPE.objects[6], timeLimit: 30 },
          },
          {
            type: "multiple-choice",
            content: { ...MULTIPLE_CHOICE_TYPE.objects[7], timeLimit: 30 },
          },
          {
            type: "picture-match",
            content: { ...PICTURE_MATCH_TYPE.objects[6], timeLimit: 50 },
          },
          {
            type: "translation",
            content: { ...TRANSLATION_TYPE.objects[6], timeLimit: 60 },
          },
          // INSERIDO: Listening Expert para Ilha dos Números
          {
            type: "listening",
            content: {
              ...LISTENING_TYPE.objects[7], // "Nós vamos ao cinema"
              timeLimit: 35,
            },
          },
          {
            type: "word-match",
            content: { ...WORD_MATCH_TYPE.objects[3], timeLimit: 40 },
          },
          {
            type: "word-order",
            content: { ...WORD_ORDER_TYPE.objects[3], timeLimit: 60 },
          },
          {
            type: "emoji-translation",
            content: { ...EMOJI_TYPE.objects[7], timeLimit: 30 },
          },
          {
            type: "multiple-choice",
            content: { ...MULTIPLE_CHOICE_TYPE.objects[8], timeLimit: 30 },
          },
          // INSERIDO: Mais listening Expert
          {
            type: "listening",
            content: {
              ...LISTENING_TYPE.objects[8], // "O tempo está muito quente"
              timeLimit: 30,
            },
          },
          {
            type: "word-match",
            content: { ...WORD_MATCH_TYPE.objects[4], timeLimit: 60 },
          },
          {
            type: "word-order",
            content: { ...WORD_ORDER_TYPE.objects[4], timeLimit: 60 },
          },
        ],
      },
    },
  },

  verbs: {
    id: "verbs",
    name: "Ilha dos Verbos",
    description: "Ações, conjugação e frases",
    levels: {
      1: {
        name: "Fácil",
        exercises: [
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[0],
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[9],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[9],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[9],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[9],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[9],
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[9],
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[9],
          },
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[1],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[10],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[10],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[10],
            timeLimit: 40,
          },
        ],
      },
      2: {
        name: "Médio",
        exercises: [
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[2],
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[10],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[11],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[11],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[10],
          },

          {
            type: "listening",
            content: LISTENING_TYPE.objects[11],
            timeLimit: 45,
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[10],
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[10],
          },
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[3],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[12],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[12],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[12],
          },
        ],
      },
      3: {
        name: "Difícil",
        exercises: [
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[4],
          },
          {
            type: "emoji-translation",
            content: EMOJI_TYPE.objects[11],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[13],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[13],
          },
          {
            type: "translation",
            content: TRANSLATION_TYPE.objects[11],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[13],
          },
          {
            type: "word-match",
            content: WORD_MATCH_TYPE.objects[11],
          },
          {
            type: "word-order",
            content: WORD_ORDER_TYPE.objects[11],
          },
          {
            type: "fill-blank",
            content: FILL_BLANK_TYPE.objects[5],
          },
          {
            type: "multiple-choice",
            content: MULTIPLE_CHOICE_TYPE.objects[14],
          },
          {
            type: "picture-match",
            content: PICTURE_MATCH_TYPE.objects[14],
          },
          {
            type: "listening",
            content: LISTENING_TYPE.objects[14],
          },
        ],
      },
      4: {
        name: "Expert",
        exercises: [
          {
            type: "fill-blank",
            content: { ...FILL_BLANK_TYPE.objects[6], timeLimit: 50 },
          },
          {
            type: "emoji-translation",
            content: { ...EMOJI_TYPE.objects[12], timeLimit: 45 },
          },
          {
            type: "multiple-choice",
            content: { ...MULTIPLE_CHOICE_TYPE.objects[15], timeLimit: 40 },
          },
          {
            type: "picture-match",
            content: { ...PICTURE_MATCH_TYPE.objects[15], timeLimit: 60 },
          },
          {
            type: "translation",
            content: { ...TRANSLATION_TYPE.objects[12], timeLimit: 70 },
          },
          {
            type: "listening",
            content: { ...LISTENING_TYPE.objects[10], timeLimit: 35 },
          },
          {
            type: "word-match",
            content: { ...WORD_MATCH_TYPE.objects[12], timeLimit: 65 },
          },
          {
            type: "word-order",
            content: { ...WORD_ORDER_TYPE.objects[12], timeLimit: 75 },
          },
          {
            type: "fill-blank",
            content: { ...FILL_BLANK_TYPE.objects[7], timeLimit: 50 },
          },
          {
            type: "multiple-choice",
            content: { ...MULTIPLE_CHOICE_TYPE.objects[16], timeLimit: 40 },
          },
          {
            type: "word-match",
            content: { ...WORD_MATCH_TYPE.objects[13], timeLimit: 65 },
          },
          {
            type: "listening",
            content: { ...LISTENING_TYPE.objects[11], timeLimit: 45 },
          },
        ],
      },
    },
  },
};
