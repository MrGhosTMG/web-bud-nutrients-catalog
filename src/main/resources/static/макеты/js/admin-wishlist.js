// User's Wishes Page functionality

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

let wishesData = [
    // Omega-3 Fish Oil - 5 users want this!
    {
        id: 1,
        budName: 'Omega-3 Fish Oil',
        userName: 'John Smith',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: null,
        budId: 1,
        userId: 1,
        addedDate: '2026-04-15'
    },
    {
        id: 2,
        budName: 'Omega-3 Fish Oil',
        userName: 'Sarah Johnson',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: null,
        budId: 1,
        userId: 2,
        addedDate: '2026-04-16'
    },
    {
        id: 3,
        budName: 'Omega-3 Fish Oil',
        userName: 'Mike Davis',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: null,
        budId: 1,
        userId: 3,
        addedDate: '2026-04-18'
    },
    {
        id: 4,
        budName: 'Omega-3 Fish Oil',
        userName: 'Emily Wilson',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: null,
        budId: 1,
        userId: 4,
        addedDate: '2026-04-19'
    },
    {
        id: 5,
        budName: 'Omega-3 Fish Oil',
        userName: 'David Brown',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: null,
        budId: 1,
        userId: 5,
        addedDate: '2026-04-20'
    },
    // Vitamin D3 - 3 users
    {
        id: 6,
        budName: 'Vitamin D3',
        userName: 'Sarah Johnson',
        manufacturer: 'Solgar',
        category: 'Mineral',
        myPrice: 15,
        catalogPrice: 18,
        photo: null,
        budId: 2,
        userId: 2,
        addedDate: '2026-04-20'
    },
    {
        id: 7,
        budName: 'Vitamin D3',
        userName: 'Lisa Anderson',
        manufacturer: 'Solgar',
        category: 'Mineral',
        myPrice: 15,
        catalogPrice: 18,
        photo: null,
        budId: 2,
        userId: 6,
        addedDate: '2026-04-21'
    },
    {
        id: 8,
        budName: 'Vitamin D3',
        userName: 'Tom Martinez',
        manufacturer: 'Solgar',
        category: 'Mineral',
        myPrice: 15,
        catalogPrice: 18,
        photo: null,
        budId: 2,
        userId: 7,
        addedDate: '2026-04-23'
    },
    // Collagen Peptides - 4 users
    {
        id: 9,
        budName: 'Collagen Peptides',
        userName: 'Mike Davis',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 36,
        catalogPrice: 45,
        photo: null,
        budId: 4,
        userId: 3,
        addedDate: '2026-04-22'
    },
    {
        id: 10,
        budName: 'Collagen Peptides',
        userName: 'Emily Wilson',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 36,
        catalogPrice: 45,
        photo: null,
        budId: 4,
        userId: 4,
        addedDate: '2026-04-24'
    },
    {
        id: 11,
        budName: 'Collagen Peptides',
        userName: 'Lisa Anderson',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 36,
        catalogPrice: 45,
        photo: null,
        budId: 4,
        userId: 6,
        addedDate: '2026-04-25'
    },
    {
        id: 12,
        budName: 'Collagen Peptides',
        userName: 'Jessica Taylor',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 36,
        catalogPrice: 45,
        photo: null,
        budId: 4,
        userId: 8,
        addedDate: '2026-04-26'
    },
    // Probiotics - 2 users
    {
        id: 13,
        budName: 'Probiotics',
        userName: 'Emily Wilson',
        manufacturer: 'Garden of Life',
        category: 'Other',
        myPrice: 28,
        catalogPrice: 35,
        photo: null,
        budId: 5,
        userId: 4,
        addedDate: '2026-04-25'
    },
    {
        id: 14,
        budName: 'Probiotics',
        userName: 'David Brown',
        manufacturer: 'Garden of Life',
        category: 'Other',
        myPrice: 28,
        catalogPrice: 35,
        photo: null,
        budId: 5,
        userId: 5,
        addedDate: '2026-04-27'
    },
    // Turmeric Curcumin - 6 users (most popular!)
    {
        id: 15,
        budName: 'Turmeric Curcumin',
        userName: 'John Smith',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 1,
        addedDate: '2026-04-28'
    },
    {
        id: 16,
        budName: 'Turmeric Curcumin',
        userName: 'Sarah Johnson',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 2,
        addedDate: '2026-04-28'
    },
    {
        id: 17,
        budName: 'Turmeric Curcumin',
        userName: 'Mike Davis',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 3,
        addedDate: '2026-04-29'
    },
    {
        id: 18,
        budName: 'Turmeric Curcumin',
        userName: 'Tom Martinez',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 7,
        addedDate: '2026-04-30'
    },
    {
        id: 19,
        budName: 'Turmeric Curcumin',
        userName: 'Jessica Taylor',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 8,
        addedDate: '2026-05-01'
    },
    {
        id: 20,
        budName: 'Turmeric Curcumin',
        userName: 'Robert Garcia',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 22,
        catalogPrice: 28,
        photo: null,
        budId: 7,
        userId: 9,
        addedDate: '2026-05-02'
    },
    // Ashwagandha Extract - 3 users
    {
        id: 21,
        budName: 'Ashwagandha Extract',
        userName: 'Sarah Johnson',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        myPrice: 26,
        catalogPrice: 32,
        photo: null,
        budId: 10,
        userId: 2,
        addedDate: '2026-04-30'
    },
    {
        id: 22,
        budName: 'Ashwagandha Extract',
        userName: 'David Brown',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        myPrice: 26,
        catalogPrice: 32,
        photo: null,
        budId: 10,
        userId: 5,
        addedDate: '2026-05-01'
    },
    {
        id: 23,
        budName: 'Ashwagandha Extract',
        userName: 'Robert Garcia',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        myPrice: 26,
        catalogPrice: 32,
        photo: null,
        budId: 10,
        userId: 9,
        addedDate: '2026-05-03'
    },
    // Hyaluronic Acid - 2 users
    {
        id: 24,
        budName: 'Hyaluronic Acid',
        userName: 'Mike Davis',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 30,
        catalogPrice: 38,
        photo: null,
        budId: 13,
        userId: 3,
        addedDate: '2026-05-01'
    },
    {
        id: 25,
        budName: 'Hyaluronic Acid',
        userName: 'Lisa Anderson',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 30,
        catalogPrice: 38,
        photo: null,
        budId: 13,
        userId: 6,
        addedDate: '2026-05-02'
    },
    // Magnesium Citrate - 4 users
    {
        id: 26,
        budName: 'Magnesium Citrate',
        userName: 'Emily Wilson',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        photo: null,
        budId: 6,
        userId: 4,
        addedDate: '2026-05-02'
    },
    {
        id: 27,
        budName: 'Magnesium Citrate',
        userName: 'John Smith',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        photo: null,
        budId: 6,
        userId: 1,
        addedDate: '2026-05-03'
    },
    {
        id: 28,
        budName: 'Magnesium Citrate',
        userName: 'Tom Martinez',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        photo: null,
        budId: 6,
        userId: 7,
        addedDate: '2026-05-03'
    },
    {
        id: 29,
        budName: 'Magnesium Citrate',
        userName: 'Jessica Taylor',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        photo: null,
        budId: 6,
        userId: 8,
        addedDate: '2026-05-04'
    },
    // Zinc Immune Support - 1 user
    {
        id: 30,
        budName: 'Zinc Immune Support',
        userName: 'Robert Garcia',
        manufacturer: 'NOW Foods',
        category: 'Medic+',
        myPrice: 12,
        catalogPrice: 15,
        photo: null,
        budId: 9,
        userId: 9,
        addedDate: '2026-05-04'
    },
    // B-Complex Vitamins - 3 users
    {
        id: 31,
        budName: 'B-Complex Vitamins',
        userName: 'Lisa Anderson',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        myPrice: 15,
        catalogPrice: 19,
        photo: null,
        budId: 14,
        userId: 6,
        addedDate: '2026-05-03'
    },
    {
        id: 32,
        budName: 'B-Complex Vitamins',
        userName: 'Jessica Taylor',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        myPrice: 15,
        catalogPrice: 19,
        photo: null,
        budId: 14,
        userId: 8,
        addedDate: '2026-05-04'
    },
    {
        id: 33,
        budName: 'B-Complex Vitamins',
        userName: 'David Brown',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        myPrice: 15,
        catalogPrice: 19,
        photo: null,
        budId: 14,
        userId: 5,
        addedDate: '2026-05-04'
    }
];

let selectedWishId = null;
let currentPanel = null;
let allWishesData = [];
let currentFilters = {
    search: '',
    category: '',
    manufacturer: '',
    userName: '',
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

    // Group wishes by budId
    const groupedWishes = {};
    wishesData.forEach(wish => {
        const key = wish.budId;
        if (!groupedWishes[key]) {
            groupedWishes[key] = {
                budName: wish.budName,
                budId: wish.budId,
                manufacturer: wish.manufacturer,
                category: wish.category,
                myPrice: wish.myPrice,
                catalogPrice: wish.catalogPrice,
                photo: wish.photo,
                users: [],
                wishIds: []
            };
        }
        groupedWishes[key].users.push(wish.userName);
        groupedWishes[key].wishIds.push(wish.id);
    });

    // Convert to array and display
    Object.values(groupedWishes).forEach(group => {
        const userCount = group.users.length;
        const firstWishId = group.wishIds[0];

        const row = document.createElement('tr');
        row.className = 'wishes-table-row wishes-group-row';
        row.setAttribute('data-bud-id', group.budId);
        row.onclick = function() { selectRow(this, firstWishId); };

        row.innerHTML = `
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); viewGroupDetails(${group.budId}); return false;">
                    ${group.budName}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); viewGroupPhoto(${group.budId}); return false;">
                    View photo
                </a>
            </td>
            <td>
                <span class="user-count-badge">${userCount} user${userCount > 1 ? 's' : ''}</span>
                <button class="btn btn-secondary view-users-btn" style="padding: 4px 8px; font-size: 11px; margin-left: 8px;"
                    onclick="event.stopPropagation(); toggleUserList(${group.budId});">
                    View users
                </button>
            </td>
            <td>${group.manufacturer}</td>
            <td>${group.category}</td>
            <td>
                <div style="font-size: 11px; color: #666;">My: ${formatPrice(group.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(group.catalogPrice)}</div>
            </td>
            <td style="text-align: right;">
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); quickAddToOrders(${firstWishId});">Add to Orders</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Add hidden user list row
        const userListRow = document.createElement('tr');
        userListRow.className = 'user-list-row';
        userListRow.id = `userList-${group.budId}`;
        userListRow.style.display = 'none';

        userListRow.innerHTML = `
            <td colspan="7" style="background-color: #f0f8ff; padding: 15px;">
                <div style="font-weight: bold; margin-bottom: 8px; color: var(--blue);">Users who added this bud:</div>
                <ul style="margin: 0; padding-left: 20px;">
                    ${group.users.map(user => `<li style="margin: 4px 0;">${user}</li>`).join('')}
                </ul>
            </td>
        `;
        tableBody.appendChild(userListRow);
    });
}

function selectRow(element, wishId) {
    document.querySelectorAll('#wishesTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedWishId = wishId;
}

function viewWishDetails(wishId) {
    selectedWishId = wishId;
    showInfo();
}

function viewGroupDetails(budId) {
    // Find first wish with this budId
    const wish = wishesData.find(w => w.budId === budId);
    if (wish) {
        selectedWishId = wish.id;
        showGroupInfo(budId);
    }
}

function viewGroupPhoto(budId) {
    const wish = wishesData.find(w => w.budId === budId);
    if (!wish) return;

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
    title.textContent = wish.budName + "'s Photo";

    let photoElement;
    if (wish.photo) {
        photoElement = document.createElement('img');
        photoElement.className = 'photo-modal-image';
        photoElement.src = wish.photo;
        photoElement.alt = wish.budName + "'s photo";
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

function toggleUserList(budId) {
    const userListRow = document.getElementById(`userList-${budId}`);
    if (!userListRow) return;

    if (userListRow.style.display === 'none') {
        // Hide all other user lists
        document.querySelectorAll('.user-list-row').forEach(row => {
            row.style.display = 'none';
        });
        // Show this one
        userListRow.style.display = 'table-row';
    } else {
        userListRow.style.display = 'none';
    }
}

function viewWishPhoto(wishId) {
    const wish = wishesData.find(w => w.id === wishId);
    if (!wish) return;

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
    title.textContent = wish.budName + "'s Photo";

    let photoElement;
    if (wish.photo) {
        photoElement = document.createElement('img');
        photoElement.className = 'photo-modal-image';
        photoElement.src = wish.photo;
        photoElement.alt = wish.budName + "'s photo";
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

function quickAddToOrders(wishId) {
    const wish = wishesData.find(w => w.id === wishId);
    if (!wish) return;

    if (confirm(`Add "${wish.budName}" (requested by ${wish.userName}) to orders?`)) {
        alert(`${wish.budName} added to orders!`);
        // Here you would typically make an API call to add to orders
    }
}

function checkInStock() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }
    const wish = wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    // Simulate stock check
    const inStock = Math.random() > 0.3; // Random for demo
    const status = inStock ? 'In Stock' : 'Out of Stock';
    alert(`${wish.budName} is currently: ${status}`);
}

function addToOrders() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }
    const wish = wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    if (confirm(`Add "${wish.budName}" (requested by ${wish.userName}) to orders?`)) {
        alert(`${wish.budName} added to orders!`);
    }
}

function removeFromWishlist() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }

    const wish = wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    if (confirm(`Remove "${wish.budName}" from ${wish.userName}'s wishlist?`)) {
        const index = wishesData.findIndex(w => w.id === selectedWishId);
        if (index > -1) {
            wishesData.splice(index, 1);
            allWishesData = wishesData.filter(w => allWishesData.some(aw => aw.id === w.id));
            populateWishesTable();
            selectedWishId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Item removed from wishlist successfully');
        }
    }
}

function showAlerts() {
    // Check if there are any pending user requests
    const pendingRequests = 0; // Will be dynamic in the future

    if (currentPanel === 'alerts') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const contentDiv = document.getElementById('rightPanelContent');

    if (pendingRequests === 0) {
        contentDiv.innerHTML = `
            <div class="right-panel-content">
                <h3>Alerts & Notifications</h3>

                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 48px; color: #9e9e9e; margin-bottom: 15px;">🔔</div>
                    <div style="color: #9e9e9e; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                        No new alerts
                    </div>
                    <div style="color: #bdbdbd; font-size: 13px; line-height: 1.5;">
                        User requests will appear here when users submit orders for products not in the catalog.
                    </div>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <div style="font-weight: bold; color: var(--blue); margin-bottom: 8px; font-size: 13px;">
                        ℹ️ Coming Soon:
                    </div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #666; line-height: 1.8;">
                        <li>User catalog view</li>
                        <li>Request system for missing products</li>
                        <li>Real-time notifications</li>
                        <li>Request management</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        // Future: Display pending requests
        contentDiv.innerHTML = `
            <div class="right-panel-content">
                <h3>Alerts & Notifications</h3>
                <div class="user-info-item">
                    <label>Pending Requests:</label>
                    <div class="value">${pendingRequests}</div>
                </div>
                <!-- Request list will be displayed here -->
            </div>
        `;
    }

    currentPanel = 'alerts';
}

function showInfo() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }

    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const wish = wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Wish Information</h3>

            <div class="user-photo-preview">
                ${wish.photo ? '<img src="' + wish.photo + '" alt="Bud photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Bud Name:</label>
                <div class="value">${wish.budName}</div>
            </div>

            <div class="user-info-item">
                <label>User:</label>
                <div class="value">${wish.userName}</div>
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <div class="value">${wish.manufacturer}</div>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <div class="value">${wish.category}</div>
            </div>

            <div class="user-info-item">
                <label>My Price (Purchase):</label>
                <div class="value">${formatPrice(wish.myPrice)}</div>
            </div>

            <div class="user-info-item">
                <label>Catalog Price (Users):</label>
                <div class="value">${formatPrice(wish.catalogPrice)}</div>
            </div>

            <div class="user-info-item">
                <label>Added Date:</label>
                <div class="value">${wish.addedDate}</div>
            </div>
        </div>
    `;

    currentPanel = 'info';
}

function showGroupInfo(budId) {
    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    // Get all wishes for this bud
    const groupWishes = wishesData.filter(w => w.budId === budId);
    if (groupWishes.length === 0) return;

    const firstWish = groupWishes[0];
    const usersList = groupWishes.map(w => w.userName).join(', ');

    const contentDiv = document.getElementById('rightPanelContent');
    contentDiv.innerHTML = `
        <div class="right-panel-content">
            <h3>Group Information</h3>

            <div class="user-photo-preview">
                ${firstWish.photo ? '<img src="' + firstWish.photo + '" alt="Bud photo">' : 'No photo'}
            </div>

            <div class="user-info-item">
                <label>Bud Name:</label>
                <div class="value">${firstWish.budName}</div>
            </div>

            <div class="user-info-item">
                <label>Total Users:</label>
                <div class="value">${groupWishes.length}</div>
            </div>

            <div class="user-info-item">
                <label>Users:</label>
                <div class="value">${usersList}</div>
            </div>

            <div class="user-info-item">
                <label>Manufacturer:</label>
                <div class="value">${firstWish.manufacturer}</div>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <div class="value">${firstWish.category}</div>
            </div>

            <div class="user-info-item">
                <label>My Price (Purchase):</label>
                <div class="value">${formatPrice(firstWish.myPrice)}</div>
            </div>

            <div class="user-info-item">
                <label>Catalog Price (Users):</label>
                <div class="value">${formatPrice(firstWish.catalogPrice)}</div>
            </div>
        </div>
    `;

    currentPanel = 'info';
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
    const searchInput = document.getElementById('searchInput');
    const searchBox = document.getElementById('searchBox');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value.toLowerCase();
            applyFilters();
        });
    }

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

    // Search filter
    if (currentFilters.search) {
        filtered = filtered.filter(wish =>
            wish.budName.toLowerCase().includes(currentFilters.search) ||
            wish.userName.toLowerCase().includes(currentFilters.search)
        );
    }

    // Category filter
    if (currentFilters.category) {
        filtered = filtered.filter(wish => wish.category === currentFilters.category);
    }

    // Manufacturer filter
    if (currentFilters.manufacturer) {
        filtered = filtered.filter(wish => wish.manufacturer === currentFilters.manufacturer);
    }

    // User name filter
    if (currentFilters.userName) {
        filtered = filtered.filter(wish => wish.userName === currentFilters.userName);
    }

    // Price filter
    if (currentFilters.priceMin) {
        filtered = filtered.filter(wish => wish.catalogPrice >= parseInt(currentFilters.priceMin));
    }
    if (currentFilters.priceMax) {
        filtered = filtered.filter(wish => wish.catalogPrice <= parseInt(currentFilters.priceMax));
    }

    // Sort by bud name
    if (currentFilters.sortOrder === 'asc') {
        filtered.sort((a, b) => a.budName.localeCompare(b.budName));
    } else if (currentFilters.sortOrder === 'desc') {
        filtered.sort((a, b) => b.budName.localeCompare(a.budName));
    }

    wishesData = filtered;
    populateWishesTable();
    updateBreadcrumbFilters();
}

function updateBreadcrumbFilters() {
    const breadcrumb = document.getElementById('breadcrumbFilters');
    if (!breadcrumb) return;

    let filterText = "User's wishes";

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
    if (currentFilters.userName) activeFilters.push(`User: ${currentFilters.userName}`);
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
    // Get unique manufacturers, categories, and users from data
    const manufacturers = [...new Set(allWishesData.map(w => w.manufacturer))].sort();
    const categories = [...new Set(allWishesData.map(w => w.category))].sort();
    const users = [...new Set(allWishesData.map(w => w.userName))].sort();

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

        <div class="filters-modal-title">Filter User's Wishes</div>

        <div class="filter-group">
            <label class="filter-label">Sort by Bud Name:</label>
            <select class="filter-select" id="filterSortOrder">
                <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A - Z</option>
                <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z - A</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">User:</label>
            <select class="filter-select" id="filterUserName">
                <option value="">All Users</option>
                ${users.map(u => `<option value="${u}" ${currentFilters.userName === u ? 'selected' : ''}>${u}</option>`).join('')}
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Manufacturer:</label>
            <select class="filter-select" id="filterManufacturer">
                <option value="">All</option>
                ${manufacturers.map(m => `<option value="${m}" ${currentFilters.manufacturer === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Category:</label>
            <select class="filter-select" id="filterCategory">
                <option value="">All</option>
                ${categories.map(c => `<option value="${c}" ${currentFilters.category === c ? 'selected' : ''}>${c}</option>`).join('')}
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
    currentFilters.userName = document.getElementById('filterUserName').value;
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
        userName: '',
        priceMin: '',
        priceMax: '',
        sortOrder: 'asc'
    };

    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

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

// Currency functions
function cycleCurrency() {
    const currentIndex = currencies.findIndex(c => c.code === currentCurrency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    currentCurrency = currencies[nextIndex].code;

    const currencyText = document.getElementById('currencyText');
    currencyText.textContent = `💱 ${currentCurrency}`;

    // Refresh display
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

            <div class="currency-list-compact">
                ${currenciesHTML}
            </div>

            <div class="add-currency-compact">
                <input type="text" id="newCurrencyCode" placeholder="Code" maxlength="3">
                <input type="text" id="newCurrencySymbol" placeholder="Symbol" maxlength="3">
                <input type="number" id="newCurrencyRate" placeholder="Rate" step="0.01" min="0.01">
                <button class="btn-add" onclick="addNewCurrency()" title="Add">+</button>
            </div>

            <button class="btn-update-rates" onclick="getUpdatedCurrencyRates()">
                Get Updated Currency Rates
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.querySelector('.currency-settings-modal-compact').classList.add('modal-expand');
    }, 10);
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
