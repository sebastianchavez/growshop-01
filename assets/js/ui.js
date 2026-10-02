/* ============================================
   UI.JS — Navbar, footer, toasts, helpers
   Namespace: VV (VerdeVital)
   ============================================ */

const VV = {

  /* ============== HELPERS ============== */
  formatCLP(n) {
    return "$" + Math.round(Number(n) || 0).toLocaleString("es-CL");
  },
  calcDiscount(old, current) {
    if (!old || old <= current) return 0;
    return Math.round((1 - current / old) * 100);
  },
  escapeHTML(str) {
    return String(str || "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  },
  getQueryParam(key) {
    return new URLSearchParams(location.search).get(key);
  },
  setQueryParam(key, val) {
    const url = new URL(location.href);
    if (val === null || val === undefined || val === "") url.searchParams.delete(key);
    else url.searchParams.set(key, val);
    history.replaceState({}, "", url);
  },
  getCategory(id) {
    return CATEGORIES.find(c => c.id === id);
  },
  getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
  },

  /* ============== PRODUCT IMAGE ==============
     Devuelve una URL de imagen real determinística (Picsum).
     El navegador cae al SVG local por categoría si Picsum falla. */
  productImage(product) {
    if (!product) return "";
    const seed = encodeURIComponent(product.id);
    return `https://picsum.photos/seed/${seed}/800/800`;
  },
  productImageFallback(product) {
    if (!product) return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%2315803d'/%3E%3C/svg%3E";
    return `assets/images/categories/${product.category}.svg`;
  },
  categoryImage(category) {
    if (!category) return "";
    const seed = encodeURIComponent("cat-" + category.id);
    return `https://picsum.photos/seed/${seed}/600/400`;
  },
  categoryImageFallback(category) {
    if (!category) return "";
    return `assets/images/categories/${category.id}.svg`;
  },

  /* ============== RENDER STARS ============== */
  renderStars(rating, size = 14) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const total = 5;
    let html = '<span class="vv-stars" style="font-size:' + size + 'px;">';
    for (let i = 0; i < total; i++) {
      if (i < full) html += '<span style="color:#f59e0b;">★</span>';
      else if (i === full && half) html += '<span style="color:#f59e0b;">⯨</span>';
      else html += '<span style="color:#d1d5db;">★</span>';
    }
    html += '</span>';
    return html;
  },

  /* ============== PRODUCT CARD ============== */
  productCardHTML(p) {
    const cat = this.getCategory(p.category);
    const catName = cat ? cat.name : "";
    const disc = this.calcDiscount(p.oldPrice, p.price);
    const detailURL = "producto.html?id=" + encodeURIComponent(p.id);
    const fallback = `assets/images/categories/${p.category}.svg`;
    return `
      <a href="${detailURL}" class="vv-card group block bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-vv-500 hover:shadow-lg transition">
        <div class="relative aspect-square overflow-hidden bg-vv-cream">
          <img src="${this.productImage(p)}" alt="${this.escapeHTML(p.name)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
          <div class="absolute top-2 left-2 flex flex-col gap-1">
            ${p.isNew ? '<span class="px-2 py-0.5 bg-vv-700 text-white text-[10px] font-bold uppercase rounded">Nuevo</span>' : ''}
            ${disc > 0 ? '<span class="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded">-' + disc + '%</span>' : ''}
            ${p.featured ? '<span class="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold uppercase rounded">Top</span>' : ''}
          </div>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <p class="text-[10px] uppercase tracking-wider text-slate-500 mb-1">${this.escapeHTML(catName)}</p>
          <h3 class="text-sm font-semibold text-slate-900 mb-2 line-clamp-2 leading-snug">${this.escapeHTML(p.name)}</h3>
          <div class="flex items-center gap-1 mb-2 text-xs">
            ${this.renderStars(p.rating, 12)}
            <span class="text-slate-500">(${p.reviewsCount})</span>
          </div>
          <div class="mt-auto flex items-baseline gap-2">
            <span class="text-lg font-bold text-vv-800">${this.formatCLP(p.price)}</span>
            ${p.oldPrice ? '<span class="text-xs text-slate-400 line-through">' + this.formatCLP(p.oldPrice) + '</span>' : ''}
          </div>
        </div>
      </a>
    `;
  },

  /* ============== CATEGORY CARD ============== */
  categoryCardHTML(c) {
    const fallback = this.categoryImageFallback(c);
    return `
      <a href="productos.html?cat=${encodeURIComponent(c.id)}" class="relative aspect-square rounded-xl overflow-hidden block group">
        <img src="${this.categoryImage(c)}" alt="${this.escapeHTML(c.name)}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
        <div class="absolute inset-0 bg-gradient-to-t from-vv-900/85 via-vv-900/40 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 class="font-serif text-lg font-bold mb-0.5">${this.escapeHTML(c.name)}</h3>
          <p class="text-xs opacity-90">${this.escapeHTML(c.description)}</p>
        </div>
      </a>
    `;
  },

  /* ============== NAVBAR ============== */
  mountNavbar(activeKey) {
    const user = Store.auth.current();
    const cartCount = Store.cart.count();
    const navLinks = [
      { key: "inicio", label: "Inicio", href: "index.html" },
      { key: "productos", label: "Productos", href: "productos.html" },
      { key: "nosotros", label: "Nosotros", href: "nosotros.html" },
      { key: "contacto", label: "Contacto", href: "contacto.html" }
    ];
    const root = document.getElementById("navbar");
    if (!root) return;
    root.innerHTML = `
      <header class="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 lg:h-20">
            <a href="index.html" class="flex items-center gap-2 text-vv-800 hover:text-vv-700">
              <span class="w-10 h-10 rounded-full bg-gradient-to-br from-vv-700 to-vv-500 flex items-center justify-center text-white text-lg">🌱</span>
              <span class="font-serif text-xl font-bold hidden sm:inline">VerdeVital</span>
            </a>
            <nav class="hidden lg:flex items-center gap-7">
              ${navLinks.map(l => `
                <a href="${l.href}" class="text-sm font-medium ${activeKey === l.key ? 'text-vv-700 border-b-2 border-vv-700' : 'text-slate-700 hover:text-vv-700'} py-1">
                  ${l.label}
                </a>
              `).join('')}
            </nav>
            <div class="flex items-center gap-1">
              <a href="productos.html" class="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-vv-cream text-slate-700" title="Buscar productos">
                <span class="material-symbols-outlined">search</span>
              </a>
              <a href="carrito.html" class="relative inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-vv-cream text-slate-700" title="Carrito">
                <span class="material-symbols-outlined">shopping_cart</span>
                <span id="cart-badge" class="${cartCount > 0 ? '' : 'hidden'} absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-vv-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">${cartCount}</span>
              </a>
              ${user ? `
                <div class="relative">
                  <button id="userMenuBtn" class="inline-flex items-center gap-1 px-2 h-10 rounded-lg hover:bg-vv-cream text-slate-700">
                    <span class="material-symbols-outlined">account_circle</span>
                    <span class="hidden md:inline text-sm font-medium">${this.escapeHTML(user.name.split(' ')[0])}</span>
                  </button>
                  <div id="userMenu" class="hidden absolute right-0 top-12 w-56 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                    <div class="px-4 py-3 border-b border-slate-100">
                      <p class="text-sm font-semibold text-slate-900">${this.escapeHTML(user.name)}</p>
                      <p class="text-xs text-slate-500 truncate">${this.escapeHTML(user.email)}</p>
                    </div>
                    <a href="perfil.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-vv-cream">
                      <span class="material-symbols-outlined text-lg">person</span> Mi perfil
                    </a>
                    <a href="perfil.html#pedidos" class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-vv-cream">
                      <span class="material-symbols-outlined text-lg">receipt_long</span> Mis pedidos
                    </a>
                    <button id="logoutBtn" class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100">
                      <span class="material-symbols-outlined text-lg">logout</span> Cerrar sesión
                    </button>
                  </div>
                </div>
              ` : `
                <a href="login.html" class="hidden md:inline-flex items-center gap-1 px-3 h-10 rounded-lg text-slate-700 hover:bg-vv-cream text-sm font-medium">
                  <span class="material-symbols-outlined">login</span> Entrar
                </a>
                <a href="registro.html" class="hidden sm:inline-flex items-center px-4 h-10 rounded-lg bg-vv-700 text-white hover:bg-vv-800 text-sm font-semibold">
                  Crear cuenta
                </a>
              `}
              <button id="mobileToggle" class="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-vv-cream text-slate-700">
                <span class="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
        <div id="mobileMenu" class="hidden lg:hidden border-t border-slate-200 bg-white">
          <div class="px-4 py-3 space-y-1">
            ${navLinks.map(l => `
              <a href="${l.href}" class="block px-3 py-2.5 rounded-lg text-sm font-medium ${activeKey === l.key ? 'bg-vv-cream text-vv-700' : 'text-slate-700 hover:bg-slate-50'}">${l.label}</a>
            `).join('')}
            ${user ? `
              <a href="perfil.html" class="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Mi perfil</a>
              <button id="logoutBtnMobile" class="w-full text-left block px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">Cerrar sesión</button>
            ` : `
              <a href="login.html" class="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Iniciar sesión</a>
              <a href="registro.html" class="block px-3 py-2.5 rounded-lg text-sm font-semibold bg-vv-700 text-white text-center">Crear cuenta</a>
            `}
          </div>
        </div>
      </header>
    `;

    const updateBadge = () => {
      const c = Store.cart.count();
      const badge = document.getElementById("cart-badge");
      if (badge) {
        badge.textContent = c;
        badge.classList.toggle("hidden", c === 0);
      }
    };
    window.addEventListener("cart:updated", updateBadge);

    const userMenuBtn = document.getElementById("userMenuBtn");
    const userMenu = document.getElementById("userMenu");
    if (userMenuBtn && userMenu) {
      userMenuBtn.addEventListener("click", e => {
        e.stopPropagation();
        userMenu.classList.toggle("hidden");
      });
      document.addEventListener("click", () => userMenu.classList.add("hidden"));
    }
    const handleLogout = () => {
      Store.auth.logout();
      VV.toast("Sesión cerrada", "info");
      setTimeout(() => location.href = "index.html", 600);
    };
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtnMobile = document.getElementById("logoutBtnMobile");
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", handleLogout);

    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
    }
  },

  /* ============== FOOTER ============== */
  mountFooter() {
    const root = document.getElementById("footer");
    if (!root) return;
    const year = new Date().getFullYear();
    root.innerHTML = `
      <footer class="bg-slate-900 text-slate-300 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="w-10 h-10 rounded-full bg-gradient-to-br from-vv-700 to-vv-500 flex items-center justify-center text-white text-lg">🌱</span>
                <span class="font-serif text-xl font-bold text-white">VerdeVital</span>
              </div>
              <p class="text-sm text-slate-400 leading-relaxed mb-4">${STORE.description}</p>
              <div class="flex gap-2">
                <a href="${STORE.social.instagram}" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-vv-700 flex items-center justify-center text-white" title="Instagram">
                  <span class="material-symbols-outlined text-lg">photo_camera</span>
                </a>
                <a href="${STORE.social.facebook}" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-vv-700 flex items-center justify-center text-white" title="Facebook">
                  <span class="material-symbols-outlined text-lg">share</span>
                </a>
                <a href="${STORE.social.tiktok}" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-vv-700 flex items-center justify-center text-white" title="TikTok">
                  <span class="material-symbols-outlined text-lg">music_note</span>
                </a>
              </div>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Tienda</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="productos.html" class="hover:text-vv-300">Todos los productos</a></li>
                <li><a href="productos.html?cat=iluminacion" class="hover:text-vv-300">Iluminación</a></li>
                <li><a href="productos.html?cat=carpas" class="hover:text-vv-300">Carpas</a></li>
                <li><a href="productos.html?cat=fertilizantes" class="hover:text-vv-300">Fertilizantes</a></li>
                <li><a href="productos.html?cat=h1" class="hover:text-vv-300" style="display:none">.</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Empresa</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="nosotros.html" class="hover:text-vv-300">Sobre nosotros</a></li>
                <li><a href="contacto.html" class="hover:text-vv-300">Contacto</a></li>
                <li><a href="terminos-condiciones.html" class="hover:text-vv-300">Términos y condiciones</a></li>
                <li><a href="politicas-privacidad.html" class="hover:text-vv-300">Políticas de privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-lg text-vv-300">location_on</span>
                  <span>${STORE.address}</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-lg text-vv-300">phone</span>
                  <a href="tel:${STORE.phone.replace(/\s/g,'')}" class="hover:text-vv-300">${STORE.phone}</a>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-lg text-vv-300">mail</span>
                  <a href="mailto:${STORE.email}" class="hover:text-vv-300">${STORE.email}</a>
                </li>
                <li class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-lg text-vv-300">schedule</span>
                  <span>Lun-Vie 10:00-20:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <p>© ${year} VerdeVital Grow Shop · Todos los derechos reservados.</p>
            <p>Hecho con 🌱 en Chile</p>
          </div>
        </div>
      </footer>
    `;
  },

  /* ============== TOAST ============== */
  toast(message, type = "info", duration = 2500) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed top-20 right-4 z-50 space-y-2 pointer-events-none";
      document.body.appendChild(container);
    }
    const colors = {
      success: "bg-vv-700 border-vv-800",
      error: "bg-red-600 border-red-700",
      warning: "bg-amber-500 border-amber-600",
      info: "bg-slate-800 border-slate-900"
    };
    const icons = {
      success: "check_circle",
      error: "error",
      warning: "warning",
      info: "info"
    };
    const toast = document.createElement("div");
    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-white border-l-4 shadow-lg ${colors[type] || colors.info}`;
    toast.style.animation = "vv-slide-in 0.3s ease-out";
    toast.innerHTML = `
      <span class="material-symbols-outlined">${icons[type] || icons.info}</span>
      <span class="text-sm font-medium">${this.escapeHTML(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "vv-slide-out 0.3s ease-in forwards";
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  requireAuth(redirect = "login.html") {
    if (!Store.auth.isLoggedIn()) {
      this.toast("Debes iniciar sesión para continuar", "warning");
      setTimeout(() => location.href = redirect, 700);
      return false;
    }
    return true;
  }
};
