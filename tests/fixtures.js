// Fixtures (sesión 14): lo que cada test pide por su nombre y recibe ya preparado.
// En los tests, test y expect se importan de AQUÍ, no de @playwright/test.
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { PosPage } from '../pages/PosPage.js';

export const test = base.extend({
  // Fixture de datos: usuario y clave salen del archivo .env, nunca del código.
  credentials: async ({}, use) => {
    const user = process.env.LOGIN_USER;
    const password = process.env.LOGIN_PASSWORD;
    if (!user || !password) {
      throw new Error('Falta LOGIN_USER o LOGIN_PASSWORD en el archivo .env');
    }
    await use({ user, password });
  },

  // La pantalla de login, ya abierta.
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Fixture encadenada: pide loginPage y credentials, e inicia sesión.
  // Si el login falla, el error aparece aquí y el test no llega a correr.
  loggedInPage: async ({ page, loginPage, credentials }, use) => {
    await loginPage.login(credentials.user, credentials.password);
    await expect(page).toHaveURL(/\/dashboard/);
    await use(page);
  },

  // Punto de Venta ya abierto con la sesión iniciada.
  posPage: async ({ page, loggedInPage }, use) => {
    const posPage = new PosPage(page);
    await posPage.goto();
    // Si no hay un turno de caja abierto, el sistema redirige a Caja y esto falla.
    await expect(
      posPage.heading,
      'Abre un turno de caja con el usuario de prueba antes de ejecutar los tests del POS',
    ).toBeVisible();
    await use(posPage);
  },
});

export { expect };
