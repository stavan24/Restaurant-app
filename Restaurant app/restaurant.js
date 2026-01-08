// ---------- PAGE CHECK ----------
const menuBox = document.getElementById("menu-box");
const cartBox = document.querySelector(".cart-box");

// ---------- LOAD MENU ITEMS ----------
function loadMenu() {
  const items = JSON.parse(localStorage.getItem("menuItems")) || [];

  // Remove old items (keep + button)
  document.querySelectorAll(".item:not(#plus-button)").forEach(e => e.remove());

  items.forEach((data, index) => {
    const item = document.createElement("div");
    item.className = "item";

    item.innerHTML = `
      <span class="item-name">${data.name} ₹${data.price}</span>
      <div class="buttons">
        <button class="add">Add</button>
        <button class="qty-btn">+</button>
      </div>
    `;

    item.querySelector(".add").onclick = () => addToCart(data);
    item.querySelector(".qty-btn").onclick = () => addToCart(data);

    menuBox.insertBefore(item, document.getElementById("plus-button"));
  });
}

// ---------- CART ----------
let cart = [];

function addToCart(item) {
  const found = cart.find(c => c.name === item.name);

  if (found) {
    found.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();
}

function renderCart() {
  cartBox.innerHTML = `<div class="cart-title">Your Cart</div>`;

  if (cart.length === 0) {
    cartBox.innerHTML += `<div class="empty-cart">Cart is empty...</div>`;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `
      <strong>${item.name}</strong> x ${item.qty}
      <span style="float:right">₹${item.price * item.qty}</span>
    `;
    cartBox.appendChild(div);
  });

  cartBox.innerHTML += `
    <hr>
    <strong>Total: ₹${total}</strong>
  `;
}

// ---------- PLUS BUTTON ----------
const plusBtn = document.getElementById("plus-button");
if (plusBtn) {
  plusBtn.onclick = () => {
    window.location.href = "add.html";
  };
}

// ---------- INIT ----------
if (menuBox) loadMenu();




