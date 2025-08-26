Resumo
Ao executar os testes automatizados da Calculadora do Windows no TestComplete, 
o aplicativo é aberto e fechado imediatamente sem realizar nenhuma ação (nenhuma tecla é digitada, nenhum resultado é validado). 
O problema persiste mesmo após configurar BDD, mapeamento da Calculadora e scripts em JavaScript.

Contexto

Objetivo: automatizar cenários BDD (Gherkin) para a Calculadora do Windows (ex.: subtração 9 − 3 = 6).

Ferramenta: TestComplete

BDD: cenários adicionados (Gherkin)

Scripts: funções em JavaScript para abrir a calculadora, digitar a sequência e validar o resultado

NameMapping: Calculadora mapeada

Passos já realizados

Mapeei a Calculadora do Windows no TestComplete (NameMapping).

Adicionei o cenário BDD (Gherkin) para subtração.

Implementei/coloquei os scripts JavaScript correspondentes às etapas.

Tentei executar os testes via rotina de script e/ou via Keyword Test.

Comportamento observado

A Calculadora abre e fecha sem executar o fluxo de teste.

Não há entrada de teclas visível (ex.: 9-3=) e nenhum resultado é verificado.

O log não evidencia falhas claras de objeto/controle durante a curta execução.

Comportamento esperado

A Calculadora permanecer aberta durante a execução.

As teclas da operação (ex.: 9-3=) serem enviadas ao aplicativo.

O resultado (ex.: 6) ser lido do controle de saída e validado.

O aplicativo ser fechado apenas após a validação.

Ambiente

SO: <Windows 11 >
TestComplete: <versão: 15.76.5.7>

Permissões: <TestComplete executado como Admin? Sim>

Tentativas de solução (sem sucesso)

Ajuste de timeouts e espera pelos controles (ex.: CalculatorResults).

Execução como administrador.

Variações na forma de iniciar a Calculadora (TestedApps calc.exe, protocolo calculator:, AppsFolder).

Revisão de mapeamento (NameMapping) e bindings BDD → funções JS.

Consulta a materiais/IA para diagnóstico — sem resolução até o momento.