const header = document.querySelector("[data-header]");
const productField = document.querySelector("[data-product-field]");
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");
const reveals = document.querySelectorAll(".reveal");
const checkout = document.querySelector("[data-checkout]");
const orderForm = document.querySelector("[data-order-form]");
const whatsappNumber = "917002005047";

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
  const motion = index % 3 === 0 ? "from-left" : index % 3 === 1 ? "from-right" : "shuffle-in";
  item.classList.add(motion);
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

document.querySelectorAll("[data-buy]").forEach((button) => {
  button.addEventListener("click", () => {
    checkout.hidden = false;
    orderForm.querySelector("[data-order-product]").value = button.dataset.buy;
    orderForm.querySelector("[data-order-price]").value = `₹${Number(button.dataset.price).toLocaleString("en-IN")}`;
    orderForm.elements.customer.focus();
  });
});

document.querySelector("[data-close]").addEventListener("click", () => {
  checkout.hidden = true;
});

checkout.addEventListener("click", (event) => {
  if (event.target === checkout) {
    checkout.hidden = true;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const product = data.get("product").trim();
  const phone = data.get("phone").trim() || "not shared";
  const budget = data.get("budget").trim() || "open";
  const message = `Hello GOMSENG, I am ${name}. I want to enquire about ${product}. My phone number is ${phone}. My budget is ${budget}. Please share available designs, price and appointment timing.`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  result.innerHTML = `WhatsApp enquiry ready for 7002005047.<br><br><a href="${url}" target="_blank" rel="noreferrer">Send on WhatsApp</a>`;
  result.classList.add("visible");
  window.open(url, "_blank", "noopener");
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const product = data.get("product");
  const price = data.get("price");
  const customer = data.get("customer").trim();
  const phone = data.get("phone").trim();
  const address = data.get("address").trim();
  const payment = data.get("payment");
  const message = `Hello GOMSENG, I want to place a demo order.
Product: ${product}
Price: ${price}
Customer: ${customer}
Phone: ${phone}
Address: ${address}
Payment mode: ${payment}.
Please confirm availability and final delivery details.`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  checkout.hidden = true;
});
