
document.addEventListener("DOMContentLoaded", function () {
  // Show current year in footer
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Search and filter BCA PDF cards
  const searchInput = document.getElementById("pdfSearch");
  const categorySelect = document.getElementById("pdfCategory");
  const pdfCards = document.querySelectorAll(".pdf-card");
  const noResults = document.getElementById("noResults");

  function filterPDFs() {
    const searchTerm = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    const category = categorySelect
      ? categorySelect.value
      : "all";

    let visibleCount = 0;

    pdfCards.forEach(function (card) {
      const text = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category;

      const matchesSearch = text.includes(searchTerm);
      const matchesCategory =
        category === "all" || cardCategory === category;

      const show = matchesSearch && matchesCategory;
      card.hidden = !show;

      if (show) visibleCount++;
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterPDFs);
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", filterPDFs);
  }

  // Back-to-top button
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
