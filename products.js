// products.js - Product Management
let products = JSON.parse(localStorage.getItem('products')) || [
  { id: 1, name: "Shampoo", price: 250, stock: 20 },
  { id: 2, name: "Mobile", price: 25000, stock: 5 }
];

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

// Load products into dropdowns (used in new-sales.html)
function loadProductDropdown() {
  const dropdown = document.getElementById('product-dropdown');
  if (dropdown) {
    dropdown.innerHTML = products.map(p => 
      `<option value="${p.id}">${p.name} (₹${p.price})</option>`
    ).join('');
  }
}

// Initialize on page load
if (document.readyState === 'complete') {
  loadProductDropdown();
} else {
  document.addEventListener('DOMContentLoaded', loadProductDropdown);
}