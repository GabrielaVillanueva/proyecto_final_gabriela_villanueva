// Práctica de la sesión 11 · Parte 1: mapa de localizadores en el TPV Minimarket.
// No es un caso del plan: documenta qué localizador sirve para cada elemento y por qué.
import { test, expect } from '../fixtures.js';

test.describe('Práctica S11 · mapa de localizadores', () => {
  test('login: un ejemplo de cada tipo de localizador', async ({ page, loginPage }) => {
    // 1 getByRole: título y botón, por lo que la persona ve.
    await expect(page.getByRole('heading', { name: '¡Bienvenido!' })).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();

    // 2 getByLabel: funciona con «Recordarme» porque el <label> envuelve al checkbox.
    await expect(page.getByLabel('Recordarme')).toBeVisible();
    // 2 getByLabel NO funciona con «Usuario o Correo»: el label no está asociado al campo.
    await expect(page.getByLabel('Usuario o Correo')).toHaveCount(0);

    // 3 getByPlaceholder: el campo de usuario.
    await expect(loginPage.username).toBeVisible();

    // 4 getByText: el bloque que expone las credenciales (DEF-02).
    await expect(loginPage.defaultCredentials).toBeVisible();
  });

  test('Punto de Venta: cinco elementos y su localizador', async ({ page, posPage }) => {
    await expect(posPage.searchBox).toBeVisible();
    await expect(posPage.productCards.first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Carrito' })).toBeVisible();
    await expect(posPage.emptyCartMessage).toBeVisible();
    await expect(posPage.chargeButton).toBeDisabled();
  });

  test('Punto de Venta: todavía no tiene atributos data-test', async ({ page, posPage }) => {
    // testIdAttribute es 'data-test' (playwright.config.js). Hoy no hay ninguno:
    // getByTestId no se puede usar hasta que el equipo los agregue.
    await expect(page.locator('[data-test]')).toHaveCount(0);
  });
});
