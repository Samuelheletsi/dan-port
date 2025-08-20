/* ========= Page UX ========= */
document.addEventListener('DOMContentLoaded', () => {
  // NProgress setup
  if (window.NProgress) {
    NProgress.configure({ showSpinner: false, trickleSpeed: 100 });
    NProgress.start();
    window.addEventListener('load', () => NProgress.done());
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', `#${id}`);
      }
    });
  });
});

/* ========= Portfolio Filters ========= */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-item1');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.getAttribute('data-category') === filter;
      item.style.display = match ? 'block' : 'none';
    });
  });
});

/* ========= Mobile Nav ========= */
const navToggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');

if (navToggleBtn) {
  navToggleBtn.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggleBtn.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ========= Scroll reveal ========= */
const sections = document.querySelectorAll('.section');
function revealSections() {
  const revealPoint = window.innerHeight * 0.88;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < revealPoint) section.classList.add('visible');
  });
}
window.addEventListener('scroll', revealSections);
revealSections();

/* ========= Active nav on scroll ========= */
const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = Array.from(navLinks).map(l => l.getAttribute('href').slice(1)).filter(Boolean);
function updateActiveNav() {
  let index = sectionIds.length;
  while (--index && window.scrollY + 100 < document.getElementById(sectionIds[index]).offsetTop) {}
  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[index]) navLinks[index].classList.add('active');
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

/* ========= EmailJS Contact =========
   1) Create a service + template in EmailJS dashboard
   2) Replace the placeholders below
*/
(function initEmailJS(){
  if (!window.emailjs) return;
  emailjs.init('YOUR_PUBLIC_KEY'); // <-- replace with EmailJS Public Key
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const btnText = contactForm.querySelector('.btn-text');
  const btnLoading = contactForm.querySelector('.btn-loading');
  const formStatus = contactForm.querySelector('.form-status');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    formStatus.textContent = '';

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this) // <-- replace IDs
      .then(() => {
        formStatus.style.color = 'var(--color-accent)';
        formStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
      })
      .finally(() => {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      });
  });
}
