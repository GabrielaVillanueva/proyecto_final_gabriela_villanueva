// Flujo 2 · Carrito del Punto de Venta (módulo M02).
// Los datos de los casos viven en test-data/cart-quantities.json (data-driven):
// para cambiar una cantidad o un subtotal se edita el JSON, no este archivo.
// Ningún test pulsa «Cobrar»: no se registran ventas ni cambia el stock.
// Ejecutar: npx playwright test tests/pos --project=chromium
import { test, expect } from '../fixtures.js';
import data from '../../test-data/cart-quantities.json';

const PRODUCT = data.product;
const OUT_OF_STOCK_PRODUCT = 'Arroz Costeño 5kg';

test.describe('Punto de Venta · carrito', () => {
  test('CP-POS-01: agregar un producto lo muestra en el carrito con cantidad 1', async ({ posPage }) => {
    // Precondición: carrito vacío y Cobrar deshabilitado.
    await expect(posPage.emptyCartMessage).toBeVisible();
    await expect(posPage.chargeButton).toBeDisabled();

    await posPage.addProduct(PRODUCT);

    await expect(posPage.emptyCartMessage).not.toBeVisible();
    await expect(posPage.quantityInput).toHaveValue('1');
    await expect(posPage.chargeButton).toBeEnabled();
  });

  // Un test por cada fila de «accepted»: cantidades válidas (1 a 80).
  for (const row of data.accepted) {
    test(`${row.id}: cantidad ${row.quantity} (${row.description}) se acepta con subtotal ${row.subtotal}`, async ({ posPage }) => {
      // Precondición: el stock mostrado del producto es el de los datos base.
      await expect(posPage.productCard(PRODUCT)).toContainText(`Stock: ${data.stock}`);

      await posPage.addProduct(PRODUCT);
      await posPage.setQuantity(row.quantity);

      await expect(posPage.quantityInput).toHaveValue(row.quantity);
      await expect(posPage.subtotalRow).toContainText(row.subtotal);
    });
  }

  // Un test por cada fila de «rejected»: el sistema debería rechazar la cantidad.
  // Hoy las acepta todas (defectos conocidos), por eso se marcan con test.fail().
  for (const row of data.rejected) {
    test(`${row.id}: cantidad ${row.quantity} (${row.description}) se rechaza`, async ({ posPage }) => {
      test.fail(true, `Defecto conocido: ${row.defect}`);

      await posPage.addProduct(PRODUCT);
      await posPage.setQuantity(row.quantity);

      await expect(posPage.quantityInput).not.toHaveValue(row.quantity);
    });
  }

  test('CP-18: un producto sin stock no se agrega al carrito', async ({ posPage }) => {
    // Defecto conocido DEF-04: hoy el producto con stock 0 SÍ se agrega.
    test.fail(true, 'Defecto conocido: DEF-04');
    await expect(posPage.productCard(OUT_OF_STOCK_PRODUCT)).toContainText('Stock: 0');

    await posPage.addProduct(OUT_OF_STOCK_PRODUCT);

    await expect(posPage.emptyCartMessage).toBeVisible();
  });
});
