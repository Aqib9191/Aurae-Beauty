import React from 'react';
import { useShop } from '../context/ShopContext';
import { businessConfig, formatOrderWhatsAppMessage, getWhatsAppUrl } from '../config/business';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  Truck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    freeDeliveryRemaining,
    isFreeDelivery,
    deliveryFee,
    discountAmount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    navigateTo,
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const freeShippingPercentage = Math.min(
    100,
    Math.round((cartSubtotal / businessConfig.freeDeliveryThreshold) * 100)
  );

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('/checkout');
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const msg = formatOrderWhatsAppMessage({
      customerName: 'Customer',
      phone: 'To be confirmed',
      deliveryAddress: 'To be provided on WhatsApp',
      city: 'Pakistan',
      items: cart.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        selectedColor: item.selectedColor,
      })),
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
    });
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211D1B]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5DACF]">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#211D1B]" />
              <h2 className="font-serif text-xl font-bold text-[#211D1B]">Your Beauty Bag</h2>
              <span className="text-xs bg-[#EFE9E2] text-[#524A45] px-2 py-0.5 rounded-full font-medium">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#736862] hover:text-[#211D1B] rounded-full hover:bg-[#F5EFEA] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F6EFE9] px-5 py-3 border-b border-[#E8E1D9]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
              <div className="flex items-center gap-1.5 text-[#211D1B] font-medium">
                <Truck className="w-4 h-4 text-[#8E3E53]" />
                {isFreeDelivery ? (
                  <span className="text-[#2E7D32] font-semibold">
                    Congratulations! You unlocked FREE Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#8E3E53]">Rs. {freeDeliveryRemaining.toLocaleString()}</strong> more for FREE delivery
                  </span>
                )}
              </div>
              <span className="text-[#8C7E77] text-[11px] font-medium">{freeShippingPercentage}%</span>
            </div>
            <div className="w-full bg-[#E5DACF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8E3E53] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#F0EBE5]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE9E2] flex items-center justify-center text-[#8C7E77] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#211D1B]">Your bag is empty</h3>
                <p className="text-xs text-[#736862] mt-1.5 max-w-xs leading-relaxed font-sans">
                  Discover our bestsellers in skincare, velvet lipsticks, and nourishing botanical treatments.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('/shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedColor || 'default'}-${index}`} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo(`/product/${item.product.id}`);
                    }}
                    className="w-20 h-24 rounded-xl overflow-hidden bg-[#F0EBE5] shrink-0 cursor-pointer border border-[#E8E1D9]"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-[#8E3E53]">
                            {item.product.category}
                          </span>
                          <h4
                            onClick={() => {
                              setIsCartDrawerOpen(false);
                              navigateTo(`/product/${item.product.id}`);
                            }}
                            className="font-serif text-sm font-semibold text-[#211D1B] cursor-pointer hover:text-[#8E3E53] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          {item.selectedColor && (
                            <p className="text-[11px] text-[#736862] mt-0.5">
                              Shade: <span className="font-medium text-[#211D1B]">{item.selectedColor}</span>
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-[#A89F91] hover:text-[#D9381E] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5EFEA]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E0D7CE] rounded-lg bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="p-1.5 text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#211D1B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="p-1.5 text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-[#211D1B]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FFFFFF] border-t border-[#E8E1D9] space-y-3">
              <div className="space-y-1.5 text-xs text-[#524A45]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#211D1B]">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8E3E53]">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{deliveryFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0EBE5] text-sm">
                  <span className="font-serif font-bold text-[#211D1B]">Total (Cash on Delivery)</span>
                  <span className="font-serif font-bold text-base text-[#211D1B]">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-4 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 bg-[#F2FAF4] hover:bg-[#E2F5E7] text-[#1B7232] border border-[#BDE5C8] font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order Directly via WhatsApp</span>
                </button>

                <div className="text-center pt-1">
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="text-xs text-[#736862] hover:text-[#211D1B] underline underline-offset-4 font-sans"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
