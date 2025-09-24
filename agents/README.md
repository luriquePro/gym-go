## Agentes reutilizáveis para trabalhar com o assistente

### Como usar (rápido)
- Copie um template de `agents/*.md`.
- Substitua os campos entre chaves `{...}` com seus detalhes.
- Cole no início da conversa e envie suas instruções. Eu seguirei aquele fluxo.

### Campos padrão dos templates
- **{papel}**: Quem é o agente (ex.: Implementador, Refatorador).
- **{objetivo}**: O que precisa ser alcançado agora.
- **{contexto}**: Informações do projeto, diretórios, restrições técnicas.
- **{restricoes}**: Coisas a evitar/seguir (padrões, versões, limites de tempo).
- **{entregaveis}**: O que deve ser produzido ao final.
- **{formato_resposta}**: Estrutura de saída esperada (ex.: lista, tabela, diffs).
- **{criterios_aceite}**: Como validar que está pronto.

### Troca de agente durante a conversa
- Diga: "Trocar para agente {nome}", cole o novo template (ou diga "mesmas regras do {nome}").
- Eu confirmarei e passarei a seguir o novo fluxo imediatamente.

### Dica
- Quanto mais específico em objetivo, contexto e critérios de aceite, mais previsível será a execução.

### Templates disponíveis
- `base.md`: molde genérico.
- `implementador.md`: foca em entregar código/arquivos.
- `correcao-bugs.md`: foca em reproduzir e corrigir defeitos com causa-raiz.
- `refatorador.md`: melhora o design sem mudar comportamento.
- `pesquisador.md`: pesquisa e sintetiza fontes.
- `planejador.md`: quebra objetivos em tarefas e milestones.
- `revisor.md`: revisão técnica/código com checklist.
- `testes.md`: define e implementa testes e critérios de validação.
- `backend-developer.md`: desenvolvimento backend com Clean Architecture, SOLID, DDD, Swagger e testes.


