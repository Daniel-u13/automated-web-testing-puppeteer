# 📚 Ejemplos Básicos de Puppeteer

Estos ejemplos están diseñados para principiantes. Ve en orden del 1 al 5 para aprender progresivamente.

## 🎯 Orden de Aprendizaje

### 1️⃣ Abrir una Página
**Archivo:** `01-abrir-pagina.js`
- ✨ Lo más básico: abrir un navegador y cargar una página
- 🎓 Aprenderás: `launch()`, `newPage()`, `goto()`

```bash
node ejemplos-basicos/01-abrir-pagina.js
```

---

### 2️⃣ Captura de Pantalla
**Archivo:** `02-captura-pantalla.js`
- 📸 Tomar screenshots de páginas web
- 🎓 Aprenderás: `screenshot()`, `setViewport()`

```bash
node ejemplos-basicos/02-captura-pantalla.js
```

---

### 3️⃣ Hacer Clicks
**Archivo:** `03-hacer-clicks.js`
- 👆 Interactuar con elementos de la página
- 🎓 Aprenderás: `click()`, `waitForNavigation()`

```bash
node ejemplos-basicos/03-hacer-clicks.js
```

---

### 4️⃣ Llenar Formularios
**Archivo:** `04-llenar-formularios.js`
- ✍️ Escribir en campos de texto y enviar formularios
- 🎓 Aprenderás: `type()`, `keyboard.press()`

```bash
node ejemplos-basicos/04-llenar-formularios.js
```

---

### 5️⃣ Buscar y Extraer Texto
**Archivo:** `05-buscar-texto.js`
- 🔍 Extraer información de páginas web
- 🎓 Aprenderás: `$eval()`, `$$eval()`

```bash
node ejemplos-basicos/05-buscar-texto.js
```

---

## 💡 Consejos

- **headless: false** → Ver el navegador mientras funciona
- **headless: true** → Navegador invisible (más rápido)
- **slowMo** → Ralentiza las acciones para verlas mejor

## 🚨 Nota Importante

Estos ejemplos usan `waitForTimeout()` solo para fines educativos. En producción es mejor usar `waitForSelector()` o `waitForNavigation()`.
