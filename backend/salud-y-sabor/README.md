## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create Data Base

```bash
#Comandos para ejecutar en la consola de postgresql
-- Crear la base de datos llamada "prueba_db"
CREATE DATABASE prueba_db;

-- Crear un usuario llamado "user_prueba" con contraseña "password_prueba"
CREATE USER user_prueba WITH PASSWORD 'password_prueba';

-- Cambiar el propietario de la base de datos "prueba_db" a "user_prueba"
ALTER DATABASE prueba_db OWNER TO user_prueba;

-- Otorgar todos los privilegios sobre la base de datos "prueba_db" a "user_prueba"
GRANT ALL PRIVILEGES ON DATABASE prueba_db TO user_prueba;

-- Conceder permisos de conexión a "user_prueba" en la base de datos "prueba_db"
GRANT CONNECT ON DATABASE prueba_db TO user_prueba;

-- Otorgar todos los privilegios en todas las tablas del esquema "public" a "user_prueba"
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_prueba;

-- Otorgar todos los privilegios en todas las secuencias del esquema "public" a "user_prueba"
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_prueba;

-- Asegurar que los futuros objetos (tablas) creados en el esquema "public" otorguen todos los privilegios a "user_prueba"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO user_prueba;

-- Asegurar que las futuras secuencias creadas en el esquema "public" otorguen todos los privilegios a "user_prueba"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO user_prueba;


```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
