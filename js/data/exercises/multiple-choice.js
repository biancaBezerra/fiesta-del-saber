const MULTIPLE_CHOICE_TYPE = {
  id: "multiple-choice",
  name: "Escolha Múltipla",
  image: "...",
  objects: [
    // === ILHA DOS NUMEROS ===
    {
      question: "Como se diz 'one' em português?",
      options: ["Um", "Dois", "Três", "Quatro"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },
    {
      question: "Como se diz 'dez' em inglês?",
      options: ["Ten", "Five", "Two", "Four"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },
    {
      question: "Como se diz 'three' em português?",
      options: ["Três", "Cinco", "Dois", "Quatro"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },

    {
      question: "Como se diz 'doze' em inglês?",
      options: ["Twelve", "Twenty", "Two", "Ten"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },
    {
      question: "Qual é 'twenty' em português?",
      options: ["Vinte", "Treze", "Dez", "Trinta"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },
    {
      question: "Como se diz 'quatorze' em inglês?",
      options: ["Fourteen", "Forty", "Four", "Twenty-four"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },

    {
      question: "Como se diz 'trinta' em inglês?",
      options: ["Thirty", "Thirteen", "Three", "Thirty-three"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },
    {
      question: "Qual é 'forty' em português?",
      options: ["Quarenta", "Quatorze", "Quatro", "Quarenta e quatro"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },
    {
      question: "Como se diz 'cinquenta' em inglês?",
      options: ["Fifty", "Fifteen", "Five", "Five-teen"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },

    // === ILHA DOS VERBOS ===

    // FÁCIL - Verbs
    {
      question: "O que é 'to run' em português?",
      options: ["Andar", "Nadar", "Correr", "Pular"],
      correctIndex: 2,
      difficulty: "easy",
      island: "verbs",
    },
    {
      question: "Como se diz'comer' em inglês?",
      options: ["To drink", "To eat", "To sleep", "To cook"],
      correctIndex: 1,
      difficulty: "easy",
      island: "verbs",
    },
    {
      question: "O que é 'sleep' em português?",
      options: ["Comer", "Beber", "Correr", "Dormir"],
      correctIndex: 3,
      difficulty: "easy",
      island: "verbs",
    },

    {
      question: "O que é 'I eat' em português?",
      options: ["Eu bebo", "Eu durmo", "Eu como", "Eu corro"],
      correctIndex: 2,
      difficulty: "medium",
      island: "verbs",
    },
    {
      question: "O que é 'she runs' em português?",
      options: ["Ela come", "Ela dorme", "Ela bebe", "Ela corre"],
      correctIndex: 3,
      difficulty: "medium",
      island: "verbs",
    },
    {
      question: "Como se diz 'ela come' em inglês?",
      options: ["She eats", "She sleeps", "She runs", "She jumps"],
      correctIndex: 0,
      difficulty: "medium",
      island: "verbs",
    },

    // DIFÍCIL - Verbs
    {
      question: "Qual é o passado de 'to eat'?",
      options: ["Ate", "Eated", "Eat", "Eating"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
    {
      question: "Qual é o passado de 'to run'?",
      options: ["Ran", "Runned", "Run", "Running"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
    {
      question: "Qual é o passado de 'to go'?",
      options: ["Went", "Goed", "Go", "Going"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
