# 🚀 Guia Completo para Publicar no GitHub

## ⚠️ Passo 1: Configurar o Git (Primeira vez apenas)

Se você ainda não configurou o Git, execute estes comandos:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

**Exemplo:**
```bash
git config --global user.name "Michele Elias"
git config --global user.email "micheleliasoliveira@example.com"
```

## 📦 Passo 2: Fazer o Commit Inicial

Execute no terminal dentro da pasta do projeto:

```bash
cd /Users/micheleliasoliveira/Documents/dashboard-horas

# Fazer o commit inicial
git commit -m "Initial commit: Dashboard de Horas com filtros e visualizações"
```

## 🌐 Passo 3: Criar o Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `dashboard-horas`
   - **Description**: `Dashboard interativo para visualização de horas trabalhadas por colaborador e tipo de tarefa`
   - **Visibility**: Escolha **Public** (público) ou **Private** (privado)
   - ⚠️ **NÃO marque** "Add a README file" (já temos um)
   - ⚠️ **NÃO marque** "Add .gitignore" (já temos um)
5. Clique em **"Create repository"**

## 🔗 Passo 4: Conectar e Publicar

Após criar o repositório, o GitHub mostrará instruções. Execute estes comandos:

```bash
# Adicione o repositório remoto (SUBSTITUA SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/dashboard-horas.git

# Verifique se foi adicionado corretamente
git remote -v

# Envie o código para o GitHub
git push -u origin main
```

**Exemplo:**
Se seu username for `michelelias`, o comando seria:
```bash
git remote add origin https://github.com/michelelias/dashboard-horas.git
git push -u origin main
```

## ✅ Passo 5: Verificar

Acesse seu repositório no GitHub:
`https://github.com/SEU_USUARIO/dashboard-horas`

Você deve ver todos os arquivos do projeto!

---

## 📝 Comandos Úteis para o Futuro

### Fazer alterações e atualizar no GitHub:

```bash
# 1. Ver o que foi alterado
git status

# 2. Adicionar todas as alterações
git add .

# 3. Fazer commit com uma mensagem descritiva
git commit -m "Adicionei nova funcionalidade X"

# 4. Enviar para o GitHub
git push
```

### Ver histórico de commits:
```bash
git log --oneline
```

### Ver diferenças antes de commitar:
```bash
git diff
```

---

## 🌍 Publicar no GitHub Pages (Opcional - Deixar Online)

Se quiser que o dashboard fique acessível online:

### Opção 1: Usando GitHub Actions (Recomendado)

1. Crie a pasta `.github/workflows/`:
```bash
mkdir -p .github/workflows
```

2. Crie o arquivo `.github/workflows/deploy.yml` com este conteúdo:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Faça commit e push:
```bash
git add .github/workflows/deploy.yml
git commit -m "Adiciona deploy automático para GitHub Pages"
git push
```

4. No GitHub, vá em **Settings** > **Pages**
5. Em **Source**, selecione **GitHub Actions**
6. Aguarde alguns minutos e seu site estará em:
   `https://SEU_USUARIO.github.io/dashboard-horas`

---

## ❓ Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/dashboard-horas.git
```

### Erro: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Esqueceu de configurar nome/email?
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

## 🎉 Pronto!

Seu projeto está no GitHub! Compartilhe o link com quem quiser. 🚀
