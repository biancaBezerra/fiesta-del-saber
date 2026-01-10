class GoogleSheetsTracker {
  constructor() {
    console.log("📊 GoogleSheetsTracker carregado (placeholder)");
  }

  trackThemeSelected(themeId) {
    console.log("📈 Tema selecionado:", themeId);
  }

  trackLevelStart(themeId, level) {
    console.log("📈 Nível iniciado:", themeId, level);
  }

  trackLevelComplete(themeId, level, success) {
    console.log("📈 Nível completo:", themeId, level, success);
  }
}
