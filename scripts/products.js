// ================================================
// products.js — Renderização dos cards de produto
// ================================================

// products e IMAGE_BASE_PATH são definidos em main.js após o fetch

// ——— QUANTIDADE SELECIONADA NO CARD (antes de adicionar) ———
// cardQtys é declarado em main.js como variável global

function changeCardQty(id, delta) {
  cardQtys[id] = Math.max(1, (cardQtys[id] || 1) + delta);
  const el = document.getElementById(`card-qty-${id}`);
  if (el) el.textContent = cardQtys[id];
}

// ——— RENDERIZAR GRID DE PRODUTOS ———
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.id = `product-card-${p.id}`;

    const imgSrc = IMAGE_BASE_PATH + p.image;

    card.innerHTML = `
      <div class="card-image-wrap" onclick="openImgModal('${imgSrc}', '${p.name}')">
        <img src="${imgSrc}" alt="${p.name}" loading="lazy" />
        <span class="card-zoom-hint">🔍 Ampliar</span>
        ${p.tag ? `<span class="card-badge-kit">${p.tag}</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-detail">${p.detail}</p>
        <div class="card-prices">
          <span class="price-retail">${formatCurrency(p.priceRetail)}</span>
          <div class="price-wholesale-wrap">
            <span class="price-wholesale-label">10+ un.</span>
            <span class="price-wholesale">${formatCurrency(p.priceWholesale)}</span>
          </div>
        </div>
        <div class="card-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeCardQty(${p.id}, -1)" aria-label="Diminuir">−</button>
            <span class="qty-value" id="card-qty-${p.id}">1</span>
            <button class="qty-btn" onclick="changeCardQty(${p.id}, 1)" aria-label="Aumentar">+</button>
          </div>
          <button class="btn-add" id="btn-add-${p.id}" onclick="addToCart(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}