# Pruebas del TPV Minimarket

Proyecto final del bootcamp de QA (Tecsup). Pruebas manuales y automatizadas con Playwright del **Sistema de Facturación y Gestión para Minimarket** (TPV Minimarket v4.5, ambiente demo).

| Dato | Detalle |
|---|---|
| Responsable | Gabriela Villanueva (Analista QA) |
| Sistema bajo prueba | TPV Minimarket, módulos M14 Usuarios (login) y M02 Punto de Venta |
| Casos y defectos | Jira, proyecto QA Proyecto minimarket (QPM) |

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS)
- [Git](https://git-scm.com/)
- Un usuario de prueba del TPV Minimarket con un **turno de caja abierto** (los tests del Punto de Venta lo necesitan)

## Instalación

```powershell
git clone https://github.com/GabrielaVillanueva/proyecto_final_gabriela_villanueva.git
cd proyecto_final_gabriela_villanueva
npm install
npx playwright install chromium
copy .env.example .env
```

Después abre `.env` y escribe la dirección del sistema y el usuario de prueba. El `.env` **no se sube** a GitHub.

## Ejecución

| Qué | Comando |
|---|---|
| Toda la suite | `npm test` |
| Solo autenticación | `npm run test:auth` |
| Solo Punto de Venta | `npm run test:pos` |
| Comprobar estabilidad (3 veces cada test) | `npm run test:stable` |
| Ver el reporte | `npm run report` |
| Ver el navegador paso a paso | `npx playwright test --project=chromium --ui` |

## Estructura

```
pages/                    Page Objects: cómo es cada pantalla (locators y acciones)
├── LoginPage.js
├── DashboardPage.js
└── PosPage.js
tests/
├── fixtures.js           lo que cada test recibe ya preparado (login, Punto de Venta)
├── auth/login.spec.js    flujo 1: autenticación
├── pos/cart.spec.js      flujo 2: carrito del Punto de Venta (data-driven)
├── pos/search.spec.js    flujo 2: búsqueda sin resultados
└── practice/             ejercicios de la sesión 11 (localizadores y modo estricto)
test-data/
└── cart-quantities.json  cantidades y subtotales de los casos CP-01 a CP-14
docs/                     documentos del proyecto (casos, plan, matriz, defectos)
.env.example              plantilla de variables con valores falsos
```

## Casos automatizados

Los tests marcados como **defecto conocido** usan `test.fail()`: hoy fallan porque encuentran el defecto, y la suite queda en verde. Cuando el defecto se corrija, Playwright avisará que el test ya pasa.

| ID | Qué verifica | Resultado hoy |
|---|---|---|
| CP-AUTH-01 | Login válido lleva al panel y muestra la bienvenida | Pasa |
| CP-AUTH-02 | Usuario inexistente muestra mensaje de error | Pasa |
| CP-AUTH-03 | Contraseña incorrecta muestra mensaje de error | Pasa |
| CP-AUTH-04 | Con los campos vacíos el formulario no se envía | Pasa |
| CP-AUTH-05 | Cerrar sesión vuelve al login | Pasa |
| CP-13 | El login no muestra credenciales en pantalla | Defecto conocido (DEF-02) |
| CP-POS-01 | Agregar un producto lo muestra en el carrito con cantidad 1 | Pasa |
| CP-POS-02 | Buscar «xyz» no muestra productos | Pasa |
| CP-01, CP-04 a CP-07 | Cantidades de 1 a 80 se aceptan con el subtotal correcto | Pasan |
| CP-08, CP-09, CP-14 | Cantidades mayores al stock (81, 82, 999999999) se rechazan | Defecto conocido (DEF-01) |
| CP-02, CP-03 | Cantidad 0 y negativa se rechazan | Defecto conocido (por registrar) |
| CP-18 | Un producto sin stock no se agrega al carrito | Defecto conocido (DEF-04) |

Ningún test pulsa «Cobrar»: no se registran ventas ni cambia el stock del ambiente demo.

## Defectos registrados

| ID | Título | Severidad |
|---|---|---|
| DEF-01 | El carrito acepta una cantidad mayor al stock disponible | Alta |
| DEF-02 | El inicio de sesión muestra las credenciales por defecto | Alta |
| DEF-03 | Imágenes que no cargan en Punto de Venta | Baja |
| DEF-04 | Un producto con stock 0 se puede agregar al carrito | Alta |

## Documentación por semana

| Semana | Entregable | Documento |
|---|---|---|
| 1 | Alcance de calidad | [alcance-calidad-v1.docx](docs/alcance-calidad-v1.docx) |
| 2 | Casos de prueba manuales | [casos-manuales-v1.docx](docs/casos-manuales-v1.docx) |
| 3 | Plan de pruebas, matriz y reporte de defectos | [plan](docs/plan-de-pruebas-v1.docx) · [matriz](docs/matriz-trazabilidad-v1.docx) · [defectos](docs/reporte-defectos-v1.docx) |
| 4 | Localizadores, esperas y suite de login | [s11](docs/localizadores-esperas-s11.docx) · [s12](docs/login-assertions-s12.docx) · [evidencias](docs/evidencias-sesiones-11-12.docx) |
| 5 y 6 | Page Object, fixtures, dos flujos y datos en JSON | este README y la carpeta `tests/` |
