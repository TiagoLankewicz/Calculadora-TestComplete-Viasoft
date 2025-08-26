function EventsHooks_OnStartTest(Sender){
  Log.Message("Iniciando teste...");
}

function EventsHooks_OnStopTest(Sender){
  Log.Message("Teste finalizado, garantindo fechamento da calculadora...");
  try { var p = Sys.Process("ApplicationFrameHost"); if (p.Exists) p.Terminate(); } catch(e) {}
}

function EventsHooks_OnLogError(Sender, LogParams){
  Log.Warning("Erro encontrado, encerrando calculadora...");
  try { var p = Sys.Process("ApplicationFrameHost"); if (p.Exists) p.Terminate(); } catch(e) {}
}
