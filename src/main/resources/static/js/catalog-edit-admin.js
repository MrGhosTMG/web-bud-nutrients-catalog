// Catalog Edit Admin Page functionality
let currentViewMode = 'list'; // 'list' or 'info'
let currentTab = 'seeAll'; // 'seeAll', 'sales', 'offers'
let selectedProductIds = []; // Array for multiple selection

// Currency system
let currentCurrency = 'GEL';
let currencies = [
    { code: 'GEL', name: 'Georgian Lari', symbol: '₾', rateToUSD: 2.65 },
    { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 }
];

// Sales list - products on sale with sale prices
let salesList = [
    { productId: 1, salePrice: 20 },
    { productId: 3, salePrice: 25 },
    { productId: 11, salePrice: 15 },
    { productId: 13, salePrice: 10 },
    { productId: 15, salePrice: 18 },
    { productId: 18, salePrice: 30 },
    { productId: 21, salePrice: 28 },
    { productId: 26, salePrice: 14 },
    { productId: 32, salePrice: 12 }
];

// Offers list - special offers (buy 1+1, bundle deals, etc.)
let offersList = [
    {
        productId: 5,
        offerType: 'buy1get1',
        offerDescription: 'Buy 1 Get 1 Free'
    },
    {
        productId: 7,
        offerType: 'bundle',
        bundleWith: 6,
        offerDescription: 'Buy with Magnesium - 10% off'
    },
    {
        productId: 12,
        offerType: 'buy1get1',
        offerDescription: 'Buy 1 Get 1 Free'
    },
    {
        productId: 14,
        offerType: 'bundle',
        bundleWith: 13,
        offerDescription: 'Bundle with Moisturizing Shampoo - 15% off'
    },
    {
        productId: 20,
        offerType: 'custom',
        offerDescription: '3 for the price of 2'
    },
    {
        productId: 23,
        offerType: 'buy1get1',
        offerDescription: 'Buy 1 Get 1 Free'
    },
    {
        productId: 28,
        offerType: 'custom',
        offerDescription: 'Buy 2 Get 20% Off'
    },
    {
        productId: 34,
        offerType: 'bundle',
        bundleWith: 20,
        offerDescription: 'Bundle with CoQ10 - Save $10'
    }
];

let catalogData = [
    {
        id: 1,
        name: 'Omega-3 Fish Oil',
        manufacturer: 'Nature Made',
        category: 'Herbal',
        myPrice: 20,
        catalogPrice: 25,
        photo: '../../Images/buds img.jpg',
        description: 'High-quality fish oil supplement',
        isAvailable: true,
        addedDate: '2026-04-15'
    },
    {
        id: 2,
        name: 'Vitamin D3',
        manufacturer: 'Solgar',
        category: 'Mineral',
        myPrice: 15,
        catalogPrice: 18,
        photo: '../../Images/buds natural img.jpg',
        description: 'Essential vitamin D supplement',
        isAvailable: true,
        addedDate: '2026-04-16'
    },
    {
        id: 3,
        name: 'Multivitamin Complex',
        manufacturer: 'Centrum',
        category: 'Medic+',
        myPrice: 25,
        catalogPrice: 30,
        photo: '../../Images/bud spoon image.png',
        description: 'Complete daily multivitamin',
        isAvailable: true,
        addedDate: '2026-04-17'
    },
    {
        id: 4,
        name: 'Collagen Peptides',
        manufacturer: 'Vital Proteins',
        category: 'Cosmethic',
        myPrice: 38,
        catalogPrice: 45,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Skin and joint support',
        isAvailable: false,
        addedDate: '2026-04-18'
    },
    {
        id: 5,
        name: 'Probiotics',
        manufacturer: 'Garden of Life',
        category: 'Other',
        myPrice: 28,
        catalogPrice: 35,
        photo: '../../Images/difference.jpg',
        description: 'Digestive health support',
        isAvailable: true,
        addedDate: '2026-04-19'
    },
    {
        id: 6,
        name: 'Magnesium Citrate',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 16,
        catalogPrice: 20,
        photo: '../../Images/buds img.jpg',
        description: 'Supports muscle and nerve function',
        isAvailable: true,
        addedDate: '2026-04-20'
    },
    {
        id: 7,
        name: 'Turmeric Curcumin',
        manufacturer: 'Solgar',
        category: 'Herbal',
        myPrice: 23,
        catalogPrice: 28,
        photo: '../../Images/buds natural img.jpg',
        description: 'Anti-inflammatory support',
        isAvailable: true,
        addedDate: '2026-04-21'
    },
    {
        id: 8,
        name: 'Biotin Hair Growth',
        manufacturer: 'Nature Bounty',
        category: 'Cosmethic',
        myPrice: 18,
        catalogPrice: 22,
        photo: '../../Images/bud spoon image.png',
        description: 'Promotes healthy hair growth',
        isAvailable: false,
        addedDate: '2026-04-22'
    },
    {
        id: 9,
        name: 'Zinc Immune Support',
        manufacturer: 'NOW Foods',
        category: 'Medic+',
        myPrice: 12,
        catalogPrice: 15,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Boosts immune system',
        isAvailable: true,
        addedDate: '2026-04-23'
    },
    {
        id: 10,
        name: 'Ashwagandha Extract',
        manufacturer: 'Himalaya',
        category: 'Herbal',
        myPrice: 26,
        catalogPrice: 32,
        photo: '../../Images/difference.jpg',
        description: 'Stress relief and energy support',
        isAvailable: true,
        addedDate: '2026-04-24'
    },
    {
        id: 11,
        name: 'Hydrating Face Cream',
        manufacturer: 'Neutrogena',
        category: 'Creams',
        myPrice: 14,
        catalogPrice: 18,
        photo: '../../Images/buds img.jpg',
        description: 'Deep hydration for dry skin',
        isAvailable: true,
        addedDate: '2026-04-25'
    },
    {
        id: 12,
        name: 'Anti-Aging Night Cream',
        manufacturer: 'Olay',
        category: 'Creams',
        myPrice: 22,
        catalogPrice: 28,
        photo: '../../Images/buds natural img.jpg',
        description: 'Reduces wrinkles and fine lines',
        isAvailable: true,
        addedDate: '2026-04-26'
    },
    {
        id: 13,
        name: 'Moisturizing Shampoo',
        manufacturer: 'Pantene',
        category: 'Shampoos',
        myPrice: 8,
        catalogPrice: 12,
        photo: '../../Images/bud spoon image.png',
        description: 'For dry and damaged hair',
        isAvailable: true,
        addedDate: '2026-04-27'
    },
    {
        id: 14,
        name: 'Strengthening Shampoo',
        manufacturer: 'Dove',
        category: 'Shampoos',
        myPrice: 9,
        catalogPrice: 13,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Strengthens weak hair',
        isAvailable: true,
        addedDate: '2026-04-28'
    },
    {
        id: 15,
        name: 'Vitamin C Serum',
        manufacturer: 'The Ordinary',
        category: 'Cosmethic',
        myPrice: 16,
        catalogPrice: 22,
        photo: '../../Images/difference.jpg',
        description: 'Brightens skin tone',
        isAvailable: true,
        addedDate: '2026-04-29'
    },
    {
        id: 16,
        name: 'Calcium + D3',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 18,
        catalogPrice: 24,
        photo: '../../Images/buds img.jpg',
        description: 'Bone health support',
        isAvailable: true,
        addedDate: '2026-04-30'
    },
    {
        id: 17,
        name: 'Green Tea Extract',
        manufacturer: 'NOW Foods',
        category: 'Herbal',
        myPrice: 14,
        catalogPrice: 19,
        photo: '../../Images/buds natural img.jpg',
        description: 'Antioxidant support',
        isAvailable: true,
        addedDate: '2026-05-01'
    },
    {
        id: 18,
        name: 'Eye Cream Anti-Puffiness',
        manufacturer: 'Clinique',
        category: 'Creams',
        myPrice: 28,
        catalogPrice: 36,
        photo: '../../Images/bud spoon image.png',
        description: 'Reduces dark circles and puffiness',
        isAvailable: true,
        addedDate: '2026-05-02'
    },
    {
        id: 19,
        name: 'Volumizing Shampoo',
        manufacturer: 'TRESemmé',
        category: 'Shampoos',
        myPrice: 7,
        catalogPrice: 11,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Adds volume to fine hair',
        isAvailable: true,
        addedDate: '2026-05-03'
    },
    {
        id: 20,
        name: 'CoQ10 Supplement',
        manufacturer: 'Qunol',
        category: 'Medic+',
        myPrice: 24,
        catalogPrice: 32,
        photo: '../../Images/difference.jpg',
        description: 'Heart health and energy',
        isAvailable: true,
        addedDate: '2026-05-04'
    },
    {
        id: 21,
        name: 'Retinol Night Cream',
        manufacturer: 'RoC',
        category: 'Creams',
        myPrice: 26,
        catalogPrice: 34,
        photo: '../../Images/buds img.jpg',
        description: 'Anti-aging retinol formula',
        isAvailable: false,
        addedDate: '2026-05-05'
    },
    {
        id: 22,
        name: 'Keratin Repair Shampoo',
        manufacturer: 'L\'Oreal',
        category: 'Shampoos',
        myPrice: 11,
        catalogPrice: 16,
        photo: '../../Images/buds natural img.jpg',
        description: 'Repairs damaged hair with keratin',
        isAvailable: true,
        addedDate: '2026-05-06'
    },
    {
        id: 23,
        name: 'Hyaluronic Acid Serum',
        manufacturer: 'Neutrogena',
        category: 'Cosmethic',
        myPrice: 19,
        catalogPrice: 26,
        photo: '../../Images/bud spoon image.png',
        description: 'Deep hydration serum',
        isAvailable: true,
        addedDate: '2026-05-07'
    },
    {
        id: 24,
        name: 'Iron Supplement',
        manufacturer: 'Nature Made',
        category: 'Mineral',
        myPrice: 10,
        catalogPrice: 14,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Supports red blood cell production',
        isAvailable: true,
        addedDate: '2026-05-08'
    },
    {
        id: 25,
        name: 'Ginkgo Biloba',
        manufacturer: 'Nature\'s Bounty',
        category: 'Herbal',
        myPrice: 15,
        catalogPrice: 21,
        photo: '../../Images/difference.jpg',
        description: 'Memory and cognitive support',
        isAvailable: true,
        addedDate: '2026-05-09'
    },
    {
        id: 26,
        name: 'SPF 50 Face Cream',
        manufacturer: 'Coppertone',
        category: 'Creams',
        myPrice: 12,
        catalogPrice: 17,
        photo: '../../Images/buds img.jpg',
        description: 'Sun protection face cream',
        isAvailable: true,
        addedDate: '2026-05-10'
    },
    {
        id: 27,
        name: 'Color Protection Shampoo',
        manufacturer: 'Garnier',
        category: 'Shampoos',
        myPrice: 9,
        catalogPrice: 14,
        photo: '../../Images/buds natural img.jpg',
        description: 'Protects colored hair',
        isAvailable: true,
        addedDate: '2026-05-11'
    },
    {
        id: 28,
        name: 'Niacinamide Serum',
        manufacturer: 'The Ordinary',
        category: 'Cosmethic',
        myPrice: 14,
        catalogPrice: 19,
        photo: '../../Images/bud spoon image.png',
        description: 'Minimizes pores and evens skin tone',
        isAvailable: true,
        addedDate: '2026-05-12'
    },
    {
        id: 29,
        name: 'B-Complex Vitamins',
        manufacturer: 'Solgar',
        category: 'Medic+',
        myPrice: 17,
        catalogPrice: 23,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Energy and metabolism support',
        isAvailable: true,
        addedDate: '2026-05-13'
    },
    {
        id: 30,
        name: 'Echinacea Extract',
        manufacturer: 'Nature\'s Way',
        category: 'Herbal',
        myPrice: 13,
        catalogPrice: 18,
        photo: '../../Images/difference.jpg',
        description: 'Immune system support',
        isAvailable: true,
        addedDate: '2026-05-14'
    },
    {
        id: 31,
        name: 'Aloe Vera Gel Cream',
        manufacturer: 'Vaseline',
        category: 'Creams',
        myPrice: 8,
        catalogPrice: 12,
        photo: '../../Images/buds img.jpg',
        description: 'Soothing aloe vera for skin',
        isAvailable: true,
        addedDate: '2026-05-15'
    },
    {
        id: 32,
        name: 'Anti-Dandruff Shampoo',
        manufacturer: 'Head & Shoulders',
        category: 'Shampoos',
        myPrice: 10,
        catalogPrice: 15,
        photo: '../../Images/buds natural img.jpg',
        description: 'Eliminates dandruff',
        isAvailable: true,
        addedDate: '2026-05-16'
    },
    {
        id: 33,
        name: 'Rosehip Oil',
        manufacturer: 'The Ordinary',
        category: 'Cosmethic',
        myPrice: 18,
        catalogPrice: 24,
        photo: '../../Images/bud spoon image.png',
        description: 'Natural face oil for hydration',
        isAvailable: false,
        addedDate: '2026-05-17'
    },
    {
        id: 34,
        name: 'Glucosamine Chondroitin',
        manufacturer: 'Osteo Bi-Flex',
        category: 'Medic+',
        myPrice: 28,
        catalogPrice: 36,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Joint health support',
        isAvailable: true,
        addedDate: '2026-05-18'
    },
    {
        id: 35,
        name: 'Milk Thistle Extract',
        manufacturer: 'NOW Foods',
        category: 'Herbal',
        myPrice: 16,
        catalogPrice: 22,
        photo: '../../Images/difference.jpg',
        description: 'Liver health support',
        isAvailable: true,
        addedDate: '2026-05-19'
    },
    {
        id: 36,
        name: 'Hand Cream Intensive Care',
        manufacturer: 'Nivea',
        category: 'Creams',
        myPrice: 6,
        catalogPrice: 10,
        photo: '../../Images/buds img.jpg',
        description: 'Deep moisturizing hand cream',
        isAvailable: true,
        addedDate: '2026-05-20'
    },
    {
        id: 37,
        name: 'Argan Oil Shampoo',
        manufacturer: 'OGX',
        category: 'Shampoos',
        myPrice: 12,
        catalogPrice: 17,
        photo: '../../Images/buds natural img.jpg',
        description: 'Nourishes with Moroccan argan oil',
        isAvailable: true,
        addedDate: '2026-05-21'
    },
    {
        id: 38,
        name: 'Peptide Complex Serum',
        manufacturer: 'The Ordinary',
        category: 'Cosmethic',
        myPrice: 21,
        catalogPrice: 28,
        photo: '../../Images/bud spoon image.png',
        description: 'Anti-aging peptide formula',
        isAvailable: true,
        addedDate: '2026-05-22'
    },
    {
        id: 39,
        name: 'Melatonin Sleep Aid',
        manufacturer: 'Nature Made',
        category: 'Medic+',
        myPrice: 11,
        catalogPrice: 16,
        photo: '../../Images/bud not medicine.jpg',
        description: 'Promotes restful sleep',
        isAvailable: true,
        addedDate: '2026-05-23'
    },
    {
        id: 40,
        name: 'Valerian Root Extract',
        manufacturer: 'Nature\'s Way',
        category: 'Herbal',
        myPrice: 14,
        catalogPrice: 19,
        photo: '../../Images/difference.jpg',
        description: 'Natural sleep and relaxation support',
        isAvailable: true,
        addedDate: '2026-05-24'
    }
];

let selectedProductId = null;
let currentFilters = {
    sortOrder: 'asc',
    manufacturer: '',
    category: '',
    priceMin: '',
    priceMax: '',
    availability: 'all'
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    switchTab('seeAll'); // Default tab
    setupSearchListener();
});

// Switch between tabs
function switchTab(tab) {
    currentTab = tab;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');

    // Show/hide appropriate buttons
    document.getElementById('seeAllButtons').style.display = tab === 'seeAll' ? 'flex' : 'none';
    document.getElementById('salesButtons').style.display = tab === 'sales' ? 'flex' : 'none';
    document.getElementById('offersButtons').style.display = tab === 'offers' ? 'flex' : 'none';

    // Refresh display
    if (currentViewMode === 'list') {
        populateTable();
    } else {
        populateInfoMode();
    }
}

// Get filtered data based on current tab
function getTabFilteredData() {
    let data = [...catalogData];

    if (currentTab === 'sales') {
        // Show only products in sales list, sorted by name
        const salesIds = salesList.map(s => s.productId);
        data = data.filter(p => salesIds.includes(p.id));
        data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentTab === 'offers') {
        // Show only products in offers list
        const offerIds = offersList.map(o => o.productId);
        data = data.filter(p => offerIds.includes(p.id));
        data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // See All: show sales first (by name), then others
        const salesIds = salesList.map(s => s.productId);
        const salesProducts = data.filter(p => salesIds.includes(p.id)).sort((a, b) => a.name.localeCompare(b.name));
        const otherProducts = data.filter(p => !salesIds.includes(p.id)).sort((a, b) => a.name.localeCompare(b.name));
        data = [...salesProducts, ...otherProducts];
    }

    return data;
}

// Apply action from dropdown
function applyAction(productId) {
    const select = document.getElementById(`action-${productId}`);
    const action = select.value;

    if (!action) {
        alert('Please select an action first');
        return;
    }

    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    switch (action) {
        case 'moveToSales':
            moveToSalesList(productId);
            break;
        case 'moveToOffers':
            moveToOffersList(productId);
            break;
        case 'removeFromList':
            removeFromCurrentList(productId);
            break;
    }

    // Reset select
    select.value = '';
}

// Move product to sales list
function moveToSalesList(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    // Check if already in sales
    const alreadyInSales = salesList.find(s => s.productId === productId);
    if (alreadyInSales) {
        alert('This product is already in the sales list');
        return;
    }

    const salePrice = prompt(`Enter sale price for "${product.name}" (Catalog: $${product.catalogPrice}):`, product.catalogPrice * 0.8);

    if (salePrice !== null && salePrice > 0) {
        // Remove from offers if present
        const offerIndex = offersList.findIndex(o => o.productId === productId);
        if (offerIndex !== -1) {
            offersList.splice(offerIndex, 1);
        }

        // Add to sales
        salesList.push({
            productId: productId,
            salePrice: parseFloat(salePrice)
        });

        alert(`Product moved to Sale's list!`);
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Move product to offers list
function moveToOffersList(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    // Check if already in offers
    const alreadyInOffers = offersList.find(o => o.productId === productId);
    if (alreadyInOffers) {
        alert('This product is already in the offers list');
        return;
    }

    const offerType = prompt('Enter offer type:\n1 - Buy 1 Get 1\n2 - Bundle Deal\n3 - Custom', '1');

    if (offerType === null) return;

    let offerData = { productId: productId };

    if (offerType === '1') {
        offerData.offerType = 'buy1get1';
        offerData.offerDescription = 'Buy 1 Get 1 Free';
    } else if (offerType === '2') {
        const bundleId = prompt('Enter product ID to bundle with:', '');
        if (bundleId) {
            offerData.offerType = 'bundle';
            offerData.bundleWith = parseInt(bundleId);
            offerData.offerDescription = `Bundle deal with product #${bundleId}`;
        } else {
            return;
        }
    } else {
        const description = prompt('Enter offer description:', '');
        if (description) {
            offerData.offerType = 'custom';
            offerData.offerDescription = description;
        } else {
            return;
        }
    }

    // Remove from sales if present
    const salesIndex = salesList.findIndex(s => s.productId === productId);
    if (salesIndex !== -1) {
        salesList.splice(salesIndex, 1);
    }

    // Add to offers
    offersList.push(offerData);
    alert(`Product moved to Offers list!`);
    if (currentViewMode === 'list') {
        populateTable();
    } else {
        populateInfoMode();
    }
}

// Remove product from current list
function removeFromCurrentList(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    if (currentTab === 'sales') {
        const index = salesList.findIndex(s => s.productId === productId);
        if (index !== -1) {
            if (confirm(`Remove "${product.name}" from Sale's list?`)) {
                salesList.splice(index, 1);
                alert('Product removed from Sale\'s list!');
                if (currentViewMode === 'list') {
                    populateTable();
                } else {
                    populateInfoMode();
                }
            }
        }
    } else if (currentTab === 'offers') {
        const index = offersList.findIndex(o => o.productId === productId);
        if (index !== -1) {
            if (confirm(`Remove "${product.name}" from Offers list?`)) {
                offersList.splice(index, 1);
                alert('Product removed from Offers list!');
                if (currentViewMode === 'list') {
                    populateTable();
                } else {
                    populateInfoMode();
                }
            }
        }
    }
}

// Add product to sales list
function addToSalesList() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const alreadyInSales = salesList.find(s => s.productId === selectedProductId);
    if (alreadyInSales) {
        alert('This product is already in the sales list');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    const salePrice = prompt(`Enter sale price for "${product.name}" (Original: $${product.catalogPrice}):`, product.catalogPrice * 0.8);

    if (salePrice !== null && salePrice > 0) {
        salesList.push({
            productId: selectedProductId,
            salePrice: parseFloat(salePrice)
        });
        alert('Product added to sales list!');
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Remove product from sales list
function removeFromSalesList() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const index = salesList.findIndex(s => s.productId === selectedProductId);
    if (index === -1) {
        alert('This product is not in the sales list');
        return;
    }

    if (confirm('Remove this product from sales list?')) {
        salesList.splice(index, 1);
        alert('Product removed from sales list!');
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Set sale price
function setSalePrice() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const saleItem = salesList.find(s => s.productId === selectedProductId);
    if (!saleItem) {
        alert('This product is not in the sales list. Add it first.');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    const newPrice = prompt(`Enter new sale price for "${product.name}" (Current sale: $${saleItem.salePrice}):`, saleItem.salePrice);

    if (newPrice !== null && newPrice > 0) {
        saleItem.salePrice = parseFloat(newPrice);
        alert('Sale price updated!');
        showInfo();
    }
}

// Add product to offers list
function addToOffersList() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const alreadyInOffers = offersList.find(o => o.productId === selectedProductId);
    if (alreadyInOffers) {
        alert('This product is already in the offers list');
        return;
    }

    const offerType = prompt('Enter offer type:\n1 - Buy 1 Get 1\n2 - Bundle Deal\n3 - Custom', '1');

    if (offerType === null) return;

    let offerData = { productId: selectedProductId };

    if (offerType === '1') {
        offerData.offerType = 'buy1get1';
        offerData.offerDescription = 'Buy 1 Get 1 Free';
    } else if (offerType === '2') {
        const bundleId = prompt('Enter product ID to bundle with:', '');
        if (bundleId) {
            offerData.offerType = 'bundle';
            offerData.bundleWith = parseInt(bundleId);
            offerData.offerDescription = `Bundle deal with product #${bundleId}`;
        }
    } else {
        const description = prompt('Enter offer description:', '');
        if (description) {
            offerData.offerType = 'custom';
            offerData.offerDescription = description;
        }
    }

    if (offerData.offerDescription) {
        offersList.push(offerData);
        alert('Product added to offers list!');
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Remove product from offers list
function removeFromOffersList() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const index = offersList.findIndex(o => o.productId === selectedProductId);
    if (index === -1) {
        alert('This product is not in the offers list');
        return;
    }

    if (confirm('Remove this product from offers list?')) {
        offersList.splice(index, 1);
        alert('Product removed from offers list!');
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Edit offer details
function editOfferDetails() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const offer = offersList.find(o => o.productId === selectedProductId);
    if (!offer) {
        alert('This product is not in the offers list');
        return;
    }

    const newDescription = prompt('Enter new offer description:', offer.offerDescription);
    if (newDescription !== null && newDescription.trim() !== '') {
        offer.offerDescription = newDescription;
        alert('Offer details updated!');
        showInfo();
    }
}

// Populate table with catalog data
function populateTable() {
    const tbody = document.getElementById('catalogTable');
    tbody.innerHTML = '';

    let filteredData = getTabFilteredData();
    filteredData = applyFilters(filteredData);

    filteredData.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'catalog-table-row';
        row.onclick = (e) => {
            if (e.target.type !== 'checkbox') {
                selectProduct(product.id);
            }
        };

        const availabilityBadge = product.isAvailable
            ? '<span class="availability-badge available">Available</span>'
            : '<span class="availability-badge unavailable">Hidden</span>';

        // Check if product is on sale
        const saleItem = salesList.find(s => s.productId === product.id);
        const catalogPriceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : formatPrice(product.catalogPrice);

        // Build action dropdown options based on current tab
        let actionOptions = '';
        if (currentTab === 'seeAll') {
            actionOptions = `
                <option value="">Select action...</option>
                <option value="moveToSales">Move to Sale's</option>
                <option value="moveToOffers">Move to Offers</option>
            `;
        } else if (currentTab === 'sales') {
            actionOptions = `
                <option value="">Select action...</option>
                <option value="removeFromList">Remove from this list</option>
                <option value="moveToOffers">Move to Offers</option>
            `;
        } else if (currentTab === 'offers') {
            actionOptions = `
                <option value="">Select action...</option>
                <option value="removeFromList">Remove from this list</option>
                <option value="moveToSales">Move to Sale's</option>
            `;
        }

        const isChecked = selectedProductIds.includes(product.id) ? 'checked' : '';

        row.innerHTML = `
            <td style="padding-left: 10px;">
                <input type="checkbox" class="product-checkbox" data-id="${product.id}" ${isChecked} onclick="toggleProductSelection(${product.id}); event.stopPropagation();" style="margin-right: 8px;">
                <a href="#" onclick="viewProductDetails(${product.id}); return false;">${product.name}</a>
            </td>
            <td><a href="#" onclick="viewPhoto(${product.id}); return false;">View</a></td>
            <td>${product.manufacturer}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.myPrice)}</td>
            <td>${catalogPriceDisplay}</td>
            <td>${availabilityBadge}</td>
            <td style="text-align: right;">
                <select class="action-select" id="action-${product.id}" onclick="event.stopPropagation();">
                    ${actionOptions}
                </select>
                <button class="btn-small btn-apply" onclick="applyAction(${product.id}); event.stopPropagation();">Apply</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Select product row
function selectProduct(productId) {
    selectedProductId = productId;

    // Remove previous selection
    document.querySelectorAll('.catalog-table-row').forEach(row => {
        row.classList.remove('selected');
    });

    // Add selection to clicked row
    event.currentTarget.classList.add('selected');
}

// Toggle select all checkboxes
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        const productId = parseInt(checkbox.getAttribute('data-id'));
        if (selectAllCheckbox.checked) {
            if (!selectedProductIds.includes(productId)) {
                selectedProductIds.push(productId);
            }
        } else {
            selectedProductIds = [];
        }
    });
}

// Toggle individual product selection
function toggleProductSelection(productId) {
    const index = selectedProductIds.indexOf(productId);
    if (index > -1) {
        selectedProductIds.splice(index, 1);
    } else {
        selectedProductIds.push(productId);
    }

    // Update "select all" checkbox state
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.product-checkbox');
    selectAllCheckbox.checked = checkboxes.length > 0 && selectedProductIds.length === checkboxes.length;
}

// Toggle availability for selected products
function toggleAvailabilitySelected() {
    if (selectedProductIds.length === 0) {
        alert('Please select at least one product');
        return;
    }

    if (confirm(`Toggle availability for ${selectedProductIds.length} selected product(s)?`)) {
        selectedProductIds.forEach(id => {
            const product = catalogData.find(p => p.id === id);
            if (product) {
                product.isAvailable = !product.isAvailable;
            }
        });

        alert('Availability toggled for selected products!');
        populateTable();
    }
}

// Delete selected products
function deleteSelected() {
    if (selectedProductIds.length === 0) {
        alert('Please select at least one product');
        return;
    }

    if (confirm(`Are you sure you want to delete ${selectedProductIds.length} selected product(s)?`)) {
        selectedProductIds.forEach(id => {
            const index = catalogData.findIndex(p => p.id === id);
            if (index > -1) {
                catalogData.splice(index, 1);
            }
            // Also remove from sales and offers lists
            const salesIndex = salesList.findIndex(s => s.productId === id);
            if (salesIndex > -1) salesList.splice(salesIndex, 1);
            const offersIndex = offersList.findIndex(o => o.productId === id);
            if (offersIndex > -1) offersList.splice(offersIndex, 1);
        });

        selectedProductIds = [];
        selectedProductId = null;
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Selected products deleted successfully!');
        populateTable();
    }
}

// Open Full List modal
function openFullList() {
    // Create modal showing all products from Buds and Advanced
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'fullListModal';

    const allProducts = [...catalogData]; // In real app, would include Advanced products too

    let productsList = allProducts.map(p => `
        <div class="full-list-item" onclick="addProductToCurrentTab(${p.id})">
            <span class="full-list-name">${p.name}</span>
            <span class="full-list-category">${p.category}</span>
            <span class="full-list-price">$${p.catalogPrice}</span>
        </div>
    `).join('');

    modal.innerHTML = `
        <div class="modal-content full-list-modal-content">
            <span class="close" onclick="closeFullListModal()">&times;</span>
            <h2>Full Product List</h2>
            <p style="color: #666; margin-bottom: 15px;">Click on a product to add it to the current list</p>
            <div class="full-list-container">
                ${productsList}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close Full List modal
function closeFullListModal() {
    const modal = document.getElementById('fullListModal');
    if (modal) {
        modal.remove();
    }
}

// Add product to current tab from Full List
function addProductToCurrentTab(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    if (currentTab === 'sales') {
        const alreadyInSales = salesList.find(s => s.productId === productId);
        if (alreadyInSales) {
            alert('This product is already in the sales list');
            return;
        }

        const salePrice = prompt(`Enter sale price for "${product.name}" (Catalog: $${product.catalogPrice}):`, product.catalogPrice * 0.8);
        if (salePrice !== null && salePrice > 0) {
            salesList.push({
                productId: productId,
                salePrice: parseFloat(salePrice)
            });
            alert('Product added to Sale\'s list!');
            closeFullListModal();
            if (currentViewMode === 'list') {
                populateTable();
            } else {
                populateInfoMode();
            }
        }
    } else if (currentTab === 'offers') {
        const alreadyInOffers = offersList.find(o => o.productId === productId);
        if (alreadyInOffers) {
            alert('This product is already in the offers list');
            return;
        }

        const offerType = prompt('Enter offer type:\n1 - Buy 1 Get 1\n2 - Bundle Deal\n3 - Custom', '1');
        if (offerType === null) return;

        let offerData = { productId: productId };

        if (offerType === '1') {
            offerData.offerType = 'buy1get1';
            offerData.offerDescription = 'Buy 1 Get 1 Free';
        } else if (offerType === '2') {
            const bundleId = prompt('Enter product ID to bundle with:', '');
            if (bundleId) {
                offerData.offerType = 'bundle';
                offerData.bundleWith = parseInt(bundleId);
                offerData.offerDescription = `Bundle deal with product #${bundleId}`;
            } else {
                return;
            }
        } else {
            const description = prompt('Enter offer description:', '');
            if (description) {
                offerData.offerType = 'custom';
                offerData.offerDescription = description;
            } else {
                return;
            }
        }

        offersList.push(offerData);
        alert('Product added to Offers list!');
        closeFullListModal();
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

// Select product row
function selectProduct(productId) {
    selectedProductId = productId;

    // Remove previous selection
    document.querySelectorAll('.catalog-table-row').forEach(row => {
        row.classList.remove('selected');
    });

    // Add selection to clicked row
    event.currentTarget.classList.add('selected');
}

// Apply filters to data
function applyFilters(data) {
    let filtered = [...data];

    // Filter by manufacturer
    if (currentFilters.manufacturer) {
        filtered = filtered.filter(p => p.manufacturer === currentFilters.manufacturer);
    }

    // Filter by category
    if (currentFilters.category) {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    // Filter by price range
    if (currentFilters.priceMin) {
        filtered = filtered.filter(p => p.price >= parseFloat(currentFilters.priceMin));
    }
    if (currentFilters.priceMax) {
        filtered = filtered.filter(p => p.price <= parseFloat(currentFilters.priceMax));
    }

    // Filter by availability
    if (currentFilters.availability === 'available') {
        filtered = filtered.filter(p => p.isAvailable === true);
    } else if (currentFilters.availability === 'hidden') {
        filtered = filtered.filter(p => p.isAvailable === false);
    }

    // Search filter
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.manufacturer.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }

    // Sort
    filtered.sort((a, b) => {
        if (currentFilters.sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return filtered;
}

// Setup search listener
function setupSearchListener() {
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', function() {
        populateTable();
    });
}

// Show product info in right panel
function showInfo() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const contentDiv = document.getElementById('rightPanelContent');

    // Toggle: if info is already shown, close it
    if (contentDiv.innerHTML.trim() !== '' && contentDiv.querySelector('.info-panel')) {
        contentDiv.innerHTML = '';
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    const saleItem = salesList.find(s => s.productId === selectedProductId);
    const offer = offersList.find(o => o.productId === selectedProductId);

    const saleInfo = saleItem
        ? `<div class="info-item">
                <strong>Sale Price:</strong> ${formatPrice(saleItem.salePrice)} <span style="color: #999; text-decoration: line-through;">${formatPrice(product.catalogPrice)}</span>
           </div>`
        : '';

    const offerInfo = offer
        ? `<div class="info-item">
                <strong>Special Offer:</strong> ${offer.offerDescription}
           </div>`
        : '';

    contentDiv.innerHTML = `
        <div class="info-panel">
            <h3>Product Information</h3>
            <div class="info-item">
                <strong>Name:</strong> ${product.name}
            </div>
            <div class="info-item">
                <strong>Manufacturer:</strong> ${product.manufacturer}
            </div>
            <div class="info-item">
                <strong>Category:</strong> ${product.category}
            </div>
            <div class="info-item">
                <strong>My Price (Purchase):</strong> ${formatPrice(product.myPrice)}
            </div>
            <div class="info-item">
                <strong>Catalog Price (Users):</strong> ${formatPrice(product.catalogPrice)}
            </div>
            ${saleInfo}
            ${offerInfo}
            <div class="info-item">
                <strong>Status:</strong> ${product.isAvailable ? 'Available to users' : 'Hidden from users'}
            </div>
            <div class="info-item">
                <strong>Added:</strong> ${product.addedDate}
            </div>
            <div class="info-item">
                <strong>Description:</strong><br>${product.description}
            </div>
        </div>
    `;
}

// View product details
function viewProductDetails(productId) {
    selectedProductId = productId;
    showInfo();
}

// View photo
function viewPhoto(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.onclick = function(e) {
        if (e.target === modal) {
            closePhotoModal();
        }
    };

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'photo-modal-content';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'photo-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = closePhotoModal;

    // Title
    const title = document.createElement('div');
    title.className = 'photo-modal-title';
    title.textContent = product.name + "'s Photo";

    // Photo or placeholder
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

    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(photoElement);
    modal.appendChild(modalContent);

    // Add to body
    document.body.appendChild(modal);
}

// Close photo modal
function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.remove();
    }
}

// Preview element as user will see it
function previewElement() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    const saleItem = salesList.find(s => s.productId === selectedProductId);
    const offer = offersList.find(o => o.productId === selectedProductId);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';

    // Determine price display
    let priceDisplay = '';
    let saleBadge = '';
    if (saleItem) {
        priceDisplay = `
            <div class="preview-price-section">
                <span class="preview-original-price">${formatPrice(product.catalogPrice)}</span>
                <span class="preview-sale-price">${formatPrice(saleItem.salePrice)}</span>
                <span class="preview-save-badge">Save ${formatPrice(product.catalogPrice - saleItem.salePrice)}</span>
            </div>
        `;
        saleBadge = '<div class="preview-sale-badge">ON SALE</div>';
    } else {
        priceDisplay = `<div class="preview-price">${formatPrice(product.catalogPrice)}</div>`;
    }

    // Offer badge
    let offerBadge = '';
    if (offer) {
        offerBadge = `<div class="preview-offer-badge">🎁 ${offer.offerDescription}</div>`;
    }

    // Photo
    const photoUrl = product.photo || 'https://via.placeholder.com/400x400?text=No+Photo';

    modal.innerHTML = `
        <div class="modal-content preview-modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2 style="text-align: center; color: var(--primary-green); margin-bottom: 20px;">User Preview</h2>

            <div class="preview-container">
                <div class="preview-left">
                    <div class="preview-image-container">
                        ${saleBadge}
                        <img src="${photoUrl}" alt="${product.name}" class="preview-image" onerror="this.src='https://via.placeholder.com/400x400?text=No+Photo'">
                    </div>
                </div>

                <div class="preview-right">
                    <h1 class="preview-title">${product.name}</h1>

                    <div class="preview-meta">
                        <span class="preview-brand"><strong>Brand:</strong> ${product.manufacturer}</span>
                        <span class="preview-category"><strong>Category:</strong> ${product.category}</span>
                    </div>

                    ${offerBadge}
                    ${priceDisplay}

                    <div class="preview-description">
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>

                    <div class="preview-actions">
                        <button class="preview-btn preview-btn-primary">Add to Wishlist</button>
                        <button class="preview-btn preview-btn-secondary">Request Info</button>
                    </div>

                    <div class="preview-availability">
                        ${product.isAvailable
                            ? '<span class="preview-status-available">✓ Available</span>'
                            : '<span class="preview-status-unavailable">✗ Currently Unavailable</span>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Add new product
function addNewProduct() {
    // Create modal for adding new product
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'addProductModal';
    modal.innerHTML = `
        <div class="modal-content add-product-modal-content">
            <span class="close" onclick="closeAddProductModal()">&times;</span>
            <h2>Add New Product</h2>
            <form id="addProductForm" onsubmit="saveNewProduct(event)">
                <div class="form-group">
                    <label>Product Name *</label>
                    <input type="text" id="productName" required>
                </div>
                <div class="form-group">
                    <label>Manufacturer *</label>
                    <input type="text" id="productManufacturer" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select id="productCategory" required>
                        <option value="">Select category</option>
                        <option value="Herbal">Herbal</option>
                        <option value="Mineral">Mineral</option>
                        <option value="Medic+">Medic+</option>
                        <option value="Cosmethic">Cosmethic</option>
                        <option value="Creams">Creams</option>
                        <option value="Shampoos">Shampoos</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>My Price (Purchase) ($) *</label>
                    <input type="number" id="productMyPrice" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label>Catalog Price (For Users) ($) *</label>
                    <input type="number" id="productCatalogPrice" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="productDescription" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Photo</label>
                    <input type="file" id="productPhoto" accept="image/*" onchange="previewPhoto(event)">
                    <div id="photoPreview"></div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="productAvailable" checked>
                        Available to users
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Save Product</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close add product modal
function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.remove();
    }
}

// Preview photo
function previewPhoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('photoPreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
    }
}

// Save new product
function saveNewProduct(event) {
    event.preventDefault();

    const newProduct = {
        id: catalogData.length + 1,
        name: document.getElementById('productName').value,
        manufacturer: document.getElementById('productManufacturer').value,
        category: document.getElementById('productCategory').value,
        myPrice: parseFloat(document.getElementById('productMyPrice').value),
        catalogPrice: parseFloat(document.getElementById('productCatalogPrice').value),
        description: document.getElementById('productDescription').value,
        isAvailable: document.getElementById('productAvailable').checked,
        photo: null,
        addedDate: new Date().toISOString().split('T')[0]
    };

    // Handle photo upload
    const photoInput = document.getElementById('productPhoto');
    if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        newProduct.photo = URL.createObjectURL(file);
    }

    catalogData.push(newProduct);
    populateTable();
    closeAddProductModal();
    alert('Product added successfully!');
}

// Edit product
function editProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    // Create modal for editing
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'editProductModal';
    modal.innerHTML = `
        <div class="modal-content add-product-modal-content">
            <span class="close" onclick="closeEditProductModal()">&times;</span>
            <h2>Edit Product</h2>
            <form id="editProductForm" onsubmit="saveEditProduct(event)">
                <div class="form-group">
                    <label>Product Name *</label>
                    <input type="text" id="editProductName" value="${product.name}" required>
                </div>
                <div class="form-group">
                    <label>Manufacturer *</label>
                    <input type="text" id="editProductManufacturer" value="${product.manufacturer}" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select id="editProductCategory" required>
                        <option value="Herbal" ${product.category === 'Herbal' ? 'selected' : ''}>Herbal</option>
                        <option value="Mineral" ${product.category === 'Mineral' ? 'selected' : ''}>Mineral</option>
                        <option value="Medic+" ${product.category === 'Medic+' ? 'selected' : ''}>Medic+</option>
                        <option value="Cosmethic" ${product.category === 'Cosmethic' ? 'selected' : ''}>Cosmethic</option>
                        <option value="Creams" ${product.category === 'Creams' ? 'selected' : ''}>Creams</option>
                        <option value="Shampoos" ${product.category === 'Shampoos' ? 'selected' : ''}>Shampoos</option>
                        <option value="Other" ${product.category === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>My Price (Purchase) ($) *</label>
                    <input type="number" id="editProductMyPrice" value="${product.myPrice}" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label>Catalog Price (For Users) ($) *</label>
                    <input type="number" id="editProductCatalogPrice" value="${product.catalogPrice}" step="0.01" min="0" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="editProductDescription" rows="3">${product.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Photo</label>
                    <input type="file" id="editProductPhoto" accept="image/*" onchange="previewEditPhoto(event)">
                    <div id="editPhotoPreview">
                        ${product.photo ? `<img src="${product.photo}" style="max-width: 200px; margin-top: 10px;">` : ''}
                    </div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="editProductAvailable" ${product.isAvailable ? 'checked' : ''}>
                        Available to users
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close edit product modal
function closeEditProductModal() {
    const modal = document.getElementById('editProductModal');
    if (modal) {
        modal.remove();
    }
}

// Preview edit photo
function previewEditPhoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('editPhotoPreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
    }
}

// Save edited product
function saveEditProduct(event) {
    event.preventDefault();

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    product.name = document.getElementById('editProductName').value;
    product.manufacturer = document.getElementById('editProductManufacturer').value;
    product.category = document.getElementById('editProductCategory').value;
    product.myPrice = parseFloat(document.getElementById('editProductMyPrice').value);
    product.catalogPrice = parseFloat(document.getElementById('editProductCatalogPrice').value);
    product.description = document.getElementById('editProductDescription').value;
    product.isAvailable = document.getElementById('editProductAvailable').checked;

    // Handle photo upload
    const photoInput = document.getElementById('editProductPhoto');
    if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        product.photo = URL.createObjectURL(file);
    }

    populateTable();
    closeEditProductModal();
    alert('Product updated successfully!');
}

// Toggle availability
function toggleAvailability() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    product.isAvailable = !product.isAvailable;
    populateTable();

    const status = product.isAvailable ? 'available to users' : 'hidden from users';
    alert(`Product "${product.name}" is now ${status}`);
}

// Delete product
function deleteProduct() {
    if (!selectedProductId) {
        alert('Please select a product first');
        return;
    }

    const product = catalogData.find(p => p.id === selectedProductId);
    if (!product) return;

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        catalogData = catalogData.filter(p => p.id !== selectedProductId);
        selectedProductId = null;
        populateTable();
        document.getElementById('rightPanelContent').innerHTML = '';
        alert('Product deleted successfully!');
    }
}

// Open filters modal
function openFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'filtersModal';
    modal.innerHTML = `
        <div class="modal-content filters-modal-content">
            <span class="close" onclick="closeFiltersModal()">&times;</span>
            <h2>Filters</h2>

            <div class="filter-group">
                <label>Sort by Name</label>
                <select id="filterSortOrder">
                    <option value="asc" ${currentFilters.sortOrder === 'asc' ? 'selected' : ''}>A-Z</option>
                    <option value="desc" ${currentFilters.sortOrder === 'desc' ? 'selected' : ''}>Z-A</option>
                </select>
            </div>

            <div class="filter-group">
                <label>Manufacturer</label>
                <select id="filterManufacturer">
                    <option value="">All</option>
                    ${getUniqueManufacturers().map(m =>
                        `<option value="${m}" ${currentFilters.manufacturer === m ? 'selected' : ''}>${m}</option>`
                    ).join('')}
                </select>
            </div>

            <div class="filter-group">
                <label>Category</label>
                <select id="filterCategory">
                    <option value="">All</option>
                    ${getUniqueCategories().map(c =>
                        `<option value="${c}" ${currentFilters.category === c ? 'selected' : ''}>${c}</option>`
                    ).join('')}
                </select>
            </div>

            <div class="filter-group">
                <label>Availability</label>
                <select id="filterAvailability">
                    <option value="all" ${currentFilters.availability === 'all' ? 'selected' : ''}>All</option>
                    <option value="available" ${currentFilters.availability === 'available' ? 'selected' : ''}>Available</option>
                    <option value="hidden" ${currentFilters.availability === 'hidden' ? 'selected' : ''}>Hidden</option>
                </select>
            </div>

            <div class="filter-group">
                <label>Price Range</label>
                <div style="display: flex; gap: 10px;">
                    <input type="number" id="filterPriceMin" placeholder="Min" value="${currentFilters.priceMin}" style="width: 100px;">
                    <input type="number" id="filterPriceMax" placeholder="Max" value="${currentFilters.priceMax}" style="width: 100px;">
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="applyFiltersFromModal()">Apply</button>
                <button class="btn btn-secondary" onclick="resetFilters()">Reset</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close filters modal
function closeFiltersModal() {
    const modal = document.getElementById('filtersModal');
    if (modal) {
        modal.remove();
    }
}

// Get unique manufacturers
function getUniqueManufacturers() {
    return [...new Set(catalogData.map(p => p.manufacturer))].sort();
}

// Get unique categories
function getUniqueCategories() {
    return [...new Set(catalogData.map(p => p.category))].sort();
}

// Apply filters from modal
function applyFiltersFromModal() {
    currentFilters.sortOrder = document.getElementById('filterSortOrder').value;
    currentFilters.manufacturer = document.getElementById('filterManufacturer').value;
    currentFilters.category = document.getElementById('filterCategory').value;
    currentFilters.availability = document.getElementById('filterAvailability').value;
    currentFilters.priceMin = document.getElementById('filterPriceMin').value;
    currentFilters.priceMax = document.getElementById('filterPriceMax').value;

    populateTable();
    closeFiltersModal();
}

// Reset filters
function resetFilters() {
    currentFilters = {
        sortOrder: 'asc',
        manufacturer: '',
        category: '',
        priceMin: '',
        priceMax: '',
        availability: 'all'
    };
    populateTable();
    closeFiltersModal();
}

// Toggle view mode between list and info
function toggleViewMode() {
    currentViewMode = currentViewMode === 'list' ? 'info' : 'list';

    const listModeHeader = document.getElementById('listModeHeader');
    const listModeContainer = document.getElementById('listModeContainer');
    const infoModeContainer = document.getElementById('infoModeContainer');
    const viewModeText = document.getElementById('viewModeText');

    if (currentViewMode === 'list') {
        listModeHeader.style.display = 'grid';
        listModeContainer.style.display = 'block';
        infoModeContainer.style.display = 'none';
        viewModeText.textContent = '📋 List Mode';
        populateTable();
    } else {
        listModeHeader.style.display = 'none';
        listModeContainer.style.display = 'none';
        infoModeContainer.style.display = 'grid';
        viewModeText.textContent = '🖼️ Info Mode';
        populateInfoMode();
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
    if (currentViewMode === 'list') {
        populateTable();
    } else {
        populateInfoMode();
    }
}

function convertPrice(priceInGEL, targetCurrency) {
    const currency = currencies.find(c => c.code === targetCurrency);
    if (!currency) return priceInGEL;

    // Convert GEL to USD first, then to target currency
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

            <div class="settings-checkboxes">
                <label class="settings-checkbox-label">
                    <input type="checkbox" id="saveViewMode" checked>
                    <span>Save View Mode</span>
                </label>
                <label class="settings-checkbox-label">
                    <input type="checkbox" id="saveCurrency" checked>
                    <span>Save Currency type</span>
                </label>
            </div>

            <button class="btn-update-rates" onclick="getUpdatedCurrencyRates()">
                Get Updated Currency Rates
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add animation class after a brief delay
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

        // Refresh display
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
    }
}

function deleteCurrency(index) {
    const currency = currencies[index];
    if (confirm(`Delete ${currency.code} - ${currency.name}?`)) {
        currencies.splice(index, 1);

        // If deleted currency was selected, switch to GEL
        if (currentCurrency === currency.code) {
            currentCurrency = 'GEL';
            document.getElementById('currencyText').textContent = `💱 ${currentCurrency}`;
        }

        openCurrencySettings();
        document.querySelector('.modal').remove();

        // Refresh display
        if (currentViewMode === 'list') {
            populateTable();
        } else {
            populateInfoMode();
        }
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
    // TODO: Implement API call to backend for updated currency rates
    alert('This feature will be implemented with backend API integration');
}

// Populate info mode (grid view with cards)
function populateInfoMode() {
    const container = document.getElementById('infoModeContainer');
    container.innerHTML = '';

    let filteredData = getTabFilteredData();
    filteredData = applyFilters(filteredData);

    filteredData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'info-card';
        if (selectedProductId === product.id) {
            card.classList.add('selected');
        }
        card.onclick = () => selectProductInfo(product.id);

        const photoUrl = product.photo || 'https://via.placeholder.com/200x200?text=No+Photo';
        const availabilityBadge = product.isAvailable
            ? '<span class="availability-badge available">Available</span>'
            : '<span class="availability-badge unavailable">Hidden</span>';

        // Check if product is on sale
        const saleItem = salesList.find(s => s.productId === product.id);
        const priceDisplay = saleItem
            ? `<span class="original-price">${formatPrice(product.catalogPrice)}</span> <span class="sale-price">${formatPrice(saleItem.salePrice)}</span>`
            : `<span class="info-price">${formatPrice(product.catalogPrice)}</span>`;

        // Check if product has an offer
        const offer = offersList.find(o => o.productId === product.id);
        const offerBadge = offer
            ? `<div class="offer-badge">🎁 ${offer.offerDescription}</div>`
            : '';

        card.innerHTML = `
            <div class="info-card-photo" style="position: relative;">
                <img src="${photoUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Photo'">
                ${saleItem ? '<div class="sale-ribbon">SALE</div>' : ''}
            </div>
            <div class="info-card-content">
                <h3 class="info-card-title">${product.name}</h3>
                ${offerBadge}
                <div class="info-card-details">
                    <div class="info-card-row">
                        <span class="info-label">Brand:</span>
                        <span>${product.manufacturer}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Category:</span>
                        <span>${product.category}</span>
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Price:</span>
                        ${priceDisplay}
                    </div>
                    <div class="info-card-row">
                        <span class="info-label">Status:</span>
                        ${availabilityBadge}
                    </div>
                </div>
                <div class="info-card-actions">
                    <button class="btn-small btn-edit" onclick="editProduct(${product.id}); event.stopPropagation();">Edit</button>
                    <button class="btn-small btn-toggle" onclick="toggleAvailabilityFromCard(${product.id}); event.stopPropagation();">Toggle</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// Select product in info mode
function selectProductInfo(productId) {
    selectedProductId = productId;

    // Remove previous selection
    document.querySelectorAll('.info-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    event.currentTarget.classList.add('selected');

    // Show info in right panel
    showInfo();
}

// Toggle availability from card
function toggleAvailabilityFromCard(productId) {
    const product = catalogData.find(p => p.id === productId);
    if (!product) return;

    product.isAvailable = !product.isAvailable;
    populateInfoMode();

    const status = product.isAvailable ? 'available to users' : 'hidden from users';
    alert(`Product "${product.name}" is now ${status}`);
}

