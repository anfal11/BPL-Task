document.addEventListener("DOMContentLoaded", () => {
  const foodSection = document.getElementById("foodSection");
  const cartSidebar = document.getElementById("cartSidebar");
  const totalAmount = document.getElementById("totalAmount");

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
    const itemPrice = parseFloat(
      item.querySelector(".price").innerText
    );

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
            <span class="text-white font-bold">${itemPrice.toFixed(2)}$/each</span> </br>
            <input  class="w-20 text-white" type="number" value="1" min="1" disabled>
            <button class="remove-from-cart-btn relative"><span class="absolute right-0 -top-20 text-white">Remove</span></button>
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
    updateTotalAmount(parseFloat(cartItem.querySelector("span").innerText));
  }

  function removeFromCart(cartItem) {
    const itemPrice = parseFloat(cartItem.querySelector("span").innerText);
    updateTotalAmount(-itemPrice);
    cartItem.remove();
  }

  function updateTotalAmount(amount) {
    const currentTotal = parseFloat(totalAmount.innerText);
    totalAmount.innerText = (currentTotal + amount).toFixed(2);
  }

  cartSidebar.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart-btn")) {
      removeFromCart(event.target.parentElement);
    }
  });
});
