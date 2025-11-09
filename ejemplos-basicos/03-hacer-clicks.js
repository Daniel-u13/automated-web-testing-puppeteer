/**
 * EJEMPLO 3: HACER CLICKS EN ELEMENTOS
 * ====================================
 * Aquí aprenderás a interactuar con la página haciendo clicks
 * en botones, enlaces y otros elementos.
 *
 * Para ejecutar: node ejemplos-basicos/03-hacer-clicks.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando el navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200 // Más lento para ver mejor los clicks
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Wikipedia...');
  await page.goto('https://es.wikipedia.org');

  console.log('👆 Haciendo click en "Portada"...');

  // Hacer click en un enlace usando el texto visible
  await page.click('a[title="Visitar la página principal"]');

  // Esperar a que cargue la página
  await page.waitForNavigation();

  console.log('✅ Navegación completada!');

  console.log('⏱️ Esperando 2 segundos...');
  await page.waitForTimeout(2000);

  console.log('👆 Haciendo click en el primer enlace del contenido...');

  // Hacer click en cualquier enlace dentro del contenido
  // Este selector busca enlaces dentro del contenido principal
  const primerEnlace = await page.$('#mw-content-text a');
  if (primerEnlace) {
    await primerEnlace.click();
    await page.waitForNavigation();
    console.log('✅ Click realizado!');
  }

  console.log('⏱️ Esperando 3 segundos...');
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando el navegador...');
  await browser.close();

  console.log('✨ ¡Listo! Has aprendido a hacer clicks.');
})();
