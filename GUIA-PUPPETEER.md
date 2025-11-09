# 🎭 Guía Completa de Puppeteer para Principiantes

## 📚 ¿Qué es Puppeteer?

**Puppeteer** es una librería de Node.js que te permite controlar navegadores Chrome o Chromium mediante código. Es como si tuvieras un robot que puede:

- 🌐 Abrir páginas web
- 👆 Hacer clicks en botones y enlaces
- ✍️ Llenar formularios
- 📸 Tomar capturas de pantalla
- 📄 Generar PDFs
- 🔍 Extraer información de páginas
- 🧪 Hacer pruebas automatizadas

---

## 🚀 Instalación

```bash
npm install puppeteer
```

Esto descarga una versión de Chromium automáticamente (~170MB).

---

## 🎯 Conceptos Básicos

### 1. Browser (Navegador)

El objeto `browser` representa una instancia del navegador.

```javascript
// Lanzar un nuevo navegador
const browser = await puppeteer.launch();

// Cerrar el navegador
await browser.close();
```

**Opciones comunes:**

```javascript
const browser = await puppeteer.launch({
  headless: false,    // Ver el navegador (true = invisible)
  slowMo: 100,        // Ralentizar acciones (ms)
  devtools: true,     // Abrir DevTools automáticamente
  args: ['--window-size=1920,1080']  // Argumentos de Chrome
});
```

---

### 2. Page (Página/Pestaña)

El objeto `page` representa una pestaña del navegador.

```javascript
// Crear nueva página
const page = await browser.newPage();

// Navegar a una URL
await page.goto('https://example.com');

// Cerrar la página
await page.close();
```

---

### 3. Selectores

Los selectores te permiten encontrar elementos en la página.

#### CSS Selectors (recomendado)

```javascript
// Por ID
await page.click('#boton-enviar');

// Por clase
await page.click('.btn-primary');

// Por atributo
await page.click('[type="submit"]');

// Combinados
await page.click('button.btn-primary');
```

#### XPath Selectors (avanzado)

```javascript
// Por texto
await page.click('xpath/.//button[text()="Enviar"]');

// Por contenido parcial
await page.click('xpath/.//button[contains(text(), "Env")]');
```

---

## 🔧 Operaciones Comunes

### Navegación

```javascript
// Ir a una URL
await page.goto('https://example.com');

// Ir hacia atrás
await page.goBack();

// Ir hacia adelante
await page.goForward();

// Recargar página
await page.reload();

// Esperar a que cargue
await page.waitForNavigation();
```

---

### Clicks e Interacciones

```javascript
// Click simple
await page.click('#boton');

// Doble click
await page.click('#boton', { clickCount: 2 });

// Click derecho
await page.click('#boton', { button: 'right' });

// Hover (pasar el mouse)
await page.hover('#menu');
```

---

### Escribir Texto

```javascript
// Escribir en un campo
await page.type('#nombre', 'Juan Pérez');

// Escribir con delay (simular tipeo humano)
await page.type('#nombre', 'Juan Pérez', { delay: 100 });

// Limpiar campo y escribir
await page.click('#nombre', { clickCount: 3 }); // Seleccionar todo
await page.keyboard.press('Backspace');
await page.type('#nombre', 'Nuevo texto');
```

---

### Teclado

```javascript
// Presionar tecla
await page.keyboard.press('Enter');
await page.keyboard.press('Escape');
await page.keyboard.press('Tab');

// Combinaciones
await page.keyboard.down('Control');
await page.keyboard.press('A');
await page.keyboard.up('Control');

// Escribir texto (más rápido que type)
await page.keyboard.type('Hola mundo');
```

---

### Capturas de Pantalla

```javascript
// Captura completa
await page.screenshot({
  path: 'captura.png',
  fullPage: true
});

// Solo viewport visible
await page.screenshot({
  path: 'captura.png',
  fullPage: false
});

// Con calidad (solo JPG)
await page.screenshot({
  path: 'captura.jpg',
  type: 'jpeg',
  quality: 90
});

// De un elemento específico
const elemento = await page.$('#contenido');
await elemento.screenshot({ path: 'elemento.png' });
```

---

### Generar PDF

```javascript
await page.pdf({
  path: 'pagina.pdf',
  format: 'A4',
  printBackground: true
});
```

---

### Extraer Datos

```javascript
// Obtener texto de un elemento
const titulo = await page.$eval('#titulo', el => el.textContent);

// Obtener atributo
const href = await page.$eval('a', el => el.href);

// Obtener múltiples elementos
const enlaces = await page.$$eval('a', links => {
  return links.map(link => link.href);
});

// Evaluar código en el contexto de la página
const info = await page.evaluate(() => {
  return {
    url: window.location.href,
    titulo: document.title,
    ancho: window.innerWidth
  };
});
```

---

### Esperas (Importante!)

```javascript
// ❌ MAL - Tiempo fijo (frágil)
await page.waitForTimeout(5000);

// ✅ BIEN - Esperar elemento
await page.waitForSelector('#boton');

// ✅ BIEN - Esperar navegación
await page.waitForNavigation();

// ✅ BIEN - Esperar función
await page.waitForFunction(() => {
  return document.querySelector('#loading') === null;
});

// Con timeout personalizado
await page.waitForSelector('#boton', { timeout: 10000 });
```

---

## 📦 Métodos para Seleccionar Elementos

```javascript
// $ - Obtener primer elemento (devuelve ElementHandle)
const boton = await page.$('#boton');
await boton.click();

// $$ - Obtener todos los elementos
const botones = await page.$$('.btn');
console.log(`Hay ${botones.length} botones`);

// $eval - Ejecutar función en un elemento
const texto = await page.$eval('#titulo', el => el.textContent);

// $$eval - Ejecutar función en múltiples elementos
const textos = await page.$$eval('p', elements => {
  return elements.map(el => el.textContent);
});
```

---

## 🎨 Configuraciones Útiles

### Tamaño de Ventana

```javascript
await page.setViewport({
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
});
```

### Emular Dispositivos

```javascript
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 12'];

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.emulate(iPhone);
```

### Headers Personalizados

```javascript
await page.setExtraHTTPHeaders({
  'Accept-Language': 'es-ES,es;q=0.9',
  'Custom-Header': 'valor'
});
```

### User Agent

```javascript
await page.setUserAgent('Mi Bot 1.0');
```

---

## 🔍 Debugging

### Ver el Navegador

```javascript
const browser = await puppeteer.launch({
  headless: false,  // Ver el navegador
  devtools: true    // Abrir DevTools
});
```

### Ralentizar Acciones

```javascript
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250  // Ralentizar 250ms cada acción
});
```

### Console Logs

```javascript
// Escuchar los console.log de la página
page.on('console', msg => {
  console.log('PÁGINA DICE:', msg.text());
});
```

---

## ⚠️ Errores Comunes

### 1. "Execution context was destroyed"

**Causa:** Intentas usar un elemento después de que la página navegó.

**Solución:** Vuelve a obtener el elemento después de navegar.

```javascript
// ❌ MAL
const boton = await page.$('#boton');
await page.goto('otra-pagina.com');
await boton.click(); // Error!

// ✅ BIEN
await page.goto('otra-pagina.com');
const boton = await page.$('#boton');
await boton.click();
```

### 2. "Timeout exceeded"

**Causa:** El elemento no apareció en el tiempo esperado.

**Solución:** Aumenta el timeout o verifica el selector.

```javascript
// Aumentar timeout
await page.waitForSelector('#boton', { timeout: 30000 });

// O verificar que el selector sea correcto
await page.waitForSelector('.clase-correcta');
```

### 3. "Node is either not visible or not an HTMLElement"

**Causa:** El elemento existe pero no es visible.

**Solución:** Espera a que sea visible o verifica el CSS.

```javascript
await page.waitForSelector('#boton', { visible: true });
```

---

## 🎓 Mejores Prácticas

### 1. Usa async/await

```javascript
// ✅ BIEN
const titulo = await page.title();

// ❌ MAL
page.title().then(titulo => console.log(titulo));
```

### 2. Maneja errores

```javascript
try {
  await page.click('#boton-que-no-existe');
} catch (error) {
  console.error('Error al hacer click:', error);
}
```

### 3. Limpia recursos

```javascript
let browser;
try {
  browser = await puppeteer.launch();
  // ... tu código
} finally {
  if (browser) {
    await browser.close();
  }
}
```

### 4. Usa waitForSelector en lugar de waitForTimeout

```javascript
// ❌ MAL - Tiempo arbitrario
await page.waitForTimeout(3000);

// ✅ BIEN - Espera real
await page.waitForSelector('#contenido-cargado');
```

---

## 📖 Recursos Adicionales

- 📘 [Documentación oficial de Puppeteer](https://pptr.dev/)
- 🎮 [Playground de Puppeteer](https://try-puppeteer.appspot.com/)
- 💡 [Ejemplos de la comunidad](https://github.com/puppeteer/puppeteer/tree/main/examples)

---

## 📁 Estructura de Este Proyecto

```
📦 automated-web-testing-puppeteer/
├── 📄 google-pay-test.js         # Ejemplo AVANZADO (Google Pay)
├── 📄 GUIA-PUPPETEER.md          # Esta guía
├── 📂 ejemplos-basicos/          # Ejemplos progresivos
│   ├── 01-abrir-pagina.js
│   ├── 02-captura-pantalla.js
│   ├── 03-hacer-clicks.js
│   ├── 04-llenar-formularios.js
│   └── 05-buscar-texto.js
└── 📂 ejercicios/                # Ejercicios prácticos
    ├── ejercicio-01.js
    ├── ejercicio-02.js
    ├── ejercicio-03.js
    └── 📂 soluciones/
```

---

## 🎯 Ruta de Aprendizaje Recomendada

1. ✅ **Lee esta guía** para entender los conceptos básicos
2. 🔨 **Ejecuta los ejemplos** en `ejemplos-basicos/` en orden
3. 💪 **Haz los ejercicios** en `ejercicios/`
4. 🚀 **Estudia el código avanzado** en `google-pay-test.js`
5. 🎨 **Crea tus propios scripts** para tus necesidades

---

¡Mucha suerte en tu aprendizaje! 🎉
