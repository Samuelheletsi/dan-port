// Initialize Typed.js for typing animation
const typed = new Typed('.typing', {
  strings: ["Mobile Developer", "Graphic Designer", "Software Developer"],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1500,
  loop: true,
});

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    // Add active to clicked button
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


// Nav toggle for mobile
const navToggleBtn = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');

navToggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile nav when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Scroll reveal effect
const sections = document.querySelectorAll('.section');

function revealSections() {
  const revealPoint = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < revealPoint) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
// Initial reveal check on load
revealSections();

// Update navigation active state on click and on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href').slice(1));

function updateActiveNav() {
  let index = sectionIds.length;

  while (--index && window.scrollY + 100 < document.getElementById(sectionIds[index]).offsetTop) {}

  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[index]) navLinks[index].classList.add('active');
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Contact form EmailJS integration
emailjs.init('YOUR_EMAILJS_USERID'); // Replace with your EmailJS user ID

const contactForm = document.getElementById('contact-form');
const btnSubmit = contactForm.querySelector('.btn-submit');
const btnText = contactForm.querySelector('.btn-text');
const btnLoading = contactForm.querySelector('.btn-loading');
const formStatus = contactForm.querySelector('.form-status');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Show loading spinner
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-flex';
  formStatus.textContent = '';
  
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this) // Replace with your EmailJS service and template IDs
    .then(() => {
      formStatus.style.color = 'var(--color-accent)';
      formStatus.textContent = 'Message sent successfully!';
      contactForm.reset();
    }, (error) => {
      formStatus.style.color = 'red';
      formStatus.textContent = 'Oops! Something went wrong. Please try again.';
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    });
});
