const STORIES_TYPE = {
  id: "stories",
  name: "Histórias",
  image: "...",
  objects: [
    // === FÁCIL ===
    {
      title: "No Parque",
      text: "Maria vai ao parque com seu cachorro. O dia está ensolarado e quente. Ela encontra seu amigo João, que está sentado em um banco lendo um livro.",
      question: "O que Maria está fazendo no parque?",
      options: [
        "Ela está correndo",
        "Ela está com seu cachorro",
        "Ela está nadando",
        "Ela está trabalhando",
      ],
      correctAnswer: "Ela está com seu cachorro",
      answerType: "options",
      difficulty: "easy",
    },
    {
      title: "No Restaurante",
      text: "Carlos vai a um restaurante italiano. Ele pede pizza e uma garrafa de água. O garçom é muito simpático e recomenda a pizza de pepperoni.",
      question: "O que Carlos pede no restaurante?",
      options: [
        "Hambúrguer e batatas fritas",
        "Pizza e água",
        "Sushi e chá",
        "Salada e suco",
      ],
      correctAnswer: "Pizza e água",
      answerType: "options",
      difficulty: "easy",
    },

    // === INTERMEDIÁRIO ===
    {
      title: "Na Livraria",
      text: "Ana vai à livraria comprar um presente para sua irmã. Ela escolhe um livro de aventuras e um marcador de páginas. A livraria está com uma promoção especial de 20% em todos os livros infantis.",
      question: "Para quem Ana está comprando um presente?",
      correctAnswer: "Para sua irmã",
      answerType: "input",
      difficulty: "medium",
    },
    {
      title: "O Aniversário",
      text: "Pedro está organizando uma festa de aniversário surpresa para sua esposa. Ele convidou todos os amigos e comprou um bolo de chocolate. A festa será no sábado às 16h no jardim de sua casa.",
      question: "Que tipo de bolo Pedro comprou?",
      options: [
        "Bolo de baunilha",
        "Bolo de chocolate",
        "Bolo de morango",
        "Bolo de cenoura",
      ],
      correctAnswer: "Bolo de chocolate",
      answerType: "options",
      difficulty: "medium",
    },

    // === DIFÍCIL ===
    {
      title: "A Viagem de Negócios",
      text: "Dr. Silva viajou para São Paulo para participar de uma conferência médica sobre cardiologia. Durante sua apresentação, ele destacou os avanços recentes no tratamento de doenças cardíacas usando tecnologia não-invasiva. Após a conferência, ele planeja visitar alguns colegas no hospital local.",
      question:
        "Qual é o tema principal da conferência que Dr. Silva está participando?",
      correctAnswer: "Cardiologia",
      answerType: "input",
      difficulty: "hard",
    },
    {
      title: "O Projeto Ambiental",
      text: "A prefeitura municipal iniciou um projeto de reflorestamento nas áreas urbanas. O objetivo é plantar 10.000 árvores nativas até o final do ano, com foco em espécies que melhoram a qualidade do ar. Os cidadãos podem participar como voluntários nos fins de semana.",
      question:
        "Quantas árvores a prefeitura planeja plantar até o final do ano?",
      options: [
        "5.000 árvores",
        "10.000 árvores",
        "15.000 árvores",
        "20.000 árvores",
      ],
      correctAnswer: "10.000 árvores",
      answerType: "options",
      difficulty: "hard",
    },
  ],
};
