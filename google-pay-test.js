/**
 * 🧪 PRUEBA AUTOMATIZADA DE GOOGLE PAY
 * ====================================
 * Este script demuestra un caso de uso AVANZADO de Puppeteer:
 * - Conectarse a un navegador Chrome ya abierto
 * - Trabajar con ventanas emergentes (popups)
 * - Manipular iframes anidados
 * - Usar selectores XPath complejos
 *
 * ⚠️ NOTA PARA PRINCIPIANTES:
 * Este es un ejemplo AVANZADO. Si estás empezando, primero revisa:
 * - Los ejemplos en: ejemplos-basicos/
 * - Los ejercicios en: ejercicios/
 *
 * 📋 REQUISITOS PREVIOS:
 * 1. Debes iniciar Chrome manualmente con depuración remota habilitada
 * 2. Debes tener una sesión de Google Pay configurada
 *
 * Para macOS:
 * /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary \
 *   --remote-debugging-port=9222 \
 *   --user-data-dir=chrome-remote-debugging
 *
 * Para Linux:
 * google-chrome --remote-debugging-port=9222 --user-data-dir=chrome-remote-debugging
 *
 * Para Windows:
 * "C:\Program Files\Google\Chrome\Application\chrome.exe" \
 *   --remote-debugging-port=9222 \
 *   --user-data-dir=chrome-remote-debugging
 */

const puppeteer = require('puppeteer');

let browser;

(async () => {
  // ========================================
  // 1. CONECTAR A NAVEGADOR EXISTENTE
  // ========================================
  // En lugar de lanzar un nuevo navegador (launch), nos conectamos
  // a uno que ya está corriendo con depuración remota habilitada
  const browserURL = 'http://127.0.0.1:9222';
  browser = await puppeteer.connect({ browserURL });

  console.log('✅ Conectado al navegador en el puerto 9222');

  // ========================================
  // 2. ABRIR PÁGINA DE DEMO
  // ========================================
  const page = await browser.newPage();
  await page.goto('https://gpay-live-demo.web.app');

  console.log('📄 Página de demo de Google Pay cargada');

  // ========================================
  // 3. HACER CLICK EN EL BOTÓN DE GOOGLE PAY
  // ========================================
  // El botón tiene el ID 'gpay-button-online-api-id'
  await page.click('#gpay-button-online-api-id');

  console.log('👆 Click en el botón de Google Pay');

  // Esperar 4 segundos para que se abra la ventana emergente
  await delay(4000);

  // ========================================
  // 4. ESPERAR Y CAPTURAR LA VENTANA EMERGENTE
  // ========================================
  // Cuando haces click en Google Pay, se abre una NUEVA ventana/pestaña
  // waitForTarget espera a que aparezca un nuevo "target" (ventana/pestaña)
  // que coincida con los criterios especificados
  const target = await browser.waitForTarget((t) => {
    // Buscamos una página que contenga 'pay.google.com' en su URL
    return t.type() === 'page' && t.url().includes('pay.google.com/gp/p/ui/pay');
  });

  console.log('🎯 Ventana emergente de Google Pay detectada');

  // Convertir el target en un objeto "page" que podemos manipular
  const googlePayTab = await target.asPage();

  // ========================================
  // 5. TRABAJAR CON IFRAMES
  // ========================================
  // La interfaz de Google Pay está dentro de un iframe
  // Un iframe es como una página web dentro de otra página web
  // Primero encontramos el elemento iframe
  const iframeElementHandle = await googlePayTab.$('iframe[name="sM432dIframe"]');

  // Luego obtenemos el contenido del iframe para poder interactuar con él
  const googlePayIframe = await iframeElementHandle.contentFrame();

  console.log('🖼️ Iframe de Google Pay localizado');

  // ========================================
  // 6. SELECCIONAR MÉTODO DE PAGO
  // ========================================
  // Hacer click en el botón que muestra la lista de métodos de pago
  // Usamos XPath (un lenguaje para seleccionar elementos XML/HTML)
  // Buscamos una imagen cuyo atributo 'alt' contenga cierto texto
  await googlePayIframe.click('xpath/.//img[contains(@alt, \'Show list of payment methods.\')]');

  console.log('💳 Lista de métodos de pago abierta');

  await delay(1000);

  // ========================================
  // 7. SELECCIONAR TARJETA ESPECÍFICA
  // ========================================
  // Buscar todos los elementos que contengan 'Test Card: Mastercard'
  // $$ devuelve un array de elementos
  const newPaymentMethod = await googlePayIframe.$$('xpath/.//div[contains(., \'Test Card: Mastercard\')]/text()/..');

  // Hacemos click en el segundo elemento [1] (los arrays empiezan en 0)
  await newPaymentMethod[1].click();

  console.log('✅ Tarjeta de prueba seleccionada');

  await delay(1000);

  // ========================================
  // 8. CONFIRMAR PAGO
  // ========================================
  // Hacer click en el botón "Pay" para confirmar
  await googlePayIframe.click('xpath/.//span[text()=\'Pay\']');

  console.log('💰 Pago confirmado');

  // ALTERNATIVA: Si tu demo tiene un botón "Continue" en lugar de "Pay"
  // Descomenta la siguiente línea:
  // await googlePayIframe.click('xpath/.//span[text()=\'Continue\']');

})()
  // Si hay un error, lo mostramos en consola
  .catch(err => console.error('❌ Error:', err))
  // Finalmente, nos desconectamos del navegador (no lo cerramos)
  .finally(() => browser?.disconnect());

/**
 * FUNCIÓN AUXILIAR: delay
 * ========================
 * Crea una pausa/espera en el código
 *
 * @param {number} time - Tiempo de espera en milisegundos
 * @returns {Promise} Una promesa que se resuelve después del tiempo especificado
 *
 * NOTA: En código de producción, es mejor usar waitForSelector()
 * o waitForNavigation() en lugar de delays fijos.
 */
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}