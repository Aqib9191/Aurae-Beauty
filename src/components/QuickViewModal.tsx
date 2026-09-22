import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Star, ShoppingBag, ArrowRight, Check, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentImage = selectedImage || product.image;
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedColor || (product.colors && product.colors[0]?.name));
    setTimeout(() => {
      setIsAdding(false);
      setQuickViewProduct(null);
    }, 500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor || (product.colors && product.colors[0]?.name));
    setQuickViewProduct(null);
    navigateTo('/checkout');
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigateTo(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211D1B]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen sm:min-h-0 sm:my-10 max-w-4xl mx-auto p-4 sm:p-6 z-10 flex items-center justify-center">
        <div className="bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E5DACF] overflow-hidden w-full relative">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#211D1B] shadow-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#F5EFEA] flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#E8E1D9]">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-[#8E3E53] text-[#FAF8F5] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        currentImage === img ? 'border-[#8E3E53] scale-105' : 'border-[#E8E1D9] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F5]">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-[#736862] mb-1.5">
                  <span className="text-[#8E3E53] font-semibold uppercase tracking-widest text-[10px]">
                    {product.category} • {product.subcategory}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-semibold text-[#211D1B]">{product.rating}</span>
                    <span className="text-[#8C7E77]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B] leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="font-serif text-2xl font-bold text-[#211D1B]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#A89F91] line-through">
                      Rs. {product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-md">
                    Cash on Delivery Available
                  </span>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-[#524A45] mt-3 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Color Swatches if applicable */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E8E1D9]">
                    <span className="text-xs font-medium text-[#211D1B] block mb-2">
                      Select Shade: <strong className="text-[#8E3E53]">{selectedColor || product.colors[0].name}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => {
                        const isCurrent = (selectedColor || product.colors![0].name) === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-all ${
                              isCurrent
                                ? 'border-[#8E3E53] bg-[#F5EFEA] font-medium text-[#211D1B] shadow-2xs'
                                : 'border-[#E0D7CE] bg-white text-[#615752] hover:border-[#8E3E53]'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span>{color.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-xs font-medium text-[#211D1B]">Quantity:</span>
                  <div className="flex items-center border border-[#E0D7CE] rounded-lg bg-[#FFFFFF]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-xs text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#211D1B]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-xs text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-[#E8E1D9] space-y-2.5">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {isAdding ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                    <span>{isAdding ? 'Added to Bag' : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isSaved
                        ? 'border-[#8E3E53] bg-[#8E3E53] text-white'
                        : 'border-[#E0D7CE] bg-white text-[#524A45] hover:text-[#8E3E53]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 bg-[#EFE9E2] hover:bg-[#E5DACF] text-[#211D1B] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Buy Now (Instant COD Checkout)</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#736862] pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8E3E53]" />
                    100% Authentic Guaranteed
                  </span>
                  <button
                    onClick={handleViewFullDetails}
                    className="text-[#8E3E53] hover:underline font-semibold flex items-center gap-0.5"
                  >
                    <span>Full Product Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
