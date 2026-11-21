// Page Object del Punto de Venta (/pos): buscador, tarjetas de producto y carrito.
export class PosPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Punto de Venta' });
    this.searchBox = page.getByPlaceholder('Buscar producto por nombre');
    // Cada tarjeta de producto es un botón cuyo nombre incluye «Stock:».
    this.productCards = page.getByRole('button', { name: /Stock:/ });
    this.emptyCartMessage = page.getByText('Carrito vacío');
    this.chargeButton = page.getByRole('button', { name: 'Cobrar' });
    // En el carrito hay dos campos numéricos: la cantidad de la línea y el Descuento.
    // Con un producto en el carrito, el primero es la cantidad.
    this.quantityInput = page.getByRole('spinbutton').first();
    // Fila «Subtotal: S/ 65.00» del resumen. Se usa esta fila y no el precio de la
    // línea porque «S/6.50» también aparece en la tarjeta del producto.
    this.subtotalRow = page.getByText('Subtotal:', { exact: true }).locator('..');
  }

  async goto() {
    await this.page.goto('/pos');
  }

  // Devuelve un locator (no verifica): así sirve para comprobar que está o que no está.
  productCard(name) {
    return this.page.getByRole('button', { name });
  }

  async addProduct(name) {
    await this.productCard(name).click();
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(quantity);
  }

  async search(term) {
    await this.searchBox.fill(term);
  }
}
