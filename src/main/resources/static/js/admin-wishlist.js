// Sample data for demo purposes
const wishesData = [
    {
        budName: 'Bud_Name',
        userName: 'User name',
        id: 1
    },
    {
        budName: 'Bud_Name',
        userName: 'User name',
        id: 2
    },
    {
        budName: 'Bud_Name',
        userName: 'User name',
        id: 3
    },
    {
        budName: 'Bud_Name',
        userName: 'User name',
        id: 4
    },
    {
        budName: 'Bud_Name',
        userName: 'User name',
        id: 5
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateWishesTable();
    setupMenuNavigation();
    setupButtonHandlers();
});

// Populate wishes table
function populateWishesTable() {
    const tableBody = document.getElementById('wishesTable');
    tableBody.innerHTML = '';

    wishesData.forEach(wish => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${wish.budName}</td>
            <td>${wish.userName}</td>
            <td style="text-align: right;">
                <button class="btn btn-primary" onclick="addToOrders(${wish.id})">Add to Orders</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add empty rows for demo
function addEmptyRows() {
    const tableBody = document.getElementById('wishesTable');
    for (let i = 0; i < 2; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
        `;
        tableBody.appendChild(row);
    }
}

// Handle add to orders button
function addToOrders(wishId) {
    console.log('Adding wish #' + wishId + ' to orders');
    alert('Wish #' + wishId + ' has been added to orders!');
}

// Setup menu navigation
function setupMenuNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default for # links
            if (this.href.endsWith('#')) {
                e.preventDefault();
            }
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Setup button handlers
function setupButtonHandlers() {
    const filterBtn = document.querySelector('.btn-primary');
    const checkStockBtn = document.querySelector('.action-btn-check');
    const addOrdersBtn = document.querySelector('.action-btn-add');
    const logoutBtn = document.querySelector('.logout-btn');
    const searchBox = document.querySelector('.search-box');

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('Filters dialog would open here');
        });
    }

    if (checkStockBtn) {
        checkStockBtn.addEventListener('click', function() {
            alert('Checking stock...');
        });
    }

    if (addOrdersBtn) {
        addOrdersBtn.addEventListener('click', function() {
            alert('Selected items added to orders!');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = '/index.html';
            }
        });
    }

    if (searchBox) {
        searchBox.addEventListener('input', function() {
            console.log('Searching for: ' + this.value);
            // Search functionality would be implemented here
        });
    }
}

// Allow row selection
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.getElementById('wishesTable');
    if (tableRows) {
        tableRows.addEventListener('click', function(e) {
            if (e.target.tagName === 'TR') {
                e.target.style.backgroundColor = '#e8f5e9';
            }
        });
    }
});
