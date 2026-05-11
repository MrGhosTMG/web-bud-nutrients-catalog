// Shared Data Layer - единый источник данных для всех страниц
// Все продукты в унифицированном формате

const sharedProducts = [
    // ===== SUPPLEMENTS (sourceType: 'bud') =====
    { id: 1, name: 'Omega-3 Fish Oil', manufacturer: 'Nature Made', category: 'Herbal', myPrice: 20, catalogPrice: 25, quantity: 45, photo: null, description: 'High-quality fish oil supplement', orderStatus: 'ordered', sourceType: 'bud' },
    { id: 2, name: 'Vitamin D3', manufacturer: 'Solgar', category: 'Mineral', myPrice: 15, catalogPrice: 18, quantity: 50, photo: null, description: 'Essential vitamin D supplement', orderStatus: 'ordernow', sourceType: 'bud' },
    { id: 3, name: 'Multivitamin Complex', manufacturer: 'Centrum', category: 'Medic+', myPrice: 24, catalogPrice: 30, quantity: 0, photo: null, description: 'Complete daily multivitamin', orderStatus: 'delivered', sourceType: 'bud' },
    { id: 4, name: 'Collagen Peptides', manufacturer: 'Vital Proteins', category: 'Cosmethic', myPrice: 36, catalogPrice: 45, quantity: 50, photo: null, description: 'Skin and joint support', orderStatus: 'ordered', sourceType: 'bud' },
    { id: 5, name: 'Probiotics', manufacturer: 'Garden of Life', category: 'Other', myPrice: 28, catalogPrice: 35, quantity: 50, photo: null, description: 'Digestive health support', orderStatus: 'ordernow', sourceType: 'bud' },
    { id: 6, name: 'Magnesium Citrate', manufacturer: 'Nature Made', category: 'Mineral', myPrice: 16, catalogPrice: 20, quantity: 50, photo: null, description: 'Supports muscle and nerve function', orderStatus: 'delivered', sourceType: 'bud' },
    { id: 7, name: 'Turmeric Curcumin', manufacturer: 'Solgar', category: 'Herbal', myPrice: 22, catalogPrice: 28, quantity: 50, photo: null, description: 'Anti-inflammatory support', orderStatus: 'ordered', sourceType: 'bud' },
    { id: 8, name: 'Biotin Hair Growth', manufacturer: 'Nature Bounty', category: 'Cosmethic', myPrice: 18, catalogPrice: 22, quantity: 0, photo: null, description: 'Promotes healthy hair growth', orderStatus: 'ordernow', sourceType: 'bud' },
    { id: 9, name: 'Zinc Immune Support', manufacturer: 'NOW Foods', category: 'Medic+', myPrice: 12, catalogPrice: 15, quantity: 50, photo: null, description: 'Boosts immune system', orderStatus: 'delivered', sourceType: 'bud' },
    { id: 10, name: 'Ashwagandha Extract', manufacturer: 'Himalaya', category: 'Herbal', myPrice: 26, catalogPrice: 32, quantity: 34, photo: null, description: 'Stress relief and energy', orderStatus: 'ordered', sourceType: 'bud' },
    { id: 11, name: 'Calcium Plus D', manufacturer: 'Centrum', category: 'Mineral', myPrice: 19, catalogPrice: 24, quantity: 50, photo: null, description: 'Bone health support', orderStatus: 'ordernow', sourceType: 'bud' },
    { id: 12, name: 'Green Tea Extract', manufacturer: 'Garden of Life', category: 'Other', myPrice: 22, catalogPrice: 27, quantity: 50, photo: null, description: 'Antioxidant support', orderStatus: 'delivered', sourceType: 'bud' },
    { id: 13, name: 'Hyaluronic Acid', manufacturer: 'Vital Proteins', category: 'Cosmethic', myPrice: 30, catalogPrice: 38, quantity: 50, photo: null, description: 'Skin hydration', orderStatus: 'ordered', sourceType: 'bud' },
    { id: 14, name: 'B-Complex Vitamins', manufacturer: 'Nature Made', category: 'Medic+', myPrice: 15, catalogPrice: 19, quantity: 0, photo: null, description: 'Energy and metabolism support', orderStatus: 'ordernow', sourceType: 'bud' },
    { id: 15, name: 'Ginkgo Biloba', manufacturer: 'Solgar', category: 'Herbal', myPrice: 21, catalogPrice: 26, quantity: 50, photo: null, description: 'Memory and cognitive support', orderStatus: 'delivered', sourceType: 'bud' },

    // ===== COSMETICS / ADVANCED (sourceType: 'advanced') =====
    { id: 101, name: 'Anti-Aging Face Cream', manufacturer: "L'Oreal", category: 'Cosmetics', myPrice: 36, catalogPrice: 45, quantity: 20, photo: null, description: 'Advanced anti-aging formula', orderStatus: '', sourceType: 'advanced' },
    { id: 102, name: 'Hydrating Serum', manufacturer: 'Neutrogena', category: 'Cosmetics', myPrice: 28, catalogPrice: 35, quantity: 15, photo: null, description: 'Deep hydration serum', orderStatus: '', sourceType: 'advanced' },
    { id: 103, name: 'Body Lotion', manufacturer: 'Nivea', category: 'Creams', myPrice: 14, catalogPrice: 18, quantity: 30, photo: null, description: 'Moisturizing body lotion', orderStatus: '', sourceType: 'advanced' },
    { id: 104, name: 'Hand Cream', manufacturer: 'Vaseline', category: 'Creams', myPrice: 10, catalogPrice: 12, quantity: 25, photo: null, description: 'Intensive hand care', orderStatus: '', sourceType: 'advanced' },
    { id: 105, name: 'Sunscreen SPF 50', manufacturer: 'Coppertone', category: 'Cosmetics', myPrice: 22, catalogPrice: 28, quantity: 0, photo: null, description: 'High protection sunscreen', orderStatus: '', sourceType: 'advanced' },
    { id: 106, name: 'Lip Balm', manufacturer: 'Burts Bees', category: 'Other', myPrice: 6, catalogPrice: 8, quantity: 40, photo: null, description: 'Natural lip care', orderStatus: '', sourceType: 'advanced' },
    { id: 107, name: 'Night Cream', manufacturer: 'Olay', category: 'Creams', myPrice: 30, catalogPrice: 38, quantity: 12, photo: null, description: 'Regenerating night cream', orderStatus: '', sourceType: 'advanced' },
    { id: 108, name: 'Eye Cream', manufacturer: 'Clinique', category: 'Cosmetics', myPrice: 42, catalogPrice: 52, quantity: 8, photo: null, description: 'Reduces dark circles', orderStatus: '', sourceType: 'advanced' },
    { id: 109, name: 'Foot Cream', manufacturer: 'Scholl', category: 'Creams', myPrice: 12, catalogPrice: 15, quantity: 20, photo: null, description: 'Softening foot care', orderStatus: '', sourceType: 'advanced' },
    { id: 110, name: 'Face Mask', manufacturer: 'Garnier', category: 'Cosmetics', myPrice: 18, catalogPrice: 22, quantity: 35, photo: null, description: 'Purifying face mask', orderStatus: '', sourceType: 'advanced' },
    { id: 111, name: 'BB Cream', manufacturer: 'Maybelline', category: 'Cosmetics', myPrice: 13, catalogPrice: 16, quantity: 18, photo: null, description: 'Beauty balm with SPF', orderStatus: '', sourceType: 'advanced' },
    { id: 112, name: 'Massage Oil', manufacturer: 'Johnsons', category: 'Other', myPrice: 11, catalogPrice: 14, quantity: 22, photo: null, description: 'Relaxing massage oil', orderStatus: '', sourceType: 'advanced' }
];

// Общие списки
const sharedManufacturersList = [
    'Nature Made', 'Solgar', 'Centrum', 'Vital Proteins', 'Garden of Life',
    'Nature Bounty', 'NOW Foods', 'Himalaya',
    "L'Oreal", 'Neutrogena', 'Nivea', 'Vaseline', 'Coppertone',
    'Burts Bees', 'Olay', 'Clinique', 'Scholl', 'Garnier', 'Maybelline', 'Johnsons'
];

const sharedCategoriesList = [
    'Herbal', 'Mineral', 'Medic+', 'Cosmethic', 'Other', 'Cosmetics', 'Creams'
];

// Вспомогательные функции
function getProductById(id) {
    return sharedProducts.find(p => p.id === id);
}

function getSourceTypeLabel(type) {
    return type === 'bud' ? 'Supplement' : 'Cosmetics';
}
