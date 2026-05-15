const header = document.querySelector("[data-header]");
const productField = document.querySelector("[data-product-field]");
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 320)}ms`;
  observer.observe(item);
});

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    productField.value = button.dataset.product;
    document.querySelector("#enquiry").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => productField.focus(), 520);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const product = data.get("product").trim();
  const channel = data.get("channel");
  const budget = data.get("budget").trim() || "open";

  result.innerHTML = `Ready message for ${channel}: Hello GOMSENG, I am ${name}. I want to buy or enquire about ${product}. My budget is ${budget}. Please share available designs, price and appointment timing.<br><br><a href="https://www.instagram.com/gomseng_assamese_silk" target="_blank" rel="noreferrer">Open Instagram enquiry</a>`;
  result.classList.add("visible");
});
