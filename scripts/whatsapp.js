// ================================================
// whatsapp.js — Geração da mensagem e abertura do link
// ================================================

// WHATSAPP_NUMBER é definido em main.js após o fetch do config.json

function openWhatsApp(event) {
  event.preventDefault();

  const entries = Object.values(cart);

  // Sem itens no carrinho: abre conversa simples
  if (entries.length === 0) {
    const text = 'Olá! Gostaria de saber mais sobre a coleção Amor que floresce – Mães 2026 da Inspire';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    return;
  }

  // Com itens: monta mensagem de pedido
  const lines = ['Olá! Gostaria de fazer um pedido da coleção *Amor que floresce – Mães 2026*\n'];
  let grandTotal = 0;

  entries.forEach(({ product, quantity }) => {
    const { price, isWholesale } = getAppliedPrice(product, quantity);
    const subtotal = price * quantity;
    grandTotal += subtotal;

    const priceTag = isWholesale ? ' _(preço atacado aplicado)_' : '';
    lines.push(`• *${product.name}* (x${quantity}) — ${formatCurrency(subtotal)}${priceTag}`);
  });

  lines.push(`\n*Total estimado: ${formatCurrency(grandTotal)}*`);
  lines.push('\nPode me ajudar com mais informações e prazo de entrega?');

  const message = lines.join('\n');
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}
