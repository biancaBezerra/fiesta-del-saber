const MULTIPLE_CHOICE_TYPE = {
  id: "multiple-choice",
  name: "Escolha Múltipla",
  image: "...",
  objects: [
    // === ILHA DOS NÚMEROS ===
    {
      question: "Como se diz 'um' em espanhol?",
      options: ["Uno", "Dos", "Tres", "Cuatro"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },
    {
      question: "Como se diz 'dez' em espanhol?",
      options: ["Diez", "Cinco", "Dos", "Cuatro"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },
    {
      question: "Como se diz 'três' em espanhol?",
      options: ["Tres", "Cinco", "Dos", "Cuatro"],
      correctIndex: 0,
      difficulty: "easy",
      island: "numbers",
    },

    {
      question: "Como se diz 'doze' em espanhol?",
      options: ["Doce", "Veinte", "Dos", "Diez"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },
    {
      question: "Qual é 'vinte' em espanhol?",
      options: ["Veinte", "Trece", "Diez", "Treinta"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },
    {
      question: "Como se diz 'catorze' em espanhol?",
      options: ["Catorce", "Cuarenta", "Cuatro", "Veinticuatro"],
      correctIndex: 0,
      difficulty: "medium",
      island: "numbers",
    },

    {
      question: "Como se diz 'trinta' em espanhol?",
      options: ["Treinta", "Trece", "Tres", "Treinta y tres"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },
    {
      question: "Qual é 'quarenta' em espanhol?",
      options: ["Cuarenta", "Catorce", "Cuatro", "Cuarenta y cuatro"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },
    {
      question: "Como se diz 'cinquenta' em espanhol?",
      options: ["Cincuenta", "Quince", "Cinco", "Quince"],
      correctIndex: 0,
      difficulty: "hard",
      island: "numbers",
    },

    // === ILHA DOS VERBOS ===

    // FÁCIL - Verbos
    {
      question: "O que é 'correr' em espanhol?",
      options: ["Andar", "Nadar", "Correr", "Saltar"],
      correctIndex: 2,
      difficulty: "easy",
      island: "verbs",
    },
    {
      question: "Como se diz 'comer' em espanhol?",
      options: ["Beber", "Comer", "Dormir", "Cocinar"],
      correctIndex: 1,
      difficulty: "easy",
      island: "verbs",
    },
    {
      question: "O que é 'dormir' em espanhol?",
      options: ["Comer", "Beber", "Correr", "Dormir"],
      correctIndex: 3,
      difficulty: "easy",
      island: "verbs",
    },

    {
      question: "O que é 'eu como' em espanhol?",
      options: ["Yo bebo", "Yo duermo", "Yo como", "Yo corro"],
      correctIndex: 2,
      difficulty: "medium",
      island: "verbs",
    },
    {
      question: "O que é 'ela corre' em espanhol?",
      options: ["Ella come", "Ella duerme", "Ella bebe", "Ella corre"],
      correctIndex: 3,
      difficulty: "medium",
      island: "verbs",
    },
    {
      question: "Como se diz 'ela come' em espanhol?",
      options: ["Ella come", "Ella duerme", "Ella corre", "Ella salta"],
      correctIndex: 0,
      difficulty: "medium",
      island: "verbs",
    },

    // DIFÍCIL - Verbos
    {
      question: "Qual é o passado de 'comer' em espanhol?",
      options: ["Comí", "Comía", "Como", "Comiendo"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
    {
      question: "Qual é o passado de 'correr' em espanhol?",
      options: ["Corrí", "Corría", "Corro", "Corriendo"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
    {
      question: "Qual é o passado de 'ir' em espanhol?",
      options: ["Fui", "Iba", "Voy", "Yendo"],
      correctIndex: 0,
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
