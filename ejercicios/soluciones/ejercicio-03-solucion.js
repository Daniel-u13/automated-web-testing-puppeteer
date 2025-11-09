/**
 * ✅ SOLUCIÓN EJERCICIO 3: Extractor de Noticias
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando navegador...');

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('🌐 Navegando a Hacker News...');
  await page.goto('https://news.ycombinator.com');

  console.log('📰 Extrayendo títulos de noticias...');

  // Extraer los títulos (limitando a 5)
  const titulos = await page.$$eval('.titleline > a', elements => {
    return elements.slice(0, 5).map(el => el.textContent);
  });

  console.log('\n📋 Las 5 principales noticias:\n');
  titulos.forEach((titulo, index) => {
    console.log(`${index + 1}. ${titulo}`);
  });

  // DESAFÍO EXTRA: Extraer los puntos
  console.log('\n⭐ DESAFÍO EXTRA - Puntos de cada noticia:\n');

  const puntos = await page.$$eval('.score', elements => {
    return elements.slice(0, 5).map(el => el.textContent);
  });

  puntos.forEach((punto, index) => {
    console.log(`${index + 1}. ${titulos[index]}`);
    console.log(`   ${punto}\n`);
  });

  console.log('⏱️ Esperando 3 segundos...');
  await page.waitForTimeout(3000);

  console.log('👋 Cerrando navegador...');
  await browser.close();

  console.log('✨ ¡Ejercicio completado!');
})();
