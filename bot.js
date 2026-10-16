- name: Configurar Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 18

- name: Install dependencies
  run: |
    if [ -f package-lock.json ]; then npm ci; else npm install; fi

- name: Ejecutar script del NPC
  env:
    MC_HOST: ${{ secrets.MC_HOST }}    # set these in repo secrets if needed
    MC_PORT: ${{ secrets.MC_PORT }}
    MC_USER: ${{ secrets.MC_USER }}
    MC_PASS: ${{ secrets.MC_PASS }}
  run: |
    echo "Node version: $(node -v)"
    node --trace-warnings --unhandled-rejections=strict bot.js








NOMBRE DEL SEGUNDO ARCHIVO: .github/workflows/afk.yml
CÓDIGO DEL SEGUNDO ARCHIVO:






name: Minecraft NPC Bot 24/7

on:
  push:
    branches: [ main ]
  workflow_dispatch: # Permite encender el NPC de forma manual desde el panel web

jobs:
  run-bot:
    runs-on: ubuntu-latest
    steps:
    - name: Clonar repositorio
      uses: actions/checkout@v4

    - name: Configurar Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18

    - name: Instalar dependencias de Mineflayer
      run: npm install mineflayer

    - name: Ejecutar script del NPC
      run: node bot.js
