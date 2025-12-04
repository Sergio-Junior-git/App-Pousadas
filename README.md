# 🏨 App Pousadas  
  
**Plataforma para cadastro, busca e anúncio de pousadas.**  
Proprietários podem cadastrar suas pousadas e visitantes podem procurar e visualizar opções de hospedagem.  
  
---  
  
## 📌 Sobre o Projeto  
  
O **App Pousadas** é uma aplicação web composta por:  
  
- **Frontend:** SPA em Angular — interface para Cadastro, Busca e Visualização de pousadas.  
- **Backend:** API REST em Spring Boot — gerencia autenticação, dados de pousadas, quartos e reservas.  
  
Objetivo: conectar proprietários e hóspedes com uma interface simples, segura e responsiva.  
  
---  
  
## 🧱 Tecnologias  
  
**Frontend**  
- Angular  
- TypeScript  
- Angular Material
  
**Backend**  
- Spring Boot  
- Spring Security + JWT  
- MySQL  
- JPA / Hibernate  
- Maven  
  
---  
  
## ⚙️ Funcionalidades Principais  
  
**Usuários**  
- Cadastro e login  
- Perfis de usuário (Hóspede e Proprietário)  
- Atualização de perfil  
  
**Pousadas**  
- Cadastro e edição de pousadas por proprietários  
- Upload de imagens  
- Listagem pública de pousadas  
- Busca por nome e localização  
  
**Quartos**  *(em desenvolvimento)*  
- Cadastro de tipos de quarto  
- Associação de quartos a pousadas  
  
**Reservas** *(em desenvolvimento)*  
- Criar reserva  
- Verificar disponibilidade  
- Histórico de reservas  
  
---  
  
## 📂 Estrutura do Repositório  
App-Pousadas/  
├─ reserva-pousadas-back-end/ # API Spring Boot  
└─ pousadas-frontend/ # Aplicação Angular  
  
## ▶️ Como Executar (Local)  
  
### Backend (Spring Boot)  
1. Entre na pasta `backend`  
2. entre na scr depois main depois java  
3. Altere o application.properties para o seu banco de dados  
4. rode o ReservaPousadasApplication.java  
  
A API ficará normalmente em http://localhost:8080.  
  
### Frontend (Angular)  
1. Entre na pasta frontend  
2. Instale dependências: npm install (usado no terminal)  
3. Rode a aplicação: ng serve  
  
A aplicação abrirá em http://localhost:4200/  
  
## 👨‍💻 Autor  
  
Sérgio  
github: https://github.com/Sergio-Junior-git  
email: sergio.galdino.junior01@gmail.com  
