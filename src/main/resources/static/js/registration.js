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

// Validate username (minimum 6 characters)
function validateUsername() {
    const username = document.getElementById('regUsername').value.trim();
    const warning = document.getElementById('usernameWarning');
    const info = document.getElementById('usernameInfo');

    if (!username) {
        warning.classList.remove('show');
        info.textContent = '';
        return false;
    }

    if (username.length < 6) {
        warning.classList.add('show');
        info.textContent = 'Username must be at least 6 characters ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Username is valid ✓';
    info.style.color = 'var(--light-green)';
    return true;
}

// Validate full name (first name and last name separated by space)
function validateFullName() {
    const fullName = document.getElementById('regFullName').value.trim();
    const warning = document.getElementById('fullNameWarning');
    const info = document.getElementById('fullNameInfo');

    if (!fullName) {
        warning.classList.remove('show');
        info.textContent = '';
        return false;
    }

    // Check: must be two words (first name and last name) separated by space
    const parts = fullName.split(/\s+/);

    if (parts.length < 2) {
        warning.classList.add('show');
        info.textContent = 'Please enter both first name and last name (e.g., John Doe) ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    if (parts.length > 2) {
        warning.classList.add('show');
        info.textContent = 'Please enter only first name and last name (two words) ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    // Check that both words are not empty and contain only letters
    const firstName = parts[0];
    const lastName = parts[1];
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        warning.classList.add('show');
        info.textContent = 'Names should contain only letters ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Welcome, ' + firstName + ' ' + lastName + ' ✓';
    info.style.color = 'var(--light-green)';
    return true;
}

function validatePassword() {
    const password = document.getElementById('regPassword').value;
    const warning = document.getElementById('passwordWarning');
    const info = document.getElementById('passwordInfo');

    if (!password) {
        warning.classList.remove('show');
        info.textContent = '';
        return false;
    }

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
    const info = document.getElementById('passwordRepeatInfo');

    if (!passwordRepeat) {
        warning.classList.remove('show');
        info.textContent = '';
        return true;
    }

    if (password !== passwordRepeat) {
        warning.classList.add('show');
        info.textContent = 'Passwords do not match ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Passwords match ✓';
    info.style.color = 'var(--light-green)';
    return true;
}

function validateEmail() {
    const email = document.getElementById('regEmail').value;
    const warning = document.getElementById('emailWarning');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        warning.classList.remove('show');
        return true;
    }

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

    if (!phone) {
        warning.classList.remove('show');
        return true;
    }

    if (!phoneRegex.test(phone)) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateAllFields() {
    const usernameValid = validateUsername();
    const fullNameValid = validateFullName();
    const passwordValid = validatePassword();
    const passwordRepeatValid = validatePasswordRepeat();
    const email = document.getElementById('regEmail').value;
    const emailValid = validateEmail();

    if (!usernameValid) {
        alert('Username must be at least 6 characters');
        return false;
    }

    if (!fullNameValid) {
        alert('Please enter your first name and last name separated by a space');
        return false;
    }

    if (!passwordValid) {
        alert('Password is not strong enough');
        return false;
    }

    if (!passwordRepeatValid) {
        alert('Passwords do not match');
        return false;
    }

    if (!email) {
        alert('Please enter your email');
        return false;
    }

    if (!emailValid) {
        alert('Email is invalid');
        return false;
    }

    const phone = document.getElementById('regPhone').value;
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

    alert('Registration successful! You can now login.');
    // Save username
    sessionStorage.setItem('currentUser', document.getElementById('regUsername').value);
    // Save full name
    sessionStorage.setItem('fullName', document.getElementById('regFullName').value);
    window.location.href = 'user-profile.html';
}

function saveOnly() {
    if (!validateAllFields()) {
        return;
    }

    alert('Registration data saved! You can login later.');
    window.location.href = 'login.html';
}

function showRegistrationForm() {
    console.log('Registration form shown');
}
