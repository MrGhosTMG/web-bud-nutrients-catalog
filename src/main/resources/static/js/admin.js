// ===== ADMIN PANEL - PAGE MANAGER =====
let currentPage = null;
let loadedScripts = {};

const pageConfig = {
    buds:     { file: 'buds.js', specials: 'buds' },
    users:    { file: 'admin-users.js', specials: null },
    userWishes: { file: 'admin-wishlist.js', specials: null },
    advanced: { file: 'advanced.js', specials: 'advanced' },
    catalogEdit: { file: 'catalog-edit-admin.js', specials: 'catalogEdit' },
    inStock:  { file: 'in-stock.js', specials: null },
    orders:   { file: 'orders.js', specials: null },
    myWishes: { file: 'my-wishes.js', specials: null },
};

const sidebarSpecials = {
    buds: `<a href="#" class="menu-item menu-item-special" onclick="callPageFn('openManufacturerListModal'); return false;">Manufacturers</a>
<a href="#" class="menu-item menu-item-special" onclick="callPageFn('openCategoryListModal'); return false;">Categories</a>
<div class="menu-divider"></div>
<a href="#" class="menu-item menu-item-special">Browse markets</a>
<a href="#" class="menu-item menu-item-special">Add market</a>`,
    advanced: `<a href="#" class="menu-item menu-item-special" onclick="callPageFn('openProductTypeListModal'); return false;">Product Types</a>
<a href="#" class="menu-item menu-item-special" onclick="callPageFn('openBrandListModal'); return false;">Brands</a>
<div class="menu-divider"></div>
<a href="#" class="menu-item menu-item-special">Browse markets</a>
<a href="#" class="menu-item menu-item-special">Add market</a>`,
    catalogEdit: `<a href="#" class="menu-item menu-item-special" onclick="callPageFn('toggleViewMode'); return false;"><span id="viewModeText">📋 List Mode</span></a>
<a href="#" class="menu-item menu-item-special" onclick="cycleCurrency(); return false;"><span id="currencyText">💱 GEL</span></a>
<a href="#" class="menu-item menu-item-special" onclick="openCurrencySettings(); return false;">⚙️ Settings</a>`,
};

function switchPage(page) {
    currentPage = page;

    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    document.getElementById('specialMenuItems').innerHTML = '';
    document.getElementById('specialDivider').style.display = 'none';

    document.querySelectorAll('.menu-item').forEach(m => {
        const onclick = m.getAttribute('onclick');
        if (onclick && onclick.includes("'" + page + "'")) m.classList.add('active');
    });

    document.getElementById('mainContent').innerHTML = pageHTML[page] || '';
    document.getElementById('rightPanelButtons').innerHTML = '';
    document.getElementById('rightPanelContent').innerHTML = '';

    (pageButtons[page] || []).forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'action-btn ' + b.cls;
        btn.textContent = b.label;
        btn.onclick = function() { callPageFn(b.fn); };
        document.getElementById('rightPanelButtons').appendChild(btn);
    });

    const cfg = pageConfig[page];
    if (cfg && cfg.specials && sidebarSpecials[cfg.specials]) {
        document.getElementById('specialDivider').style.display = 'block';
        document.getElementById('specialMenuItems').innerHTML = sidebarSpecials[cfg.specials];
    }

    loadPageScript(page);
}

function loadPageScript(page) {
    const cfg = pageConfig[page];
    if (!cfg) return;

    if (loadedScripts[page]) {
        setTimeout(() => { triggerPageReady(page); }, 50);
        return;
    }

    const script = document.createElement('script');
    script.src = 'js/' + cfg.file;
    script.onload = function() {
        loadedScripts[page] = true;
        triggerPageReady(page);
    };
    script.onerror = function() {
        console.error('Failed to load script for page:', page);
    };
    document.body.appendChild(script);
}

function triggerPageReady(page) {
    const event = new CustomEvent(page + 'PageReady');
    document.dispatchEvent(event);

    const initFn = window[page + 'Init'];
    if (typeof initFn === 'function') initFn();
}

function callPageFn(fnName) {
    if (typeof window[fnName] === 'function') {
        window[fnName]();
    } else {
        console.warn('Function not found:', fnName);
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

function cycleCurrency() {
    const page = currentPage;
    const fn = window[page + 'CycleCurrency'] || window['cycleCurrency'];
    if (typeof fn === 'function') fn();
    else console.warn('cycleCurrency not available for', page);
}

function openCurrencySettings() {
    const page = currentPage;
    const fn = window[page + 'OpenCurrencySettings'] || window['openCurrencySettings'];
    if (typeof fn === 'function') fn();
}

function openFiltersModal() {
    const page = currentPage;
    const fn = window[page + 'OpenFiltersModal'] || window['openFiltersModal'];
    if (typeof fn === 'function') fn();
}

function showAll() {
    const fn = window['showAll'];
    if (typeof fn === 'function') fn();
}

function applyFilters() {
    const fn = window['applyFilters'];
    if (typeof fn === 'function') fn();
}

const pageHTML = {};
const pageButtons = {};

pageHTML.buds = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">Buds (A-Z)</span></div>
<div class="content-header">
    <span class="content-title">Buds</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <input type="text" class="search-box" placeholder="A - Z" id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header buds-table-header">
    <div class="table-header-cell">Bud Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Manufacturer</div><div class="table-header-cell">Category</div>
    <div class="table-header-cell">Price</div><div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="budsTable"></tbody></table></div>`;

pageHTML.users = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">Users</span></div>
<div class="content-header">
    <span class="content-title">Users => Filters</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <div class="search-group">
            <input type="text" class="search-input" placeholder="Search by name..." id="searchInput">
            <button class="btn btn-search" onclick="applyFilters()">🔍</button>
        </div>
        <input type="text" class="search-box" placeholder="A - Z" id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header">
    <div class="table-header-cell">User Name</div><div class="table-header-cell">Profile Photo</div>
    <div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="usersTable"></tbody></table></div>`;

pageHTML.userWishes = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">User's wishes (A-Z)</span></div>
<div class="content-header">
    <span class="content-title">User's wishes</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <div class="search-group">
            <input type="text" class="search-input" placeholder="Search by bud name..." id="searchInput">
            <button class="btn btn-search" onclick="applyFilters()">🔍</button>
        </div>
        <input type="text" class="search-box" placeholder="A - Z" id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header wishes-table-header">
    <div class="table-header-cell">Bud Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Users</div><div class="table-header-cell">Manufacturer</div>
    <div class="table-header-cell">Category</div><div class="table-header-cell">Price</div>
    <div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="wishesTable"></tbody></table></div>`;

pageHTML.advanced = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">Advanced (A-Z)</span></div>
<div class="content-header">
    <span class="content-title">Advanced Products</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <input type="text" class="search-box" placeholder="A - Z" id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header advanced-table-header">
    <div class="table-header-cell">Product Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Brand</div><div class="table-header-cell">Product Type</div>
    <div class="table-header-cell">Price</div><div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="advancedTable"></tbody></table></div>`;

pageHTML.catalogEdit = `
<div class="content-header">
    <div class="tabs">
        <button class="tab-btn" id="tabSeeAll" onclick="switchTab('seeAll')">See All</button>
        <button class="tab-btn" id="tabSales" onclick="switchTab('sales')">Sale's</button>
        <button class="tab-btn" id="tabOffers" onclick="switchTab('offers')">Offers</button>
    </div>
    <div class="btn-group">
        <input type="text" class="search-box" placeholder="Search..." id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header catalog-table-header" id="listModeHeader">
    <div class="table-header-cell" style="padding-left:10px;"><input type="checkbox" id="selectAll" onclick="toggleSelectAll()" style="margin-right:8px;">Product Name</div>
    <div class="table-header-cell">Photo</div><div class="table-header-cell">Brand</div>
    <div class="table-header-cell">Category</div><div class="table-header-cell">My Price</div>
    <div class="table-header-cell">Catalog Price</div><div class="table-header-cell">Available</div>
    <div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container" id="listModeContainer"><table><tbody id="catalogTable"></tbody></table></div>
<div class="info-mode-container" id="infoModeContainer" style="display:none;"></div>`;

pageHTML.inStock = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">In Stock (All)</span></div>
<div class="content-header">
    <span class="content-title">Inventory Management</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <button class="btn btn-secondary" onclick="showAll()">Show All</button>
        <input type="text" class="search-box" placeholder="Search..." id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header in-stock-table-header">
    <div class="table-header-cell">Product Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Brand</div><div class="table-header-cell">Category</div>
    <div class="table-header-cell">Quantity</div><div class="table-header-cell">Price</div>
    <div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="stockTable"></tbody></table></div>`;

pageHTML.orders = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">Orders (All)</span></div>
<div class="content-header">
    <span class="content-title">Orders Management</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <button class="btn btn-secondary" onclick="showAll()">Show All</button>
        <input type="text" class="search-box" placeholder="Search..." id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header in-stock-table-header">
    <div class="table-header-cell">Product Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Brand</div><div class="table-header-cell">Category</div>
    <div class="table-header-cell">Quantity</div><div class="table-header-cell">Price</div>
    <div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="ordersTable"></tbody></table></div>`;

pageHTML.myWishes = `
<div class="breadcrumbs"><span class="breadcrumb-current" id="breadcrumbFilters">My Wishes (All)</span></div>
<div class="content-header">
    <span class="content-title">My Wishes</span>
    <button class="currency-btn" style="width:85px;" onclick="cycleCurrency()"><span id="currencyText">💱 GEL</span></button>
    <button class="currency-btn" style="width:85px;" onclick="openCurrencySettings()">⚙️ Settings</button>
    <div class="btn-group">
        <input type="text" class="search-box" placeholder="Search..." id="searchBox">
        <button class="btn btn-primary" onclick="openFiltersModal()">Filters</button>
    </div>
</div>
<div class="table-header my-wishes-table-header">
    <div class="table-header-cell">Product Name</div><div class="table-header-cell">Photo</div>
    <div class="table-header-cell">Brand</div><div class="table-header-cell">Category</div>
    <div class="table-header-cell">Price</div><div class="table-header-cell" style="text-align:right;">Actions</div>
</div>
<div class="table-container"><table><tbody id="wishesTable"></tbody></table></div>`;

pageButtons.buds = [
    { label: '+ Add new Bud', cls: 'action-btn-add-bud', fn: 'openAddBudModal' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Edit', cls: 'action-btn-edit', fn: 'editBud' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteBud' },
    { label: 'Check in stock', cls: 'action-btn-check', fn: 'checkInStock' },
    { label: 'Add in orders', cls: 'action-btn-add', fn: 'addInOrders' },
];

pageButtons.users = [
    { label: '+ Add new User', cls: 'action-btn-add-user', fn: 'openAddUserModal' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Edit', cls: 'action-btn-edit', fn: 'editUser' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteUser' },
];

pageButtons.userWishes = [
    { label: 'Alerts', cls: 'action-btn-alerts action-btn-alerts-inactive', fn: 'showAlerts' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Check in stock', cls: 'action-btn-check', fn: 'checkInStock' },
    { label: 'Add to orders', cls: 'action-btn-add', fn: 'addToOrders' },
    { label: 'Remove from wishlist', cls: 'action-btn-delete', fn: 'removeFromWishlist' },
];

pageButtons.advanced = [
    { label: '+ Add new Product', cls: 'action-btn-add-product', fn: 'openAddProductModal' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Edit', cls: 'action-btn-edit', fn: 'editProduct' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteProduct' },
    { label: 'Check in stock', cls: 'action-btn-check', fn: 'checkInStock' },
    { label: 'Add in orders', cls: 'action-btn-add', fn: 'addInOrders' },
];

pageButtons.catalogEdit = [
    { label: 'Add New Product', cls: 'action-btn-primary', fn: 'addNewProduct' },
    { label: 'Full List', cls: 'action-btn-secondary', fn: 'openFullList' },
    { label: 'Preview Element', cls: 'action-btn-preview', fn: 'previewElement' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Edit', cls: 'action-btn-edit', fn: 'editProduct' },
    { label: 'Toggle Availability', cls: 'action-btn-toggle', fn: 'toggleAvailabilitySelected' },
    { label: 'Delete (Selected)', cls: 'action-btn-delete', fn: 'deleteSelected' },
];

pageButtons.inStock = [
    { label: 'Available (by quantity)', cls: 'action-btn-sort-available', fn: 'sortByAvailable' },
    { label: 'Out of Stock', cls: 'action-btn-sort-outofstock', fn: 'sortByOutOfStock' },
    { label: 'Low Stock', cls: 'action-btn-sort-lowstock', fn: 'sortByLowStock' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteProduct' },
];

pageButtons.orders = [
    { label: 'Ordered', cls: 'action-btn-sort-available', fn: 'sortByOrdered' },
    { label: 'Order now', cls: 'action-btn-sort-outofstock', fn: 'sortByOrderNow' },
    { label: 'Delivered', cls: 'action-btn-sort-lowstock', fn: 'sortByDelivered' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteProduct' },
];

pageButtons.myWishes = [
    { label: '+ Add wish', cls: 'action-btn-add-bud', fn: 'openAddWishModal' },
    { label: 'Info', cls: 'action-btn-info', fn: 'showInfo' },
    { label: 'Delete', cls: 'action-btn-delete', fn: 'deleteProduct' },
];

document.addEventListener('DOMContentLoaded', function() {
    switchPage('buds');
});

