const LISTENING_TYPE = {
  id: "listening",
  name: "Exercício de Audição",
  image: "...",
  objects: [
    // === FÁCIL (Nível 1-2) ===
    {
      audio: "../assets/components/exercise-audio/audio-1.mp3",
      options: [
        { text: "Bom dia", correct: true },
        { text: "Boa noite", correct: false },
        { text: "Boa tarde", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-2.mp3",
      options: [
        { text: "Eu estou cansado", correct: false },
        { text: "Eu estou com fome", correct: true },
        { text: "Eu estou feliz", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-3.mp3",
      options: [
        { text: "Qual é seu nome?", correct: false },
        { text: "Como você está?", correct: true },
        { text: "Onde você mora?", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-4.mp3",
      options: [
        { text: "Eu tenho dois irmãos", correct: false },
        { text: "Eu tenho um cachorro", correct: true },
        { text: "Eu gosto de maçãs", correct: false },
      ],
      difficulty: "easy",
      island: "numbers",
    },
    {
      audio: "../assets/components/exercise-audio/audio-5.mp3",
      options: [
        { text: "Eu sou estudante", correct: false },
        { text: "Eu trabalho aqui", correct: false },
        { text: "Eu moro no Brasil", correct: true },
      ],
      difficulty: "easy",
      island: "verbs",
    },

    // === INTERMEDIÁRIO (Nível 3-4) ===
    {
      audio: "../assets/components/exercise-audio/audio-6.mp3",
      options: [
        { text: "Eu assisto TV", correct: false },
        { text: "Eu gosto de jogar futebol", correct: true },
        { text: "Eu leio livros", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-7.mp3",
      options: [
        { text: "Ele está estudando inglês", correct: true },
        { text: "Ela está cozinhando", correct: false },
        { text: "Eles estão trabalhando", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-8.mp3",
      options: [
        { text: "Nós vamos ao cinema", correct: true },
        { text: "Nós vamos ao shopping", correct: false },
        { text: "Nós vamos à praia amanhã", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-9.mp3",
      options: [
        { text: "Está chovendo", correct: false },
        { text: "O tempo está muito quente", correct: true },
        { text: "Está frio", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-10.mp3",
      options: [
        { text: "Eu preciso de ajuda", correct: true },
        { text: "Eu estou perdido", correct: false },
        { text: "Eu quero água", correct: false },
      ],
      difficulty: "medium",
      island: "verbs",
    },

    // === DIFÍCIL (Nível 5-6) ===
    {
      audio: "../assets/components/exercise-audio/audio-11.mp3",
      options: [
        { text: "Ele é professor em uma escola", correct: true },
        {
          text: "Ela trabalha como médica em um hospital grande",
          correct: false,
        },
        { text: "Eu sou engenheiro", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-12.mp3",
      options: [
        { text: "Eles vão visitar a família", correct: false },
        { text: "Você vai estudar mais", correct: false },
        {
          text: "Nós planejamos viajar para a Europa no próximo verão",
          correct: true,
        },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-13.mp3",
      options: [
        { text: "Estude bastante para a prova", correct: false },
        {
          text: "Se você praticar todos os dias, vai melhorar rápido",
          correct: true,
        },
        { text: "A prática leva à perfeição", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-14.mp3",
      options: [
        { text: "Vamos almoçar juntos", correct: false },
        { text: "A comida aqui é muito boa", correct: true },
        {
          text: "O restaurante que recomendamos fica perto da estação",
          correct: false,
        },
      ],
      difficulty: "hard",
      island: "verbs",
    },
    {
      audio: "../assets/components/exercise-audio/audio-15.mp3",
      options: [
        { text: "Precisamos trabalhar mais", correct: false },
        {
          text: "Depois de terminar o projeto, podemos descansar um pouco",
          correct: true,
        },
        { text: "O trabalho está difícil", correct: false },
      ],
      difficulty: "hard",
      island: "verbs",
    },
  ],
};
