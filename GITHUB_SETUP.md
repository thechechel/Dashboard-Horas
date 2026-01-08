# Guia para Publicar no GitHub

## Passo a Passo

### 1. Criar o repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Preencha:
   - **Repository name**: `dashboard-horas` (ou o nome que preferir)
   - **Description**: "Dashboard interativo para visualização de horas trabalhadas"
   - **Visibility**: Escolha Public ou Private
   - **NÃO marque** "Initialize this repository with a README" (já temos um)
5. Clique em "Create repository"

### 2. Conectar o repositório local ao GitHub

Após criar o repositório no GitHub, você verá instruções. Execute os seguintes comandos:

```bash
# Adicione o repositório remoto (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/dashboard-horas.git

# Ou se preferir usar SSH:
# git remote add origin git@github.com:SEU_USUARIO/dashboard-horas.git

# Renomeie a branch para main (se necessário)
git branch -M main

# Envie o código para o GitHub
git push -u origin main
```

### 3. Verificar

Acesse seu repositório no GitHub e verifique se todos os arquivos foram enviados corretamente.

## Comandos Úteis

### Para fazer alterações futuras:

```bash
# Ver o status das alterações
git status

# Adicionar arquivos alterados
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Enviar para o GitHub
git push
```

### Para clonar o repositório em outro computador:

```bash
git clone https://github.com/SEU_USUARIO/dashboard-horas.git
cd dashboard-horas
npm install
npm run dev
```

## Publicar no GitHub Pages (Opcional)

Se quiser publicar o dashboard online:

1. No repositório do GitHub, vá em **Settings** > **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Crie um arquivo `.github/workflows/deploy.yml` com:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. Faça commit e push deste arquivo
5. O GitHub Actions irá publicar automaticamente em: `https://SEU_USUARIO.github.io/dashboard-horas`
