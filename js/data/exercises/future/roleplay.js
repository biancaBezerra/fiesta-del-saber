const ROLEPLAY_TYPE = {
  id: "roleplay",
  name: "Atuação de Papéis",
  image: "...",
  objects: [
    // === FÁCIL ===
    {
      theme: "No Aeroporto",
      dialogue: [
        {
          character: "Funcionário",
          text: "Good morning! Can I see your passport and ticket, please?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "Here you are",
        "Yes, of course",
        "Sure, here they are",
      ],
      answerType: "options",
      difficulty: "easy",
    },
    {
      theme: "No Restaurante",
      dialogue: [
        {
          character: "Garçom",
          text: "Hello! Welcome to our restaurant. Are you ready to order?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "Yes, I'd like the pasta",
        "Could I see the menu first?",
        "I'll have the chicken, please",
      ],
      answerType: "options",
      difficulty: "easy",
    },

    // === INTERMEDIÁRIO ===
    {
      theme: "Na Loja de Roupas",
      dialogue: [
        {
          character: "Vendedor",
          text: "Hi there! Can I help you find anything today?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "I'm just looking, thanks",
        "Yes, I'm looking for a blue shirt",
        "Do you have this in a larger size?",
      ],
      answerType: "input",
      difficulty: "medium",
    },
    {
      theme: "No Hotel",
      dialogue: [
        {
          character: "Recepcionista",
          text: "Good evening! Do you have a reservation with us?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "Yes, under the name Silva",
        "I made a reservation online",
        "No, do you have any rooms available?",
      ],
      answerType: "input",
      difficulty: "medium",
    },

    // === DIFÍCIL ===
    {
      theme: "No Médico",
      dialogue: [
        {
          character: "Médico",
          text: "Good morning. I understand you've been experiencing some discomfort. Could you describe your symptoms?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "I've had a persistent headache for three days",
        "I'm feeling nauseous and dizzy",
        "I have pain in my lower back",
      ],
      answerType: "input",
      difficulty: "hard",
    },
    {
      theme: "Entrevista de Emprego",
      dialogue: [
        {
          character: "Entrevistador",
          text: "Thank you for coming in today. Could you tell me about your previous work experience and how it relates to this position?",
        },
        { character: "Você", text: "" },
      ],
      correctResponses: [
        "In my previous role, I managed a team and developed several successful projects",
        "I have five years of experience in digital marketing, which aligns with your requirements",
        "My background in customer service has prepared me for this client-facing role",
      ],
      answerType: "input",
      difficulty: "hard",
    },
  ],
};
