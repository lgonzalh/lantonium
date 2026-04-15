document.addEventListener("DOMContentLoaded", () => {
  const selector = ".card, .subcard, .stat, .profile-job-card";
  const interactiveSelector = "a, button, input, textarea, select, option, label, video, iframe, summary, details";
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

    return Boolean(target.closest(interactiveSelector));
  };

  const setMotionPaused = (card, paused) => {
    card.classList.toggle("motion-paused", paused);
  };

  cards.forEach((card) => {
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }

    card.addEventListener("click", (event) => {
      if (isInteractiveTarget(event.target)) return;
      setSelection(card);
    });

    card.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key !== "Enter" && key !== " ") return;
      event.preventDefault();
      setSelection(card);
    });

    card.addEventListener("pointerover", (event) => {
      if (!isInteractiveTarget(event.target)) return;
      setMotionPaused(card, true);
    });

    card.addEventListener("pointerout", (event) => {
      if (!isInteractiveTarget(event.target)) return;
      const next = event.relatedTarget;
      if (next instanceof Element && card.contains(next) && next.closest(interactiveSelector)) {
        // Sigue dentro de una zona interactiva de la misma card: no liberar pausa.
        return;
      }
      setMotionPaused(card, false);
    });

    card.addEventListener("focusin", (event) => {
      if (!isInteractiveTarget(event.target)) return;
      setMotionPaused(card, true);
    });

    card.addEventListener("focusout", (event) => {
      const next = event.relatedTarget;
      if (next instanceof Element && card.contains(next) && next.closest(interactiveSelector)) {
        return;
      }
      setMotionPaused(card, false);
    });

    card.addEventListener(
      "touchstart",
      (event) => {
        if (!isInteractiveTarget(event.target)) return;
        setMotionPaused(card, true);
      },
      { passive: true }
    );

    const releaseTouchPause = () => {
      // Pequeño delay para evitar flicker al convertir touch en click.
      setTimeout(() => setMotionPaused(card, false), 140);
    };

    card.addEventListener("touchend", releaseTouchPause, { passive: true });
    card.addEventListener("touchcancel", releaseTouchPause, { passive: true });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(selector)) return;
    clearSelection();
  });
});
