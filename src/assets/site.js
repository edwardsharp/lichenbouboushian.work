---
permalink: /assets/site.js
---
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const controls = gallery.querySelector(".gallery-controls");
  const previous = gallery.querySelector("[data-gallery-previous]");
  const next = gallery.querySelector("[data-gallery-next]");
  const counter = gallery.querySelector("[data-gallery-current]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  if (slides.length < 2) return;

  const currentIndex = () => {
    const trackLeft = track.getBoundingClientRect().left;
    return slides.reduce((closest, slide, index) =>
      Math.abs(slide.getBoundingClientRect().left - trackLeft) <
      Math.abs(slides[closest].getBoundingClientRect().left - trackLeft)
        ? index : closest, 0);
  };

  const update = () => {
    const index = currentIndex();
    counter.textContent = String(index + 1);
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  };

  const goTo = (index) => {
    const target = Math.max(0, Math.min(index, slides.length - 1));
    const offset = slides[target].getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({
      left: track.scrollLeft + offset,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  };

  previous.addEventListener("click", () => goTo(currentIndex() - 1));
  next.addEventListener("click", () => goTo(currentIndex() + 1));
  track.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") goTo(0);
    else if (event.key === "End") goTo(slides.length - 1);
    else goTo(currentIndex() + (event.key === "ArrowRight" ? 1 : -1));
  });

  let scheduled = false;
  track.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      update();
      scheduled = false;
    });
  }, { passive: true });

  new ResizeObserver(update).observe(track);
  controls.hidden = false;
  update();
});

document.querySelectorAll(".project-media").forEach((media) => {
  const update = () => {
    media.style.setProperty("--media-height", `${media.getBoundingClientRect().height}px`);
    media.classList.add("is-measured");
  };
  const observer = new ResizeObserver(update);
  observer.observe(media);
  update();
});
