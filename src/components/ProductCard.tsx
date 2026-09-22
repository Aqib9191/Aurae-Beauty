import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [isAdding, setIsAdding] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, selectedColor);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleCardClick = () => {
    navigateTo(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#EBE4DC] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D4C8BD]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F5EFEA] overflow-hidden">
        <img
          src={isHovered && product.gallery.length > 1 ? product.gallery[1] : product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-[#8E3E53] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
              {product.discount}
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-[#211D1B] text-[#FAF8F5] text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          )}
          {product.newArrival && (
            <span className="bg-[#D4AF37] text-[#211D1B] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-[#8E3E53] text-[#FAF8F5] shadow-md scale-105'
              : 'bg-[#FAF8F5]/80 text-[#3D3632] hover:bg-[#FAF8F5] hover:text-[#8E3E53]'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Desktop Hover Action */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#211D1B] rounded-xl text-xs font-semibold backdrop-blur-md shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#736862] mb-1">
            <span className="uppercase tracking-wider font-medium text-[#8E3E53]">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-semibold text-[#211D1B]">{product.rating}</span>
              <span className="text-[#A89F91]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-base font-semibold text-[#211D1B] group-hover:text-[#8E3E53] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subcategory / Short Benefit */}
          <p className="text-xs text-[#736862] mt-0.5 line-clamp-1 font-sans">
            {product.subcategory}
          </p>

          {/* Color Swatches if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === color.name
                      ? 'ring-2 ring-[#8E3E53] ring-offset-1 border-white scale-110'
                      : 'border-black/10 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
              {selectedColor && (
                <span className="text-[10px] text-[#8C7E77] ml-1">{selectedColor}</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-[#F0EBE5] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base font-bold text-[#211D1B]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-[#A89F91] line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#2E7D32] font-medium">
              {product.stock > 5 ? 'In Stock • Ships in 24h' : 'Only few left!'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center focus:outline-none ${
              product.stock === 0
                ? 'bg-[#E5DACF] text-[#8C7E77] cursor-not-allowed'
                : isAdding
                ? 'bg-[#2E7D32] text-white scale-95'
                : 'bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] shadow-xs active:scale-95'
            }`}
            aria-label="Add product to shopping cart"
          >
            {isAdding ? (
              <Check className="w-4 h-4 text-white animate-in zoom-in-50" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
