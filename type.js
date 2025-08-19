// Typed.js headline
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.typing');
  if (!el || !window.Typed) return;

  new Typed('.typing', {
    strings: [
      'Software Developer',
      'UI/UX Designer',
      'Brand & Graphic Designer',
      'Photographer & Videographer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1400,
    loop: true,
    smartBackspace: true
  });
});
