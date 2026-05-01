// Admin Users Page functionality
const usersData = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' }
];

let selectedUserId = null;

document.addEventListener('DOMContentLoaded', function() {
    populateUsersTable();
    setupMenuNavigation();
    setupSearch();
    setupLogoutButton();
});

function populateUsersTable() {
    const tableBody = document.getElementById('usersTable');
    tableBody.innerHTML = '';

    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="selectRow(this, ${user.id})">${user.name}</td>
            <td onclick="selectRow(this, ${user.id})">
                <a href="#" class="wish-link" onclick="viewWishlist(event, ${user.id})">Wish list</a>
            </td>
            <td style="text-align: right;">
                <button class="btn btn-primary" onclick="viewWishlist(event, ${user.id})">Wish list</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add empty rows for visual consistency
    for (let i = 0; i < 2; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td></td><td></td><td></td>`;
        tableBody.appendChild(row);
    }
}

function selectRow(element, userId) {
    // Remove active from all rows
    document.querySelectorAll('#usersTable tr').forEach(row => {
        row.style.backgroundColor = '';
    });
    // Add active to clicked row
    element.parentElement.style.backgroundColor = '#e8f5e9';
    selectedUserId = userId;
}

function viewWishlist(event, userId) {
    event.preventDefault();
    window.location.href = 'admin-user-wishes.html?userId=' + userId;
}

function editUser() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }
    console.log('Editing user #' + selectedUserId);
    alert('Edit user #' + selectedUserId + ' dialog would open here');
}

function showInfo() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }
    console.log('Showing info for user #' + selectedUserId);
    alert('User #' + selectedUserId + ' info:\n\nName: User ' + selectedUserId + '\nStatus: Active');
}

function deleteUser() {
    if (!selectedUserId) {
        alert('Please select a user first');
        return;
    }
    if (confirm('Are you sure you want to delete user #' + selectedUserId + '?')) {
        console.log('Deleted user #' + selectedUserId);
        const index = usersData.findIndex(u => u.id === selectedUserId);
        if (index > -1) {
            usersData.splice(index, 1);
            populateUsersTable();
            selectedUserId = null;
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

function openFilters() {
    alert('Filters dialog would open here');
}

function setupLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
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
