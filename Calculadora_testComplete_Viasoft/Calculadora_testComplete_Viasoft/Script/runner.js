// Runner.js
//USEUNIT BDD
//USEUNIT StepDefinitions


function RunFeature() {
  Log.Message("Iniciando execução BDD...");

  // Exemplo de steps que você teria no .feature
  RunStep("Given", "a calculadora está aberta");
  RunStep("When", "eu somo 5 e 3");
  RunStep("Then", "o resultado deve ser 8");

  Log.Message("Execução finalizada!");
}
