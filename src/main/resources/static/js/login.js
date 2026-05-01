// Login form functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandlers();
});

function setupFormHandlers() {
    const loginBtn = document.querySelector('.auth-btn-primary');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }

    const inputs = document.querySelectorAll('.auth-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    });
}

function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (!username || !password) {
        errorMessage.style.display = 'block';
        return;
    }

    // Simulate login validation
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'admin-users.html';
    } else if (username && password.length >= 6) {
        alert('Login successful!');
        sessionStorage.setItem('currentUser', username);
        window.location.href = 'user-profile.html';
    } else {
        errorMessage.style.display = 'block';
    }
}

function forgotPassword(event) {
    event.preventDefault();
    alert('Password reset link would be sent to your email');
}
