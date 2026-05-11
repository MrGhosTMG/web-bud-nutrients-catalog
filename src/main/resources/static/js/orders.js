// ===== ORDERS - UNIFIED TAB SYSTEM =====
let currentTab = 'buds';

// Buds tab
let buds_data = []; let buds_allData = []; let buds_selectedId = null; let buds_panel = null;
// Advanced tab
let adv_data = []; let adv_allData = []; let adv_selectedId = null; let adv_panel = null;
// In Stock tab
let stock_data = []; let stock_allData = []; let stock_selectedId = null; let stock_panel = null;
// My Wishes tab
let mw_data = []; let mw_allData = []; let mw_selectedId = null; let mw_panel = null;
// User's Wishes tab
let uw_data = []; let uw_allData = []; let uw_selectedId = null; let uw_panel = null;
let uw_navigationPath = ['Users'];
// Orders tab
let ord_data = []; let ord_allData = []; let ord_selectedId = null;

// Shared lists
let manufacturersList = []; let categoriesList = [];

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '\u20be', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '\$', rateToUSD: 1.0 }
];

// Current filters per tab
let currentFilters = { search: '', category: '', manufacturer: '', priceMin: '', priceMax: '', sortOrder: 'asc' };

// ===== TAB SWITCHING =====
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-panel').forEach(el => el.style.display = 'none');
    document.getElementById('tab-' + tab).style.display = 'block';

    document.querySelectorAll('[id^="panel-"]').forEach(el => el.style.display = 'none');
    document.getElementById('panel-' + tab).style.display = 'block';
    document.getElementById('rightPanelContent').innerHTML = '';
    document.getElementById('searchBox').value = '';

    document.querySelectorAll('.sidebar .menu-item[data-tab]').forEach(el => el.classList.remove('active'));
    const sidebarLink = document.querySelector('.sidebar .menu-item[data-tab="' + tab + '"]');
    if (sidebarLink) sidebarLink.classList.add('active');

    currentFilters = { search: '', category: '', manufacturer: '', priceMin: '', priceMax: '', sortOrder: 'asc' };
    manufacturersList = sharedManufacturersList; categoriesList = sharedCategoriesList;

    switch(tab) {
        case 'buds':
            buds_data = sharedProducts.filter(p => p.sourceType === 'bud');
            buds_data.forEach(p => { if (p.inStock === undefined) p.inStock = p.quantity > 0; });
            buds_allData = [...buds_data];
            document.getElementById('pageTitle').textContent = 'Buds';
            document.getElementById('breadcrumbFilters').textContent = 'Buds (A-Z)';
            document.getElementById('sidebarBrands').style.display = '';
            document.getElementById('sidebarCategories').style.display = '';
            buds_populateTable(); break;
        case 'advanced':
            adv_data = sharedProducts.filter(p => p.sourceType === 'advanced');
            adv_data.forEach(p => { if (p.inStock === undefined) p.inStock = p.quantity > 0; });
            adv_allData = [...adv_data];
            document.getElementById('pageTitle').textContent = 'Advanced Products';
            document.getElementById('breadcrumbFilters').textContent = 'Advanced (A-Z)';
            document.getElementById('sidebarBrands').style.display = '';
            document.getElementById('sidebarCategories').style.display = '';
            adv_populateTable(); break;
        case 'instock':
            stock_data = [...sharedProducts];
            stock_data.forEach(p => { if (p.inStock === undefined) p.inStock = p.quantity > 0; });
            stock_allData = [...stock_data];
            document.getElementById('pageTitle').textContent = 'Inventory Management';
            document.getElementById('breadcrumbFilters').textContent = 'In Stock (All)';
            document.getElementById('sidebarBrands').style.display = 'none';
            document.getElementById('sidebarCategories').style.display = 'none';
            stock_populateTable(); break;
        case 'mywishes':
            mw_data = sharedProducts.filter(p => [1, 4, 7, 10, 13].includes(p.id));
            mw_allData = [...mw_data];
            document.getElementById('pageTitle').textContent = 'My Wishes';
            document.getElementById('breadcrumbFilters').textContent = 'My Wishes (All)';
            document.getElementById('sidebarBrands').style.display = 'none';
            document.getElementById('sidebarCategories').style.display = 'none';
            mw_populateTable(); break;
        case 'userwishes':
            alluw_wishesData = [...uw_wishesData];
            uw_allData = [...uw_wishesData];
            document.getElementById('pageTitle').textContent = "User's wishes";
            document.getElementById('breadcrumbFilters').textContent = "User's wishes (A-Z)";
            document.getElementById('sidebarBrands').style.display = 'none';
            document.getElementById('sidebarCategories').style.display = 'none';
            uw_populateTable(); break;
        case 'orders':
            ord_data = sharedProducts.filter(p => p.orderStatus === 'ordered' || p.orderStatus === 'ordernow' || p.orderStatus === 'delivered');
            ord_allData = [...ord_data];
            document.getElementById('pageTitle').textContent = 'Orders Management';
            document.getElementById('breadcrumbFilters').textContent = 'Orders (All)';
            document.getElementById('sidebarBrands').style.display = 'none';
            document.getElementById('sidebarCategories').style.display = 'none';
            ord_populateTable(); break;
    }
    setupSearch();
}

// ===== DISPATCHERS (onclick handlers) =====
function showInfo() {
    if (currentTab === 'buds') return buds_showInfo();
    if (currentTab === 'advanced') return adv_showInfo();
    if (currentTab === 'instock') return stock_showInfo();
    if (currentTab === 'mywishes') return mw_showInfo();
    if (currentTab === 'userwishes') return uw_showInfo();
    if (currentTab === 'orders') return ord_showInfo();
}
function editProduct() {
    if (currentTab === 'buds') return buds_edit();
    if (currentTab === 'advanced') return adv_edit();
    if (currentTab === 'mywishes') return mw_edit();
    if (currentTab === 'userwishes') return uw_showInfo();
}
function deleteProduct() {
    if (currentTab === 'buds') return buds_delete();
    if (currentTab === 'advanced') return adv_delete();
    if (currentTab === 'instock') return stock_delete();
    if (currentTab === 'mywishes') return mw_delete();
    if (currentTab === 'orders') return ord_delete();
}
function checkInStock() {
    if (currentTab === 'buds') return buds_checkInStock();
    if (currentTab === 'advanced') return adv_checkInStock();
    if (currentTab === 'instock') return stock_checkInStock();
    if (currentTab === 'mywishes') return mw_checkInStock();
    if (currentTab === 'userwishes') return uw_checkInStock();
}
function addInOrders() {
    if (currentTab === 'buds') return buds_addInOrders();
    if (currentTab === 'advanced') return adv_addInOrders();
    if (currentTab === 'instock') return stock_addInOrders();
    if (currentTab === 'mywishes') return mw_addInOrders();
}
function openFiltersModal() {
    if (currentTab === 'buds') return buds_openFiltersModal();
    if (currentTab === 'advanced') return adv_openFiltersModal();
    if (currentTab === 'instock') return stock_openFiltersModal();
    if (currentTab === 'mywishes') return mw_openFiltersModal();
    if (currentTab === 'userwishes') return uw_openFiltersModal();
}
function applyAdvancedFilters() {
    if (currentTab === 'buds') return buds_applyAdvancedFilters();
    if (currentTab === 'advanced') return adv_applyAdvancedFilters();
    if (currentTab === 'instock') return stock_applyAdvancedFilters();
    if (currentTab === 'mywishes') return mw_applyAdvancedFilters();
    if (currentTab === 'userwishes') return uw_applyAdvancedFilters();
}
function resetFilters() {
    if (currentTab === 'buds') return buds_resetFilters();
    if (currentTab === 'advanced') return adv_resetFilters();
    if (currentTab === 'instock') return stock_resetFilters();
    if (currentTab === 'mywishes') return mw_resetFilters();
    if (currentTab === 'userwishes') return uw_resetFilters();
}
function applyFilters() {
    if (currentTab === 'buds') return buds_applyFilters();
    if (currentTab === 'advanced') return adv_applyFilters();
    if (currentTab === 'instock') return stock_applyFilters();
    if (currentTab === 'mywishes') return mw_applyFilters();
    if (currentTab === 'userwishes') return uw_applyFilters();
}
function updateBreadcrumbFilters() {
    if (currentTab === 'buds') return buds_updateBreadcrumb();
    if (currentTab === 'advanced') return adv_updateBreadcrumb();
    if (currentTab === 'instock') return stock_updateBreadcrumb();
    if (currentTab === 'mywishes') return mw_updateBreadcrumb();
    if (currentTab === 'userwishes') return uw_updateBreadcrumb();
}
function setupSearch() {
    if (currentTab === 'buds') return buds_setupSearch();
    if (currentTab === 'advanced') return adv_setupSearch();
    if (currentTab === 'instock') return stock_setupSearch();
    if (currentTab === 'mywishes') return mw_setupSearch();
    if (currentTab === 'userwishes') return uw_setupSearch();
}
function addPhoto() { if (currentTab === 'buds') return buds_addPhoto(); if (currentTab === 'advanced') return adv_addPhoto(); if (currentTab === 'instock') return stock_addPhoto(); if (currentTab === 'mywishes') return mw_addPhoto(); }
function changePhoto() { if (currentTab === 'buds') return buds_changePhoto(); if (currentTab === 'advanced') return adv_changePhoto(); if (currentTab === 'instock') return stock_changePhoto(); if (currentTab === 'mywishes') return mw_changePhoto(); }
function removePhoto() { if (currentTab === 'buds') return buds_removePhoto(); if (currentTab === 'advanced') return adv_removePhoto(); if (currentTab === 'instock') return stock_removePhoto(); if (currentTab === 'mywishes') return mw_removePhoto(); }
function cancelEdit() { if (currentTab === 'buds') return buds_cancelEdit(); if (currentTab === 'advanced') return adv_cancelEdit(); if (currentTab === 'instock') return stock_cancelEdit(); if (currentTab === 'mywishes') return mw_cancelEdit(); }

function openManufacturerListModal() {
    if (currentTab === 'buds') return buds_openManufacturerListModal();
    if (currentTab === 'advanced') return adv_openManufacturerListModal();
    if (currentTab === 'instock') return stock_openManufacturerListModal();
    if (currentTab === 'mywishes') return mw_openManufacturerListModal();
}
function closeManufacturerListModal() { document.querySelector('.add-user-modal')?.remove(); }
function addNewManufacturer() {
    if (currentTab === 'buds') return buds_addNewManufacturer();
    if (currentTab === 'advanced') return adv_addNewManufacturer();
    if (currentTab === 'instock') return stock_addNewManufacturer();
    if (currentTab === 'mywishes') return mw_addNewManufacturer();
}
function removeManufacturer(m) {
    if (currentTab === 'buds') return buds_removeManufacturer(m);
    if (currentTab === 'advanced') return adv_removeManufacturer(m);
    if (currentTab === 'instock') return stock_removeManufacturer(m);
    if (currentTab === 'mywishes') return mw_removeManufacturer(m);
}
function openCategoryListModal() {
    if (currentTab === 'buds') return buds_openCategoryListModal();
    if (currentTab === 'advanced') return adv_openCategoryListModal();
    if (currentTab === 'instock') return stock_openCategoryListModal();
    if (currentTab === 'mywishes') return mw_openCategoryListModal();
}
function closeCategoryListModal() { document.querySelector('.add-user-modal')?.remove(); }
function addNewCategory() {
    if (currentTab === 'buds') return buds_addNewCategory();
    if (currentTab === 'advanced') return adv_addNewCategory();
    if (currentTab === 'instock') return stock_addNewCategory();
    if (currentTab === 'mywishes') return mw_addNewCategory();
}
function removeCategory(c) {
    if (currentTab === 'buds') return buds_removeCategory(c);
    if (currentTab === 'advanced') return adv_removeCategory(c);
    if (currentTab === 'instock') return stock_removeCategory(c);
    if (currentTab === 'mywishes') return mw_removeCategory(c);
}
function addBudTo(id) { return buds_addBudTo(id); }
function addProductTo(id) { return adv_addProductTo(id); }

function toggleUserList(bid) { return uw_toggleUserList(bid); }
function viewGroupDetails(bid) { return uw_viewGroupDetails(bid); }
function viewGroupPhoto(bid) { return uw_viewGroupPhoto(bid); }
function showGroupInfo(bid) { return uw_showGroupInfo(bid); }
function quickAddToOrders(wid) { return uw_quickAddToOrders(wid); }
function showAlerts() { return uw_showAlerts(); }
function removeFromWishlist() { return uw_removeFromWishlist(); }
function addToOrders() { return uw_addToOrders(); }
function sortByAvailable() { return stock_sortByAvailable(); }
function sortByOutOfStock() { return stock_sortByOutOfStock(); }
function sortByLowStock() { return stock_sortByLowStock(); }
function showAll() {
    if (currentTab === 'instock') return stock_showAll();
    if (currentTab === 'mywishes') return mw_showAll();
}
function applyWishAction(id) { return mw_applyWishAction(id); }
function openAddBudModal() { if (currentTab === 'buds') return buds_openAddBudModal(); if (currentTab === 'instock') return stock_openAddBudModal(); }
function openAddProductModal() { if (currentTab === 'advanced') return adv_openAddProductModal(); }
function openAddWishModal() { if (currentTab === 'mywishes') return mw_openAddWishModal(); }
function closeAddBudModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) modal.remove();
}
function closeAddProductModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) modal.remove();
}
function closeAddWishModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) modal.remove();
}
function saveNewBud() {
    if (currentTab === 'buds') return buds_saveNewBud();
    if (currentTab === 'instock') return stock_saveNewBud();
}
function saveNewProduct() {
    if (currentTab === 'advanced') return adv_saveNewProduct();
}

// ===== SHARED UTILITY FUNCTIONS =====
function cycleCurrency() { const ci = currencies.findIndex(c => c.code === currentCurrency); const ni = (ci + 1) % currencies.length; currentCurrency = currencies[ni].code; document.getElementById('currencyText').textContent = '\u{1F4B1} ' + currentCurrency; if (currentTab === 'buds') buds_populateTable(); else if (currentTab === 'advanced') adv_populateTable(); else if (currentTab === 'instock') stock_populateTable(); else if (currentTab === 'mywishes') mw_populateTable(); else if (currentTab === 'userwishes') uw_populateTable(); else if (currentTab === 'orders') ord_populateTable(); }
function convertPrice(priceInGEL, targetCurrency) { const c = currencies.find(c => c.code === targetCurrency); if (!c) return priceInGEL; const usd = priceInGEL / currencies.find(c => c.code === 'GEL').rateToUSD; return usd * c.rateToUSD; }
function formatPrice(priceInGEL, targetCurrency) { if (targetCurrency === undefined) targetCurrency = currentCurrency; const c = currencies.find(c => c.code === targetCurrency); if (!c) return priceInGEL.toFixed(2) + ' \u20be'; const v = convertPrice(priceInGEL, targetCurrency); return c.symbol + v.toFixed(2); }
function openCurrencySettings() {
    const m = document.createElement('div'); m.className = 'modal'; m.style.display = 'flex'; m.style.zIndex = '9999';
    const html = currencies.map((c,i) => `<div class="currency-item-compact"><div class="currency-info-compact"><strong>${c.code}</strong> ${c.symbol} <span class="currency-rate">1 USD = ${c.rateToUSD}</span></div><div class="currency-actions-compact"><button class="btn-icon" onclick="editCurrencyRate(${i})" title="Edit">\u270F\uFE0F</button>${c.code !== 'GEL' ? `<button class="btn-icon btn-delete" onclick="deleteCurrency(${i})" title="Delete">\uD83D\uDDD1\uFE0F</button>` : ''}</div></div>`).join('');
    m.innerHTML = `<div class="modal-content currency-settings-modal-compact"><span class="close" onclick="this.closest('.modal').remove()">&times;</span><h3>Settings</h3><div class="currency-list-compact">${html}</div><div class="add-currency-compact"><input type="text" id="newCurrencyCode" placeholder="Code" maxlength="3"><input type="text" id="newCurrencySymbol" placeholder="Symbol" maxlength="3"><input type="number" id="newCurrencyRate" placeholder="Rate" step="0.01" min="0.01"><button class="btn-add" onclick="addNewCurrency()" title="Add">+</button></div><button class="btn-update-rates" onclick="getUpdatedCurrencyRates()">Get Updated Currency Rates</button></div>`;
    document.body.appendChild(m); setTimeout(() => { m.querySelector('.currency-settings-modal-compact')?.classList.add('modal-expand'); }, 10);
}
function editCurrencyRate(i) { const c = currencies[i]; const r = prompt('Enter new rate to USD for ' + c.code + ':', c.rateToUSD); if (r !== null && !isNaN(r) && parseFloat(r) > 0) { currencies[i].rateToUSD = parseFloat(r); openCurrencySettings(); document.querySelector('.modal')?.remove(); refreshCurrentTable(); } }
function deleteCurrency(i) { const c = currencies[i]; if (confirm('Delete ' + c.code + '?')) { currencies.splice(i,1); if (currentCurrency === c.code) { currentCurrency = 'GEL'; document.getElementById('currencyText').textContent = '\u{1F4B1} GEL'; } openCurrencySettings(); document.querySelector('.modal')?.remove(); refreshCurrentTable(); } }
function addNewCurrency() { const code = document.getElementById('newCurrencyCode').value.trim().toUpperCase(); const sym = document.getElementById('newCurrencySymbol').value.trim(); const rate = parseFloat(document.getElementById('newCurrencyRate').value); if (!code || !sym || isNaN(rate) || rate <= 0) { alert('Fill all fields'); return; } if (currencies.find(c => c.code === code)) { alert('Currency exists'); return; } currencies.push({ code, name: code, symbol: sym, rateToUSD: rate }); openCurrencySettings(); document.querySelector('.modal')?.remove(); }
function getUpdatedCurrencyRates() { alert('Will be implemented with backend API'); }
function setupLogoutButton() { const btn = document.querySelector('.logout-btn'); if (btn) btn.addEventListener('click', function() { if (confirm('Logout?')) window.location.href = 'index.html'; }); }
function closePhotoModal() { document.querySelector('.photo-modal')?.remove(); }
function closeFiltersModal() { document.querySelector('.filters-modal')?.remove(); }
function refreshCurrentTable() { if (currentTab === 'buds') buds_populateTable(); else if (currentTab === 'advanced') adv_populateTable(); else if (currentTab === 'instock') stock_populateTable(); else if (currentTab === 'mywishes') mw_populateTable(); else if (currentTab === 'userwishes') uw_populateTable(); }
function convertToGEL(amount, fromCurrency) { if (!amount || amount <= 0 || fromCurrency === 'GEL') return amount || 0; const from = currencies.find(c => c.code === fromCurrency); const gel = currencies.find(c => c.code === 'GEL'); if (!from || !gel) return amount; return Math.round(amount / from.rateToUSD * gel.rateToUSD); }
function setupMenuNavigation() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => { item.addEventListener('click', function(e) { if (!this.href.includes('#')) return; e.preventDefault(); items.forEach(i => i.classList.remove('active')); this.classList.add('active'); }); });
}
function selectRow(el, id) {
    if (currentTab === 'buds') return buds_selectRow(el, id);
    if (currentTab === 'advanced') return adv_selectRow(el, id);
    if (currentTab === 'instock') return stock_selectRow(el, id);
    if (currentTab === 'mywishes') return mw_selectRow(el, id);
    if (currentTab === 'userwishes') return uw_selectRow(el, id);
}
function viewProductDetails(id) {
    if (currentTab === 'advanced') return adv_viewDetails(id);
    if (currentTab === 'instock') return stock_viewDetails(id);
    if (currentTab === 'mywishes') return mw_viewDetails(id);
}
function viewBudDetails(id) { return buds_viewDetails(id); }
function viewWishDetails(id) { return uw_viewDetails(id); }
function viewProductPhoto(id) {
    if (currentTab === 'advanced') return adv_viewPhoto(id);
    if (currentTab === 'instock') return stock_viewPhoto(id);
    if (currentTab === 'mywishes') return mw_viewPhoto(id);
}
function viewBudPhoto(id) { return buds_viewPhoto(id); }
function viewWishPhoto(id) { return uw_viewPhoto(id); }

document.addEventListener('DOMContentLoaded', function() {
    setupLogoutButton();
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || 'orders';
    switchTab(tab);
});


// ===== BUDS TAB =====

function buds_populateTable() {
    const tableBody = document.getElementById('budsTable');
    tableBody.innerHTML = '';

    buds_data.forEach(bud => {
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
            <td>
                <div style="font-size: 11px; color: #666;">My: ${formatPrice(bud.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(bud.catalogPrice)}</div>
            </td>
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

function buds_selectRow(element, budId) {
    document.querySelectorAll('#budsTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    buds_selectedId = budId;
}

function buds_viewDetails(budId) {
    buds_selectedId = budId;
    showInfo();
}

function buds_viewPhoto(budId) {
    const bud = buds_data.find(b => b.id === budId);
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
    closeBtn.innerHTML = 'Г—';
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

function buds_addBudTo(budId) {
    const bud = buds_data.find(b => b.id === budId);
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

function buds_addToStock(budId) {
    const bud = buds_data.find(b => b.id === budId);
    if (!bud) return;
    alert(`${bud.name} added to stock!`);
}

function buds_checkInStock() {
    if (!buds_selectedId) {
        alert('Please select a bud first');
        return;
    }
    const bud = buds_data.find(b => b.id === buds_selectedId);
    if (!bud) return;

    const status = bud.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${bud.name} is currently: ${status}`);
}

function buds_addInOrders() {
    if (!buds_selectedId) {
        alert('Please select a bud first');
        return;
    }
    const bud = buds_data.find(b => b.id === buds_selectedId);
    if (!bud) return;

    alert(`${bud.name} added to orders!`);
}

function buds_openAddBudModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeAddBudModal(); };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddBudModal()">&times;</button>
        <div class="add-user-modal-title">Add New Bud</div>
        <div class="form-section">
            <div class="form-section-label">Bud Name *</div>
            <input type="text" class="auth-input" placeholder="Enter bud name" id="newBudName" style="width: 100%;">
        </div>
        <div class="form-section">
            <div class="form-section-label">Brand *</div>
            <select class="auth-input" id="newBudManufacturer" style="width: 100%;">
                <option value="">Select brand</option>
                ${manufacturersList.map(m => '<option value="' + m + '">' + m + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Category *</div>
            <select class="auth-input" id="newBudCategory" style="width: 100%;">
                <option value="">Select category</option>
                ${categoriesList.map(c => '<option value="' + c + '">' + c + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Currency</div>
            <select id="newBudPriceCurrency" style="width: 10px; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                ${currencies.map(c => '<option value="' + c.code + '">' + c.code + ' ' + c.symbol + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Catalog Price *</div>
            <input type="number" class="auth-input" placeholder="0" id="newBudCatalogPrice" min="0" style="width: 100%;">
        </div>
        <div class="form-section">
            <div class="form-section-label">My Price</div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="number" class="auth-input" placeholder="0" id="newBudMyPrice" min="0" style="flex: 1;">
                <span style="font-size: 11px; color: #888;">(optional, leave empty for 80% of Catalog Price)</span>
            </div>
        </div>
        <div class="form-section">
            <div class="form-section-label">In Stock</div>
            <select class="auth-input" id="newBudInStock" style="width: 100%;">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Photo (optional)</div>
            <input type="file" class="auth-input" id="newBudPhoto" accept="image/*" style="padding: 8px; width: 100%;">
        </div>
        <div class="form-section" style="margin-bottom: 20px;">
            <div class="form-section-label">Description (optional)</div>
            <textarea class="auth-input" placeholder="Enter description" id="newBudDescription" rows="3" style="resize: vertical; width: 100%;"></textarea>
        </div>
        <div class="info-text">* Required fields</div>
        <button class="save-user-btn" onclick="saveNewBud()" style="margin-top: 0px; width: 100%;">&#10003; Save new Bud</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function buds_closeAddBudModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function buds_openManufacturerListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeManufacturerListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeManufacturerListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Brand List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Brand:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newManufacturerInput" placeholder="Enter brand name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewManufacturer()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Brands:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        manufacturersList.map(m => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + m + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeManufacturer(\'' + m + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function buds_addNewManufacturer() {
    const input = document.getElementById('newManufacturerInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a brand name'); return; }
    if (manufacturersList.includes(name)) { alert('Brand already exists'); return; }
    manufacturersList.push(name);
    manufacturersList.sort();
    input.value = '';
    closeManufacturerListModal();
    buds_openManufacturerListModal();
}

function buds_removeManufacturer(manufacturer) {
    const using = buds_data.filter(p => p.manufacturer === manufacturer);
    if (using.length > 0) { alert('Cannot remove "' + manufacturer + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + manufacturer + '"?')) {
        manufacturersList = manufacturersList.filter(m => m !== manufacturer);
        closeManufacturerListModal();
        buds_openManufacturerListModal();
    }
}

function buds_openCategoryListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeCategoryListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeCategoryListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Category List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Category:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newCategoryInput" placeholder="Enter category name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewCategory()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Categories:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        categoriesList.map(c => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + c + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeCategory(\'' + c + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function buds_addNewCategory() {
    const input = document.getElementById('newCategoryInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a category name'); return; }
    if (categoriesList.includes(name)) { alert('Category already exists'); return; }
    categoriesList.push(name);
    input.value = '';
    closeCategoryListModal();
    buds_openCategoryListModal();
}

function buds_removeCategory(category) {
    const using = buds_data.filter(p => p.category === category);
    if (using.length > 0) { alert('Cannot remove "' + category + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + category + '"?')) {
        categoriesList = categoriesList.filter(c => c !== category);
        closeCategoryListModal();
        buds_openCategoryListModal();
    }
}

function buds_saveNewBud() {
    const name = document.getElementById('newBudName').value.trim();
    const manufacturer = document.getElementById('newBudManufacturer').value;
    const category = document.getElementById('newBudCategory').value;
    const catalogPriceVal = document.getElementById('newBudCatalogPrice').value;
    const myPriceVal = document.getElementById('newBudMyPrice').value;
    const currency = document.getElementById('newBudPriceCurrency').value;

    if (!name || name.length < 3) { alert('Enter a valid bud name (min 3 chars)'); return; }
    if (!manufacturer) { alert('Select a brand'); return; }
    if (!category) { alert('Select a category'); return; }
    if (!catalogPriceVal || catalogPriceVal <= 0) { alert('Enter a valid catalog price'); return; }

    const catalogPriceGEL = convertToGEL(parseFloat(catalogPriceVal), currency);
    const myPriceGEL = myPriceVal ? convertToGEL(parseFloat(myPriceVal), currency) : Math.round(catalogPriceGEL * 0.8);

    const photoInput = document.getElementById('newBudPhoto');
    let photoUrl = null;
    if (photoInput.files && photoInput.files[0]) photoUrl = URL.createObjectURL(photoInput.files[0]);

    const newBud = {
        id: sharedProducts.length > 0 ? Math.max(...sharedProducts.map(b => b.id)) + 1 : 1,
        name: name,
        manufacturer: manufacturer,
        category: category,
        myPrice: myPriceGEL,
        catalogPrice: catalogPriceGEL,
        quantity: document.getElementById('newBudInStock').value === 'true' ? 10 : 0,
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || '',
        orderStatus: '',
        sourceType: 'bud',
        inStock: document.getElementById('newBudInStock').value === 'true'
    };

    sharedProducts.push(newBud);
    buds_allData.push(newBud);
    buds_data.push(newBud);
    buds_populateTable();
    closeAddBudModal();
    alert('New bud added successfully!');
}

function buds_showInfo() {
    if (!buds_selectedId) { alert('Select a product first'); return; }
    if (buds_panel === 'info') { document.getElementById('rightPanelContent').innerHTML = ''; buds_panel = null; return; }
    const product = buds_data.find(p => p.id === buds_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Product Information</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div class="user-info-item"><label>Name:</label><div class="value">' + product.name + '</div></div>' +
        '<div class="user-info-item"><label>Brand:</label><div class="value">' + product.manufacturer + '</div></div>' +
        '<div class="user-info-item"><label>Category:</label><div class="value">' + product.category + '</div></div>' +
        '<div class="user-info-item"><label>My Price:</label><div class="value">' + formatPrice(product.myPrice) + '</div></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><div class="value">' + formatPrice(product.catalogPrice) + '</div></div>' +
        (product.description ? '<div class="user-info-item"><label>Description:</label><div class="value">' + product.description + '</div></div>' : '') +
        '</div>';
    buds_panel = 'info';
}

function buds_edit() {
    if (!buds_selectedId) { alert('Select a product first'); return; }
    if (buds_panel === 'edit') { document.getElementById('rightPanelContent').innerHTML = ''; buds_panel = null; return; }
    const product = buds_data.find(p => p.id === buds_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Edit Product</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div style="display:flex;gap:5px;margin-bottom:15px;"><button class="btn btn-success" style="flex:1;font-size:11px;padding:6px;" onclick="addPhoto()">Add Photo</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="changePhoto()">Change</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="removePhoto()">Remove</button></div>' +
        '<div class="user-info-item"><label>Name:</label><input type="text" class="edit-input" id="editName" value="' + product.name + '"></div>' +
        '<div class="user-info-item"><label>Brand:</label><select class="edit-input" id="editManufacturer">' +
        manufacturersList.map(m => '<option value="' + m + '"' + (product.manufacturer === m ? ' selected' : '') + '>' + m + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>Category:</label><select class="edit-input" id="editCategory">' +
        categoriesList.map(c => '<option value="' + c + '"' + (product.category === c ? ' selected' : '') + '>' + c + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>My Price:</label><input type="number" class="edit-input" id="editMyPrice" value="' + product.myPrice + '"></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><input type="number" class="edit-input" id="editCatalogPrice" value="' + product.catalogPrice + '"></div>' +
        '<div class="edit-actions"><button class="btn-save" onclick="buds_saveProductChanges()">Save changes?</button>' +
        '<button class="btn-cancel" onclick="cancelEdit()">Cancel</button></div></div>';
    buds_panel = 'edit';
}

function buds_saveProductChanges() {
    if (!buds_selectedId) return;
    const product = buds_data.find(p => p.id === buds_selectedId);
    if (!product) return;
    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.myPrice = parseInt(document.getElementById('editMyPrice').value);
    product.catalogPrice = parseInt(document.getElementById('editCatalogPrice').value);
    buds_populateTable();
    buds_showInfo();
    alert('Changes saved successfully!');
}

function buds_cancelEdit() { document.getElementById('rightPanelContent').innerHTML = ''; buds_panel = null; }

function buds_addPhoto() {
    if (!buds_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = buds_data.find(p => p.id === buds_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); buds_edit(); alert('Photo added!'); }
        }
    };
    input.click();
}

function buds_changePhoto() {
    if (!buds_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = buds_data.find(p => p.id === buds_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); buds_edit(); alert('Photo changed!'); }
        }
    };
    input.click();
}

function buds_removePhoto() {
    if (!buds_selectedId) return;
    if (confirm('Remove photo?')) {
        const product = buds_data.find(p => p.id === buds_selectedId);
        if (product) { product.photo = null; buds_edit(); alert('Photo removed!'); }
    }
}

function buds_delete() {
    if (!buds_selectedId) { alert('Select a product first'); return; }
    if (!confirm('Sure want delete this product?')) return;
    const idx = buds_data.findIndex(p => p.id === buds_selectedId);
    if (idx > -1) {
        buds_data.splice(idx, 1);
        buds_allData = buds_allData.filter(p => p.id !== buds_selectedId);
        sharedProducts = sharedProducts.filter(p => p.id !== buds_selectedId);
        buds_populateTable();
        buds_selectedId = null;
        buds_panel = null;
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Product deleted successfully');
    }
}

// ===== ADVANCED TAB =====

function adv_populateTable() {
    const tableBody = document.getElementById('advancedTable');
    tableBody.innerHTML = '';

    adv_data.forEach(product => {
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
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>
                <div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </td>
            <td style="text-align: right;">
                <div style="display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="addTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 100px;" onclick="event.stopPropagation();">
                    <option value="stock">to Stock</option>
                    <option value="orders">to Orders</option>
                    <option value="wishes">my wishes</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); addProductTo(${product.id});">Add</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function adv_selectRow(element, productId) {
    document.querySelectorAll('#advancedTable tr').forEach(row => row.classList.remove('selected'));
    element.classList.add('selected');
    adv_selectedId = productId;
}

function adv_viewDetails(productId) {
    adv_selectedId = productId;
    adv_showInfo();
}

function adv_viewPhoto(productId) {
    const product = adv_data.find(p => p.id === productId);
    if (!product) return;
    const modal = document.createElement('div'); modal.className = 'photo-modal'; modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const content = document.createElement('div'); content.className = 'photo-modal-content';
    const close = document.createElement('button'); close.className = 'photo-modal-close'; close.innerHTML = '&times;'; close.onclick = () => modal.remove();
    const title = document.createElement('div'); title.className = 'photo-modal-title'; title.textContent = product.name + "'s Photo";
    content.appendChild(close); content.appendChild(title);
    if (product.photo) { const img = document.createElement('img'); img.className = 'photo-modal-image'; img.src = product.photo; img.alt = product.name; content.appendChild(img); }
    else { const ph = document.createElement('div'); ph.className = 'photo-modal-placeholder'; ph.textContent = 'No photo available'; content.appendChild(ph); }
    modal.appendChild(content); document.body.appendChild(modal);
}

function adv_checkInStock() {
    if (!adv_selectedId) { alert('Please select a product first'); return; }
    const product = adv_data.find(p => p.id === adv_selectedId);
    if (!product) return;
    const status = product.inStock ? 'In Stock' : 'Out of Stock';
    alert(product.name + ' is currently: ' + status);
}

function adv_addInOrders() {
    if (!adv_selectedId) { alert('Please select a product first'); return; }
    const product = adv_data.find(p => p.id === adv_selectedId);
    if (!product) return;
    alert(product.name + ' added to orders!');
}

function adv_addProductTo(productId) {
    const product = adv_data.find(p => p.id === productId);
    if (!product) return;
    const target = document.getElementById('addTarget' + productId).value;
    let targetName = '';
    switch(target) {
        case 'stock': targetName = 'Stock'; break;
        case 'orders': targetName = 'Orders'; break;
        case 'wishes': targetName = 'My wishes'; break;
    }
    alert(product.name + ' added to ' + targetName + '!');
}

function adv_openAddProductModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeAddProductModal(); };

    const modalContent = document.createElement('div');
    modalContent.className = 'add-product-modal-content';

    modalContent.innerHTML = `
        <button class="add-user-modal-close" onclick="closeAddProductModal()">&times;</button>
        <div class="add-user-modal-title">Add New Product</div>
        <div class="form-section">
            <div class="form-section-label">Product Name *</div>
            <input type="text" class="auth-input" placeholder="Enter product name" id="newProductName" style="width: 100%;">
        </div>
        <div class="form-section">
            <div class="form-section-label">Brand *</div>
            <select class="auth-input" id="newProductManufacturer" style="width: 100%;">
                <option value="">Select brand</option>
                ${manufacturersList.map(m => '<option value="' + m + '">' + m + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Category *</div>
            <select class="auth-input" id="newProductCategory" style="width: 100%;">
                <option value="">Select category</option>
                ${categoriesList.map(c => '<option value="' + c + '">' + c + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Currency</div>
            <select id="newProductPriceCurrency" style="width: 10px; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                ${currencies.map(c => '<option value="' + c.code + '">' + c.code + ' ' + c.symbol + '</option>').join('')}
            </select>
        </div>
        <div class="form-section">
            <div class="form-section-label">Catalog Price *</div>
            <input type="number" class="auth-input" placeholder="0" id="newProductCatalogPrice" min="0" style="width: 100%;">
        </div>
        <div class="form-section">
            <div class="form-section-label">My Price</div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="number" class="auth-input" placeholder="0" id="newProductMyPrice" min="0" style="flex: 1;">
                <span style="font-size: 11px; color: #888;">(optional, leave empty for 80% of Catalog Price)</span>
            </div>
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
        </div>
        <div class="form-section" style="margin-bottom: 20px;">
            <div class="form-section-label">Description (optional)</div>
            <textarea class="auth-input" placeholder="Enter description" id="newProductDescription" rows="3" style="resize: vertical; width: 100%;"></textarea>
        </div>
        <div class="info-text">* Required fields</div>
        <button class="save-user-btn" onclick="saveNewProduct()" style="margin-top: 0px; width: 100%;">&#10003; Save new Product</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

function adv_closeAddProductModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) modal.remove();
}

function adv_saveNewProduct() {
    const name = document.getElementById('newProductName').value.trim();
    const manufacturer = document.getElementById('newProductManufacturer').value;
    const category = document.getElementById('newProductCategory').value;
    const catalogPriceVal = document.getElementById('newProductCatalogPrice').value;
    const myPriceVal = document.getElementById('newProductMyPrice').value;
    const currency = document.getElementById('newProductPriceCurrency').value;

    if (!name || name.length < 3) { alert('Enter a valid product name (min 3 chars)'); return; }
    if (!manufacturer) { alert('Select a brand'); return; }
    if (!category) { alert('Select a category'); return; }
    if (!catalogPriceVal || catalogPriceVal <= 0) { alert('Enter a valid catalog price'); return; }

    const catalogPriceGEL = convertToGEL(parseFloat(catalogPriceVal), currency);
    const myPriceGEL = myPriceVal ? convertToGEL(parseFloat(myPriceVal), currency) : Math.round(catalogPriceGEL * 0.8);

    const photoInput = document.getElementById('newProductPhoto');
    let photoUrl = null;
    if (photoInput.files && photoInput.files[0]) photoUrl = URL.createObjectURL(photoInput.files[0]);

    const newProduct = {
        id: sharedProducts.length > 0 ? Math.max(...sharedProducts.map(p => p.id)) + 1 : 1,
        name: name,
        manufacturer: manufacturer,
        category: category,
        myPrice: myPriceGEL,
        catalogPrice: catalogPriceGEL,
        quantity: document.getElementById('newProductInStock').value === 'true' ? 10 : 0,
        photo: photoUrl,
        description: document.getElementById('newProductDescription').value.trim() || '',
        orderStatus: '',
        sourceType: 'advanced',
        inStock: document.getElementById('newProductInStock').value === 'true'
    };

    sharedProducts.push(newProduct);
    adv_allData.push(newProduct);
    adv_data.push(newProduct);
    adv_populateTable();
    closeAddProductModal();
    alert('New product added successfully!');
}

function adv_edit() {
    if (!adv_selectedId) { alert('Select a product first'); return; }
    if (adv_panel === 'edit') { document.getElementById('rightPanelContent').innerHTML = ''; adv_panel = null; return; }
    const product = adv_data.find(p => p.id === adv_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Edit Product</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div style="display:flex;gap:5px;margin-bottom:15px;"><button class="btn btn-success" style="flex:1;font-size:11px;padding:6px;" onclick="addPhoto()">Add Photo</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="changePhoto()">Change</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="removePhoto()">Remove</button></div>' +
        '<div class="user-info-item"><label>Name:</label><input type="text" class="edit-input" id="editName" value="' + product.name + '"></div>' +
        '<div class="user-info-item"><label>Brand:</label><select class="edit-input" id="editManufacturer">' +
        manufacturersList.map(m => '<option value="' + m + '"' + (product.manufacturer === m ? ' selected' : '') + '>' + m + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>Category:</label><select class="edit-input" id="editCategory">' +
        categoriesList.map(c => '<option value="' + c + '"' + (product.category === c ? ' selected' : '') + '>' + c + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>My Price:</label><input type="number" class="edit-input" id="editMyPrice" value="' + product.myPrice + '"></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><input type="number" class="edit-input" id="editCatalogPrice" value="' + product.catalogPrice + '"></div>' +
        '<div class="edit-actions"><button class="btn-save" onclick="adv_saveProductChanges()">Save changes?</button>' +
        '<button class="btn-cancel" onclick="cancelEdit()">Cancel</button></div></div>';
    adv_panel = 'edit';
}

function adv_saveProductChanges() {
    if (!adv_selectedId) return;
    const product = adv_data.find(p => p.id === adv_selectedId);
    if (!product) return;
    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.myPrice = parseInt(document.getElementById('editMyPrice').value);
    product.catalogPrice = parseInt(document.getElementById('editCatalogPrice').value);
    adv_populateTable();
    adv_showInfo();
    alert('Changes saved successfully!');
}

function adv_cancelEdit() { document.getElementById('rightPanelContent').innerHTML = ''; adv_panel = null; }

function adv_addPhoto() {
    if (!adv_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = adv_data.find(p => p.id === adv_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); adv_edit(); alert('Photo added!'); }
        }
    };
    input.click();
}

function adv_changePhoto() {
    if (!adv_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = adv_data.find(p => p.id === adv_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); adv_edit(); alert('Photo changed!'); }
        }
    };
    input.click();
}

function adv_removePhoto() {
    if (!adv_selectedId) return;
    if (confirm('Remove photo?')) {
        const product = adv_data.find(p => p.id === adv_selectedId);
        if (product) { product.photo = null; adv_edit(); alert('Photo removed!'); }
    }
}

function adv_showInfo() {
    if (!adv_selectedId) { alert('Select a product first'); return; }
    if (adv_panel === 'info') { document.getElementById('rightPanelContent').innerHTML = ''; adv_panel = null; return; }
    const product = adv_data.find(p => p.id === adv_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Product Information</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div class="user-info-item"><label>Name:</label><div class="value">' + product.name + '</div></div>' +
        '<div class="user-info-item"><label>Brand:</label><div class="value">' + product.manufacturer + '</div></div>' +
        '<div class="user-info-item"><label>Category:</label><div class="value">' + product.category + '</div></div>' +
        '<div class="user-info-item"><label>My Price:</label><div class="value">' + formatPrice(product.myPrice) + '</div></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><div class="value">' + formatPrice(product.catalogPrice) + '</div></div>' +
        (product.description ? '<div class="user-info-item"><label>Description:</label><div class="value">' + product.description + '</div></div>' : '') +
        '</div>';
    adv_panel = 'info';
}

function adv_delete() {
    if (!adv_selectedId) { alert('Select a product first'); return; }
    if (!confirm('Sure want delete this product?')) return;
    const idx = adv_data.findIndex(p => p.id === adv_selectedId);
    if (idx > -1) {
        adv_data.splice(idx, 1);
        adv_allData = adv_allData.filter(p => p.id !== adv_selectedId);
        sharedProducts = sharedProducts.filter(p => p.id !== adv_selectedId);
        adv_populateTable();
        adv_selectedId = null;
        adv_panel = null;
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Product deleted successfully');
    }
}

function adv_openManufacturerListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeManufacturerListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeManufacturerListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Brand List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Brand:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newManufacturerInput" placeholder="Enter brand name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewManufacturer()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Brands:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        manufacturersList.map(m => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + m + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeManufacturer(\'' + m + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function adv_closeManufacturerListModal() { document.querySelector('.add-user-modal')?.remove(); }

function adv_addNewManufacturer() {
    const input = document.getElementById('newManufacturerInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a brand name'); return; }
    if (manufacturersList.includes(name)) { alert('Brand already exists'); return; }
    manufacturersList.push(name);
    manufacturersList.sort();
    input.value = '';
    closeManufacturerListModal();
    adv_openManufacturerListModal();
}

function adv_removeManufacturer(manufacturer) {
    const using = adv_data.filter(p => p.manufacturer === manufacturer);
    if (using.length > 0) { alert('Cannot remove "' + manufacturer + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + manufacturer + '"?')) {
        manufacturersList = manufacturersList.filter(m => m !== manufacturer);
        closeManufacturerListModal();
        adv_openManufacturerListModal();
    }
}

function adv_openCategoryListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeCategoryListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeCategoryListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Category List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Category:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newCategoryInput" placeholder="Enter category name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewCategory()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Categories:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        categoriesList.map(c => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + c + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeCategory(\'' + c + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function adv_closeCategoryListModal() { document.querySelector('.add-user-modal')?.remove(); }

function adv_addNewCategory() {
    const input = document.getElementById('newCategoryInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a category name'); return; }
    if (categoriesList.includes(name)) { alert('Category already exists'); return; }
    categoriesList.push(name);
    input.value = '';
    closeCategoryListModal();
    adv_openCategoryListModal();
}

function adv_removeCategory(category) {
    const using = adv_data.filter(p => p.category === category);
    if (using.length > 0) { alert('Cannot remove "' + category + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + category + '"?')) {
        categoriesList = categoriesList.filter(c => c !== category);
        closeCategoryListModal();
        adv_openCategoryListModal();
    }
}

function adv_setupSearch() {
    const sb = document.getElementById('searchBox');
    if (sb) sb.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        document.querySelectorAll('#advancedTable tr').forEach(r => {
            const cells = r.querySelectorAll('td');
            if (cells.length > 0) r.style.display = cells[0].textContent.toLowerCase().includes(term) ? '' : 'none';
        });
    });
}

function adv_applyFilters() {
    let filtered = [...adv_allData];
    if (currentFilters.category) filtered = filtered.filter(p => p.category === currentFilters.category);
    if (currentFilters.manufacturer) filtered = filtered.filter(p => p.manufacturer === currentFilters.manufacturer);
    if (currentFilters.priceMin) filtered = filtered.filter(p => p.catalogPrice >= parseInt(currentFilters.priceMin));
    if (currentFilters.priceMax) filtered = filtered.filter(p => p.catalogPrice <= parseInt(currentFilters.priceMax));
    if (currentFilters.sortOrder === 'asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentFilters.sortOrder === 'desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
    adv_data = filtered;
    adv_populateTable();
    updateBreadcrumbFilters();
}

function adv_updateBreadcrumb() {
    const bc = document.getElementById('breadcrumbFilters');
    if (!bc) return;
    let text = 'Advanced';
    text += currentFilters.sortOrder === 'desc' ? ' (Z-A)' : ' (A-Z)';
    const active = [];
    if (currentFilters.category) active.push(currentFilters.category);
    if (currentFilters.manufacturer) active.push(currentFilters.manufacturer);
    if (currentFilters.priceMin || currentFilters.priceMax) active.push('$' + (currentFilters.priceMin || '0') + '-' + (currentFilters.priceMax || '∞'));
    if (active.length > 0) text += ' | ' + active.join(', ');
    bc.textContent = text;
}

function adv_openFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'filters-modal';
    modal.onclick = function(e) { if (e.target === modal) closeFiltersModal(); };
    const mc = document.createElement('div');
    mc.className = 'filters-modal-content';
    mc.innerHTML = '<button class="filters-modal-close" onclick="closeFiltersModal()">&times;</button>' +
        '<div class="filters-modal-title">Filter Products</div>' +
        '<div class="filter-group"><label class="filter-label">Sort by Name:</label><select class="filter-select" id="filterSortOrder">' +
        '<option value="asc"' + (currentFilters.sortOrder === 'asc' ? ' selected' : '') + '>A - Z</option>' +
        '<option value="desc"' + (currentFilters.sortOrder === 'desc' ? ' selected' : '') + '>Z - A</option></select></div>' +
        '<div class="filter-group"><label class="filter-label">Brand:</label><select class="filter-select" id="filterManufacturer">' +
        '<option value="">All</option>' + manufacturersList.map(m => '<option value="' + m + '"' + (currentFilters.manufacturer === m ? ' selected' : '') + '>' + m + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Category:</label><select class="filter-select" id="filterCategory">' +
        '<option value="">All</option>' + categoriesList.map(c => '<option value="' + c + '"' + (currentFilters.category === c ? ' selected' : '') + '>' + c + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Price Range ($):</label><div class="filter-range">' +
        '<input type="number" placeholder="Min" id="filterPriceMin" value="' + currentFilters.priceMin + '"><span>-</span>' +
        '<input type="number" placeholder="Max" id="filterPriceMax" value="' + currentFilters.priceMax + '"></div></div>' +
        '<div class="filter-actions"><button class="btn-apply-filters">Apply Filters</button>' +
        '<button class="btn-reset-filters" onclick="resetFilters()">Reset</button></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
    mc.querySelector('.btn-apply-filters').addEventListener('click', function() { applyAdvancedFilters(); });
}

function adv_closeFiltersModal() { document.querySelector('.filters-modal')?.remove(); }

function adv_applyAdvancedFilters() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;
    adv_applyFilters();
    closeFiltersModal();
}

function adv_resetFilters() {
    currentFilters = { search: '', category: '', manufacturer: '', priceMin: '', priceMax: '', sortOrder: 'asc' };
    adv_data = [...adv_allData];
    adv_populateTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
}

// ===== STOCK TAB =====

function stock_populateTable() {
    const tableBody = document.getElementById('stockTable');
    tableBody.innerHTML = '';

    stock_data.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'in-stock-table-row';

        if (product.quantity === 0) row.classList.add('out-of-stock');
        else if (product.quantity <= 5) row.classList.add('low-stock');

        row.onclick = function() { selectRow(this, product.id); };

        let badgeClass = 'quantity-available';
        if (product.quantity === 0) badgeClass = 'quantity-out';
        else if (product.quantity <= 5) badgeClass = 'quantity-low';

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
            <td><span class="quantity-badge ${badgeClass}">${product.quantity}</span></td>
            <td>
                <div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </td>
            <td style="text-align: right;">
                <div style="display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="addTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 100px;" onclick="event.stopPropagation();">
                    <option value="catalog">to Catalog</option>
                    <option value="orders">to Orders</option>
                    <option value="wishes">my wishes</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); addProductTo(${product.id});">Add</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function stock_selectRow(element, productId) {
    document.querySelectorAll('#stockTable tr').forEach(r => r.classList.remove('selected'));
    element.classList.add('selected');
    stock_selectedId = productId;
}

function stock_viewDetails(productId) { stock_selectedId = productId; stock_showInfo(); }

function stock_viewPhoto(productId) {
    const product = stock_data.find(p => p.id === productId);
    if (!product) return;
    const modal = document.createElement('div'); modal.className = 'photo-modal'; modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const content = document.createElement('div'); content.className = 'photo-modal-content';
    const close = document.createElement('button'); close.className = 'photo-modal-close'; close.innerHTML = '&times;'; close.onclick = () => modal.remove();
    const title = document.createElement('div'); title.className = 'photo-modal-title'; title.textContent = product.name + "'s Photo";
    content.appendChild(close); content.appendChild(title);
    if (product.photo) { const img = document.createElement('img'); img.className = 'photo-modal-image'; img.src = product.photo; img.alt = product.name; content.appendChild(img); }
    else { const ph = document.createElement('div'); ph.className = 'photo-modal-placeholder'; ph.textContent = 'No photo available'; content.appendChild(ph); }
    modal.appendChild(content); document.body.appendChild(modal);
}

function stock_checkInStock() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    alert(product.name + ' is currently: ' + (product.inStock ? 'In Stock' : 'Out of Stock'));
}

function stock_addInOrders() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    alert(product.name + ' added to orders!');
}

function stock_sortByAvailable() {
    stock_data = [...stock_allData].filter(p => p.quantity > 5).sort((a, b) => b.quantity - a.quantity);
    stock_populateTable();
    updateBreadcrumbFilters();
}

function stock_sortByOutOfStock() {
    stock_data = [...stock_allData].filter(p => p.quantity === 0);
    stock_populateTable();
    updateBreadcrumbFilters();
}

function stock_sortByLowStock() {
    stock_data = [...stock_allData].filter(p => p.quantity > 0).sort((a, b) => a.quantity - b.quantity);
    stock_populateTable();
    updateBreadcrumbFilters();
}

function stock_showAll() {
    currentFilters = { search: '', category: '', manufacturer: '', priceMin: '', priceMax: '', sortOrder: 'asc' };
    const sb = document.getElementById('searchBox');
    if (sb) sb.value = '';
    stock_data = [...stock_allData];
    stock_populateTable();
    updateBreadcrumbFilters();
}

function stock_setQuantity() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Set Quantity</h3>' +
        '<div class="user-info-item"><label>Product:</label><div class="value">' + product.name + '</div></div>' +
        '<div class="user-info-item"><label>Current Quantity:</label><div class="value">' + product.quantity + '</div></div>' +
        '<div class="user-info-item"><label>New Quantity:</label><input type="number" class="edit-input" id="stockNewQuantity" value="' + product.quantity + '" min="0"></div>' +
        '<button class="save-user-btn" onclick="stock_saveQuantity()">Save</button></div>';
}

function stock_saveQuantity() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    const qty = parseInt(document.getElementById('stockNewQuantity').value);
    if (isNaN(qty) || qty < 0) { alert('Enter a valid quantity'); return; }
    product.quantity = qty;
    document.getElementById('rightPanelContent').innerHTML = '';
    stock_populateTable();
    alert('Quantity updated');
}

function stock_showInfo() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    if (stock_panel === 'info') { document.getElementById('rightPanelContent').innerHTML = ''; stock_panel = null; return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Product Information</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div class="user-info-item"><label>Name:</label><div class="value">' + product.name + '</div></div>' +
        '<div class="user-info-item"><label>Brand:</label><div class="value">' + product.manufacturer + '</div></div>' +
        '<div class="user-info-item"><label>Category:</label><div class="value">' + product.category + '</div></div>' +
        '<div class="user-info-item"><label>My Price:</label><div class="value">' + formatPrice(product.myPrice) + '</div></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><div class="value">' + formatPrice(product.catalogPrice) + '</div></div>' +
        '<div class="user-info-item"><label>Quantity:</label><div class="value">' + product.quantity + '</div></div>' +
        (product.description ? '<div class="user-info-item"><label>Description:</label><div class="value">' + product.description + '</div></div>' : '') +
        '</div>';
    stock_panel = 'info';
}

function stock_delete() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    if (!confirm('Sure want delete this product?')) return;
    const idx = stock_data.findIndex(p => p.id === stock_selectedId);
    if (idx > -1) {
        stock_data.splice(idx, 1);
        stock_allData = stock_allData.filter(p => p.id !== stock_selectedId);
        sharedProducts = sharedProducts.filter(p => p.id !== stock_selectedId);
        stock_populateTable();
        stock_selectedId = null;
        stock_panel = null;
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Product deleted successfully');
    }
}

function stock_edit() {
    if (!stock_selectedId) { alert('Select a product first'); return; }
    if (stock_panel === 'edit') { document.getElementById('rightPanelContent').innerHTML = ''; stock_panel = null; return; }
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = '<div class="right-panel-content"><h3>Edit Product</h3>' +
        '<div class="user-photo-preview">' + (product.photo ? '<img src="' + product.photo + '" alt="Product photo">' : 'No photo') + '</div>' +
        '<div style="display:flex;gap:5px;margin-bottom:15px;"><button class="btn btn-success" style="flex:1;font-size:11px;padding:6px;" onclick="addPhoto()">Add Photo</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="changePhoto()">Change</button>' +
        '<button class="btn btn-secondary" style="flex:1;font-size:11px;padding:6px;" onclick="removePhoto()">Remove</button></div>' +
        '<div class="user-info-item"><label>Name:</label><input type="text" class="edit-input" id="editName" value="' + product.name + '"></div>' +
        '<div class="user-info-item"><label>Brand:</label><select class="edit-input" id="editManufacturer">' +
        manufacturersList.map(m => '<option value="' + m + '"' + (product.manufacturer === m ? ' selected' : '') + '>' + m + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>Category:</label><select class="edit-input" id="editCategory">' +
        categoriesList.map(c => '<option value="' + c + '"' + (product.category === c ? ' selected' : '') + '>' + c + '</option>').join('') +
        '</select></div>' +
        '<div class="user-info-item"><label>My Price:</label><input type="number" class="edit-input" id="editMyPrice" value="' + product.myPrice + '"></div>' +
        '<div class="user-info-item"><label>Catalog Price:</label><input type="number" class="edit-input" id="editCatalogPrice" value="' + product.catalogPrice + '"></div>' +
        '<div class="user-info-item"><label>Quantity:</label><input type="number" class="edit-input" id="editQuantity" value="' + product.quantity + '" min="0"></div>' +
        '<div class="edit-actions"><button class="btn-save" onclick="stock_saveBudChanges()">Save changes?</button>' +
        '<button class="btn-cancel" onclick="cancelEdit()">Cancel</button></div></div>';
    stock_panel = 'edit';
}

function stock_saveBudChanges() {
    if (!stock_selectedId) return;
    const product = stock_data.find(p => p.id === stock_selectedId);
    if (!product) return;
    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.myPrice = parseInt(document.getElementById('editMyPrice').value);
    product.catalogPrice = parseInt(document.getElementById('editCatalogPrice').value);
    product.quantity = parseInt(document.getElementById('editQuantity').value);
    stock_populateTable();
    stock_showInfo();
    alert('Changes saved!');
}

function stock_cancelEdit() { document.getElementById('rightPanelContent').innerHTML = ''; stock_panel = null; }

function stock_addPhoto() {
    if (!stock_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = stock_data.find(p => p.id === stock_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); stock_edit(); alert('Photo added!'); }
        }
    };
    input.click();
}

function stock_changePhoto() {
    if (!stock_selectedId) return;
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const product = stock_data.find(p => p.id === stock_selectedId);
            if (product) { product.photo = URL.createObjectURL(file); stock_edit(); alert('Photo changed!'); }
        }
    };
    input.click();
}

function stock_removePhoto() {
    if (!stock_selectedId) return;
    if (confirm('Remove photo?')) {
        const product = stock_data.find(p => p.id === stock_selectedId);
        if (product) { product.photo = null; stock_edit(); alert('Photo removed!'); }
    }
}

function stock_openAddBudModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeAddBudModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-bud-modal-content';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeAddBudModal()">&times;</button>' +
        '<div class="add-user-modal-title">Add New Bud</div>' +
        '<div class="form-rows"><div class="form-column">' +
        '<div class="form-section"><div class="form-section-label">Bud Name *</div><input type="text" class="auth-input" placeholder="Enter bud name" id="newBudName"></div>' +
        '<div class="form-section"><div class="form-section-label">Brand *</div><select class="auth-input" id="newBudManufacturer"><option value="">Select brand</option>' +
        manufacturersList.map(m => '<option value="' + m + '">' + m + '</option>').join('') + '</select></div>' +
        '<div class="form-section"><div class="form-section-label">Category *</div><select class="auth-input" id="newBudCategory"><option value="">Select category</option>' +
        categoriesList.map(c => '<option value="' + c + '">' + c + '</option>').join('') + '</select></div></div>' +
        '<div class="form-column">' +
        '<div class="form-section"><div class="form-section-label">Price ($) *</div><input type="number" class="auth-input" placeholder="0" id="newBudPrice" min="0"></div>' +
        '<div class="form-section"><div class="form-section-label">In Stock</div><select class="auth-input" id="newBudInStock"><option value="true">Yes</option><option value="false">No</option></select></div>' +
        '<div class="form-section"><div class="form-section-label">Photo (optional)</div><input type="file" class="auth-input" id="newBudPhoto" accept="image/*" style="padding:8px;"></div></div></div>' +
        '<div class="form-section" style="margin-bottom:20px;"><div class="form-section-label">Description (optional)</div><textarea class="auth-input" placeholder="Enter description" id="newBudDescription" rows="3" style="resize:vertical;"></textarea></div>' +
        '<div class="info-text">* Required fields</div>' +
        '<button class="save-user-btn" onclick="saveNewBud()">&#10003; Save new Bud</button>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function stock_saveNewBud() {
    const name = document.getElementById('newBudName').value.trim();
    const manufacturer = document.getElementById('newBudManufacturer').value;
    const category = document.getElementById('newBudCategory').value;
    const price = document.getElementById('newBudPrice').value;
    if (!name || name.length < 3) { alert('Enter a valid name (min 3 chars)'); return; }
    if (!manufacturer) { alert('Select a brand'); return; }
    if (!category) { alert('Select a category'); return; }
    if (!price || price <= 0) { alert('Enter a valid price'); return; }
    const photoInput = document.getElementById('newBudPhoto');
    let photoUrl = null;
    if (photoInput.files && photoInput.files[0]) photoUrl = URL.createObjectURL(photoInput.files[0]);
    const newBud = {
        id: sharedProducts.length > 0 ? Math.max(...sharedProducts.map(b => b.id)) + 1 : 1,
        name: name,
        manufacturer: manufacturer,
        category: category,
        myPrice: Math.round(parseInt(price) * 0.8),
        catalogPrice: parseInt(price),
        quantity: document.getElementById('newBudInStock').value === 'true' ? 10 : 0,
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || '',
        orderStatus: '',
        sourceType: 'bud',
        inStock: document.getElementById('newBudInStock').value === 'true'
    };
    sharedProducts.push(newBud);
    stock_allData.push(newBud);
    stock_data.push(newBud);
    stock_populateTable();
    closeAddBudModal();
    alert('New bud added successfully!');
}

function stock_openManufacturerListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeManufacturerListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeManufacturerListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Brand List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Brand:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newManufacturerInput" placeholder="Enter brand name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewManufacturer()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Brands:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        manufacturersList.map(m => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + m + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeManufacturer(\'' + m + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function stock_closeManufacturerListModal() { document.querySelector('.add-user-modal')?.remove(); }

function stock_addNewManufacturer() {
    const input = document.getElementById('newManufacturerInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a brand name'); return; }
    if (manufacturersList.includes(name)) { alert('Brand already exists'); return; }
    manufacturersList.push(name);
    manufacturersList.sort();
    input.value = '';
    closeManufacturerListModal();
    stock_openManufacturerListModal();
}

function stock_removeManufacturer(manufacturer) {
    const using = stock_data.filter(p => p.manufacturer === manufacturer);
    if (using.length > 0) { alert('Cannot remove "' + manufacturer + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + manufacturer + '"?')) {
        manufacturersList = manufacturersList.filter(m => m !== manufacturer);
        closeManufacturerListModal();
        stock_openManufacturerListModal();
    }
}

function stock_openCategoryListModal() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) closeCategoryListModal(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '500px';
    mc.innerHTML = '<button class="add-user-modal-close" onclick="closeCategoryListModal()">&times;</button>' +
        '<div class="add-user-modal-title">Edit Category List</div>' +
        '<div style="margin-bottom:20px;"><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Add New Category:</label>' +
        '<div style="display:flex;gap:10px;"><input type="text" id="newCategoryInput" placeholder="Enter category name" style="flex:1;padding:10px;border:2px solid var(--border-color);border-radius:5px;">' +
        '<button class="btn btn-success" onclick="addNewCategory()">Add</button></div></div>' +
        '<div><label style="display:block;margin-bottom:10px;font-weight:bold;color:var(--blue);">Current Categories:</label>' +
        '<div style="max-height:300px;overflow-y:auto;border:2px solid var(--border-color);border-radius:5px;padding:10px;">' +
        categoriesList.map(c => '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--border-color);"><span>' + c + '</span>' +
        '<button class="btn btn-secondary" style="padding:5px 10px;font-size:12px;" onclick="removeCategory(\'' + c + '\')">Remove</button></div>').join('') +
        '</div></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function stock_closeCategoryListModal() { document.querySelector('.add-user-modal')?.remove(); }

function stock_addNewCategory() {
    const input = document.getElementById('newCategoryInput');
    const name = input.value.trim();
    if (!name) { alert('Enter a category name'); return; }
    if (categoriesList.includes(name)) { alert('Category already exists'); return; }
    categoriesList.push(name);
    input.value = '';
    closeCategoryListModal();
    stock_openCategoryListModal();
}

function stock_removeCategory(category) {
    const using = stock_data.filter(p => p.category === category);
    if (using.length > 0) { alert('Cannot remove "' + category + '" - ' + using.length + ' product(s) use it.'); return; }
    if (confirm('Remove "' + category + '"?')) {
        categoriesList = categoriesList.filter(c => c !== category);
        closeCategoryListModal();
        stock_openCategoryListModal();
    }
}

function stock_setupSearch() {
    const sb = document.getElementById('searchBox');
    if (sb) sb.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        document.querySelectorAll('#stockTable tr').forEach(r => {
            const cells = r.querySelectorAll('td');
            if (cells.length > 0) r.style.display = cells[0].textContent.toLowerCase().includes(term) ? '' : 'none';
        });
    });
}

function stock_applyFilters() {
    let filtered = [...stock_allData];
    if (currentFilters.category) filtered = filtered.filter(p => p.category === currentFilters.category);
    if (currentFilters.manufacturer) filtered = filtered.filter(p => p.manufacturer === currentFilters.manufacturer);
    if (currentFilters.priceMin) filtered = filtered.filter(p => p.catalogPrice >= parseInt(currentFilters.priceMin));
    if (currentFilters.priceMax) filtered = filtered.filter(p => p.catalogPrice <= parseInt(currentFilters.priceMax));
    if (currentFilters.sortOrder === 'asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentFilters.sortOrder === 'desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
    stock_data = filtered;
    stock_populateTable();
    updateBreadcrumbFilters();
}

function stock_updateBreadcrumb() {
    const bc = document.getElementById('breadcrumbFilters');
    if (!bc) return;
    let text = 'In Stock';
    text += currentFilters.sortOrder === 'desc' ? ' (Z-A)' : ' (A-Z)';
    const active = [];
    if (currentFilters.category) active.push(currentFilters.category);
    if (currentFilters.manufacturer) active.push(currentFilters.manufacturer);
    if (currentFilters.priceMin || currentFilters.priceMax) active.push('$' + (currentFilters.priceMin || '0') + '-' + (currentFilters.priceMax || '∞'));
    if (active.length > 0) text += ' | ' + active.join(', ');
    bc.textContent = text;
}

function stock_openFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'filters-modal';
    modal.onclick = function(e) { if (e.target === modal) closeFiltersModal(); };
    const mc = document.createElement('div');
    mc.className = 'filters-modal-content';
    mc.innerHTML = '<button class="filters-modal-close" onclick="closeFiltersModal()">&times;</button>' +
        '<div class="filters-modal-title">Filter Stock</div>' +
        '<div class="filter-group"><label class="filter-label">Sort by Name:</label><select class="filter-select" id="filterSortOrder">' +
        '<option value="asc"' + (currentFilters.sortOrder === 'asc' ? ' selected' : '') + '>A - Z</option>' +
        '<option value="desc"' + (currentFilters.sortOrder === 'desc' ? ' selected' : '') + '>Z - A</option></select></div>' +
        '<div class="filter-group"><label class="filter-label">Brand:</label><select class="filter-select" id="filterManufacturer">' +
        '<option value="">All</option>' + manufacturersList.map(m => '<option value="' + m + '"' + (currentFilters.manufacturer === m ? ' selected' : '') + '>' + m + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Category:</label><select class="filter-select" id="filterCategory">' +
        '<option value="">All</option>' + categoriesList.map(c => '<option value="' + c + '"' + (currentFilters.category === c ? ' selected' : '') + '>' + c + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Price Range ($):</label><div class="filter-range">' +
        '<input type="number" placeholder="Min" id="filterPriceMin" value="' + currentFilters.priceMin + '"><span>-</span>' +
        '<input type="number" placeholder="Max" id="filterPriceMax" value="' + currentFilters.priceMax + '"></div></div>' +
        '<div class="filter-actions"><button class="btn-apply-filters">Apply Filters</button>' +
        '<button class="btn-reset-filters" onclick="resetFilters()">Reset</button></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
    mc.querySelector('.btn-apply-filters').addEventListener('click', function() { applyAdvancedFilters(); });
}

function stock_closeFiltersModal() { document.querySelector('.filters-modal')?.remove(); }

function stock_applyAdvancedFilters() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;
    stock_applyFilters();
    closeFiltersModal();
}

function stock_resetFilters() {
    currentFilters = { search: '', category: '', manufacturer: '', priceMin: '', priceMax: '', sortOrder: 'asc' };
    stock_data = [...stock_allData];
    stock_populateTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
}

// ===== MY-WISHES TAB =====
function mw_populateTable() {
    const tableBody = document.getElementById('wishesTable');
    tableBody.innerHTML = '';

    mw_data.forEach(product => {
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
            <td><div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </td>
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

function mw_selectRow(element, productId) {
    document.querySelectorAll('#wishesTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    mw_selectedId = productId;
}

function mw_viewDetails(productId) {
    mw_selectedId = productId;
    showInfo();
}

function mw_viewPhoto(productId) {
    const product = mw_data.find(b => b.id === productId);
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
    closeBtn.innerHTML = 'Г—';
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


function mw_addBudTo(productId) {
    const product = mw_data.find(b => b.id === productId);
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

function mw_addToStock(productId) {
    const product = mw_data.find(b => b.id === productId);
    if (!product) return;
    alert(`${product.name} added to stock!`);
}

function mw_checkInStock() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }
    const product = mw_data.find(b => b.id === mw_selectedId);
    if (!product) return;

    const status = product.inStock ? 'In Stock' : 'Out of Stock';
    alert(`${product.name} is currently: ${status}`);
}

function mw_addInOrders() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }
    const product = mw_data.find(b => b.id === mw_selectedId);
    if (!product) return;

    alert(`${product.name} added to orders!`);
}

function mw_openAddWishModal() {
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
        <button class="add-user-modal-close" onclick="closeAddWishModal()">Г—</button>

        <div class="add-user-modal-title">Add New Bud</div>

        <div class="form-rows">
            <!-- Left Column -->
            <div class="form-column">
                <div class="form-section">
                    <div class="form-section-label">Bud Name *</div>
                    <input type="text" class="auth-input" placeholder="Enter product name" id="newBudName">
                    <div class="warning-icon" id="newBudNameWarning">вљ пёЏ</div>
                    <div class="password-info" id="newBudNameInfo"></div>
                </div>

                <div class="form-section">
                    <div class="form-section-label">Brand *</div>
                    <select class="auth-input" id="newBudManufacturer">
                        <option value="">Select brand</option>
                        ${manufacturersList.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                    <div class="warning-icon" id="newBudManufacturerWarning">вљ пёЏ</div>
                </div>

                <div class="form-section">
                    <div class="form-section-label">Category *</div>
                    <select class="auth-input" id="newBudCategory">
                        <option value="">Select category</option>
                        ${categoriesList.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                    <div class="warning-icon" id="newBudCategoryWarning">вљ пёЏ</div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="form-column">
                <div class="form-section">
                    <div class="form-section-label">Price ($) *</div>
                    <input type="number" class="auth-input" placeholder="0" id="newBudPrice" min="0">
                    <div class="warning-icon" id="newBudPriceWarning">вљ пёЏ</div>
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
            вњ“ Save new Bud
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    setupNewWishValidation();
}

function mw_closeAddWishModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function mw_setupNewWishValidation() {
    document.getElementById('newBudName').addEventListener('change', validateNewWishName);
    document.getElementById('newBudManufacturer').addEventListener('change', validateNewWishManufacturer);
    document.getElementById('newBudCategory').addEventListener('change', validateNewWishCategory);
    document.getElementById('newBudPrice').addEventListener('change', validateNewWishPrice);
}

function mw_validateNewWishName() {
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
        info.textContent = 'Name must be at least 3 characters вќЊ';
        info.style.color = 'var(--primary-green)';
        return false;
    }

    warning.classList.remove('show');
    info.textContent = 'Name is valid вњ“';
    info.style.color = 'var(--light-green)';
    return true;
}

function mw_validateNewWishManufacturer() {
    const manufacturer = document.getElementById('newBudManufacturer').value;
    const warning = document.getElementById('newBudManufacturerWarning');

    if (!manufacturer) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function mw_validateNewWishCategory() {
    const category = document.getElementById('newBudCategory').value;
    const warning = document.getElementById('newBudCategoryWarning');

    if (!category) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function mw_validateNewWishPrice() {
    const price = document.getElementById('newBudPrice').value;
    const warning = document.getElementById('newBudPriceWarning');

    if (!price || price <= 0) {
        warning.classList.add('show');
        return false;
    }

    warning.classList.remove('show');
    return true;
}

function mw_saveNewWish() {
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

    const catalogPrice = parseInt(document.getElementById('newBudPrice').value);
    const newBud = {
        id: sharedProducts.length > 0 ? Math.max(...sharedProducts.map(b => b.id)) + 1 : 1,
        name: document.getElementById('newBudName').value.trim(),
        manufacturer: document.getElementById('newBudManufacturer').value,
        category: document.getElementById('newBudCategory').value,
        myPrice: Math.round(catalogPrice * 0.8),
        catalogPrice: catalogPrice,
        quantity: 0,
        photo: photoUrl,
        description: document.getElementById('newBudDescription').value.trim() || '',
        orderStatus: '',
        sourceType: 'bud',
        inStock: document.getElementById('newBudInStock').value === 'true'
    };

    sharedProducts.push(newBud);
    mw_allData.push(newBud);
    mw_data.push(newBud);
    populatewishesTable();
    closeAddWishModal();

    alert('New product added successfully!');
}

function mw_edit() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }

    if (mw_panel === 'edit') {
        document.getElementById('rightPanelContent').innerHTML = '';
        mw_panel = null;
        return;
    }

    const product = mw_data.find(b => b.id === mw_selectedId);
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
                <label>Brand:</label>
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
                <label>My Price:</label>
                <input type="number" class="edit-input" id="editMyPrice" value="${product.myPrice}">
            </div>
            <div class="user-info-item">
                <label>Catalog Price:</label>
                <input type="number" class="edit-input" id="editCatalogPrice" value="${product.catalogPrice}">
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

    mw_panel = 'edit';
}

function mw_addPhoto() {
    if (!mw_selectedId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const product = mw_data.find(b => b.id === mw_selectedId);
            if (product) {
                product.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo added successfully!');
            }
        }
    };

    fileInput.click();
}

function mw_changePhoto() {
    if (!mw_selectedId) return;

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const photoUrl = URL.createObjectURL(file);
            const product = mw_data.find(b => b.id === mw_selectedId);
            if (product) {
                product.photo = photoUrl;
                editBud(); // Refresh edit panel
                alert('Photo changed successfully!');
            }
        }
    };

    fileInput.click();
}

function mw_removePhoto() {
    if (!mw_selectedId) return;
    if (confirm('Are you sure you want to remove the photo?')) {
        const product = mw_data.find(b => b.id === mw_selectedId);
        if (product) {
            product.photo = null;
            editBud(); // Refresh edit panel
            alert('Photo removed successfully!');
        }
    }
}

function mw_saveBudChanges() {
    if (!mw_selectedId) return;

    const product = mw_data.find(b => b.id === mw_selectedId);
    if (!product) return;

    product.name = document.getElementById('editName').value;
    product.manufacturer = document.getElementById('editManufacturer').value;
    product.category = document.getElementById('editCategory').value;
    product.myPrice = parseInt(document.getElementById('editMyPrice').value);
    product.catalogPrice = parseInt(document.getElementById('editCatalogPrice').value);
    product.inStock = document.getElementById('editInStock').value === 'true';
    product.quantity = product.inStock ? (product.quantity || 10) : 0;
    product.description = document.getElementById('editDescription').value;

    populatewishesTable();
    showInfo();

    alert('Changes saved successfully!');
}

function mw_cancelEdit() {
    document.getElementById('rightPanelContent').innerHTML = '';
    mw_panel = null;
}

function mw_showInfo() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }

    if (mw_panel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        mw_panel = null;
        return;
    }

    const product = mw_data.find(b => b.id === mw_selectedId);
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
                <label>Brand:</label>
                <div class="value">${product.manufacturer}</div>
            </div>

            <div class="user-info-item">
                <label>Category:</label>
                <div class="value">${product.category}</div>
            </div>

            <div class="user-info-item">
                <label>My Price (Purchase):</label>
                <div class="value">${formatPrice(product.myPrice)}</div>
            </div>
            <div class="user-info-item">
                <label>Catalog Price (Users):</label>
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

    mw_panel = 'info';
}

function mw_delete() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }

    if (confirm('Sure want delete this product?')) {
        const index = mw_data.findIndex(b => b.id === mw_selectedId);
        if (index > -1) {
            mw_data.splice(index, 1);
            mw_allData = mw_data.filter(b => mw_allData.some(ab => ab.id === b.id));
            populatewishesTable();
            mw_selectedId = null;
            mw_panel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Bud deleted successfully');
        }
    }
}

// Manufacturer List Management
function mw_openManufacturerListModal() {
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
        <button class="add-user-modal-close" onclick="closeManufacturerListModal()">Г—</button>

        <div class="add-user-modal-title">Edit Brand List</div>

        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Add New Brand:</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="newManufacturerInput" placeholder="Enter brand name"
                    style="flex: 1; padding: 10px; border: 2px solid var(--border-color); border-radius: 5px;">
                <button class="btn btn-success" onclick="addNewManufacturer()">Add</button>
            </div>
        </div>

        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--blue);">Current Brands:</label>
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

function mw_closeManufacturerListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function mw_addNewManufacturer() {
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

function mw_removeManufacturer(manufacturer) {
    // Check if any products use this manufacturer
    const productsUsingManufacturer = mw_data.filter(b => b.manufacturer === manufacturer);

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
function mw_openCategoryListModal() {
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
        <button class="add-user-modal-close" onclick="closeCategoryListModal()">Г—</button>

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

function mw_closeCategoryListModal() {
    const modal = document.querySelector('.add-user-modal');
    if (modal) {
        modal.remove();
    }
}

function mw_addNewCategory() {
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

function mw_removeCategory(category) {
    // Check if any products use this category
    const productsUsingCategory = mw_data.filter(b => b.category === category);

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


function mw_setupSearch() {
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

function mw_applyFilters() {
    let filtered = [...mw_allData];

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

    mw_data = filtered;
    populatewishesTable();
    updateBreadcrumbFilters();
}

function mw_updateBreadcrumb() {
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
        const priceRange = `$${currentFilters.priceMin || '0'}-${currentFilters.priceMax || 'в€ћ'}`;
        activeFilters.push(priceRange);
    }

    if (activeFilters.length > 0) {
        filterText += ' | ' + activeFilters.join(', ');
    }

    breadcrumb.textContent = filterText;
}

function mw_openFiltersModal() {
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
        <button class="filters-modal-close" onclick="closeFiltersModal()">Г—</button>

        <div class="filters-modal-title">Filter Stock</div>

        <div class="filter-group">
            <label class="filter-label">Sort by Name:</label>
            <select class="filter-select" id="filterSortOrder">
                <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A - Z</option>
                <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z - A</option>
            </select>
        </div>

        <div class="filter-group">
            <label class="filter-label">Brand:</label>
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


function mw_applyAdvancedFilters() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;

    applyFilters();
    closeFiltersModal();
}

function mw_resetFilters() {
    currentFilters = {
        search: '',
        category: '',
        manufacturer: '',
        priceMin: '',
        priceMax: '',
        sortOrder: 'asc'
    };

    mw_data = [...mw_allData];
    populatewishesTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
}


function applyWishAction(productId) {
    const product = mw_data.find(p => p.id === productId);
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

function mw_showAll() {
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
    mw_data = [...mw_allData];
    mw_populateTable();
    updateBreadcrumbFilters();
}

function mw_delete() {
    if (!mw_selectedId) {
        alert('Please select a product first');
        return;
    }
    if (confirm('Sure want delete this product?')) {
        const index = mw_data.findIndex(p => p.id === mw_selectedId);
        if (index > -1) {
            mw_data.splice(index, 1);
            mw_allData = mw_allData.filter(p => p.id !== mw_selectedId);
            populatewishesTable();
            mw_selectedId = null;
            mw_panel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Product deleted successfully');
        }
    }
}

// Currency functions







// ===== USER-WISHES TAB =====
let uw_wishesData = [
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
let alluw_wishesData = [];

function uw_populateTable() {
    const tableBody = document.getElementById('userWishesTable');
    tableBody.innerHTML = '';

    // Group wishes by budId
    const groupedWishes = {};
    uw_wishesData.forEach(wish => {
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

function uw_selectRow(element, wishId) {
    document.querySelectorAll('#userWishesTable tr').forEach(row => {
        row.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedWishId = wishId;
}

function uw_viewDetails(wishId) {
    selectedWishId = wishId;
    showInfo();
}

function viewGroupDetails(budId) {
    // Find first wish with this budId
    const wish = uw_wishesData.find(w => w.budId === budId);
    if (wish) {
        selectedWishId = wish.id;
        showGroupInfo(budId);
    }
}

function viewGroupPhoto(budId) {
    const wish = uw_wishesData.find(w => w.budId === budId);
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
    closeBtn.innerHTML = 'Г—';
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

function uw_viewPhoto(wishId) {
    const wish = uw_wishesData.find(w => w.id === wishId);
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
    closeBtn.innerHTML = 'Г—';
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


function uw_quickAddToOrders(wishId) {
    const wish = uw_wishesData.find(w => w.id === wishId);
    if (!wish) return;

    if (confirm(`Add "${wish.budName}" (requested by ${wish.userName}) to orders?`)) {
        alert(`${wish.budName} added to orders!`);
        // Here you would typically make an API call to add to orders
    }
}

function uw_checkInStock() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }
    const wish = uw_wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    // Simulate stock check
    const inStock = Math.random() > 0.3; // Random for demo
    const status = inStock ? 'In Stock' : 'Out of Stock';
    alert(`${wish.budName} is currently: ${status}`);
}

function uw_addToOrders() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }
    const wish = uw_wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    if (confirm(`Add "${wish.budName}" (requested by ${wish.userName}) to orders?`)) {
        alert(`${wish.budName} added to orders!`);
    }
}

function uw_removeFromWishlist() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }

    const wish = uw_wishesData.find(w => w.id === selectedWishId);
    if (!wish) return;

    if (confirm(`Remove "${wish.budName}" from ${wish.userName}'s wishlist?`)) {
        const index = uw_wishesData.findIndex(w => w.id === selectedWishId);
        if (index > -1) {
            uw_wishesData.splice(index, 1);
            alluw_wishesData = uw_wishesData.filter(w => alluw_wishesData.some(aw => aw.id === w.id));
            uw_populateTable();
            selectedWishId = null;
            currentPanel = null;
            document.getElementById('rightPanelContent').innerHTML = '';
            alert('Item removed from wishlist successfully');
        }
    }
}

function uw_showAlerts() {
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
                    <div style="font-size: 48px; color: #9e9e9e; margin-bottom: 15px;">рџ””</div>
                    <div style="color: #9e9e9e; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                        No new alerts
                    </div>
                    <div style="color: #bdbdbd; font-size: 13px; line-height: 1.5;">
                        User requests will appear here when users submit orders for products not in the catalog.
                    </div>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <div style="font-weight: bold; color: var(--blue); margin-bottom: 8px; font-size: 13px;">
                        в„№пёЏ Coming Soon:
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

function uw_showInfo() {
    if (!selectedWishId) {
        alert('Please select a wish item first');
        return;
    }

    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    const wish = uw_wishesData.find(w => w.id === selectedWishId);
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
                <label>Brand:</label>
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

function uw_showGroupInfo(budId) {
    if (currentPanel === 'info') {
        document.getElementById('rightPanelContent').innerHTML = '';
        currentPanel = null;
        return;
    }

    // Get all wishes for this bud
    const groupWishes = uw_wishesData.filter(w => w.budId === budId);
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
                <label>Brand:</label>
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


function uw_setupSearch() {
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
            const tableBody = document.getElementById('userWishesTable');
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

function uw_applyFilters() {
    let filtered = [...alluw_wishesData];

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

    uw_wishesData = filtered;
    uw_populateTable();
    updateBreadcrumbFilters();
}

function uw_updateBreadcrumb() {
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
        const priceRange = `$${currentFilters.priceMin || '0'}-${currentFilters.priceMax || 'в€ћ'}`;
        activeFilters.push(priceRange);
    }

    if (activeFilters.length > 0) {
        filterText += ' | ' + activeFilters.join(', ');
    }

    breadcrumb.textContent = filterText;
}

function uw_openFiltersModal() {
    // Get unique manufacturers, categories, and users from data
    const manufacturers = [...new Set(alluw_wishesData.map(w => w.manufacturer))].sort();
    const categories = [...new Set(alluw_wishesData.map(w => w.category))].sort();
    const users = [...new Set(alluw_wishesData.map(w => w.userName))].sort();

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
        <button class="filters-modal-close" onclick="closeFiltersModal()">Г—</button>

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
            <label class="filter-label">Brand:</label>
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


function uw_applyAdvancedFilters() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.userName = document.getElementById('filterUserName').value;
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;

    applyFilters();
    closeFiltersModal();
}

function uw_resetFilters() {
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

    uw_wishesData = [...alluw_wishesData];
    uw_populateTable();
    closeFiltersModal();
    updateBreadcrumbFilters();
}

// ===== ORDERS TAB =====
function ord_populateTable() {
    const tableBody = document.getElementById('ordersTable');
    tableBody.innerHTML = '';

    ord_data.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'orders-table-row';
        row.onclick = function() { ord_selectRow(this, product.id); };

        let statusLabel = product.orderStatus;
        if (statusLabel === 'ordered') statusLabel = 'Ordered';
        else if (statusLabel === 'ordernow') statusLabel = 'Order Now';
        else if (statusLabel === 'delivered') statusLabel = 'Delivered';

        row.innerHTML = `
            <td>
                <a href="#" class="user-name-link" onclick="event.stopPropagation(); ord_viewDetails(${product.id}); return false;">
                    ${product.name}
                </a>
            </td>
            <td>
                <a href="#" class="user-photo-link" onclick="event.stopPropagation(); ord_viewPhoto(${product.id}); return false;">
                    View photo
                </a>
            </td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td><span class="quantity-badge quantity-available">${product.quantity}</span></td>
            <td>
                <div style="font-size: 11px; color: #666;">My: ${formatPrice(product.myPrice)}</div>
                <div style="font-weight: 500;">${formatPrice(product.catalogPrice)}</div>
            </td>
            <td style="text-align: right;">
                <div style="display: flex; gap: 5px; align-items: center; justify-content: flex-end;">
                <select class="btn btn-secondary" id="orderTarget${product.id}" style="padding: 6px 8px; font-size: 12px; min-width: 120px;" onclick="event.stopPropagation();">
                    <option value="" selected="">select action</option>
                    <option value="finished">to Finished</option>
                    <option value="ordered">to Ordered</option>
                    <option value="ordernow">to Order Now</option>
                    <option value="catalog">to Catalog</option>
                    <option value="wishes">my wishes</option>
                    <option value="instock">In stock</option>
                </select>
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="event.stopPropagation(); ord_applyAction(${product.id});">Apply</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function ord_selectRow(element, productId) {
    document.querySelectorAll('#ordersTable tr').forEach(row => row.classList.remove('selected'));
    element.classList.add('selected');
    ord_selectedId = productId;
}

function ord_viewDetails(productId) {
    ord_selectedId = productId;
    ord_showInfo();
}

function ord_showInfo() {
    if (!ord_selectedId) { alert('Select a product first'); return; }
    const product = ord_data.find(p => p.id === ord_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    if (panel.innerHTML.trim() !== '') { panel.innerHTML = ''; return; }

    let statusLabel = product.orderStatus;
    if (statusLabel === 'ordered') statusLabel = 'Ordered';
    else if (statusLabel === 'ordernow') statusLabel = 'Order Now';
    else if (statusLabel === 'delivered') statusLabel = 'Delivered';

    panel.innerHTML = `
        <div class="right-panel-content">
            <h3>Order Information</h3>
            <div class="user-info-item"><label>Name:</label><div class="value">${product.name}</div></div>
            <div class="user-info-item"><label>Brand:</label><div class="value">${product.manufacturer}</div></div>
            <div class="user-info-item"><label>Category:</label><div class="value">${product.category}</div></div>
            <div class="user-info-item"><label>Quantity:</label><div class="value">${product.quantity}</div></div>
            <div class="user-info-item"><label>My Price:</label><div class="value">${formatPrice(product.myPrice)}</div></div>
            <div class="user-info-item"><label>Catalog Price:</label><div class="value">${formatPrice(product.catalogPrice)}</div></div>
            <div class="user-info-item"><label>Status:</label><div class="value">${statusLabel}</div></div>
            ${product.description ? `<div class="user-info-item"><label>Description:</label><div class="value">${product.description}</div></div>` : ''}
        </div>
    `;
}

function ord_setQuantity() {
    if (!ord_selectedId) { alert('Select a product first'); return; }
    const product = ord_data.find(p => p.id === ord_selectedId);
    if (!product) return;

    const panel = document.getElementById('rightPanelContent');
    panel.innerHTML = `
        <div class="right-panel-content">
            <h3>Set Quantity</h3>
            <div class="user-info-item"><label>Product:</label><div class="value">${product.name}</div></div>
            <div class="user-info-item"><label>Current Quantity:</label><div class="value">${product.quantity}</div></div>
            <div class="user-info-item">
                <label>New Quantity:</label>
                <input type="number" class="edit-input" id="ordNewQuantity" value="${product.quantity}" min="0">
            </div>
            <button class="save-user-btn" onclick="ord_saveQuantity()">Save</button>
        </div>
    `;
}

function ord_saveQuantity() {
    if (!ord_selectedId) { alert('Select a product first'); return; }
    const product = ord_data.find(p => p.id === ord_selectedId);
    if (!product) return;
    const newQty = parseInt(document.getElementById('ordNewQuantity').value);
    if (isNaN(newQty) || newQty < 0) { alert('Enter a valid quantity'); return; }
    product.quantity = newQty;
    document.getElementById('rightPanelContent').innerHTML = '';
    ord_populateTable();
    alert('Quantity updated successfully');
}

function ord_viewPhoto(productId) {
    const product = ord_data.find(p => p.id === productId);
    if (!product) return;
    const modal = document.createElement('div'); modal.className = 'photo-modal'; modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const content = document.createElement('div'); content.className = 'photo-modal-content';
    const close = document.createElement('button'); close.className = 'photo-modal-close'; close.innerHTML = '&times;'; close.onclick = () => modal.remove();
    const title = document.createElement('div'); title.className = 'photo-modal-title'; title.textContent = product.name + "'s Photo";
    content.appendChild(close); content.appendChild(title);
    if (product.photo) { const img = document.createElement('img'); img.className = 'photo-modal-image'; img.src = product.photo; img.alt = product.name; content.appendChild(img); }
    else { const ph = document.createElement('div'); ph.className = 'photo-modal-placeholder'; ph.textContent = 'No photo available'; content.appendChild(ph); }
    modal.appendChild(content); document.body.appendChild(modal);
}

function ord_applyAction(productId) {
    const select = document.getElementById('orderTarget' + productId);
    if (!select || !select.value) { alert('Select an action first'); return; }
    const action = select.value;
    const product = ord_data.find(p => p.id === productId);
    if (!product) return;

    switch(action) {
        case 'finished':
            product.orderStatus = 'delivered';
            alert(product.name + ' moved to Finished (Delivered)!');
            break;
        case 'ordered':
            product.orderStatus = 'ordered';
            alert(product.name + ' moved to Ordered!');
            break;
        case 'ordernow':
            product.orderStatus = 'ordernow';
            alert(product.name + ' moved to Order Now!');
            break;
        case 'catalog':
            alert(product.name + ' added to Catalog!');
            break;
        case 'wishes':
            if (!mw_data.find(p => p.id === productId)) {
                mw_data.push({...product});
                mw_allData = [...mw_data];
            }
            alert(product.name + ' added to My wishes!');
            break;
        case 'instock':
            if (!stock_data.find(p => p.id === productId)) {
                stock_data.push({...product});
                stock_allData = [...stock_data];
            }
            alert(product.name + ' added to In stock!');
            break;
    }
    select.value = '';
    ord_populateTable();
}

function ord_showOrdered() {
    ord_data = [...ord_allData].filter(p => p.orderStatus === 'ordered');
    ord_populateTable();
}

function ord_showOrderNow() {
    ord_data = [...ord_allData].filter(p => p.orderStatus === 'ordernow');
    ord_populateTable();
}

function ord_showDelivered() {
    ord_data = [...ord_allData].filter(p => p.orderStatus === 'delivered');
    ord_populateTable();
}

function ord_delete() {
    if (!ord_selectedId) { alert('Select a product first'); return; }
    if (!confirm('Sure want delete this product?')) return;
    const idx = ord_data.findIndex(p => p.id === ord_selectedId);
    if (idx > -1) {
        ord_data.splice(idx, 1);
        ord_allData = ord_allData.filter(p => p.id !== ord_selectedId);
        ord_populateTable();
        ord_selectedId = null;
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Product deleted successfully');
    }
}


