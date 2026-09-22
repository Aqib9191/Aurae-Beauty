import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'lum-01',
    name: 'Hydrating Glow Serum',
    category: 'Skincare',
    subcategory: 'Serums & Essences',
    price: 2850,
    oldPrice: 3500,
    discount: '18% OFF',
    rating: 4.9,
    reviewCount: 148,
    description: 'An ultra-lightweight, fast-absorbing elixir infused with triple molecular weight Hyaluronic Acid, Vitamin B5, and botanical squalane. Plumps fine dehydration lines, locks in 72-hour moisture, and imparts an ethereal luminous dewy finish.',
    benefits: [
      'Delivers intensive, deep-layer hydration without sticky residue',
      'Visibly plumps and smooths texture within minutes',
      'Supports the skin barrier against environmental stressors',
      'Creates the perfect priming canvas under makeup'
    ],
    ingredients: 'Aqua/Water, Sodium Hyaluronate (Multi-Molecular Complex), Niacinamide (3%), Panthenol (Pro-Vitamin B5), Plant Squalane, Centella Asiatica Extract, Glycerin, Rosa Damascena Flower Water, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: 'Dispense 3-4 drops onto clean, damp face and neck morning and evening. Gently press into the skin with fingertips until fully absorbed. Follow with Daily Radiance Moisturizer.',
    stock: 24,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-2ff9e3b1c676?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-02',
    name: 'Velvet Matte Lipstick',
    category: 'Lips',
    subcategory: 'Lipsticks',
    price: 1950,
    oldPrice: 2400,
    discount: '18% OFF',
    rating: 4.8,
    reviewCount: 215,
    description: 'A luxurious, weightless cushion matte lipstick that glides effortlessly with saturated, one-swipe color payoff. Enriched with wild mango butter and jojoba seed oil to keep lips supple, pillowy soft, and never dry.',
    benefits: [
      'Soft-focus suede matte finish without flaking or cracking',
      'Comfortable 10-hour non-drying wear',
      'Infused with antioxidant vitamin E and hydrating botanical oils',
      'Available in universally flattering nude, rose, and berry shades'
    ],
    ingredients: 'Dimethicone, Polyglyceryl-2 Triisostearate, Simmondsia Chinensis (Jojoba) Seed Oil, Irvingia Gabonensis (Wild Mango) Kernel Butter, Candelilla Wax, Tocopheryl Acetate (Vitamin E), Iron Oxides, Red 7 Lake.',
    howToUse: 'Swipe directly from the bullet starting at the center of your cupid’s bow and moving outward. For a soft diffused blurred-lip aesthetic, blot gently with a clean tissue.',
    colors: [
      { name: 'Rose Nude', hex: '#B87B75' },
      { name: 'Berry Velvet', hex: '#8E3E53' },
      { name: 'Burnt Terracotta', hex: '#A85A48' },
      { name: 'Pink Petal', hex: '#D28B93' }
    ],
    stock: 45,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-03',
    name: 'Daily Radiance Moisturizer',
    category: 'Skincare',
    subcategory: 'Moisturizers & Creams',
    price: 2499,
    oldPrice: 3100,
    discount: '19% OFF',
    rating: 4.9,
    reviewCount: 182,
    description: 'A deeply replenishing gel-cream packed with Ceramide NP, Oat Kernel Ferment, and Squalane. Restores suppleness, reinforces the moisture mantle, and delivers a fresh-faced, lit-from-within clarity.',
    benefits: [
      'Strengthens compromised skin barriers and calms redness',
      'Cloud-light texture that absorbs without grease or heaviness',
      'Balances oil production while quenching dry patches',
      'Dermatologist-tested for sensitive skin types'
    ],
    ingredients: 'Water, Caprylic/Capric Triglyceride, Ceramide NP, Avena Sativa (Oat) Kernel Extract, Squalane, Butylene Glycol, Sodium Hyaluronate, Allantoin, Camellia Sinensis (Green Tea) Leaf Extract, Carbomer, Triethanolamine.',
    howToUse: 'Smooth a dime-sized amount evenly over face and neck morning and evening. In the morning, follow with your preferred broad-spectrum SPF.',
    stock: 30,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-04',
    name: 'Soft Touch Blush',
    category: 'Makeup',
    subcategory: 'Cheek & Complexion',
    price: 1850,
    oldPrice: 2200,
    discount: '15% OFF',
    rating: 4.7,
    reviewCount: 94,
    description: 'A silky, micro-milled powder blush that melts seamlessly into the skin for a healthy, soft-focus flush. Never powdery or chalky; buildable from a subtle daytime wash to a statement evening radiance.',
    benefits: [
      'Micro-refined pigments blend effortlessly with zero harsh lines',
      'Infused with silky mica for a luminous, soft-matte glow',
      'Sweat-resistant, long-wear formula that lasts throughout the day',
      'Non-comedogenic and pore-blurring effect'
    ],
    ingredients: 'Talc, Synthetic Fluorphlogopite, Mica, Zinc Stearate, Caprylic/Capric Triglyceride, Octyldodecyl Stearoyl Stearate, Dimethicone, Tocopheryl Acetate, CI 77491, CI 77891, CI 15850.',
    howToUse: 'Swirl an angled blush brush across the powder, tap off excess, and lightly buff onto the apples of cheeks sweeping upward toward temples.',
    colors: [
      { name: 'Warm Apricot', hex: '#E29578' },
      { name: 'Dusty Rose', hex: '#C27C88' },
      { name: 'Golden Coral', hex: '#EA8A79' }
    ],
    stock: 18,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-05',
    name: 'Lash Define Mascara',
    category: 'Eyes',
    subcategory: 'Mascaras',
    price: 1650,
    oldPrice: 2100,
    discount: '21% OFF',
    rating: 4.8,
    reviewCount: 163,
    description: 'A high-impact sculpting mascara with a custom hourglass wand that catches and separates every lash. Delivers dramatic panoramic length, lift, and smudge-proof definition that lasts all day.',
    benefits: [
      'Smudge-proof and flake-free for up to 14 hours',
      'Enriched with pro-vitamin B5 and biotinoyl peptide to condition lashes',
      'Hourglass fiber wand lifts inner and outer corner lashes evenly',
      'Easy removal with warm water or gentle cleanser'
    ],
    ingredients: 'Aqua, Copernicia Cerifera (Carnauba) Wax, Beeswax, Stearic Acid, Acacia Senegal Gum, Glycerin, Biotinoyl Tripeptide-1, Panthenol, Iron Oxides (CI 77499).',
    howToUse: 'Wiggle the wand starting from the lash roots and comb through to the tips. Add a second coat before the first dries for dramatic volume.',
    stock: 35,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-06',
    name: 'Gentle Foaming Cleanser',
    category: 'Skincare',
    subcategory: 'Cleansers',
    price: 2150,
    oldPrice: 2600,
    discount: '17% OFF',
    rating: 4.9,
    reviewCount: 132,
    description: 'A pH 5.5 cloud cleanser with amino acids, soothing chamomile water, and calendula. Lathers into a dense micro-foam that dissolves long-wear makeup, excess sebum, and impurities without stripping vital moisture.',
    benefits: [
      'Maintains natural skin pH and protects the acid mantle',
      'Removes waterproof sunscreen and stubborn foundation',
      'Calms redness with natural matricaria chamomile extracts',
      'Free from sulfates, artificial fragrances, and harsh parabens'
    ],
    ingredients: 'Water/Aqua, Sodium Cocoyl Glycinate, Cocamidopropyl Betaine, Chamomilla Recutita Flower Water, Calendula Officinalis Extract, Glycerin, Allantoin, Citric Acid, Disodium EDTA.',
    howToUse: 'Pump 1-2 doses onto damp hands, massage over face in circular motions for 60 seconds, and rinse thoroughly with lukewarm water.',
    stock: 28,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1556228722-d0b776c5b058?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228722-d0b776c5b058?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-2ff9e3b1c676?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-07',
    name: 'Nourishing Hair Mask',
    category: 'Hair Care',
    subcategory: 'Treatments & Masks',
    price: 3250,
    oldPrice: 3900,
    discount: '16% OFF',
    rating: 4.9,
    reviewCount: 104,
    description: 'An intensive restorative hair therapy treatment infused with Moroccan Argan oil, Keratin peptides, and Shea butter. Penetrates damaged cuticles to revive dry, frizzy, or heat-styled strands into glossy liquid silk.',
    benefits: [
      'Deeply repairs split ends and strengthens fragile hair shafts',
      'Tames persistent humidity frizz and prevents flyaways',
      'Restores mirror-like shine and velvety touch',
      'Color-safe and suitable for keratin-treated or dyed hair'
    ],
    ingredients: 'Aqua, Cetearyl Alcohol, Argania Spinosa (Argan) Kernel Oil, Butyrospermum Parkii (Shea) Butter, Hydrolyzed Keratin, Behentrimonium Chloride, Panthenol, Amodimethicone, Fragrance, Phenoxyethanol.',
    howToUse: 'After shampooing, apply a generous scoop from mid-lengths to ends. Leave on for 7-10 minutes. Rinse thoroughly with cool water for maximum shine.',
    stock: 20,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-08',
    name: 'Rose Glow Body Lotion',
    category: 'Body Care',
    subcategory: 'Lotions & Creams',
    price: 2650,
    oldPrice: 3200,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 88,
    description: 'An illuminating all-over body milk enriched with pure Damask Rose extract, Vitamin C, and golden jojoba oil. Absorbs instantly to quench thirsty limbs and leaves a delicate veil of satin shimmer and blooming rose petal scent.',
    benefits: [
      'Continuous 48-hour moisture barrier replenishment',
      'Infused with subtle light-reflecting minerals for an ethereal sheen',
      'Non-greasy, fast-absorbing texture ready for dressing immediately',
      'Exquisite, refined floral scent crafted with real rose distillation'
    ],
    ingredients: 'Aqua, Helianthus Annuus (Sunflower) Seed Oil, Rosa Damascena Flower Extract, Glycerin, Niacinamide, Simmondsia Chinensis (Jojoba) Seed Oil, Mica, Fragrance, Tocopherol, Carbomer.',
    howToUse: 'Smooth generously over arms, legs, and décolletage daily after showering while skin is still slightly warm and receptive.',
    stock: 25,
    featured: true,
    newArrival: false,
    bestSeller: true,
    image: 'https://images.unsplash.com/photo-1608248597359-2ff9e3b1c676?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-2ff9e3b1c676?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-09',
    name: 'Peptide Eye Recovery Cream',
    category: 'Skincare',
    subcategory: 'Eye Care',
    price: 2750,
    oldPrice: 3400,
    discount: '19% OFF',
    rating: 4.9,
    reviewCount: 76,
    description: 'A potent targeted eye treatment formulated with caffeine, Matrixyl 3000 peptides, and brightening vitamin K complex. Diminishes morning puffiness, fades stubborn dark circles, and restores firm youthfulness.',
    benefits: [
      'Visibly reduces under-eye puffiness and fluid retention within 15 minutes',
      'Brightens shadow discoloration around delicate eye contours',
      'Smooths crow’s feet without irritation or stinging',
      'Cooling ceramic applicator mimics lymphatic massage'
    ],
    ingredients: 'Aqua, Caffeine, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Sodium Hyaluronate, Hesperidin Methyl Chalcone, Squalane, Chrysin, Glycerin, Steareth-20.',
    howToUse: 'Dispense half a pump onto ring fingers or the cooling tip. Gently pat along the orbital bone from inner eye outward twice daily.',
    stock: 22,
    featured: false,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-10',
    name: 'Luminous Silk Foundation',
    category: 'Makeup',
    subcategory: 'Complexion & Base',
    price: 3450,
    oldPrice: 4200,
    discount: '17% OFF',
    rating: 4.8,
    reviewCount: 118,
    description: 'A breathable, medium-to-full buildable liquid foundation inspired by fine silk organza. Captures natural light to blur imperfections, unify undertones, and deliver a second-skin satin glow that stays fresh all day.',
    benefits: [
      'Micro-filament technology feels weightless yet covers blemishes and uneven tone',
      '16-hour sweat and humidity resistant wear',
      'Infused with hyaluronic acid and green tea antioxidants',
      'Non-comedogenic and photo-ready with no flashback'
    ],
    ingredients: 'Water, Cyclopentasiloxane, Phenyl Trimethicone, Butylene Glycol, PEG-10 Dimethicone, Squalane, Camellia Sinensis Leaf Extract, Titanium Dioxide, Iron Oxides.',
    howToUse: 'Dispense 1-2 pumps onto the back of your hand. Blend outward with a damp beauty sponge or dense buffing brush for an airbrushed finish.',
    colors: [
      { name: '01 Ivory Cream', hex: '#F3E5D8' },
      { name: '02 Warm Beige', hex: '#E6CFBE' },
      { name: '03 Golden Sand', hex: '#D7BAA1' },
      { name: '04 Honey Almond', hex: '#C49E82' }
    ],
    stock: 26,
    featured: false,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1590156221187-171545657803?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590156221187-171545657803?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-11',
    name: 'Precision Liquid Liner',
    category: 'Eyes',
    subcategory: 'Eye Liners',
    price: 1450,
    oldPrice: 1800,
    discount: '19% OFF',
    rating: 4.7,
    reviewCount: 92,
    description: 'An ultra-fine 0.1mm Japanese calligraphy brush tip liquid liner. Glides across the eyelid with jet-black carbon ink that creates sharp winged flicks or tight-line precision with zero drag or bleeding.',
    benefits: [
      'Waterproof, cry-proof, and smudge-resistant 24h wear',
      'Ultra-fine brush tip gives complete control from whisper-thin to bold graphic lines',
      'Intense carbon black pigment with zero shine or fading',
      'Dries in 3 seconds to avoid lid transfer'
    ],
    ingredients: 'Aqua, Acrylates/Ethylhexyl Acrylate Copolymer, Carbon Black (CI 77266), Propylene Glycol, Laureth-21, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: 'Shake well before application. Place brush tip close to the lash base and draw light strokes along the lash line, angling outward for your desired wing.',
    stock: 38,
    featured: false,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-12',
    name: 'Argan Silk Treatment Oil',
    category: 'Hair Care',
    subcategory: 'Hair Oils & Serums',
    price: 2950,
    oldPrice: 3600,
    discount: '18% OFF',
    rating: 4.9,
    reviewCount: 114,
    description: 'A cold-pressed Moroccan Argan and Camellia seed elixir designed to restore mirror luster, shield against heat tools up to 230°C, and instantly eliminate frizz without weighing down strands.',
    benefits: [
      'Heat protection up to 230°C / 450°F during blow-drying or straightening',
      'Instant glass hair shine with a weightless finish',
      'Replenishes natural lipid barrier on sun-exposed or dyed hair',
      'Subtle amber vanilla fragrance that lingers through the day'
    ],
    ingredients: 'Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Camellia Japonica Seed Oil, Macadamia Ternifolia Seed Oil, Tocopheryl Acetate, Fragrance.',
    howToUse: 'Rub 2-3 drops between palms and run through damp hair before heat styling, or smooth over dry ends to tame frizz and boost shine.',
    stock: 19,
    featured: false,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-13',
    name: 'Exfoliating Coffee & Vanilla Body Polish',
    category: 'Body Care',
    subcategory: 'Scrubs & Polishes',
    price: 2350,
    oldPrice: 2800,
    discount: '16% OFF',
    rating: 4.8,
    reviewCount: 67,
    description: 'An indulgent whipped body polish combining roasted Arabica coffee grounds, golden raw turbinado sugar, and cold-pressed sweet almond oil. Sloughs away rough dull skin, stimulates microcirculation, and deeply hydrates.',
    benefits: [
      'Buffs away rough dry patches on elbows, knees, and heels',
      'Caffeine helps firm skin appearance and smooth texture',
      'Leaves skin cushioned in nourishing botanical oils post-rinse',
      'Warm roasted vanilla bean and espresso aromatherapy experience'
    ],
    ingredients: 'Sucrose, Coffea Arabica (Coffee) Seed Powder, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Cocos Nucifera (Coconut) Oil, Vanilla Planifolia Fruit Extract, Vitamin E.',
    howToUse: 'Gently massage a generous handful onto wet skin in circular motions in the shower. Pay extra care to dry areas. Rinse thoroughly with warm water.',
    stock: 21,
    featured: false,
    newArrival: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-14',
    name: 'Botanical Strengthening Shampoo',
    category: 'Hair Care',
    subcategory: 'Shampoos',
    price: 2100,
    oldPrice: 2500,
    discount: '16% OFF',
    rating: 4.7,
    reviewCount: 78,
    description: 'A sulfate-free strengthening cleanser enriched with Rosemary extract, Biotin, and Horsetail plant stem cells. Purifies scalps gently while reinforcing root strength and minimizing seasonal shedding.',
    benefits: [
      '100% sulfate-free, gentle on scalp microbiome and color treatments',
      'Rosemary extract invigorates hair follicles for fuller density',
      'Biotin boosts strand resilience against mechanical breakage',
      'Rich botanical lather that rinses clean without residue'
    ],
    ingredients: 'Aqua, Sodium Lauroyl Methyl Isethionate, Cocamidopropyl Betaine, Rosmarinus Officinalis (Rosemary) Leaf Oil, Biotin, Equisetum Arvense Extract, Panthenol, Polyquaternium-10, Citric Acid.',
    howToUse: 'Massage into wet scalp for 2 minutes to activate microcirculation. Lather through lengths and rinse thoroughly with cool water.',
    stock: 31,
    featured: false,
    newArrival: false,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-15',
    name: 'Neutral Luxe Eyeshadow Palette',
    category: 'Eyes',
    subcategory: 'Eyeshadows',
    price: 3850,
    oldPrice: 4800,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 142,
    description: 'Nine buttery, highly pigmented earth and jewel tones featuring velvet mattes, molten metallics, and satin pearls. Seamlessly transition from quiet day elegance to sultry evening smoke.',
    benefits: [
      '9 ultra-pigmented shades with zero fall-out or chalkiness',
      'Velvet mattes blend like butter across all skin tones',
      'Reflective foil metallics create multi-dimensional wet sheen',
      'Includes slim mirror compact crafted for travel'
    ],
    ingredients: 'Mica, Talc, Phenyl Trimethicone, Zinc Stearate, Synthetic Fluorphlogopite, Dimethicone, Magnesium Stearate, Silica, CI 77891, CI 77491, CI 77492, CI 77499.',
    howToUse: 'Use a fluffy brush to lay down transition matte shades in the crease. Press metallic foils onto center lid with fingertips for maximum reflective impact.',
    stock: 14,
    featured: true,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'lum-16',
    name: 'Tinted Lip Glow Oil',
    category: 'Lips',
    subcategory: 'Lip Oils & Gloss',
    price: 1750,
    oldPrice: 2100,
    discount: '16% OFF',
    rating: 4.8,
    reviewCount: 129,
    description: 'A plush, non-sticky high-shine lip treatment oil infused with raspberry seed oil and hyaluronic spheres. Drenches lips in cushiony mirror shine while imparting a juicy hint of natural color.',
    benefits: [
      'Glass-like high reflective finish with zero stickiness or tackiness',
      'Deeply conditions chapped lips with cold-pressed botanical oils',
      'Custom color-reviver technology adapts subtly to your natural lip pH',
      'Oversized plush doe-foot wand hugs lip contours in one swipe'
    ],
    ingredients: 'Hydrogenated Polyisobutene, Rubus Idaeus (Raspberry) Seed Oil, Simmondsia Chinensis Seed Oil, Sodium Hyaluronate, Tocopheryl Acetate, CI 45410, Fragrance.',
    howToUse: 'Glide generously over bare lips for an effortless plumped dewy flush, or layer over Velvet Matte Lipstick to add luminous volume.',
    colors: [
      { name: 'Honey Glaze', hex: '#E5A98A' },
      { name: 'Berry Glaze', hex: '#C25D7C' },
      { name: 'Peach Glaze', hex: '#F09B88' }
    ],
    stock: 40,
    featured: false,
    newArrival: true,
    bestSeller: false,
    image: 'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=900&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop&q=80'
    ]
  }
];
