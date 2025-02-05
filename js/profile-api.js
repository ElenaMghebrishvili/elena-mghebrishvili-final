//კალათში პროდუქტის დამატება
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function openConfirmModal() {
    document.getElementById("confirmModal").style.display = "block";
}

function closeConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
}

function confirmBuy() {
    openConfirmModal();
}

//ყიდვის დასრულება
function completePurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const purchasedBags = JSON.parse(localStorage.getItem('purchasedBags')) || [];

    purchasedBags.push(...cart);

    localStorage.setItem('purchasedBags', JSON.stringify(purchasedBags));
    localStorage.removeItem('cart');  

    renderPurchasedBags();
    renderCart();  

    closeConfirmModal();
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }
}

function renderPurchasedBags() {
    const purchasedBags = JSON.parse(localStorage.getItem('purchasedBags')) || [];
    const purchasedBagsContainer = document.getElementById('purchasedBagsContainer');
    purchasedBagsContainer.innerHTML = '';

    if (purchasedBags.length === 0) {
        purchasedBagsContainer.innerHTML = '<p>No bags purchased yet.</p>';
    } else {
        purchasedBags.forEach((item) => {
            const bagItem = document.createElement('div');
            bagItem.className = 'bag-item';
            bagItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100px;">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            `;
            purchasedBagsContainer.appendChild(bagItem);
        });
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function clearAll() {
    localStorage.removeItem('cart'); 
    renderCart();  
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderPurchasedBags();
});
