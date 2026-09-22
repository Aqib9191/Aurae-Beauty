import React from 'react';
import { useShop } from '../context/ShopContext';
import { businessConfig } from '../config/business';
import { Sparkles, Heart, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-bold block mb-2">
            The AURAÉ Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#211D1B] tracking-tight">
            BEAUTY, ELEVATED.
          </h1>
          <p className="text-sm sm:text-base text-[#615752] mt-4 leading-relaxed font-sans">
            Born from a desire to bring pure, skin-kind luxury into daily living, AURAÉ BEAUTY represents modern cosmetics formulated with botanical integrity and effortless elegance.
          </p>
        </div>

        {/* Story Section with Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div className="aspect-4/5 rounded-3xl overflow-hidden bg-[#E8DDD5] border border-[#E0D7CE] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80"
              alt="AURAÉ philosophy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 text-xs sm:text-sm text-[#524A45] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B]">
              Our Journey &amp; Passion
            </h2>
            <p>
              Founded in Lahore, Pakistan, {businessConfig.brandName} was created for individuals who cherish healthy skin and timeless aesthetic refinement. We realized that premium beauty too often comes with overwhelming routines and inaccessible price points.
            </p>
            <p>
              We set out to change that by curating essential formulations that enhance natural textures rather than concealing them. From weightless hyaluronic serums to plush velvet matte lip colours, every single item in our edit is dermatologist-tested and cruelty-free.
            </p>
            <p>
              With our nationwide Cash on Delivery network, personalized WhatsApp beauty consultation, and uncompromising ingredient safety standards, we bring effortless everyday luxury directly to your doorstep.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8E1D9] mb-16">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D9] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211D1B]">Clean Actives</h3>
            <p className="text-xs text-[#736862] leading-relaxed">
              Formulated without harsh parabens, silicones, sulfates, or artificial fragrances that clog pores.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D9] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211D1B]">100% Cruelty-Free</h3>
            <p className="text-xs text-[#736862] leading-relaxed">
              We never test on animals, choosing only ethical laboratories and ethically harvested botanical extracts.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D9] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#211D1B]">Client Care</h3>
            <p className="text-xs text-[#736862] leading-relaxed">
              Nationwide Cash on Delivery, hassle-free exchanges, and personal consultation via WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-[#FFFFFF] p-10 rounded-3xl border border-[#E8E1D9] shadow-2xs">
          <h3 className="font-serif text-2xl font-bold text-[#211D1B] mb-2">
            Ready to Discover Your New Favorites?
          </h3>
          <p className="text-xs text-[#736862] max-w-md mx-auto mb-6">
            Browse our bestselling collection of skincare, lip tints, and hair elixirs.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-8 py-3.5 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>EXPLORE SHOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
