# Project React JS - Pomodoro

	Pomodoro Online

	Visit Page: ...

## Tecnologías usadas en el proyecto:

- React
- Material-UI
- Node
- Express
- Prisma
- Postgres
- Firebase

## Author

- Luciano Coronel - [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luciano-coronel-90503bb8/)

## Instalacion

In the project directory, you can run:

## `git clone https://github.com/`

## BoilerPlate

El boilerplate cuenta con dos carpetas: `Server` y `Client/pomodoro`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `Server` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5423/nombre_de_la_base_de_datos"

```

Reemplazar `usuario` y `contraseña` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `pomodoro`

## `npm install`

### On folder /Client `npm install` & `npm start`
### On folder /Server `npm install` & `npm start`