import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { businessConfig, formatOrderWhatsAppMessage, getWhatsAppUrl } from '../config/business';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  MessageCircle, 
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    cartTotal,
    createOrder,
    navigateTo,
    showToast,
  } = useShop();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  // Promo code input state
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const pakistanCities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Other Pakistan City / Town',
  ];

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EFE9E2] flex items-center justify-center text-[#8C7E77] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B]">
          Your Beauty Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-sm leading-relaxed">
          Please add products to your cart before proceeding to Cash on Delivery checkout.
        </p>
        <button
          onClick={() => navigateTo('/shop')}
          className="mt-6 px-7 py-3.5 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          Explore Beauty Essentials
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyCoupon(promoInput.trim());
    if (success) {
      setPromoInput('');
    }
  };

  const validateForm = () => {
    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setValidationError('Please enter a valid phone or WhatsApp number for delivery verification.');
      return false;
    }
    if (!address.trim() || address.trim().length < 8) {
      setValidationError('Please provide a complete delivery street address.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handlePlaceCODOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        deliveryAddress: address.trim(),
        city: city,
        postalCode: postalCode.trim() || undefined,
        notes: notes.trim() || undefined,
      });

      setIsSubmitting(false);
      showToast('Order Placed Successfully!', `Order ${order.orderNumber} confirmed with Cash on Delivery.`);
      navigateTo(`/order-confirmation/${order.id}`);
    }, 700);
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    const order = createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      deliveryAddress: address.trim(),
      city: city,
      postalCode: postalCode.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    const msg = formatOrderWhatsAppMessage({
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryAddress: address.trim(),
      city: city,
      items: order.items.map((it) => ({
        productName: it.productName,
        quantity: it.quantity,
        price: it.price,
        selectedColor: it.selectedColor,
      })),
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      total: cartTotal,
    });

    window.open(getWhatsAppUrl(msg), '_blank');
    navigateTo(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-semibold block mb-1">
            Safe &amp; Secure Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            Cash on Delivery Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-1.5 font-sans">
            Pay safely with cash when your luxury parcel arrives at your doorstep anywhere in Pakistan.
          </p>
        </div>

        {validationError && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Customer & Delivery Form */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 sm:p-8 shadow-xs">
            <form onSubmit={handlePlaceCODOrder} className="space-y-6">
              {/* Customer Contact */}
              <div>
                <h2 className="font-serif text-lg font-bold text-[#211D1B] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#211D1B] text-white text-xs flex items-center justify-center font-sans">1</span>
                  <span>Contact Information</span>
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Full Name <span className="text-[#8E3E53]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Tariq"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                        Phone / WhatsApp <span className="text-[#8E3E53]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                      />
                      <span className="text-[10px] text-[#8C7E77] mt-0.5 block">Used for courier delivery confirmation</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="fatima@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="pt-4 border-t border-[#F0EBE5]">
                <h2 className="font-serif text-lg font-bold text-[#211D1B] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#211D1B] text-white text-xs flex items-center justify-center font-sans">2</span>
                  <span>Delivery Address</span>
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Complete Street Address <span className="text-[#8E3E53]">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House / Apartment #, Street #, Sector / Phase, Landmark..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                        City <span className="text-[#8E3E53]">*</span>
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                      >
                        {pakistanCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 75500"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Order Notes / Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call before delivery, deliver after 2 PM..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="pt-4 border-t border-[#F0EBE5]">
                <h2 className="font-serif text-lg font-bold text-[#211D1B] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#211D1B] text-white text-xs flex items-center justify-center font-sans">3</span>
                  <span>Payment Method</span>
                </h2>

                <div className="p-4 rounded-2xl bg-[#F5EFEA] border-2 border-[#8E3E53] flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#8E3E53] text-[#FAF8F5] shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#211D1B]">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                        Zero Advance Fee
                      </span>
                    </div>
                    <p className="text-[11px] text-[#615752] mt-1 leading-relaxed">
                      Pay in full with cash when our courier partner brings your package to your doorstep. Inspect package authenticity upon arrival.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Confirming Your Order...' : `Place Cash on Delivery Order • Rs. ${cartTotal.toLocaleString()}`}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-6 bg-[#F2FAF4] hover:bg-[#E2F5E7] text-[#1B7232] border border-[#BDE5C8] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send Order via WhatsApp Instead</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 shadow-xs">
              <h2 className="font-serif text-lg font-bold text-[#211D1B] mb-4 pb-3 border-b border-[#F0EBE5] flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-medium text-[#736862]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </h2>

              {/* Items preview list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-xl bg-[#F5EFEA] overflow-hidden border border-[#E8E1D9] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-[#211D1B] truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[10px] text-[#736862]">Shade: {item.selectedColor}</p>
                      )}
                      <p className="text-[10px] text-[#8C7E77]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-serif text-xs font-bold text-[#211D1B]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="mt-6 pt-5 border-t border-[#F0EBE5]">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#8C7E77] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. GLOW10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-[#211D1B] uppercase font-mono placeholder:normal-case placeholder-[#A89F91] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponCode && (
                  <div className="mt-2.5 flex items-center justify-between p-2 rounded-lg bg-[#F2FAF4] border border-[#BDE5C8] text-[11px] text-[#1B7232]">
                    <span className="flex items-center gap-1 font-mono font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {couponCode} (-Rs. {discountAmount.toLocaleString()})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold hover:underline text-[#D9381E]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="mt-6 pt-5 border-t border-[#F0EBE5] space-y-2 text-xs text-[#524A45]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#211D1B]">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8E3E53] font-semibold">
                    <span>Discount Applied</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Shipping</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-[#2E7D32]">FREE (Nationwide)</strong>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[#E8E1D9] text-base font-serif font-bold text-[#211D1B]">
                  <span>Total Due (COD)</span>
                  <span className="text-lg text-[#8E3E53]">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D9] space-y-2 text-xs text-[#736862]">
              <div className="flex items-center gap-2 text-[#211D1B] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#8E3E53]" />
                <span>Our AURAÉ Promise</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All cosmetics are freshly prepared, 100% authentic, cruelty-free, and sealed with tamper-evident packaging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
