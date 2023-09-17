const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
let isTransitioning = false;
let intervalId; // Para el cambio automático

function showSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;

  carousel.style.transform = `translateX(-${100 * index}%)`;

  setTimeout(() => {
    isTransitioning = false;
  }, 300); // Ajusta la duración de la transición según tus preferencias
}

function setActiveIndicator(index) {
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  setActiveIndicator(currentIndex);
}

function startAutoPlay() {
  intervalId = setInterval(nextSlide, 2500); // Cambiar de imagen cada 2 segundos
}

function stopAutoPlay() {
  clearInterval(intervalId);
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    if (isTransitioning) return;
    currentIndex = index;
    showSlide(currentIndex);
    setActiveIndicator(currentIndex);
  });
});

carousel.addEventListener("mouseenter", stopAutoPlay); // Detener la reproducción automática al pasar el mouse sobre el carrusel
carousel.addEventListener("mouseleave", startAutoPlay); // Reanudar la reproducción automática al quitar el mouse del carrusel

startAutoPlay(); // Comenzar la reproducción automática al cargar la página
showSlide(currentIndex);
setActiveIndicator(currentIndex);
