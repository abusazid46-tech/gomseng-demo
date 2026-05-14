const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

const looks = [
  {
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1300&q=82",
    title: "Gold Ceremony Edit",
    text: "Warm silk tones, traditional jewellery, and bridal-ready styling."
  },
  {
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1300&q=82",
    title: "Red Wedding Classic",
    text: "A high-impact festive palette for engagement and wedding rituals."
  },
  {
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1300&q=82",
    title: "Festival Silk Story",
    text: "Elegant textures for Bihu, gifting, and family celebrations."
  }
];

let activeLook = 0;

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

document.querySelector("[data-gallery-next]").addEventListener("click", () => {
  activeLook = (activeLook + 1) % looks.length;
  const look = looks[activeLook];

  document.querySelector("[data-gallery-image]").src = look.image;
  document.querySelector("[data-gallery-title]").textContent = look.title;
  document.querySelector("[data-gallery-text]").textContent = look.text;
  document.querySelector("[data-gallery-count]").textContent = `0${activeLook + 1} / 03`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const occasion = data.get("occasion");
  const interest = data.get("interest");
  const budget = data.get("budget").trim() || "to be discussed";

  result.textContent = `Message ready: Hello GOMSENG, I am ${name}. I am looking for ${interest} for ${occasion}. My budget range is ${budget}. Please share available options and appointment timing.`;
  result.classList.add("visible");
});
