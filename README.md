# task manager

```bash
docker-compose up -d
docker-compose down

npm run start:dev
```

## docker

https://github.com/khezen/compose-postgres

Access to postgres: localhost:5432 postgres changeme
Access to PgAdmin: http://localhost:5050/ pgadmin4@pgadmin.org admin
db name: taskmanagment

## first start

1. go to http://localhost:5050/ `pgadmin4@pgadmin.org` `admin` - Server - Create

- name - `__ANY_NAME_HERE__`
- host - `postgres`
- maintenance - `postgres`
- username - `postgres`
- password - `changeme`

2. create db with name `taskmanagment`
