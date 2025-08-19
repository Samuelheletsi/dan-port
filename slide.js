document.querySelectorAll(".portfolio-item").forEach((card) => {
    const slider = card.querySelector(".slider");
    const slides = card.querySelector(".slides");
    const totalSlides = slides.children.length;
    let index = 0;
    let interval;

    function startSlider() {
      interval = setInterval(() => {
        index = (index + 1) % totalSlides;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }, 2500);
    }

    function stopSlider() {
      clearInterval(interval);
    }

    // Start autoplay
    startSlider();

    // Pause autoplay on hover
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", () => {
      slides.style.flexWrap = "nowrap";
      index = 0;
      slides.style.transform = `translateX(0%)`;
      startSlider();
    });
  });

  // Lightbox logic
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
    });
  });

  function showImage(index) {
    lightboxImg.src = currentImages[index].src;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Optional: support keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") lightboxClose.click();
  });
 