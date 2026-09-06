const products = [
    { id: 1, name: "Noise-Cancelling Headphones", price: 299.99, desc: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.", icon: "🎧" },
    { id: 2, name: "Smart Fitness Watch", price: 199.50, desc: "Track your health metrics, workouts, and stay connected with notifications on your wrist.", icon: "⌚" },
    { id: 3, name: "Mechanical Keyboard Pro", price: 149.00, desc: "Customizable RGB backlit mechanical keyboard with tactile switches for ultimate typing.", icon: "⌨️" },
    { id: 4, name: "Ergonomic Gaming Mouse", price: 79.99, desc: "Ultra-lightweight mouse with high precision sensor and 6 programmable buttons.", icon: "🖱️" },
    { id: 5, name: "Ultra-Wide 4K Monitor", price: 499.00, desc: "Immersive 34-inch curved display for professional color grading and gaming.", icon: "🖥️" },
    { id: 6, name: "Premium Laptop Stand", price: 45.99, desc: "Adjustable aerospace-grade aluminum stand to improve your posture while working.", icon: "💻" }
];

let cart = [];

const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const navProductsBtn = document.getElementById('nav-products');
const navCartBtn = document.getElementById('nav-cart');
const productsView = document.getElementById('products-view');
const cartView = document.getElementById('cart-view');
const cartContentEl = document.getElementById('cart-content');
const emptyCartMsgEl = document.getElementById('empty-cart-message');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');

function init() {
    renderProducts();
    setupNavigation();
}

function renderProducts() {
    productListEl.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">${product.icon}</div>
            <div class="product-title">${product.name}</div>
            <div class="product-desc">${product.desc}</div>
            <div class="product-footer">
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="primary-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productListEl.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    animateCartIcon();
    showToast(`${product.name} added to cart!`);
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCart();
}

function updateCart() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // Render Cart Items
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        cartContentEl.classList.add('hidden');
        emptyCartMsgEl.classList.remove('hidden');
    } else {
        cartContentEl.classList.remove('hidden');
        emptyCartMsgEl.classList.add('hidden');
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">${item.icon}</div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsEl.appendChild(cartItem);
        });
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;

    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// Navigation Logic
function setupNavigation() {
    navProductsBtn.addEventListener('click', () => switchView('products'));
    navCartBtn.addEventListener('click', () => switchView('cart'));
    continueShoppingBtn.addEventListener('click', () => switchView('products'));
    
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(cart.length > 0) {
            showToast('Processing checkout...');
            setTimeout(() => {
                cart = [];
                updateCart();
                showToast('Order placed successfully! 🎉');
                switchView('products');
            }, 1500);
        }
    });
}

function switchView(viewName) {
    if (viewName === 'products') {
        productsView.classList.add('active-view');
        cartView.classList.remove('active-view');
        navProductsBtn.classList.add('active');
        navCartBtn.classList.remove('active');
    } else if (viewName === 'cart') {
        cartView.classList.add('active-view');
        productsView.classList.remove('active-view');
        navCartBtn.classList.add('active');
        navProductsBtn.classList.remove('active');
        updateCart();
    }
}

function animateCartIcon() {
    cartCountEl.classList.add('bump');
    setTimeout(() => {
        cartCountEl.classList.remove('bump');
    }, 200);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    toast.style.color = 'white';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderRadius = '0.75rem';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
    toast.style.zIndex = '1000';
    toast.style.fontWeight = '500';
    toast.style.animation = 'toastSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    toast.textContent = message;
    
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `
            @keyframes toastSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.4s ease-out';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}
init();