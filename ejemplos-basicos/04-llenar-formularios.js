/**
 * EJEMPLO 4: LLENAR FORMULARIOS
 * ==============================
 * Aprenderás a escribir en campos de texto, seleccionar opciones
 * y enviar formularios.
 *
 * Para ejecutar: node ejemplos-basicos/04-llenar-formularios.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando el navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300 // Más lento para ver cómo se llena el formulario
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Wikipedia...');
  await page.goto('https://es.wikipedia.org');

  console.log('✍️ Escribiendo en el buscador...');

  // Buscar el campo de búsqueda y escribir en él
  const campoBusqueda = '#searchInput';

  // Hacer click en el campo para enfocarlo
  await page.click(campoBusqueda);

  // Escribir texto (simula escribir letra por letra)
  await page.type(campoBusqueda, 'Puppeteer', { delay: 100 });

  console.log('✅ Texto escrito!');

  console.log('⏱️ Esperando 1 segundo...');
  await page.waitForTimeout(1000);

  console.log('🔍 Enviando el formulario de búsqueda...');

  // Presionar Enter para buscar
  await page.keyboard.press('Enter');

  // Esperar a que cargue la página de resultados
  await page.waitForNavigation();

  console.log('✅ Búsqueda completada!');

  console.log('📸 Tomando captura del resultado...');
  await page.screenshot({ path: 'busqueda-resultado.png' });

  console.log('⏱️ Esperando 3 segundos...');
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando el navegador...');
  await browser.close();

  console.log('✨ ¡Listo! Has aprendido a llenar formularios.');
})();
