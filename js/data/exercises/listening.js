const LISTENING_TYPE = {
  id: "listening",
  name: "Ejercicio de Audición",
  image: "...",
  objects: [
    // === FÁCIL (Nivel 1-2) ===
    {
      audio: "../assets/components/exercise-audio/audio-1.mp3",
      options: [
        { text: "Buenos días", correct: true },
        { text: "Buenas noches", correct: false },
        { text: "Buenas tardes", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-2.mp3",
      options: [
        { text: "Yo estoy cansado", correct: false },
        { text: "Yo tengo hambre", correct: true },
        { text: "Yo estoy feliz", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-3.mp3",
      options: [
        { text: "¿Cuál es tu nombre?", correct: false },
        { text: "¿Cómo estás?", correct: true },
        { text: "¿Dónde vives?", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-4.mp3",
      options: [
        { text: "Yo tengo dos hermanos", correct: false },
        { text: "Yo tengo un perro", correct: true },
        { text: "Me gustan las manzanas", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-5.mp3",
      options: [
        { text: "Yo soy estudiante", correct: false },
        { text: "Yo trabajo aquí", correct: false },
        { text: "Yo vivo en Brasil", correct: true },
      ],
      difficulty: "easy",
      island: "verbs",
    },

    // === INTERMEDIO (Nivel 3-4) ===
    {
      audio: "../assets/components/exercise-audio/audio-6.mp3",
      options: [
        { text: "Yo veo la televisión", correct: false },
        { text: "Me gusta jugar fútbol", correct: true },
        { text: "Yo leo libros", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-7.mp3",
      options: [
        { text: "El profesor está enseñando un nuevo idioma.", correct: true },
        { text: "Ella está cocinando", correct: false },
        { text: "Ellos están trabajando", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-8.mp3",
      options: [
        { text: "Nosotros vamos al cine", correct: true },
        { text: "Nosotros vamos al centro comercial", correct: false },
        { text: "Nosotros vamos a la playa mañana", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-9.mp3",
      options: [
        { text: "Está lloviendo", correct: false },
        { text: "Hace mucho calor", correct: true },
        { text: "Hace frío", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-10.mp3",
      options: [
        { text: "Yo necesito ayuda", correct: true },
        { text: "Yo estoy perdido", correct: false },
        { text: "Yo quiero agua", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },

    // === DIFÍCIL (Nivel 5-6) ===
    {
      audio: "../assets/components/exercise-audio/audio-11.mp3",
      options: [
        { text: "Ella es profesora en una escuela.", correct: true },
        {
          text: "Ella trabaja como médica en un hospital grande",
          correct: false,
        },
        { text: "Yo soy ingeniero", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-12.mp3",
      options: [
        { text: "Ellos van a visitar la familia", correct: false },
        { text: "Tú vas a estudiar más", correct: false },
        {
          text: "Nosotros planeamos viajar a Europa el próximo verano",
          correct: true,
        },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-13.mp3",
      options: [
        { text: "Estudia mucho para el examen", correct: false },
        {
          text: "Si practicas todos los días, mejorarás rápido",
          correct: true,
        },
        { text: "La práctica hace al maestro", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-14.mp3",
      options: [
        { text: "Vamos a almorzar juntos", correct: false },
        { text: "La comida aquí es muy buena", correct: true },
        {
          text: "El restaurante que recomendamos está cerca de la estación",
          correct: false,
        },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-15.mp3",
      options: [
        { text: "Necesitamos trabajar más", correct: false },
        {
          text: "Después de terminar el proyecto, podemos descansar un poco",
          correct: true,
        },
        { text: "El trabajo está difícil", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
