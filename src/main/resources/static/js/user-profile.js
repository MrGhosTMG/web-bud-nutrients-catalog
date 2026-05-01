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

// Toggle profile fields visibility
function toggleProfileFields() {
    const fields = document.querySelectorAll('.profile-field');
    const saveBtn = document.getElementById('saveChangesBtn');

    fields.forEach(field => {
        if (field.style.display === 'none') {
            field.style.display = 'flex';
        } else {
            field.style.display = 'none';
            // Hide save button when closing fields
            saveBtn.style.display = 'none';
        }
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

// Toggle edit mode for individual fields and show Save Changes button
function toggleEditField(fieldId) {
    const input = document.getElementById(fieldId);
    const saveBtn = document.getElementById('saveChangesBtn');

    if (input.disabled !== false) {
        // Enable editing
        input.disabled = false;
        input.focus();
        input.style.backgroundColor = '#fffacd';

        // Show Save Changes button
        saveBtn.style.display = 'block';
    }
}

// Save all changes to profile fields
function saveChanges() {
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const saveBtn = document.getElementById('saveChangesBtn');

    // Update display values in profile-info-section
    const displayFullName = document.getElementById('displayFullName');
    const displayPhone = document.getElementById('displayPhone');
    const displayEmail = document.getElementById('displayEmail');

    if (fullNameInput.value) {
        displayFullName.textContent = fullNameInput.value;
    }
    if (phoneInput.value) {
        displayPhone.textContent = phoneInput.value;
    }
    if (emailInput.value) {
        displayEmail.textContent = emailInput.value;
    }

    // Disable all inputs
    [fullNameInput, phoneInput, emailInput].forEach(input => {
        if (input) {
            input.disabled = true;
            input.style.backgroundColor = 'white';
        }
    });

    // Hide Save Changes button
    saveBtn.style.display = 'none';

    // Here you would send the data to the server
    console.log('Profile changes saved');
    alert('Изменения сохранены!');
}

// Setup edit buttons functionality
function setupEditButtons() {
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
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
    // Get username from sessionStorage or localStorage
    const currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');

    // Update header username
    const headerUsername = document.getElementById('headerUsername');
    if (headerUsername && currentUser) {
        headerUsername.textContent = currentUser;
    }

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
function uploadPhoto() {
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
}

// Toggle additional info textarea
function toggleAdditionalInfo() {
    const textarea = document.getElementById('additionalInfo');
    const saveBtn = document.getElementById('saveAdditionalInfoBtn');
    if (textarea.style.display === 'none') {
        textarea.style.display = 'block';
        saveBtn.style.display = 'block';
    } else {
        textarea.style.display = 'none';
        saveBtn.style.display = 'none';
    }
}

// Save additional info
function saveAdditionalInfo() {
    const textarea = document.getElementById('additionalInfo');
    const info = textarea.value;

    if (info.trim()) {
        // Here you would send the data to the server
        console.log('Additional info saved:', info);
        alert('Дополнительная информация сохранена!');
    } else {
        alert('Пожалуйста, введите информацию перед сохранением.');
    }
}

// Toggle weight and height fields
function toggleWeightHeight() {
    const additionalStatsGroup = document.getElementById('additionalStatsGroup');
    const btn = document.getElementById('addWeightHeightBtn');

    if (additionalStatsGroup.style.display === 'none') {
        // Show all stats (age, sex, weight, height)
        additionalStatsGroup.style.display = 'block';
        btn.textContent = 'Hide Additional Stats';
    } else {
        // Hide all stats
        additionalStatsGroup.style.display = 'none';
        btn.textContent = 'Add Weight/Height';
    }
}

// Update weight display
function updateWeight() {
    const weightInput = document.getElementById('weightInput');
    const weightDisplay = document.getElementById('weightDisplay');
    const weightPrompt = document.getElementById('weightPrompt');

    if (weightInput.value) {
        weightDisplay.innerHTML = 'Weight - <strong>' + weightInput.value + ' kg</strong>';
        weightPrompt.style.display = 'none';

        // Check if all profile info fields are complete
        checkProfileInfoComplete();
    } else {
        weightDisplay.innerHTML = 'Weight - <strong>__ kg</strong>';
        weightPrompt.style.display = 'inline';
    }
}

// Update height display
function updateHeight() {
    const heightInput = document.getElementById('heightInput');
    const heightDisplay = document.getElementById('heightDisplay');
    const heightPrompt = document.getElementById('heightPrompt');

    if (heightInput.value) {
        heightDisplay.innerHTML = 'Height - <strong>' + heightInput.value + ' cm</strong>';
        heightPrompt.style.display = 'none';

        // Check if all profile info fields are complete
        checkProfileInfoComplete();
    } else {
        heightDisplay.innerHTML = 'Height - <strong>__ cm</strong>';
        heightPrompt.style.display = 'inline';
    }
}

// Edit profile info (unlock age, gender, weight, height fields)
function editProfileInfo() {
    const birthDateInput = document.getElementById('birthDateInput');
    const genderSelect = document.getElementById('genderSelect');
    const weightInput = document.getElementById('weightInput');
    const heightInput = document.getElementById('heightInput');
    const agePrompt = document.getElementById('agePrompt');
    const genderPrompt = document.getElementById('genderPrompt');
    const weightPrompt = document.getElementById('weightPrompt');
    const heightPrompt = document.getElementById('heightPrompt');
    const editBtn = document.getElementById('editProfileInfoBtn');

    // Show input fields again
    agePrompt.style.display = 'inline';
    genderPrompt.style.display = 'inline';
    weightPrompt.style.display = 'inline';
    heightPrompt.style.display = 'inline';

    // Enable inputs
    birthDateInput.disabled = false;
    genderSelect.disabled = false;
    weightInput.disabled = false;
    heightInput.disabled = false;

    // Hide edit button
    editBtn.style.display = 'none';
}

// Update age display based on birth date input
function updateAge() {
    const birthDateInput = document.getElementById('birthDateInput');
    const ageDisplay = document.getElementById('ageDisplay');
    const agePrompt = document.getElementById('agePrompt');
    const editBtn = document.getElementById('editProfileInfoBtn');

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

        // Check if both age and gender are set
        checkProfileInfoComplete();
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
        genderDisplay.innerHTML = 'Sex - <strong>' + genderSelect.value + '</strong>';
        genderPrompt.style.display = 'none';

        // Check if both age and gender are set
        checkProfileInfoComplete();
    } else {
        genderDisplay.innerHTML = 'Sex - <strong>__</strong>';
        genderPrompt.style.display = 'inline';
    }
}

// Check if both age and gender are set, then show Edit button
function checkProfileInfoComplete() {
    const birthDateInput = document.getElementById('birthDateInput');
    const genderSelect = document.getElementById('genderSelect');
    const editBtn = document.getElementById('editProfileInfoBtn');
    const profileFields = document.querySelectorAll('.profile-field');

    // Check if profile fields are visible (settings button was clicked)
    let fieldsVisible = false;
    profileFields.forEach(field => {
        if (field.style.display !== 'none') {
            fieldsVisible = true;
        }
    });

    // Only show Edit button if fields are visible AND age/gender are set
    if (fieldsVisible && birthDateInput.value && genderSelect.value) {
        editBtn.style.display = 'block';
    } else {
        editBtn.style.display = 'none';
    }
}
