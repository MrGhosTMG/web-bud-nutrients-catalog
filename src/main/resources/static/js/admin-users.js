// Admin Users Page functionality
let usersData = [
    {
        id: 1,
        name: 'John Doe',
        fullName: 'John Doe',
        phone: '+1 234 567 8901',
        email: 'john.doe@example.com',
        age: 28,
        gender: 'Male',
        weight: 75,
        height: 180,
        photo: null,
        additionalInfo: 'No health issues'
    },
    {
        id: 2,
        name: 'Jane Smith',
        fullName: 'Jane Smith',
        phone: '+1 234 567 8902',
        email: 'jane.smith@example.com',
        age: 32,
        gender: 'Female',
        weight: 62,
        height: 165,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 3,
        name: 'Mike Johnson',
        fullName: 'Mike Johnson',
        phone: '+1 234 567 8903',
        email: 'mike.j@example.com',
        age: 45,
        gender: 'Male',
        weight: 85,
        height: 175,
        photo: null,
        additionalInfo: 'Takes daily vitamins'
    },
    {
        id: 4,
        name: 'Sarah Williams',
        fullName: 'Sarah Williams',
        phone: '+1 234 567 8904',
        email: 'sarah.w@example.com',
        age: 29,
        gender: 'Female',
        weight: 58,
        height: 170,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 5,
        name: 'David Brown',
        fullName: 'David Brown',
        phone: '+1 234 567 8905',
        email: 'david.brown@example.com',
        age: 38,
        gender: 'Male',
        weight: 90,
        height: 185,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 6,
        name: 'Emily Davis',
        fullName: 'Emily Davis',
        phone: '+1 234 567 8906',
        email: 'emily.d@example.com',
        age: 26,
        gender: 'Female',
        weight: 55,
        height: 162,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 7,
        name: 'Robert Miller',
        fullName: 'Robert Miller',
        phone: '+1 234 567 8907',
        email: 'robert.m@example.com',
        age: 41,
        gender: 'Male',
        weight: 82,
        height: 178,
        photo: null,
        additionalInfo: 'Allergic to peanuts'
    },
    {
        id: 8,
        name: 'Lisa Anderson',
        fullName: 'Lisa Anderson',
        phone: '+1 234 567 8908',
        email: 'lisa.a@example.com',
        age: 35,
        gender: 'Female',
        weight: 60,
        height: 168,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 9,
        name: 'James Wilson',
        fullName: 'James Wilson',
        phone: '+1 234 567 8909',
        email: 'james.w@example.com',
        age: 50,
        gender: 'Male',
        weight: 88,
        height: 182,
        photo: null,
        additionalInfo: 'Diabetic'
    },
    {
        id: 10,
        name: 'Maria Garcia',
        fullName: 'Maria Garcia',
        phone: '+1 234 567 8910',
        email: 'maria.g@example.com',
        age: 27,
        gender: 'Female',
        weight: 57,
        height: 163,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 11,
        name: 'Thomas Martinez',
        fullName: 'Thomas Martinez',
        phone: '+1 234 567 8911',
        email: 'thomas.m@example.com',
        age: 43,
        gender: 'Male',
        weight: 79,
        height: 176,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 12,
        name: 'Jennifer Taylor',
        fullName: 'Jennifer Taylor',
        phone: '+1 234 567 8912',
        email: 'jennifer.t@example.com',
        age: 31,
        gender: 'Female',
        weight: 63,
        height: 167,
        photo: null,
        additionalInfo: 'Vegetarian'
    },
    {
        id: 13,
        name: 'Christopher Lee',
        fullName: 'Christopher Lee',
        phone: '+1 234 567 8913',
        email: 'chris.lee@example.com',
        age: 39,
        gender: 'Male',
        weight: 84,
        height: 179,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 14,
        name: 'Amanda White',
        fullName: 'Amanda White',
        phone: '+1 234 567 8914',
        email: 'amanda.w@example.com',
        age: 33,
        gender: 'Female',
        weight: 59,
        height: 166,
        photo: null,
        additionalInfo: ''
    },
    {
        id: 15,
        name: 'Daniel Harris',
        fullName: 'Daniel Harris',
        phone: '+1 234 567 8915',
        email: 'daniel.h@example.com',
        age: 47,
        gender: 'Male',
        weight: 91,
        height: 183,
        photo: null,
        additionalInfo: 'High blood pressure'
    }
];

// Initialize wishlists for users based on User's wishes data
// User ID 1 (John Doe) = John Smith in wishlist
usersData[0].wishlist = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', price: 20, inStock: false, photo: null, description: 'Supports muscle and nerve function' }
];

// User ID 2 (Jane Smith) = Sarah Johnson in wishlist
usersData[1].wishlist = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', price: 18, inStock: true, photo: null, description: 'Essential vitamin D supplement' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', price: 32, inStock: true, photo: null, description: 'Stress relief and energy' }
];

// User ID 3 (Mike Johnson) = Mike Davis in wishlist
usersData[2].wishlist = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 45, inStock: true, photo: null, description: 'Skin and joint support' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 13, name: 'Hyaluronic Acid', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 38, inStock: true, photo: null, description: 'Skin hydration' }
];

// User ID 4 (Sarah Williams) = Emily Wilson in wishlist
usersData[3].wishlist = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 45, inStock: true, photo: null, description: 'Skin and joint support' },
    { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', price: 35, inStock: true, photo: null, description: 'Digestive health support' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', price: 20, inStock: false, photo: null, description: 'Supports muscle and nerve function' }
];

// User ID 5 (David Brown) in wishlist
usersData[4].wishlist = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
    { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', price: 35, inStock: true, photo: null, description: 'Digestive health support' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', price: 32, inStock: true, photo: null, description: 'Stress relief and energy' },
    { id: 14, name: 'B-Complex Vitamins', manufacturer: 'Nature Made', category: 'Medic+', price: 19, inStock: false, photo: null, description: 'Energy and metabolism support' }
];

// User ID 6 (Emily Davis) = Lisa Anderson in wishlist
usersData[5].wishlist = [
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', price: 18, inStock: true, photo: null, description: 'Essential vitamin D supplement' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 45, inStock: true, photo: null, description: 'Skin and joint support' },
    { id: 13, name: 'Hyaluronic Acid', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 38, inStock: true, photo: null, description: 'Skin hydration' },
    { id: 14, name: 'B-Complex Vitamins', manufacturer: 'Nature Made', category: 'Medic+', price: 19, inStock: false, photo: null, description: 'Energy and metabolism support' }
];

// User ID 7 (Robert Miller) = Tom Martinez in wishlist
usersData[6].wishlist = [
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', price: 18, inStock: true, photo: null, description: 'Essential vitamin D supplement' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', price: 20, inStock: false, photo: null, description: 'Supports muscle and nerve function' }
];

// User ID 8 (Lisa Anderson) = Jessica Taylor in wishlist
usersData[7].wishlist = [
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 45, inStock: true, photo: null, description: 'Skin and joint support' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', price: 20, inStock: false, photo: null, description: 'Supports muscle and nerve function' },
    { id: 14, name: 'B-Complex Vitamins', manufacturer: 'Nature Made', category: 'Medic+', price: 19, inStock: false, photo: null, description: 'Energy and metabolism support' }
];

// User ID 9 (James Wilson) = Robert Garcia in wishlist
usersData[8].wishlist = [
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', price: 32, inStock: true, photo: null, description: 'Stress relief and energy' },
    { id: 9, name: 'Zinc Immune Support', manufacturer: 'NOW Foods', category: 'Medic+', price: 15, inStock: true, photo: null, description: 'Boosts immune system' }
];

// Other users have empty wishlists
for (let i = 9; i < usersData.length; i++) {
    usersData[i].wishlist = [];
}

let selectedUserId = null;
let currentPanel = null; // Track which panel is open: 'info', 'edit', or null
let navigationPath = ['Users']; // Track navigation breadcrumbs
let allUsersData = []; // Store all users for filtering
let currentFilters = {
    search: '',
    gender: '',
    ageMin: '',
    ageMax: '',
    sortOrder: 'asc'
};

document.addEventListener('DOMContentLoaded', function() {
    allUsersData = [...usersData]; // Copy all users
    populateUsersTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
    setupQuickSearch();
    updateBreadcrumbFilters();
});

function populateUsersTable() {
    const tableBody = document.getElementById('usersTable');
    tableBody.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.onclick = function() { selectRow(this, user.id); };

        row.innerHTML = `
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); viewUserProfile(${user.id}); return false;">
                    ${user.name}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewUserPhoto(${user.id}); return false;">
                    View profile photo
                </a>
            </td>
            <td style="text-align: right;">
                <button class="btn btn-primary" onclick="event.stopPropagation(); viewUserWishlist(${user.id});">Wish list</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function selectRow(element, userId) {
    // Remove active from all rows
    document.querySelectorAll('#usersTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    // Add active to clicked row
    element.classList.add('selected');
    selectedUserId = userId;
}

function viewUserProfile(userId) {
    selectedUserId = userId;
    showInfo();
}

function viewUserPhoto(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closePhotoModal();
        }
    };

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'photo-modal-content';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'photo-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closePhotoModal;

    // Title
    const title = document.createElement('div');
    title.className = 'photo-modal-title';
    title.textContent = user.fullName + "'s Profile Photo";

    // Photo or placeholder
    let photoElement;
    if (user.photo) {
        photoElement = document.createElement('img');
        photoElement.className = 'photo-modal-image';
        photoElement.src = user.photo;
        photoElement.alt = user.fullName + "'s photo";
    } else {
        photoElement = document.createElement('div');
        photoElement.className = 'photo-modal-placeholder';
        photoElement.textContent = 'No photo available';
    }

    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(photoElement);
    modal.appendChild(modalContent);

    // Add to body
    document.body.appendChild(modal);
}

function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.remove();
    }
}

function openAddUserModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeAddUserModal();
        }
    };

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'add-user-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddUserModal()">×</button>

        <div class="add-user-modal-title">Add New User</div>

        <div class="form-section">
            <div class="form-section-label">Username (min 6 characters)</div>
            <input type="text" class="auth-input" placeholder="" id="newUsername" style="width: 100%;">
            <div class="warning-icon" id="newUsernameWarning">⚠️</div>
            <div class="password-info" id="newUsernameInfo"></div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Full name (First Last)</div>
            <input type="text" class="auth-input" placeholder="" id="newFullName" style="width: 100%;">
            <div class="warning-icon" id="newFullNameWarning">⚠️</div>
            <div class="password-info" id="newFullNameInfo"></div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Password (min 8 characters, uppercase, number, special char)</div>
            <input type="password" class="auth-input" placeholder="" id="newPassword" style="width: 100%;">
            <div class="warning-icon" id="newPasswordWarning">⚠️</div>
            <div class="password-info" id="newPasswordInfo"></div>
            <div class="password-controls">
                <button class="password-btn password-btn-generate" onclick="generatePassword()">
                    🔑 Generate strong Password
                </button>
                <button class="password-btn" onclick="togglePasswordVisibility()">
                    👁️ Show password
                </button>
                <button class="password-btn" onclick="copyPassword()">
                    📋 Copy password
                </button>
            </div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Repeat password</div>
            <input type="password" class="auth-input" placeholder="" id="newPasswordRepeat" style="width: 100%;">
            <div class="warning-icon" id="newPasswordRepeatWarning">⚠️</div>
            <div class="password-info" id="newPasswordRepeatInfo"></div>
        </div>

        <div class="form-section">
            <div class="form-section-label">E-mail @</div>
            <input type="email" class="auth-input" placeholder="" id="newEmail" style="width: 100%;">
            <div class="warning-icon" id="newEmailWarning">⚠️</div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Phone number +(country code + number)</div>
            <input type="tel" class="auth-input" placeholder="" id="newPhone" style="width: 100%;">
            <div class="warning-icon" id="newPhoneWarning">⚠️</div>
        </div>

        <button class="save-user-btn" onclick="saveNewUser()" style="width: 100%;">
            ✓ Save new User
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Setup validation handlers
    setupNewUserValidation();
}

function closeAddUserModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function setupNewUserValidation() {
    document.getElementById('newUsername').addEventListener('change', validateNewUsername);
    document.getElementById('newFullName').addEventListener('change', validateNewFullName);
    document.getElementById('newPassword').addEventListener('change', validateNewPassword);
    document.getElementById('newPasswordRepeat').addEventListener('change', validateNewPasswordRepeat);
    document.getElementById('newEmail').addEventListener('change', validateNewEmail);
    document.getElementById('newPhone').addEventListener('change', validateNewPhone);
}

function validateNewUsername() {
    const username = document.getElementById('newUsername').value.trim();
    const warning = document.getElementById('newUsernameWarning');
    const info = document.getElementById('newUsernameInfo');

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

function validateNewFullName() {
    const fullName = document.getElementById('newFullName').value.trim();
    const warning = document.getElementById('newFullNameWarning');
    const info = document.getElementById('newFullNameInfo');

    if (!fullName) {
        warning.classList.remove('show');
        info.textContent = '';
        return false;
    }

    const parts = fullName.split(/\s+/);

    if (parts.length < 2) {
        warning.classList.add('show');
        info.textContent = 'Please enter both first name and last name ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    if (parts.length > 2) {
        warning.classList.add('show');
        info.textContent = 'Please enter only first name and last name ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

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

function validateNewPassword() {
    const password = document.getElementById('newPassword').value;
    const warning = document.getElementById('newPasswordWarning');
    const info = document.getElementById('newPasswordInfo');

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

function validateNewPasswordRepeat() {
    const password = document.getElementById('newPassword').value;
    const passwordRepeat = document.getElementById('newPasswordRepeat').value;
    const warning = document.getElementById('newPasswordRepeatWarning');
    const info = document.getElementById('newPasswordRepeatInfo');

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

function validateNewEmail() {
    const email = document.getElementById('newEmail').value;
    const warning = document.getElementById('newEmailWarning');
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

function validateNewPhone() {
    const phone = document.getElementById('newPhone').value;
    const warning = document.getElementById('newPhoneWarning');
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

function generatePassword() {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '@!#$%';
    const allChars = uppercase + lowercase + numbers + special;

    let password = '';
    // Ensure at least one of each required type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    // Set password in both fields
    document.getElementById('newPassword').value = password;
    document.getElementById('newPasswordRepeat').value = password;

    // Validate
    validateNewPassword();
    validateNewPasswordRepeat();

    alert('Strong password generated and filled in both fields!');
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('newPassword');
    const passwordRepeatField = document.getElementById('newPasswordRepeat');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordRepeatField.type = 'text';
    } else {
        passwordField.type = 'password';
        passwordRepeatField.type = 'password';
    }
}

function copyPassword() {
    const password = document.getElementById('newPassword').value;

    if (!password) {
        alert('No password to copy!');
        return;
    }

    navigator.clipboard.writeText(password).then(function() {
        alert('Password copied to clipboard!');
    }, function() {
        alert('Failed to copy password');
    });
}

function saveNewUser() {
    const usernameValid = validateNewUsername();
    const fullNameValid = validateNewFullName();
    const passwordValid = validateNewPassword();
    const passwordRepeatValid = validateNewPasswordRepeat();
    const email = document.getElementById('newEmail').value;
    const emailValid = validateNewEmail();

    if (!usernameValid) {
        alert('Username must be at least 6 characters');
        return;
    }

    if (!fullNameValid) {
        alert('Please enter your first name and last name separated by a space');
        return;
    }

    if (!passwordValid) {
        alert('Password is not strong enough');
        return;
    }

    if (!passwordRepeatValid) {
        alert('Passwords do not match');
        return;
    }

    if (!email) {
        alert('Please enter email');
        return;
    }

    if (!emailValid) {
        alert('Email is invalid');
        return;
    }

    const phone = document.getElementById('newPhone').value;
    if (phone && !validateNewPhone()) {
        alert('Phone number is invalid');
        return;
    }

    // Create new user
    const newUser = {
        id: usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1,
        name: document.getElementById('newFullName').value,
        fullName: document.getElementById('newFullName').value,
        phone: phone || 'Not provided',
        email: email,
        age: 0,
        gender: 'Not specified',
        weight: 0,
        height: 0,
        photo: null,
        additionalInfo: ''
    };

    usersData.push(newUser);
    populateUsersTable();
    closeAddUserModal();

    alert('New user added successfully!');
}

function viewUserWishlist(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const mainContent = document.querySelector('.main-content');
    const rightPanel = document.querySelector('.right-panel');

    // Save original content
    if (!mainContent.dataset.originalContent) {
        mainContent.dataset.originalContent = mainContent.innerHTML;
    }

    if (!rightPanel.dataset.originalContent) {
        rightPanel.dataset.originalContent = rightPanel.innerHTML;
    }

    // Update navigation path
    navigationPath = ['Users', user.fullName + "'s Wish List"];
    updateBreadcrumbs();

    // Initialize user wishlist if not exists
    if (!user.wishlist) {
        user.wishlist = [];
    }

    // Show wishlist management interface
    mainContent.innerHTML = `
        <div class="breadcrumbs"></div>

        <div class="content-header">
            <span class="content-title">${user.fullName}'s Wish List</span>
            <div class="btn-group">
                <input type="text" class="search-box" placeholder="Search..." id="wishlistSearchBox">
                <button class="btn btn-success" onclick="openAddProductsModal(${userId})">+ Add products</button>
            </div>
        </div>

        <!-- TABLE HEADER -->
        <div class="table-header" style="display: grid; grid-template-columns: 50px 1.5fr 1fr 1.2fr 1fr 0.8fr 0.8fr 1.2fr; background: var(--blue); color: white; padding: 12px; border-radius: 5px 5px 0 0; font-weight: bold;">
            <div class="table-header-cell"><input type="checkbox" id="selectAllWishlist" onchange="toggleSelectAllWishlist()" style="cursor: pointer;"></div>
            <div class="table-header-cell">Bud Name</div>
            <div class="table-header-cell">Photo</div>
            <div class="table-header-cell">Manufacturer</div>
            <div class="table-header-cell">Category</div>
            <div class="table-header-cell">Price</div>
            <div class="table-header-cell">In Stock</div>
            <div class="table-header-cell" style="text-align: right;">Actions</div>
        </div>

        <!-- TABLE -->
        <div class="table-container" style="max-height: 350px;">
            <table>
                <tbody id="userWishlistTable">
                    <!-- Content will be populated by JS -->
                </tbody>
            </table>
        </div>

        <!-- SORT CONTROLS -->
        <div style="margin-top: 15px; padding: 15px; border: 2px solid var(--border-color); border-radius: 5px; background: white; display: flex; align-items: center; gap: 15px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <label style="font-weight: bold; color: var(--blue);">Sort by:</label>
                <select id="wishlistSortBy" onchange="sortUserWishlist(${userId})" class="auth-input" style="padding: 8px; min-width: 200px;">
                    <option value="name">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="manufacturer">Manufacturer (A-Z)</option>
                    <option value="manufacturer-desc">Manufacturer (Z-A)</option>
                    <option value="category">Category (A-Z)</option>
                    <option value="category-desc">Category (Z-A)</option>
                    <option value="instock">In Stock First</option>
                    <option value="outofstock">Out of Stock First</option>
                </select>
            </div>
            <div style="display: flex; gap: 10px; margin-left: auto;">
                <button class="btn btn-success" onclick="addSelectedToOrders(${userId})">Add selected</button>
                <button class="btn btn-primary" onclick="addAllToOrders(${userId})">Add All</button>
                <button class="btn btn-secondary" onclick="markSelectedAsDone(${userId})">Mark as Done</button>
                <button class="btn btn-danger" onclick="removeSelectedFromWishlist(${userId})">Remove selected</button>
            </div>
        </div>

        <div style="margin-top: 20px; text-align: center;">
            <button class="btn btn-primary" onclick="restoreMainContent()" style="padding: 12px 30px; font-size: 16px;">
                Back to Users List
            </button>
        </div>
    `;

    // Update right panel with user info
    rightPanel.innerHTML = `
        <!-- User Information -->
        <div id="userInfoPanel">
            <div class="right-panel-content">
                <h3>User Information</h3>

                <div class="user-photo-preview">
                    ${user.photo ? '<img src="' + user.photo + '" alt="User photo">' : 'No photo'}
                </div>

                <div class="user-info-item">
                    <label>Full Name:</label>
                    <div class="value">${user.fullName}</div>
                </div>

                <div class="user-info-item">
                    <label>Username:</label>
                    <div class="value">${user.username}</div>
                </div>

                ${user.email ? `
                <div class="user-info-item">
                    <label>Email:</label>
                    <div class="value">${user.email}</div>
                </div>
                ` : ''}

                <div class="user-info-item">
                    <label>Wishlist Items:</label>
                    <div class="value">${user.wishlist ? user.wishlist.length : 0}</div>
                </div>
            </div>
        </div>

        <!-- Dynamic content area for selected product -->
        <div id="rightPanelContent"></div>

        <button class="logout-btn">Logout</button>
    `;

    // Re-render breadcrumbs
    updateBreadcrumbs();

    // Populate wishlist table
    populateUserWishlistTable(userId);

    // Setup search
    setupWishlistSearch(userId);

    // Setup logout button
    const logoutBtn = rightPanel.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
}

let selectedWishlistProductId = null;

function populateUserWishlistTable(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const tableBody = document.getElementById('userWishlistTable');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (!user.wishlist || user.wishlist.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: var(--dark-gray);">
                    No products in wish list. Click "Add products" to add some.
                </td>
            </tr>
        `;
        return;
    }

    user.wishlist.forEach(product => {
        const row = document.createElement('tr');
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '50px 1.5fr 1fr 1.2fr 1fr 0.8fr 0.8fr 1.2fr';
        row.style.padding = '10px';
        row.style.borderBottom = '1px solid var(--border-color)';
        row.style.cursor = 'pointer';
        row.dataset.productId = product.id;

        row.onclick = function(e) {
            if (e.target.type !== 'checkbox' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'A') {
                selectWishlistProduct(userId, product.id, row);
            }
        };

        const inStockBadge = product.inStock ?
            '<span style="color: var(--light-green); font-weight: bold;">Yes</span>' :
            '<span style="color: #9e9e9e; font-weight: bold;">No</span>';

        row.innerHTML = `
            <td style="display: flex; align-items: center; justify-content: center;">
                <input type="checkbox" class="wishlist-checkbox" data-product-id="${product.id}" onclick="event.stopPropagation();">
            </td>
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); event.preventDefault(); selectWishlistProduct(${userId}, ${product.id});">
                    ${product.name}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); event.preventDefault(); viewProductPhotoInWishlist(${product.id});">
                    View photo
                </a>
            </td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>${inStockBadge}</td>
            <td style="text-align: right; display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); addToOrders(${userId}, ${product.id});">Add Orders</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function selectWishlistProduct(userId, productId, rowElement) {
    // Remove previous selection
    document.querySelectorAll('#userWishlistTable tr').forEach(tr => {
        tr.classList.remove('selected');
    });

    // Add selection to clicked row
    if (rowElement) {
        rowElement.classList.add('selected');
    } else {
        const row = document.querySelector(`#userWishlistTable tr[data-product-id="${productId}"]`);
        if (row) row.classList.add('selected');
    }

    selectedWishlistProductId = productId;

    // Show product info in right panel
    showWishlistProductInfo(userId, productId);
}

function showWishlistProductInfo(userId, productId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    const product = user.wishlist.find(p => p.id === productId);
    if (!product) return;

    const contentDiv = document.getElementById('rightPanelContent');
    if (!contentDiv) return;

    contentDiv.innerHTML = `
        <div class="right-panel-content" style="margin-top: 20px;">
            <h3>Bud Information</h3>

            <div class="user-photo-preview">
                ${product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Name:</label>
                <div class="value">${product.name}</div>
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <div class="value">${product.manufacturer}</div>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <div class="value">${product.category}</div>
            </div>

            <div class="user-info-item">
                <label>Price:</label>
                <div class="value">$${product.price}</div>
            </div>

            <div class="user-info-item">
                <label>In Stock:</label>
                <div class="value">${product.inStock ? 'Yes' : 'No'}</div>
            </div>

            ${product.description ? `
            <div class="user-info-item">
                <label>Description:</label>
                <div class="value">${product.description}</div>
            </div>
            ` : ''}
        </div>
    `;
}

function addSelectedToOrders(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    const checkboxes = document.querySelectorAll('.wishlist-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.productId));

    if (selectedIds.length === 0) {
        alert('Please select products to add to orders');
        return;
    }

    const selectedProducts = user.wishlist.filter(p => selectedIds.includes(p.id));

    if (confirm(`Add ${selectedProducts.length} product(s) to Orders for ${user.fullName}?`)) {
        // In real app, this would add to orders system
        alert(`${selectedProducts.length} product(s) added to Orders!\n\nProducts:\n${selectedProducts.map(p => '- ' + p.name).join('\n')}`);

        // Uncheck all checkboxes
        checkboxes.forEach(cb => cb.checked = false);
        const selectAll = document.getElementById('selectAllWishlist');
        if (selectAll) selectAll.checked = false;
    }
}

function addAllToOrders(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    if (user.wishlist.length === 0) {
        alert('Wishlist is empty');
        return;
    }

    if (confirm(`Add all ${user.wishlist.length} product(s) from wishlist to Orders for ${user.fullName}?`)) {
        // In real app, this would add to orders system
        alert(`All ${user.wishlist.length} product(s) added to Orders!\n\nProducts:\n${user.wishlist.map(p => '- ' + p.name).join('\n')}`);
    }
}

function markSelectedAsDone(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    const checkboxes = document.querySelectorAll('.wishlist-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.productId));

    if (selectedIds.length === 0) {
        alert('Please select products to mark as done');
        return;
    }

    const selectedProducts = user.wishlist.filter(p => selectedIds.includes(p.id));

    if (confirm(`Mark ${selectedProducts.length} product(s) as done for ${user.fullName}?\n\nThese products will no longer appear in User's wishes tab.`)) {
        // Mark products as done (add isDone flag)
        user.wishlist.forEach(p => {
            if (selectedIds.includes(p.id)) {
                p.isDone = true;
            }
        });

        alert(`${selectedProducts.length} product(s) marked as done!\n\nProducts:\n${selectedProducts.map(p => '- ' + p.name).join('\n')}`);

        // Uncheck all checkboxes
        checkboxes.forEach(cb => cb.checked = false);
        const selectAll = document.getElementById('selectAllWishlist');
        if (selectAll) selectAll.checked = false;
    }
}

function removeSelectedFromWishlist(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const checkboxes = document.querySelectorAll('.wishlist-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.productId));

    if (selectedIds.length === 0) {
        alert('Please select products to remove');
        return;
    }

    if (confirm(`Remove ${selectedIds.length} product(s) from wish list?`)) {
        user.wishlist = user.wishlist.filter(p => !selectedIds.includes(p.id));
        populateUserWishlistTable(userId);

        // Uncheck select all
        const selectAll = document.getElementById('selectAllWishlist');
        if (selectAll) selectAll.checked = false;

        // Update user info panel
        const wishlistCount = document.querySelector('#userInfoPanel .user-info-item:last-child .value');
        if (wishlistCount) {
            wishlistCount.textContent = user.wishlist.length;
        }

        // Clear selected product info if it was deleted
        if (selectedIds.includes(selectedWishlistProductId)) {
            const contentDiv = document.getElementById('rightPanelContent');
            if (contentDiv) contentDiv.innerHTML = '';
            selectedWishlistProductId = null;
        }

        alert('Products removed from wish list');
    }
}

function deleteFromWishlist(userId, productId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    if (confirm('Remove this product from wish list?')) {
        user.wishlist = user.wishlist.filter(p => p.id !== productId);
        populateUserWishlistTable(userId);

        // Clear right panel
        const contentDiv = document.getElementById('rightPanelContent');
        if (contentDiv) contentDiv.innerHTML = '';

        selectedWishlistProductId = null;
        alert('Product removed from wish list');
    }
}

function addToOrders(userId, productId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    const product = user.wishlist.find(p => p.id === productId);
    if (!product) return;

    alert(`${product.name} added to orders!`);
}

function sortUserWishlist(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user || !user.wishlist) return;

    const sortBy = document.getElementById('wishlistSortBy').value;

    switch(sortBy) {
        case 'name':
            user.wishlist.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            user.wishlist.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'manufacturer':
            user.wishlist.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
            break;
        case 'manufacturer-desc':
            user.wishlist.sort((a, b) => b.manufacturer.localeCompare(a.manufacturer));
            break;
        case 'category':
            user.wishlist.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'category-desc':
            user.wishlist.sort((a, b) => b.category.localeCompare(a.category));
            break;
        case 'instock':
            user.wishlist.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
            break;
        case 'outofstock':
            user.wishlist.sort((a, b) => (a.inStock ? 1 : 0) - (b.inStock ? 1 : 0));
            break;
    }

    populateUserWishlistTable(userId);
}

function toggleSelectAllWishlist() {
    const selectAll = document.getElementById('selectAllWishlist');
    const checkboxes = document.querySelectorAll('.wishlist-checkbox');

    checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
    });
}

function setupWishlistSearch(userId) {
    const searchBox = document.getElementById('wishlistSearchBox');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#userWishlistTable tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? 'grid' : 'none';
            });
        });
    }
}

function viewProductPhotoInWishlist(productId) {
    // Find product in any user's wishlist
    let product = null;
    for (const user of usersData) {
        if (user.wishlist) {
            product = user.wishlist.find(p => p.id === productId);
            if (product) break;
        }
    }

    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'photo-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'photo-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => modal.remove();

    const title = document.createElement('div');
    title.className = 'photo-modal-title';
    title.textContent = product.name + "'s Photo";

    let photoElement;
    if (product.photo) {
        photoElement = document.createElement('img');
        photoElement.className = 'photo-modal-image';
        photoElement.src = product.photo;
        photoElement.alt = product.name + "'s photo";
    } else {
        photoElement = document.createElement('div');
        photoElement.className = 'photo-modal-placeholder';
        photoElement.textContent = 'No photo available';
    }

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(photoElement);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

function openAddProductsModal(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    // Create modal for adding products
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeAddProductsModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';
    modalContent.style.maxWidth = '900px';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddProductsModal()">×</button>

        <div class="add-user-modal-title">Add Products to ${user.fullName}'s Wish List</div>

        <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center;">
            <input type="text" class="auth-input" placeholder="Search products..." id="addProductSearch" style="flex: 1;">
            <button class="btn btn-success" onclick="addSelectedProductsToWishlist(${userId})" id="addSelectedBtn">Add selected</button>
        </div>

        <div style="max-height: 450px; overflow-y: auto; border: 2px solid var(--border-color); border-radius: 5px;">
            <table style="width: 100%;">
                <thead style="position: sticky; top: 0; background: var(--blue); color: white; z-index: 10;">
                    <tr style="display: grid; grid-template-columns: 50px 2fr 1.5fr 1fr 1fr 0.8fr; padding: 12px; font-weight: bold;">
                        <th style="display: flex; align-items: center; justify-content: center;">
                            <input type="checkbox" id="selectAllProducts" onchange="toggleSelectAllProducts()" style="cursor: pointer;">
                        </th>
                        <th style="text-align: left;">Product Name</th>
                        <th style="text-align: left;">Manufacturer</th>
                        <th style="text-align: left;">Category</th>
                        <th style="text-align: left;">Price</th>
                        <th style="text-align: left;">In Stock</th>
                    </tr>
                </thead>
                <tbody id="availableProductsList">
                    <!-- Will be populated by JS -->
                </tbody>
            </table>
        </div>

        <div style="margin-top: 20px; text-align: right;">
            <button class="btn btn-secondary" onclick="closeAddProductsModal()" style="margin-right: 10px;">Cancel</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Populate available products
    populateAvailableProducts(userId);

    // Setup search
    setupAddProductSearch();
}

function populateAvailableProducts(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const tbody = document.getElementById('availableProductsList');
    if (!tbody) return;

    // Mock products data (in real app, this would come from buds.js data)
    const allProducts = [
        { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', price: 25, inStock: true, photo: null, description: 'High-quality fish oil supplement' },
        { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', price: 18, inStock: true, photo: null, description: 'Essential vitamin D supplement' },
        { id: 3, name: 'Multivitamin Complex', manufacturer: 'Centrum', category: 'Medic+', price: 30, inStock: false, photo: null, description: 'Complete daily multivitamin' },
        { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', price: 45, inStock: true, photo: null, description: 'Skin and joint support' },
        { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', price: 35, inStock: true, photo: null, description: 'Digestive health support' },
        { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', price: 20, inStock: false, photo: null, description: 'Supports muscle and nerve function' },
        { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', price: 28, inStock: true, photo: null, description: 'Anti-inflammatory support' },
        { id: 8, name: 'Biotin Hair Growth', manufacturer: 'Nature Bounty', category: 'Cosmethic', price: 22, inStock: false, photo: null, description: 'Promotes healthy hair growth' },
        { id: 9, name: 'Zinc Immune Support', manufacturer: 'NOW Foods', category: 'Medic+', price: 15, inStock: true, photo: null, description: 'Boosts immune system' },
        { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', price: 32, inStock: true, photo: null, description: 'Stress relief and energy' }
    ];

    // Filter out products already in wishlist
    const wishlistIds = user.wishlist ? user.wishlist.map(p => p.id) : [];
    const availableProducts = allProducts.filter(p => !wishlistIds.includes(p.id));

    tbody.innerHTML = '';

    availableProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'available-product-row';
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '50px 2fr 1.5fr 1fr 1fr 0.8fr';
        row.style.padding = '10px';
        row.style.borderBottom = '1px solid var(--border-color)';

        const inStockBadge = product.inStock ?
            '<span style="color: var(--light-green); font-weight: bold;">Yes</span>' :
            '<span style="color: #9e9e9e; font-weight: bold;">No</span>';

        row.innerHTML = `
            <td style="display: flex; align-items: center; justify-content: center;">
                <input type="checkbox" class="product-checkbox"
                       data-product-id="${product.id}"
                       data-product-name="${product.name}"
                       data-product-manufacturer="${product.manufacturer}"
                       data-product-category="${product.category}"
                       data-product-price="${product.price}"
                       data-product-instock="${product.inStock}"
                       data-product-description="${product.description || ''}">
            </td>
            <td>${product.name}</td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>${inStockBadge}</td>
        `;
        tbody.appendChild(row);
    });

    if (availableProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px; color: var(--dark-gray);">
                    All products are already in the wish list
                </td>
            </tr>
        `;
    }
}

function toggleSelectAllProducts() {
    const selectAll = document.getElementById('selectAllProducts');
    const checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
    });
}

function setupAddProductSearch() {
    const searchBox = document.getElementById('addProductSearch');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.available-product-row');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? 'grid' : 'none';
            });
        });
    }
}

function addSelectedProductsToWishlist(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    const checkboxes = document.querySelectorAll('.product-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Please select products to add');
        return;
    }

    // Initialize wishlist if not exists
    if (!user.wishlist) {
        user.wishlist = [];
    }

    // Add selected products
    checkboxes.forEach(cb => {
        const product = {
            id: parseInt(cb.dataset.productId),
            name: cb.dataset.productName,
            manufacturer: cb.dataset.productManufacturer,
            category: cb.dataset.productCategory,
            price: parseFloat(cb.dataset.productPrice),
            inStock: cb.dataset.productInstock === 'true',
            photo: null,
            description: cb.dataset.productDescription
        };
        user.wishlist.push(product);
    });

    closeAddProductsModal();
    populateUserWishlistTable(userId);
    alert(`${checkboxes.length} product(s) added to wish list`);
}

function closeAddProductsModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function restoreMainContent() {
    const mainContent = document.querySelector('.main-content');
    const rightPanel = document.querySelector('.right-panel');

    if (mainContent.dataset.originalContent) {
        mainContent.innerHTML = mainContent.dataset.originalContent;
        delete mainContent.dataset.originalContent;

        // Reset navigation path
        navigationPath = ['Users'];
        updateBreadcrumbs();

        // Re-initialize after restoring
        populateUsersTable();
        setupSearch();
    }

    // Restore right panel
    if (rightPanel && rightPanel.dataset.originalContent) {
        rightPanel.innerHTML = rightPanel.dataset.originalContent;
        delete rightPanel.dataset.originalContent;

        // Re-setup logout button
        setupLogoutButton();
    }
}

function editUser() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }

    // Toggle: if edit panel is already open, close it
    if (currentPanel === 'edit') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const user = usersData.find(u => u.id === selectedUserId);
    if (!user) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Edit User</h3>

            <div class="user-photo-preview">
                ${user.photo ? '<img src="' + user.photo + '" alt="User photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Full Name:</label>
                <input type="text" class="edit-input" id="editFullName" value="${user.fullName}">
            </div>

            <div class="user-info-item">
                <label>Phone:</label>
                <input type="text" class="edit-input" id="editPhone" value="${user.phone}">
            </div>

            <div class="user-info-item">
                <label>Email:</label>
                <input type="email" class="edit-input" id="editEmail" value="${user.email}">
            </div>

            <div class="user-info-item">
                <label>Age:</label>
                <input type="number" class="edit-input" id="editAge" value="${user.age}">
            </div>

            <div class="user-info-item">
                <label>Gender:</label>
                <select class="edit-input" id="editGender">
                    <option value="Male" ${user.gender === 'Male' ? 'selected' : ''}>Male</option>
                    <option value="Female" ${user.gender === 'Female' ? 'selected' : ''}>Female</option>
                    <option value="Other" ${user.gender === 'Other' ? 'selected' : ''}>Other</option>
                </select>
            </div>

            <div class="user-info-item">
                <label>Weight (kg):</label>
                <input type="number" class="edit-input" id="editWeight" value="${user.weight}">
            </div>

            <div class="user-info-item">
                <label>Height (cm):</label>
                <input type="number" class="edit-input" id="editHeight" value="${user.height}">
            </div>

            <div class="user-info-item">
                <label>Additional Info:</label>
                <textarea class="edit-input" id="editAdditionalInfo" rows="3">${user.additionalInfo}</textarea>
            </div>

            <div class="edit-actions">
                <button class="btn-save" onclick="saveUserChanges()">Save changes?</button>
                <button class="btn-cancel" onclick="cancelEdit()">Cancel</button>
            </div>
        </div>
    `;

    currentPanel = 'edit';
}

function saveUserChanges() {
    if (!selectedUserId) return;

    const user = usersData.find(u => u.id === selectedUserId);
    if (!user) return;

    // Update user data
    user.fullName = document.getElementById('editFullName').value;
    user.name = user.fullName; // Update name in table
    user.phone = document.getElementById('editPhone').value;
    user.email = document.getElementById('editEmail').value;
    user.age = parseInt(document.getElementById('editAge').value);
    user.gender = document.getElementById('editGender').value;
    user.weight = parseInt(document.getElementById('editWeight').value);
    user.height = parseInt(document.getElementById('editHeight').value);
    user.additionalInfo = document.getElementById('editAdditionalInfo').value;

    // Refresh table
    populateUsersTable();

    // Show updated info
    showInfo();

    alert('Changes saved successfully!');
}

function cancelEdit() {
    document.getElementById('rightPanelContent').innerHTML = '';
    currentPanel = null;
}

function showInfo() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }

    // Toggle: if info panel is already open, close it
    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const user = usersData.find(u => u.id === selectedUserId);
    if (!user) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>User Information</h3>

            <div class="user-photo-preview">
                ${user.photo ? '<img src="' + user.photo + '" alt="User photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Full Name:</label>
                <div class="value">${user.fullName}</div>
            </div>

            <div class="user-info-item">
                <label>Phone:</label>
                <div class="value">${user.phone}</div>
            </div>

            <div class="user-info-item">
                <label>Email:</label>
                <div class="value">${user.email}</div>
            </div>

            <div class="user-info-item">
                <label>Age:</label>
                <div class="value">${user.age} years</div>
            </div>

            <div class="user-info-item">
                <label>Gender:</label>
                <div class="value">${user.gender}</div>
            </div>

            <div class="user-info-item">
                <label>Weight:</label>
                <div class="value">${user.weight} kg</div>
            </div>

            <div class="user-info-item">
                <label>Height:</label>
                <div class="value">${user.height} cm</div>
            </div>

            ${user.additionalInfo ? `
            <div class="user-info-item">
                <label>Additional Info:</label>
                <div class="value">${user.additionalInfo}</div>
            </div>
            ` : ''}
        </div>
    `;

    currentPanel = 'info';
}

function deleteUser() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }

    if (confirm('Sure want delete this user?')) {
        const index = usersData.findIndex(u => u.id === selectedUserId);
        if (index > -1) {
            usersData.splice(index, 1);
            populateUsersTable();
            selectedUserId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('User deleted successfully');
        }
    }
}

function setupMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.href.includes('#')) {
                return;
            }
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableBody = document.getElementById('usersTable');
            const rows = tableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const text = cells[0].textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                }
            });
        });
    }
}

function setupQuickSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    currentFilters.search = searchTerm;

    let filtered = allUsersData.filter(user => {
        // Search filter
        const matchesSearch = !currentFilters.search ||
            user.name.toLowerCase().includes(currentFilters.search) ||
            user.email.toLowerCase().includes(currentFilters.search);

        // Gender filter
        const matchesGender = !currentFilters.gender ||
            user.gender === currentFilters.gender;

        // Age filter
        const matchesAge = (!currentFilters.ageMin || user.age >= parseInt(currentFilters.ageMin)) &&
                          (!currentFilters.ageMax || user.age <= parseInt(currentFilters.ageMax));

        return matchesSearch && matchesGender && matchesAge;
    });

    // Sort by name
    if (currentFilters.sortOrder === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilters.sortOrder === 'desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    usersData = filtered;
    populateUsersTable();
    updateBreadcrumbFilters();
}

function openFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'filters-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeFiltersModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'filters-modal-content';

    modalContent.innerHTML = `
        <button class="filters-modal-close" onclick="closeFiltersModal()">×</button>

        <div class="filters-modal-title">Filter Users</div>

        <div class="filter-group">
            <label class="filter-label">Sort by Name:</label>
            <select class="filter-select" id="filterSortOrder">
                <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A - Z</option>
                <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z - A</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Gender:</label>
            <select class="filter-select" id="filterGender">
                <option value="">All</option>
                <option value="Male" ${currentFilters.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Female" ${currentFilters.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Other" ${currentFilters.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Age Range:</label>
            <div class="filter-range">
                <input type="number" placeholder="Min" id="filterAgeMin" value="${currentFilters.ageMin}">
                <span>-</span>
                <input type="number" placeholder="Max" id="filterAgeMax" value="${currentFilters.ageMax}">
            </div>
        </div>

        <div class="filter-actions">
            <button class="btn-apply-filters">Apply Filters</button>
            <button class="btn-reset-filters" onclick="resetFilters()">Reset</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Add event listener to Apply Filters button
    modalContent.querySelector('.btn-apply-filters').addEventListener('click', function() {
        applyAdvancedFilters();
    });
}

function closeFiltersModal() {
    const modal = document.querySelector('.filters-modal');
    if (modal) {
        modal.remove();
    }
}

function applyAdvancedFilters() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.gender = document.getElementById('filterGender').value;
    currentFilters.ageMin = document.getElementById('filterAgeMin').value;
    currentFilters.ageMax = document.getElementById('filterAgeMax').value;

    applyFilters();
    closeFiltersModal();
}

function resetFilters() {
    currentFilters = {
        search: '',
        gender: '',
        ageMin: '',
        ageMax: '',
        sortOrder: 'asc'
    };

    document.getElementById('searchInput').value = '';
    usersData = [...allUsersData];
    populateUsersTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
}

function updateBreadcrumbFilters() {
    const breadcrumb = document.getElementById('breadcrumbFilters');
    if (!breadcrumb) {
        console.log('Breadcrumb element not found');
        return;
    }

    let filterText = 'Users';

    // Sort order
    if (currentFilters.sortOrder === 'desc') {
        filterText += ' (Z-A)';
    } else {
        filterText += ' (A-Z)';
    }

    // Add active filters
    const activeFilters = [];
    if (currentFilters.gender) activeFilters.push(currentFilters.gender);
    if (currentFilters.ageMin || currentFilters.ageMax) {
        const ageRange = `Age: ${currentFilters.ageMin || '0'}-${currentFilters.ageMax || '∞'}`;
        activeFilters.push(ageRange);
    }

    if (activeFilters.length > 0) {
        filterText += ' | ' + activeFilters.join(', ');
    }

    breadcrumb.textContent = filterText;
    console.log('Breadcrumb updated:', filterText);
}

function openFilters() {
    openFiltersModal();
}

function updateBreadcrumbs() {
    const breadcrumbsDiv = document.querySelector('.breadcrumbs');
    if (!breadcrumbsDiv) return;

    breadcrumbsDiv.innerHTML = '';

    navigationPath.forEach((item, index) => {
        if (index > 0) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '=>';
            breadcrumbsDiv.appendChild(separator);
        }

        if (index === navigationPath.length - 1) {
            // Current page - not clickable
            const current = document.createElement('span');
            current.className = 'breadcrumb-current';
            current.textContent = item;
            breadcrumbsDiv.appendChild(current);
        } else {
            // Previous pages - clickable
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'breadcrumb-link';
            link.textContent = item;
            link.onclick = function(e) {
                e.preventDefault();
                navigateBack(index);
            };
            breadcrumbsDiv.appendChild(link);
        }
    });
}

function navigateBack(toIndex) {
    // Remove all items after the clicked index
    navigationPath = navigationPath.slice(0, toIndex + 1);

    // Restore main content if we're going back to Users
    if (navigationPath[navigationPath.length - 1] === 'Users') {
        restoreMainContent();
    }

    updateBreadcrumbs();
}

function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
}
