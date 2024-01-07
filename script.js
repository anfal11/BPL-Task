document.addEventListener('DOMContentLoaded', () => {
    const foodSection = document.getElementById('foodSection');
    const cartSidebar = document.getElementById('cartSidebar');
  
    foodSection.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart-btn')) {
        addToCart(event.target.parentElement);
      }
    });
  
    function addToCart(item) {
      const itemId = item.dataset.id;
      const itemImg = item.querySelector('img').src;
      const itemName = item.querySelector('h3').innerText;
      const itemPrice = parseFloat(item.querySelector('p').innerText.split('$')[1]);
      
      const existingCartItem = cartSidebar.querySelector(`[data-id="${itemId}"]`);
      
      if (existingCartItem) {
        updateCartItemQuantity(existingCartItem);
      } else {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.id = itemId;
        cartItem.innerHTML = `
          <div class="flex gap-2 border p-2">
          <img class="w-24 h-24" src=${itemImg} alt="Placeholder Image">
          <div>
          <span class="text-white font-bold">${itemName}</span> </br>
          <span>$${itemPrice.toFixed(2)}</span> </br>
          <input class="w-20" type="number" value="1" min="1">
          <button class="remove-from-cart-btn">Remove</button>
          </div>        
          </div>
        `;
        
        cartSidebar.appendChild(cartItem);
      }
    }
  
    function updateCartItemQuantity(cartItem) {
      const quantityInput = cartItem.querySelector('input');
      const newQuantity = parseInt(quantityInput.value) + 1;
      quantityInput.value = newQuantity;
    }
  
    cartSidebar.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-from-cart-btn')) {
        removeFromCart(event.target.parentElement);
      }
    });
  
    function removeFromCart(cartItem) {
      cartItem.remove();
    }
  });
  