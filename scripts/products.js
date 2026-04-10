// ================================================
// products.js — Renderização dos cards de produto
// ================================================

// ——— ALTERAR QUANTIDADE (Via botões) ———
function changeCardQty(id, delta) {
  // Garante que o valor atual exista, aplica o delta e mantém o mínimo de 1
  cardQtys[id] = Math.max(1, (cardQtys[id] || 1) + delta);
  
  const input = document.getElementById(`card-qty-${id}`);
  if (input) {
    input.value = cardQtys[id];
  }
}

// ——— ATUALIZAR QUANTIDADE (Via digitação) ———
function updateCardQtyManual(id, value) {
  let qty = parseInt(value);
  
  // Se não for um número ou menor que 1, define como 1 (ou deixa vazio enquanto digita)
  if (isNaN(qty) || qty < 1) {
    qty = 1;
  }
  
  cardQtys[id] = qty;
  
  // Sincroniza o valor do input (caso o usuário digite 0 ou letras)
  const input = document.getElementById(`card-qty-${id}`);
  if (input && value !== "") {
    input.value = qty;
  }
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
            <button class="qty-btn" onclick="changeCardQty(${p.id}, -1)">−</button>
            <input 
              type="number" 
              class="qty-input" 
              id="card-qty-${p.id}" 
              value="${cardQtys[p.id] || 1}" 
              oninput="updateCardQtyManual(${p.id}, this.value)"
            />
            <button class="qty-btn" onclick="changeCardQty(${p.id}, 1)">+</button>
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