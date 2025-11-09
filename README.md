# 🎭 Puppeteer: Automatización Web y Testing
> 🚀 Aprende Puppeteer desde cero - Ejemplos, ejercicios y guías completas

![Google Pay testing](google-pay-testing.gif)

## 📖 Acerca de Este Proyecto

Este repositorio contiene:
- ✅ **Ejemplos básicos progresivos** - Aprende paso a paso
- 💪 **Ejercicios prácticos** - Pon a prueba tus conocimientos
- 📚 **Guía completa de Puppeteer** - Referencia de conceptos y métodos
- 🧪 **Ejemplo avanzado** - Testing de Google Pay

---

## 🎯 Para Principiantes - Empieza Aquí

Si eres nuevo en Puppeteer, sigue este orden:

### 1️⃣ Instalación

```bash
# Instalar las dependencias
npm install
```

### 2️⃣ Lee la Guía

📄 **[GUIA-PUPPETEER.md](GUIA-PUPPETEER.md)** - Conceptos básicos, mejores prácticas y ejemplos

### 3️⃣ Ejecuta los Ejemplos Básicos

Ve a la carpeta `ejemplos-basicos/` y ejecuta los scripts en orden:

```bash
# Ejemplo 1: Abrir una página
node ejemplos-basicos/01-abrir-pagina.js

# Ejemplo 2: Captura de pantalla
node ejemplos-basicos/02-captura-pantalla.js

# Ejemplo 3: Hacer clicks
node ejemplos-basicos/03-hacer-clicks.js

# Ejemplo 4: Llenar formularios
node ejemplos-basicos/04-llenar-formularios.js

# Ejemplo 5: Buscar y extraer texto
node ejemplos-basicos/05-buscar-texto.js
```

### 4️⃣ Prueba el Ejemplo de Google

```bash
node ejemplo-google.js
```

Este script hace una búsqueda en Google y extrae los resultados.

### 5️⃣ Haz los Ejercicios

Ve a la carpeta `ejercicios/` y resuelve los desafíos:

```bash
# Intenta resolver el ejercicio 1
node ejercicios/ejercicio-01.js

# Si te atascas, revisa la solución
node ejercicios/soluciones/ejercicio-01-solucion.js
```

---

## 📁 Estructura del Proyecto

```
📦 automated-web-testing-puppeteer/
│
├── 📄 README.md                  # Este archivo
├── 📄 GUIA-PUPPETEER.md          # Guía completa de Puppeteer
├── 📄 ejemplo-google.js          # Ejemplo práctico simple
├── 📄 google-pay-test.js         # Ejemplo AVANZADO
├── 📄 package.json
│
├── 📂 ejemplos-basicos/          # Aprende paso a paso
│   ├── README.md
│   ├── 01-abrir-pagina.js
│   ├── 02-captura-pantalla.js
│   ├── 03-hacer-clicks.js
│   ├── 04-llenar-formularios.js
│   └── 05-buscar-texto.js
│
└── 📂 ejercicios/                # Practica tus habilidades
    ├── README.md
    ├── ejercicio-01.js
    ├── ejercicio-02.js
    ├── ejercicio-03.js
    └── 📂 soluciones/
        ├── ejercicio-01-solucion.js
        ├── ejercicio-02-solucion.js
        └── ejercicio-03-solucion.js
```

---

## 🧪 Ejemplo Avanzado: Google Pay Testing

Este proyecto originalmente se creó para testing automatizado de Google Pay.

### Requirements
- A running Chrome instance with a logged-in user
- Chrome needs to be started with the `--remote-debugging-port=<port>` and `--user-data-dir=<dir>` flags.

  For example on macOS when using Chrome Canary:

  ```sh
  $ /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 --user-data-dir=chrome-remote-debugging
  ```

### Ejecutar el test

```sh
# run the test
node google-pay-test.js
```

⚠️ **Nota:** Este es un ejemplo AVANZADO. Si eres principiante, empieza con los ejemplos básicos.

---

## 💡 ¿Qué es Puppeteer?

Puppeteer es una librería de Node.js que te permite controlar navegadores Chrome/Chromium mediante código. Puedes usarlo para:

- 🔍 **Web Scraping** - Extraer datos de sitios web
- 🧪 **Testing Automatizado** - Probar tu aplicación web
- 📸 **Capturas de Pantalla** - Generar screenshots y PDFs
- 🤖 **Automatización** - Automatizar tareas repetitivas
- 📊 **Monitoreo** - Verificar que tu sitio funcione correctamente

---

## 🚀 Casos de Uso Comunes

### Web Scraping
```javascript
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');

const datos = await page.$$eval('h2', headings => {
  return headings.map(h => h.textContent);
});

console.log(datos);
await browser.close();
```

### Testing de Formularios
```javascript
await page.goto('https://mi-sitio.com/login');
await page.type('#username', 'usuario@example.com');
await page.type('#password', 'mi-password');
await page.click('button[type="submit"]');
await page.waitForNavigation();

// Verificar que el login fue exitoso
const url = page.url();
console.log('Login exitoso:', url.includes('/dashboard'));
```

### Generar PDFs
```javascript
await page.goto('https://example.com');
await page.pdf({
  path: 'pagina.pdf',
  format: 'A4',
  printBackground: true
});
```

---

## 📚 Recursos Adicionales

- 📘 [Documentación oficial de Puppeteer](https://pptr.dev/)
- 🎮 [Puppeteer Playground](https://try-puppeteer.appspot.com/)
- 💡 [Ejemplos de la comunidad](https://github.com/puppeteer/puppeteer/tree/main/examples)
- 📖 [Guía completa en este repo](GUIA-PUPPETEER.md)

---

## 🤝 Contribuir

Si encuentras errores o quieres agregar más ejemplos, ¡las contribuciones son bienvenidas!

---

## 📝 Licencia

ISC

---

**¡Feliz automatización! 🎉**

