/**
 * EJEMPLO 2: TOMAR CAPTURAS DE PANTALLA
 * ======================================
 * En este ejemplo aprenderás a tomar screenshots (capturas de pantalla)
 * de páginas web completas y de elementos específicos.
 *
 * Para ejecutar: node ejemplos-basicos/02-captura-pantalla.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando el navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  });

  const page = await browser.newPage();

  // Configurar el tamaño de la ventana
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Wikipedia...');
  await page.goto('https://es.wikipedia.org');

  console.log('📸 Tomando captura de pantalla completa...');

  // Tomar captura de toda la página
  await page.screenshot({
    path: 'captura-completa.png',
    fullPage: true // Captura toda la página, no solo lo visible
  });

  console.log('✅ Captura guardada como: captura-completa.png');

  console.log('📸 Tomando captura solo de lo visible...');

  // Tomar captura solo de lo que se ve en pantalla
  await page.screenshot({
    path: 'captura-visible.png',
    fullPage: false
  });

  console.log('✅ Captura guardada como: captura-visible.png');

  console.log('⏱️ Esperando 2 segundos...');
  await page.waitForTimeout(2000);

  console.log('👋 Cerrando el navegador...');
  await browser.close();

  console.log('✨ ¡Listo! Revisa las capturas de pantalla en la carpeta del proyecto.');
})();
