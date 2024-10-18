# Sistema de Gerenciamento de Clube de Tiro

Este repositório contém o código-fonte de um **Sistema de Gerenciamento de um Clube de Tiro**, desenvolvido como parte de um trabalho acadêmico. O projeto utiliza **React** no frontend e uma API construída em **Node.js** no backend, colocando em prática os conhecimentos adquiridos em ambas as stacks durante o curso.

## ✨ Visão Geral

O sistema oferece uma plataforma para a administração de um clube de tiro, incluindo funcionalidades para gerenciar membros, reservas de áreas de tiro e controle de competições. A aplicação foi desenvolvida de forma modular e extensível, garantindo uma interface amigável e intuitiva, e uma API robusta para o backend.

### 🎨 Estética e Design

O design do sistema foi pensado para facilitar a navegação e a usabilidade, oferecendo:

- **Interface moderna e responsiva:** Desenvolvida com React, a interface se adapta a diferentes tamanhos de tela.
- **Dashboard intuitivo:** Com informações relevantes e acessos rápidos às principais funcionalidades do sistema.
- **Estilo simples e funcional:** Cores neutras, layouts bem definidos e fácil acesso às informações.

## 🛠️ Tecnologias Utilizadas

As principais tecnologias utilizadas no desenvolvimento deste projeto incluem:

### Frontend (React):
- **React.js** - Biblioteca JavaScript para construção da interface de usuário.
- **React Router** - Gerenciamento de rotas da aplicação.
- **CSS3** - Estilização customizada da interface.
- **Axios** - Para comunicação entre frontend e backend.

### Backend (Node.js):
- **Node.js** - Plataforma para construção do backend.
- **Express.js** - Framework para construção de APIs RESTful.
- **PostgreSQL** - Banco de dados relacional para armazenamento dos dados do clube.
- **PrismaDB** - ORM para interagir com o Postgres.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### Backend

1. Clone este repositório:

   ```bash
   git clone https://github.com/leomartins98/siscluti.git
2. Acesse o diretório do backend:
    ```bash
    cd siscluti
    cd backend

3. Instale as dependências do backend:
   ```bash
    npm install

3. Use o Postgres na porta 5432, e faça uma imagem ou apenas instale o Postgres. Após isso, use o comando do Prisma para criar o banco de dados:
   ```bash
    npx prisma migrate deploy

4. Inicie o servidor de desenvolvimento do backend:
   ```bash
    npm run dev

O backend estará disponível em http://localhost:3333.

### Frontend

1. Clone o repositório do frontend:
   ```bash 
    git clone https://github.com/leomartins98/siscluti.git

3. Acesse o diretório do frontend:
    ```bash
    cd siscluti
    cd frontendv2

3. Instale as dependências do frontend:
    ```bash
    npm install

4. Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm start

A aplicação estará disponível em http://localhost:3000.

📜 Funcionalidades

- **Gerenciamento de Membros:** Adicionar, editar e remover membros do clube de tiro.
- **Cadastro de Professores:** Adicionar, editar e remover professores do clube de tiro.
- **Cadastro de Armas do Aluno:** Adicionar, editar e remover armas do aluno.
- **Agendamento de Horários:** Adicionar, visualizar, editar e remover agendamentos de horário com professor.

## 🚀 Funcionalidades Futuras

- **Autenticação:** Sistema de login com JWT, garantindo que apenas usuários autenticados possam acessar determinadas funcionalidades.
- **Relatórios:** Adicionar geração de relatórios sobre as atividades do clube, como participação em competições e uso das áreas de tiro.
- **Notificações:** Enviar notificações para os membros sobre eventos e atualizações importantes.

## 📝 Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.
