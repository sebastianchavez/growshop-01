/* ============================================
   PRODUCTS.JS — Catálogo con filtros
   Namespace: VVProducts
   ============================================ */

const VVProducts = {
  filters: {
    cat: null,
    q: "",
    min: 0,
    max: Infinity,
    sort: "destacados"
  },

  init() {
    const catParam = VV.getQueryParam("cat");
    const qParam = VV.getQueryParam("q");
    if (catParam) this.filters.cat = catParam;
    if (qParam) this.filters.q = qParam;

    this.renderFilters();
    this.bindEvents();
    this.render();
  },

  renderFilters() {
    const el = document.getElementById("filters-categories");
    if (!el) return;
    const counts = this.getCategoryCounts();
    const items = [{ id: null, name: "Todas las categorías", count: PRODUCTS.length }, ...CATEGORIES.map(c => ({ id: c.id, name: c.name, count: counts[c.id] || 0 }))];
    el.innerHTML = items.map(c => `
      <label class="flex items-center gap-2 py-1.5 cursor-pointer text-sm hover:text-vv-700">
        <input type="radio" name="cat" value="${c.id || ''}" ${this.filters.cat === c.id ? 'checked' : ''} class="accent-vv-700">
        <span class="flex-1">${VV.escapeHTML(c.name)}</span>
        <span class="text-xs text-slate-500">(${c.count})</span>
      </label>
    `).join('');
  },

  getCategoryCounts() {
    const counts = {};
    PRODUCTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  },

  bindEvents() {
    const el = document.getElementById("filters-categories");
    if (el) el.addEventListener("change", e => {
      this.filters.cat = e.target.value || null;
      VV.setQueryParam("cat", this.filters.cat);
      this.render();
    });
    const search = document.getElementById("search-input");
    if (search) {
      search.value = this.filters.q;
      search.addEventListener("input", e => {
        this.filters.q = e.target.value.toLowerCase().trim();
        VV.setQueryParam("q", e.target.value);
        this.render();
      });
    }
    const min = document.getElementById("price-min");
    const max = document.getElementById("price-max");
    if (min) min.addEventListener("change", e => {
      this.filters.min = Number(e.target.value) || 0;
      this.render();
    });
    if (max) max.addEventListener("change", e => {
      this.filters.max = Number(e.target.value) || Infinity;
      this.render();
    });
    const sort = document.getElementById("sort-select");
    if (sort) sort.addEventListener("change", e => {
      this.filters.sort = e.target.value;
      this.render();
    });
  },

  applyFilters(items) {
    return items.filter(p => {
      if (this.filters.cat && p.category !== this.filters.cat) return false;
      if (this.filters.q && !p.name.toLowerCase().includes(this.filters.q) && !p.description.toLowerCase().includes(this.filters.q)) return false;
      if (p.price < this.filters.min) return false;
      if (p.price > this.filters.max) return false;
      return true;
    });
  },

  applySort(items) {
    const arr = [...items];
    switch (this.filters.sort) {
      case "precio-asc": arr.sort((a, b) => a.price - b.price); break;
      case "precio-desc": arr.sort((a, b) => b.price - a.price); break;
      case "rating": arr.sort((a, b) => b.rating - a.rating); break;
      case "nombre": arr.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return arr;
  },

  render() {
    const el = document.getElementById("products-grid");
    if (!el) return;
    const filtered = this.applySort(this.applyFilters(PRODUCTS));
    const countEl = document.getElementById("results-count");
    if (countEl) countEl.textContent = filtered.length;
    if (filtered.length === 0) {
      el.innerHTML = `
        <div class="col-span-full text-center py-16">
          <span class="material-symbols-outlined text-6xl text-slate-300">search_off</span>
          <h3 class="mt-4 text-lg font-semibold text-slate-700">No encontramos productos</h3>
          <p class="text-sm text-slate-500 mt-1">Prueba ajustando los filtros o la búsqueda.</p>
        </div>
      `;
      return;
    }
    el.innerHTML = filtered.map(p => VV.productCardHTML(p)).join('');
  }
};
