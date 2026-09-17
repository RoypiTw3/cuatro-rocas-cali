/**
 * 4 Rocas Restaurante Bar - Interactive Logic & WhatsApp Engine
 * Parque del Perro, Cali
 */

// Global state
const WA_PHONE = '573165141804'; // Official 4 Rocas WhatsApp

// DOM Elements
const resDateInput = document.getElementById('resDate');
const resTimeInput = document.getElementById('resTime');
const resGuestsInput = document.getElementById('resGuests');
const resZoneInput = document.getElementById('resZone');
const resSummaryTitle = document.getElementById('resSummaryTitle');
const resSummaryText = document.getElementById('resSummaryText');
const btnWhatsappReserve = document.getElementById('btnWhatsappReserve');
const menuTabs = document.querySelectorAll('.menu-tab-btn');
const dishCards = document.querySelectorAll('.dish-card');

// Initialize Dates & Form defaults
function initReservationEngine() {
  if (!resDateInput) return;

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  resDateInput.value = todayStr;
  resDateInput.min = todayStr;

  updateReservationDetails();
}

// Update WhatsApp Reservation URL (100% clean characters, zero corrupted symbols)
function updateReservationDetails() {
  if (!resDateInput || !resTimeInput || !resGuestsInput || !resZoneInput) return;

  const dateVal = resDateInput.value;
  const timeVal = resTimeInput.value;
  const guestsVal = resGuestsInput.value;
  const zoneVal = resZoneInput.value;

  // Clean strings without special characters or accents
  const cleanZone = zoneVal
    .replace(/[áàä]/gi, 'a')
    .replace(/[éèë]/gi, 'e')
    .replace(/[íìï]/gi, 'i')
    .replace(/[óòö]/gi, 'o')
    .replace(/[úùü]/gi, 'u');

  // Update UI summary
  if (resSummaryTitle) {
    resSummaryTitle.innerText = `${guestsVal} | ${timeVal} hrs`;
  }
  if (resSummaryText) {
    resSummaryText.innerText = `Fecha: ${dateVal} • ${zoneVal}`;
  }

  // Pure ASCII message for WhatsApp
  const msgLines = [
    'Hola 4 Rocas Restaurante Bar, cordial saludo.',
    'Quisiera reservar una mesa en el Parque del Perro:',
    '',
    `Fecha: ${dateVal}`,
    `Hora: ${timeVal}`,
    `Comensales: ${guestsVal}`,
    `Zona o Motivo: ${cleanZone}`,
    '',
    'Tienen disponibilidad para esta fecha? Muchas gracias.'
  ];

  const fullMsg = msgLines.join('\n');
  btnWhatsappReserve.href = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(fullMsg)}`;
}

// Category Filter Tabs
function initMenuFilter() {
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      dishCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// Quick Dish Order to WhatsApp
function orderDish(dishName, priceStr) {
  const cleanDish = dishName
    .replace(/[áàä]/gi, 'a')
    .replace(/[éèë]/gi, 'e')
    .replace(/[íìï]/gi, 'i')
    .replace(/[óòö]/gi, 'o')
    .replace(/[úùü]/gi, 'u');

  const msgLines = [
    'Hola 4 Rocas Restaurante Bar, cordial saludo.',
    'Me gustaria ordenar este plato de su carta para domicilio:',
    '',
    `Plato: ${cleanDish}`,
    `Tarifa de la carta: ${priceStr}`,
    '',
    'Cual es el tiempo estimado de entrega y costo de domicilio? Muchas gracias.'
  ];

  const fullMsg = msgLines.join('\n');
  const targetUrl = `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(fullMsg)}`;
  window.open(targetUrl, '_blank');
}

// Smooth scroll to reservation
function scrollToReservation() {
  const target = document.getElementById('reservas');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const card = target.querySelector('.reservation-card');
    if (card) {
      card.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
      card.style.borderColor = 'var(--amber-gold)';
      card.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.4)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 2000);
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initReservationEngine();
  initMenuFilter();

  if (resDateInput) resDateInput.addEventListener('change', updateReservationDetails);
  if (resTimeInput) resTimeInput.addEventListener('change', updateReservationDetails);
  if (resGuestsInput) resGuestsInput.addEventListener('change', updateReservationDetails);
  if (resZoneInput) resZoneInput.addEventListener('change', updateReservationDetails);
});
