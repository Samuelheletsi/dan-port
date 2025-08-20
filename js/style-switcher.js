// Elements
const styleSwitcher = document.querySelector('.style-switcher');
const switcherToggleBtn = document.querySelector('.switcher-toggle');
const colorButtons = document.querySelectorAll('.color-btn');
const modeToggleCheckbox = document.getElementById('mode-toggle');

// Ensure closed by default
styleSwitcher.classList.add('closed');

// Open/close panel
switcherToggleBtn.addEventListener('click', () => {
  styleSwitcher.classList.toggle('closed');
});

// Outside click closes
document.addEventListener('click', (e) => {
  if (!styleSwitcher.contains(e.target) && !switcherToggleBtn.contains(e.target)) {
    styleSwitcher.classList.add('closed');
  }
});

// Escape closes
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') styleSwitcher.classList.add('closed');
});

// Map of theme colors
const colorsMap = {
  'color-1': '#FF6B6B',
  'color-2': '#6BCB77',
  'color-3': '#4D96FF',
  'color-4': '#FFD93D',
  'color-5': '#845EC2'
};

function applyThemeColor(colorName) {
  const colorValue = colorsMap[colorName] || colorsMap['color-3'];
  document.documentElement.style.setProperty('--color-primary', colorValue);
  document.documentElement.style.setProperty('--color-accent', colorValue);
  localStorage.setItem('selectedColor', colorName);
}

// Handle color selection
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) return;
    colorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyThemeColor(btn.getAttribute('data-color'));
  });
});

// mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  nav.classList.toggle('active');
});





// Load saved color
const savedColor = localStorage.getItem('selectedColor') || 'color-3';
applyThemeColor(savedColor);
colorButtons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-color') === savedColor));

// Mode toggle (html[data-theme])
function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('mode', mode);
  modeToggleCheckbox.checked = (mode === 'dark');
}

// Init saved mode
const savedMode = localStorage.getItem('mode') || 'light';
setTheme(savedMode);

// Toggle on change
modeToggleCheckbox.addEventListener('change', () => {
  setTheme(modeToggleCheckbox.checked ? 'dark' : 'light');
});

// Close on scroll for UX
window.addEventListener('scroll', () => {
  styleSwitcher.classList.add('closed');
});
