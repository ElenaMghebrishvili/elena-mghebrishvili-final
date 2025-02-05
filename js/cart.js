function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    // თუ კალათაში რაღაცაა, ვატარებთ ციკლს და ვაჩვენებთ თითოეული ნივთის მონაცემებს.
    cart.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 100px;">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        <div>
          <button onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity || 1}</span>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
}

//ვფილტრავთ ნივთს, რომელსაც უნდა წავშალოთ.
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId); 
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === productId);

  if (product) {
    product.quantity = (product.quantity || 1) + change;
    if (product.quantity <= 0) product.quantity = 1; 
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

document.getElementById('clearCartBtn').addEventListener('click', () => {
  localStorage.removeItem('cart');
  renderCart();
});

document.addEventListener('DOMContentLoaded', renderCart);
