const menuBox = document.getElementById("menu-box");
const plusButton = document.getElementById("plus-button");
const cartItemsBox = document.getElementById("cart-items");
const cartTotalBox = document.getElementById("cart-total");

// MENU & CART DATA
let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= RENDER MENU =================
function renderMenu(){
  menuBox.innerHTML = "";
  menuBox.appendChild(plusButton);

  menuItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "item";

    card.innerHTML = `
      <div class="item-name">${item.name}</div>
      <div>₹${item.price}</div>

      <div class="buttons">
        <button class="add">Add</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // ADD TO CART
    card.querySelector(".add").addEventListener("click", () => {
      addToCart(item);
    });

    // DELETE MENU ITEM
    card.querySelector(".delete-btn").addEventListener("click", () => {
      if(confirm(`Delete ${item.name}?`)){
        menuItems.splice(index, 1);
        localStorage.setItem("menuItems", JSON.stringify(menuItems));
        renderMenu();
      }
    });

    menuBox.appendChild(card);
  });
}

// ================= ADD TO CART =================
function addToCart(item){
  const found = cart.find(c => c.name === item.name);

  if(found){
    found.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ================= RENDER CART =================
function renderCart(){
  cartItemsBox.innerHTML = "";

  if(cart.length === 0){
    cartItemsBox.innerHTML = `<p class="empty-cart">Cart is empty...</p>`;
    cartTotalBox.innerHTML = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-info">
        <strong>${item.name}</strong><br>
        ₹${item.price} × ${item.qty}
      </div>

      <div class="cart-actions">
        <button onclick="changeQty(${index}, -1)">−</button>
        <button onclick="changeQty(${index}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;

    cartItemsBox.appendChild(div);
  });

  cartTotalBox.innerHTML = `Total: ₹${total}`;
}


// ================= REMOVE FROM CART =================
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// PLUS BUTTON
plusButton.addEventListener("click", () => {
  window.location.href = "add.html";
});

// INITIAL LOAD
renderMenu();
renderCart();


const toggle = document.getElementById("themeToggle");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


function goHome(){
  window.location.href = "index.html";
}

function goMenu(){
  window.location.href = "menu.html";
}

function goProfile(){
  window.location.href = "profile.html";
}
