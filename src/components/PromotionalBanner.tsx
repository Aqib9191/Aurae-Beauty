import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#211D1B] text-[#FAF8F5] shadow-2xl border border-[#3D3530]">
          {/* Background image & gradient */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1400&auto=format&fit=crop&q=85"
              alt="AURAÉ Editorial Beauty Edit"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#1A1614] via-[#1A1614]/90 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 lg:p-20 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/10 border border-white/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Seasonal Capsule</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              YOUR GLOW, <br />
              <span className="italic font-normal font-serif text-[#EAD8CD]">YOUR WAY.</span>
            </h2>

            <p className="text-xs sm:text-base text-[#D8CCC4] leading-relaxed font-sans">
              Discover selected beauty essentials and enjoy special seasonal offers. Curated combinations of ultra-hydrating serums, nourishing body milks, and velvet matte tints.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('/shop')}
                className="px-8 py-4 bg-[#FAF8F5] hover:bg-[#EAE0D5] text-[#211D1B] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>SHOP THE EDIT</span>
                <ArrowRight className="w-4 h-4 text-[#8E3E53] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('/skincare')}
                className="px-7 py-4 bg-transparent hover:bg-white/10 text-[#FAF8F5] border border-white/30 text-xs font-semibold uppercase tracking-widest rounded-xl transition-all"
              >
                <span>EXPLORE SKINCARE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
