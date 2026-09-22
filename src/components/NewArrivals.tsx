import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products, navigateTo } = useShop();

  const newProducts = products.filter((p) => p.newArrival);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Just Launched
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
              NEW TO YOUR ROUTINE
            </h2>
            <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-lg leading-relaxed">
              Meet the latest additions to the AURAÉ BEAUTY collection—freshly formulated to protect, illuminate, and pamper.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/new-arrivals')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8E3E53] hover:text-[#211D1B] transition-colors"
          >
            <span>SHOP ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
