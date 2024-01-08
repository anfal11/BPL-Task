document.addEventListener("DOMContentLoaded", () => {
  const foodSection = document.getElementById("foodSection");
  const cartSidebar = document.getElementById("cartSidebar");
  const totalAmountElement = document.getElementById("totalAmount");

  // Initialize total amount
  let totalAmount = 0;

  foodSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
      addToCart(event.target.parentElement);
      event.target.disabled = true;
      event.target.innerText = "Added to Cart";
    }
  });

  function addToCart(item) {
    const itemId = item.dataset.id;
    const itemImg = item.querySelector("img").src;
    const itemName = item.querySelector("h3").innerText;
    const itemPrice = parseFloat(item.querySelector(".price").innerText);
    const existingCartItem = cartSidebar.querySelector(`[data-id="${itemId}"]`);

    if (existingCartItem) {
      updateCartItemQuantity(existingCartItem);
    } else {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.id = itemId;
      cartItem.innerHTML = `
        <div class="flex gap-2 border p-2">
          <img class="w-24 h-24" src=${itemImg} alt="Placeholder Image">
          <div>
            <span class="text-white font-bold">${itemName}</span> </br>
            <span class="text-white font-bold price">${itemPrice.toFixed(2)}$/each</span> </br>
            <div class="quantity-container">
              <button class="quantity-btn decrement-btn">-</button>
              <input class="w-10 text-black" type="number" value="1" min="1" readonly>
              <button class="quantity-btn increment-btn">+</button>
            </div>
            <figure class="relative">
              <img src="./remove.png" class="w-8 remove-from-cart-btn absolute -top-24 -right-4 cursor-pointer" alt="">
            </figure>
          </div>        
        </div>
      `;

      cartSidebar.appendChild(cartItem);
      updateTotalAmount(itemPrice);
    }
  }

  function updateCartItemQuantity(cartItem) {
    const quantityInput = cartItem.querySelector("input");
    const newQuantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = newQuantity;
    const pricePerItem = parseFloat(cartItem.querySelector(".price").innerText);
    updateTotalAmount(pricePerItem);
  }

  function removeFromCart(cartItem) {
    const itemPrice = parseFloat(cartItem.querySelector(".price").innerText);
    const quantity = parseInt(cartItem.querySelector("input").value);
    updateTotalAmount(-itemPrice * quantity);
    cartItem.remove();
  }

  function updateTotalAmount(amount) {
    totalAmount += amount;
    totalAmountElement.innerText = `Total: $${totalAmount.toFixed(2)}`;
  }

  cartSidebar.addEventListener("click", (event) => {
    const quantityInput = event.target.parentElement.querySelector("input");
    const cartItem = event.target.parentElement.parentElement.parentElement;

    if (event.target.classList.contains("increment-btn")) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
      const pricePerItem = parseFloat(cartItem.querySelector(".price").innerText);
      updateTotalAmount(pricePerItem);
    } else if (event.target.classList.contains("decrement-btn")) {
      const newQuantity = parseInt(quantityInput.value) - 1;
      if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        const pricePerItem = parseFloat(cartItem.querySelector(".price").innerText);
        updateTotalAmount(-pricePerItem);
      }
    } else if (event.target.classList.contains("remove-from-cart-btn")) {
      removeFromCart(cartItem);
    }
  });
});
