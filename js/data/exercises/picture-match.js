const PICTURE_MATCH_TYPE = {
  id: "picture-match",
  name: "Combinación de Imágenes",
  image: "...",
  objects: [
    // === ISLA DE NÚMEROS ===

    // FÁCIL - Números
    {
      pairs: [
        { word: "Uno", image: "1️⃣" },
        { word: "Dos", image: "2️⃣" },
        { word: "Tres", image: "3️⃣" },
        { word: "Cuatro", image: "4️⃣" },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Cinco", image: "5️⃣" },
        { word: "Seis", image: "6️⃣" },
        { word: "Siete", image: "7️⃣" },
        { word: "Ocho", image: "8️⃣" },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Nueve", image: "9️⃣" },
        { word: "Diez", image: "🔟" },
        { word: "Cero", image: "0️⃣" },
        { word: "Cien", image: "💯" },
      ],
      difficulty: "easy",
      island: "numbers",
    },

    // MEDIO - Números
    {
      pairs: [
        { word: "Once", image: "1️⃣1️⃣" },
        { word: "Doce", image: "1️⃣2️⃣" },
        { word: "Trece", image: "1️⃣3️⃣" },
        { word: "Catorce", image: "1️⃣4️⃣" },
      ],
      difficulty: "medium",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Veinte", image: "2️⃣0️⃣" },
        { word: "Treinta", image: "3️⃣0️⃣" },
        { word: "Cuarenta", image: "4️⃣0️⃣" },
        { word: "Cincuenta", image: "5️⃣0️⃣" },
      ],
      difficulty: "medium",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Primero", image: "🥇" },
        { word: "Segundo", image: "🥈" },
        { word: "Tercero", image: "🥉" },
      ],
      difficulty: "medium",
      island: "numbers",
    },

    // DIFÍCIL - Números
    {
      pairs: [
        { word: "Setenta", image: "7️⃣0️⃣" },
        { word: "Ochenta", image: "8️⃣0️⃣" },
        { word: "Noventa", image: "9️⃣0️⃣" },
        { word: "Cien", image: "1️⃣0️⃣0️⃣" },
      ],
      difficulty: "hard",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Mil", image: "1️⃣0️⃣0️⃣0️⃣" },
        { word: "Dos mil", image: "2️⃣0️⃣0️⃣0️⃣" },
        { word: "Cinco mil", image: "5️⃣0️⃣0️⃣0️⃣" },
        { word: "Quinientos", image: "5️⃣0️⃣0️⃣" },
      ],
      difficulty: "hard",
      island: "numbers",
    },
    {
      pairs: [
        { word: "Más", image: "➕" },
        { word: "Menos", image: "➖" },
        { word: "Multiplicar", image: "✖️" },
        { word: "Dividir", image: "➗" },
        { word: "Igual", image: "🟰" },
      ],
      difficulty: "hard",
      island: "numbers",
    },

    // === ISLA DE VERBOS ===

    // FÁCIL - Verbos
    {
      pairs: [
        { word: "Correr", image: "🏃" },
        { word: "Saltar", image: "🤸" },
        { word: "Nadar", image: "🏊" },
        { word: "Bailar", image: "💃" },
      ],
      difficulty: "easy",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Leer", image: "📖" },
        { word: "Escribir", image: "✍️" },
        { word: "Estudiar", image: "🎓" },
        { word: "Aprender", image: "🧠" },
      ],
      difficulty: "easy",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Comer", image: "🍽️" },
        { word: "Beber", image: "🥤" },
        { word: "Dormir", image: "😴" },
        { word: "Despertar", image: "⏰" },
      ],
      difficulty: "easy",
      island: "verbs",
    },

    // MEDIO - Verbos
    {
      pairs: [
        { word: "Hablar", image: "🗣️" },
        { word: "Escuchar", image: "👂" },
        { word: "Mirar", image: "👀" },
        { word: "Pensar", image: "🤔" },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Trabajar", image: "💼" },
        { word: "Viajar", image: "✈️" },
        { word: "Conducir", image: "🚗" },
        { word: "Comprar", image: "🛒" },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Jugar", image: "🎮" },
        { word: "Cantar", image: "🎤" },
        { word: "Bailar", image: "💃" },
        { word: "Pintar", image: "🎨" },
      ],
      difficulty: "medium",
      island: "verbs",
    },

    // DIFÍCIL - Verbos
    {
      pairs: [
        { word: "Ayudar", image: "🤝" },
        { word: "Limpiar", image: "🧹" },
        { word: "Cocinar", image: "🍳" },
        { word: "Reparar", image: "🛠️" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Llevar", image: "📦" },
        { word: "Construir", image: "🏗️" },
        { word: "Cortar", image: "✂️" },
        { word: "Dibujar", image: "✏️" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      pairs: [
        { word: "Elegir", image: "🗳️" },
        { word: "Comenzar", image: "▶️" },
        { word: "Terminar", image: "🏁" },
        { word: "Recordar", image: "🧠" },
      ],
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
