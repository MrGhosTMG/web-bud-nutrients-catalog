// Buds Page functionality
let budsData = [
    {
        id: 1,
        name: 'Omega-3 Fish Oil',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        price: 25,
        inStock: true,
        photo: null,
        description: 'High-quality fish oil supplement'
    },
    {
        id: 2,
        name: 'Vitamin D3',
        manufacturer: 'Solgar',
        category: 'Mineral',
        price: 18,
        inStock: true,
        photo: null,
        description: 'Essential vitamin D supplement'
    },
    {
        id: 3,
        name: 'Multivitamin Complex',
        manufacturer: 'Centrum',
        category: 'Medic+',
        price: 30,
        inStock: false,
        photo: null,
        description: 'Complete daily multivitamin'
    },
    {
        id: 4,
        name: 'Collagen Peptides',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        price: 45,
        inStock: true,
        photo: null,
        description: 'Skin and joint support'
    },
    {
        id: 5,
        name: 'Probiotics',
        manufacturer: 'Garden of Life',
        category: 'Other',
        price: 35,
        inStock: true,
        photo: null,
        description: 'Digestive health support'
    },
    {
        id: 6,
        name: 'Magnesium Citrate',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        price: 20,
        inStock: true,
        photo: null,
        description: 'Supports muscle and nerve function'
    },
    {
        id: 7,
        name: 'Turmeric Curcumin',
        manufacturer: 'Solgar',
        category: 'Herbal',
        price: 28,
        inStock: true,
        photo: null,
        description: 'Anti-inflammatory support'
    },
    {
        id: 8,
        name: 'Biotin Hair Growth',
        manufacturer: 'Nature Bounty',
        category: 'Cosmethic',
        price: 22,
        inStock: false,
        photo: null,
        description: 'Promotes healthy hair growth'
    },
    {
        id: 9,
        name: 'Zinc Immune Support',
        manufacturer: 'NOW Foods',
        category: 'Medic+',
        price: 15,
        inStock: true,
        photo: null,
        description: 'Boosts immune system'
    },
    {
        id: 10,
        name: 'Ashwagandha Extract',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        price: 32,
        inStock: true,
        photo: null,
        description: 'Stress relief and energy'
    },
    {
        id: 11,
        name: 'Calcium Plus D',
        manufacturer: 'Centrum',
        category: 'Mineral',
        price: 24,
        inStock: true,
        photo: null,
        description: 'Bone health support'
    },
    {
        id: 12,
        name: 'Green Tea Extract',
        manufacturer: 'Garden of Life',
        category: 'Other',
        price: 27,
        inStock: true,
        photo: null,
        description: 'Antioxidant support'
    },
    {
        id: 13,
        name: 'Hyaluronic Acid',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        price: 38,
        inStock: true,
        photo: null,
        description: 'Skin hydration'
    },
    {
        id: 14,
        name: 'B-Complex Vitamins',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        price: 19,
        inStock: false,
        photo: null,
        description: 'Energy and metabolism support'
    },
    {
        id: 15,
        name: 'Ginkgo Biloba',
        manufacturer: 'Solgar',
        category: 'Herbal',
        price: 26,
        inStock: true,
        photo: null,
        description: 'Memory and cognitive support'
    }
];

// Master lists for manufacturers and categories
let manufacturersList = ['Nature Made', 'Solgar', 'Centrum', 'Vital Proteins', 'Garden of Life', 'Nature Bounty', 'NOW Foods', 'Himalaya'];
let categoriesList = ['Herbal', 'Mineral', 'Medic+', 'Cosmethic', 'Other'];

let selectedBudId = null;
let currentPanel = null;
let allBudsData = [];
let currentFilters = {
    search: '',
    category: '',
    manufacturer: '',
    priceMin: '',
    priceMax: '',
    sortOrder: 'asc'
};

document.addEventListener('DOMContentLoaded', function() {
    allBudsData = [...budsData];
    populateBudsTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
    updateBreadcrumbFilters();
});

function populateBudsTable() {
    const tableBody = document.getElementById('budsTable');
    tableBody.innerHTML = '';

    budsData.forEach(bud => {
        const row = document.createElement('tr');
        row.className = 'buds-table-row';
        row.onclick = function() { selectRow(this, bud.id); };

        row.innerHTML = `
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); viewBudDetails(${bud.id}); return false;">
                    ${bud.name}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewBudPhoto(${bud.id}); return false;">
                    View photo
                </a>
            </td>
            <td>${bud.manufacturer}</td>
            <td>${bud.category}</td>
            <td>$${bud.price}</td>
            <td style="text-align: right; display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="addTarget${bud.id}" style="padding: 6px 8px; font-size: 12px; min-width: 100px;" onclick="event.stopPropagation();">
                    <option value="stock">to Stock</option>
                    <option value="orders">to Orders</option>
                    <option value="wishes">my wishes</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); addBudTo(${bud.id});">Add</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function selectRow(element, budId) {
    document.querySelectorAll('#budsTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedBudId = budId;
}

function viewBudDetails(budId) {
    selectedBudId = budId;
    showInfo();
}

function viewBudPhoto(budId) {
    const bud = budsData.find(b => b.id === budId);
    if (!bud) return;

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
    title.textContent = bud.name + "'s Photo";

    let photoElement;
    if (bud.photo) {
        photoElement = document.createElement('img');
        photoElement.className = 'photo-modal-image';
        photoElement.src = bud.photo;
        photoElement.alt = bud.name + "'s photo";
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

function addBudTo(budId) {
    const bud = budsData.find(b => b.id === budId);
    if (!bud) return;

    const target = document.getElementById(`addTarget${budId}`).value;

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

    alert(`${bud.name} added to ${targetName}!`);
}

function addToStock(budId) {
    const bud = budsData.find(b => b.id === budId);
    if (!bud) return;
    alert(`${bud.name} added to stock!`);
}

function checkInStock() {
    if (!selectedBudId) {
        alert('Please select a bud first');
        return;
    }
    const bud = budsData.find(b => b.id === selectedBudId);
    if (!bud) return;

    const status = bud.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${bud.name} is currently: ${status}`);
}

function addInOrders() {
    if (!selectedBudId) {
        alert('Please select a bud first');
        return;
    }
    const bud = budsData.find(b => b.id === selectedBudId);
    if (!bud) return;

    alert(`${bud.name} added to orders!`);
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
    modalContent.className = 'add-bud-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddBudModal()">×</button>

        <div class="add-user-modal-title">Add New Bud</div>

        <div class="form-rows">
            <!-- Left Column -->
            <div class="form-column">
                <div class="form-section">
                    <div class="form-section-label">Bud Name *</div>
                    <input type="text" class="auth-input" placeholder="Enter bud name" id="newBudName">
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
        alert('Please enter a valid bud name (at least 3 characters)');
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
        id: budsData.length > 0 ? Math.max(...allBudsData.map(b => b.id)) + 1 : 1,
        name: document.getElementById('newBudName').value.trim(),
        manufacturer: document.getElementById('newBudManufacturer').value,
        category: document.getElementById('newBudCategory').value,
        price: parseInt(document.getElementById('newBudPrice').value),
        inStock: document.getElementById('newBudInStock').value === 'true',
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || ''
    };

    allBudsData.push(newBud);
    budsData.push(newBud);
    populateBudsTable();
    closeAddBudModal();

    alert('New bud added successfully!');
}

function editBud() {
    if (!selectedBudId) {
        alert('Please select a bud first');
        return;
    }

    if (currentPanel === 'edit') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const bud = budsData.find(b => b.id === selectedBudId);
    if (!bud) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Edit Bud</h3>

            <div class="user-photo-preview">
                ${bud.photo ? '<img src="' + bud.photo + '" alt="Bud photo">' : 'No photo'}
            </div>

            <div style="display: flex; gap: 5px; margin-bottom: 15px;">
                <button class="btn btn-success" style="flex: 1; font-size: 11px; padding: 6px;" onclick="addPhoto()">Add Photo</button>
                <button class="btn btn-secondary" style="flex: 1; font-size: 11px; padding: 6px;" onclick="changePhoto()">Change</button>
                <button class="btn btn-secondary" style="flex: 1; font-size: 11px; padding: 6px;" onclick="removePhoto()">Remove</button>
            </div>

            <div class="user-info-item">
                <label>Name:</label>
                <input type="text" class="edit-input" id="editName" value="${bud.name}">
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <select class="edit-input" id="editManufacturer">
                    ${manufacturersList.map(m => `<option value="${m}" ${bud.manufacturer === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <select class="edit-input" id="editCategory">
                    ${categoriesList.map(c => `<option value="${c}" ${bud.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>

            <div class="user-info-item">
                <label>Price ($):</label>
                <input type="number" class="edit-input" id="editPrice" value="${bud.price}">
            </div>

            <div class="user-info-item">
                <label>In Stock:</label>
                <select class="edit-input" id="editInStock">
                    <option value="true" ${bud.inStock ? 'selected' : ''}>Yes</option>
                    <option value="false" ${!bud.inStock ? 'selected' : ''}>No</option>
                </select>
            </div>

            <div class="user-info-item">
                <label>Description:</label>
                <textarea class="edit-input" id="editDescription" rows="3">${bud.description}</textarea>
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
    if (!selectedBudId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const bud = budsData.find(b => b.id === selectedBudId);
            if (bud) {
                bud.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo added successfully!');
            }
        }
    };

    fileInput.click();
}

function changePhoto() {
    if (!selectedBudId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const bud = budsData.find(b => b.id === selectedBudId);
            if (bud) {
                bud.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo changed successfully!');
            }
        }
    };

    fileInput.click();
}

function removePhoto() {
    if (!selectedBudId) return;
    if (confirm('Are you sure you want to remove the photo?')) {
        const bud = budsData.find(b => b.id === selectedBudId);
        if (bud) {
            bud.photo = null;
            editBud(); // Refresh edit panel
            alert('Photo removed successfully!');
        }
    }
}

function saveBudChanges() {
    if (!selectedBudId) return;

    const bud = budsData.find(b => b.id === selectedBudId);
    if (!bud) return;

    bud.name = document.getElementById('editName').value;
    bud.manufacturer = document.getElementById('editManufacturer').value;
    bud.category = document.getElementById('editCategory').value;
    bud.price = parseInt(document.getElementById('editPrice').value);
    bud.inStock = document.getElementById('editInStock').value === 'true';
    bud.description = document.getElementById('editDescription').value;

    populateBudsTable();
    showInfo();

    alert('Changes saved successfully!');
}

function cancelEdit() {
    document.getElementById('rightPanelContent').innerHTML = '';
    currentPanel = null;
}

function showInfo() {
    if (!selectedBudId) {
        alert('Please select a bud first');
        return;
    }

    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const bud = budsData.find(b => b.id === selectedBudId);
    if (!bud) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Bud Information</h3>

            <div class="user-photo-preview">
                ${bud.photo ? '<img src="' + bud.photo + '" alt="Bud photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Name:</label>
                <div class="value">${bud.name}</div>
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <div class="value">${bud.manufacturer}</div>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <div class="value">${bud.category}</div>
            </div>

            <div class="user-info-item">
                <label>Price:</label>
                <div class="value">$${bud.price}</div>
            </div>

            <div class="user-info-item">
                <label>In Stock:</label>
                <div class="value">${bud.inStock ? 'Yes' : 'No'}</div>
            </div>

            ${bud.description ? `
            <div class="user-info-item">
                <label>Description:</label>
                <div class="value">${bud.description}</div>
            </div>
            ` : ''}
        </div>
    `;

    currentPanel = 'info';
}

function deleteBud() {
    if (!selectedBudId) {
        alert('Please select a bud first');
        return;
    }

    if (confirm('Sure want delete this bud?')) {
        const index = budsData.findIndex(b => b.id === selectedBudId);
        if (index > -1) {
            budsData.splice(index, 1);
            allBudsData = budsData.filter(b => allBudsData.some(ab => ab.id === b.id));
            populateBudsTable();
            selectedBudId = null;
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
    modalContent.className = 'add-bud-modal-content';
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
    // Check if any buds use this manufacturer
    const budsUsingManufacturer = budsData.filter(b => b.manufacturer === manufacturer);

    if (budsUsingManufacturer.length > 0) {
        alert(`Cannot remove "${manufacturer}" because ${budsUsingManufacturer.length} bud(s) are using it.`);
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
    modalContent.className = 'add-bud-modal-content';
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
    // Check if any buds use this category
    const budsUsingCategory = budsData.filter(b => b.category === category);

    if (budsUsingCategory.length > 0) {
        alert(`Cannot remove "${category}" because ${budsUsingCategory.length} bud(s) are using it.`);
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
            const tableBody = document.getElementById('budsTable');
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
    let filtered = [...allBudsData];

    // Category filter
    if (currentFilters.category) {
        filtered = filtered.filter(bud => bud.category === currentFilters.category);
    }

    // Manufacturer filter
    if (currentFilters.manufacturer) {
        filtered = filtered.filter(bud => bud.manufacturer === currentFilters.manufacturer);
    }

    // Price filter
    if (currentFilters.priceMin) {
        filtered = filtered.filter(bud => bud.price >= parseInt(currentFilters.priceMin));
    }
    if (currentFilters.priceMax) {
        filtered = filtered.filter(bud => bud.price <= parseInt(currentFilters.priceMax));
    }

    // Sort by name
    if (currentFilters.sortOrder === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentFilters.sortOrder === 'desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    budsData = filtered;
    populateBudsTable();
    updateBreadcrumbFilters();
}

function updateBreadcrumbFilters() {
    const breadcrumb = document.getElementById('breadcrumbFilters');
    if (!breadcrumb) return;

    let filterText = 'Buds';

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

        <div class="filters-modal-title">Filter Buds</div>

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

    budsData = [...allBudsData];
    populateBudsTable();
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
