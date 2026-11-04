// @ts-check
// Pasos comunes: iniciar sesión y abrir el Punto de Venta del TPV Minimarket.
import { expect } from '@playwright/test';

export async function iniciarSesion(page) {
  const usuario = process.env.MINIMARKET_USER;
  const clave = process.env.MINIMARKET_PASS;
  if (!usuario || !clave) {
    throw new Error('Falta MINIMARKET_USER o MINIMARKET_PASS en el archivo .env');
  }

  await page.goto('/login');
  // El label «Usuario o Correo» no está asociado al campo (no tiene for/id),
  // por eso getByLabel no lo encuentra y se usa el placeholder.
  await page.getByPlaceholder('admin o correo@ejemplo.com').fill(usuario);
  // El campo de contraseña tampoco tiene label asociado y su placeholder son puntos;
  // se usa su atributo name, que el formulario necesita para enviarse.
  await page.locator('input[name="password"]').fill(clave);
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Espera explícita: el título del panel confirma que entramos.
  await expect(page.getByRole('heading', { name: 'Panel de Control' })).toBeVisible();
}

export async function abrirPuntoDeVenta(page) {
  await page.goto('/pos');
  // Si no hay un turno de caja abierto, el sistema redirige a Caja y este expect falla.
  await expect(
    page.getByRole('heading', { name: 'Punto de Venta' }),
    'Abre un turno de caja con este usuario antes de ejecutar los tests del POS',
  ).toBeVisible();
}
