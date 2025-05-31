    const header = document.getElementById("main-header");
    const scrollBarContainer = document.querySelector(".scroll-progress");
    const progressBar = document.querySelector(".progress-bar");

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      progressBar.style.width = scrollPercent + "%";

      if (scrollTop > 50) {
        header.classList.add("shrink");
        scrollBarContainer.classList.add("visible");
      } else {
        header.classList.remove("shrink");
        scrollBarContainer.classList.remove("visible");
      }
    });
    /*اسکریپت مربوط به منوی سایت*/
// carousel.js - نسخه چرخشی بی‌انتها

/*------------------------*/
/*بخش مربوط به صفحه گذاری*/
/*------------------------*/


let products = [];
const itemsPerPage = 12;
let currentPage = 1;

function displayProducts(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = products.slice(start, end);

  const listContainer = document.getElementById("product-list");
  listContainer.innerHTML = "";
  currentItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.setAttribute("data-tooltip", item.notes);
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><del>${item.price_old}</del> <span class="new-price">${item.price_new}</span></p>
      <button>خرید</button>
    `;
    listContainer.appendChild(div);
  });
}


function setupPagination() {
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts(currentPage);
      setupPagination();
    });

    paginationContainer.appendChild(btn);
  }
}

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(currentPage);
    setupPagination();
  });


  // اسکریپت مربوط به فیلتر  های جست و جو
let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/main shop/products.json")
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      displayProducts(allProducts);
    });
});

function displayProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><del>${p.price_old} تومان</del> <strong>${p.price_new} تومان</strong></p>
      <a href="/checkout.html?product=${encodeURIComponent(p.name)}" class="buy-btn">خرید</a>
    `;
    list.appendChild(card);
  });
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
}




  
 /*پایان اسکریپت مربوط به صفحه اصلی*/
   function toggleSaleSlider() {
    const slider = document.getElementById("sale-slider");
    const btn = document.querySelector(".promo-btn");
    const isActive = slider.classList.toggle("active");
    btn.setAttribute("aria-expanded", isActive);
  }
/*اسکریپت مربوط به مشاهده بیشتر تخفیفات */
function toggleSaleSlider() {
  const slider = document.getElementById("sale-slider");
  const btn = document.querySelector(".promo-btn");
  const isActive = slider.classList.toggle("active");

  btn.setAttribute("aria-expanded", isActive);
  btn.textContent = isActive ? "مشاهده کمتر" : "مشاهده بیشتر";
}
/*-----------*/
/*گالری کیان*/
/*----------*/
function openLightbox(imgElement) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightbox.style.display = "flex";
  lightboxImg.src = imgElement.src;
}

function closeLightbox(event) {
  // فقط وقتی روی بک‌گراند یا ضربدر کلیک شد بسته شود
  if (!event || event.target.id === "lightbox" || event.target.className === "lightbox-close") {
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("lightbox-img").src = "";
  }
}
/*----------------*/
/*نظرات مشتری ها*/
/*----------------*/
/*----------------*/
/*سوالات متداول*/
/*----------------*/
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    // بسته‌کردن همه به جز فعلی
document.querySelectorAll('.faq-answer').forEach(el => {
  if (el !== answer) {
    el.style.maxHeight = null;
    el.classList.remove('active');
    }
  });
if (answer.classList.contains('active')) {
  answer.style.maxHeight = null;
  answer.classList.remove('active');
} else {
  answer.style.maxHeight = answer.scrollHeight + "px";
  answer.classList.add('active');
  }
  });
});


