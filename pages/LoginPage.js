// Page Object de la pantalla de inicio de sesión (/login).
// Guarda CÓMO encontrar cada elemento y QUÉ acciones se pueden hacer.
// No tiene expect: la clase hace, el test verifica (sesión 13).
export class LoginPage {
  constructor(page) {
    this.page = page;
    // El label «Usuario o Correo» no está asociado al campo (no tiene for/id),
    // por eso getByLabel no lo encuentra y se usa el placeholder.
    this.username = page.getByPlaceholder('admin o correo@ejemplo.com');
    // La contraseña tampoco tiene label asociado y su placeholder son puntos:
    // se usa su atributo name.
    this.password = page.locator('input[name="password"]');
    this.submitButton = page.getByRole('button', { name: 'Ingresar al Sistema' });
    this.errorMessage = page.getByText('Las credenciales son incorrectas');
    this.defaultCredentials = page.getByText('Credenciales por defecto');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(user, password) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.submitButton.click();
  }
}
