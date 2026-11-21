// Page Object del panel principal (/dashboard), al que se llega después del login.
export class DashboardPage {
  constructor(page) {
    this.page = page;
    // «¡Bienvenido Administrador del Sistema!»: el nombre cambia según el usuario.
    this.welcomeMessage = page.getByText(/^¡Bienvenido .+!$/);
    // «Cerrar sesión» aparece dos veces (barra lateral y menú del usuario):
    // se busca solo dentro de la navegación lateral para que sea único.
    this.logoutButton = page.getByRole('navigation').getByRole('button', { name: 'Cerrar sesión' });
    this.posLink = page.getByRole('link', { name: 'Punto de Venta' });
  }

  async logout() {
    await this.logoutButton.click();
  }

  async openPos() {
    await this.posLink.click();
  }
}
