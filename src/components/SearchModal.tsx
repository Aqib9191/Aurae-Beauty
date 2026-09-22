import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { products, isSearchModalOpen, setIsSearchModalOpen, navigateTo } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const popularSearches = [
    'Glow Serum',
    'Matte Lipstick',
    'Moisturizer',
    'Hair Mask',
    'Rose Body Lotion',
    'Mascara',
  ];

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.ingredients.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectProduct = (id: string) => {
    setIsSearchModalOpen(false);
    navigateTo(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211D1B]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative min-h-screen sm:min-h-0 sm:mt-16 max-w-3xl mx-auto p-4 sm:p-6 z-10">
        <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E5DACF] overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E8E1D9] flex items-center gap-3 bg-[#FFFFFF]">
            <Search className="w-5 h-5 text-[#8E3E53] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, category, shade, or active ingredient..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#211D1B] placeholder-[#A89F91] focus:outline-none font-sans"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-[#8C7E77] hover:text-[#211D1B]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="p-1.5 text-xs font-medium text-[#736862] hover:text-[#211D1B] bg-[#F5EFEA] hover:bg-[#EFE9E2] px-2.5 py-1 rounded-lg transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!searchTerm && (
            <div className="p-6">
              <p className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider mb-3">
                Trending Beauty Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E8E1D9] text-[#524A45] hover:border-[#8E3E53] hover:text-[#8E3E53] transition-all shadow-2xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#F0EBE5]">
                <p className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider mb-3">
                  Shop by Department
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['Skincare', 'Makeup', 'Hair Care', 'Body Care'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateTo(`/${cat.toLowerCase().replace(' ', '-')}`);
                      }}
                      className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E8E1D9] text-left hover:border-[#8E3E53] hover:text-[#8E3E53] font-medium transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F0EBE5]">
                <span className="text-xs font-medium text-[#736862]">
                  Found <strong className="text-[#211D1B]">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'} for "{searchTerm}"
                </span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      navigateTo('/shop');
                    }}
                    className="text-xs text-[#8E3E53] hover:underline font-medium flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EFE9E2] text-[#8C7E77] flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#211D1B]">No results found</h4>
                  <p className="text-xs text-[#736862] mt-1 max-w-sm mx-auto leading-relaxed">
                    We couldn't find what you're looking for. Try another beauty product or category.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-4 py-2 bg-[#211D1B] text-white text-xs font-semibold rounded-xl hover:bg-[#8E3E53] transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="group cursor-pointer p-3 rounded-xl bg-[#FFFFFF] border border-[#E8E1D9] hover:border-[#D4C8BD] hover:shadow-sm transition-all flex gap-3 items-center"
                    >
                      <div className="w-16 h-18 rounded-lg overflow-hidden bg-[#F5EFEA] shrink-0 border border-[#E8E1D9]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-[#8E3E53] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-[#211D1B] group-hover:text-[#8E3E53] transition-colors truncate">
                          {product.name}
                        </h5>
                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-[#736862]">
                          <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-serif text-xs font-bold text-[#211D1B]">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          {product.oldPrice && (
                            <span className="text-[10px] text-[#A89F91] line-through">
                              Rs. {product.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
