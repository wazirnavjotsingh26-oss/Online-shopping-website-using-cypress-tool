const products = {
  '1': { name: 'Nike Running Shoes', price: 2999, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  '2': { name: 'Casual T-Shirt', price: 799, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  '3': { name: 'Smart Watch', price: 1999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  '4': { name: 'Laptop Backpack', price: 1299, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  '5': { name: 'Wireless Headphones', price: 2499, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  '6': { name: 'Denim Jacket', price: 1799, category: 'Clothing', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80' },
  '7': { name: 'Sports Shoes', price: 2199, category: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80' },
  '8': { name: 'Sunglasses', price: 699, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' }
};

const CART_KEY = 'shopeasy-cart';

function getCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(savedCart)) return [];
    return savedCart
      .filter((item) => products[item.id] && Number.isInteger(item.quantity) && item.quantity > 0)
      .map((item) => ({ id: item.id, quantity: item.quantity }));
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach((counter) => {
    counter.textContent = String(count);
    counter.setAttribute('aria-label', `${count} items in cart`);
  });
}

function showShopMessage(message) {
  const status = document.querySelector('#shop-message');
  if (status) status.textContent = message;
}

function addToCart(productId) {
  if (!products[productId]) return;
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
  showShopMessage(`${products[productId].name} added to your cart.`);
}

function initializeProductSearch() {
  const searchInput = document.querySelector('#product-search');
  if (!searchInput) return;

  const productCards = [...document.querySelectorAll('#product-list .product-card')];
  const emptyMessage = document.querySelector('#search-empty');
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  searchInput.value = initialQuery;

  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;
    productCards.forEach((card) => {
      const matches = `${card.dataset.name} ${card.dataset.category}`.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
  }

  searchInput.addEventListener('input', filterProducts);
  filterProducts();
}

function initializeProductDetails() {
  const dialog = document.querySelector('#product-dialog');
  if (!dialog) return;

  document.querySelectorAll('.view-details').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products[button.dataset.productId];
      if (!product) return;
      document.querySelector('#dialog-product-image').src = product.image;
      document.querySelector('#dialog-product-image').alt = product.name;
      document.querySelector('#dialog-product-category').textContent = product.category;
      document.querySelector('#dialog-product-name').textContent = product.name;
      document.querySelector('#dialog-product-price').textContent = formatPrice(product.price);
      document.querySelector('#dialog-add-to-cart').dataset.productId = button.dataset.productId;
      dialog.showModal();
    });
  });

  document.querySelector('#close-product-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector('#dialog-add-to-cart').addEventListener('click', () => dialog.close());
}

function renderCart() {
  const cartItems = document.querySelector('#cart-items');
  if (!cartItems) return;

  const cart = getCart();
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><h2>Your cart is waiting for something good.</h2><p>Browse the collection and add a favourite.</p><a class="button button-dark" href="products.html">Explore Products</a></div>';
  } else {
    cartItems.innerHTML = cart.map((item) => {
      const product = products[item.id];
      return `<article class="cart-item" data-cart-product="${item.id}">
        <img class="cart-item-image" src="${product.image}" alt="${product.name}">
        <div class="cart-item-info"><p class="product-category">${product.category}</p><h2>${product.name}</h2><p class="cart-item-price">${formatPrice(product.price)} each</p></div>
        <div class="quantity-control" aria-label="Quantity for ${product.name}">
          <button class="decrease-quantity" type="button" data-product-id="${item.id}" aria-label="Decrease quantity of ${product.name}">−</button><span class="quantity-value" aria-label="Quantity">${item.quantity}</span><button class="increase-quantity" type="button" data-product-id="${item.id}" aria-label="Increase quantity of ${product.name}">+</button>
        </div>
        <div class="cart-item-end"><span class="cart-line-total">${formatPrice(product.price * item.quantity)}</span><button class="remove-item" type="button" data-product-id="${item.id}">Remove</button></div>
      </article>`;
    }).join('');
  }

  const total = cart.reduce((amount, item) => amount + products[item.id].price * item.quantity, 0);
  const subtotal = document.querySelector('#cart-subtotal');
  const totalElement = document.querySelector('#cart-total');
  if (subtotal) subtotal.textContent = formatPrice(total);
  if (totalElement) totalElement.textContent = formatPrice(total);
}

function updateCartItem(productId, action) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity -= 1;
  if (action === 'remove') item.quantity = 0;
  const updatedCart = cart.filter((entry) => entry.quantity > 0);
  saveCart(updatedCart);
  renderCart();
}

function initializeLogin() {
  const form = document.querySelector('#login-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const message = document.querySelector('#login-message');
    const isValid = email === 'test@gmail.com' && password === '123456';
    message.textContent = isValid ? 'Login successful' : 'Invalid email or password';
    message.classList.toggle('success', isValid);
  });
}

function initializeCheckout() {
  const form = document.querySelector('#checkout-form');
  if (!form) return;

  const total = getCart().reduce((amount, item) => amount + products[item.id].price * item.quantity, 0);
  document.querySelector('#checkout-total').textContent = formatPrice(total);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('#checkout-message');
    message.classList.remove('success');

    if (getCart().length === 0) {
      message.textContent = 'Your cart is empty. Add a product before placing an order.';
      return;
    }
    if (!form.checkValidity()) {
      message.textContent = 'Please complete all required fields.';
      form.reportValidity();
      return;
    }
    if (!/^\d{10}$/.test(document.querySelector('#phone').value.trim())) {
      message.textContent = 'Please enter a valid 10-digit phone number.';
      document.querySelector('#phone').focus();
      return;
    }
    if (!/^\d{6}$/.test(document.querySelector('#pin-code').value.trim())) {
      message.textContent = 'Please enter a valid 6-digit PIN code.';
      document.querySelector('#pin-code').focus();
      return;
    }

    const orderId = `SE${Date.now().toString().slice(-8)}`;
    document.querySelector('#order-id').textContent = orderId;
    document.querySelector('#order-success').hidden = false;
    message.textContent = '';
    saveCart([]);
    document.querySelector('#checkout-total').textContent = formatPrice(0);
    document.querySelector('#place-order-btn').disabled = true;
    document.querySelector('#place-order-btn').textContent = 'Order Placed';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initializeProductSearch();
  initializeProductDetails();
  initializeLogin();
  initializeCheckout();
  renderCart();

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-to-cart');
    if (addButton) {
      addToCart(addButton.dataset.productId);
      return;
    }

    const quantityButton = event.target.closest('.increase-quantity, .decrease-quantity, .remove-item');
    if (quantityButton) {
      if (quantityButton.classList.contains('remove-item')) updateCartItem(quantityButton.dataset.productId, 'remove');
      else updateCartItem(quantityButton.dataset.productId, quantityButton.classList.contains('increase-quantity') ? 'increase' : 'decrease');
    }
  });
});