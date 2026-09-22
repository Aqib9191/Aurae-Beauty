import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            Saved Beauty Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            {wishlist.length === 0
              ? 'Your wishlist is currently waiting for your favorite beauty essentials.'
              : `You have ${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved in your private collection.`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-12 text-center max-w-md mx-auto shadow-2xs">
            <ShoppingBag className="w-10 h-10 text-[#A89F91] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#211D1B]">
              No favorites saved yet
            </h3>
            <p className="text-xs text-[#736862] mt-2 mb-6">
              Click the heart icon on any product in our store to save it here for later.
            </p>
            <button
              onClick={() => navigateTo('/shop')}
              className="px-7 py-3 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
