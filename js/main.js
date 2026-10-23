/**
 * Savoria Gourmet Food Delivery - Shared JavaScript State & Utilities
 */

// 1. Food Cart State Manager (persisted in localStorage)
const FOOD_CART = {
  getCart() {
    try {
      return JSON.parse(localStorage.getItem('savoria_cart')) || [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem('savoria_cart', JSON.stringify(cart));
    this.updateCartBadges();
    window.dispatchEvent(new Event('cartUpdated'));
  },

  addItem(item) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        category: item.category || 'Specialty',
        quantity: item.quantity || 1,
        spicy: item.spicy || 0
      });
    }
    this.saveCart(cart);
    showToast(`Added "${item.name}" to your feast cart!`, 'success');
  },

  removeItem(id) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === id);
    cart = cart.filter(i => i.id !== id);
    this.saveCart(cart);
    if (item) {
      showToast(`Removed "${item.name}" from cart.`, 'info');
    }
  },

  updateQuantity(id, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(id);
    } else {
      this.saveCart(cart);
    }
  },

  clearCart() {
    localStorage.removeItem('savoria_cart');
    this.updateCartBadges();
    window.dispatchEvent(new Event('cartUpdated'));
  },

  getCount() {
    const cart = this.getCart();
    return cart.reduce((sum, i) => sum + i.quantity, 0);
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  },

  updateCartBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  }
};

// 2. User Authentication State Manager
const FOOD_AUTH = {
  getUser() {
    try {
      return JSON.parse(localStorage.getItem('savoria_user'));
    } catch (e) {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem('savoria_user', JSON.stringify(user));
    this.updateNavAuth();
  },

  logout() {
    localStorage.removeItem('savoria_user');
    this.updateNavAuth();
    showToast('Logged out of Savoria.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  },

  updateNavAuth() {
    const user = this.getUser();
    const containers = document.querySelectorAll('.auth-nav-container');

    containers.forEach(container => {
      if (!container) return;
      const root = container.getAttribute('data-root') || '';

      if (user && user.name) {
        container.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 bg-amber-50 border border-amber-200 py-1 px-3 rounded-xl">
              <div class="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <div class="hidden sm:block text-left">
                <span class="text-xs font-bold text-amber-950 block leading-tight">${user.name.split(' ')[0]}</span>
                <span class="text-[10px] text-amber-600 block">${user.points || 120} pts</span>
              </div>
            </div>
            <button onclick="FOOD_AUTH.logout()" title="Sign Out" class="text-xs font-semibold text-gray-500 hover:text-rose-600 transition p-1">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <a href="${root}pages/login.html" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
            <i class="fa-solid fa-user text-xs"></i>
            <span>Sign In</span>
          </a>
        `;
      }
    });
  }
};

// 3. Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgStyles = {
    success: 'bg-emerald-600 text-white',
    info: 'bg-indigo-600 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-rose-600 text-white'
  };

  const icons = {
    success: '<i class="fa-solid fa-circle-check text-lg"></i>',
    info: '<i class="fa-solid fa-circle-info text-lg"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation text-lg"></i>',
    error: '<i class="fa-solid fa-circle-exmark text-lg"></i>'
  };

  toast.className = `${bgStyles[type] || bgStyles.success} px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium transition duration-300 transform translate-y-4 opacity-0 pointer-events-auto`;
  toast.innerHTML = `
    <div class="flex-shrink-0">${icons[type] || icons.success}</div>
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="opacity-70 hover:opacity-100 ml-2 text-base font-bold">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 20);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 4. Mobile Menu Drawer Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

// 5. Global Newsletter Subscription
function setupNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`🎉 You're in! Use coupon FEAST20 for 20% off your first delivery.`, 'success');
        input.value = '';
      }
    });
  });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  FOOD_CART.updateCartBadges();
  FOOD_AUTH.updateNavAuth();
  setupMobileMenu();
  setupNewsletter();
});
