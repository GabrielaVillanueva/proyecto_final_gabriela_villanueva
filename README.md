# proyecto_final_gabriela_villanueva

Proyecto final del bootcamp de QA - Tecsup

## 🔍 Aseguramiento de calidad

| Dato | Detalle |
|---|---|
| 👩‍💻 **Responsable** | Gabriela Villanueva (Analista QA) |
| 🛒 **Sistema evaluado** | Sistema de Facturación y Gestión para Minimarket (TPV Minimarket v4.5, ambiente demo) |
| 📄 **Alcance de pruebas** | [Ver documento](docs/alcance-calidad-v1.docx) |
| 🗂️ **Casos y defectos** | Jira, proyecto QA Proyecto minimarket (QPM) |

## 📁 Estructura del repositorio

```
proyecto_final_gabriela_villanueva/
├── README.md                      Semana 1 · alcance de calidad
├── package.json                   Semana 4 · dependencias de Playwright
├── playwright.config.js           Semana 4 · configuración (baseURL, testIdAttribute)
├── .env.example                   Semana 4 · plantilla de credenciales (el .env no se sube)
├── tests/
│   ├── login.spec.js              Semana 4 · entregable: suite de autenticación
│   ├── mapa-localizadores.spec.js Semana 4 · sesión 11
│   ├── modo-estricto.spec.js      Semana 4 · sesión 11
│   ├── mi-busqueda.spec.js        Semana 4 · sesión 11
│   ├── esperas.spec.js            Semana 4 · sesión 11
│   └── helpers/sesion.js          inicio de sesión y apertura del Punto de Venta
└── docs/
    ├── alcance-calidad-v1.docx        Semana 1
    ├── casos-manuales-v1.docx         Semana 2
    ├── sesion-exploratoria-1.docx     Semana 3 · apoyo
    ├── plan-de-pruebas-v1.docx        Semana 3 · entregable
    ├── matriz-trazabilidad-v1.docx    Semana 3 · entregable
    ├── tabla-decision-v1.docx         Semana 3 · apoyo
    ├── reporte-defectos-v1.docx       Semana 3 · entregable
    ├── localizadores-esperas-s11.docx Semana 4 · sesión 11
    ├── login-assertions-s12.docx      Semana 4 · entregable
    ├── evidencias-sesiones-11-12.docx Semana 4 · capturas de ejecución
    └── evidencias/                    capturas de Jira y Lighthouse
```

## 📦 Entregables por semana

| Semana | Entregable | Documento |
|---|---|---|
| 1 | README y documento de alcance de calidad | [alcance-calidad-v1.docx](docs/alcance-calidad-v1.docx) |
| 2 | Casos de prueba manuales v1 | [casos-manuales-v1.docx](docs/casos-manuales-v1.docx) |
| 3 | Plan de pruebas | [plan-de-pruebas-v1.docx](docs/plan-de-pruebas-v1.docx) |
| 3 | Matriz de trazabilidad | [matriz-trazabilidad-v1.docx](docs/matriz-trazabilidad-v1.docx) |
| 3 | Reporte de defectos | [reporte-defectos-v1.docx](docs/reporte-defectos-v1.docx) |
| 3 · apoyo | Sesión exploratoria | [sesion-exploratoria-1.docx](docs/sesion-exploratoria-1.docx) |
| 3 · apoyo | Tabla de decisión | [tabla-decision-v1.docx](docs/tabla-decision-v1.docx) |
| 4 | Suite automatizada de autenticación | [tests/login.spec.js](tests/login.spec.js) · [login-assertions-s12.docx](docs/login-assertions-s12.docx) |
| 4 · apoyo | Localizadores y esperas | [localizadores-esperas-s11.docx](docs/localizadores-esperas-s11.docx) |
| 4 · evidencia | Capturas de ejecución (sesiones 11 y 12) | [evidencias-sesiones-11-12.docx](docs/evidencias-sesiones-11-12.docx) |

## 🐞 Defectos registrados

| ID | Título | Severidad |
|---|---|---|
| DEF-01 | El carrito acepta una cantidad mayor al stock disponible | Alta |
| DEF-02 | El inicio de sesión muestra las credenciales por defecto | Alta |
| DEF-03 | Imágenes que no cargan en Punto de Venta | Baja |

## 🤖 Pruebas automatizadas (Playwright)

| Dato | Detalle |
|---|---|
| Herramienta | Playwright (`@playwright/test`) con JavaScript |
| Navegador de ejecución | Chromium |
| Módulos cubiertos | M14 Usuarios (inicio de sesión) y M02 Punto de venta (búsqueda) |

**Preparar el entorno**

```powershell
npm install
npx playwright install chromium
copy .env.example .env      # luego escribe la contraseña de prueba en .env
```

**Ejecutar**

```powershell
npx playwright test login --project=chromium --reporter=list    # entregable semana 4
npx playwright test --project=chromium --grep-invert "lectura única"
npx playwright show-report
```

Los tests del Punto de Venta necesitan un turno de caja abierto con el usuario de prueba.
