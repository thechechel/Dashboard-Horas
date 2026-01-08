# Dashboard de Horas

Dashboard interativo para visualização de horas trabalhadas por colaborador e tipo de tarefa.

## Funcionalidades

- **Filtros avançados:**
  - Período: Seletor de intervalo de datas
  - Tipo de tarefa: Seleção múltipla de tipos de tarefa
  - Responsável: Seleção múltipla de colaboradores

- **Visualizações:**
  - Gráfico de barras agrupadas: Horas por tipo de tarefa e responsável
  - Gráfico de pizza: Distribuição de horas por responsável
  - Gráfico de barras horizontais: Total de horas por responsável
  - Gráfico de barras horizontais: Total de horas por tipo de tarefa
  - Tabela detalhada: Detalhamento completo por responsável e tarefa

## Requisitos

- Node.js 18.x ou superior (recomendado: 20.x ou 24.x LTS)
- npm ou yarn

## Instalação

1. Se você usa nvm (Node Version Manager), use a versão especificada:
```bash
nvm use
```

2. Instale as dependências:
```bash
npm install
```

2. Certifique-se de que o arquivo `Planilha Horas.csv` está na pasta `public/`

3. Inicie o servidor de desenvolvimento:
```bash
# Se você usa nvm, certifique-se de usar a versão correta:
source ~/.nvm/nvm.sh && nvm use

# Depois inicie o servidor:
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

**Nota:** Se você encontrar erros relacionados à versão do Node.js, certifique-se de estar usando Node.js 18.x ou superior. Se você usa nvm, execute `nvm use` antes de `npm run dev`.

## Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## Estrutura do Projeto

```
dashboard-horas/
├── public/
│   └── Planilha Horas.csv
├── src/
│   ├── components/
│   │   ├── Filtros.tsx
│   │   ├── Filtros.css
│   │   ├── Graficos.tsx
│   │   └── Graficos.css
│   ├── utils/
│   │   ├── csvParser.ts
│   │   └── dataProcessor.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── index.html
├── package.json
└── vite.config.ts
```

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Recharts (gráficos)
- PapaParse (parsing de CSV)
- date-fns (manipulação de datas)
