// Stock Page functionality

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

let stockData = [
    {
        id: 1,
        name: 'Omega-3 Fish Oil',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        quantity: 45,
        photo: null,
        description: 'High-quality fish oil supplement'
    },
    {
        id: 2,
        name: 'Vitamin D3',
        manufacturer: 'Solgar',
        category: 'Mineral',
        myPrice: 15,
        catalogPrice: 18,
        quantity: 50,
        photo: null,
        description: 'Essential vitamin D supplement'
    },
    {
        id: 3,
        name: 'Multivitamin Complex',
        manufacturer: 'Centrum',
        category: 'Medic+',
        myPrice: 24,
        catalogPrice: 30,
        quantity: 0,
        photo: null,
        description: 'Complete daily multivitamin'
    },
    {
        id: 4,
        name: 'Collagen Peptides',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 36,
        catalogPrice: 45,
        quantity: 50,
        photo: null,
        description: 'Skin and joint support'
    },
    {
        id: 5,
        name: 'Probiotics',
        manufacturer: 'Garden of Life',
        category: 'Other',
        myPrice: 28,
        catalogPrice: 35,
        quantity: 50,
        photo: null,
        description: 'Digestive health support'
    },
    {
        id: 6,
        name: 'Magnesium Citrate',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        quantity: 50,
        photo: null,
        description: 'Supports muscle and nerve function'
    },
    {
        id: 7,
        name: 'Turmeric Curcumin',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        quantity: 50,
        photo: null,
        description: 'Anti-inflammatory support'
    },
    {
        id: 8,
        name: 'Biotin Hair Growth',
        manufacturer: 'Nature Bounty',
        category: 'Cosmethic',
        myPrice: 18,
        catalogPrice: 22,
        quantity: 0,
        photo: null,
        description: 'Promotes healthy hair growth'
    },
    {
        id: 9,
        name: 'Zinc Immune Support',
        manufacturer: 'NOW Foods',
        category: 'Medic+',
        myPrice: 12,
        catalogPrice: 15,
        quantity: 50,
        photo: null,
        description: 'Boosts immune system'
    },
    {
        id: 10,
        name: 'Ashwagandha Extract',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        myPrice: 26,
        catalogPrice: 32,
        quantity: 34,
        photo: null,
        description: 'Stress relief and energy'
    },
    {
        id: 11,
        name: 'Calcium Plus D',
        manufacturer: 'Centrum',
        category: 'Mineral',
        myPrice: 19,
        catalogPrice: 24,
        quantity: 50,
        photo: null,
        description: 'Bone health support'
    },
    {
        id: 12,
        name: 'Green Tea Extract',
        manufacturer: 'Garden of Life',
        category: 'Other',
        myPrice: 22,
        catalogPrice: 27,
        quantity: 50,
        photo: null,
        description: 'Antioxidant support'
    },
    {
        id: 13,
        name: 'Hyaluronic Acid',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 30,
        catalogPrice: 38,
        quantity: 50,
        photo: null,
        description: 'Skin hydration'
    },
    {
        id: 14,
        name: 'B-Complex Vitamins',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        myPrice: 15,
        catalogPrice: 19,
        quantity: 0,
        photo: null,
        description: 'Energy and metabolism support'
    },
    {
        id: 15,
        name: 'Ginkgo Biloba',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 21,
        catalogPrice: 26,
        quantity: 50,
        photo: null,
        description: 'Memory and cognitive support'
    }
];

// Master lists for manufacturers and categories
let manufacturersList = ['Nature Made', 'Solgar', 'Centrum', 'Vital Proteins', 'Garden of Life', 'Nature Bounty', 'NOW Foods', 'Himalaya'];
let categoriesList = ['Herbal', 'Mineral', 'Medic+', 'Cosmethic', 'Other'];

let selectedProductId = null;
let currentPanel = null;
let allStockData = [];
let currentFilters = {
    search: '',
    category: '',
    manufacturer: '',
    priceMin: '',
    priceMax: '',
    sortOrder: 'asc'
};

document.addEventListener('DOMContentLoaded', function() {
    allStockData = [...stockData];
    populateStockTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
    updateBreadcrumbFilters();
});

function populateStockTable() {
    const tableBody = document.getElementById('stockTable');
    tableBody.innerHTML = '';

    stockData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'in-stock-table-row';

        // Add styling based on quantity
        if (product.quantity === 0) {
            row.classList.add('out-of-stock');
        } else if (product.quantity <= 5) {
            row.classList.add('low-stock');
        }

        row.onclick = function() { selectRow(this, product.id); };

        // Determine quantity badge class
        let quantityBadgeClass = 'quantity-available';
        if (product.quantity === 0) {
            quantityBadgeClass = 'quantity-out';
        } else if (product.quantity <= 5) {
            quantityBadgeClass = 'quantity-low';
        }

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
            <td><span class="quantity-badge ${quantityBadgeClass}">${product.quantity}</span></td>
            <td>$${product.price}</td>
            <td style="text-align: right; display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="addTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 100px;" onclick="event.stopPropagation();">
                    <option value="catalog">to Catalog</option>
                    <option value="orders">to Orders</option>
                    <option value="wishes">my wishes</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); addProductTo(${product.id});">Add</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function selectRow(element, productId) {
    document.querySelectorAll('#stockTable tr').forEach(row => {
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
    const product = stockData.find(b => b.id === productId);
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
    const product = stockData.find(b => b.id === productId);
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
    const product = stockData.find(b => b.id === productId);
    if (!product) return;
    alert(`${product.name} added to stock!`);
}

function checkInStock() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = stockData.find(b => b.id === selectedProductId);
    if (!product) return;

    const status = product.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${product.name} is currently: ${status}`);
}

function addInOrders() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = stockData.find(b => b.id === selectedProductId);
    if (!product) return;

    alert(`${product.name} added to orders!`);
}

function openAddBudModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeAddBudModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddBudModal()">×</button>

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

        <button class="save-user-btn" onclick="saveNewBud()">
            ✓ Save new Bud
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setupNewBudValidation();
}

function closeAddBudModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function setupNewBudValidation() {
    document.getElementById('newBudName').addEventListener('change', validateNewBudName);
    document.getElementById('newBudManufacturer').addEventListener('change', validateNewBudManufacturer);
    document.getElementById('newBudCategory').addEventListener('change', validateNewBudCategory);
    document.getElementById('newBudPrice').addEventListener('change', validateNewBudPrice);
}

function validateNewBudName() {
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

function validateNewBudManufacturer() {
    const manufacturer = document.getElementById('newBudManufacturer').value;
    const warning = document.getElementById('newBudManufacturerWarning');

    if (!manufacturer) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewBudCategory() {
    const category = document.getElementById('newBudCategory').value;
    const warning = document.getElementById('newBudCategoryWarning');

    if (!category) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewBudPrice() {
    const price = document.getElementById('newBudPrice').value;
    const warning = document.getElementById('newBudPriceWarning');

    if (!price || price <= 0) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function saveNewBud() {
    const nameValid = validateNewBudName();
    const manufacturerValid = validateNewBudManufacturer();
    const categoryValid = validateNewBudCategory();
    const priceValid = validateNewBudPrice();

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
        id: stockData.length > 0 ? Math.max(...allStockData.map(b => b.id)) + 1 : 1,
        name: document.getElementById('newBudName').value.trim(),
        manufacturer: document.getElementById('newBudManufacturer').value,
        category: document.getElementById('newBudCategory').value,
        price: parseInt(document.getElementById('newBudPrice').value),
        inStock: document.getElementById('newBudInStock').value === 'true',
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || ''
    };

    allStockData.push(newBud);
    stockData.push(newBud);
    populateStockTable();
    closeAddBudModal();

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

    const product = stockData.find(b => b.id === selectedProductId);
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
            const product = stockData.find(b => b.id === selectedProductId);
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
            const product = stockData.find(b => b.id === selectedProductId);
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
        const product = stockData.find(b => b.id === selectedProductId);
        if (product) {
            product.photo = null;
            editBud(); // Refresh edit panel
            alert('Photo removed successfully!');
        }
    }
}

function saveBudChanges() {
    if (!selectedProductId) return;

    const product = stockData.find(b => b.id === selectedProductId);
    if (!product) return;

    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.price = parseInt(document.getElementById('editPrice').value);
    product.inStock = document.getElementById('editInStock').value === 'true';
    product.description = document.getElementById('editDescription').value;

    populateStockTable();
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

    const product = stockData.find(b => b.id === selectedProductId);
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

    currentPanel = 'info';
}

function deleteBud() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (confirm('Sure want delete this product?')) {
        const index = stockData.findIndex(b => b.id === selectedProductId);
        if (index > -1) {
            stockData.splice(index, 1);
            allStockData = stockData.filter(b => allStockData.some(ab => ab.id === b.id));
            populateStockTable();
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
    const productsUsingManufacturer = stockData.filter(b => b.manufacturer === manufacturer);

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
    const productsUsingCategory = stockData.filter(b => b.category === category);

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
            const tableBody = document.getElementById('stockTable');
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
    let filtered = [...allStockData];

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

    stockData = filtered;
    populateStockTable();
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

    stockData = [...allStockData];
    populateStockTable();
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

// Sort functions for In Stock page
function sortByAvailable() {
    stockData = [...allStockData].filter(p => p.quantity > 5).sort((a, b) => b.quantity - a.quantity);
    currentFilters.stockStatus = 'available';
    populateStockTable();
    updateBreadcrumbFilters();
}

function sortByOutOfStock() {
    stockData = [...allStockData].filter(p => p.quantity === 0);
    currentFilters.stockStatus = 'outofstock';
    populateStockTable();
    updateBreadcrumbFilters();
}

function sortByLowStock() {
    stockData = [...allStockData].filter(p => p.quantity > 0).sort((a, b) => a.quantity - b.quantity);
    currentFilters.stockStatus = 'lowstock';
    populateStockTable();
    updateBreadcrumbFilters();
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
        stockStatus: ''
    };

    // Reset search box
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.value = '';
    }

    // Restore all data
    stockData = [...allStockData];
    populateStockTable();
    updateBreadcrumbFilters();
}

function deleteProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    if (confirm('Sure want delete this product?')) {
        const index = stockData.findIndex(p => p.id === selectedProductId);
        if (index > -1) {
            stockData.splice(index, 1);
            allStockData = allStockData.filter(p => p.id !== selectedProductId);
            populateStockTable();
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
    populateStockTable();
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
        populateStockTable();
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
        populateStockTable();
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
