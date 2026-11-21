// Práctica de la sesión 11 · Parte 2: modo estricto en el TPV Minimarket.
// «strict mode violation ... resolved to N elements» = «encontré N, ¿cuál quieres?».
import { test, expect } from '../fixtures.js';

const PRODUCT = 'Inca Kola 1.5L';

test.describe('Práctica S11 · modo estricto', () => {
  // test.fail: ESPERAMOS que falle por modo estricto. Para leer el mensaje
  // completo, quita «.fail» y ejecuta solo este test.
  test.fail('provoca el error: un clic sobre todas las tarjetas de producto', async ({ posPage }) => {
    await posPage.productCards.click({ timeout: 5000 });
  });

  test('lo resuelve por posición con .first() (frágil si cambia el orden)', async ({ posPage }) => {
    await posPage.productCards.first().click();
    await expect(posPage.emptyCartMessage).not.toBeVisible();
  });

  test('lo resuelve por texto con .filter() (sobrevive si cambia el orden)', async ({ posPage }) => {
    await posPage.productCards.filter({ hasText: PRODUCT }).click();
    await expect(posPage.quantityInput).toHaveValue('1');
  });

  test.fail('provoca el error: «Cerrar sesión» aparece dos veces', async ({ page, loggedInPage }) => {
    // getByText también encuentra el «Cerrar sesión» oculto del menú del usuario.
    await page.getByText('Cerrar sesión').click({ timeout: 5000 });
  });

  test('lo resuelve encadenando dentro de la navegación', async ({ page, loggedInPage, dashboardPage, loginPage }) => {
    await dashboardPage.logout();
    await expect(loginPage.submitButton).toBeVisible();
  });
});
