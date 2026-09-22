import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Shield, Truck, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative overflow-hidden bg-[#F6F1EA] py-12 md:py-20 border-b border-[#E8E1D9]">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBD8CE]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8DDD5]/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E5DACF] text-[#8E3E53] text-xs font-semibold tracking-widest uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pure Radiance • Clean Formulations</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211D1B] leading-[1.12]">
              BEAUTY, <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif text-[#8E3E53]">ELEVATED.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C524C] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover carefully selected beauty essentials designed to bring confidence, glow, and everyday luxury to your routine. Made with skin-loving botanical actives and weightless textures.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => navigateTo('/shop')}
                className="w-full sm:w-auto px-8 py-4 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('/skincare')}
                className="w-full sm:w-auto px-7 py-4 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#211D1B] border border-[#D8CCC4] hover:border-[#8E3E53] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-2xs"
              >
                <span>EXPLORE SKINCARE</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#E8E1D9] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#211D1B]">100%</span>
                <span className="text-[11px] text-[#736862] leading-tight block mt-0.5">Authentic &amp; Cruelty-Free</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#211D1B]">COD</span>
                <span className="text-[11px] text-[#736862] leading-tight block mt-0.5">Nationwide Doorstep Delivery</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#211D1B]">FREE</span>
                <span className="text-[11px] text-[#736862] leading-tight block mt-0.5">Shipping Over Rs. 5,000</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-[#EFE8DF]">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1100&auto=format&fit=crop&q=85"
                  alt="AURAÉ BEAUTY luxury skincare & cosmetics editorial"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#211D1B]/40 via-transparent to-transparent" />
                
                {/* Embedded floating review card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#FFFFFF]/90 backdrop-blur-md border border-[#FFFFFF] shadow-lg flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#E8E1D9]">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                      alt="Verified beauty customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-xs font-semibold text-[#211D1B] truncate mt-0.5">
                      "My skin has never felt this soft and radiant."
                    </p>
                    <p className="text-[10px] text-[#736862]">
                      Ayesha K. • Verified AURAÉ Buyer
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#211D1B] text-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#423A36] hidden sm:block">
                <p className="text-[10px] uppercase font-semibold tracking-widest text-[#D4AF37]">Seasonal Edit</p>
                <p className="font-serif text-sm font-bold mt-0.5">Glow Collection</p>
                <p className="text-[11px] text-[#D8CCC4]">Up to 25% Off</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Bar */}
        <div className="mt-12 pt-8 border-t border-[#E8E1D9] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5DACF] flex items-center justify-center text-[#8E3E53] shrink-0 shadow-2xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#211D1B] font-sans">Cash on Delivery</h4>
              <p className="text-[11px] text-[#736862]">Pay at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5DACF] flex items-center justify-center text-[#8E3E53] shrink-0 shadow-2xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#211D1B] font-sans">Dermatologist Tested</h4>
              <p className="text-[11px] text-[#736862]">Gentle &amp; clean actives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5DACF] flex items-center justify-center text-[#8E3E53] shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#211D1B] font-sans">Free Shipping</h4>
              <p className="text-[11px] text-[#736862]">On orders over Rs. 5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E5DACF] flex items-center justify-center text-[#8E3E53] shrink-0 shadow-2xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#211D1B] font-sans">WhatsApp Concierge</h4>
              <p className="text-[11px] text-[#736862]">Instant expert advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
