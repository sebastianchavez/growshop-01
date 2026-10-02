/* ============================================
   HOME.JS — Lógica de la landing page
   Namespace: VVHome
   ============================================ */

const VVHome = {
  init() {
    this.renderCategories();
    this.renderFeatured();
    this.renderTestimonials();
  },

  renderCategories() {
    const el = document.getElementById("categories-grid");
    if (!el) return;
    el.innerHTML = CATEGORIES.map(c => VV.categoryCardHTML(c)).join('');
  },

  renderFeatured() {
    const el = document.getElementById("featured-products");
    if (!el) return;
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);
    el.innerHTML = featured.map(p => VV.productCardHTML(p)).join('');
  },

  renderTestimonials() {
    const el = document.getElementById("testimonials-grid");
    if (!el) return;
    el.innerHTML = TESTIMONIALS.map(t => `
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
        <div class="mb-3">${VV.renderStars(t.rating, 16)}</div>
        <p class="text-slate-700 italic leading-relaxed mb-4 flex-1">"${VV.escapeHTML(t.text)}"</p>
        <div class="pt-3 border-t border-slate-100">
          <p class="font-semibold text-slate-900 text-sm">${VV.escapeHTML(t.name)}</p>
          <p class="text-xs text-slate-500">${VV.escapeHTML(t.role)}</p>
        </div>
      </div>
    `).join('');
  }
};
