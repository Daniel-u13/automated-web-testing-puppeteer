/**
 * EJEMPLO 1: ABRIR UNA PÁGINA WEB
 * ===============================
 * Este es el ejemplo más básico de Puppeteer.
 * Simplemente abre un navegador, va a una página y la cierra.
 *
 * Para ejecutar: node ejemplos-basicos/01-abrir-pagina.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando el navegador...');

  // Lanzar un navegador (Chrome)
  const browser = await puppeteer.launch({
    headless: false, // false = ver el navegador, true = modo invisible
    slowMo: 100      // Ralentiza las acciones para que puedas verlas (en milisegundos)
  });

  console.log('📄 Abriendo una nueva página...');

  // Abrir una nueva pestaña
  const page = await browser.newPage();

  console.log('🌐 Navegando a Wikipedia...');

  // Navegar a una URL
  await page.goto('https://es.wikipedia.org');

  console.log('✅ ¡Página cargada! Esperando 3 segundos antes de cerrar...');

  // Esperar 3 segundos para que puedas ver la página
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando el navegador...');

  // Cerrar el navegador
  await browser.close();

  console.log('✨ ¡Listo! El ejemplo ha terminado.');
})();
