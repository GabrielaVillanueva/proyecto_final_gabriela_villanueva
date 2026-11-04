// @ts-check
// Sesión 11 · Parte 3: búsqueda sin resultados en el Punto de Venta.
// Pasos escritos a mano; los dos expect se pidieron a la IA y se revisaron.
import { test, expect } from '@playwright/test';
import { iniciarSesion, abrirPuntoDeVenta } from './helpers/sesion';

test('buscar «xyz» en el POS no muestra productos', async ({ page }) => {
  await iniciarSesion(page);
  await abrirPuntoDeVenta(page);

  // Pasos a mano. El POS no tiene botón Buscar: busca solo al escribir (espera 300 ms y consulta al servidor).
  await page.getByPlaceholder('Buscar producto por nombre').fill('xyz');

  // Expect revisados (espera explícita: reintentan hasta que se cumplen).
  // El sistema usa el mismo texto para «sin búsqueda» y para «sin resultados» (ver hallazgo en el documento).
  await expect(page.getByText('Escribe para buscar productos')).toBeVisible();
  await expect(page.getByRole('button', { name: /Stock:/ })).toHaveCount(0);
  

  // 5) Rómpelo: cambia el 0 de arriba por 1 y ejecuta. Debe fallar con
  //    «Expected: 1 · Received: 0». Luego devuélvelo a 0.
});
