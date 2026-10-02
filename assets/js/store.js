/* ============================================
   STORE.JS — Capa de persistencia (localStorage)
   Auth, Cart, Orders, Reviews + seed inicial
   Prefijo: vv_
   ============================================ */

const STORAGE = {
  CART: "vv_cart",
  USER: "vv_user",
  USERS: "vv_users",
  ORDERS: "vv_orders",
  REVIEWS: "vv_reviews"
};

const Store = {

  /* ============== SEED ============== */
  seed() {
    if (!localStorage.getItem(STORAGE.USERS)) {
      const users = [DEMO_USER];
      localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
    }
    if (!localStorage.getItem(STORAGE.REVIEWS)) {
      localStorage.setItem(STORAGE.REVIEWS, JSON.stringify(SEED_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE.ORDERS)) {
      localStorage.setItem(STORAGE.ORDERS, JSON.stringify(SEED_ORDERS));
    }
    if (!localStorage.getItem(STORAGE.CART)) {
      localStorage.setItem(STORAGE.CART, JSON.stringify([]));
    }
    // Migración: repara imágenes rotas (carrito y pedidos guardados previamente)
    this._migrateImages();
  },

  _migrateImages() {
    const picsum = (id) => `https://picsum.photos/seed/${encodeURIComponent(id)}/800/800`;
    const fallback = (cat) => `assets/images/categories/${cat}.svg`;
    const isBrokenOrSvg = (url) => !url || /\.svg(\?|$)/i.test(url) || url.includes("assets/images/categories");
    let changed = false;
    try {
      const cart = JSON.parse(localStorage.getItem(STORAGE.CART) || "[]");
      const newCart = cart.map(item => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        if (prod && isBrokenOrSvg(item.image)) {
          changed = true;
          return { ...item, image: picsum(prod.id), category: prod.category };
        }
        return item;
      });
      if (changed) localStorage.setItem(STORAGE.CART, JSON.stringify(newCart));
      changed = false;
      const orders = JSON.parse(localStorage.getItem(STORAGE.ORDERS) || "[]");
      const newOrders = orders.map(o => {
        const items = (o.items || []).map(item => {
          const prod = PRODUCTS.find(p => p.id === item.id);
          if (prod && isBrokenOrSvg(item.image)) {
            changed = true;
            return { ...item, image: picsum(prod.id), category: prod.category };
          }
          return item;
        });
        return { ...o, items };
      });
      if (changed) localStorage.setItem(STORAGE.ORDERS, JSON.stringify(newOrders));
    } catch (e) { /* noop */ }
  },

  /* ============== AUTH ============== */
  auth: {
    _readUsers() {
      try { return JSON.parse(localStorage.getItem(STORAGE.USERS)) || []; }
      catch { return []; }
    },
    _writeUsers(users) {
      localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
    },
    register({ name, email, phone, password }) {
      const users = this._readUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: "Este correo ya está registrado." };
      }
      const user = {
        id: "u-" + Date.now(),
        name, email, phone,
        password,
        createdAt: new Date().toISOString(),
        address: null
      };
      users.push(user);
      this._writeUsers(users);
      const { password: _pw, ...safe } = user;
      localStorage.setItem(STORAGE.USER, JSON.stringify(safe));
      return { ok: true, user: safe };
    },
    login(email, password) {
      const users = this._readUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password) {
        return { ok: false, error: "Correo o contraseña incorrectos." };
      }
      const { password: _pw, ...safe } = user;
      localStorage.setItem(STORAGE.USER, JSON.stringify(safe));
      return { ok: true, user: safe };
    },
    logout() {
      localStorage.removeItem(STORAGE.USER);
    },
    current() {
      try { return JSON.parse(localStorage.getItem(STORAGE.USER)); }
      catch { return null; }
    },
    isLoggedIn() {
      return !!this.current();
    },
    updateProfile(data) {
      const current = this.current();
      if (!current) return { ok: false };
      const users = this._readUsers();
      const idx = users.findIndex(u => u.id === current.id);
      if (idx === -1) return { ok: false };
      users[idx] = { ...users[idx], ...data };
      this._writeUsers(users);
      const { password: _pw, ...safe } = users[idx];
      localStorage.setItem(STORAGE.USER, JSON.stringify(safe));
      return { ok: true, user: safe };
    },
    changePassword(current, next) {
      const user = this.current();
      if (!user) return { ok: false, error: "No hay sesión activa." };
      const users = this._readUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx === -1) return { ok: false, error: "Usuario no encontrado." };
      if (users[idx].password !== current) {
        return { ok: false, error: "La contraseña actual es incorrecta." };
      }
      users[idx].password = next;
      this._writeUsers(users);
      return { ok: true };
    },
    passwordStrength(pw) {
      if (!pw || pw.length < 4) return { level: "weak", label: "Débil" };
      let score = 0;
      if (pw.length >= 6) score++;
      if (pw.length >= 8) score++;
      if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
      if (/\d/.test(pw)) score++;
      if (/[^A-Za-z0-9]/.test(pw)) score++;
      if (score <= 1) return { level: "weak", label: "Débil" };
      if (score <= 3) return { level: "medium", label: "Media" };
      return { level: "strong", label: "Fuerte" };
    },
    requestPasswordReset(email) {
      const users = this._readUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) return { ok: false, error: "No existe una cuenta con ese correo." };
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      return { ok: true, code, name: user.name };
    }
  },

  /* ============== CART ============== */
  cart: {
    getAll() {
      try { return JSON.parse(localStorage.getItem(STORAGE.CART)) || []; }
      catch { return []; }
    },
    save(items) {
      localStorage.setItem(STORAGE.CART, JSON.stringify(items));
      window.dispatchEvent(new Event("cart:updated"));
    },
    _productImage(p) {
      return `https://picsum.photos/seed/${encodeURIComponent(p.id)}/800/800`;
    },
    _productImageFallback(p) {
      return `assets/images/categories/${p.category}.svg`;
    },
    add(productId, qty = 1) {
      const items = this.getAll();
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return;
      const existing = items.find(i => i.id === productId);
      if (existing) {
        existing.qty = Math.min(product.stock, existing.qty + qty);
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: this._productImage(product),
          qty: Math.min(product.stock, qty),
          stock: product.stock,
          category: product.category
        });
      }
      this.save(items);
    },
    updateQty(productId, qty) {
      const items = this.getAll();
      const idx = items.findIndex(i => i.id === productId);
      if (idx === -1) return;
      if (qty <= 0) {
        items.splice(idx, 1);
      } else {
        const product = PRODUCTS.find(p => p.id === productId);
        items[idx].qty = Math.min(product.stock, qty);
      }
      this.save(items);
    },
    remove(productId) {
      const items = this.getAll().filter(i => i.id !== productId);
      this.save(items);
    },
    clear() {
      this.save([]);
    },
    count() {
      return this.getAll().reduce((sum, i) => sum + i.qty, 0);
    },
    subtotal() {
      return this.getAll().reduce((sum, i) => sum + i.price * i.qty, 0);
    }
  },

  /* ============== ORDERS ============== */
  orders: {
    getAll() {
      try { return JSON.parse(localStorage.getItem(STORAGE.ORDERS)) || []; }
      catch { return []; }
    },
    saveAll(orders) {
      localStorage.setItem(STORAGE.ORDERS, JSON.stringify(orders));
    },
    byUser(userId) {
      return this.getAll().filter(o => o.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    byId(id) {
      return this.getAll().find(o => o.id === id);
    },
    findByCode(code) {
      const clean = (code || "").trim().toUpperCase();
      return this.getAll().find(o => o.id.toUpperCase() === clean);
    },
    create({ userId, items, subtotal, shipping, shippingName, total, paymentName, address }) {
      const orders = this.getAll();
      const year = new Date().getFullYear();
      const yearOrders = orders.filter(o => o.id.includes(String(year)));
      const nextNum = 1000 + yearOrders.length + 1;
      const id = `GR-${year}-${nextNum}`;
      const now = new Date().toISOString();
      const order = {
        id, userId, items, subtotal, shipping, shippingName, total, paymentName, address,
        status: "recibido",
        createdAt: now,
        history: [{ status: "recibido", date: now }]
      };
      orders.push(order);
      this.saveAll(orders);
      return order;
    },
    statusFlow() { return ORDER_STATUS_FLOW; },
    statusIndex(status) { return ORDER_STATUS_FLOW.indexOf(status); },
    statusLabel(status) { return ORDER_STATUS_LABELS[status] || status; },
    statusIcon(status) { return ORDER_STATUS_ICONS[status] || "help"; }
  },

  /* ============== REVIEWS ============== */
  reviews: {
    getAll() {
      try { return JSON.parse(localStorage.getItem(STORAGE.REVIEWS)) || []; }
      catch { return []; }
    },
    saveAll(reviews) {
      localStorage.setItem(STORAGE.REVIEWS, JSON.stringify(reviews));
    },
    byProduct(productId) {
      return this.getAll().filter(r => r.productId === productId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    add({ productId, rating, comment, userName }) {
      const reviews = this.getAll();
      const review = {
        id: "r-" + Date.now(),
        productId,
        userName: userName || "Anónimo",
        rating,
        comment,
        date: new Date().toISOString().slice(0, 10)
      };
      reviews.push(review);
      this.saveAll(reviews);
      return review;
    },
    average(productId) {
      const list = this.byProduct(productId);
      if (list.length === 0) return { avg: 0, count: 0 };
      const sum = list.reduce((acc, r) => acc + r.rating, 0);
      return { avg: sum / list.length, count: list.length };
    },
    canReview(productId) {
      const user = Store.auth.current();
      if (!user) return { ok: false, reason: "Debes iniciar sesión para dejar una reseña." };
      const userOrders = Store.orders.byUser(user.id);
      const delivered = userOrders.filter(o => o.status === "entregado");
      const purchased = delivered.some(o => o.items.some(i => i.id === productId));
      if (!purchased) {
        return { ok: false, reason: "Solo puedes reseñar productos que hayas comprado y recibido." };
      }
      const alreadyReviewed = this.byProduct(productId)
        .some(r => r.userName === user.name);
      if (alreadyReviewed) {
        return { ok: false, reason: "Ya has dejado una reseña para este producto." };
      }
      return { ok: true };
    }
  }
};

Store.seed();
