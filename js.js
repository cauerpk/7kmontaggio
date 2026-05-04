window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function goSlide(index) {
  if (!slides.length || !dots.length) return;

  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

if (slides.length > 1 && dots.length > 1) {
  setInterval(() => goSlide((currentSlide + 1) % slides.length), 5000);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function countUp(element, target) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    element.textContent = `+${count}`;
    if (count >= target) clearInterval(timer);
  }, 40);
}

const numObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = Number.parseInt(entry.target.dataset.target, 10);
      countUp(entry.target, target);
      numObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".numero-val[data-target]").forEach((element) => numObserver.observe(element));

const quoteForm = document.getElementById("quoteForm");

function submitForm(event) {
  event.preventDefault();

  const button = quoteForm.querySelector(".btn-submit");
  const data = new FormData(quoteForm);
  const values = Object.fromEntries(data.entries());

  const message = [
    "*Solicitação de orçamento - Site 7K*",
    "",
    `Nome: ${values.nome || "-"}`,
    `Telefone: ${values.telefone || "-"}`,
    `E-mail: ${values.email || "-"}`,
    `Cidade/Estado: ${values.cidade || "-"}`,
    `Serviço: ${values.servico || "-"}`,
    `Perfil: ${values.perfil || "-"}`,
    "",
    "Detalhes do projeto:",
    values.mensagem || "-"
  ].join("\n");

  button.textContent = "Abrindo WhatsApp...";
  button.disabled = true;

  const whatsappUrl = `https://wa.me/5547991284988?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener");

  setTimeout(() => {
    button.textContent = "Briefing enviado";
  }, 500);
}

if (quoteForm) {
  quoteForm.addEventListener("submit", submitForm);
}
