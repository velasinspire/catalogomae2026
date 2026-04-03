// ================================================
// main.js — Inicialização e carregamento dos JSONs
// ================================================
// Dependências (carregar antes no HTML, nesta ordem):
//   scripts/ui.js
//   scripts/products.js
//   scripts/cart.js
//   scripts/whatsapp.js
//   scripts/main.js

// ——— VARIÁVEIS GLOBAIS ———
let WHATSAPP_NUMBER = '';
let IMAGE_BASE_PATH = '';
let products = [];
const cardQtys = {}; // quantidade selecionada nos cards antes de adicionar ao carrinho

// ——— INICIALIZAR ———
// DOMContentLoaded garante que o DOM e todos os scripts anteriores
// já foram carregados antes de fazer os fetches.
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('data/config.json').then(r => r.json()),
    fetch('data/products.json').then(r => r.json()),
  ])
    .then(([config, data]) => {
      WHATSAPP_NUMBER = config.whatsappNumber;
      IMAGE_BASE_PATH = config.imageBasePath;

      products = data;
      products.forEach(p => { cardQtys[p.id] = 1; });

      renderProducts();
      renderCart();
    })
    .catch((err) => {
      console.error('Erro ao carregar arquivos de configuração:', err);
      document.getElementById('products-grid').innerHTML =
        '<p style="text-align:center;color:var(--text-soft);padding:40px">Erro ao carregar os arquivos. Verifique se config.json e products.json estão na pasta data/.</p>';
    });

});