// @ts-check
// Sesión 11 · Parte 2: modo estricto en el TPV Minimarket.
// En Toolshop se provoca con getByTestId('product-name'); aquí, con las tarjetas de producto.
import { test, expect } from '@playwright/test';
import { iniciarSesion, abrirPuntoDeVenta } from './helpers/sesion';

// Producto que usan los casos manuales (CP-01 a CP-12). Si no aparece entre los
// destacados del POS, cambia este nombre por uno que sí veas en pantalla.
const PRODUCTO = 'Inca Kola 1.5L';

test.describe('Modo estricto · tarjetas de producto', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarSesion(page);
    await abrirPuntoDeVenta(page);
  });

  // 1) Provócalo. test.fail() indica que ESPERAMOS que falle: así queda en verde.
  //    Para leer el mensaje completo, borra «.fail» y ejecuta este test.
  test.fail('provoca: un clic sobre todos los productos', async ({ page }) => {
    await page.getByRole('button', { name: /Stock:/ }).click({ timeout: 5000 });
    // strict mode violation: getByRole('button', { name: /Stock:/ }) resolved to N elements
  });

  // 3) Resuélvelo por posición: funciona, pero depende del orden de los destacados.
  test('resuelve por posición con .first()', async ({ page }) => {
    const primero = page.getByRole('button', { name: /Stock:/ }).first();
    await primero.click();
    await expect(page.getByText('Carrito vacío')).toBeHidden();
  });

  // 4) Resuélvelo por texto: sobrevive si cambia el orden de los productos.
  test('resuelve por texto con .filter()', async ({ page }) => {
    await page
      .getByRole('button', { name: /Stock:/ })
      .filter({ hasText: PRODUCTO })
      .first()
      .click();
    // La línea del carrito muestra el precio unitario «c/u».
    await expect(page.getByText(/c\/u/)).toHaveCount(1);
    await expect(page.getByText('Carrito vacío')).toBeHidden();
  });
});

test.describe('Modo estricto · «Cerrar Sesión» aparece dos veces', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarSesion(page);
  });

  // getByText también encuentra el «Cerrar sesión» oculto del menú del usuario: resuelve a 2.
  // (getByRole no falla aquí porque ignora lo que está oculto: otra razón para preferirlo.)
  test.fail('provoca: el texto está en la barra lateral y en el menú del usuario', async ({ page }) => {
    await page.getByText('Cerrar sesión').click({ timeout: 5000 });
  });

  // 5) Encadenando: buscar el botón solo dentro de la navegación lateral.
  test('resuelve encadenando dentro de la navegación', async ({ page }) => {
    await page.getByRole('navigation').getByRole('button', { name: 'Cerrar sesión' }).click();
    await expect(page.getByRole('button', { name: 'Ingresar al Sistema' })).toBeVisible();
  });
});
