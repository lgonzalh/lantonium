document.addEventListener("DOMContentLoaded", () => {
  const selector = ".card, .subcard, .stat, .profile-job-card";
  const cards = Array.from(document.querySelectorAll(selector));

  if (!cards.length) return;

  let selectedCard = null;

  const clearSelection = () => {
    if (!selectedCard) return;
    selectedCard.classList.remove("is-selected");
    selectedCard.removeAttribute("aria-pressed");
    selectedCard = null;
  };

  const setSelection = (card) => {
    if (selectedCard === card) {
      clearSelection();
      return;
    }

    if (selectedCard) {
      selectedCard.classList.remove("is-selected");
      selectedCard.removeAttribute("aria-pressed");
    }

    selectedCard = card;
    selectedCard.classList.add("is-selected");
    selectedCard.setAttribute("aria-pressed", "true");
  };

  const isInteractiveTarget = (target) => {
    if (!(target instanceof Element)) return false;

    return Boolean(
      target.closest("a, button, input, textarea, select, option, label, video, iframe, summary, details")
    );
  };

  cards.forEach((card) => {
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }

    card.addEventListener("click", (event) => {
      if (isInteractiveTarget(event.target)) return;
      setSelection(card);
    });

    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hover-selected");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hover-selected");
    });

    card.addEventListener(
      "touchstart",
      () => {
        card.classList.add("is-hover-selected");
      },
      { passive: true }
    );

    const clearTouchHover = () => {
      card.classList.remove("is-hover-selected");
    };

    card.addEventListener("touchend", clearTouchHover, { passive: true });
    card.addEventListener("touchcancel", clearTouchHover, { passive: true });

    card.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key !== "Enter" && key !== " ") return;
      event.preventDefault();
      setSelection(card);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(selector)) return;
    clearSelection();
  });
});
