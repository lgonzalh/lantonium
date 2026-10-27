(function () {
  "use strict";

  const cards = Array.from(document.querySelectorAll("[data-project-card]"));
  const filters = Array.from(document.querySelectorAll("[data-project-filter]"));
  const search = document.getElementById("project-search");
  const count = document.getElementById("project-count");
  const emptyState = document.querySelector("[data-project-empty]");
  if (!cards.length || !filters.length || !search) return;

  let activeFilter = "all";
  const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const matchesFilter = (card, filter) => {
    if (filter === "all") return true;
    return (card.dataset.categories || "").split(/\s+/).includes(filter);
  };

  const updateCounts = () => {
    const visibleCounts = Object.fromEntries(filters.map((button) => [button.dataset.projectFilter, 0]));
    for (const card of cards) {
      const terms = normalize(`${card.dataset.name || ""} ${card.dataset.description || ""} ${card.textContent}`);
      const query = normalize(search.value);
      const searchMatch = !query || terms.includes(query);
      const filterMatch = matchesFilter(card, activeFilter);
      const visible = searchMatch && filterMatch;
      card.hidden = !visible;
      if (!searchMatch) continue;
      visibleCounts.all += 1;
      for (const category of (card.dataset.categories || "").split(/\s+/)) {
        if (Object.hasOwn(visibleCounts, category)) visibleCounts[category] += 1;
      }
    }

    for (const button of filters) {
      const category = button.dataset.projectFilter;
      const number = visibleCounts[category] ?? 0;
      const label = category === "all" ? "Todos" : button.textContent.replace(/\s*\d+\s*$/, "").trim();
      button.innerHTML = `${label}<span>${number}</span>`;
      const selected = category === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }

    const shown = cards.filter((card) => !card.hidden).length;
    if (count) count.textContent = `${shown} ${shown === 1 ? "producto" : "productos"}`;
    if (emptyState) emptyState.hidden = shown !== 0;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.projectFilter;
      updateCounts();
    });
  });
  search.addEventListener("input", updateCounts);
  search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      search.value = "";
      updateCounts();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName)) return;
    event.preventDefault();
    search.focus();
  });

  updateCounts();
})();
