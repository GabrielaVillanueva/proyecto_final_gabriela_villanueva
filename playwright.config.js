// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Sesión 13: lee el archivo .env (BASE_URL, LOGIN_USER, LOGIN_PASSWORD) y lo deja en process.env.
// El .env NO se sube a GitHub; .env.example es la plantilla con valores falsos.
dotenv.config();

export default defineConfig({
  testDir: './tests',
  // Todos los tests inician sesión con el mismo usuario de prueba. Se ejecutan de uno
  // en uno para que una sesión no interfiera con otra (causa de pruebas inestables, S18).
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    // El dominio se escribe una sola vez; cada goto lleva solo la ruta ('/login', '/pos').
    baseURL: process.env.BASE_URL,
    // Atributo que usaría getByTestId. El TPV Minimarket todavía no tiene data-test.
    testIdAttribute: 'data-test',
    // Traza al reintentar un test que falló. Para pedirla siempre: --trace on (S12).
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
