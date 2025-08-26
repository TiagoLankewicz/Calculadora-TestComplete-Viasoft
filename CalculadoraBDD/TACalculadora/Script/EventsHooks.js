function EventsHooks_OnStartTest(Sender){
  Log.Message("Projeto será iniciado.");
  TestedApps.calc.Run();
}

function EventsHooks_OnStopTest(Sender){
  Log.Message("Projeto executado com sucesso. Aplicação será encerrada.");
  Sys.Process("Microsoft.WindowsCalculator").Terminate();
}

function EventsHooks_OnLogError(Sender, LogParams){
  Log.Message("Projeto está com erro. Aplicação será encerrada.");
  Sys.Process("Microsoft.WindowsCalculator").Terminate();
}