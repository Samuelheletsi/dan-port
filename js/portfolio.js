// portfolio.js

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item, .portfolio-item1");

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
          item.classList.add("fade-in");
          item.classList.remove("fade-out");
        } else {
          item.classList.add("fade-out");
          setTimeout(() => (item.style.display = "none"), 300); // smooth hide
        }
      });
    });
  });

  // Optional: Simple fade-in animation with CSS
  const style = document.createElement("style");
  style.innerHTML = `
    .fade-in { animation: fadeIn 0.3s forwards; }
    .fade-out { animation: fadeOut 0.3s forwards; }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
  `;
  document.head.appendChild(style);
});
