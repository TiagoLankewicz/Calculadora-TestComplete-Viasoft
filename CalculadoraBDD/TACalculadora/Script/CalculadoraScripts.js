// ============================================================================
// CalculadoraScripts.js — robusto para Windows 10/11 (UWP/WinUI)
// ============================================================================

function _sleep(ms) { aqUtils.Delay(ms); }

function _normalizeNumber(s) {
  return String(s).replace(/\s+/g, "").replace(",", ".");
}

/** Fallback: executar a Calculadora via shell UWP */
function _runCalculatorViaShell() {
  try {
    // 1) Protocolo UWP direto (funciona no Win11/10)
    var sh = Sys.OleObject("WScript.Shell");
    sh.Run("calculator:", 1, false);
    _sleep(500);
    return true;
  } catch (e) {
    // 2) AppsFolder explicit
    try {
      var sh2 = Sys.OleObject("WScript.Shell");
      sh2.Run('explorer.exe shell:AppsFolder\\Microsoft.WindowsCalculator_8wekyb3d8bbwe!App', 1, false);
      _sleep(500);
      return true;
    } catch (e2) {
      Log.Warning("Fallback UWP falhou: " + e2);
      return false;
    }
  }
}

/** Abre a calculadora (TestedApps 'calc' + fallbacks) */
function openCalculator() {
  // 1) Tentar via TestedApps (se existir)
  try {
    if (Project && Project.TestedApps && Project.TestedApps.Exists("calc")) {
      Project.TestedApps.Items("calc").Run();
      _sleep(600);
    } else {
      Log.Message("TestedApps 'calc' não encontrado; usando fallback.");
    }
  } catch (e) {
    Log.Warning("Falha ao lançar via TestedApps: " + e);
  }

  // 2) Se não aparecer nada, tentar UWP via shell
  var anyCalc = Sys.WaitProcess("Calculator", 2000);
  if (!anyCalc.Exists) {
    var af = Sys.WaitProcess("ApplicationFrameHost", 2000);
    if (!af.Exists) {
      _runCalculatorViaShell();
    }
  }

  // 3) Espera até o controle de resultado existir (mais confiável que título)
  var res = _waitForResultControl(20000); // 20s timeout total
  if (!res) {
    // última tentativa: abrir Win32 calc (sistemas antigos)
    try { 
      var sh3 = Sys.OleObject("WScript.Shell");
      sh3.Run("calc.exe", 1, false);
      _sleep(800);
      res = _waitForResultControl(8000);
    } catch (e3) { /* ignore */ }
  }

  if (!res) {
    throw "Janela/controle da Calculadora não apareceu no tempo esperado.";
  }

  // Limpar entrada (Esc duas vezes ajuda em vários modos)
  try {
    var root = _getTopLevelWindow(res);
    root.Activate();
    root.Keys("[Esc][Esc]");
  } catch (e) { /* ignore */ }

  return res; // retornamos o controle de resultado; a janela pode ser obtida por _getTopLevelWindow(res)
}

/** Procura o controle de resultado da Calculadora (AutomationId = CalculatorResults) */
function _waitForResultControl(timeoutMs) {
  var step = 250, waited = 0;
  while (waited <= timeoutMs) {
    // Busca global na área de trabalho (UIA)
    var res = Sys.Desktop.FindChild(["AutomationId"], ["CalculatorResults"], 50, true);
    if (res && res.Exists) return res;

    // Fallback: busca por texto estático/edit que contenha número visível
    var cand = Sys.Desktop.FindChild(["ObjectType"], ["Edit"], 10, true);
    if (!cand || !cand.Exists) {
      cand = Sys.Desktop.FindChild(["WndClass"], ["Static"], 10, true);
    }
    if (cand && cand.Exists) return cand;

    _sleep(step);
    waited += step;
  }
  return null;
}

/** Sobe até a janela de topo do aplicativo da Calculadora */
function _getTopLevelWindow(obj) {
  var cur = obj;
  var safety = 0;
  while (cur && cur.Parent && safety < 50) {
    if (cur.ObjectType && String(cur.ObjectType).toLowerCase() === "window") {
      // janelas top-level geralmente têm Parent = Process
      if (cur.Parent && cur.Parent.ProcessName) {
        return cur;
      }
    }
    cur = cur.Parent;
    safety++;
  }
  // fallback: tentar pegar pela cadeia de processos
  var p = Sys.WaitProcess("ApplicationFrameHost", 1000);
  if (p.Exists) {
    var wnd = p.FindChild(["ObjectType"], ["Window"], 10, true);
    if (wnd && wnd.Exists) return wnd;
  }
  p = Sys.WaitProcess("Calculator", 1000);
  if (p.Exists) {
    var wnd2 = p.FindChild(["ObjectType"], ["Window"], 10, true);
    if (wnd2 && wnd2.Exists) return wnd2;
  }
  return obj; // último recurso
}

/** Lê o texto do resultado */
function getResultText(resultCtrl) {
  try {
    // UWP: o texto vem geralmente em .Name
    var raw = resultCtrl.Name || resultCtrl.wText || resultCtrl.Text;
    if (!raw) raw = resultCtrl.Value;
    if (!raw) raw = "";

    // Exemplos: "Exibição é 12", "Display is 12"
    var m = String(raw).match(/-?\d+[.,]?\d*/g);
    if (m && m.length) return m[m.length - 1];
    return String(raw).trim();
  } catch (e) {
    throw "Não foi possível obter o resultado: " + e;
  }
}

/** Fecha a calculadora (Close → Alt+F4 fallback) */
function closeCalculator(resultCtrl) {
  try {
    var wnd = _getTopLevelWindow(resultCtrl);
    if (wnd && wnd.Exists) {
      wnd.Close();
      _sleep(300);
      if (wnd.Exists) {
        wnd.Activate();
        wnd.Keys("[Alt+F4]");
      }
    }
  } catch (e) {
    Log.Warning("Falha ao fechar a Calculadora: " + e);
  }
}

/** Executa uma sequência de teclas e valida o resultado esperado */
function runAndAssert(keysSequence, expected) {
  var resCtrl = openCalculator();
  var wnd = _getTopLevelWindow(resCtrl);
  try {
    Log.Message("Sequência: " + keysSequence + " | Esperado: " + expected);
    wnd.Activate();
    wnd.Keys(keysSequence);
    _sleep(500);

    var result = getResultText(resCtrl);
    Log.Message("Resultado obtido: " + result);

    aqObject.CheckProperty(_normalizeNumber(result), cmpEqual, _normalizeNumber(String(expected)));
  } finally {
    closeCalculator(resCtrl);
  }
}

// ============================================================================
// CENÁRIOS
// ============================================================================
function somar()       { runAndAssert("7+5=", 12); }
function subtrair()    { runAndAssert("9-3=",  6); }
function multiplicar() { runAndAssert("8*4=", 32); }
function dividir()     { runAndAssert("2 0 / 5 =", 4); }
