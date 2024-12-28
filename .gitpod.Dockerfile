FROM gitpod/workspace-full

# Instala PostgreSQL
RUN sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib

# Configura o PostgreSQL para iniciar automaticamente
RUN sudo service postgresql start