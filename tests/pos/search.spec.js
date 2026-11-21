// Flujo 2 · Búsqueda en el Punto de Venta (antes tests/mi-busqueda.spec.js, sesión 11).
import { test, expect } from '../fixtures.js';

test.describe('Punto de Venta · búsqueda', () => {
  test('CP-POS-02: buscar «xyz» no muestra productos', async ({ posPage }) => {
    // El POS no tiene botón Buscar: busca solo al escribir (espera 300 ms y consulta al servidor).
    await posPage.search('xyz');

    // Espera explícita: cada await expect reintenta hasta que se cumple (máximo 5 s).
    // El sistema usa el mismo texto para «sin búsqueda» y «sin resultados» (hallazgo documentado).
    await expect(posPage.page.getByText('Escribe para buscar productos')).toBeVisible();
    await expect(posPage.productCards).toHaveCount(0);
  });
});
