# task manager

```bash
# https://github.com/khezen/compose-postgres
docker-compose up -d
docker-compose down

# если локально уже запущен, его нужно остановить, иначе будет в него стучаться
brew services stop postgresql

npm run start:dev
```

## first start

- http://localhost:5050/

  - `pgadmin4@pgadmin.org` - username
  - `admin` - password
  - Object - Create - Server

- name - указать любое имя
- host - `postgres`
- maintenance - `postgres`
- username - `postgres`
- password - `changeme`
