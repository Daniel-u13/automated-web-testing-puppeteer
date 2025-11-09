/**
 * ✅ SOLUCIÓN EJERCICIO 1: Tu Primera Página
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Iniciando navegador...');

  // 1. Lanzar el navegador
  const browser = await puppeteer.launch({
    headless: false, // Para ver qué pasa
    slowMo: 100
  });

  // 2. Abrir nueva página
  const page = await browser.newPage();

  console.log('🌐 Navegando a example.com...');

  // 3. Ir a la URL
  await page.goto('https://example.com');

  console.log('📸 Tomando captura...');

  // 4. Tomar captura
  await page.screenshot({ path: 'mi-primera-captura.png' });

  console.log('✅ Captura guardada como: mi-primera-captura.png');

  // Esperar un poco para ver el resultado
  await page.waitForTimeout(2000);

  console.log('👋 Cerrando navegador...');

  // 5. Cerrar el navegador
  await browser.close();

  console.log('✨ ¡Ejercicio completado!');
})();
