// My Wishes Page functionality

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

let wishesData = [
    {
        id: 1,
        name: 'Omega-3 Fish Oil',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        catalogPrice: 25,
        quantity: 0,
        photo: null,
        description: 'High-quality fish oil supplement'
    },
    {
        id: 2,
        name: 'Collagen Peptides',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        catalogPrice: 45,
        quantity: 0,
        photo: null,
        description: 'Skin and joint support'
    },
    {
        id: 3,
        name: 'Turmeric Curcumin',
        manufacturer: 'Solgar',
        category: 'Herbal',
        catalogPrice: 28,
        quantity: 0,
        photo: null,
        description: 'Anti-inflammatory support'
    },
    {
        id: 4,
        name: 'Ashwagandha Extract',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        catalogPrice: 32,
        quantity: 0,
        photo: null,
        description: 'Stress relief and energy'
    },
    {
        id: 5,
        name: 'Hyaluronic Acid',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        catalogPrice: 38,
        quantity: 0,
        photo: null,
        description: 'Skin hydration'
    }
];

// Master lists for manufacturers and categories
let manufacturersList = ['Nature Made', 'Solgar', 'Centrum', 'Vital Proteins', 'Garden of Life', 'Nature Bounty', 'NOW Foods', 'Himalaya'];
let categoriesList = ['Herbal', 'Mineral', 'Medic+', 'Cosmethic', 'Other'];

let selectedProductId = null;
let currentPanel = null;
let allWishesData = [];
let currentFilters = {
    search: '',
    category: '',
    manufacturer: '',
    priceMin: '',
    priceMax: '',
    sortOrder: 'asc'
};

document.addEventListener('DOMContentLoaded', function() {
    allWishesData = [...wishesData];
    populateWishesTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
    updateBreadcrumbFilters();
});

function populateWishesTable() {
    const tableBody = document.getElementById('wishesTable');
    tableBody.innerHTML = '';

    wishesData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'my-wishes-table-row';

        row.onclick = function() { selectRow(this, product.id); };

        row.innerHTML = `
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); viewProductDetails(${product.id}); return false;">
                    ${product.name}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewProductPhoto(${product.id}); return false;">
                    View photo
                </a>
            </td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.catalogPrice)}</td>
            <td style="text-align: right; display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="wishTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 120px;" onclick="event.stopPropagation();">
                    <option value="" selected>select action</option>
                    <option value="orders">to Orders</option>
                    <option value="instock">In stock</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); applyWishAction(${product.id});">Apply</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function selectRow(element, productId) {
    document.querySelectorAll('#wishesTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedProductId = productId;
}

function viewProductDetails(productId) {
    selectedProductId = productId;
    showInfo();
}

function viewProductPhoto(productId) {
    const product = wishesData.find(b => b.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closePhotoModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'photo-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'photo-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closePhotoModal;

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

function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.remove();
    }
}

function addBudTo(productId) {
    const product = wishesData.find(b => b.id === productId);
    if (!product) return;

    const target = document.getElementById(`addTarget${productId}`).value;

    let targetName = '';
    switch(target) {
        case 'stock':
            targetName = 'Stock';
            break;
        case 'orders':
            targetName = 'Orders';
            break;
        case 'wishes':
            targetName = 'My wishes';
            break;
    }

    alert(`${product.name} added to ${targetName}!`);
}

function addToStock(productId) {
    const product = wishesData.find(b => b.id === productId);
    if (!product) return;
    alert(`${product.name} added to stock!`);
}

function checkInStock() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = wishesData.find(b => b.id === selectedProductId);
    if (!product) return;

    const status = product.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${product.name} is currently: ${status}`);
}

function addInOrders() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = wishesData.find(b => b.id === selectedProductId);
    if (!product) return;

    alert(`${product.name} added to orders!`);
}

function openAddWishModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeAddWishModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddWishModal()">×</button>

        <div class="add-user-modal-title">Add New Bud</div>

        <div class="form-rows">
            <!-- Left Column -->
            <div class="form-column">
                <div class="form-section">
                    <div class="form-section-label">Bud Name *</div>
                    <input type="text" class="auth-input" placeholder="Enter product name" id="newBudName">
                    <div class="warning-icon" id="newBudNameWarning">⚠️</div>
                    <div class="password-info" id="newBudNameInfo"></div>
                </div>

                <div class="form-section">
                    <div class="form-section-label">Manufacturer *</div>
                    <select class="auth-input" id="newBudManufacturer">
                        <option value="">Select manufacturer</option>
                        ${manufacturersList.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                    <div class="warning-icon" id="newBudManufacturerWarning">⚠️</div>
                </div>

                <div class="form-section">
                    <div class="form-section-label">Category *</div>
                    <select class="auth-input" id="newBudCategory">
                        <option value="">Select category</option>
                        ${categoriesList.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                    <div class="warning-icon" id="newBudCategoryWarning">⚠️</div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="form-column">
                <div class="form-section">
                    <div class="form-section-label">Price ($) *</div>
                    <input type="number" class="auth-input" placeholder="0" id="newBudPrice" min="0">
                    <div class="warning-icon" id="newBudPriceWarning">⚠️</div>
                </div>

                <div class="form-section">
                    <div class="form-section-label">In Stock</div>
                    <select class="auth-input" id="newBudInStock">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div class="form-section">
                    <div class="form-section-label">Photo (optional)</div>
                    <input type="file" class="auth-input" id="newBudPhoto" accept="image/*" style="padding: 8px;">
                    <div class="password-info" id="newBudPhotoInfo" style="font-size: 11px;">Select an image file</div>
                </div>
            </div>
        </div>

        <div class="form-section" style="margin-bottom: 20px;">
            <div class="form-section-label">Description (optional)</div>
            <textarea class="auth-input" placeholder="Enter description" id="newBudDescription" rows="3" style="resize: vertical;"></textarea>
        </div>

        <div class="info-text">* Required fields</div>

        <button class="save-user-btn" onclick="saveNewWish()">
            ✓ Save new Bud
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setupNewWishValidation();
}

function closeAddWishModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function setupNewWishValidation() {
    document.getElementById('newBudName').addEventListener('change', validateNewWishName);
    document.getElementById('newBudManufacturer').addEventListener('change', validateNewWishManufacturer);
    document.getElementById('newBudCategory').addEventListener('change', validateNewWishCategory);
    document.getElementById('newBudPrice').addEventListener('change', validateNewWishPrice);
}

function validateNewWishName() {
    const name = document.getElementById('newBudName').value.trim();
    const warning = document.getElementById('newBudNameWarning');
    const info = document.getElementById('newBudNameInfo');

    if (!name) {
        warning.classList.remove('show');
        info.textContent = '';
        return false;
    }

    if (name.length < 3) {
        warning.classList.add('show');
        info.textContent = 'Name must be at least 3 characters ❌';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Name is valid ✓';
    info.style.color = 'var(--light-green)';
    return true;
}

function validateNewWishManufacturer() {
    const manufacturer = document.getElementById('newBudManufacturer').value;
    const warning = document.getElementById('newBudManufacturerWarning');

    if (!manufacturer) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewWishCategory() {
    const category = document.getElementById('newBudCategory').value;
    const warning = document.getElementById('newBudCategoryWarning');

    if (!category) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewWishPrice() {
    const price = document.getElementById('newBudPrice').value;
    const warning = document.getElementById('newBudPriceWarning');

    if (!price || price <= 0) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function saveNewWish() {
    const nameValid = validateNewWishName();
    const manufacturerValid = validateNewWishManufacturer();
    const categoryValid = validateNewWishCategory();
    const priceValid = validateNewWishPrice();

    if (!nameValid) {
        alert('Please enter a valid product name (at least 3 characters)');
        return;
    }

    if (!manufacturerValid) {
        alert('Please select a manufacturer');
        return;
    }

    if (!categoryValid) {
        alert('Please select a category');
        return;
    }

    if (!priceValid) {
        alert('Please enter a valid price');
        return;
    }

    // Handle photo file
    const photoInput = document.getElementById('newBudPhoto');
    let photoUrl = null;

    if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        photoUrl = URL.createObjectURL(file);
    }

    const newBud = {
        id: wishesData.length > 0 ? Math.max(...allWishesData.map(b => b.id)) + 1 : 1,
        name: document.getElementById('newBudName').value.trim(),
        manufacturer: document.getElementById('newBudManufacturer').value,
        category: document.getElementById('newBudCategory').value,
        price: parseInt(document.getElementById('newBudPrice').value),
        inStock: document.getElementById('newBudInStock').value === 'true',
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || ''
    };

    allWishesData.push(newBud);
    wishesData.push(newBud);
    populateWishesTable();
    closeAddWishModal();

    alert('New product added successfully!');
}

function editBud() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (currentPanel === 'edit') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const product = wishesData.find(b => b.id === selectedProductId);
    if (!product) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Edit Bud</h3>

            <div class="user-photo-preview">
                ${product.photo ? '<img src="' + product.photo + '" alt="Bud photo">' : 'No photo'}
            </div>

            <div style="display: flex; gap: 5px; margin-bottom: 15px;">
                <button class="btn btn-success" style="flex: 1; font-size: 11px; padding: 6px;" onclick="addPhoto()">Add Photo</button>
                <button class="btn btn-secondary" style="flex: 1; font-size: 11px; padding: 6px;" onclick="changePhoto()">Change</button>
                <button class="btn btn-secondary" style="flex: 1; font-size: 11px; padding: 6px;" onclick="removePhoto()">Remove</button>
            </div>

            <div class="user-info-item">
                <label>Name:</label>
                <input type="text" class="edit-input" id="editName" value="${product.name}">
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <select class="edit-input" id="editManufacturer">
                    ${manufacturersList.map(m => `<option value="${m}" ${product.manufacturer === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <select class="edit-input" id="editCategory">
                    ${categoriesList.map(c => `<option value="${c}" ${product.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>

            <div class="user-info-item">
                <label>Price ($):</label>
                <input type="number" class="edit-input" id="editPrice" value="${product.price}">
            </div>

            <div class="user-info-item">
                <label>In Stock:</label>
                <select class="edit-input" id="editInStock">
                    <option value="true" ${product.inStock ? 'selected' : ''}>Yes</option>
                    <option value="false" ${!product.inStock ? 'selected' : ''}>No</option>
                </select>
            </div>

            <div class="user-info-item">
                <label>Description:</label>
                <textarea class="edit-input" id="editDescription" rows="3">${product.description}</textarea>
            </div>

            <div class="edit-actions">
                <button class="btn-save" onclick="saveBudChanges()">Save changes?</button>
                <button class="btn-cancel" onclick="cancelEdit()">Cancel</button>
            </div>
        </div>
    `;

    currentPanel = 'edit';
}

function addPhoto() {
    if (!selectedProductId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const product = wishesData.find(b => b.id === selectedProductId);
            if (product) {
                product.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo added successfully!');
            }
        }
    };

    fileInput.click();
}

function changePhoto() {
    if (!selectedProductId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const product = wishesData.find(b => b.id === selectedProductId);
            if (product) {
                product.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo changed successfully!');
            }
        }
    };

    fileInput.click();
}

function removePhoto() {
    if (!selectedProductId) return;
    if (confirm('Are you sure you want to remove the photo?')) {
        const product = wishesData.find(b => b.id === selectedProductId);
        if (product) {
            product.photo = null;
            editBud(); // Refresh edit panel
            alert('Photo removed successfully!');
        }
    }
}

function saveBudChanges() {
    if (!selectedProductId) return;

    const product = wishesData.find(b => b.id === selectedProductId);
    if (!product) return;

    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.price = parseInt(document.getElementById('editPrice').value);
    product.inStock = document.getElementById('editInStock').value === 'true';
    product.description = document.getElementById('editDescription').value;

    populateWishesTable();
    showInfo();

    alert('Changes saved successfully!');
}

function cancelEdit() {
    document.getElementById('rightPanelContent').innerHTML = '';
    currentPanel = null;
}

function showInfo() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const product = wishesData.find(b => b.id === selectedProductId);
    if (!product) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Bud Information</h3>

            <div class="user-photo-preview">
                ${product.photo ? '<img src="' + product.photo + '" alt="Bud photo">' : 'No photo'}
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
                <div class="value">${formatPrice(product.catalogPrice)}</div>
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

    currentPanel = 'info';
}

function deleteBud() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (confirm('Sure want delete this product?')) {
        const index = wishesData.findIndex(b => b.id === selectedProductId);
        if (index > -1) {
            wishesData.splice(index, 1);
            allWishesData = wishesData.filter(b => allWishesData.some(ab => ab.id === b.id));
            populateWishesTable();
            selectedProductId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Bud deleted successfully');
        }
    }
}

// Manufacturer List Management
function openManufacturerListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeManufacturerListModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';
    modalContent.style.maxWidth = '500px';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeManufacturerListModal()">×</button>

        <div class="add-user-modal-title">Edit Manufacturer List</div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Add New Manufacturer:</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="newManufacturerInput" placeholder="Enter manufacturer name"
                    style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                <button class="btn btn-success" onclick="addNewManufacturer()">Add</button>
            </div>
        </div>

        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Current Manufacturers:</label>
            <div id="manufacturerListContainer" style="max-height: 300px; overflow-y: auto; border: 2px solid var(--border-color); border-radius: 5px; padding: 10px;">
                ${manufacturersList.map(m => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid var(--border-color);">
                        <span>${m}</span>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;" onclick="removeManufacturer('${m}')">Remove</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeManufacturerListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewManufacturer() {
    const input = document.getElementById('newManufacturerInput');
    const newManufacturer = input.value.trim();

    if (!newManufacturer) {
        alert('Please enter a manufacturer name');
        return;
    }

    if (manufacturersList.includes(newManufacturer)) {
        alert('This manufacturer already exists');
        return;
    }

    manufacturersList.push(newManufacturer);
    manufacturersList.sort();
    input.value = '';

    // Refresh modal
    closeManufacturerListModal();
    openManufacturerListModal();
}

function removeManufacturer(manufacturer) {
    // Check if any products use this manufacturer
    const productsUsingManufacturer = wishesData.filter(b => b.manufacturer === manufacturer);

    if (productsUsingManufacturer.length > 0) {
        alert(`Cannot remove "${manufacturer}" because ${productsUsingManufacturer.length} product(s) are using it.`);
        return;
    }

    if (confirm(`Are you sure you want to remove "${manufacturer}"?`)) {
        manufacturersList = manufacturersList.filter(m => m !== manufacturer);

        // Refresh modal
        closeManufacturerListModal();
        openManufacturerListModal();
    }
}

// Category List Management
function openCategoryListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeCategoryListModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';
    modalContent.style.maxWidth = '500px';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeCategoryListModal()">×</button>

        <div class="add-user-modal-title">Edit Category List</div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Add New Category:</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="newCategoryInput" placeholder="Enter category name"
                    style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                <button class="btn btn-success" onclick="addNewCategory()">Add</button>
            </div>
        </div>

        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Current Categories:</label>
            <div id="categoryListContainer" style="max-height: 300px; overflow-y: auto; border: 2px solid var(--border-color); border-radius: 5px; padding: 10px;">
                ${categoriesList.map(c => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid var(--border-color);">
                        <span>${c}</span>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;" onclick="removeCategory('${c}')">Remove</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeCategoryListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewCategory() {
    const input = document.getElementById('newCategoryInput');
    const newCategory = input.value.trim();

    if (!newCategory) {
        alert('Please enter a category name');
        return;
    }

    if (categoriesList.includes(newCategory)) {
        alert('This category already exists');
        return;
    }

    categoriesList.push(newCategory);
    input.value = '';

    // Refresh modal
    closeCategoryListModal();
    openCategoryListModal();
}

function removeCategory(category) {
    // Check if any products use this category
    const productsUsingCategory = wishesData.filter(b => b.category === category);

    if (productsUsingCategory.length > 0) {
        alert(`Cannot remove "${category}" because ${productsUsingCategory.length} product(s) are using it.`);
        return;
    }

    if (confirm(`Are you sure you want to remove "${category}"?`)) {
        categoriesList = categoriesList.filter(c => c !== category);

        // Refresh modal
        closeCategoryListModal();
        openCategoryListModal();
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
            const tableBody = document.getElementById('wishesTable');
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

function applyFilters() {
    let filtered = [...allWishesData];

    // Category filter
    if (currentFilters.category) {
        filtered = filtered.filter(product => product.category === currentFilters.category);
    }

    // Manufacturer filter
    if (currentFilters.manufacturer) {
        filtered = filtered.filter(product => product.manufacturer === currentFilters.manufacturer);
    }

    // Price filter
    if (currentFilters.priceMin) {
        filtered = filtered.filter(product => product.price >= parseInt(currentFilters.priceMin));
    }
    if (currentFilters.priceMax) {
        filtered = filtered.filter(product => product.price <= parseInt(currentFilters.priceMax));
    }

    // Sort by name
    if (currentFilters.sortOrder === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilters.sortOrder === 'desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    wishesData = filtered;
    populateWishesTable();
    updateBreadcrumbFilters();
}

function updateBreadcrumbFilters() {
    const breadcrumb = document.getElementById('breadcrumbFilters');
    if (!breadcrumb) return;

    let filterText = 'Stock';

    // Sort order
    if (currentFilters.sortOrder === 'desc') {
        filterText += ' (Z-A)';
    } else {
        filterText += ' (A-Z)';
    }

    // Add active filters
    const activeFilters = [];
    if (currentFilters.category) activeFilters.push(currentFilters.category);
    if (currentFilters.manufacturer) activeFilters.push(currentFilters.manufacturer);
    if (currentFilters.priceMin || currentFilters.priceMax) {
        const priceRange = `$${currentFilters.priceMin || '0'}-${currentFilters.priceMax || '∞'}`;
        activeFilters.push(priceRange);
    }

    if (activeFilters.length > 0) {
        filterText += ' | ' + activeFilters.join(', ');
    }

    breadcrumb.textContent = filterText;
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

        <div class="filters-modal-title">Filter Stock</div>

        <div class="filter-group">
            <label class="filter-label">Sort by Name:</label>
            <select class="filter-select" id="filterSortOrder">
                <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A - Z</option>
                <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z - A</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Manufacturer:</label>
            <select class="filter-select" id="filterManufacturer">
                <option value="">All</option>
                ${manufacturersList.map(m => `<option value="${m}" ${currentFilters.manufacturer === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Category:</label>
            <select class="filter-select" id="filterCategory">
                <option value="">All</option>
                ${categoriesList.map(c => `<option value="${c}" ${currentFilters.category === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Price Range ($):</label>
            <div class="filter-range">
                <input type="number" placeholder="Min" id="filterPriceMin" value="${currentFilters.priceMin}">
                <span>-</span>
                <input type="number" placeholder="Max" id="filterPriceMax" value="${currentFilters.priceMax}">
            </div>
        </div>

        <div class="filter-actions">
            <button class="btn-apply-filters">Apply Filters</button>
            <button class="btn-reset-filters" onclick="resetFilters()">Reset</button>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

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
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;

    applyFilters();
    closeFiltersModal();
}

function resetFilters() {
    currentFilters = {
        search: '',
        category: '',
        manufacturer: '',
        priceMin: '',
        priceMax: '',
        sortOrder: 'asc'
    };

    wishesData = [...allWishesData];
    populateWishesTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
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

function applyWishAction(productId) {
    const product = wishesData.find(p => p.id === productId);
    if (!product) return;

    const target = document.getElementById(`wishTarget${productId}`).value;

    // Check if action is selected
    if (!target) {
        alert('Please select an action first');
        return;
    }

    let targetName = '';
    switch(target) {
        case 'orders':
            targetName = 'Orders';
            break;
        case 'instock':
            targetName = 'In stock';
            break;
    }

    alert(`${product.name} moved to ${targetName}!`);
}

function showAll() {
    // Reset all filters and sorting
    currentFilters = {
        search: '',
        category: '',
        manufacturer: '',
        priceMin: '',
        priceMax: '',
        sortOrder: 'asc',
        orderStatus: ''
    };

    // Reset search box
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.value = '';
    }

    // Restore all data
    wishesData = [...allWishesData];
    populateWishesTable();
    updateBreadcrumbFilters();
}

function deleteProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    if (confirm('Sure want delete this product?')) {
        const index = wishesData.findIndex(p => p.id === selectedProductId);
        if (index > -1) {
            wishesData.splice(index, 1);
            allWishesData = allWishesData.filter(p => p.id !== selectedProductId);
            populateWishesTable();
            selectedProductId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Product deleted successfully');
        }
    }
}

// Currency functions
function cycleCurrency() {
    const currentIndex = currencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    currentCurrency = currencies[nextIndex].code;
    const currencyText = document.getElementById('currencyText');
    currencyText.textContent = `💱 ${currentCurrency}`;
    populateWishesTable();
}

function convertPrice(priceInGEL, targetCurrency) {
    const currency = currencies.find(c => c.code === targetCurrency);
    if (!currency) return priceInGEL;
    const priceInUSD = priceInGEL / currencies.find(c => c.code === 'GEL').rateToUSD;
    return priceInUSD * currency.rateToUSD;
}

function formatPrice(priceInGEL, targetCurrency = currentCurrency) {
    const currency = currencies.find(c => c.code === targetCurrency);
    if (!currency) return `${priceInGEL.toFixed(2)} ₾`;
    const convertedPrice = convertPrice(priceInGEL, targetCurrency);
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
}

function openCurrencySettings() {
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
            <div class="currency-list-compact">${currenciesHTML}</div>
            <div class="add-currency-compact">
                <input type="text" id="newCurrencyCode" placeholder="Code" maxlength="3">
                <input type="text" id="newCurrencySymbol" placeholder="Symbol" maxlength="3">
                <input type="number" id="newCurrencyRate" placeholder="Rate" step="0.01" min="0.01">
                <button class="btn-add" onclick="addNewCurrency()" title="Add">+</button>
            </div>
            <button class="btn-update-rates" onclick="getUpdatedCurrencyRates()">Get Updated Currency Rates</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => { modal.querySelector('.currency-settings-modal-compact').classList.add('modal-expand'); }, 10);
}

function editCurrencyRate(index) {
    const currency = currencies[index];
    const newRate = prompt(`Enter new rate to USD for ${currency.code}:`, currency.rateToUSD);
    if (newRate !== null && !isNaN(newRate) && parseFloat(newRate) > 0) {
        currencies[index].rateToUSD = parseFloat(newRate);
        openCurrencySettings();
        document.querySelector('.modal').remove();
        populateWishesTable();
    }
}

function deleteCurrency(index) {
    const currency = currencies[index];
    if (confirm(`Delete ${currency.code} - ${currency.name}?`)) {
        currencies.splice(index, 1);
        if (currentCurrency === currency.code) {
            currentCurrency = 'GEL';
            document.getElementById('currencyText').textContent = `💱 ${currentCurrency}`;
        }
        openCurrencySettings();
        document.querySelector('.modal').remove();
        populateWishesTable();
    }
}

function addNewCurrency() {
    const code = document.getElementById('newCurrencyCode').value.trim().toUpperCase();
    const symbol = document.getElementById('newCurrencySymbol').value.trim();
    const rate = parseFloat(document.getElementById('newCurrencyRate').value);
    if (!code || !symbol || isNaN(rate) || rate <= 0) {
        alert('Please fill all fields correctly');
        return;
    }
    if (currencies.find(c => c.code === code)) {
        alert('Currency with this code already exists');
        return;
    }
    currencies.push({ code, name: code, symbol, rateToUSD: rate });
    openCurrencySettings();
    document.querySelector('.modal').remove();
}

function getUpdatedCurrencyRates() {
    alert('This feature will be implemented with backend API integration');
}
