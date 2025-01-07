# URL Shortener API

## Descrição

Este projeto é um encurtador de URLs desenvolvido com NestJS, utilizando PostgreSQL como banco de dados, Prisma como ORM e Docker para facilitar a configuração e o deploy.

## Tecnologias Utilizadas

NestJS: Um framework para a construção de aplicações Node.js escaláveis e eficientes.<br>
PostgreSQL: Um sistema de gerenciamento de banco de dados relacional avançado e open-source.<br>
Prisma: Um ORM moderno que facilita o acesso ao banco de dados com segurança e eficiência.<br>
Docker: Uma plataforma para desenvolvimento, envio e execução de aplicações em containers.<br>
Swagger: Ferramenta para documentação de APIs, facilitando a visualização e interação com os endpoints.<br>
## Funcionalidades

Criação de URLs Curtas: Permite criar URLs curtas a partir de URLs longas.<br>
Redirecionamento: Redireciona automaticamente para a URL original quando a URL curta é acessada.<br>
Autenticação e Autorização: Utiliza guardas de autenticação para proteger rotas sensíveis.<br>
Listagem de URLs: Permite listar todas as URLs criadas pelo usuário autenticado.<br>
Detalhes da URL: Fornece detalhes específicos de uma URL encurtada.<br>
Atualização e Exclusão: Permite atualizar ou excluir URLs curtas criadas pelo usuário autenticado.<br>
## Como Executar

### Pré-requisitos

Docker e Node.js instalados
### Passos

Clone o repositório: ```bash git clone https://github.com/brenobcamp/urlshortener.git```<br>

Entre na pasta do projeto ```cd urlshortener ```<br>

Suba os containers com Docker Compose: ```bash docker compose up -d ```

## Documentação da API

A documentação da API está disponível através do Swagger. Após iniciar a aplicação, acesse http://localhost:3000/api para visualizar e interagir com os endpoints.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.
