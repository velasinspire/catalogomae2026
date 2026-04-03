// ================================================
// ui.js — Modal de imagem, toast, badge e utilitários visuais
// ================================================

// ——— FORMATADOR DE MOEDA ———
function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ——— MODAL DE IMAGEM ———
function openImgModal(src, alt) {
  const modal = document.getElementById('img-modal');
  document.getElementById('img-modal-src').src = src;
  document.getElementById('img-modal-src').alt = alt;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeImgModal() {
  document.getElementById('img-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ——— TOAST ———
let toastTimeout;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ——— BADGE DO CARRINHO ———
function animateBadge() {
  const badge = document.getElementById('fab-badge');
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);
}

// ——— ATALHOS DE TECLADO ———
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeImgModal();
    closeCart();
  }
});
