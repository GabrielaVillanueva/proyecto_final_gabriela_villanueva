// @ts-check
// Sesión 11 · Parte 4: esperas en el TPV Minimarket.
// Ejecuta cada versión 10 veces y compara resultado y tiempo:
//   npx playwright test esperas --project=chromium --repeat-each=10 -g "lectura única"
//   npx playwright test esperas --project=chromium --repeat-each=10 -g "espera fija"
//   npx playwright test esperas --project=chromium --repeat-each=10 -g "espera explícita"
import { test, expect } from '@playwright/test';
import { iniciarSesion, abrirPuntoDeVenta } from './helpers/sesion';

const MENSAJE = 'Escribe para buscar productos';

test.describe('Esperas en la búsqueda del POS', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarSesion(page);
    await abrirPuntoDeVenta(page);
    // Espera implícita: fill espera solo a que el campo exista, se vea y esté habilitado.
    await page.getByPlaceholder('Buscar producto por nombre').fill('xyz');
  });

  // 1. Lectura única: mira una sola vez, sin esperar. Aquí suele FALLAR porque la búsqueda
  //    tarda 300 ms + la respuesta del servidor. Es el ejemplo de un test no confiable.
  test('1. lectura única (no espera)', async ({ page }) => {
    expect(await page.getByText(MENSAJE).isVisible()).toBe(true);
  });

  // 2. Espera fija: duerme 3 s siempre, aunque el mensaje aparezca antes. Suma 3 s por ejecución.
  test('2. espera fija antes de la lectura', async ({ page }) => {
    await page.waitForTimeout(3000);
    expect(await page.getByText(MENSAJE).isVisible()).toBe(true);
  });

  // 3. Espera explícita: reintenta hasta que el mensaje se ve (máximo 5 s por defecto).
  test('3. espera explícita', async ({ page }) => {
    await expect(page.getByText(MENSAJE)).toBeVisible();
    await expect(page.getByRole('button', { name: /Stock:/ })).toHaveCount(0);
  });
});
