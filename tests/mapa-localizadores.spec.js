// @ts-check
// Sesión 11 · Parte 1: mapa de localizadores en el TPV Minimarket.
// Equivale a la demo de Expand Testing y a la tabla de Toolshop del laboratorio.
import { test, expect } from '@playwright/test';
import { iniciarSesion, abrirPuntoDeVenta } from './helpers/sesion';

test.describe('Mapa de localizadores · Inicio de sesión', () => {
  test('elementos del formulario de login', async ({ page }) => {
    await page.goto('/login');

    // 1 getByRole: título y botón, por lo que la persona ve.
    await expect(page.getByRole('heading', { name: '¡Bienvenido!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ingresar al Sistema' })).toBeVisible();

    // 2 getByLabel: funciona con «Recordarme» porque el <label> envuelve al checkbox.
    await expect(page.getByLabel('Recordarme')).toBeVisible();

    // 2 getByLabel NO funciona con «Usuario o Correo»: el label no está asociado al campo.
    // Este expect documenta el hallazgo (si el equipo lo corrige, cambiará a 1).
    await expect(page.getByLabel('Usuario o Correo')).toHaveCount(0);

    // 3 getByPlaceholder: el campo de usuario.
    await expect(page.getByPlaceholder('admin o correo@ejemplo.com')).toBeVisible();

    // 4 getByText: el bloque que expone credenciales (DEF-02 / CP-13).
    await expect(page.getByText('Credenciales por defecto')).toBeVisible();
  });
});

test.describe('Mapa de localizadores · Punto de Venta', () => {
  test.beforeEach(async ({ page }) => {
    await iniciarSesion(page);
    await abrirPuntoDeVenta(page);
  });

  test('cinco elementos del Punto de Venta', async ({ page }) => {
    // Campo de búsqueda: no tiene label, se ubica por su placeholder (categoría 3).
    const busqueda = page.getByPlaceholder('Buscar producto por nombre');
    await expect(busqueda).toBeVisible();

    // Tarjetas de producto: cada una es un botón cuyo nombre incluye «Stock:» (categoría 1).
    const productos = page.getByRole('button', { name: /Stock:/ });
    await expect(productos.first()).toBeVisible();

    // Título del carrito (categoría 1).
    await expect(page.getByRole('heading', { name: 'Carrito' })).toBeVisible();

    // Texto del carrito vacío (categoría 4).
    await expect(page.getByText('Carrito vacío')).toBeVisible();

    // Botón Cobrar: deshabilitado mientras el carrito está vacío (categoría 1).
    // Sin exact: el nombre accesible empieza con el ícono de Font Awesome (« Cobrar»).
    await expect(page.getByRole('button', { name: 'Cobrar' })).toBeDisabled();
  });

  test('el TPV todavía no tiene atributos data-test', async ({ page }) => {
    // testIdAttribute es 'data-test' (playwright.config.js). Hoy no hay ninguno en el POS:
    // getByTestId (categoría 5) no se puede usar hasta que el equipo los agregue.
    await expect(page.locator('[data-test]')).toHaveCount(0);
  });
});
