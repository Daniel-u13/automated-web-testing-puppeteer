/**
 * ✅ SOLUCIÓN EJERCICIO 2: Buscador Automático
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Bing...');
  await page.goto('https://www.bing.com');

  console.log('✍️ Escribiendo en el buscador...');

  // Escribir en el campo de búsqueda
  await page.type('#sb_form_q', 'Node.js', { delay: 100 });

  console.log('🔍 Enviando búsqueda...');

  // Presionar Enter
  await page.keyboard.press('Enter');

  // Esperar a que cargue la página de resultados
  await page.waitForNavigation();

  console.log('✅ Resultados cargados!');

  // DESAFÍO EXTRA: Obtener el título
  const titulo = await page.title();
  console.log('📌 Título de la página:', titulo);

  console.log('📸 Tomando captura de resultados...');
  await page.screenshot({ path: 'resultados-busqueda.png' });

  console.log('⏱️ Esperando 3 segundos...');
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando navegador...');
  await browser.close();

  console.log('✨ ¡Ejercicio completado!');
})();
