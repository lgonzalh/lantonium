(function () {
  "use strict";

  var WHATSAPP_BASE_URL = "https://wa.me/573246864991";
  var DEMO_MESSAGE = "Hola Lantonium, quiero solicitar una demo de procesamiento.";
  var DEMO_URL = WHATSAPP_BASE_URL + "?text=" + encodeURIComponent(DEMO_MESSAGE);

  window.openLantoniumWhatsApp = function (message) {
    var url = message ? WHATSAPP_BASE_URL + "?text=" + encodeURIComponent(message) : WHATSAPP_BASE_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("year");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    var primaryCta = document.querySelector(".landing-cta[data-whatsapp-link]");
    if (primaryCta) {
      primaryCta.setAttribute("href", DEMO_URL);
    }

    var revealItems = document.querySelectorAll(".reveal-item");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
    }
  });
})();
