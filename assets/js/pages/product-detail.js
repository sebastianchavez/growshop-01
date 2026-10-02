/* ============================================
   PRODUCT-DETAIL.JS — Detalle de producto
   Namespace: VVProductDetail
   ============================================ */

const VVProductDetail = {
  product: null,
  selectedQty: 1,
  activeImage: 0,

  init() {
    const id = VV.getQueryParam("id");
    if (!id) { this.renderNotFound(); return; }
    this.product = PRODUCTS.find(p => p.id === id);
    if (!this.product) { this.renderNotFound(); return; }

    this.renderBreadcrumb();
    this.renderProduct();
    this.renderReviews();
    this.renderRelated();
    this.bindEvents();
  },

  renderNotFound() {
    const main = document.getElementById("product-main");
    if (main) main.innerHTML = `
      <div class="text-center py-20">
        <span class="material-symbols-outlined text-6xl text-slate-300">help</span>
        <h2 class="mt-4 text-2xl font-bold">Producto no encontrado</h2>
        <p class="text-slate-500 mt-2">El producto que buscas no existe o fue eliminado.</p>
        <a href="productos.html" class="mt-6 inline-flex px-5 py-2.5 bg-vv-700 text-white rounded-xl font-semibold hover:bg-vv-800">Ver catálogo</a>
      </div>
    `;
  },

  renderBreadcrumb() {
    const el = document.getElementById("breadcrumb");
    if (!el || !this.product) return;
    const cat = VV.getCategory(this.product.category);
    el.innerHTML = `
      <a href="index.html" class="hover:text-vv-700">Inicio</a>
      <span class="mx-2 text-slate-400">/</span>
      <a href="productos.html" class="hover:text-vv-700">Productos</a>
      <span class="mx-2 text-slate-400">/</span>
      ${cat ? `<a href="productos.html?cat=${cat.id}" class="hover:text-vv-700">${VV.escapeHTML(cat.name)}</a><span class="mx-2 text-slate-400">/</span>` : ''}
      <span class="text-slate-700 font-medium">${VV.escapeHTML(this.product.name)}</span>
    `;
  },

  renderProduct() {
    const el = document.getElementById("product-main");
    if (!el || !this.product) return;
    const p = this.product;
    const cat = VV.getCategory(p.category);
    const disc = VV.calcDiscount(p.oldPrice, p.price);
    const stockState = p.stock === 0 ? "out" : p.stock < 5 ? "low" : "ok";
    const fallback = VV.productImageFallback(p);
    // Genera N imágenes Picsum (variadas) según cantidad declarada en el producto
    const gallerySeeds = p.images.map((_, i) => `${p.id}-${i}`);
    const galleryImages = gallerySeeds.map(s => `https://picsum.photos/seed/${encodeURIComponent(s)}/800/800`);

    el.innerHTML = `
      <div class="grid lg:grid-cols-2 gap-10">
        <div>
          <div class="aspect-square bg-vv-cream rounded-2xl overflow-hidden mb-3">
            <img id="main-image" src="${galleryImages[0]}" alt="${VV.escapeHTML(p.name)}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='${fallback}'">
          </div>
          ${galleryImages.length > 1 ? `
            <div class="flex gap-2">
              ${galleryImages.map((src, i) => `
                <button class="vv-thumb w-20 h-20 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-vv-700' : 'border-transparent'} bg-vv-cream" data-img="${src}">
                  <img src="${src}" class="w-full h-full object-cover" alt="" onerror="this.onerror=null;this.src='${fallback}'">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div>
          ${cat ? `<p class="text-xs uppercase tracking-wider text-vv-700 font-semibold mb-2">${VV.escapeHTML(cat.name)}</p>` : ''}
          <h1 class="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mb-3">${VV.escapeHTML(p.name)}</h1>
          <div class="flex items-center gap-3 mb-4">
            ${VV.renderStars(p.rating, 16)}
            <span class="text-sm text-slate-600">${p.rating.toFixed(1)} · ${p.reviewsCount} reseñas</span>
          </div>
          <div class="flex items-baseline gap-3 mb-5">
            <span class="text-3xl font-bold text-vv-800">${VV.formatCLP(p.price)}</span>
            ${p.oldPrice ? `<span class="text-lg text-slate-400 line-through">${VV.formatCLP(p.oldPrice)}</span><span class="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">-${disc}%</span>` : ''}
          </div>
          <p class="text-slate-700 leading-relaxed mb-6">${VV.escapeHTML(p.description)}</p>

          <div class="mb-5">
            <p class="text-sm font-semibold mb-2">Especificaciones</p>
            <ul class="space-y-1.5 text-sm">
              ${p.specs.map(s => `<li class="flex items-start gap-2 text-slate-700"><span class="material-symbols-outlined text-vv-700 text-base">check_circle</span><span>${VV.escapeHTML(s)}</span></li>`).join('')}
            </ul>
          </div>

          <div class="flex items-center gap-3 mb-4">
            <p class="text-sm font-semibold">Cantidad:</p>
            <div class="inline-flex items-center border border-slate-300 rounded-lg overflow-hidden">
              <button id="qty-minus" class="w-10 h-10 hover:bg-vv-cream">−</button>
              <input id="qty-input" type="number" min="1" max="${p.stock}" value="1" class="w-14 h-10 text-center border-x border-slate-300 font-semibold">
              <button id="qty-plus" class="w-10 h-10 hover:bg-vv-cream">+</button>
            </div>
            <span class="text-sm ${stockState === 'out' ? 'text-red-600' : stockState === 'low' ? 'text-amber-600' : 'text-slate-500'}">
              ${stockState === 'out' ? '❌ Sin stock' : stockState === 'low' ? `⚠️ Solo ${p.stock} disponibles` : `✅ ${p.stock} disponibles`}
            </span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <button id="add-to-cart" class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-vv-700 text-white rounded-xl font-semibold hover:bg-vv-800 transition disabled:opacity-50" ${p.stock === 0 ? 'disabled' : ''}>
              <span class="material-symbols-outlined">shopping_cart</span>
              Agregar al carrito
            </button>
            <a href="https://wa.me/${STORE.whatsapp.replace(/\D/g,'')}?text=Hola,%20me%20interesa%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-vv-cream text-vv-800 rounded-xl font-semibold hover:bg-vv-earth transition">
              <span class="material-symbols-outlined">chat</span>
              Consultar
            </a>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="bg-vv-cream rounded-lg p-3"><span class="material-symbols-outlined text-vv-700">local_shipping</span><p class="mt-1 font-medium">Envío 24-48h</p></div>
            <div class="bg-vv-cream rounded-lg p-3"><span class="material-symbols-outlined text-vv-700">verified</span><p class="mt-1 font-medium">Garantía real</p></div>
            <div class="bg-vv-cream rounded-lg p-3"><span class="material-symbols-outlined text-vv-700">support_agent</span><p class="mt-1 font-medium">Asesoría</p></div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const minus = document.getElementById("qty-minus");
    const plus = document.getElementById("qty-plus");
    const input = document.getElementById("qty-input");
    if (minus) minus.addEventListener("click", () => { this.changeQty(-1); });
    if (plus) plus.addEventListener("click", () => { this.changeQty(1); });
    if (input) input.addEventListener("change", e => { this.setQty(Number(e.target.value) || 1); });

    const addBtn = document.getElementById("add-to-cart");
    if (addBtn) addBtn.addEventListener("click", () => {
      Store.cart.add(this.product.id, this.selectedQty);
      VV.toast(`"${this.product.name}" agregado al carrito`, "success");
    });

    document.querySelectorAll(".vv-thumb").forEach(btn => {
      btn.addEventListener("click", () => {
        const img = btn.dataset.img;
        document.getElementById("main-image").src = img;
        document.querySelectorAll(".vv-thumb").forEach(b => b.classList.remove("border-vv-700"));
        btn.classList.add("border-vv-700");
      });
    });
  },

  changeQty(delta) {
    const next = this.selectedQty + delta;
    this.setQty(next);
  },

  setQty(qty) {
    const max = this.product.stock || 1;
    this.selectedQty = Math.max(1, Math.min(max, qty));
    const input = document.getElementById("qty-input");
    if (input) input.value = this.selectedQty;
  },

  renderReviews() {
    const el = document.getElementById("reviews-section");
    if (!el || !this.product) return;
    const reviews = Store.reviews.byProduct(this.product.id);
    const avg = Store.reviews.average(this.product.id);
    const canReview = Store.reviews.canReview(this.product.id);

    if (reviews.length === 0) {
      el.innerHTML = `
        <div class="text-center py-8">
          <p class="text-slate-500 mb-4">Aún no hay reseñas para este producto.</p>
          ${canReview.ok ? `<a href="resena.html?productId=${this.product.id}" class="inline-flex px-5 py-2.5 bg-vv-700 text-white rounded-xl font-semibold hover:bg-vv-800">Sé el primero en reseñar</a>` : ''}
        </div>
      `;
      return;
    }

    el.innerHTML = `
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <div class="md:col-span-1 bg-vv-cream rounded-2xl p-6 text-center">
          <p class="text-5xl font-bold text-vv-800 mb-1">${avg.avg.toFixed(1)}</p>
          <div class="mb-1">${VV.renderStars(avg.avg, 20)}</div>
          <p class="text-sm text-slate-600">${avg.count} reseña${avg.count !== 1 ? 's' : ''}</p>
          ${canReview.ok ? `
            <a href="resena.html?productId=${this.product.id}" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-vv-700 hover:text-vv-800">
              <span class="material-symbols-outlined text-base">edit</span> Escribir reseña
            </a>
          ` : !Store.auth.isLoggedIn() ? `
            <a href="login.html" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-vv-700 hover:text-vv-800">Inicia sesión para reseñar</a>
          ` : ''}
        </div>
        <div class="md:col-span-2 space-y-4">
          ${reviews.map(r => `
            <div class="border-b border-slate-200 pb-4 last:border-0">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-vv-200 text-vv-800 flex items-center justify-center font-bold text-sm">${VV.escapeHTML(r.userName.charAt(0))}</div>
                <div class="flex-1">
                  <p class="font-semibold text-sm">${VV.escapeHTML(r.userName)}</p>
                  <p class="text-xs text-slate-500">${r.date}</p>
                </div>
                ${VV.renderStars(r.rating, 14)}
              </div>
              <p class="text-slate-700 text-sm leading-relaxed">${VV.escapeHTML(r.comment)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderRelated() {
    const el = document.getElementById("related-products");
    if (!el || !this.product) return;
    const related = PRODUCTS.filter(p => p.category === this.product.category && p.id !== this.product.id).slice(0, 4);
    if (related.length === 0) return;
    el.innerHTML = `
      <h2 class="text-xl font-serif font-bold mb-6">También te puede interesar</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${related.map(p => VV.productCardHTML(p)).join('')}</div>
    `;
  }
};
