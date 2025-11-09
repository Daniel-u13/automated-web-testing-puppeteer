/**
 * EJEMPLO 5: BUSCAR Y EXTRAER TEXTO DE UNA PÁGINA
 * ===============================================
 * Aprenderás a extraer información de una página web,
 * como títulos, párrafos y otros elementos de texto.
 *
 * Para ejecutar: node ejemplos-basicos/05-buscar-texto.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando el navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Wikipedia...');
  await page.goto('https://es.wikipedia.org');

  console.log('🔍 Buscando "JavaScript"...');

  // Buscar JavaScript
  await page.click('#searchInput');
  await page.type('#searchInput', 'JavaScript', { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  console.log('📖 Extrayendo información de la página...');

  // Extraer el título de la página
  const titulo = await page.$eval('#firstHeading', element => element.textContent);
  console.log('📌 Título:', titulo);

  // Extraer el primer párrafo
  const primerParrafo = await page.$eval('#mw-content-text p', element => element.textContent);
  console.log('📝 Primer párrafo:', primerParrafo.substring(0, 200) + '...');

  // Contar cuántos enlaces hay en la página
  const numeroDeEnlaces = await page.$$eval('a', links => links.length);
  console.log('🔗 Número de enlaces en la página:', numeroDeEnlaces);

  // Extraer todos los títulos de sección (h2)
  const titulosSecciones = await page.$$eval('h2 .mw-headline', headings => {
    return headings.map(h => h.textContent);
  });

  console.log('📚 Secciones del artículo:');
  titulosSecciones.forEach((seccion, index) => {
    console.log(`   ${index + 1}. ${seccion}`);
  });

  // Obtener la URL actual
  const urlActual = page.url();
  console.log('🌐 URL actual:', urlActual);

  console.log('⏱️ Esperando 3 segundos...');
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando el navegador...');
  await browser.close();

  console.log('✨ ¡Listo! Has aprendido a extraer información de páginas web.');
})();
