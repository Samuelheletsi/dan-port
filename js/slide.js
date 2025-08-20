/* ========= Sliders ========= */
document.querySelectorAll(".portfolio-item, .portfolio-item1").forEach((card) => {
  const slider = card.querySelector(".slider");
  const slides = card.querySelector(".slides");
  if (!slider || !slides) return;

  const total = slides.children.length;
  let index = 0;
  let interval;

  function go(i) {
    index = (i + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  function start() {
    stop();
    interval = setInterval(() => go(index + 1), 2500);
  }
  function stop() {
    if (interval) clearInterval(interval);
  }

  // Autoplay
  start();

  // Pause on hover, resume without resetting
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
});

/* ========= Lightbox ========= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let currentImages = [];

document.querySelectorAll(".slides img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const slidesContainer = e.target.closest(".slides");
    currentImages = Array.from(slidesContainer.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(e.target);
    showImage(currentIndex);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function showImage(idx) {
  lightboxImg.src = currentImages[idx].src;
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "Escape") closeLightbox();
});
