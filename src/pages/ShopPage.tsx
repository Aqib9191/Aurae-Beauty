import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Search, 
  Sparkles, 
  RotateCcw,
  Check
} from 'lucide-react';

interface ShopPageProps {
  initialCategory?: string;
  isNewArrivalsOnly?: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  isNewArrivalsOnly = false,
}) => {
  const { products } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [selectedBadge, setSelectedBadge] = useState<string>(isNewArrivalsOnly ? 'New' : 'All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categoriesList = ['All', 'Skincare', 'Makeup', 'Lips', 'Eyes', 'Hair Care', 'Body Care'];
  const skinTypesList = ['All', 'Dry', 'Oily', 'Sensitive', 'Combination', 'All Skin Types'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Skin type filter
      if (selectedSkinType !== 'All' && selectedSkinType !== 'All Skin Types') {
        if (!product.skinType?.toLowerCase().includes(selectedSkinType.toLowerCase()) && product.skinType !== 'All skin types') {
          return false;
        }
      }

      // Price filter
      if (selectedPriceRange === 'under-2000' && product.price >= 2000) return false;
      if (selectedPriceRange === '2000-3000' && (product.price < 2000 || product.price > 3000)) return false;
      if (selectedPriceRange === 'above-3000' && product.price <= 3000) return false;

      // Special badge filter
      if (selectedBadge === 'New' && !product.newArrival) return false;
      if (selectedBadge === 'Bestseller' && !product.bestSeller) return false;
      if (selectedBadge === 'Sale' && !product.discount) return false;

      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchSub = product.subcategory.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchSub && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, selectedPriceRange, selectedSkinType, selectedBadge, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedSkinType('All');
    setSelectedBadge('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedPriceRange !== 'All' ||
    selectedSkinType !== 'All' ||
    selectedBadge !== 'All' ||
    searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-semibold block mb-1">
            AURAÉ Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#211D1B]">
            {isNewArrivalsOnly
              ? 'New Arrivals'
              : selectedCategory !== 'All'
              ? `${selectedCategory} Essentials`
              : 'Complete Beauty Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-2xl font-sans">
            Explore carefully crafted formulas, radiant pigments, and skin-enriching botanicals. Enjoy Cash on Delivery nationwide.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E8E1D9] shadow-2xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C7E77] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in this collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-[#211D1B] placeholder-[#A89F91] focus:outline-none focus:border-[#8E3E53]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7E77] hover:text-[#211D1B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs font-semibold text-[#211D1B]"
            >
              <Filter className="w-3.5 h-3.5 text-[#8E3E53]" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {/* Product Counter */}
            <span className="text-xs text-[#736862] hidden sm:inline">
              Showing <strong className="text-[#211D1B]">{filteredProducts.length}</strong> products
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#736862] whitespace-nowrap hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3 py-2 text-xs text-[#211D1B] font-medium focus:outline-none focus:border-[#8E3E53]"
              >
                <option value="featured">Featured Favorites</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-[#8C7E77] font-medium mr-1">Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E1D9] text-[#211D1B]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3 text-[#8C7E77] hover:text-[#211D1B]" />
                </button>
              </span>
            )}
            {selectedPriceRange !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E1D9] text-[#211D1B]">
                Price: {selectedPriceRange}
                <button onClick={() => setSelectedPriceRange('All')}>
                  <X className="w-3 h-3 text-[#8C7E77] hover:text-[#211D1B]" />
                </button>
              </span>
            )}
            {selectedSkinType !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E1D9] text-[#211D1B]">
                Skin: {selectedSkinType}
                <button onClick={() => setSelectedSkinType('All')}>
                  <X className="w-3 h-3 text-[#8C7E77] hover:text-[#211D1B]" />
                </button>
              </span>
            )}
            {selectedBadge !== 'All' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E1D9] text-[#211D1B]">
                Badge: {selectedBadge}
                <button onClick={() => setSelectedBadge('All')}>
                  <X className="w-3 h-3 text-[#8C7E77] hover:text-[#211D1B]" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#8E3E53] hover:underline font-semibold flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Main Grid with Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden md:block md:col-span-3 space-y-6 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D9] shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE5]">
              <h3 className="font-serif text-base font-bold text-[#211D1B] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8E3E53]" />
                <span>Refine By</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#8E3E53] hover:underline font-medium"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2.5">
                Department
              </h4>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#F5EFEA] text-[#8E3E53] font-bold'
                        : 'text-[#615752] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#8E3E53]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#F0EBE5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2.5">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-[#615752]">
                {[
                  { label: 'All Prices', value: 'All' },
                  { label: 'Under Rs. 2,000', value: 'under-2000' },
                  { label: 'Rs. 2,000 - Rs. 3,000', value: '2000-3000' },
                  { label: 'Above Rs. 3,000', value: 'above-3000' },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#211D1B]"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                      className="accent-[#8E3E53]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skin Type Filter */}
            <div className="pt-4 border-t border-[#F0EBE5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2.5">
                Skin Type
              </h4>
              <div className="space-y-1">
                {skinTypesList.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedSkinType(st)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedSkinType === st
                        ? 'bg-[#F5EFEA] text-[#8E3E53] font-bold'
                        : 'text-[#615752] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{st}</span>
                    {selectedSkinType === st && <Check className="w-3.5 h-3.5 text-[#8E3E53]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Collections */}
            <div className="pt-4 border-t border-[#F0EBE5]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2.5">
                Special Collections
              </h4>
              <div className="space-y-1.5 text-xs text-[#615752]">
                {[
                  { label: 'All Items', value: 'All' },
                  { label: 'Bestsellers', value: 'Bestseller' },
                  { label: 'New Arrivals', value: 'New' },
                  { label: 'Special Sale', value: 'Sale' },
                ].map((badge) => (
                  <label
                    key={badge.value}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#211D1B]"
                  >
                    <input
                      type="radio"
                      name="specialBadge"
                      checked={selectedBadge === badge.value}
                      onChange={() => setSelectedBadge(badge.value)}
                      className="accent-[#8E3E53]"
                    />
                    <span>{badge.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="col-span-1 md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E1D9] p-12 text-center my-6">
                <div className="w-14 h-14 rounded-full bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#211D1B]">
                  No matching beauty products
                </h3>
                <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-md mx-auto leading-relaxed">
                  We couldn't find any products matching your selected criteria. Try adjusting your filters or resetting to view all essentials.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#211D1B]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D9] mb-6">
                <h3 className="font-serif text-lg font-bold text-[#211D1B]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#736862]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-[#211D1B] mb-2">Category</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        selectedCategory === cat
                          ? 'bg-[#211D1B] text-white'
                          : 'bg-white text-[#524A45] border border-[#E0D7CE]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pt-4 border-t border-[#E8E1D9]">
                <h4 className="text-xs font-bold uppercase text-[#211D1B] mb-2">Price Range</h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'All Prices', value: 'All' },
                    { label: 'Under Rs. 2,000', value: 'under-2000' },
                    { label: 'Rs. 2,000 - Rs. 3,000', value: '2000-3000' },
                    { label: 'Above Rs. 3,000', value: 'above-3000' },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mobPrice"
                        checked={selectedPriceRange === range.value}
                        onChange={() => setSelectedPriceRange(range.value)}
                        className="accent-[#8E3E53]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E1D9] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#211D1B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              <button
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-transparent text-xs text-[#736862] hover:underline"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
