const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function fetchProducts() {
  return fetch('https://raw.githubusercontent.com/ElenaMghebrishvili/bags-api/refs/heads/main/bags.json')
    .then(response => response.json())
    .catch(error => console.error('Error fetching product data:', error));
}

//ვიზუალურად გამოჩენა
fetchProducts()
  .then(products => {
    const product = products.find(product => product.id == productId);
    if (product) {
      document.getElementById('productImage').src = product.image;
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('productPrice').textContent = `$${product.price}`;
      
      const addToCartBtn = document.getElementById('addToCartBtn');
      addToCartBtn.addEventListener('click', () => {
        addToCart(product);
      });
    } else {
      document.body.innerHTML = `<h1>Product not found</h1>`;
    }
  });

//კალათაში დამატება
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  product.quantity = 1; 
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  showPopup(`${product.name} has been added to the cart!`);
}

//პოპ-აპის გამოტანა
function showPopup(message) {
  const popup = document.getElementById('popupMessage');
  const popupText = document.getElementById('popupText');
  popupText.textContent = message;
  popup.style.display = 'flex';

  setTimeout(() => {
    closePopup();
  }, 3000);
}

//დახურვა
function closePopup() {
  const popup = document.getElementById('popupMessage');
  popup.style.display = 'none';
}

document.getElementById('popupMessage').addEventListener('click', (e) => {
  if (e.target === document.getElementById('popupMessage')) {
    closePopup();
  }
});
