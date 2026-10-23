/**
 * Voyage Vista - Shared JavaScript Utilities & Interactivity
 */

// Global User State Manager
const VV_AUTH = {
    getUser() {
        try {
            return JSON.parse(localStorage.getItem('vv_user'));
        } catch (e) {
            return null;
        }
    },
    setUser(user) {
        localStorage.setItem('vv_user', JSON.stringify(user));
        this.updateNavAuth();
    },
    logout() {
        localStorage.removeItem('vv_user');
        this.updateNavAuth();
        showToast('You have been logged out.', 'info');
        setTimeout(() => {
            window.location.reload();
        }, 800);
    },
    updateNavAuth() {
        const user = this.getUser();
        const authContainers = document.querySelectorAll('.auth-nav-container');

        authContainers.forEach(container => {
            if (!container) return;
            const rootPath = container.getAttribute('data-root') || '';
            if (user && user.name) {
                container.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-200 py-1.5 px-3 rounded-xl">
                            <div class="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                ${user.name.charAt(0)}
                            </div>
                            <span class="text-xs font-semibold text-indigo-900 hidden sm:inline">${user.name.split(' ')[0]}</span>
                        </div>
                        <button onclick="VV_AUTH.logout()" title="Log out" class="text-xs font-semibold text-gray-500 hover:text-red-600 px-2 py-1 rounded transition flex items-center gap-1">
                            <i class="fa-solid fa-arrow-right-from-bracket text-[11px]"></i>
                            <span>Sign Out</span>
                        </button>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <a class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition hover:shadow-md"
                        href="${rootPath}pages/login.html">
                        <i class="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                        <span>Login</span>
                    </a>
                `;
            }
        });
    }
};

// Toast Notification System
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
        success: 'bg-emerald-600 text-white',
        info: 'bg-indigo-600 text-white',
        warning: 'bg-amber-500 text-white',
        error: 'bg-rose-600 text-white'
    };

    const icons = {
        success: `<i class="fa-solid fa-circle-check text-base flex-shrink-0"></i>`,
        info: `<i class="fa-solid fa-circle-info text-base flex-shrink-0"></i>`,
        warning: `<i class="fa-solid fa-triangle-exclamation text-base flex-shrink-0"></i>`,
        error: `<i class="fa-solid fa-circle-xmark text-base flex-shrink-0"></i>`
    };

    toast.className = `${bgColors[type] || bgColors.success} px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto max-w-md`;
    toast.innerHTML = `
        ${icons[type] || icons.success}
        <span class="flex-1">${message}</span>
        <button class="opacity-75 hover:opacity-100 text-white ml-2 text-lg leading-none" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 20);

    // Auto dismiss
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Shared Newsletter Subscription
function setupNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                showToast(`Thank you for subscribing! Check ${input.value} for 15% off coupon code.`, 'success');
                input.value = '';
            }
        });
    });
}

// Quick Booking Modal Launcher
function openQuickBooking(destination = '') {
    let modal = document.getElementById('quick-booking-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-booking-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-fade-in">
                <button onclick="closeQuickBooking()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <i class="fa-solid fa-plane-departure text-lg"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Book Your Journey</h3>
                        <p class="text-xs text-gray-500">Voyage Vista instant reservation request</p>
                    </div>
                </div>
                
                <form id="quick-booking-form" onsubmit="submitQuickBooking(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Destination</label>
                        <input type="text" id="qb-destination" required class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 font-medium text-gray-800" placeholder="e.g. Paris, France" />
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Travel Date</label>
                            <input type="date" id="qb-date" required class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Travelers</label>
                            <select id="qb-travelers" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white">
                                <option value="1">1 Traveler (Solo)</option>
                                <option value="2" selected>2 Travelers (Couple/Friends)</option>
                                <option value="3">3 Travelers</option>
                                <option value="4">4+ Travelers (Family/Group)</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
                            <input type="text" id="qb-name" required placeholder="John Doe" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Email</label>
                            <input type="email" id="qb-email" required placeholder="john@example.com" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Package Tier</label>
                        <div class="grid grid-cols-3 gap-2 text-center text-xs">
                            <label class="border border-gray-200 rounded-xl p-2.5 cursor-pointer has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 block transition">
                                <input type="radio" name="qb-tier" value="Standard" class="hidden" checked />
                                <span class="font-bold block text-gray-800">Standard</span>
                                <span class="text-gray-500 text-[10px]">3-Star Comfort</span>
                            </label>
                            <label class="border border-gray-200 rounded-xl p-2.5 cursor-pointer has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 block transition">
                                <input type="radio" name="qb-tier" value="Premium" class="hidden" />
                                <span class="font-bold block text-indigo-700">Premium</span>
                                <span class="text-gray-500 text-[10px]">4-Star Boutique</span>
                            </label>
                            <label class="border border-gray-200 rounded-xl p-2.5 cursor-pointer has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50 block transition">
                                <input type="radio" name="qb-tier" value="Luxury" class="hidden" />
                                <span class="font-bold block text-purple-700">Luxury</span>
                                <span class="text-gray-500 text-[10px]">5-Star All-In</span>
                            </label>
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                            <i class="fa-solid fa-check"></i>
                            <span>Confirm Instant Reservation</span>
                        </button>
                        <p class="text-[11px] text-gray-400 text-center mt-2">No upfront payment required • Free cancellation within 48h</p>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Set default travel date to 2 weeks from now
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const dateInput = document.getElementById('qb-date');
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];

    // Pre-fill user if logged in
    const user = VV_AUTH.getUser();
    if (user) {
        const nameInp = document.getElementById('qb-name');
        const emailInp = document.getElementById('qb-email');
        if (nameInp && user.name) nameInp.value = user.name;
        if (emailInp && user.email) emailInp.value = user.email;
    }

    if (destination) {
        const destInput = document.getElementById('qb-destination');
        if (destInput) destInput.value = destination;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closeQuickBooking() {
    const modal = document.getElementById('quick-booking-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function submitQuickBooking(e) {
    e.preventDefault();
    const dest = document.getElementById('qb-destination').value;
    const name = document.getElementById('qb-name').value;
    const refCode = 'VV-' + Math.floor(100000 + Math.random() * 900000);

    closeQuickBooking();
    showToast(`Reservation confirmed for ${dest}! Booking Ref: ${refCode}.`, 'success');
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    VV_AUTH.updateNavAuth();
    setupMobileMenu();
    setupNewsletter();
});
