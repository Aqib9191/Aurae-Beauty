import React from 'react';
import { categories } from '../data/categories';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { navigateTo } = useShop();

  const handleCategoryClick = (slug: string) => {
    navigateTo(`/${slug}`);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
            SHOP YOUR BEAUTY ESSENTIALS
          </h2>
          <p className="text-xs sm:text-sm text-[#736862] mt-3 leading-relaxed">
            Thoughtfully crafted formulas and shades designed to simplify your everyday ritual and elevate your natural beauty.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-[#F5EFEA] border border-[#E8E1D9] hover:border-[#D8CCC4] transition-all duration-500 hover:shadow-xl flex flex-col justify-end aspect-4/5 sm:aspect-3/4"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1F1B19]/90 via-[#1F1B19]/40 to-transparent transition-opacity duration-300 group-hover:from-[#1F1B19]/95" />

              {/* Tag / Item count badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[10px] uppercase font-medium tracking-wider px-2.5 py-1 rounded-full bg-[#FFFFFF]/25 backdrop-blur-md text-[#FAF8F5] border border-white/20">
                  {category.itemCount} Essentials
                </span>
              </div>

              {/* Content Panel */}
              <div className="relative z-10 p-6 sm:p-7 text-[#FAF8F5] transform transition-transform duration-300">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  {category.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {category.name}
                </h3>
                <p className="text-xs text-[#E5DACF] mt-2 line-clamp-2 leading-relaxed font-sans opacity-90">
                  {category.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                  <span>Explore Collection</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#D4AF37] group-hover:text-[#211D1B] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
