import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filterTabs = ['All', 'Skincare', 'Makeup', 'Lips', 'Eyes', 'Hair Care', 'Body Care'];

  // Prioritize bestseller items
  const bestsellers = products.filter((p) => p.bestSeller || p.featured);

  const displayedProducts = activeCategory === 'All'
    ? bestsellers
    : bestsellers.filter((p) => p.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
              BEAUTY BESTSELLERS
            </h2>
            <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-lg leading-relaxed">
              Our most celebrated formulas, proven to deliver luminous hydration, velvety color, and everyday confidence.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === tab
                    ? 'bg-[#211D1B] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#615752] border border-[#E0D7CE] hover:border-[#8E3E53] hover:text-[#211D1B]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('/shop')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#211D1B] border border-[#D8CCC4] hover:border-[#8E3E53] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-2xs hover:shadow-md group"
          >
            <span>DISCOVER COMPLETE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-[#8E3E53] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
