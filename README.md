<h1 align = "center"> <img src="https://i.imgur.com/3gWep0X.png" width=30> NEKODE <img src="https://i.imgur.com/3gWep0X.png" width=30>  </h1>
<p align = "center"><img src="https://i.imgur.com/3gWep0X.png" /></p>
<p align = "center"> Nekode es una plataforma innovadora en el ámbito edtech que transforma el aprendizaje de JavaScript en una experiencia lúdica y envolvente. Con funciones de juego, como niveles y vidas, te permite evaluar tus conocimientos de manera interactiva. Además, cuenta con un sistema de ranking que mide tu progreso y lo compara con otros jugadores, asignando niveles y medallas para reconocer tus logros. Nekode ofrece valiosos feedbacks personalizados, indicándote las áreas específicas de JavaScript que debes reforzar, brindándote una ruta clara para mejorar tus habilidades en programación</p>
<hr>

## Beneficios Clave 🚀

- **Evaluación continua:** La plataforma te permite evaluar tus conocimientos de manera regular y ver tu progreso a lo largo del tiempo, lo que puede ayudarte a identificar áreas en las que necesitas mejorar.

- **Competencia saludable:** El ranking te permite competir con otros usuarios de la plataforma, lo que puede motivarte a esforzarte más y mejorar tus habilidades para alcanzar una posición más alta en el ranking.

- **Feedback inmediato:** Al completar los desafíos, recibes un feedback inmediato sobre tu desempeño, lo que te permite corregir errores y mejorar rápidamente.

<hr>

## FRONTEND 🖼️💻

### Desarrollada con: 🛠️

![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Redux ToolKit](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20Design-757575.svg?style=for-the-badge&logo=Material-Design&logoColor=white)

### Requerimientos ✔📋

### Documentacion

> [!IMPORTANT]
> Configuraciones Necesarias

### Deploy 🚀🚀

Puedes encontrar nuestra APP en el siguiente link: [https://link]()

<hr>

## BACKEND 🧠💻

### Desarrollada con: 🛠️

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![Typescrit](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Nest.js](https://img.shields.io/badge/NestJS-E0234E.svg?style=for-the-badge&logo=NestJS&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Postgre](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=OpenAI&logoColor=white)
![TypeOrm](https://img.shields.io/badge/Typeform-262627.svg?style=for-the-badge&logo=Typeform&logoColor=white)
![ENV](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black)
![ESLINT](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white)
![PRETTIER](https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7.svg?style=for-the-badge&logo=Render&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)
<br/>
<br/>

### Requerimientos ✔📋

- Para poder correr el servidor necesitas tener instalado NODEJS y NPM.
- Tambien necesitas una key de OPENAI para el servicio de preguntas y respuestas. <a href="https://www.openai.com/">OpenIA</a>

### Documentacion

[Users Stories](https://docs.google.com/document/d/16x0sYgoeFEt4D3vPSPaTOTju1cOy-13f/edit?usp=sharing&ouid=100530841611688647093&rtpof=true&sd=true)

[Documentación Entities y Endpoints](https://docs.google.com/document/d/1LmHfukfJfrR7wwEu7PBfiBvKXNnC6x1x5zCYGRiF4yE/edit?usp=sharing)

[Documentación Base de datos](https://drive.google.com/file/d/1--KIXqEQqCCLTVGoBLSqCeAxpzBUNFjs/view?usp=sharing)
<br/>

> [!IMPORTANT]
> Configuraciones Necesarias

### Instrucciones:

- Ir a la carpeta server

- Instalar dependencias con `npm i`

- Crear un archivo **`.env`** (Producción) y o **`.development.env`** (desarrollo) con las siguientes variables:

```env
#SERVER
PORT=Puerto en el cual se va a ejecutar el servidor

#DB
POSTGRES_DB=Nombre de la base de datos de PostgreSQL a utilizar
POSTGRES_USER=Nombre de usuario de PostgreSQL
POSTGRES_PASSWORD=Contraseña del usuario de PostgreSQL
POSTGRES_HOST=Host donde se encuentra la base de datos de PostgreSQL
POSTGRES_PORT=Puerto en el que se ejecuta la base de datos de PostgreSQL

#AUTH
JWTAUTH_SECRET=Clave secreta utilizada para generar el token JWT
JWTAUTH_EXPIRESIN=Tiempo de vida del token JWT en segundos

#OPENAI
OPENAI_API_KEY=Clave de la API de OpenAI
```

- Correr el servidor con `npm run start:dev`(Producción) o `npm start:prod`(desarrollo)

- La api correrá en el puesto especificado en la variable de entorno
  <br/>

### Deploy 🚀🚀

Puedes encontrar nuestra API en el siguiente link: [https://link]()
