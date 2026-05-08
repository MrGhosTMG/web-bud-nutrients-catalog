// User profile page functionality

// Catalog data (imported from catalog-edit-admin)
let currentCatalogTab = 'seeAll'; // 'seeAll', 'sales', 'offers'
let currentCatalogViewMode = 'info'; // 'list' or 'info'
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

// Sales list - products on sale with sale prices
let salesList = [
    { productId: 1, salePrice: 20 },
    { productId: 3, salePrice: 25 },
    { productId: 11, salePrice: 15 },
    { productId: 13, salePrice: 10 },
    { productId: 15, salePrice: 18 },
    { productId: 18, salePrice: 30 },
    { productId: 21, salePrice: 28 },
    { productId: 26, salePrice: 14 },
    { productId: 32, salePrice: 12 },
    { productId: 2, salePrice: 14 },
    { productId: 6, salePrice: 16 },
    { productId: 9, salePrice: 11 },
    { productId: 16, salePrice: 20 },
    { productId: 22, salePrice: 19 },
    { productId: 27, salePrice: 22 },
    { productId: 35, salePrice: 17 },
    { productId: 38, salePrice: 13 }
];

// Offers list
let offersList = [
    { productId: 5, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 7, offerType: 'bundle', bundleWith: 6, offerDescription: 'Buy with Magnesium - 10% off' },
    { productId: 12, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 14, offerType: 'bundle', bundleWith: 13, offerDescription: 'Bundle with Moisturizing Shampoo - 15% off' },
    { productId: 20, offerType: 'custom', offerDescription: '3 for the price of 2' },
    { productId: 23, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 28, offerType: 'custom', offerDescription: 'Buy 2 Get 20% Off' },
    { productId: 34, offerType: 'bundle', bundleWith: 20, offerDescription: 'Bundle with CoQ10 - Save $10' },
    { productId: 4, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 10, offerType: 'custom', offerDescription: 'Buy 3 Get 25% Off' },
    { productId: 17, offerType: 'bundle', bundleWith: 10, offerDescription: 'Bundle with Ashwagandha - Save 15%' },
    { productId: 19, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 25, offerType: 'custom', offerDescription: '2 for the price of 1.5' },
    { productId: 30, offerType: 'bundle', bundleWith: 29, offerDescription: 'Bundle Deal - Save $8' },
    { productId: 36, offerType: 'buy1get1', offerDescription: 'Buy 1 Get 1 Free' },
    { productId: 39, offerType: 'custom', offerDescription: 'Buy 2 Get 30% Off' }
];

// User's wishlist - stores product IDs
let userWishlist = [1, 5, 12, 15, 20, 23, 28, 35]; // Example wishlist with 8 products

// User's product requests - stores custom requests
let userRequests = [
    { id: 1, productName: 'Vitamin B12 Complex', category: 'Vitamins', manufacturer: 'Solgar', photo: null, link: '', notes: 'Need high-dose formula', dateAdded: '2026-05-01' },
    { id: 2, productName: 'Omega-7 Sea Buckthorn', category: 'Herbal', manufacturer: 'Nordic Naturals', photo: null, link: 'https://example.com/product', notes: '', dateAdded: '2026-05-03' },
    { id: 3, productName: 'Collagen Type II', category: 'Cosmethic', manufacturer: 'Doctor\'s Best', photo: null, link: '', notes: 'For joint support', dateAdded: '2026-05-04' }
];
let nextRequestId = 4;

// Catalog data (only available products will be shown to users)
let catalogData = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', myPrice: 20, catalogPrice: 25, photo: 'img/1_57.jpg', description: 'High-quality fish oil supplement', isAvailable: true, addedDate: '2026-04-15' },
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', myPrice: 15, catalogPrice: 18, photo: 'img/1d9ad1b837c736cca82f2a9906d814f7.jpg', description: 'Essential vitamin D supplement', isAvailable: true, addedDate: '2026-04-16' },
    { id: 3, name: 'Multivitamin Complex', manufacturer: 'Centrum', category: 'Medic+', myPrice: 25, catalogPrice: 30, photo: 'img/401995455.jpg', description: 'Complete daily multivitamin', isAvailable: true, addedDate: '2026-04-17' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', myPrice: 38, catalogPrice: 45, photo: 'img/52b6a46665757423de80b2725987b296_600.jpg', description: 'Skin and joint support', isAvailable: false, addedDate: '2026-04-18' },
    { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', myPrice: 28, catalogPrice: 35, photo: 'img/758a.gif', description: 'Digestive health support', isAvailable: true, addedDate: '2026-04-19' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', myPrice: 16, catalogPrice: 20, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Supports muscle and nerve function', isAvailable: true, addedDate: '2026-04-20' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', myPrice: 23, catalogPrice: 28, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Anti-inflammatory support', isAvailable: true, addedDate: '2026-04-21' },
    { id: 8, name: 'Biotin Hair Growth', manufacturer: 'Nature Bounty', category: 'Cosmethic', myPrice: 18, catalogPrice: 22, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Promotes healthy hair growth', isAvailable: false, addedDate: '2026-04-22' },
    { id: 9, name: 'Zinc Immune Support', manufacturer: 'NOW Foods', category: 'Medic+', myPrice: 12, catalogPrice: 15, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Boosts immune system', isAvailable: true, addedDate: '2026-04-23' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', myPrice: 26, catalogPrice: 32, photo: 'img/original.jpg', description: 'Stress relief and energy support', isAvailable: true, addedDate: '2026-04-24' },
    { id: 11, name: 'Hydrating Face Cream', manufacturer: 'Neutrogena', category: 'Creams', myPrice: 14, catalogPrice: 18, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Deep hydration for dry skin', isAvailable: true, addedDate: '2026-04-25' },
    { id: 12, name: 'Anti-Aging Night Cream', manufacturer: 'Olay', category: 'Creams', myPrice: 22, catalogPrice: 28, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Reduces wrinkles and fine lines', isAvailable: true, addedDate: '2026-04-26' },
    { id: 13, name: 'Moisturizing Shampoo', manufacturer: 'Pantene', category: 'Shampoos', myPrice: 8, catalogPrice: 12, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'For dry and damaged hair', isAvailable: true, addedDate: '2026-04-27' },
    { id: 14, name: 'Strengthening Shampoo', manufacturer: 'Dove', category: 'Shampoos', myPrice: 9, catalogPrice: 13, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Strengthens weak hair', isAvailable: true, addedDate: '2026-04-28' },
    { id: 15, name: 'Vitamin C Serum', manufacturer: 'The Ordinary', category: 'Cosmethic', myPrice: 16, catalogPrice: 22, photo: 'img/original.jpg', description: 'Brightens skin tone', isAvailable: true, addedDate: '2026-04-29' },
    { id: 16, name: 'Calcium + D3', manufacturer: 'Nature Made', category: 'Mineral', myPrice: 18, catalogPrice: 24, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Bone health support', isAvailable: true, addedDate: '2026-04-30' },
    { id: 17, name: 'Green Tea Extract', manufacturer: 'NOW Foods', category: 'Herbal', myPrice: 14, catalogPrice: 19, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Antioxidant support', isAvailable: true, addedDate: '2026-05-01' },
    { id: 18, name: 'Eye Cream Anti-Puffiness', manufacturer: 'Clinique', category: 'Creams', myPrice: 28, catalogPrice: 36, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Reduces dark circles and puffiness', isAvailable: true, addedDate: '2026-05-02' },
    { id: 19, name: 'Volumizing Shampoo', manufacturer: 'TRESemmé', category: 'Shampoos', myPrice: 7, catalogPrice: 11, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Adds volume to fine hair', isAvailable: true, addedDate: '2026-05-03' },
    { id: 20, name: 'CoQ10 Supplement', manufacturer: 'Qunol', category: 'Medic+', myPrice: 24, catalogPrice: 32, photo: 'img/original.jpg', description: 'Heart health and energy', isAvailable: true, addedDate: '2026-05-04' },
    { id: 21, name: 'Retinol Night Cream', manufacturer: 'RoC', category: 'Creams', myPrice: 26, catalogPrice: 34, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Anti-aging retinol formula', isAvailable: false, addedDate: '2026-05-05' },
    { id: 22, name: 'Keratin Repair Shampoo', manufacturer: 'L\'Oreal', category: 'Shampoos', myPrice: 11, catalogPrice: 16, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Repairs damaged hair with keratin', isAvailable: true, addedDate: '2026-05-06' },
    { id: 23, name: 'Hyaluronic Acid Serum', manufacturer: 'Neutrogena', category: 'Cosmethic', myPrice: 19, catalogPrice: 26, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Deep hydration serum', isAvailable: true, addedDate: '2026-05-07' },
    { id: 24, name: 'Iron Supplement', manufacturer: 'Nature Made', category: 'Mineral', myPrice: 10, catalogPrice: 14, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Supports red blood cell production', isAvailable: true, addedDate: '2026-05-08' },
    { id: 25, name: 'Ginkgo Biloba', manufacturer: 'Nature\'s Bounty', category: 'Herbal', myPrice: 15, catalogPrice: 21, photo: 'img/original.jpg', description: 'Memory and cognitive support', isAvailable: true, addedDate: '2026-05-09' },
    { id: 26, name: 'SPF 50 Face Cream', manufacturer: 'Coppertone', category: 'Creams', myPrice: 12, catalogPrice: 17, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Sun protection face cream', isAvailable: true, addedDate: '2026-05-10' },
    { id: 27, name: 'Color Protection Shampoo', manufacturer: 'Garnier', category: 'Shampoos', myPrice: 9, catalogPrice: 14, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Protects colored hair', isAvailable: true, addedDate: '2026-05-11' },
    { id: 28, name: 'Niacinamide Serum', manufacturer: 'The Ordinary', category: 'Cosmethic', myPrice: 14, catalogPrice: 19, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Minimizes pores and evens skin tone', isAvailable: true, addedDate: '2026-05-12' },
    { id: 29, name: 'B-Complex Vitamins', manufacturer: 'Solgar', category: 'Medic+', myPrice: 17, catalogPrice: 23, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Energy and metabolism support', isAvailable: true, addedDate: '2026-05-13' },
    { id: 30, name: 'Echinacea Extract', manufacturer: 'Nature\'s Way', category: 'Herbal', myPrice: 13, catalogPrice: 18, photo: 'img/original.jpg', description: 'Immune system support', isAvailable: true, addedDate: '2026-05-14' },
    { id: 31, name: 'Aloe Vera Gel Cream', manufacturer: 'Vaseline', category: 'Creams', myPrice: 8, catalogPrice: 12, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Soothing aloe vera for skin', isAvailable: true, addedDate: '2026-05-15' },
    { id: 32, name: 'Anti-Dandruff Shampoo', manufacturer: 'Head & Shoulders', category: 'Shampoos', myPrice: 10, catalogPrice: 15, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Eliminates dandruff', isAvailable: true, addedDate: '2026-05-16' },
    { id: 33, name: 'Rosehip Oil', manufacturer: 'The Ordinary', category: 'Cosmethic', myPrice: 18, catalogPrice: 24, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Natural face oil for hydration', isAvailable: false, addedDate: '2026-05-17' },
    { id: 34, name: 'Glucosamine Chondroitin', manufacturer: 'Osteo Bi-Flex', category: 'Medic+', myPrice: 28, catalogPrice: 36, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Joint health support', isAvailable: true, addedDate: '2026-05-18' },
    { id: 35, name: 'Milk Thistle Extract', manufacturer: 'NOW Foods', category: 'Herbal', myPrice: 16, catalogPrice: 22, photo: 'img/original.jpg', description: 'Liver health support', isAvailable: true, addedDate: '2026-05-19' },
    { id: 36, name: 'Hand Cream Intensive Care', manufacturer: 'Nivea', category: 'Creams', myPrice: 6, catalogPrice: 10, photo: 'img/99eb5c6d0c8deca079e7399980404d3a.jpg', description: 'Deep moisturizing hand cream', isAvailable: true, addedDate: '2026-05-20' },
    { id: 37, name: 'Argan Oil Shampoo', manufacturer: 'OGX', category: 'Shampoos', myPrice: 12, catalogPrice: 17, photo: 'img/7b60abe1f49f14c8087c957899cf2c36.jpg', description: 'Nourishes with Moroccan argan oil', isAvailable: true, addedDate: '2026-05-21' },
    { id: 38, name: 'Peptide Complex Serum', manufacturer: 'The Ordinary', category: 'Cosmethic', myPrice: 21, catalogPrice: 28, photo: 'img/95f2a96ecc6188fadba72b31488042ce_er.jpg', description: 'Anti-aging peptide formula', isAvailable: true, addedDate: '2026-05-22' },
    { id: 39, name: 'Melatonin Sleep Aid', manufacturer: 'Nature Made', category: 'Medic+', myPrice: 11, catalogPrice: 16, photo: 'img/e2feb584f8e29d00946a00d18e45adfb_com.jpg', description: 'Promotes restful sleep', isAvailable: true, addedDate: '2026-05-23' },
    { id: 40, name: 'Valerian Root Extract', manufacturer: 'Nature\'s Way', category: 'Herbal', myPrice: 14, catalogPrice: 19, photo: 'img/original.jpg', description: 'Natural sleep and relaxation support', isAvailable: true, addedDate: '2026-05-24' }
];

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

            // Switch content based on tab
            switchTabContent(tabText);
        });
    });
}

// Switch tab content
function switchTabContent(tabName) {
    // Hide all tab contents
    const catalogContent = document.getElementById('catalogContent');
    const profileContent = document.getElementById('profileContent');
    const wishlistContent = document.getElementById('wishlistContent');

    catalogContent.style.display = 'none';
    profileContent.style.display = 'none';
    wishlistContent.style.display = 'none';

    // Show/hide catalog-only buttons
    const catalogOnlyButtons = document.querySelectorAll('.catalog-only');
    const wishlistOnlyButtons = document.querySelectorAll('.wishlist-only');

    // Show selected tab content
    if (tabName === 'Go to catalog') {
        catalogContent.style.display = 'block';
        // Show catalog-only buttons
        catalogOnlyButtons.forEach(btn => btn.style.display = btn.id === 'catalogDivider' ? 'block' : 'flex');
        // Hide wishlist-only buttons
        wishlistOnlyButtons.forEach(btn => btn.style.display = 'none');
        // Initialize catalog on first load
        populateCatalogInfoMode();
    } else if (tabName === 'Profile settings') {
        profileContent.style.display = 'block';
        // Hide catalog-only buttons
        catalogOnlyButtons.forEach(btn => btn.style.display = 'none');
        // Hide wishlist-only buttons
        wishlistOnlyButtons.forEach(btn => btn.style.display = 'none');
    } else if (tabName === 'Your wish list') {
        wishlistContent.style.display = 'block';
        // Hide catalog-only buttons
        catalogOnlyButtons.forEach(btn => btn.style.display = 'none');
        // Show wishlist-only buttons
        wishlistOnlyButtons.forEach(btn => btn.style.display = btn.id === 'wishlistDivider' ? 'block' : 'flex');
        // Populate wishlist
        populateWishlist();
    }
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

// ============================================
// CATALOG FUNCTIONS
// ============================================

// Switch catalog tab (See All, Sales, Offers)
function switchCatalogTab(tab) {
    currentCatalogTab = tab;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    let sectionName = '';
    if (tab === 'seeAll') {
        document.getElementById('tabCatalogSeeAll').classList.add('active');
        sectionName = 'See All';
    } else if (tab === 'sales') {
        document.getElementById('tabCatalogSales').classList.add('active');
        sectionName = "Sale's";
    } else if (tab === 'offers') {
        document.getElementById('tabCatalogOffers').classList.add('active');
        sectionName = 'Offers';
    }

    // Update breadcrumbs
    const sectionLink = document.getElementById('currentCatalogSection');
    sectionLink.textContent = sectionName;
    sectionLink.style.display = 'inline';
    document.getElementById('breadcrumbArrow').style.display = 'inline';
    document.getElementById('breadcrumbProductArrow').style.display = 'none';
    document.getElementById('currentProductName').textContent = '';

    // Refresh view based on current mode
    if (currentCatalogViewMode === 'list') {
        populateCatalogListMode();
    } else {
        populateCatalogInfoMode();
    }
}

// Get filtered data based on current tab
function getCatalogTabFilteredData() {
    // Only show available products to users
    let filtered = catalogData.filter(p => p.isAvailable === true);

    if (currentCatalogTab === 'sales') {
        const saleProductIds = salesList.map(s => s.productId);
        filtered = filtered.filter(p => saleProductIds.includes(p.id));
    } else if (currentCatalogTab === 'offers') {
        const offerProductIds = offersList.map(o => o.productId);
        filtered = filtered.filter(p => offerProductIds.includes(p.id));
    }

    return filtered;
}

// Populate catalog info mode (grid view with cards)
function populateCatalogInfoMode() {
    const listHeader = document.getElementById('catalogListModeHeader');
    const listContainer = document.getElementById('catalogListModeContainer');
    const infoContainer = document.getElementById('catalogInfoModeContainer');

    if (!infoContainer) return;

    // Show info mode, hide list mode
    if (listHeader) listHeader.style.display = 'none';
    if (listContainer) listContainer.style.display = 'none';
    infoContainer.style.display = 'grid';

    infoContainer.innerHTML = '';

    let filteredData = getCatalogTabFilteredData();

    if (filteredData.length === 0) {
        infoContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">No products available</div>';
        return;
    }

    filteredData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.onclick = () => viewProductDetails(product.id);

        const photoUrl = product.photo || 'https://via.placeholder.com/200x200?text=No+Photo';

        // Check if product is on sale
        const saleItem = salesList.find(s => s.productId === product.id);
        const priceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : `<span class="info-price">${formatPrice(product.catalogPrice)}</span>`;

        // Check if product has an offer
        const offer = offersList.find(o => o.productId === product.id);
        const offerBadge = offer
            ? `<div class="offer-badge">🎁 ${offer.offerDescription}</div>`
            : '';

        card.innerHTML = `
            <div class="info-card-photo" style="position: relative;">
                <img src="${photoUrl}" alt="${product.name}">
                ${saleItem ? '<div class="sale-ribbon">SALE</div>' : ''}
            </div>
            <div class="info-card-content">
                <h3 class="info-card-title">${product.name}</h3>
                ${offerBadge}
                <div class="info-card-details">
                    <div class="info-card-row">
                        <span class="info-label">Brand:</span>
                        <span>${product.manufacturer}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Category:</span>
                        <span>${product.category}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Price:</span>
                        ${priceDisplay}
                    </div>
                </div>
            </div>
        `;

        infoContainer.appendChild(card);
    });
}

// View product details (will be implemented later)
function viewProductDetails(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    alert(`Product details page for: ${product.name}\n\nThis will open a detailed view with "Add in My Wishes" button.`);
    // TODO: Implement detailed product view
}

// Search catalog
function searchCatalog() {
    if (currentCatalogViewMode === 'list') {
        searchCatalogList();
    } else {
        searchCatalogInfo();
    }
}

// Search catalog in list mode
function searchCatalogList() {
    const searchBox = document.getElementById('catalogSearchBox');
    const searchTerm = searchBox.value.toLowerCase();

    const tableBody = document.getElementById('catalogListTable');
    if (!tableBody) return;

    let filteredData = getCatalogTabFilteredData();

    if (searchTerm) {
        filteredData = filteredData.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.manufacturer.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    tableBody.innerHTML = '';

    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">No products found</td></tr>';
        return;
    }

    filteredData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '2fr 0.6fr 1fr 1fr 0.8fr 1fr';
        row.style.gap = '10px';
        row.onclick = () => viewProductDetails(product.id);

        const saleItem = salesList.find(s => s.productId === product.id);
        const priceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : formatPrice(product.catalogPrice);

        row.innerHTML = `
            <td style="padding-left: 10px;">${product.name}</td>
            <td><a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewCatalogPhoto(${product.id}); return false;">View photo</a></td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>${priceDisplay}</td>
            <td style="text-align: right; padding-right: 10px;">
                <button class="btn-small btn-success" onclick="addToWishlist(${product.id}); event.stopPropagation();">Add to Wishlist</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Search catalog in info mode
function searchCatalogInfo() {
    const searchBox = document.getElementById('catalogSearchBox');
    const searchTerm = searchBox.value.toLowerCase();

    const container = document.getElementById('catalogInfoModeContainer');
    if (!container) return;

    let filteredData = getCatalogTabFilteredData();

    if (searchTerm) {
        filteredData = filteredData.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.manufacturer.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    container.innerHTML = '';

    if (filteredData.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">No products found</div>';
        return;
    }

    filteredData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.onclick = () => viewProductDetails(product.id);

        const photoUrl = product.photo || 'https://via.placeholder.com/200x200?text=No+Photo';

        const saleItem = salesList.find(s => s.productId === product.id);
        const priceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : `<span class="info-price">${formatPrice(product.catalogPrice)}</span>`;

        const offer = offersList.find(o => o.productId === product.id);
        const offerBadge = offer
            ? `<div class="offer-badge">🎁 ${offer.offerDescription}</div>`
            : '';

        card.innerHTML = `
            <div class="info-card-photo" style="position: relative;">
                <img src="${photoUrl}" alt="${product.name}">
                ${saleItem ? '<div class="sale-ribbon">SALE</div>' : ''}
            </div>
            <div class="info-card-content">
                <h3 class="info-card-title">${product.name}</h3>
                ${offerBadge}
                <div class="info-card-details">
                    <div class="info-card-row">
                        <span class="info-label">Brand:</span>
                        <span>${product.manufacturer}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Category:</span>
                        <span>${product.category}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Price:</span>
                        ${priceDisplay}
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Open catalog filters modal (placeholder)
function openCatalogFiltersModal() {
    alert('Filters modal will be implemented here');
    // TODO: Implement filters modal
}

// Format price with currency
function formatPrice(price) {
    const currency = currencies.find(c => c.code === currentCurrency);
    if (!currency) return price;

    let convertedPrice = price;

    // Convert from GEL to target currency
    if (currentCurrency !== 'GEL') {
        // First convert GEL to USD, then to target currency
        const gelCurrency = currencies.find(c => c.code === 'GEL');
        const priceInUSD = price / gelCurrency.rateToUSD;
        convertedPrice = priceInUSD * currency.rateToUSD;
    }

    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
}

// ============================================
// REQUEST MODAL FUNCTIONS
// ============================================

// Open request modal
function openRequestModal() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close request modal
function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('requestForm').reset();
        document.getElementById('requestPhotoPreview').innerHTML = '';
    }
}

// Handle photo preview in request modal
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('requestPhoto');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const preview = document.getElementById('requestPhotoPreview');

            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    preview.innerHTML = `<img src="${event.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 5px;">`;
                };
                reader.readAsDataURL(file);
            } else {
                preview.innerHTML = '';
            }
        });
    }
});

// Submit request
function submitRequest(event) {
    event.preventDefault();

    const productName = document.getElementById('requestProductName').value;
    const category = document.getElementById('requestCategory').value;
    const manufacturer = document.getElementById('requestManufacturer').value;
    const link = document.getElementById('requestLink').value;
    const notes = document.getElementById('requestNotes').value;

    if (!productName || !category || !manufacturer) {
        alert('Please fill in all required fields');
        return;
    }

    // Capture photo data from preview
    const previewDiv = document.getElementById('requestPhotoPreview');
    const previewImg = previewDiv ? previewDiv.querySelector('img') : null;
    const photoData = previewImg ? previewImg.src : null;

    const request = {
        id: nextRequestId++,
        productName: productName,
        category: category,
        manufacturer: manufacturer,
        photo: photoData,
        link: link,
        notes: notes,
        dateAdded: new Date().toISOString().split('T')[0]
    };

    // Add to user requests
    userRequests.push(request);

    console.log('New product request:', request);

    alert(`Request created successfully!\n\nProduct: ${productName}\nCategory: ${category}\nManufacturer: ${manufacturer}\n\nYou can view it in "Your wish list" tab.`);

    // Close modal and reset form
    closeRequestModal();
    document.getElementById('requestForm').reset();
    document.getElementById('requestPhotoPreview').innerHTML = '';
}

// ============================================
// NAVIGATION & VIEW MODE FUNCTIONS
// ============================================

// Navigate to catalog from sidebar
function navigateToCatalog(tab) {
    // Switch to "Go to catalog" tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab')[0].classList.add('active'); // First tab is "Go to catalog"

    switchTabContent('Go to catalog');

    // Switch to specified catalog tab
    switchCatalogTab(tab);
}

// Toggle catalog view mode (List/Info)
function toggleCatalogViewMode() {
    currentCatalogViewMode = currentCatalogViewMode === 'list' ? 'info' : 'list';

    const viewModeText = document.getElementById('viewModeText');
    if (viewModeText) {
        viewModeText.textContent = currentCatalogViewMode === 'list' ? '🎴 Info Mode' : '📋 List Mode';
    }

    if (currentCatalogViewMode === 'list') {
        populateCatalogListMode();
    } else {
        populateCatalogInfoMode();
    }
}

// Populate catalog list mode (table view)
function populateCatalogListMode() {
    const listHeader = document.getElementById('catalogListModeHeader');
    const listContainer = document.getElementById('catalogListModeContainer');
    const infoContainer = document.getElementById('catalogInfoModeContainer');

    if (!listHeader || !listContainer || !infoContainer) return;

    // Show list mode, hide info mode
    listHeader.style.display = 'grid';
    listContainer.style.display = 'block';
    infoContainer.style.display = 'none';

    const tableBody = document.getElementById('catalogListTable');
    tableBody.innerHTML = '';

    let filteredData = getCatalogTabFilteredData();

    if (filteredData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">No products available</td></tr>';
        return;
    }

    filteredData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.style.display = 'grid';
        row.style.gridTemplateColumns = '2fr 0.6fr 1fr 1fr 0.8fr 1fr';
        row.style.gap = '10px';
        row.onclick = () => viewProductDetails(product.id);

        // Check if product is on sale
        const saleItem = salesList.find(s => s.productId === product.id);
        const priceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : formatPrice(product.catalogPrice);

        row.innerHTML = `
            <td style="padding-left: 10px;">${product.name}</td>
            <td><a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewCatalogPhoto(${product.id}); return false;">View photo</a></td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>${priceDisplay}</td>
            <td style="text-align: right; padding-right: 10px;">
                <button class="btn-small btn-success" onclick="addToWishlist(${product.id}); event.stopPropagation();">Add to Wishlist</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Cycle currency
function cycleCatalogCurrency() {
    const currentIndex = currencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    currentCurrency = currencies[nextIndex].code;

    const currencyText = document.getElementById('currencyText');
    if (currencyText) {
        currencyText.textContent = `💱 ${currentCurrency}`;
    }

    // Refresh current view without changing display mode
    const infoContainer = document.getElementById('catalogInfoModeContainer');
    const listContainer = document.getElementById('catalogListModeContainer');

    // Check which mode is currently visible
    if (infoContainer && infoContainer.style.display !== 'none') {
        populateCatalogInfoMode();
    } else if (listContainer && listContainer.style.display !== 'none') {
        populateCatalogListMode();
    }
}

// Open currency settings modal
function openCatalogCurrencySettings() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';

    let currenciesHTML = currencies.map((currency, index) => `
        <div class="currency-item-compact">
            <div class="currency-info-compact">
                <strong>${currency.code}</strong> ${currency.symbol}
                <span class="currency-rate">1 USD = ${currency.rateToUSD}</span>
            </div>
            <div class="currency-actions-compact">
                <button class="btn-icon" onclick="editCurrencyRate(${index})" title="Edit">✏️</button>
                ${currency.code !== 'GEL' ? `<button class="btn-icon btn-delete" onclick="deleteCurrency(${index})" title="Delete">🗑️</button>` : ''}
            </div>
        </div>
    `).join('');

    modal.innerHTML = `
        <div class="modal-content currency-settings-modal-compact">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <h3>Settings</h3>

            <div class="currency-list-compact">
                ${currenciesHTML}
            </div>

            <div class="add-currency-compact">
                <input type="text" id="newCurrencyCode" placeholder="Code" maxlength="3">
                <input type="text" id="newCurrencySymbol" placeholder="Symbol" maxlength="3">
                <input type="number" id="newCurrencyRate" placeholder="Rate" step="0.01" min="0.01">
                <button class="btn-add" onclick="addNewCurrency()" title="Add">+</button>
            </div>

            <div class="settings-checkboxes">
                <label class="settings-checkbox-label">
                    <input type="checkbox" id="saveViewMode" checked>
                    <span>Save View Mode</span>
                </label>
                <label class="settings-checkbox-label">
                    <input type="checkbox" id="saveCurrency" checked>
                    <span>Save Currency type</span>
                </label>
            </div>

            <button class="btn-update-rates" onclick="getUpdatedCurrencyRates()">
                Get Updated Currency Rates
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add animation class after a brief delay
    setTimeout(() => {
        modal.querySelector('.currency-settings-modal-compact').classList.add('modal-expand');
    }, 10);
}

// Edit currency rate
function editCurrencyRate(index) {
    const currency = currencies[index];
    const newRate = prompt(`Enter new rate to USD for ${currency.code}:`, currency.rateToUSD);

    if (newRate !== null && !isNaN(newRate) && parseFloat(newRate) > 0) {
        currencies[index].rateToUSD = parseFloat(newRate);
        openCatalogCurrencySettings();
        document.querySelector('.modal').remove();

        // Refresh display
        if (currentCatalogViewMode === 'list') {
            populateCatalogListMode();
        } else {
            populateCatalogInfoMode();
        }
    }
}

// Delete currency
function deleteCurrency(index) {
    const currency = currencies[index];

    if (confirm(`Delete ${currency.code}?`)) {
        currencies.splice(index, 1);

        // If deleted currency was active, switch to GEL
        if (currentCurrency === currency.code) {
            currentCurrency = 'GEL';
            document.getElementById('currencyText').textContent = `💱 ${currentCurrency}`;
        }

        openCatalogCurrencySettings();
        document.querySelector('.modal').remove();

        // Refresh display
        if (currentCatalogViewMode === 'list') {
            populateCatalogListMode();
        } else {
            populateCatalogInfoMode();
        }
    }
}

// Add new currency
function addNewCurrency() {
    const code = document.getElementById('newCurrencyCode').value.toUpperCase();
    const symbol = document.getElementById('newCurrencySymbol').value;
    const rate = parseFloat(document.getElementById('newCurrencyRate').value);

    if (!code || !symbol || !rate || rate <= 0) {
        alert('Please fill all fields with valid values');
        return;
    }

    currencies.push({ code, name: code, symbol, rateToUSD: rate });

    openCatalogCurrencySettings();
    document.querySelector('.modal').remove();
}

// Get updated currency rates
function getUpdatedCurrencyRates() {
    // TODO: Implement API call to backend for updated currency rates
    alert('This feature will be implemented with backend API integration');
}

// Show catalog main view
function showCatalogMain() {
    document.getElementById('catalogMainView').style.display = 'block';
    document.getElementById('productDetailView').style.display = 'none';

    // Update breadcrumbs - show only current section
    const sectionLink = document.getElementById('currentCatalogSection');
    let sectionName = '';
    if (currentCatalogTab === 'seeAll') sectionName = 'See All';
    if (currentCatalogTab === 'sales') sectionName = "Sale's";
    if (currentCatalogTab === 'offers') sectionName = 'Offers';

    sectionLink.textContent = sectionName;
    sectionLink.style.display = 'inline';
    document.getElementById('breadcrumbArrow').style.display = 'inline';
    document.getElementById('breadcrumbProductArrow').style.display = 'none';
    document.getElementById('currentProductName').textContent = '';

    // Refresh view
    if (currentCatalogViewMode === 'list') {
        populateCatalogListMode();
    } else {
        populateCatalogInfoMode();
    }
}

// View product details (full page view)
function viewProductDetails(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    // Hide main catalog view, show product detail view
    document.getElementById('catalogMainView').style.display = 'none';
    document.getElementById('productDetailView').style.display = 'block';

    // Update breadcrumbs
    const sectionLink = document.getElementById('currentCatalogSection');
    let sectionName = 'See All';
    if (currentCatalogTab === 'sales') sectionName = "Sale's";
    if (currentCatalogTab === 'offers') sectionName = 'Offers';

    sectionLink.textContent = sectionName;
    sectionLink.style.display = 'inline';
    document.getElementById('breadcrumbArrow').style.display = 'inline';
    document.getElementById('breadcrumbProductArrow').style.display = 'inline';
    document.getElementById('currentProductName').textContent = product.name;

    // Populate product detail view (FULL PAGE)
    const detailView = document.getElementById('productDetailView');
    const photoUrl = product.photo || 'https://via.placeholder.com/400x400?text=No+Photo';

    // Check if product is on sale
    const saleItem = salesList.find(s => s.productId === product.id);
    const priceDisplay = saleItem
        ? `<div class="preview-price"><span class="original-price" style="font-size: 18px;">${formatPrice(product.catalogPrice)}</span> <span class="sale-price" style="font-size: 24px;">${formatPrice(saleItem.salePrice)}</span></div>`
        : `<div class="preview-price">${formatPrice(product.catalogPrice)}</div>`;

    // Check if product has an offer
    const offer = offersList.find(o => o.productId === product.id);
    const offerBadge = offer
        ? `<div class="offer-badge" style="margin-bottom: 15px;">🎁 ${offer.offerDescription}</div>`
        : '';

    detailView.innerHTML = `
        <div class="preview-container" style="max-width: 100%; margin: 0; padding: 30px; background: white;">
            <div class="preview-header" style="display: flex; gap: 30px; margin-bottom: 30px;">
                <div class="preview-photo" style="flex-shrink: 0;">
                    <img src="${photoUrl}" alt="${product.name}" style="width: 400px; height: 400px; object-fit: cover; border-radius: 10px;">
                    ${saleItem ? '<div class="sale-ribbon">SALE</div>' : ''}
                </div>
                <div class="preview-info" style="flex-grow: 1;">
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 28px;">${product.name}</h2>
                    ${offerBadge}
                    <div style="margin-bottom: 15px; font-size: 16px;">
                        <strong>Brand:</strong> ${product.manufacturer}
                    </div>
                    <div style="margin-bottom: 15px; font-size: 16px;">
                        <strong>Category:</strong> ${product.category}
                    </div>
                    ${priceDisplay}
                </div>
            </div>
            <div class="preview-description" style="margin-bottom: 30px;">
                <h3 style="color: #333; margin-bottom: 15px; font-size: 20px;">Description</h3>
                <p style="color: #666; line-height: 1.8; font-size: 16px;">${product.description}</p>
            </div>
            <div class="preview-actions" style="display: flex; gap: 15px; margin-bottom: 20px;">
                <button class="preview-btn preview-btn-primary" onclick="addToWishlist(${product.id})" style="flex: 1; padding: 15px; background: var(--primary-green); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">Add to Wishlist</button>
                <button class="preview-btn preview-btn-secondary" onclick="requestProductInfo(${product.id})" style="flex: 1; padding: 15px; background: var(--blue); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;">Request Info</button>
            </div>
            <div class="preview-availability" style="text-align: center;">
                <span class="preview-status-available" style="color: var(--primary-green); font-weight: bold; font-size: 18px;">✓ Available</span>
            </div>
        </div>
    `;
}

// Add product to wishlist
function addToWishlist(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    // Check if already in wishlist
    if (userWishlist.includes(productId)) {
        alert(`"${product.name}" is already in your wishlist!`);
        return;
    }

    // Add to wishlist
    userWishlist.push(productId);
    alert(`"${product.name}" has been added to your wishlist!`);

    // Refresh wishlist view if currently displayed
    if (document.getElementById('wishlistContent').style.display === 'block') {
        populateWishlist();
    }
}

// Remove product from wishlist
function removeFromWishlist(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    const index = userWishlist.indexOf(productId);
    if (index > -1) {
        userWishlist.splice(index, 1);
        alert(`"${product.name}" has been removed from your wishlist.`);
        populateWishlist(); // Refresh the view
    }
}

// Populate wishlist view
function populateWishlist() {
    const wishlistContent = document.getElementById('wishlistContent');

    let html = `
        <div style="padding: 20px;">
            <!-- WISHLIST SECTION -->
            <div style="margin-bottom: 40px;">
                <div class="section-toggle" onclick="toggleSection('wishlist')" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 20px; margin-bottom: 15px;">
                    <h2 style="margin: 0;">Your Wishlist (${userWishlist.length} items)</h2>
                    <span id="wishlistToggleIcon">▼</span>
                </div>

                <div id="wishlistSectionContent">
                <!-- TABLE HEADER -->
                <div class="table-header" style="display: grid; grid-template-columns: 2fr 0.6fr 1fr 1fr 0.8fr 1fr; background: #f5f5f5; padding: 10px; border-radius: 5px; font-weight: 600; margin-bottom: 10px;">
                    <div class="table-header-cell" style="padding-left: 10px;">Product Name</div>
                    <div class="table-header-cell">Photo</div>
                    <div class="table-header-cell">Brand</div>
                    <div class="table-header-cell">Category</div>
                    <div class="table-header-cell">Price</div>
                    <div class="table-header-cell" style="text-align: right;">Actions</div>
                </div>

                <!-- TABLE CONTENT -->
                <div id="wishlistTableContainer" style="max-height: 220px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 5px;">
    `;

    if (userWishlist.length === 0) {
        html += `
            <div style="text-align: center; padding: 30px; color: #666;">
                <p>Your wishlist is empty. Browse the catalog to add products!</p>
            </div>
        `;
    } else {
        const wishlistProducts = catalogData.filter(p => userWishlist.includes(p.id));

        wishlistProducts.forEach(product => {
            const saleItem = salesList.find(s => s.productId === product.id);
            const priceDisplay = saleItem
                ? `<span class="original-price" style="text-decoration: line-through; color: #999; font-size: 12px;">${formatPrice(product.catalogPrice)}</span> <span class="sale-price" style="color: #e74c3c; font-weight: 600;">${formatPrice(saleItem.salePrice)}</span>`
                : `<span style="font-weight: 600;">${formatPrice(product.catalogPrice)}</span>`;

            html += `
                <div class="table-row" style="display: grid; grid-template-columns: 2fr 0.6fr 1fr 1fr 0.8fr 1fr; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; align-items: center;">
                    <div style="padding-left: 10px;">${product.name}</div>
                    <div><a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewCatalogPhoto(${product.id}); return false;">View photo</a></div>
                    <div>${product.manufacturer}</div>
                    <div>${product.category}</div>
                    <div>${priceDisplay}</div>
                    <div style="text-align: right; padding-right: 10px;">
                        <button class="btn btn-danger" style="font-size: 11px; padding: 5px 10px;" onclick="removeFromWishlist(${product.id})">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    html += `
                </div>

                <!-- SEND WISHLIST BUTTON -->
                <div style="margin-top: 15px; text-align: right;">
                    <button class="btn btn-primary" style="padding: 8px 20px;" onclick="sendWishlist()">Send my WishList</button>
                </div>
                </div>
            </div>

            <!-- REQUESTS SECTION -->
            <div>
                <div class="section-toggle" onclick="toggleSection('requests')" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 20px; margin-bottom: 15px;">
                    <h2 style="margin: 0;">Your Requests (${userRequests.length} items)</h2>
                    <span id="requestsToggleIcon">▼</span>
                </div>

                <div id="requestsSectionContent">
                <!-- TABLE HEADER -->
                <div class="table-header" style="display: grid; grid-template-columns: 2fr 0.6fr 1fr 1fr 1.5fr 1fr; background: #f5f5f5; padding: 10px; border-radius: 5px; font-weight: 600; margin-bottom: 10px;">
                    <div class="table-header-cell" style="padding-left: 10px;">Product Name</div>
                    <div class="table-header-cell">Photo</div>
                    <div class="table-header-cell">Brand</div>
                    <div class="table-header-cell">Category</div>
                    <div class="table-header-cell">Notes</div>
                    <div class="table-header-cell" style="text-align: right;">Actions</div>
                </div>

                <!-- TABLE CONTENT -->
                <div id="requestsTableContainer" style="max-height: 220px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 5px;">
    `;

    if (userRequests.length === 0) {
        html += `
            <div style="text-align: center; padding: 30px; color: #666;">
                <p>No requests yet. Use "Add Request" button in catalog to request products!</p>
            </div>
        `;
    } else {
        userRequests.forEach(request => {
            const notesDisplay = request.notes ? request.notes : '<span style="color: #999;">No notes</span>';

            const photoDisplay = request.photo
                ? `<a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewRequestPhoto(${request.id}); return false;">View photo</a>`
                : `<a href="#" class="user-photo-link" onclick="event.stopPropagation(); addRequestPhoto(${request.id}); return false;">Add photo</a>`;

            html += `
                <div class="table-row" style="display: grid; grid-template-columns: 2fr 0.6fr 1fr 1fr 1.5fr 1fr; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f0f0f0; align-items: center;">
                    <div style="padding-left: 10px;">${request.productName}</div>
                    <div>${photoDisplay}</div>
                    <div>${request.manufacturer}</div>
                    <div>${request.category}</div>
                    <div style="font-size: 12px; color: #666;">${notesDisplay}</div>
                    <div style="text-align: right; padding-right: 10px;">
                        <button class="btn btn-danger" style="font-size: 11px; padding: 5px 10px;" onclick="deleteRequest(${request.id})">Delete</button>
                    </div>
                </div>
            `;
        });
    }

    html += `
                </div>

                <!-- SEND REQUESTS BUTTON -->
                <div style="margin-top: 15px; text-align: right;">
                    <button class="btn btn-primary" style="padding: 8px 20px;" onclick="sendRequests()">Send my Requests</button>
                </div>
                </div>
            </div>
        </div>
    `;

    wishlistContent.innerHTML = html;
}

// Delete request from user requests
function deleteRequest(requestId) {
    const request = userRequests.find(r => r.id === requestId);
    if (!request) return;

    if (confirm(`Delete request for "${request.productName}"?`)) {
        const index = userRequests.findIndex(r => r.id === requestId);
        if (index > -1) {
            userRequests.splice(index, 1);
            populateWishlist(); // Refresh the view
        }
    }
}

// Send wishlist to admin
function sendWishlist() {
    if (userWishlist.length === 0) {
        alert('Your wishlist is empty!');
        return;
    }

    const wishlistProducts = catalogData.filter(p => userWishlist.includes(p.id));
    const productNames = wishlistProducts.map(p => p.name).join(', ');

    alert(`Your wishlist has been sent to admin!\n\nProducts (${userWishlist.length}):\n${productNames}\n\nAdmin will contact you soon.`);
    // TODO: Implement actual API call to notify admin
}

// Send requests to admin
function sendRequests() {
    if (userRequests.length === 0) {
        alert('You have no requests to send!');
        return;
    }

    const requestNames = userRequests.map(r => r.productName).join(', ');

    alert(`Your requests have been sent to admin!\n\nRequests (${userRequests.length}):\n${requestNames}\n\nAdmin will review and respond soon.`);
    // TODO: Implement actual API call to notify admin
}

// Request product info
function requestProductInfo(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    alert(`Info request sent for "${product.name}"\n\nAdmin will contact you with more details.`);
    // TODO: Implement actual request functionality
}

// View catalog photo in modal
function viewCatalogPhoto(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('photoModal');
    const img = document.getElementById('photoModalImage');

    if (modal && img) {
        img.src = product.photo || 'https://via.placeholder.com/350x250?text=No+Photo';
        img.alt = product.name;
        modal.style.display = 'flex';
    }
}

// Close photo modal
function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Wishlist currency functions
function cycleWishlistCurrency() {
    const currentIndex = currencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    currentCurrency = currencies[nextIndex].code;

    // Update button text
    document.getElementById('wishlistCurrencyText').textContent = `💱 ${currentCurrency}`;

    // Refresh wishlist to show new prices
    populateWishlist();
}

function openWishlistCurrencySettings() {
    const currentRate = currencies.find(c => c.code === 'GEL').rateToUSD;

    const newRate = prompt(`Current exchange rate:\n1 USD = ${currentRate} GEL\n\nEnter new rate (or cancel to keep current):`, currentRate);

    if (newRate !== null && !isNaN(newRate) && parseFloat(newRate) > 0) {
        currencies.find(c => c.code === 'GEL').rateToUSD = parseFloat(newRate);
        alert(`Exchange rate updated!\n1 USD = ${newRate} GEL`);

        // Refresh wishlist to show new prices
        populateWishlist();
    }
}

// ============================================
// SECTION TOGGLE FUNCTIONS
// ============================================

function toggleSection(section) {
    const content = document.getElementById(section + 'SectionContent');
    const icon = document.getElementById(section + 'ToggleIcon');
    if (!content || !icon) return;

    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▼';
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
    }
}

// ============================================
// REQUEST PHOTO FUNCTIONS
// ============================================

function viewRequestPhoto(requestId) {
    const request = userRequests.find(r => r.id === requestId);
    if (!request || !request.photo) return;

    const modal = document.getElementById('photoModal');
    const img = document.getElementById('photoModalImage');
    if (modal && img) {
        img.src = request.photo;
        img.alt = request.productName;
        modal.style.display = 'flex';
    }
}

function addRequestPhoto(requestId) {
    const request = userRequests.find(r => r.id === requestId);
    if (!request) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                request.photo = event.target.result;
                populateWishlist();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}


