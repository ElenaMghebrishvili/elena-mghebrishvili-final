const burger = document.getElementById('burger');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
  navbar.classList.toggle('open'); 
  const isOpen = navbar.classList.contains('open');
  burger.setAttribute('aria-expanded', isOpen); 
});
