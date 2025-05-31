document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (!query) return;

  fetch("/main shop/products.json") // ← حتما مسیر درست بده
    .then(response => response.json())
    .then(products => {
      const filtered = products.filter(product =>
        product.name.includes(query) || product.notes.includes(query)
      );
      renderResults(filtered, query);
    })
    .catch(error => {
      console.error("خطا در خواندن فایل محصولات:", error);
    });
});

function renderResults(products, query) {
  const container = document.getElementById("results");
  container.innerHTML = `<h2>نتایج برای "${query}":</h2>`;

  if (products.length === 0) {
    container.innerHTML += "<p>محصولی یافت نشد.</p>";
    return;
  }

  products.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("product-card");

item.innerHTML = `
  <div class="popup">ترکیبات: ${p.notes}</div>
  <img src="${p.image}" alt="${p.name}">
  <h3>${p.name}</h3>
  <p>
    <del>${p.price_old} تومان</del>
    <strong>${p.price_new} تومان</strong>
  </p>
  <a href="/checkout.html?product=${encodeURIComponent(p.name)}" class="buy-btn">
    <i class="fas fa-shopping-cart"></i> خرید
  </a>
`;

    container.appendChild(item);
  });
}
