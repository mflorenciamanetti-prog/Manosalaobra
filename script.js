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



// Formulario de contacto: sin backend propio (GitHub Pages es estático).
// Arma un mailto: con los datos cargados y muestra un mensaje de confirmación.
const form = document.getElementById('form-grid');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.style.display = 'none';

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  if (!nombre || !email || !mensaje) return;

  const token = await grecaptcha.execute('6LcIP3UtAAAAAIR-_p2AGsoyfBFSQZ3qu7d6DEMo', {action: 'contacto'});

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch('https://manosalaobra-backend.onrender.com/api/contacto', {
      method: 'POST',
      body: JSON.stringify({
        nombre: form.nombre.value.trim(),
        telefono: form.telefono.value.trim(),
        email: form.email.value.trim(),
        mensaje: form.mensaje.value.trim(),
        token: token
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'flex';
    } else {
      throw new Error('Formspree error');
    }
  } catch (err) {
    formError.textContent = 'No pudimos enviar tu mensaje. Probá de nuevo o escribinos a manosalaobra.cooperativa.1@gmail.com.';
    formError.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensaje';
  }
});
// Números que cuentan al entrar en pantalla
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => statObserver.observe(el));
// Animaciones al hacer scroll: cada elemento entra con un delay creciente
// respecto a los demás dentro de la misma sección (efecto escalonado natural).
document.querySelectorAll('section').forEach(section => {
  const items = section.querySelectorAll('.reveal-fade, .reveal-card');
  if (!items.length) return;
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
      sectionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  sectionObserver.observe(section);
});
// Parallax liviano del hero
const heroParallax = document.getElementById('hero-parallax');
if (heroParallax) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroParallax.style.transform = `translateY(${offset * 0.35}px)`;
  }, { passive: true });
}
