// BDD.js
// Unit de suporte para usar Gherkin no TestComplete

// Dicionários de steps
var givenSteps = {};
var whenSteps = {};
var thenSteps = {};

// Registrar steps
function Given(pattern, func) {
  givenSteps[pattern] = func;
}

function When(pattern, func) {
  whenSteps[pattern] = func;
}

function Then(pattern, func) {
  thenSteps[pattern] = func;
}

// Executar steps
function RunStep(stepType, stepText) {
  var stepsDict;
  
  if (stepType == "Given") {
    stepsDict = givenSteps;
  } else if (stepType == "When") {
    stepsDict = whenSteps;
  } else if (stepType == "Then") {
    stepsDict = thenSteps;
  } else {
    Log.Error("Tipo de step desconhecido: " + stepType);
    return;
  }
  
  // Procurar step registrado
  for (var pattern in stepsDict) {
    var regex = new RegExp("^" + pattern + "$");
    var match = regex.exec(stepText);
    
    if (match) {
      // Executa função passando os grupos capturados
      stepsDict[pattern].apply(null, match.slice(1));
      return;
    }
  }
  
  Log.Error("Step não encontrado: " + stepText);
}

