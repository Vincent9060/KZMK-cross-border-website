let heroIndex = 0;
let heroTimer = null;

function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);
}

function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

function initHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const dotsWrap = document.getElementById("heroDots");
  if (!slides.length || !dotsWrap) return;

  dotsWrap.innerHTML = slides
    .map((_, index) => `<button class="hero-dot ${index === 0 ? "active" : ""}" data-slide="${index}" aria-label="slide ${index + 1}"></button>`)
    .join("");

  const dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));

  function showSlide(index) {
    heroIndex = index;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function nextSlide() {
    const next = (heroIndex + 1) % slides.length;
    showSlide(next);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      restartHeroTimer();
    });
  });

  function restartHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 4500);
  }

  showSlide(0);
  restartHeroTimer();
}

function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-link, .mobile-link");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const normalized = href.split("/").pop();
    const isHome = (path === "" || path === "index.html") && normalized === "index.html";
    const isCurrent = normalized === path || isHome;
    link.classList.toggle("active", isCurrent);
  });
}

function handleContactForm() {
  const form = document.getElementById("contactForm");
  const notice = document.getElementById("formNotice");
  if (!form || !notice) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    notice.classList.remove("hidden");
    if (typeof t === "function") {
      notice.textContent = t("formSuccess");
    } else {
      notice.textContent = "Submitted successfully.";
    }
    form.reset();
  });
}

function observeReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  items.forEach((item) => {
    if (!item.classList.contains("in-view")) observer.observe(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileMenu();
  initHeroSlider();
  setActiveNav();
  handleContactForm();
  observeReveal();
});
