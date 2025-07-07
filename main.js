// Common functions and data
let products = [
    { id: 1, name: "Shampoo", price: 250, stock: 20 },
    { id: 2, name: "Mobile", price: 25000, stock: 5 },
    { id: 3, name: "Laptop", price: 75000, stock: 3 }
];

let sales = [];

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Load data on dashboard
    if (document.getElementById('total-products')) {
        document.getElementById('total-products').textContent = products.length;
        
        const lowStockCount = products.filter(p => p.stock < 5).length;
        document.getElementById('low-stock').textContent = lowStockCount;
        
        // Display recent products
        const recentProducts = products.slice(0, 5);
        const tbody = document.getElementById('recent-products');
        recentProducts.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>₹${product.price.toLocaleString()}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-sm">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Cancel button functionality
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'my-products.html';
        });
    });
});