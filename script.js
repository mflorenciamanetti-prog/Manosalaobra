// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Links de WhatsApp con mensaje precargado
document.querySelectorAll('.wa-link').forEach(link => {
  const msg = link.getAttribute('data-wa-msg') || '';
  link.href = 'https://wa.me/542284387438?text=' + encodeURIComponent(msg);
});

// Menú mobile
const navBurger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobileMenu');

navBurger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navBurger.setAttribute('aria-expanded', 'false');
  });
});

// Mostrar campo "Especificá" solo si eligen "Otro"
const sectorSelect = document.getElementById('sectorSelect');
const otroField = document.getElementById('otroField');
sectorSelect.addEventListener('change', () => {
  otroField.style.display = sectorSelect.value === 'otro' ? 'block' : 'none';
});

// Formulario de contacto: sin backend propio (GitHub Pages es estático).
// Arma un mailto: con los datos cargados y muestra un mensaje de confirmación.
const form = document.getElementById('form-grid');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const telefono = form.telefono.value.trim();
  const sector = form.sector.value;
  const otro = form.otro ? form.otro.value.trim() : '';
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) return;

  const sectorTexto = sector === 'otro' ? `Otro (${otro || 'sin especificar'})` : (sector || 'sin especificar');

  const asunto = encodeURIComponent(`Consulta de ${nombre} desde la web`);
  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre}\nTeléfono: ${telefono || '-'}\nEmail: ${email}\nSector de interés: ${sectorTexto}\n\nMensaje:\n${mensaje}`
  );
  window.location.href = `mailto:manosalaobra.cooperativa.1@gmail.com?subject=${asunto}&body=${cuerpo}`;

  form.style.display = 'none';
  formSuccess.style.display = 'flex';
});
