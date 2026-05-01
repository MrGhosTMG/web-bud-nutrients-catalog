// Registration form functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandlers();
});

function setupFormHandlers() {
    const inputs = document.querySelectorAll('.auth-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                register();
            }
        });
    });
}

function validatePassword() {
    const password = document.getElementById('regPassword').value;
    const warning = document.getElementById('passwordWarning');
    const info = document.getElementById('passwordInfo');

    if (password.length < 8) {
        warning.classList.add('show');
        info.textContent = 'Password must be at least 8 characters';
        return false;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[@!#$%]/.test(password)) {
        warning.classList.add('show');
        info.textContent = 'Must contain uppercase, number, and special character';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Strong password ✓';
    info.style.color = 'var(--light-green)';
    return true;
}

function validatePasswordRepeat() {
    const password = document.getElementById('regPassword').value;
    const passwordRepeat = document.getElementById('regPasswordRepeat').value;
    const warning = document.getElementById('passwordRepeatWarning');

    if (password !== passwordRepeat) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateEmail() {
    const email = document.getElementById('regEmail').value;
    const warning = document.getElementById('emailWarning');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validatePhone() {
    const phone = document.getElementById('regPhone').value;
    const warning = document.getElementById('phoneWarning');
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (phone && !phoneRegex.test(phone)) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateAllFields() {
    const username = document.getElementById('regUsername').value.trim();
    const usernameRepeat = document.getElementById('regUsernameRepeat').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordRepeat = document.getElementById('regPasswordRepeat').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;

    if (!username || !usernameRepeat || !password || !passwordRepeat || !email) {
        alert('Please fill all required fields');
        return false;
    }

    if (username !== usernameRepeat) {
        alert('Usernames do not match');
        return false;
    }

    if (!validatePassword()) {
        alert('Password is not strong enough');
        return false;
    }

    if (!validatePasswordRepeat()) {
        alert('Passwords do not match');
        return false;
    }

    if (!validateEmail()) {
        alert('Email is invalid');
        return false;
    }

    if (phone && !validatePhone()) {
        alert('Phone number is invalid');
        return false;
    }

    return true;
}

function register() {
    if (!validateAllFields()) {
        return;
    }

    const saveOnly = document.getElementById('saveOnly')?.checked;
    
    if (saveOnly) {
        alert('Registration data saved! You can login later.');
        window.location.href = 'login.html';
    } else {
        alert('Registration successful! You can now login.');
        sessionStorage.setItem('currentUser', document.getElementById('regUsername').value);
        window.location.href = 'user-profile.html';
    }
}

function showRegistrationForm() {
    // This function can be used if you want to add animation or validation before showing the form
    // For now, the form is always visible
}
