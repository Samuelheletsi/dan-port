// js/image-dimensions.js

(function () {
  /**
   * Assign natural width/height to an <img> if missing.
   * @param {HTMLImageElement} img
   */
  function setImageDimensions(img) {
    if (!img || !(img instanceof HTMLImageElement)) return;

    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      if (!img.hasAttribute("width")) {
        img.setAttribute("width", img.naturalWidth);
      }
      if (!img.hasAttribute("height")) {
        img.setAttribute("height", img.naturalHeight);
      }
    } else {
      // In case image is not yet loaded
      img.addEventListener("load", () => {
        if (!img.hasAttribute("width")) {
          img.setAttribute("width", img.naturalWidth);
        }
        if (!img.hasAttribute("height")) {
          img.setAttribute("height", img.naturalHeight);
        }
      }, { once: true });
    }
  }

  /**
   * Process all current images on the page.
   */
  function processAllImages() {
    document.querySelectorAll("img").forEach(setImageDimensions);
  }

  // Run once when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", processAllImages);
  } else {
    processAllImages();
  }

  // Optional: Watch for future <img> being added (e.g. AJAX/lazy content)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === "IMG") {
          setImageDimensions(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll("img").forEach(setImageDimensions);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
