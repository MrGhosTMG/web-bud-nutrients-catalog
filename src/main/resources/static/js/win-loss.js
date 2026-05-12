let wl_data = [];
let wl_selectedId = null;
let wl_currentFilters = { search: '', sortOrder: '', filterManufacturer: '', filterCategory: '' };
let wl_currentTimeRange = 'week';
let wl_currentSort = '';
let wl_panelProductId = null;
let wl_manufacturersList = [];
let wl_categoriesList = [];

let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '\u20be', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

function convertPrice(priceInGEL, targetCurrency) {
    const c = currencies.find(c => c.code === targetCurrency);
    if (!c) return priceInGEL;
    const usd = priceInGEL / currencies.find(c => c.code === 'GEL').rateToUSD;
    return usd * c.rateToUSD;
}

function formatPrice(priceInGEL, targetCurrency) {
    if (targetCurrency === undefined) targetCurrency = currentCurrency;
    const c = currencies.find(c => c.code === targetCurrency);
    if (!c) return priceInGEL.toFixed(2) + ' \u20be';
    const v = convertPrice(priceInGEL, targetCurrency);
    return c.symbol + v.toFixed(2);
}

function cycleCurrency() {
    const ci = currencies.findIndex(c => c.code === currentCurrency);
    const ni = (ci + 1) % currencies.length;
    currentCurrency = currencies[ni].code;
    document.getElementById('currencyText').textContent = '\u{1F4B1} ' + currentCurrency;
    wl_populateTable();
    wl_refreshSummary();
}

function openCurrencySettings() {
    const m = document.createElement('div'); m.className = 'modal'; m.style.display = 'flex'; m.style.zIndex = '9999';
    const savedRange = localStorage.getItem('wl_defaultTimeRange') || 'week';
    const html = currencies.map((c,i) => `<div class="currency-item-compact"><div class="currency-info-compact"><strong>${c.code}</strong> ${c.symbol} <span class="currency-rate">1 USD = ${c.rateToUSD}</span></div><div class="currency-actions-compact"><button class="btn-icon" onclick="editCurrencyRate(${i})" title="Edit">\u270F\uFE0F</button>${c.code !== 'GEL' ? `<button class="btn-icon btn-delete" onclick="deleteCurrency(${i})" title="Delete">\uD83D\uDDD1\uFE0F</button>` : ''}</div></div>`).join('');
    m.innerHTML = `<div class="modal-content currency-settings-modal-compact"><span class="close" onclick="this.closest('.modal').remove()">&times;</span><h3>Settings</h3><div class="currency-list-compact">${html}</div><div class="add-currency-compact"><input type="text" id="newCurrencyCode" placeholder="Code" maxlength="3"><input type="text" id="newCurrencySymbol" placeholder="Symbol" maxlength="3"><input type="number" id="newCurrencyRate" placeholder="Rate" step="0.01" min="0.01"><button class="btn-add" onclick="addNewCurrency()" title="Add">+</button></div><hr style="margin:12px 0;border-color:var(--border-color);"><label style="font-size:13px;font-weight:600;">Default Period:</label><select id="wlDefaultPeriod" style="width:100%;padding:6px 8px;border:2px solid var(--border-color);border-radius:5px;font-size:12px;margin-top:6px;"><option value="week"${savedRange === 'week' ? ' selected' : ''}>Week</option><option value="month"${savedRange === 'month' ? ' selected' : ''}>Month</option><option value="all"${savedRange === 'all' ? ' selected' : ''}>All Time</option></select><button class="btn btn-primary" style="width:100%;padding:8px;font-size:12px;margin-top:10px;" onclick="wl_saveDefaultPeriod()">Save Filter</button></div>`;
    document.body.appendChild(m); setTimeout(() => { m.querySelector('.currency-settings-modal-compact')?.classList.add('modal-expand'); }, 10);
}

function wl_saveDefaultPeriod() {
    const range = document.getElementById('wlDefaultPeriod').value;
    localStorage.setItem('wl_defaultTimeRange', range);
    document.querySelector('.modal')?.remove();
    wl_setTimeRange(range);
}

function editCurrencyRate(i) {
    const c = currencies[i];
    const r = prompt('Enter new rate to USD for ' + c.code + ':', c.rateToUSD);
    if (r !== null && !isNaN(r) && parseFloat(r) > 0) { currencies[i].rateToUSD = parseFloat(r); openCurrencySettings(); document.querySelector('.modal')?.remove(); wl_populateTable(); wl_refreshSummary(); }
}

function deleteCurrency(i) {
    const c = currencies[i];
    if (confirm('Delete ' + c.code + '?')) { currencies.splice(i,1); if (currentCurrency === c.code) { currentCurrency = 'GEL'; document.getElementById('currencyText').textContent = '\u{1F4B1} GEL'; } openCurrencySettings(); document.querySelector('.modal')?.remove(); wl_populateTable(); wl_refreshSummary(); }
}

function addNewCurrency() {
    const code = document.getElementById('newCurrencyCode').value.trim().toUpperCase();
    const sym = document.getElementById('newCurrencySymbol').value.trim();
    const rate = parseFloat(document.getElementById('newCurrencyRate').value);
    if (!code || !sym || isNaN(rate) || rate <= 0) { alert('Fill all fields'); return; }
    if (currencies.find(c => c.code === code)) { alert('Currency exists'); return; }
    currencies.push({ code, name: code, symbol: sym, rateToUSD: rate });
    openCurrencySettings(); document.querySelector('.modal')?.remove();
}

function getUpdatedCurrencyRates() { alert('Will be implemented with backend API'); }

function setupLogoutButton() {
    const btn = document.querySelector('.logout-btn');
    if (btn) btn.addEventListener('click', function() { if (confirm('Logout?')) window.location.href = 'index.html'; });
}

document.addEventListener('DOMContentLoaded', function() {
    setupLogoutButton();
    wl_manufacturersList = [...sharedManufacturersList];
    wl_categoriesList = [...sharedCategoriesList];
    wl_init();
});

function wl_init() {
    wl_data = sharedProducts.map(p => ({
        ...p,
        forSale: p.forSale || false,
        actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null
    }));
    const savedRange = localStorage.getItem('wl_defaultTimeRange');
    if (savedRange) {
        wl_currentTimeRange = savedRange;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('time-btn-active'));
        const btn = document.getElementById('timeBtn' + savedRange.charAt(0).toUpperCase() + savedRange.slice(1));
        if (btn) btn.classList.add('time-btn-active');
    }
    wl_populateTable();
    wl_refreshSummary();
    wl_setupSearch();
}

function wl_getDisplayData() {
    let filtered = [...wl_data];
    if (wl_currentFilters.search) {
        const term = wl_currentFilters.search.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.manufacturer.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
    }
    if (wl_currentTimeRange !== 'all') {
        const now = new Date();
        const cutoff = new Date();
        if (wl_currentTimeRange === 'week') cutoff.setDate(now.getDate() - 7);
        else if (wl_currentTimeRange === 'month') cutoff.setDate(now.getDate() - 30);
        filtered = filtered.filter(p => p.orderDate && new Date(p.orderDate) >= cutoff);
    }
    return filtered;
}

function wl_populateTable() {
    const tbody = document.getElementById('winlossTable');
    tbody.innerHTML = '';
    const data = wl_getDisplayData();

    data.forEach(p => {
        const profit = calcProfit(p);
        const margin = calcProfitMargin(p);
        const days = daysSince(p.orderDate);
        const isOld = days !== null && days > 28;

        const row = document.createElement('tr');
        row.className = 'winloss-table-row' + (isOld ? ' old-order' : '');
        if (p.id === wl_selectedId) row.classList.add('selected');
        row.onclick = function() { wl_selectRow(this, p.id); };

        let statusText = '';
        let statusClass = '';
        if (p.orderStatus === 'ordered' || p.orderStatus === 'ordernow') {
            statusText = 'Active';
            statusClass = 'status-active';
        } else if (p.orderStatus === 'delivered') {
            statusText = 'Delivered';
            statusClass = 'status-delivered';
        } else {
            statusText = 'In Stock';
            statusClass = 'status-instock';
        }
        if (isOld) {
            statusText = 'Auction';
            statusClass = 'status-auction';
        }
        if (p.forSale) {
            statusText = 'For Sale';
            statusClass = 'status-forsale';
        }

        row.innerHTML = `
            <td><a href="#" class="user-name-link" onclick="event.stopPropagation(); wl_showInfoById(${p.id}); return false;">${p.name}</a></td>
            <td>${p.manufacturer}</td>
            <td>${p.category}</td>
            <td>${p.orderDate || '-'}</td>
            <td>${p.soldQuantity || 0}</td>
            <td>${p.quantity}</td>
            <td>${formatPrice(p.myPrice)}</td>
            <td>${p.actualSoldPrice != null && p.actualSoldPrice !== p.catalogPrice ? '<span style="color:#868e96;text-decoration:line-through;">' + formatPrice(p.catalogPrice) + '</span> <span style="color:#e8590c;font-weight:600;">' + formatPrice(p.actualSoldPrice) + '</span>' : formatPrice(p.catalogPrice)}</td>
            <td style="color: ${profit >= 0 ? 'var(--primary-green)' : '#e03131'}; font-weight: 600;">${formatPrice(profit)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td style="text-align: right;">
                <button class="btn btn-primary" style="padding: 4px 8px; font-size: 11px;" onclick="event.stopPropagation(); wl_markSold(${p.id});">Sold</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function wl_selectRow(el, id) {
    document.querySelectorAll('#winlossTable tr').forEach(r => r.classList.remove('selected'));
    el.classList.add('selected');
    wl_selectedId = id;
}

function wl_refreshSummary() {
    const data = wl_getDisplayData();
    let totalRevenue = 0, totalCost = 0, totalSold = 0;
    data.forEach(p => {
        const s = p.soldQuantity || 0;
        totalRevenue += s * p.catalogPrice;
        totalCost += s * p.myPrice;
        totalSold += s;
    });
    const profit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

    document.getElementById('summaryTotalRevenue').textContent = 'Revenue: ' + formatPrice(totalRevenue);
    document.getElementById('summaryTotalCost').textContent = 'Cost: ' + formatPrice(totalCost);
    document.getElementById('summaryGrossProfit').textContent = 'Profit: ' + formatPrice(profit);
    document.getElementById('summaryProfitMargin').textContent = 'Margin: ' + margin.toFixed(1) + '%';
    document.getElementById('summarySoldItems').textContent = 'Sold: ' + totalSold + ' items';
}

function wl_setupSearch() {
    const sb = document.getElementById('searchBox');
    if (sb) sb.addEventListener('input', function() {
        wl_currentFilters.search = this.value.toLowerCase();
        wl_populateTable();
        wl_refreshSummary();
    });
}

function openFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'filters-modal';
    modal.onclick = function(e) { if (e.target === modal) closeFiltersModal(); };
    const mc = document.createElement('div');
    mc.className = 'filters-modal-content';
    mc.innerHTML = '<button class="filters-modal-close" onclick="closeFiltersModal()">&times;</button>' +
        '<div class="filters-modal-title">Filter Win/Loss</div>' +
        '<div class="filter-group"><label class="filter-label">Brand:</label><select class="filter-select" id="wlFilterManufacturer">' +
        '<option value="">All</option>' + wl_manufacturersList.map(m => '<option value="' + m + '">' + m + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Category:</label><select class="filter-select" id="wlFilterCategory">' +
        '<option value="">All</option>' + wl_categoriesList.map(c => '<option value="' + c + '">' + c + '</option>').join('') + '</select></div>' +
        '<div class="filter-group"><label class="filter-label">Status:</label><select class="filter-select" id="wlFilterStatus">' +
        '<option value="">All</option><option value="active">Active Orders</option><option value="delivered">Delivered</option><option value="forsale">For Sale</option></select></div>' +
        '<div class="filter-actions"><button class="btn-apply-filters" onclick="wl_applyAdvancedFilters()">Apply Filters</button>' +
        '<button class="btn-reset-filters" onclick="wl_resetFilters()">Reset</button></div>';
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function closeFiltersModal() { document.querySelector('.filters-modal')?.remove(); }

function wl_applyAdvancedFilters() {
    wl_currentFilters.filterManufacturer = document.getElementById('wlFilterManufacturer').value;
    wl_currentFilters.filterCategory = document.getElementById('wlFilterCategory').value;
    const status = document.getElementById('wlFilterStatus').value;
    if (status === 'active') wl_data = sharedProducts.filter(p => p.orderStatus === 'ordered' || p.orderStatus === 'ordernow').map(p => ({ ...p, forSale: p.forSale || false, actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null }));
    else if (status === 'delivered') wl_data = sharedProducts.filter(p => p.orderStatus === 'delivered').map(p => ({ ...p, forSale: p.forSale || false, actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null }));
    else if (status === 'forsale') wl_data = sharedProducts.filter(p => p.forSale || (p.orderDate && daysSince(p.orderDate) > 28)).map(p => ({ ...p, forSale: p.forSale || false, actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null }));
    else wl_data = sharedProducts.map(p => ({ ...p, forSale: p.forSale || false, actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null }));
    if (wl_currentFilters.filterManufacturer) wl_data = wl_data.filter(p => p.manufacturer === wl_currentFilters.filterManufacturer);
    if (wl_currentFilters.filterCategory) wl_data = wl_data.filter(p => p.category === wl_currentFilters.filterCategory);
    closeFiltersModal();
    wl_populateTable();
    wl_refreshSummary();
}

function wl_resetFilters() {
    wl_currentFilters = { search: '', sortOrder: '', filterManufacturer: '', filterCategory: '' };
    wl_currentTimeRange = 'all';
    wl_currentSort = '';
    document.getElementById('searchBox').value = '';
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('time-btn-active'));
    document.getElementById('timeBtnAll').classList.add('time-btn-active');
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
    wl_data = sharedProducts.map(p => ({ ...p, forSale: p.forSale || false, actualSoldPrice: p.actualSoldPrice != null ? p.actualSoldPrice : null }));
    wl_populateTable();
    wl_refreshSummary();
    closeFiltersModal();
}

function wl_sortByProfit() {
    if (wl_currentSort === 'profit') {
        wl_currentSort = '';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
    } else {
        wl_currentSort = 'profit';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
        document.getElementById('sortBtnProfit').classList.add('sort-btn-active');
        wl_data.sort((a, b) => calcProfit(b) - calcProfit(a));
    }
    wl_populateTable();
}

function wl_sortBySold() {
    if (wl_currentSort === 'sold') {
        wl_currentSort = '';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
    } else {
        wl_currentSort = 'sold';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
        document.getElementById('sortBtnSold').classList.add('sort-btn-active');
        wl_data.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0));
    }
    wl_populateTable();
}

function wl_sortByOldest() {
    if (wl_currentSort === 'oldest') {
        wl_currentSort = '';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
    } else {
        wl_currentSort = 'oldest';
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
        document.getElementById('sortBtnOldest').classList.add('sort-btn-active');
        wl_data.sort((a, b) => {
            if (!a.orderDate) return 1;
            if (!b.orderDate) return -1;
            return new Date(a.orderDate) - new Date(b.orderDate);
        });
    }
    wl_populateTable();
}

function wl_setTimeRange(range) {
    wl_currentTimeRange = range;
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('time-btn-active'));
    document.getElementById('timeBtn' + range.charAt(0).toUpperCase() + range.slice(1)).classList.add('time-btn-active');
    wl_populateTable();
    wl_refreshSummary();
}

function wl_showInfo() {
    if (!wl_selectedId) { alert('Select a product first'); return; }
    if (wl_panelProductId === wl_selectedId) {
        document.getElementById('rightPanelContent').innerHTML = '';
        wl_panelProductId = null;
        return;
    }
    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;
    wl_showInfoPanel(p);
}

function wl_showInfoById(id) {
    const p = wl_data.find(x => x.id === id);
    if (!p) return;
    wl_selectedId = id;
    wl_showInfoPanel(p);
}

function wl_showInfoPanel(p) {
    wl_panelProductId = p.id;
    const panel = document.getElementById('rightPanelContent');
    const profit = calcProfit(p);
    const margin = calcProfitMargin(p);
    const du = daysUntil(p.expiryDate);
    const ds = daysSince(p.orderDate);

    panel.innerHTML = `
        <div class="right-panel-content">
            <h3>${p.name}</h3>
            <div class="user-photo-preview">${p.photo ? '<img src="' + p.photo + '" alt="photo">' : 'No photo'}</div>
            <div class="user-info-item"><label>Brand:</label><div class="value">${p.manufacturer}</div></div>
            <div class="user-info-item"><label>Category:</label><div class="value">${p.category}</div></div>
            <div class="user-info-item"><label>Buy Price:</label><div class="value">${formatPrice(p.myPrice)}</div></div>
            <div class="user-info-item"><label>Sell Price:</label><div class="value">${formatPrice(p.catalogPrice)}</div></div>
            ${p.actualSoldPrice != null && p.actualSoldPrice !== p.catalogPrice ? '<div class="user-info-item"><label>Actual Sold Price:</label><div class="value" style="color:#e8590c;font-weight:600;">' + formatPrice(p.actualSoldPrice) + '</div></div>' : ''}
            <div class="user-info-item"><label>Ordered:</label><div class="value">${p.orderDate || '-'}</div></div>
            <div class="user-info-item"><label>Days in system:</label><div class="value">${ds !== null ? ds + ' days' : '-'}</div></div>
            <div class="user-info-item"><label>Sold:</label><div class="value">${p.soldQuantity || 0} pcs</div></div>
            <div class="user-info-item"><label>In Stock:</label><div class="value">${p.quantity} pcs</div></div>
            <div class="user-info-item"><label>Profit:</label><div class="value" style="color:${profit >= 0 ? 'var(--primary-green)' : '#e03131'};font-weight:600;">${formatPrice(profit)} (${margin.toFixed(1)}%)</div></div>
            <div class="user-info-item"><label>Expiry:</label><div class="value">${p.expiryDate || '-'} ${du !== null ? (du < 0 ? '<span style="color:#e03131">(Expired!)</span>' : du <= 60 ? '<span style="color:#e8590c">(' + du + ' days left)</span>' : '') : ''}</div></div>
            ${p.forSale ? '<div class="user-info-item"><label>Status:</label><div class="value" style="color:#e8590c;font-weight:600;">Marked for Sale</div></div>' : ''}
            ${p.description ? '<div class="user-info-item"><label>Description:</label><div class="value">' + p.description + '</div></div>' : ''}
        </div>
    `;
}

function wl_editSold() {
    if (!wl_selectedId) { alert('Select a product first'); return; }
    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;

    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.innerHTML = `
        <button class="add-user-modal-close" onclick="this.closest('.add-user-modal').remove()">&times;</button>
        <div class="add-user-modal-title">Edit Sold: ${p.name}</div>
        <div class="form-section"><div class="form-section-label">Currently Sold:</div><input type="number" id="wlEditSoldQty" value="${p.soldQuantity || 0}" min="0" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">Current Stock:</div><div style="padding:8px 0;">${p.quantity} pcs</div></div>
        <button class="save-user-btn" style="margin-top:15px;width:100%;" onclick="wl_saveEditSold()">Save</button>`;
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function wl_saveEditSold() {
    const qty = parseInt(document.getElementById('wlEditSoldQty').value);
    if (isNaN(qty) || qty < 0) { alert('Enter a valid quantity'); return; }
    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;
    const diff = qty - (p.soldQuantity || 0);
    p.soldQuantity = qty;
    if (p.quantity >= diff) p.quantity -= diff;
    const sp = sharedProducts.find(x => x.id === p.id);
    if (sp) { sp.soldQuantity = qty; if (sp.quantity >= diff) sp.quantity -= diff; }
    document.querySelector('.add-user-modal')?.remove();
    wl_populateTable();
    wl_refreshSummary();
    alert('Sold quantity updated!');
}

function wl_markSold(productId) {
    const p = wl_data.find(x => x.id === productId);
    if (!p) return;
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.innerHTML = `
        <button class="add-user-modal-close" onclick="this.closest('.add-user-modal').remove()">&times;</button>
        <div class="add-user-modal-title">Mark Sold: ${p.name}</div>
        <div class="form-section"><div class="form-section-label">Quantity to mark as sold:</div>
        <input type="number" id="wlSoldQty" value="1" min="1" max="${p.quantity}" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">In Stock:</div><div style="padding:8px 0;">${p.quantity} pcs</div></div>
        <button class="save-user-btn" style="margin-top:15px;width:100%;" onclick="wl_confirmSold(${productId})">Confirm Sold</button>`;
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function wl_confirmSold(productId) {
    const qty = parseInt(document.getElementById('wlSoldQty').value);
    if (isNaN(qty) || qty <= 0) { alert('Enter a valid quantity'); return; }
    const p = wl_data.find(x => x.id === productId);
    if (!p) return;
    if (qty > p.quantity) { alert('Not enough stock! Only ' + p.quantity + ' available.'); return; }
    p.soldQuantity = (p.soldQuantity || 0) + qty;
    p.quantity -= qty;
    if (p.quantity === 0) p.inStock = false;
    const sp = sharedProducts.find(x => x.id === productId);
    if (sp) { sp.soldQuantity = p.soldQuantity; sp.quantity = p.quantity; sp.inStock = p.inStock; }
    document.querySelector('.add-user-modal')?.remove();
    wl_populateTable();
    wl_refreshSummary();
    alert(qty + ' pcs marked as sold!');
}

function wl_markForSale() {
    if (!wl_selectedId) { alert('Select a product first'); return; }
    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;
    p.forSale = !p.forSale;
    const sp = sharedProducts.find(x => x.id === p.id);
    if (sp) sp.forSale = p.forSale;
    wl_populateTable();
    alert(p.name + (p.forSale ? ' marked for sale!' : ' removed from sale!'));
}

function wl_addPurchase() {
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    const productOpts = sharedProducts.map(p => '<option value="' + p.id + '">' + p.name + '</option>').join('');
    mc.innerHTML = `
        <button class="add-user-modal-close" onclick="this.closest('.add-user-modal').remove()">&times;</button>
        <div class="add-user-modal-title">Add Purchase Record</div>
        <div class="form-section"><div class="form-section-label">Product:</div>
        <select id="wlPurchaseProduct" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;">${productOpts}</select></div>
        <div class="form-section"><div class="form-section-label">Quantity:</div>
        <input type="number" id="wlPurchaseQty" value="1" min="1" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">Buy Price (per unit):</div>
        <input type="number" id="wlPurchasePrice" step="0.01" min="0" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <button class="save-user-btn" style="margin-top:15px;width:100%;" onclick="wl_savePurchase()">Save Purchase</button>`;
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function wl_savePurchase() {
    const pid = parseInt(document.getElementById('wlPurchaseProduct').value);
    const qty = parseInt(document.getElementById('wlPurchaseQty').value);
    const price = parseFloat(document.getElementById('wlPurchasePrice').value);
    if (!pid || !qty || qty <= 0) { alert('Fill all fields'); return; }
    const p = sharedProducts.find(x => x.id === pid);
    if (!p) return;
    p.quantity = (p.quantity || 0) + qty;
    p.inStock = true;
    if (price > 0) p.myPrice = price;
    const wlp = wl_data.find(x => x.id === pid);
    if (wlp) { wlp.quantity = p.quantity; wlp.inStock = true; if (price > 0) wlp.myPrice = price; }
    document.querySelector('.add-user-modal')?.remove();
    wl_populateTable();
    wl_refreshSummary();
    alert('Purchase added!');
}

function wl_editPrices() {
    if (!wl_selectedId) { alert('Select a product first'); return; }
    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;

    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.innerHTML = `
        <button class="add-user-modal-close" onclick="this.closest('.add-user-modal').remove()">&times;</button>
        <div class="add-user-modal-title">Edit Prices: ${p.name}</div>
        <div class="form-section"><div class="form-section-label">Buy Price (per unit):</div>
        <input type="number" id="wlEditBuyPrice" step="0.01" min="0" value="${p.myPrice}" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">Sell Price (per unit):</div>
        <input type="number" id="wlEditSellPrice" step="0.01" min="0" value="${p.catalogPrice}" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">Actual Sold Price (if sold at different price):</div>
        <input type="number" id="wlEditActualPrice" step="0.01" min="0" value="${p.actualSoldPrice != null ? p.actualSoldPrice : ''}" placeholder="Same as Sell Price" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div class="form-section"><div class="form-section-label">Sold Quantity:</div>
        <input type="number" id="wlEditSoldQty2" min="0" value="${p.soldQuantity || 0}" style="width:100%;padding:10px;border:2px solid var(--border-color);border-radius:5px;"></div>
        <div style="margin-top:10px;padding:10px;background:var(--bg-secondary);border-radius:5px;font-size:12px;color:var(--text-secondary);">
            Profit preview: <span id="wlEditProfitPreview">—</span>
        </div>
        <button class="save-user-btn" style="margin-top:15px;width:100%;" onclick="wl_saveEditPrices()">Save Prices</button>`;
    modal.appendChild(mc);
    document.body.appendChild(modal);

    document.getElementById('wlEditBuyPrice').addEventListener('input', wl_previewEditProfit);
    document.getElementById('wlEditSellPrice').addEventListener('input', wl_previewEditProfit);
    document.getElementById('wlEditActualPrice').addEventListener('input', wl_previewEditProfit);
    document.getElementById('wlEditSoldQty2').addEventListener('input', wl_previewEditProfit);
    wl_previewEditProfit();
}

function wl_previewEditProfit() {
    const buyPrice = parseFloat(document.getElementById('wlEditBuyPrice').value) || 0;
    const sellPrice = parseFloat(document.getElementById('wlEditSellPrice').value) || 0;
    const actualPrice = document.getElementById('wlEditActualPrice').value;
    const actualPriceVal = actualPrice !== '' ? parseFloat(actualPrice) : null;
    const finalSellPrice = actualPriceVal != null && !isNaN(actualPriceVal) ? actualPriceVal : sellPrice;
    const soldQty = parseInt(document.getElementById('wlEditSoldQty2').value) || 0;
    const profit = (finalSellPrice - buyPrice) * soldQty;
    const rev = finalSellPrice * soldQty;
    const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : '0.0';
    const el = document.getElementById('wlEditProfitPreview');
    if (el) {
        el.textContent = formatPrice(profit) + ' (' + margin + '%)';
        el.style.color = profit >= 0 ? 'var(--primary-green)' : '#e03131';
    }
}

function wl_saveEditPrices() {
    const buyPrice = parseFloat(document.getElementById('wlEditBuyPrice').value);
    const sellPrice = parseFloat(document.getElementById('wlEditSellPrice').value);
    const actualPriceInput = document.getElementById('wlEditActualPrice').value;
    const soldQty = parseInt(document.getElementById('wlEditSoldQty2').value);

    if (isNaN(buyPrice) || buyPrice < 0 || isNaN(sellPrice) || sellPrice < 0) { alert('Enter valid prices'); return; }
    if (isNaN(soldQty) || soldQty < 0) { alert('Enter valid quantity'); return; }

    const p = wl_data.find(x => x.id === wl_selectedId);
    if (!p) return;

    const oldBuyPrice = p.myPrice;
    const oldSellPrice = p.catalogPrice;
    const oldSoldQty = p.soldQuantity || 0;

    p.myPrice = buyPrice;
    p.catalogPrice = sellPrice;
    p.soldQuantity = soldQty;
    if (actualPriceInput !== '') {
        const ap = parseFloat(actualPriceInput);
        p.actualSoldPrice = (!isNaN(ap) && ap >= 0) ? ap : null;
    } else {
        p.actualSoldPrice = null;
    }

    const sp = sharedProducts.find(x => x.id === p.id);
    if (sp) {
        sp.myPrice = buyPrice;
        sp.catalogPrice = sellPrice;
        sp.soldQuantity = soldQty;
        sp.actualSoldPrice = p.actualSoldPrice;
    }

    document.querySelector('.add-user-modal')?.remove();
    wl_populateTable();
    wl_refreshSummary();
    alert('Prices updated!\nBuy: ' + formatPrice(oldBuyPrice) + ' → ' + formatPrice(buyPrice) +
        '\nSell: ' + formatPrice(oldSellPrice) + ' → ' + formatPrice(sellPrice) +
        '\nSold: ' + oldSoldQty + ' → ' + soldQty);
}

function openSaleProductsModal() {
    const saleItems = wl_data.filter(p => p.forSale || (p.orderDate && daysSince(p.orderDate) > 28));
    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '600px';
    let html = '<button class="add-user-modal-close" onclick="this.closest(\'.add-user-modal\').remove()">&times;</button><div class="add-user-modal-title">Products for Sale / Auction</div>';
    if (saleItems.length === 0) {
        html += '<p style="padding:20px;text-align:center;color:#888;">No products marked for sale.</p>';
    } else {
        html += '<div style="max-height:400px;overflow-y:auto;"><table style="width:100%;border-collapse:collapse;"><tr style="background:var(--bg-secondary);"><th style="padding:8px;text-align:left;">Product</th><th style="padding:8px;text-align:left;">Brand</th><th style="padding:8px;text-align:left;">Price</th><th style="padding:8px;text-align:left;">Stock</th><th style="padding:8px;text-align:left;">Reason</th></tr>';
        saleItems.forEach(p => {
            const reason = p.forSale ? 'Manual' : (daysSince(p.orderDate) > 28 ? daysSince(p.orderDate) + ' days old' : '');
            html += '<tr><td style="padding:8px;border-bottom:1px solid var(--border-color);">' + p.name + '</td><td style="padding:8px;border-bottom:1px solid var(--border-color);">' + p.manufacturer + '</td><td style="padding:8px;border-bottom:1px solid var(--border-color);">' + formatPrice(p.catalogPrice) + '</td><td style="padding:8px;border-bottom:1px solid var(--border-color);">' + p.quantity + '</td><td style="padding:8px;border-bottom:1px solid var(--border-color);color:#e8590c;">' + reason + '</td></tr>';
        });
        html += '</table></div>';
    }
    mc.innerHTML = html;
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function openExpiryModal() {
    const expiring = wl_data.filter(p => p.expiryDate && daysUntil(p.expiryDate) !== null && daysUntil(p.expiryDate) <= 60 && daysUntil(p.expiryDate) >= 0)
        .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));
    const expired = wl_data.filter(p => p.expiryDate && daysUntil(p.expiryDate) !== null && daysUntil(p.expiryDate) < 0)
        .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));

    const modal = document.createElement('div');
    modal.className = 'add-user-modal';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    const mc = document.createElement('div');
    mc.className = 'add-product-modal-content';
    mc.style.maxWidth = '700px';
    let html = '<button class="add-user-modal-close" onclick="this.closest(\'.add-user-modal\').remove()">&times;</button><div class="add-user-modal-title">Expiry Alert</div>';

    if (expired.length > 0) {
        html += '<h4 style="color:#e03131;margin:10px 0;">Expired Products</h4>';
        html += '<div style="max-height:200px;overflow-y:auto;margin-bottom:15px;"><table style="width:100%;border-collapse:collapse;"><tr style="background:#fff5f5;"><th style="padding:6px;text-align:left;">Product</th><th style="padding:6px;text-align:left;">Expired</th><th style="padding:6px;text-align:left;">Stock</th></tr>';
        expired.forEach(p => html += '<tr><td style="padding:6px;border-bottom:1px solid #ffc9c9;">' + p.name + '</td><td style="padding:6px;border-bottom:1px solid #ffc9c9;color:#e03131;">' + p.expiryDate + '</td><td style="padding:6px;border-bottom:1px solid #ffc9c9;">' + p.quantity + '</td></tr>');
        html += '</table></div>';
    }

    if (expiring.length > 0) {
        html += '<h4 style="color:#e8590c;margin:10px 0;">Expiring Soon</h4>';
        html += '<div style="max-height:300px;overflow-y:auto;"><table style="width:100%;border-collapse:collapse;"><tr style="background:#fff4e6;"><th style="padding:6px;text-align:left;">Product</th><th style="padding:6px;text-align:left;">Expiry</th><th style="padding:6px;text-align:left;">Days Left</th><th style="padding:6px;text-align:left;">Stock</th></tr>';
        expiring.forEach(p => {
            const du = daysUntil(p.expiryDate);
            const cls = du <= 30 ? 'style="color:#e03131;font-weight:600;"' : 'style="color:#e8590c;"';
            html += '<tr><td style="padding:6px;border-bottom:1px solid #ffd8a8;">' + p.name + '</td><td style="padding:6px;border-bottom:1px solid #ffd8a8;">' + p.expiryDate + '</td><td ' + cls + '>' + du + ' days</td><td style="padding:6px;border-bottom:1px solid #ffd8a8;">' + p.quantity + '</td></tr>';
        });
        html += '</table></div>';
    }

    if (expiring.length === 0 && expired.length === 0) {
        html += '<p style="padding:20px;text-align:center;color:#888;">No products expiring soon.</p>';
    }

    mc.innerHTML = html;
    modal.appendChild(mc);
    document.body.appendChild(modal);
}

function wl_showAll() {
    wl_currentFilters = { search: '', sortOrder: '', filterManufacturer: '', filterCategory: '' };
    document.getElementById('searchBox').value = '';
    wl_currentTimeRange = 'all';
    wl_currentSort = '';
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('time-btn-active'));
    const allBtn = document.getElementById('timeBtnAll');
    if (allBtn) allBtn.classList.add('time-btn-active');
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('sort-btn-active'));
    wl_init();
}
