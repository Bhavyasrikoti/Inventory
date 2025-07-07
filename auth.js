// auth.js - Handles authentication and user profile
document.addEventListener('DOMContentLoaded', function() {
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout-btn, #confirm-logout');
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogout = document.getElementById('cancel-logout');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logoutModal.style.display = 'flex';
        });
    });
    
    cancelLogout.addEventListener('click', function() {
        logoutModal.style.display = 'none';
    });
    
    // Confirm logout
    document.getElementById('confirm-logout').addEventListener('click', function() {
        // In a real app, you would call your backend logout API
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });
    
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            
            // Update profile display
            document.getElementById('profile-name').textContent = name;
            document.getElementById('profile-email').textContent = email;
            
            // In a real app, you would save to backend
            alert('Profile updated successfully!');
        });
    }
    
    // Simple auth check - redirect to login if not logged in
    if (!localStorage.getItem('isLoggedIn') && 
        !window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html';
    }
});