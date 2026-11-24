/**
 * CONFIGURACIÓN RÁPIDA DE KOVA DIGITAL
 * Cambiá el número de WhatsApp por el tuyo (formato internacional sin + ni espacios, ej: 5491122334455)
 */
const KOVA_CONFIG = {
  whatsappNumber: '5491157411630',
  brandName: 'Kova Digital',
};

// 1. Conectar todos los botones de WhatsApp dinámicamente
document.querySelectorAll('[data-wa-link]').forEach((el) => {
  const message = el.getAttribute('data-wa-link') || `Hola ${KOVA_CONFIG.brandName}!`;
  const url = `https://wa.me/${KOVA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  el.setAttribute('href', url);
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener noreferrer');
});

// 2. Menú móvil
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 3. Calculadora interactiva de comisiones
const ordersInput = document.getElementById('ordersPerDay');
const ticketInput = document.getElementById('avgTicket');
const commissionInput = document.getElementById('commissionRate');

const ordersValue = document.getElementById('ordersValue');
const ticketValue = document.getElementById('ticketValue');
const commissionValue = document.getElementById('commissionValue');
const monthlyLossEl = document.getElementById('monthlyLoss');
const yearlyLossEl = document.getElementById('yearlyLoss');
const monthlySavedEl = document.getElementById('monthlySaved');

function formatUSD(amount) {
  return 'USD ' + Math.round(amount).toLocaleString('es-AR');
}

function updateCalculator() {
  if (!ordersInput || !ticketInput || !commissionInput) return;
  const orders = Number(ordersInput.value);
  const ticket = Number(ticketInput.value);
  const rate = Number(commissionInput.value) / 100;

  const monthlyRevenue = orders * ticket * 30;
  const monthlyLoss = monthlyRevenue * rate;
  const yearlyLoss = monthlyLoss * 12;
  const monthlySaved = monthlyLoss * 0.3;

  ordersValue.textContent = `${orders} pedidos/día`;
  ticketValue.textContent = `USD ${ticket}`;
  commissionValue.textContent = `${Math.round(rate * 100)}%`;

  monthlyLossEl.textContent = formatUSD(monthlyLoss);
  yearlyLossEl.textContent = `${formatUSD(yearlyLoss)} al año`;
  monthlySavedEl.textContent = `${formatUSD(monthlySaved)} cada mes`;
}

[ordersInput, ticketInput, commissionInput].forEach((input) => {
  if (input) input.addEventListener('input', updateCalculator);
});
updateCalculator();

// 4. Selector de moneda (Argentina ARS / Internacional USD)
const toggleButtons = document.querySelectorAll('.toggle-btn');
const priceElements = document.querySelectorAll('.price-main');

toggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currency = btn.getAttribute('data-currency');
    toggleButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    priceElements.forEach((el) => {
      const value = currency === 'USD' ? el.getAttribute('data-usd') : el.getAttribute('data-ars');
      if (value) el.textContent = value;
    });
  });
});

// 5. Año dinámico en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
