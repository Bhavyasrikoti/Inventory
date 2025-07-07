// sales.js - Handles sales functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load products into dropdown
    const productSelect = document.getElementById('select-product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (₹${product.price.toLocaleString()}) - Stock: ${product.stock}`;
        productSelect.appendChild(option);
    });

    // Array to hold order items
    let orderItems = [];
    
    // Add product to order
    productSelect.addEventListener('change', function() {
        if (!this.value) return;
        
        const productId = parseInt(this.value);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Check if product already in order
            const existingItem = orderItems.find(item => item.product.id === productId);
            
            if (existingItem) {
                if (existingItem.quantity < product.stock) {
                    existingItem.quantity += 1;
                } else {
                    alert(`Only ${product.stock} items available in stock!`);
                }
            } else {
                orderItems.push({
                    product: product,
                    quantity: 1,
                    discount: 0
                });
            }
            
            renderOrderItems();
            this.value = '';
        }
    });
    
    // Render order items
    function renderOrderItems() {
        const tbody = document.getElementById('order-items');
        tbody.innerHTML = '';
        
        let totalItems = 0;
        let totalAmount = 0;
        
        orderItems.forEach((item, index) => {
            const subtotal = item.product.price * item.quantity * (1 - item.discount/100);
            totalItems += item.quantity;
            totalAmount += subtotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product.name}</td>
                <td>₹${item.product.price.toLocaleString()}</td>
                <td>
                    <input type="number" min="1" max="${item.product.stock}" 
                           value="${item.quantity}" class="quantity-input"
                           data-index="${index}">
                </td>
                <td>
                    <input type="number" min="0" max="100" 
                           value="${item.discount}" class="discount-input"
                           data-index="${index}">
                </td>
                <td>₹${subtotal.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger remove-item" data-index="${index}">Remove</button></td>
            `;
            tbody.appendChild(row);
        });
        
        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-amount').textContent = `₹${totalAmount.toFixed(2)}`;
        
        // Add event listeners to quantity and discount inputs
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                const newQuantity = parseInt(this.value);
                const maxStock = orderItems[index].product.stock;
                
                if (newQuantity > maxStock) {
                    alert(`Only ${maxStock} items available in stock!`);
                    this.value = maxStock;
                    orderItems[index].quantity = maxStock;
                } else if (newQuantity < 1) {
                    this.value = 1;
                    orderItems[index].quantity = 1;
                } else {
                    orderItems[index].quantity = newQuantity;
                }
                
                renderOrderItems();
            });
        });
        
        document.querySelectorAll('.discount-input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                let discount = parseInt(this.value);
                
                if (discount < 0) {
                    discount = 0;
                    this.value = 0;
                } else if (discount > 100) {
                    discount = 100;
                    this.value = 100;
                }
                
                orderItems[index].discount = discount;
                renderOrderItems();
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                orderItems.splice(index, 1);
                renderOrderItems();
            });
        });
    }
    
    // Complete sale
    document.getElementById('complete-sale').addEventListener('click', function() {
        const customerName = document.getElementById('customer-name').value.trim();
        const customerContact = document.getElementById('customer-contact').value.trim();
        
        if (!customerName || !customerContact) {
            alert('Please enter customer details!');
            return;
        }
        
        if (orderItems.length === 0) {
            alert('Please add at least one product to the order!');
            return;
        }
        
        // Create sale record
        const sale = {
            id: sales.length + 1,
            date: new Date().toISOString(),
            customer: {
                name: customerName,
                email: document.getElementById('customer-email').value.trim(),
                contact: customerContact
            },
            items: [...orderItems],
            total: orderItems.reduce((sum, item) => {
                return sum + (item.product.price * item.quantity * (1 - item.discount/100));
            }, 0)
        };
        
        // Add to sales array
        sales.push(sale);
        
        // Update product stock
        orderItems.forEach(item => {
            const product = products.find(p => p.id === item.product.id);
            if (product) {
                product.stock -= item.quantity;
            }
        });
        
        alert(`Sale completed successfully! Total: ₹${sale.total.toFixed(2)}`);
        
        // Reset form
        document.getElementById('customer-form').reset();
        orderItems = [];
        renderOrderItems();
    });
});