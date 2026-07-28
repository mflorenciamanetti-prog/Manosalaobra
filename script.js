// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú mobile
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Cerrar el menú al elegir una sección (mobile)
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Formulario de contacto: sin backend propio.
// Arma un mailto: con los datos cargados y lo abre en el cliente de correo.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    formNote.textContent = 'Completá todos los campos.';
    formNote.style.color = '#B23A3A';
    return;
  }

  const asunto = encodeURIComponent(`Consulta de ${nombre} desde la web`);
  const cuerpo = encodeURIComponent(`${mensaje}\n\nResponder a: ${email}`);
  window.location.href = `mailto:manosalaobra.cooperativa.1@gmail.com?subject=${asunto}&body=${cuerpo}`;

  formNote.textContent = 'Se abrió tu cliente de correo con el mensaje listo para enviar.';
  formNote.style.color = '';
});
