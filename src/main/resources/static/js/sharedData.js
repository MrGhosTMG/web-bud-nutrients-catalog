const sharedProducts = [
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', myPrice: 20, catalogPrice: 25, quantity: 45, soldQuantity: 12, photo: null, description: 'High-quality fish oil supplement', orderStatus: 'ordered', sourceType: 'bud', orderDate: '2026-03-15', expiryDate: '2026-07-20', forSale: true },
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', myPrice: 15, catalogPrice: 18, quantity: 50, soldQuantity: 8, photo: null, description: 'Essential vitamin D supplement', orderStatus: 'ordernow', sourceType: 'bud', orderDate: '2026-04-20', expiryDate: '2026-09-15' },
    { id: 3, name: 'Multivitamin Complex', manufacturer: 'Centrum', category: 'Medic+', myPrice: 24, catalogPrice: 30, quantity: 0, soldQuantity: 5, photo: null, description: 'Complete daily multivitamin', orderStatus: 'delivered', sourceType: 'bud', orderDate: '2026-02-01', expiryDate: '2026-06-10' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', myPrice: 36, catalogPrice: 45, quantity: 50, soldQuantity: 3, photo: null, description: 'Skin and joint support', orderStatus: 'ordered', sourceType: 'bud', orderDate: '2026-05-01', expiryDate: '2026-12-01' },
    { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', myPrice: 28, catalogPrice: 35, quantity: 50, soldQuantity: 0, photo: null, description: 'Digestive health support', orderStatus: 'ordernow', sourceType: 'bud', orderDate: '2026-04-10', expiryDate: '2026-08-15' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', myPrice: 16, catalogPrice: 20, quantity: 50, soldQuantity: 20, actualSoldPrice: 18, photo: null, description: 'Supports muscle and nerve function', orderStatus: 'delivered', sourceType: 'bud', orderDate: '2026-01-05', expiryDate: '2026-05-25' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', myPrice: 22, catalogPrice: 28, quantity: 50, soldQuantity: 7, photo: null, description: 'Anti-inflammatory support', orderStatus: 'ordered', sourceType: 'bud', orderDate: '2026-03-28', expiryDate: '2026-07-30' },
    { id: 8, name: 'Biotin Hair Growth', manufacturer: 'Nature Bounty', category: 'Cosmethic', myPrice: 18, catalogPrice: 22, quantity: 0, soldQuantity: 0, photo: null, description: 'Promotes healthy hair growth', orderStatus: 'ordernow', sourceType: 'bud', orderDate: '2026-05-10', expiryDate: '2026-11-01' },
    { id: 9, name: 'Zinc Immune Support', manufacturer: 'NOW Foods', category: 'Medic+', myPrice: 12, catalogPrice: 15, quantity: 50, soldQuantity: 15, actualSoldPrice: 14, photo: null, description: 'Boosts immune system', orderStatus: 'delivered', sourceType: 'bud', orderDate: '2026-02-20', expiryDate: '2026-06-05' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', myPrice: 26, catalogPrice: 32, quantity: 34, soldQuantity: 6, photo: null, description: 'Stress relief and energy', orderStatus: 'ordered', sourceType: 'bud', orderDate: '2026-04-05', expiryDate: '2026-08-20' },
    { id: 11, name: 'Calcium Plus D', manufacturer: 'Centrum', category: 'Mineral', myPrice: 19, catalogPrice: 24, quantity: 50, soldQuantity: 0, photo: null, description: 'Bone health support', orderStatus: 'ordernow', sourceType: 'bud', orderDate: '2026-05-12', expiryDate: '2026-10-15' },
    { id: 12, name: 'Green Tea Extract', manufacturer: 'Garden of Life', category: 'Other', myPrice: 22, catalogPrice: 27, quantity: 50, soldQuantity: 10, photo: null, description: 'Antioxidant support', orderStatus: 'delivered', sourceType: 'bud', orderDate: '2026-01-15', expiryDate: '2026-05-10' },
    { id: 13, name: 'Hyaluronic Acid', manufacturer: 'Vital Proteins', category: 'Cosmethic', myPrice: 30, catalogPrice: 38, quantity: 50, soldQuantity: 2, photo: null, description: 'Skin hydration', orderStatus: 'ordered', sourceType: 'bud', orderDate: '2026-04-25', expiryDate: '2026-09-01' },
    { id: 14, name: 'B-Complex Vitamins', manufacturer: 'Nature Made', category: 'Medic+', myPrice: 15, catalogPrice: 19, quantity: 0, soldQuantity: 0, photo: null, description: 'Energy and metabolism support', orderStatus: 'ordernow', sourceType: 'bud', orderDate: '2026-05-08', expiryDate: '2026-07-15' },
    { id: 15, name: 'Ginkgo Biloba', manufacturer: 'Solgar', category: 'Herbal', myPrice: 21, catalogPrice: 26, quantity: 50, soldQuantity: 4, photo: null, description: 'Memory and cognitive support', orderStatus: 'delivered', sourceType: 'bud', orderDate: '2026-03-01', expiryDate: '2026-06-20' },
    { id: 101, name: 'Anti-Aging Face Cream', manufacturer: "L'Oreal", category: 'Cosmetics', myPrice: 36, catalogPrice: 45, quantity: 20, soldQuantity: 5, photo: null, description: 'Advanced anti-aging formula', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2027-01-15' },
    { id: 102, name: 'Hydrating Serum', manufacturer: 'Neutrogena', category: 'Cosmetics', myPrice: 28, catalogPrice: 35, quantity: 15, soldQuantity: 3, photo: null, description: 'Deep hydration serum', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-11-20' },
    { id: 103, name: 'Body Lotion', manufacturer: 'Nivea', category: 'Creams', myPrice: 14, catalogPrice: 18, quantity: 30, soldQuantity: 8, photo: null, description: 'Moisturizing body lotion', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-10-01' },
    { id: 104, name: 'Hand Cream', manufacturer: 'Vaseline', category: 'Creams', myPrice: 10, catalogPrice: 12, quantity: 25, soldQuantity: 2, photo: null, description: 'Intensive hand care', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-06-30' },
    { id: 105, name: 'Sunscreen SPF 50', manufacturer: 'Coppertone', category: 'Cosmetics', myPrice: 22, catalogPrice: 28, quantity: 0, soldQuantity: 0, photo: null, description: 'High protection sunscreen', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-07-01' },
    { id: 106, name: 'Lip Balm', manufacturer: 'Burts Bees', category: 'Other', myPrice: 6, catalogPrice: 8, quantity: 40, soldQuantity: 15, photo: null, description: 'Natural lip care', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2027-03-01' },
    { id: 107, name: 'Night Cream', manufacturer: 'Olay', category: 'Creams', myPrice: 30, catalogPrice: 38, quantity: 12, soldQuantity: 4, photo: null, description: 'Regenerating night cream', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-08-15' },
    { id: 108, name: 'Eye Cream', manufacturer: 'Clinique', category: 'Cosmetics', myPrice: 42, catalogPrice: 52, quantity: 8, soldQuantity: 1, photo: null, description: 'Reduces dark circles', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-09-01' },
    { id: 109, name: 'Foot Cream', manufacturer: 'Scholl', category: 'Creams', myPrice: 12, catalogPrice: 15, quantity: 20, soldQuantity: 6, photo: null, description: 'Softening foot care', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-07-20' },
    { id: 110, name: 'Face Mask', manufacturer: 'Garnier', category: 'Cosmetics', myPrice: 18, catalogPrice: 22, quantity: 35, soldQuantity: 10, photo: null, description: 'Purifying face mask', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-06-25' },
    { id: 111, name: 'BB Cream', manufacturer: 'Maybelline', category: 'Cosmetics', myPrice: 13, catalogPrice: 16, quantity: 18, soldQuantity: 7, photo: null, description: 'Beauty balm with SPF', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2027-02-01' },
    { id: 112, name: 'Massage Oil', manufacturer: 'Johnsons', category: 'Other', myPrice: 11, catalogPrice: 14, quantity: 22, soldQuantity: 3, photo: null, description: 'Relaxing massage oil', orderStatus: '', sourceType: 'advanced', orderDate: null, expiryDate: '2026-12-01' }
];

const sharedManufacturersList = [
    'Nature Made', 'Solgar', 'Centrum', 'Vital Proteins', 'Garden of Life',
    'Nature Bounty', 'NOW Foods', 'Himalaya',
    "L'Oreal", 'Neutrogena', 'Nivea', 'Vaseline', 'Coppertone',
    'Burts Bees', 'Olay', 'Clinique', 'Scholl', 'Garnier', 'Maybelline', 'Johnsons'
];

const sharedCategoriesList = [
    'Herbal', 'Mineral', 'Medic+', 'Cosmethic', 'Other', 'Cosmetics', 'Creams'
];

function getProductById(id) {
    return sharedProducts.find(p => p.id === id);
}

function getSourceTypeLabel(type) {
    return type === 'bud' ? 'Supplement' : 'Cosmetics';
}

function daysSince(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

function daysUntil(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((d - now) / (1000 * 60 * 60 * 24));
}

function isExpiringSoon(dateStr, withinDays) {
    const du = daysUntil(dateStr);
    return du !== null && du >= 0 && du <= withinDays;
}

function isExpired(dateStr) {
    const du = daysUntil(dateStr);
    return du !== null && du < 0;
}

function calcProfit(product) {
    const sellPrice = product.actualSoldPrice != null ? product.actualSoldPrice : product.catalogPrice;
    const revenue = (product.soldQuantity || 0) * sellPrice;
    const cost = (product.soldQuantity || 0) * product.myPrice;
    return revenue - cost;
}

function calcProfitMargin(product) {
    const sellPrice = product.actualSoldPrice != null ? product.actualSoldPrice : product.catalogPrice;
    const revenue = (product.soldQuantity || 0) * sellPrice;
    const cost = (product.soldQuantity || 0) * product.myPrice;
    if (revenue === 0) return 0;
    return ((revenue - cost) / revenue) * 100;
}
