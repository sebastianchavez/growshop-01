# VerdeVital Grow Shop — Ecommerce

Sitio web e-commerce multipágina para un grow shop chileno, listo para usar. Construido con **HTML + JavaScript nativo + Tailwind CSS** y datos mockeados persistidos en `localStorage`.

## 🌱 Cómo ejecutar

Es un proyecto estático: basta con servir los archivos con cualquier servidor HTTP local.

### Opción 1: VS Code Live Server
1. Abre la carpeta en VS Code.
2. Click derecho sobre `index.html` → **Open with Live Server**.

### Opción 2: Python
```bash
python -m http.server 8080
```
Luego abre http://localhost:8080

### Opción 3: Node.js
```bash
npx serve .
```

### Opción 4: Abrir directamente
Doble click sobre `index.html`. Funciona, aunque algunas APIs del navegador se comportan mejor con un servidor.

> **Importante:** No abras los HTML con `file://` para evitar restricciones de `localStorage` entre páginas. Usa siempre un servidor local.

---

## 🔑 Cuenta demo

Para probar el flujo de autenticación y pedidos:
- **Email:** `demo@verdevital.cl`
- **Contraseña:** `demo1234`

También puedes crear cuentas nuevas desde la página de registro. Los datos se guardan en el navegador.

---

## 📁 Estructura

```
/
├── index.html                       Landing / Inicio
├── nosotros.html                    Empresa + equipo
├── productos.html                   Catálogo con filtros
├── producto.html                    Detalle (?id=i001)
├── carrito.html                     Carrito de compras
├── checkout.html                    Pago + dirección + envío (stepper 3 pasos)
├── confirmacion.html                Confirmación + imprimir comprobante
├── perfil.html                      Mi perfil + historial (4 tabs)
├── pedido-detalle.html              Detalle con timeline (?id=GR-2025-1042)
├── resena.html                      Form reseña (?productId=i001)
├── contacto.html                    Form + horario + mapa
├── politicas-privacidad.html
├── terminos-condiciones.html
├── login.html                       Iniciar sesión
├── registro.html                    Crear cuenta (medidor fortaleza)
├── recuperar-password.html          Recuperación en 3 pasos
├── README.md
└── assets/
    ├── css/styles.css
    └── js/
        ├── data.js                  Catálogo, reseñas, pedidos demo
        ├── store.js                 Capa localStorage (auth/cart/orders/reviews)
        ├── ui.js                    Navbar, footer, toasts, formatCLP
        └── pages/
            ├── home.js
            ├── products.js
            └── product-detail.js
```

---

## 🧪 Flujo de prueba sugerido

1. Abre `index.html` y explora el landing.
2. Ve a **Productos** y filtra por categoría, búsqueda, precio u ordenamiento.
3. Entra a un producto y agrégalo al carrito (selector de cantidad con tope de stock).
4. Abre el **Carrito** y ajusta cantidades. El envío es gratis sobre $50.000.
5. **Inicia sesión** con la cuenta demo (o regístrate).
6. Procede al **Checkout**, completa dirección, elige envío y pago (stepper 3 pasos).
7. Confirma la compra → llegarás a la pantalla de confirmación con:
   - 🖨️ **Imprimir comprobante** (`window.print()` con CSS optimizado)
   - 📋 **Ver historial de pedidos** (perfil.html#pedidos)
8. En **Mi perfil** verás los pedidos. Abre el detalle de uno.
9. Si el pedido está *Entregado*, puedes dejar reseña con estrellas ⭐.

---

## 🛒 Catálogo mockeado

- **8 categorías**: Iluminación, Carpas, Sustratos, Fertilizantes, Hidroponía, Control de clima, Medición, Accesorios.
- **32 productos** con descripciones, specs, stock, rating y reseñas.
- Imágenes servidas desde **Picsum (Lorem Picsum)** con seeds determinísticos (mismo producto = misma foto). Si Picsum no responde, fallback automático a SVGs locales por categoría.
- **6 reseñas** pre-cargadas distribuidas en productos destacados.
- **3 pedidos demo** del usuario `demo@verdevital.cl` (entregado, en camino, preparando).

### 🖼️ Imágenes de productos

Cada producto tiene una URL determinística vía `https://picsum.photos/seed/{id}/800/800`. Para reemplazarlas por fotos reales del producto, edita:

- **`assets/js/ui.js`** → función `VV.productImage(product)` (catálogo y cards)
- **`assets/js/store.js`** → método `cart._productImage(p)` (carrito y pedidos)
- **`assets/js/pages/product-detail.js`** → función `renderProduct()` (galería de detalle)

El fallback final es `assets/images/categories/{categoria}.svg` (8 SVGs branded incluidos).

---

## 💾 Persistencia (localStorage)

| Key            | Contenido                                  |
|----------------|--------------------------------------------|
| `vv_cart`      | Items del carrito                          |
| `vv_user`      | Sesión del usuario actual                  |
| `vv_users`     | Usuarios registrados (incluye demo)        |
| `vv_orders`    | Pedidos realizados                         |
| `vv_reviews`   | Reseñas (incluye 6 seed)                   |

Para **reiniciar el estado** del demo, ejecuta en la consola del navegador:
```js
['vv_cart','vv_user','vv_users','vv_orders','vv_reviews']
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 🎨 Stack

- **HTML5** multipágina
- **Tailwind CSS 3** vía CDN (`cdn.tailwindcss.com`) con paleta personalizada
- **JavaScript ES2020** nativo (sin frameworks)
- **localStorage** como capa de persistencia
- **Google Fonts**: Inter (cuerpo) + Playfair Display (títulos)
- **Material Symbols** (iconos)

## 📱 Responsive

Diseño mobile-first, probado en breakpoints `sm`, `md`, `lg`.

## 🖨️ Impresión

La página `confirmacion.html` tiene estilos `@media print` optimizados para imprimir el comprobante (oculta navbar, footer y botones de acción).

---

## 🎨 Personalización rápida

- **Productos / Categorías:** Edita `assets/js/data.js`
- **Datos tienda:** Edita `STORE` en `data.js`
- **Colores:** Modifica la config de Tailwind en cada HTML (paleta `vv-*`)
- **Textos legales:** Edita los HTML `politicas-privacidad.html` y `terminos-condiciones.html`

---

## 📝 Notas

- Las imágenes se cargan desde Unsplash vía URL directa. Para producción, reemplázalas por imágenes locales.
- El "envío de emails" y el código OTP en `recuperar-password.html` son simulados (el código aparece en un toast).
- El mapa de contacto usa OpenStreetMap embebido (sin API key).
- Los pagos se simulan en el cliente; en producción integra con Webpay/Transbank.

---

Hecho con 🌱 en Chile.
