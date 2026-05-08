// Advanced Products Page functionality

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

let productsData = [
    {
        id: 1,
        name: 'Anti-Aging Face Cream',
        brand: 'L\'Oreal',
        productType: 'Cosmetics',
        myPrice: 36,
        catalogPrice: 45,
        inStock: true,
        photo: null,
        description: 'Advanced anti-aging formula'
    },
    {
        id: 2,
        name: 'Hydrating Serum',
        brand: 'Neutrogena',
        productType: 'Cosmetics',
        myPrice: 28,
        catalogPrice: 35,
        inStock: true,
        photo: null,
        description: 'Deep hydration serum'
    },
    {
        id: 3,
        name: 'Body Lotion',
        brand: 'Nivea',
        productType: 'Creams',
        myPrice: 14,
        catalogPrice: 18,
        inStock: true,
        photo: null,
        description: 'Moisturizing body lotion'
    },
    {
        id: 4,
        name: 'Hand Cream',
        brand: 'Vaseline',
        productType: 'Creams',
        myPrice: 10,
        catalogPrice: 12,
        inStock: true,
        photo: null,
        description: 'Intensive hand care'
    },
    {
        id: 5,
        name: 'Sunscreen SPF 50',
        brand: 'Coppertone',
        productType: 'Cosmetics',
        myPrice: 22,
        catalogPrice: 28,
        inStock: false,
        photo: null,
        description: 'High protection sunscreen'
    },
    {
        id: 6,
        name: 'Lip Balm',
        brand: 'Burts Bees',
        productType: 'Other',
        myPrice: 6,
        catalogPrice: 8,
        inStock: true,
        photo: null,
        description: 'Natural lip care'
    },
    {
        id: 7,
        name: 'Night Cream',
        brand: 'Olay',
        productType: 'Creams',
        myPrice: 30,
        catalogPrice: 38,
        inStock: true,
        photo: null,
        description: 'Regenerating night cream'
    },
    {
        id: 8,
        name: 'Eye Cream',
        brand: 'Clinique',
        productType: 'Cosmetics',
        myPrice: 42,
        catalogPrice: 52,
        inStock: true,
        photo: null,
        description: 'Reduces dark circles'
    },
    {
        id: 9,
        name: 'Foot Cream',
        brand: 'Scholl',
        productType: 'Creams',
        myPrice: 12,
        catalogPrice: 15,
        inStock: true,
        photo: null,
        description: 'Softening foot care'
    },
    {
        id: 10,
        name: 'Face Mask',
        brand: 'Garnier',
        productType: 'Cosmetics',
        myPrice: 18,
        catalogPrice: 22,
        inStock: true,
        photo: null,
        description: 'Purifying face mask'
    },
    {
        id: 11,
        name: 'BB Cream',
        brand: 'Maybelline',
        productType: 'Cosmetics',
        myPrice: 13,
        catalogPrice: 16,
        inStock: true,
        photo: null,
        description: 'Beauty balm with SPF'
    },
    {
        id: 12,
        name: 'Massage Oil',
        brand: 'Johnsons',
        productType: 'Other',
        myPrice: 11,
        catalogPrice: 14,
        inStock: true,
        photo: null,
        description: 'Relaxing massage oil'
    }
];

// Master lists for brands and product types
let brandsList = ['L\'Oreal', 'Neutrogena', 'Nivea', 'Vaseline', 'Coppertone', 'Burts Bees', 'Olay', 'Clinique', 'Scholl', 'Garnier', 'Maybelline', 'Johnsons'];
let productTypesList = ['Cosmetics', 'Creams', 'Other'];

let selectedProductId = null;
let currentPanel = null;
let allProductsData = [];
let currentFilters = {
    search: '',
    productType: '',
    brand: '',
    priceMin: '',
    priceMax: '',
    sortOrder: 'asc'
};

document.addEventListener('DOMContentLoaded', function() {
    allProductsData = [...productsData];
    populateProductsTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
    updateBreadcrumbFilters();
});

function populateProductsTable() {
    const tableBody = document.getElementById('advancedTable');
    tableBody.innerHTML = '';

    productsData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'advanced-table-row';
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
            <td>${product.brand}</td>
            <td>${product.productType}</td>
            <td><div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </td>
            <td style="text-align: right; display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="addTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 100px;" onclick="event.stopPropagation();">
                    <option value="stock">to Stock</option>
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
    document.querySelectorAll('#advancedTable tr').forEach(row => {
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
    const product = productsData.find(p => p.id === productId);
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

function addProductTo(productId) {
    const product = productsData.find(p => p.id === productId);
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
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    alert(`${product.name} added to stock!`);
}

function checkInStock() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = productsData.find(p => p.id === selectedProductId);
    if (!product) return;

    const status = product.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${product.name} is currently: ${status}`);
}

function addInOrders() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }
    const product = productsData.find(p => p.id === selectedProductId);
    if (!product) return;

    alert(`${product.name} added to orders!`);
}

function openAddProductModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeAddProductModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddProductModal()">×</button>

        <div class="add-user-modal-title">Add New Product</div>

        <div class="form-section">
            <div class="form-section-label">Product Name *</div>
            <input type="text" class="auth-input" placeholder="Enter product name" id="newProductName" style="width: 100%;">
            <div class="warning-icon" id="newProductNameWarning">⚠️</div>
            <div class="password-info" id="newProductNameInfo"></div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Brand *</div>
            <select class="auth-input" id="newProductBrand" style="width: 100%;">
                <option value="">Select brand</option>
                ${brandsList.map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
            <div class="warning-icon" id="newProductBrandWarning">⚠️</div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Product Type *</div>
            <select class="auth-input" id="newProductProductType" style="width: 100%;">
                <option value="">Select product type</option>
                ${productTypesList.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
            <div class="warning-icon" id="newProductProductTypeWarning">⚠️</div>
        </div>

        <div class="form-section">
            <div class="form-section-label">Price ($) *</div>
            <input type="number" class="auth-input" placeholder="0" id="newProductPrice" min="0" style="width: 100%;">
            <div class="warning-icon" id="newProductPriceWarning">⚠️</div>
        </div>

        <div class="form-section">
            <div class="form-section-label">In Stock</div>
            <select class="auth-input" id="newProductInStock" style="width: 100%;">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>

        <div class="form-section">
            <div class="form-section-label">Photo (optional)</div>
            <input type="file" class="auth-input" id="newProductPhoto" accept="image/*" style="padding: 8px; width: 100%;">
            <div class="password-info" id="newProductPhotoInfo" style="font-size: 11px;">Select an image file</div>
        </div>

        <div class="form-section" style="margin-bottom: 20px;">
            <div class="form-section-label">Description (optional)</div>
            <textarea class="auth-input" placeholder="Enter description" id="newProductDescription" rows="3" style="resize: vertical; width: 100%;"></textarea>
        </div>

        <div class="info-text">* Required fields</div>

        <button class="save-user-btn" onclick="saveNewProduct()" style="margin-top: 0px; width: 100%;">
            ✓ Save new Product
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setupNewProductValidation();
}

function closeAddProductModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function setupNewProductValidation() {
    document.getElementById('newProductName').addEventListener('change', validateNewProductName);
    document.getElementById('newProductBrand').addEventListener('change', validateNewProductBrand);
    document.getElementById('newProductProductType').addEventListener('change', validateNewProductProductType);
    document.getElementById('newProductPrice').addEventListener('change', validateNewProductPrice);
}

function validateNewProductName() {
    const name = document.getElementById('newProductName').value.trim();
    const warning = document.getElementById('newProductNameWarning');
    const info = document.getElementById('newProductNameInfo');

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

function validateNewProductBrand() {
    const brand = document.getElementById('newProductBrand').value;
    const warning = document.getElementById('newProductBrandWarning');

    if (!brand) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewProductProductType() {
    const productType = document.getElementById('newProductProductType').value;
    const warning = document.getElementById('newProductProductTypeWarning');

    if (!productType) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function validateNewProductPrice() {
    const price = document.getElementById('newProductPrice').value;
    const warning = document.getElementById('newProductPriceWarning');

    if (!price || price <= 0) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function saveNewProduct() {
    const nameValid = validateNewProductName();
    const brandValid = validateNewProductBrand();
    const productTypeValid = validateNewProductProductType();
    const priceValid = validateNewProductPrice();

    if (!nameValid) {
        alert('Please enter a valid product name (at least 3 characters)');
        return;
    }

    if (!brandValid) {
        alert('Please select a brand');
        return;
    }

    if (!productTypeValid) {
        alert('Please select a productType');
        return;
    }

    if (!priceValid) {
        alert('Please enter a valid price');
        return;
    }

    // Handle photo file
    const photoInput = document.getElementById('newProductPhoto');
    let photoUrl = null;

    if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        photoUrl = URL.createObjectURL(file);
    }

    const newProduct = {
        id: productsData.length > 0 ? Math.max(...allProductsData.map(b => b.id)) + 1 : 1,
        name: document.getElementById('newProductName').value.trim(),
        brand: document.getElementById('newProductBrand').value,
        productType: document.getElementById('newProductProductType').value,
        price: parseInt(document.getElementById('newProductPrice').value),
        inStock: document.getElementById('newProductInStock').value === 'true',
        photo: photoUrl,
        description: document.getElementById('newProductDescription').value.trim() || ''
    };

    allProductsData.push(newProduct);
    productsData.push(newProduct);
    populateProductsTable();
    closeAddProductModal();

    alert('New product added successfully!');
}

function editProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (currentPanel === 'edit') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const product = productsData.find(b => b.id === selectedProductId);
    if (!product) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Edit Product</h3>

            <div class="user-photo-preview">
                ${product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo'}
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
                <label>Brand:</label>
                <select class="edit-input" id="editBrand">
                    ${brandsList.map(m => `<option value="${m}" ${product.brand === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
            </div>

            <div class="user-info-item">
                <label>ProductType:</label>
                <select class="edit-input" id="editProductType">
                    ${productTypesList.map(c => `<option value="${c}" ${product.productType === c ? 'selected' : ''}>${c}</option>`).join('')}
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
                <button class="btn-save" onclick="saveProductChanges()">Save changes?</button>
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
            const product = productsData.find(b => b.id === selectedProductId);
            if (product) {
                product.photo = photoUrl;
                editProduct(); // Refresh edit panel
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
            const product = productsData.find(b => b.id === selectedProductId);
            if (product) {
                product.photo = photoUrl;
                editProduct(); // Refresh edit panel
                alert('Photo changed successfully!');
            }
        }
    };

    fileInput.click();
}

function removePhoto() {
    if (!selectedProductId) return;
    if (confirm('Are you sure you want to remove the photo?')) {
        const product = productsData.find(b => b.id === selectedProductId);
        if (product) {
            product.photo = null;
            editProduct(); // Refresh edit panel
            alert('Photo removed successfully!');
        }
    }
}

function saveProductChanges() {
    if (!selectedProductId) return;

    const product = productsData.find(b => b.id === selectedProductId);
    if (!product) return;

    product.name = document.getElementById('editName').value;
    product.brand = document.getElementById('editBrand').value;
    product.productType = document.getElementById('editProductType').value;
    product.price = parseInt(document.getElementById('editPrice').value);
    product.inStock = document.getElementById('editInStock').value === 'true';
    product.description = document.getElementById('editDescription').value;

    populateProductsTable();
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

    const product = productsData.find(b => b.id === selectedProductId);
    if (!product) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Product Information</h3>

            <div class="user-photo-preview">
                ${product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Name:</label>
                <div class="value">${product.name}</div>
            </div>

            <div class="user-info-item">
                <label>Brand:</label>
                <div class="value">${product.brand}</div>
            </div>

            <div class="user-info-item">
                <label>ProductType:</label>
                <div class="value">${product.productType}</div>
            </div>

            <div class="user-info-item">
                <label>Price:</label>
                <div class="value"><div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </div>
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

function deleteProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    if (confirm('Sure want delete this product?')) {
        const index = productsData.findIndex(b => b.id === selectedProductId);
        if (index > -1) {
            productsData.splice(index, 1);
            allProductsData = productsData.filter(b => allProductsData.some(ab => ab.id === b.id));
            populateProductsTable();
            selectedProductId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Product deleted successfully');
        }
    }
}

// Brand List Management
function openBrandListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeBrandListModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';
    modalContent.style.maxWidth = '500px';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeBrandListModal()">×</button>

        <div class="add-user-modal-title">Edit Brand List</div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Add New Brand:</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="newBrandInput" placeholder="Enter brand name"
                    style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                <button class="btn btn-success" onclick="addNewBrand()">Add</button>
            </div>
        </div>

        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Current Brands:</label>
            <div id="brandListContainer" style="max-height: 300px; overflow-y: auto; border: 2px solid var(--border-color); border-radius: 5px; padding: 10px;">
                ${brandsList.map(m => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid var(--border-color);">
                        <span>${m}</span>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;" onclick="removeBrand('${m}')">Remove</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeBrandListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewBrand() {
    const input = document.getElementById('newBrandInput');
    const newBrand = input.value.trim();

    if (!newBrand) {
        alert('Please enter a brand name');
        return;
    }

    if (brandsList.includes(newBrand)) {
        alert('This brand already exists');
        return;
    }

    brandsList.push(newBrand);
    brandsList.sort();
    input.value = '';

    // Refresh modal
    closeBrandListModal();
    openBrandListModal();
}

function removeBrand(brand) {
    // Check if any products use this brand
    const productsUsingBrand = productsData.filter(b => b.brand === brand);

    if (productsUsingBrand.length > 0) {
        alert(`Cannot remove "${brand}" because ${productsUsingBrand.length} product(s) are using it.`);
        return;
    }

    if (confirm(`Are you sure you want to remove "${brand}"?`)) {
        brandsList = brandsList.filter(m => m !== brand);

        // Refresh modal
        closeBrandListModal();
        openBrandListModal();
    }
}

// ProductType List Management
function openProductTypeListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeProductTypeListModal();
        }
    };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';
    modalContent.style.maxWidth = '500px';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeProductTypeListModal()">×</button>

        <div class="add-user-modal-title">Edit ProductType List</div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Add New ProductType:</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="newProductTypeInput" placeholder="Enter productType name"
                    style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                <button class="btn btn-success" onclick="addNewProductType()">Add</button>
            </div>
        </div>

        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Current Categories:</label>
            <div id="productTypeListContainer" style="max-height: 300px; overflow-y: auto; border: 2px solid var(--border-color); border-radius: 5px; padding: 10px;">
                ${productTypesList.map(c => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid var(--border-color);">
                        <span>${c}</span>
                        <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 12px;" onclick="removeProductType('${c}')">Remove</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function closeProductTypeListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewProductType() {
    const input = document.getElementById('newProductTypeInput');
    const newProductType = input.value.trim();

    if (!newProductType) {
        alert('Please enter a productType name');
        return;
    }

    if (productTypesList.includes(newProductType)) {
        alert('This productType already exists');
        return;
    }

    productTypesList.push(newProductType);
    input.value = '';

    // Refresh modal
    closeProductTypeListModal();
    openProductTypeListModal();
}

function removeProductType(productType) {
    // Check if any products use this productType
    const productsUsingProductType = productsData.filter(b => b.productType === productType);

    if (productsUsingProductType.length > 0) {
        alert(`Cannot remove "${productType}" because ${productsUsingProductType.length} product(s) are using it.`);
        return;
    }

    if (confirm(`Are you sure you want to remove "${productType}"?`)) {
        productTypesList = productTypesList.filter(c => c !== productType);

        // Refresh modal
        closeProductTypeListModal();
        openProductTypeListModal();
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
            const tableBody = document.getElementById('advancedTable');
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
    let filtered = [...allProductsData];

    // ProductType filter
    if (currentFilters.productType) {
        filtered = filtered.filter(product => product.productType === currentFilters.productType);
    }

    // Brand filter
    if (currentFilters.brand) {
        filtered = filtered.filter(product => product.brand === currentFilters.brand);
    }

    // Price filter
    if (currentFilters.priceMin) {
        filtered = filtered.filter(product => product.catalogPrice >= parseInt(currentFilters.priceMin));
    }
    if (currentFilters.priceMax) {
        filtered = filtered.filter(product => product.catalogPrice <= parseInt(currentFilters.priceMax));
    }

    // Sort by name
    if (currentFilters.sortOrder === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilters.sortOrder === 'desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    productsData = filtered;
    populateProductsTable();
    updateBreadcrumbFilters();
}

function updateBreadcrumbFilters() {
    const breadcrumb = document.getElementById('breadcrumbFilters');
    if (!breadcrumb) return;

    let filterText = 'Products';

    // Sort order
    if (currentFilters.sortOrder === 'desc') {
        filterText += ' (Z-A)';
    } else {
        filterText += ' (A-Z)';
    }

    // Add active filters
    const activeFilters = [];
    if (currentFilters.productType) activeFilters.push(currentFilters.productType);
    if (currentFilters.brand) activeFilters.push(currentFilters.brand);
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

        <div class="filters-modal-title">Filter Products</div>

        <div class="filter-group">
            <label class="filter-label">Sort by Name:</label>
            <select class="filter-select" id="filterSortOrder">
                <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A - Z</option>
                <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z - A</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Brand:</label>
            <select class="filter-select" id="filterBrand">
                <option value="">All</option>
                ${brandsList.map(m => `<option value="${m}" ${currentFilters.brand === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">ProductType:</label>
            <select class="filter-select" id="filterProductType">
                <option value="">All</option>
                ${productTypesList.map(c => `<option value="${c}" ${currentFilters.productType === c ? 'selected' : ''}>${c}</option>`).join('')}
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
    currentFilters.brand = document.getElementById('filterBrand').value;
    currentFilters.productType = document.getElementById('filterProductType').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;

    applyFilters();
    closeFiltersModal();
}

function resetFilters() {
    currentFilters = {
        search: '',
        productType: '',
        brand: '',
        priceMin: '',
        priceMax: '',
        sortOrder: 'asc'
    };

    productsData = [...allProductsData];
    populateProductsTable();
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

// Currency functions
function cycleCurrency() {
    const currentIndex = currencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    currentCurrency = currencies[nextIndex].code;
    const currencyText = document.getElementById('currencyText');
    currencyText.textContent = `💱 ${currentCurrency}`;
    populateProductsTable();
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
        populateProductsTable();
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
        populateProductsTable();
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
