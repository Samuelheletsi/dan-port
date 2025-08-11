// Select elements
const styleSwitcher = document.querySelector('.style-switcher');
const switcherToggleBtn = document.querySelector('.switcher-toggle');
const colorButtons = document.querySelectorAll('.color-btn');
const modeToggleCheckbox = document.getElementById('mode-toggle');
const body = document.body;

// Initially close the style switcher
styleSwitcher.classList.add('closed');

// Open/close style switcher panel
switcherToggleBtn.addEventListener('click', () => {
  styleSwitcher.classList.toggle('closed');
});

// Apply selected theme color
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    colorButtons.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const selectedColor = btn.getAttribute('data-color');
    applyThemeColor(selectedColor);
  });
});

// Function to apply theme color by setting CSS variable
function applyThemeColor(colorName) {
  // Define colors map
  const colorsMap = {
    'color-1': '#FF6B6B',
    'color-2': '#6BCB77',
    'color-3': '#4D96FF',
    'color-4': '#FFD93D',
    'color-5': '#845EC2'
  };
  const colorValue = colorsMap[colorName] || '#FF6B6B';
  
  // Set CSS variables
  document.documentElement.style.setProperty('--color-primary', colorValue);
  document.documentElement.style.setProperty('--color-accent', colorValue);
  
  // Save to localStorage for persistence
  localStorage.setItem('selectedColor', colorName);
}

// Load saved color from localStorage
const savedColor = localStorage.getItem('selectedColor');
if (savedColor) {
  applyThemeColor(savedColor);
  // Activate the saved color button
  colorButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-color') === savedColor);
  });
} else {
  // Default active color
  colorButtons[0].classList.add('active');
  applyThemeColor('color-1');
}

// Light/dark mode toggle
modeToggleCheckbox.addEventListener('change', () => {
  if (modeToggleCheckbox.checked) {
    body.classList.add('dark');
    localStorage.setItem('mode', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('mode', 'light');
  }
});

// Load saved mode from localStorage
const savedMode = localStorage.getItem('mode');
if (savedMode === 'dark') {
  body.classList.add('dark');
  modeToggleCheckbox.checked = true;
} else {
  body.classList.remove('dark');
  modeToggleCheckbox.checked = false;
}

// Close style switcher on scroll
window.addEventListener('scroll', () => {
  if (!styleSwitcher.classList.contains('closed')) {
    styleSwitcher.classList.add('closed');
  }
});
