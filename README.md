# YuvaLink
## _Disaster Management System


YuvaLink is a management system designed to support government officials in effective disaster management. 

- Streamlines the planning, coordination
- Centralized platform for managing resources
- Real-time information



## Tech Stack

- **[ReactJS]** – A powerful JavaScript library for building fast, interactive user interfaces.
- **[TailwindCSS]** – A utility-first CSS framework for rapidly building modern, responsive designs.
- **[Bootstrap]** – A popular UI framework providing pre-built components and responsive layouts.
- **[Redux]** – State management library for predictable and centralized application state handling.
- **[NodeJS]** – Event-driven, non-blocking I/O runtime for building scalable backend services.
- **[AdonisJS]** – A fast and fully-featured Node.js framework for building robust server-side applications.
- **[PostgreSQL]** – A powerful, open-source relational database for secure and reliable data storage.
- **[Lucid ORM]** – An elegant ORM for AdonisJS to interact with the database using JavaScript models.
- **[VineJS]** – A modern validation library for validating API requests and user inputs.
- **[REST APIs]** – Enables seamless communication between frontend and backend services.
- **[JWT Authentication]** – Secure user authentication and role-based access control.
- **[Git & GitHub]** – Version control and collaboration tools for efficient development.



## Setup

Yuvalink requires [Node.js](https://nodejs.org/) v25+ to run.

Install reactJS using the Vite bundler.

```sh
npm create vite@latest yuvalinkFrontend
cd yuvalinkFrontend
```

## Install TailwindCSS next.

```sh
npm install tailwindcss @tailwindcss/vite
```

## Configure the Vite plugin
Add the @tailwindcss/vite plugin to your Vite configuration.

##### vite.config.ts
```sh
import { defineConfig } from 'vite'
## import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
  React(),  ## tailwindcss(),
  ],
})
```
## Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.
##### CSS
```sh
@import "tailwindcss";
```
For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Start using Tailwind in your HTML
Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using Tailwind’s utility classes to style your content.

##### HTML
```sh
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  --> <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```


## Development

