document.addEventListener("DOMContentLoaded", () => {
  // Inicializar o GameManager
  const gameManager = new GameManager();
  window.gameManager = gameManager;
  window.currentGame = gameManager; // Para compatibilidade
});
