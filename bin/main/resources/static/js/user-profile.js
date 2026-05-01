// User profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    setupMenuNavigation();
    setupEditButtons();
    setupLogoutButton();
    loadUserProfile();
});

// Setup tab navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabText = this.textContent.trim();
            console.log('Tab clicked: ' + tabText);
            // Load corresponding content here
        });
    });
}

// Setup menu navigation
function setupMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('menu-item-logout')) {
                e.preventDefault();
                // Remove active class from all items
                menuItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            }
        });
    });
}

// Toggle edit mode for form fields
function toggleEdit(fieldId) {
    const input = document.getElementById(fieldId);
    const currentValue = input.value;
    
    if (currentValue === '' || input.disabled === false) {
        // Enable editing
        input.disabled = false;
        input.focus();
        input.style.backgroundColor = '#fffacd';
    } else {
        // Save and disable editing
        input.disabled = true;
        input.style.backgroundColor = 'white';
        console.log('Field ' + fieldId + ' updated to: ' + input.value);
    }
}

// Setup edit buttons functionality
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.previousElementSibling;
            const originalText = this.textContent;
            
            if (input && input.tagName === 'INPUT') {
                if (input.disabled === false || input.value === input.placeholder) {
                    // Enable editing
                    input.disabled = false;
                    input.focus();
                    input.style.backgroundColor = '#fffacd';
                    this.textContent = 'Save';
                    this.style.backgroundColor = '#4CAF50';
                } else {
                    // Save
                    input.disabled = true;
                    input.style.backgroundColor = 'white';
                    this.textContent = 'Edit';
                    this.style.backgroundColor = '';
                    alert('Profile updated successfully!');
                }
            }
        });
    });
}

// Setup logout button
function setupLogoutButton() {
    const logoutBtn = document.querySelector('.menu-item-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }
        });
    }
}

// Load user profile (mock data)
function loadUserProfile() {
    // This would load actual user data from the server
    const userData = {
        fullName: 'John Doe',
        phone: '+995 123 456 789',
        email: 'user_name@mail.com',
        birthDate: null,
        gender: null
    };
    
    // Set form values if fields exist
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (fullNameInput) fullNameInput.value = userData.fullName;
    if (phoneInput) phoneInput.value = userData.phone;
    if (emailInput) emailInput.value = userData.email;
    
    // Disable inputs by default
    [fullNameInput, phoneInput, emailInput].forEach(input => {
        if (input) input.disabled = true;
    });

    // Initialize age and gender display
    updateAge();
    updateGender();
}

// Photo upload handler
document.addEventListener('DOMContentLoaded', function() {
    const photoDropdown = document.querySelector('.dropdown-icon');
    if (photoDropdown) {
        photoDropdown.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const avatar = document.querySelector('.profile-avatar');
                        avatar.innerHTML = '<img src="' + event.target.result + '" style="width: 100%; height: 100%; object-fit: cover; border-radius: 7px;">';
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }
});

// Update age display based on birth date input
function updateAge() {
    const birthDateInput = document.getElementById('birthDateInput');
    const ageDisplay = document.getElementById('ageDisplay');
    const agePrompt = document.getElementById('agePrompt');

    if (!birthDateInput) return;

    if (birthDateInput.value) {
        const birthDate = new Date(birthDateInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        ageDisplay.innerHTML = 'Age - <strong>' + age + '</strong>';
        agePrompt.style.display = 'none';
    } else {
        ageDisplay.innerHTML = 'Age - <strong>__</strong>';
        agePrompt.style.display = 'inline';
    }
}

// Update gender display based on gender select
function updateGender() {
    const genderSelect = document.getElementById('genderSelect');
    const genderDisplay = document.getElementById('genderDisplay');
    const genderPrompt = document.getElementById('genderPrompt');

    if (!genderSelect) return;

    if (genderSelect.value) {
        genderDisplay.innerHTML = genderSelect.value;
        genderPrompt.style.display = 'none';
    } else {
        genderDisplay.innerHTML = '-';
        genderPrompt.style.display = 'inline';
    }
}
