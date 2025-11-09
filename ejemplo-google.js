/**
 * 🔍 EJEMPLO PRÁCTICO: BÚSQUEDA EN GOOGLE
 * ========================================
 * Un ejemplo simple y práctico de cómo automatizar una búsqueda en Google,
 * extraer los resultados y tomar una captura de pantalla.
 *
 * Este es un buen ejemplo para PRINCIPIANTES porque:
 * - Usa conceptos básicos de Puppeteer
 * - Tiene un caso de uso real y útil
 * - Muestra cómo extraer datos de una página real
 *
 * Para ejecutar: node ejemplo-google.js
 */

const puppeteer = require('puppeteer');

// Función principal
(async () => {
  console.log('🚀 Iniciando búsqueda automatizada en Google...\n');

  // 1. Lanzar el navegador
  const browser = await puppeteer.launch({
    headless: false,  // Ver el navegador en acción
    slowMo: 150,      // Ralentizar para ver mejor
    defaultViewport: { width: 1280, height: 800 }
  });

  try {
    // 2. Abrir nueva pestaña
    const page = await browser.newPage();

    console.log('🌐 Abriendo Google...');

    // 3. Ir a Google
    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle2'  // Esperar a que cargue completamente
    });

    // 4. Buscar el campo de búsqueda
    // Google puede tener diferentes selectores dependiendo de la región
    const campoBusqueda = 'textarea[name="q"]';
    await page.waitForSelector(campoBusqueda);

    console.log('✍️ Escribiendo en el buscador...');

    // 5. Escribir el término de búsqueda
    const terminoBusqueda = 'Puppeteer tutorial';
    await page.type(campoBusqueda, terminoBusqueda, { delay: 100 });

    console.log(`🔍 Buscando: "${terminoBusqueda}"...\n`);

    // 6. Presionar Enter para buscar
    await page.keyboard.press('Enter');

    // 7. Esperar a que carguen los resultados
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('✅ Resultados cargados!\n');

    // 8. Extraer información de los resultados
    console.log('📊 Extrayendo información...\n');

    // Extraer títulos de los resultados
    const resultados = await page.$$eval('h3', headings => {
      return headings.slice(0, 5).map(h => h.textContent);
    });

    // Mostrar los resultados en consola
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 TOP 5 RESULTADOS DE LA BÚSQUEDA:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    resultados.forEach((resultado, index) => {
      console.log(`${index + 1}. ${resultado}\n`);
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 9. Obtener información adicional
    const urlActual = page.url();
    const titulo = await page.title();

    console.log('📌 Información adicional:');
    console.log(`   • URL: ${urlActual}`);
    console.log(`   • Título: ${titulo}\n`);

    // 10. Tomar captura de pantalla
    console.log('📸 Tomando captura de pantalla...');
    await page.screenshot({
      path: 'resultado-google.png',
      fullPage: true
    });

    console.log('✅ Captura guardada como: resultado-google.png\n');

    // 11. Contar cuántos resultados hay en la página
    const totalEnlaces = await page.$$eval('a', links => links.length);
    console.log(`🔗 Total de enlaces en la página: ${totalEnlaces}\n`);

    // Esperar un poco antes de cerrar para que puedas ver el resultado
    console.log('⏱️ Esperando 3 segundos antes de cerrar...');
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Error durante la ejecución:', error.message);
  } finally {
    // 12. Cerrar el navegador (siempre se ejecuta)
    console.log('👋 Cerrando navegador...');
    await browser.close();
    console.log('✨ ¡Proceso completado!\n');
  }
})();

/**
 * 💡 EXPERIMENTOS QUE PUEDES HACER:
 * =================================
 *
 * 1. Cambia el término de búsqueda:
 *    const terminoBusqueda = 'Node.js';
 *
 * 2. Extrae más resultados (no solo 5):
 *    return headings.slice(0, 10).map(h => h.textContent);
 *
 * 3. Haz click en el primer resultado:
 *    await page.click('h3');
 *    await page.waitForNavigation();
 *
 * 4. Extrae las URLs de los resultados:
 *    const urls = await page.$$eval('a', links => {
 *      return links.slice(0, 5).map(link => link.href);
 *    });
 *
 * 5. Cambia a modo headless (invisible):
 *    headless: true
 *
 * 6. Busca imágenes en lugar de web:
 *    Después de buscar, haz:
 *    await page.click('a[href*="tbm=isch"]');
 */
