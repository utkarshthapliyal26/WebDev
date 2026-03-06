let total = 0;

function addToCart(name, price) {
    const cartList = document.getElementById("cart-items");

    const li = document.createElement("li");
    li.textContent = name + " - ₹" + price;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = " ❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.background = "red";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "5px";
    removeBtn.style.cursor = "pointer";

    removeBtn.onclick = function() {
        cartList.removeChild(li);
        total -= price;
        document.getElementById("total").textContent = total;
    };

    li.appendChild(removeBtn);
    cartList.appendChild(li);

    total += price;
    document.getElementById("total").textContent = total;
}

function placeOrder() {
    if (total === 0) {
        alert("Your cart is empty!");
    } else {
        alert("🎉 Order placed successfully!");
        location.reload();
    }
}
