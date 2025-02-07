const productsContainer = document.querySelector('.products');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const categorySearchInput = document.getElementById('categorySearch');

let currentPage = 0;
let itemsPerPage = 0;
let allProducts = [];

fetch('https://raw.githubusercontent.com/ElenaMghebrishvili/bags-api/refs/heads/main/bags.json')
  .then(response => response.json())
  .then(products => {
    allProducts = products;
    calculateItemsPerPage();
    updateButtons(allProducts);
  })
  .catch(error => console.error('Error fetching products:', error));

function calculateItemsPerPage() {
  const screenWidth = window.innerWidth;
  itemsPerPage = screenWidth >= 1200 ? 4 : screenWidth >= 768 ? 3 : 2;
  renderProducts(allProducts);
  updateButtons(allProducts);
}

function renderProducts(productsToRender) {
  productsContainer.innerHTML = '';
  const start = currentPage * itemsPerPage;
  const paginatedProducts = productsToRender.slice(start, start + itemsPerPage);

  paginatedProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    productElement.addEventListener('click', () => {
      window.location.href = `product-page.html?id=${product.id}`;
    });

    productsContainer.appendChild(productElement);
  });
}

function updateButtons(productsToRender) {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage >= Math.ceil(productsToRender.length / itemsPerPage) - 1;
}

//buttons
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderProducts(allProducts);
    updateButtons(allProducts);
  }
});




nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(allProducts.length / itemsPerPage) - 1) {
    currentPage++;
    renderProducts(allProducts);
    updateButtons(allProducts);
  }
});

function updateButtons(productsToRender) {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage >= Math.ceil(productsToRender.length / itemsPerPage) - 1;
}


//კალათში დამატება
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  showPopup(`${product.name} added to cart!`);
}

function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popupMessage');

  popupMessage.innerText = message;
  popup.style.display = 'block';
  popup.style.opacity = '1';

  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 500);
  }, 3000); 
}





document.getElementById('contactForm').addEventListener("submit", (e) => {
  e.preventDefault();  

  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
      emailError.textContent = "Email is required!";
      isValid = false;
  } else if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address!";
      isValid = false;
  } else {
      emailError.textContent = ""; 
  }

  if (message === "") {
      messageError.textContent = "Message is required!";
      isValid = false;
  } else {
      messageError.textContent = "";  
  }

  if (isValid) {
        alert('comment is send succsesfully')
      document.getElementById('contactForm').submit();
  }
});





//ელემენტის განახლება ეკრანის ზომის მიხედვით
window.addEventListener('resize', calculateItemsPerPage);



