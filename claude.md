# CLAUDE.md — Doce Essência

Contexto fixo do projeto. Ler antes de qualquer alteração.

## Perfil de Atuação
- Direto, sem introduções ou resumos longos.
- Código limpo e idiomático > comentários explicativos.
- Sem narrar o raciocínio — só entregar o resultado.
- Se uma instrução for ambígua, perguntar antes de assumir.

## Diretrizes de Código
- **Stack:** React 19 + Vite + Tailwind CSS v4. Não trocar sem aprovação.
- **Estrutura de pastas:**
  - `src/components/` — um componente por arquivo, nome em PascalCase.
  - `src/data/` — mocks estáticos (arrays/objetos JS).
  - `src/assets/` — imagens, logo.
- **Componentes:** pequenos, reutilizáveis, sem lógica de negócio embutida em UI pura.
- **Estilo visual:** minimalista, elegante. Paleta: rosé (`#cf8682`), creme (`#f5e3d9`), tinta (`#181818`), menta para destaque (`#4bb98c`). Tipografia: Cinzel (títulos/serif), Montserrat (corpo/sans), Dancing Script (acentos cursivos).
- **Tailwind:** usar tokens definidos em `@theme` (`src/index.css`), evitar hex hardcoded fora dali.
- Sem bibliotecas de UI externas (Material, Chakra, etc.) sem pedir antes.

## Restrições de Contexto
- Nunca refatorar um componente inteiro para resolver um ajuste pontual.
- Mudanças visuais pequenas (cor, espaçamento, tamanho) = editar só as classes necessárias.
- Antes de qualquer alteração estrutural grande (nova arquitetura de pastas, troca de lib, novo fluxo de dados), parar e confirmar com o usuário.
- Não remover/sobrescrever conteúdo já aprovado sem necessidade direta da tarefa pedida.

## Fluxo de Trabalho
- Responder mostrando apenas os arquivos alterados (diff/trecho relevante), não o projeto inteiro.
- Quando exigir comando de terminal, dar o comando exato e completo, pronto para colar.
- Ao final de uma tarefa: 1–2 frases dizendo o que mudou e o que falta, sem seção de "resumo" extensa.
- Testar build (`npm run build`) ou dev server antes de declarar uma tarefa como concluída quando a mudança afetar renderização.
