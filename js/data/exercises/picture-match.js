const PICTURE_MATCH_TYPE = {
  id: "picture-match",
  name: "Combinação de Imagens",
  image: "...",
  objects: [
    // === ILHA DOS NÚMEROS ===

    // FÁCIL - Numbers
    {
      pairs: [
        { word: "One", image: "1️⃣" },
        { word: "Two", image: "2️⃣" },
        { word: "Three", image: "3️⃣" },
        { word: "Four", image: "4️⃣" },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Five", image: "5️⃣" },
        { word: "Six", image: "6️⃣" },
        { word: "Seven", image: "7️⃣" },
        { word: "Eight", image: "8️⃣" },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Nine", image: "9️⃣" },
        { word: "Ten", image: "🔟" },
        { word: "Zero", image: "0️⃣" },
        { word: "Hundred", image: "💯" },
      ],
      difficulty: "easy",
      island: "numbers",
    },

    // MÉDIO - Numbers
    {
      pairs: [
        { word: "Eleven", image: "1️⃣1️⃣" },
        { word: "Twelve", image: "1️⃣2️⃣" },
        { word: "Thirteen", image: "1️⃣3️⃣" },
        { word: "Fourteen", image: "1️⃣4️⃣" },
      ],
      difficulty: "medium",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Twenty", image: "2️⃣0️⃣" },
        { word: "Thirty", image: "3️⃣0️⃣" },
        { word: "Forty", image: "4️⃣0️⃣" },
        { word: "Fifty", image: "5️⃣0️⃣" },
      ],
      difficulty: "medium",
      island: "numbers",
    },
    {
      pairs: [
        { word: "First", image: "🥇" },
        { word: "Second", image: "🥈" },
        { word: "Third", image: "🥉" },
      ],
      difficulty: "medium",
      island: "numbers",
    },

    // DIFÍCIL - Numbers
    {
      pairs: [
        { word: "Seventy", image: "7️⃣0️⃣" },
        { word: "Eighty", image: "8️⃣0️⃣" },
        { word: "Ninety", image: "9️⃣0️⃣" },
        { word: "One hundred", image: "1️⃣0️⃣0️⃣" },
      ],
      difficulty: "hard",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Thousand", image: "1️⃣0️⃣0️⃣0️⃣" },
        { word: "two thousand", image: "2️⃣0️⃣0️⃣0️⃣" },
        { word: "five thousand", image: "5️⃣0️⃣0️⃣0️⃣" },
        { word: "Five hundred", image: "5️⃣0️⃣0️⃣" },
      ],
      difficulty: "hard",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Plus", image: "➕" },
        { word: "Minus", image: "➖" },
        { word: "Multiply", image: "✖️" },
        { word: "Divide", image: "➗" },
        { word: "Equal", image: "🟰" },
      ],
      difficulty: "hard",
      island: "numbers",
    },

    // === ILHA DOS VERBOS ===

    // FÁCIL - Verbs
    {
      pairs: [
        { word: "Run - Correr", image: "🏃" },
        { word: "Jump - Pular", image: "🤸" },
        { word: "Swim - Nadar", image: "🏊" },
        { word: "Dance - Dançar", image: "💃" },
      ],
      difficulty: "easy",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Read -  Ler", image: "📖" },
        { word: "Write - Escrever", image: "✍️" },
        { word: "Study - Estudar", image: "🎓" },
        { word: "Learn - Aprender", image: "🧠" },
      ],
      difficulty: "easy",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Eat - comer", image: "🍽️" },
        { word: "Drink - Beber", image: "🥤" },
        { word: "Sleep - Dormir", image: "😴" },
        { word: "Wake up - Acordar", image: "⏰" },
      ],
      difficulty: "easy",
      island: "verbs",
    },

    // MÉDIO - Verbs
    {
      pairs: [
        { word: "Speak - falar", image: "🗣️" },
        { word: "Listen - ouvir", image: "👂" },
        { word: "Watch - Assitir", image: "👀" },
        { word: "Think - Pensar", image: "🤔" },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Work - Trabalhar", image: "💼" },
        { word: "Travel - Viajar", image: "✈️" },
        { word: "Drive - Dirigir", image: "🚗" },
        { word: "Buy - Comprar", image: "🛒" },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Play -  Jogar", image: "🎮" },
        { word: "Sing - cantar", image: "🎤" },
        { word: "Dance - Dançar", image: "💃" },
        { word: "Paint -  Pintar", image: "🎨" },
      ],
      difficulty: "medium",
      island: "verbs",
    },

    // DIFÍCIL - Verbs
    {
      pairs: [
        { word: "Help - Ajudar", image: "🤝" },
        { word: "Clean - Limpar", image: "🧹" },
        { word: "Cook - Cozinhar", image: "🍳" },
        { word: "Fix - Consertar", image: "🛠️" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Carry - Carregar", image: "📦" },
        { word: "Build - Construir", image: "🏗️" },
        { word: "Cut - Cortar", image: "✂️" },
        { word: "Draw - Desenhar", image: "✏️" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Choose - Escolher", image: "🗳️" },
        { word: "Start - Começar", image: "▶️" },
        { word: "Finish - Finalizar ", image: "🏁" },
        { word: "Remember - Lembrar", image: "🧠" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
