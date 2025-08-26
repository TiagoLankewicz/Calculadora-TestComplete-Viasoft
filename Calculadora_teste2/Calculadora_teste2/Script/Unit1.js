// Função para executar os testes baseados nos cenários BDD
function TesteCalculadora() {
  // Cenário de Adição
  Runner.CallMethod("CalculadoraSteps.DadoQueACalculadoraEstaAberta");
  Runner.CallMethod("CalculadoraSteps.QuandoEuInsiroOPrimeiroNumero", "5");
  Runner.CallMethod("CalculadoraSteps.EPressionoOBotaoDeOperacao", "mais");
  Runner.CallMethod("CalculadoraSteps.EEuInsiroOSegundoNumero", "3");
  Runner.CallMethod("CalculadoraSteps.EEuPressionoOBotaoDeIgual");
  Runner.CallMethod("CalculadoraSteps.EntãoOResultadoExibidoDeveSer", "8");
  Runner.CallMethod("CalculadoraSteps.FecharCalculadora");

  // Cenário de Subtração
  Runner.CallMethod("CalculadoraSteps.DadoQueACalculadoraEstaAberta");
  Runner.CallMethod("CalculadoraSteps.QuandoEuInsiroOPrimeiroNumero", "10");
  Runner.CallMethod("CalculadoraSteps.EPressionoOBotaoDeOperacao", "menos");
  Runner.CallMethod("CalculadoraSteps.EEuInsiroOSegundoNumero", "4");
  Runner.CallMethod("CalculadoraSteps.EEuPressionoOBotaoDeIgual");
  Runner.CallMethod("CalculadoraSteps.EntãoOResultadoExibidoDeveSer", "6");
  Runner.CallMethod("CalculadoraSteps.FecharCalculadora");

  // Adicione aqui os outros cenários (Multiplicação e Divisão)
}


// Mapeamento dos passos do Gherkin para funções JavaScript
var CalculadoraSteps = {
  DadoQueACalculadoraEstaAberta: function() {
    TestedApps.calc.Run();
  },

  QuandoEuInsiroOPrimeiroNumero: function(numero) {
    var calcWindow = Sys.Process("Calculator").UIAObject("ApplicationFrameWindow");
    var numeroButton = calcWindow.UIAObject("LandmarkTarget").UIAObject("Number pad").UIAObject(numero);
    numeroButton.Click();
  },

  EPressionoOBotaoDeOperacao: function(operacao) {
    var calcWindow = Sys.Process("Calculator").UIAObject("ApplicationFrameWindow");
    var operacaoButton = calcWindow.UIAObject("LandmarkTarget").UIAObject("Standard operators").UIAObject(operacao);
    operacaoButton.Click();
  },

  EEuInsiroOSegundoNumero: function(numero) {
    var calcWindow = Sys.Process("Calculator").UIAObject("ApplicationFrameWindow");
    var numeroButton = calcWindow.UIAObject("LandmarkTarget").UIAObject("Number pad").UIAObject(numero);
    numeroButton.Click();
  },

  EEuPressionoOBotaoDeIgual: function() {
    var calcWindow = Sys.Process("Calculator").UIAObject("ApplicationFrameWindow");
    var igualButton = calcWindow.UIAObject("LandmarkTarget").UIAObject("Standard operators").UIAIAObject("Igual a");
    igualButton.Click();
  },

  EntãoOResultadoExibidoDeveSer: function(resultadoEsperado) {
    var calcWindow = Sys.Process("Calculator").UIAObject("ApplicationFrameWindow");
    var resultadoElement = calcWindow.UIAObject("CalculatorResults");
    var resultadoAtual = resultadoElement.Name.replace("A exibição é ", "");
    
    if (resultadoAtual === resultadoEsperado) {
      Log.Correct("O resultado é " + resultadoAtual + ", conforme esperado.");
    } else {
      Log.Error("O resultado esperado era " + resultadoEsperado + ", mas foi obtido " + resultadoAtual + ".");
    }
  },

  FecharCalculadora: function() {
    Sys.Process("Calculator").Terminate();
  }
};