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

    // Save original content
    if (!mainContent.dataset.originalContent) {
        mainContent.dataset.originalContent = mainContent.innerHTML;
    }

    // Update navigation path
    navigationPath = ['Users', user.fullName + "'s Wish List"];
    updateBreadcrumbs();

    // Show under construction message
    mainContent.innerHTML = `
        <div class="breadcrumbs"></div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 40px;">
            <h2 style="color: var(--primary-green); font-size: 32px; margin-bottom: 20px;">
                Wish list of ${user.fullName}
            </h2>
            <div style="font-size: 48px; margin: 30px 0;">🚧</div>
            <h3 style="color: var(--blue); font-size: 24px; margin-bottom: 20px;">
                Under Construction
            </h3>
            <p style="color: var(--dark-gray); font-size: 16px; margin-bottom: 30px;">
                This feature is coming soon!
            </p>
            <button class="btn btn-primary" onclick="restoreMainContent()" style="padding: 12px 30px; font-size: 16px;">
                Back to Users List
            </button>
        </div>
    `;

    // Re-render breadcrumbs in the new content
    updateBreadcrumbs();
}

function restoreMainContent() {
    const mainContent = document.querySelector('.main-content');
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
