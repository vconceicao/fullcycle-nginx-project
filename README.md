# FullCycle Nginx Project

Este projeto demonstra uma aplicação multi-container utilizando Docker Compose, composta por três serviços principais:

- **nginx**: Atua como proxy reverso, encaminhando requisições HTTP para o serviço de aplicação.
- **app**: Container com aplicação Node.js (ou outro framework baseado em Node) que processa as requisições.
- **db**: Container de banco de dados MySQL, usado pela aplicação para armazenar dados.

## Arquitetura e Componentes

- **Docker Compose (versão "3")**  
  O arquivo `docker-compose.yml` define os três serviços e os conecta através de uma rede personalizada chamada `nodenetwork`. Essa configuração permite que os containers se comuniquem pelo nome do serviço.

- **nginx**
    - Constrói a imagem a partir do diretório `nginx`.
    - Mapeia a porta `8080` do host para a porta `80` do container.
    - Usa uma configuração de proxy reverso para encaminhar as requisições para o serviço `app` na porta `3000`.

- **app**
    - Constrói a imagem a partir do diretório `node`.
    - Monta o diretório local `./node` no container para facilitar o desenvolvimento.
    - Depende do serviço `db` estar saudável para iniciar, garantindo que a aplicação tenha acesso ao banco de dados.

- **db**
    - Utiliza a imagem `mysql:5.7` e força a arquitetura `linux/amd64`.
    - Possui volumes para persistência dos dados e para executar um script de inicialização (`init.sql`).
    - Configurado com variáveis de ambiente para criação do banco de dados e definição da senha do root.
    - Inclui um healthcheck que garante que o MySQL esteja pronto para conexões antes de iniciar outros serviços que dependem dele.

## Configuração do Nginx

O arquivo de configuração do Nginx (por exemplo, `nginx.conf`) define o proxy reverso:

```nginx
server {
    listen 80;
    server_name fullcycle.com;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Nesta configuração, todas as requisições para o domínio `fullcycle.com` são redirecionadas para o serviço `app` na porta `3000`. A comunicação entre os containers é feita através do nome do serviço, graças à rede Docker definida no Compose.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Utilizar

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/vconceicao/fullcycle-nginx-project.git
   cd fullcycle-nginx-project
   ```

2. **Suba os Containers**

   Para iniciar todos os serviços (nginx, app e db) juntos, garantindo que a comunicação via rede ocorra corretamente, execute:

   ```bash
   docker compose up -d
   ```

3. **Verifique os Containers**

   Para verificar se os containers estão rodando e conectados à rede correta, utilize:

   ```bash
   docker ps
   docker network inspect fullcycle-nginx-project_nodenetwork
   ```

4. **Logs e Debug**

   Se houver problemas (por exemplo, erros de resolução de host no Nginx), verifique os logs:

   ```bash
   docker compose logs nginx
   ```

5. **Encerrando e Removendo Containers**

   Para parar e remover os containers e a rede criada pelo Compose, utilize:

   ```bash
   docker compose down
   ```


---

