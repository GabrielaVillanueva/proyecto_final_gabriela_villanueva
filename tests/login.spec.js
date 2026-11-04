// @ts-check
// Sesión 12 · Entregable de la semana: suite de autenticación del TPV Minimarket.
// Módulo M14 Usuarios (inicio de sesión). Sin waitForTimeout ni expect(await ...).
//
// Ejecutar:        npx playwright test login --project=chromium --reporter=list
// Con traza:       npx playwright test login --project=chromium --trace on --reporter=list
// Confiabilidad:   npx playwright test login --project=chromium --repeat-each=5 --reporter=list
import { test, expect } from '@playwright/test';

const USUARIO = process.env.MINIMARKET_USER ?? '';
const CLAVE = process.env.MINIMARKET_PASS ?? '';

const MENSAJE_ERROR = 'Las credenciales son incorrectas o el usuario está inactivo.';

test.describe('Inicio de sesión · TPV Minimarket', () => {
  test.beforeEach(async ({ page }) => {
    // Espera implícita: goto espera a que la página cargue.
    await page.goto('/login');
  });

  test('login exitoso con usuario Administrador', async ({ page }) => {
    test.skip(!USUARIO || !CLAVE, 'Completa MINIMARKET_USER y MINIMARKET_PASS en el archivo .env');

    // Acciones (espera implícita: fill y click esperan a que el elemento esté listo).
    await page.getByPlaceholder('admin o correo@ejemplo.com').fill(USUARIO);
    await page.locator('input[name="password"]').fill(CLAVE);
    await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

    // Assertions (espera explícita: cada await expect reintenta hasta 5 s).
    // 1. La navegación ocurrió: llegamos al panel.
    await expect(page).toHaveURL(/\/dashboard/);
    // 2. Se ve el mensaje de bienvenida con el nombre del usuario.
    await expect(page.getByText(/^¡Bienvenido .+!$/)).toBeVisible();
    // 3. Aparece la opción para salir (solo existe con sesión iniciada).
    await expect(
      page.getByRole('navigation').getByRole('button', { name: 'Cerrar sesión' }),
    ).toBeVisible();
  });

  test('usuario inválido', async ({ page }) => {
    await page.getByPlaceholder('admin o correo@ejemplo.com').fill('usuario_que_no_existe');
    await page.locator('input[name="password"]').fill('ClaveDePrueba123');
    await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

    // 1. Se ve el aviso correcto.
    await expect(page.getByText(MENSAJE_ERROR)).toHaveText(MENSAJE_ERROR);
    // 2. Seguimos en el login.
    await expect(page).toHaveURL(/\/login/);
  });

  test('contraseña inválida para un usuario existente', async ({ page }) => {
    test.skip(!USUARIO, 'Completa MINIMARKET_USER en el archivo .env');

    await page.getByPlaceholder('admin o correo@ejemplo.com').fill(USUARIO);
    await page.locator('input[name="password"]').fill('ClaveIncorrecta999');
    await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

    // 1. Se ve el aviso correcto (el sistema usa el mismo mensaje para usuario y contraseña).
    await expect(page.getByText(MENSAJE_ERROR)).toHaveText(MENSAJE_ERROR);
    // 2. Seguimos en el login.
    await expect(page).toHaveURL(/\/login/);
    // 3. Opcional: el usuario escrito se conserva y la contraseña se borra.
    await expect(page.getByPlaceholder('admin o correo@ejemplo.com')).toHaveValue(USUARIO);
    await expect(page.locator('input[name="password"]')).toHaveValue('');
  });

  test('campos vacíos: el formulario no se envía', async ({ page }) => {
    await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

    // 1. El navegador bloquea el envío (los campos son required): seguimos en el login.
    await expect(page).toHaveURL(/\/login/);
    // 2. No llega ningún mensaje del servidor.
    await expect(page.getByText(MENSAJE_ERROR)).not.toBeVisible();
  });
});
