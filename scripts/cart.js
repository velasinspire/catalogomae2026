// ================================================
// cart.js — Estado e lógica do carrinho
// ================================================

// cart = { [productId]: { product, quantity } }
const cart = {};

// ——— VERIFICAR PREÇO APLICADO ———
function getAppliedPrice(product, qty) {
  if (qty >= product.wholesaleMin) return { price: product.priceWholesale, isWholesale: true };
  return { price: product.priceRetail, isWholesale: false };
}

// ——— ADICIONAR AO CARRINHO ———
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const qty = cardQtys[productId] || 1;

  if (cart[productId]) {
    cart[productId].quantity += qty;
  } else {
    cart[productId] = { product, quantity: qty };
  }

  showToast(`"${product.name}" adicionado ao pedido!`);
  animateBadge();
  renderCart();

  // Feedback visual no botão
  const btn = document.getElementById(`btn-add-${productId}`);
  if (btn) {
    btn.textContent = '✓ Adicionado';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Adicionar`;
      btn.classList.remove('added');
    }, 1500);
  }
}

// ——— ALTERAR QUANTIDADE NO CARRINHO ———
function changeCartQty(productId, delta) {
  if (!cart[productId]) return;
  cart[productId].quantity = Math.max(1, cart[productId].quantity + delta);
  renderCart();
}

// ——— REMOVER DO CARRINHO ———
function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

// ——— RENDERIZAR CARRINHO ———
function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const badge = document.getElementById('fab-badge');

  const entries = Object.values(cart);

  const totalItems = entries.reduce((sum, e) => sum + e.quantity, 0);
  badge.textContent = totalItems;

  if (entries.length === 0) {
    container.innerHTML = '<p class="cart-empty">Nenhum produto adicionado ainda.</p>';
    totalEl.textContent = 'R$ 0,00';
    return;
  }

  container.innerHTML = '';
  let grandTotal = 0;

  entries.forEach(({ product, quantity }) => {
    const { price, isWholesale } = getAppliedPrice(product, quantity);
    const subtotal = price * quantity;
    grandTotal += subtotal;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.id = `cart-item-${product.id}`;

    item.innerHTML = `
      <div class="cart-item-header">
        <span class="cart-item-name">${product.name}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${product.id})" aria-label="Remover">✕</button>
      </div>
      ${isWholesale
        ? `<span class="badge-wholesale">🌿 Atacado aplicado · ${formatCurrency(price)}/un</span>`
        : `<span style="font-size:12px;color:var(--text-soft)">${formatCurrency(price)}/un</span>`
      }
      <div class="cart-item-footer">
        <div class="cart-item-qty-ctrl">
          <button class="cart-item-qty-btn" onclick="changeCartQty(${product.id}, -1)" aria-label="Diminuir">−</button>
          <span class="cart-item-qty-val">${quantity}</span>
          <button class="cart-item-qty-btn" onclick="changeCartQty(${product.id}, 1)" aria-label="Aumentar">+</button>
        </div>
        <span class="cart-item-price">${formatCurrency(subtotal)}</span>
      </div>
    `;
    container.appendChild(item);
  });

  totalEl.textContent = formatCurrency(grandTotal);
}

// ——— ABRIR / FECHAR CARRINHO ———
function openCart() {
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
  document.body.style.overflow = '';
}

// Listener registrado aqui pois closeCart está definido neste arquivo
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cart-close').addEventListener('click', closeCart);
});