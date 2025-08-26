// Step_definitions.js
//USEUNIT BDD

Given("a calculadora está aberta", function() {
  TestedApps.calc.Run(); // abre a calculadora
  Log.Message("Calculadora aberta!");
});

When("eu somo (\\d+) e (\\d+)", function(num1, num2) {
  var calc = Sys.Process("Calculator");

  // versão antiga do Windows Calculator (clássico)
  calc.Window("CalcFrame").Keys(num1 + "[ADD]" + num2 + "[ENTER]");
  
  // se for o app moderno, precisa mapear os botões
  Log.Message("Soma executada: " + num1 + " + " + num2);
});

Then("o resultado deve ser (\\d+)", function(resultadoEsperado) {
  var calc = Sys.Process("Calculator");
  var display = calc.Window("CalcFrame").Window("Static", "", 1).WndCaption; 

  if (display == resultadoEsperado) {
    Log.Checkpoint("Resultado correto: " + display);
  } else {
    Log.Error("Resultado incorreto. Esperado " + resultadoEsperado + " mas obtido " + display);
  }
});
