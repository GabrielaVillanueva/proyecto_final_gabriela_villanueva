// Flujo 1 · Autenticación (módulo M14 Usuarios).
// Ejecutar: npx playwright test tests/auth --project=chromium
import { test, expect } from '../fixtures.js';

const ERROR_MESSAGE = 'Las credenciales son incorrectas o el usuario está inactivo.';

test.describe('Autenticación', () => {
  test('CP-AUTH-01: login válido lleva al panel y muestra la bienvenida', async ({ page, loginPage, dashboardPage, credentials }) => {
    await loginPage.login(credentials.user, credentials.password);

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeVisible();
  });

  test('CP-AUTH-02: usuario inexistente muestra mensaje de error', async ({ page, loginPage, credentials }) => {
    await loginPage.login('usuario_que_no_existe', credentials.password);

    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGE);
    await expect(page).toHaveURL(/\/login/);
  });

  test('CP-AUTH-03: contraseña incorrecta muestra mensaje de error', async ({ page, loginPage, dashboardPage, credentials }) => {
    await loginPage.login(credentials.user, 'ClaveIncorrecta999');

    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGE);
    await expect(page).toHaveURL(/\/login/);
    await expect(dashboardPage.welcomeMessage).not.toBeVisible();
  });

  test('CP-AUTH-04: con los campos vacíos el formulario no se envía', async ({ page, loginPage }) => {
    await loginPage.submitButton.click();

    // Los campos son obligatorios (required): el navegador bloquea el envío.
    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

  test('CP-AUTH-05: cerrar sesión vuelve a la pantalla de login', async ({ page, loggedInPage, dashboardPage, loginPage }) => {
    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('CP-13: el login no muestra credenciales en pantalla', async ({ loginPage }) => {
    // Defecto conocido DEF-02: hoy el bloque SÍ se muestra, así que este test falla.
    // test.fail() lo marca como "debe fallar": la suite queda en verde y, cuando
    // se corrija el defecto, Playwright avisará que el test ya pasa.
    test.fail();

    await expect(loginPage.defaultCredentials).not.toBeVisible();
  });
});
