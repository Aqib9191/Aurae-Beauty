import React from 'react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../config/business';
import { 
  CheckCircle2, 
  Truck, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId?: string;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { orders, navigateTo } = useShop();

  // Find either the requested order or the latest placed order
  const currentOrder = orderId
    ? orders.find((o) => o.id === orderId)
    : orders[0];

  if (!currentOrder) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
        <h2 className="font-serif text-2xl font-bold text-[#211D1B]">No Order Found</h2>
        <p className="text-xs text-[#736862] mt-2">
          It looks like no order record was located.
        </p>
        <button
          onClick={() => navigateTo('/')}
          className="mt-4 px-6 py-2.5 bg-[#211D1B] text-white text-xs font-semibold rounded-xl"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleWhatsAppStatus = () => {
    const msg = `Hello AURAÉ BEAUTY, I placed an order with Order ID ${currentOrder.orderNumber} for Rs. ${currentOrder.total.toLocaleString()} (Cash on Delivery). Please confirm tracking updates.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Celebration Header Card */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 sm:p-10 shadow-xs text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#F2FAF4] text-[#2E7D32] flex items-center justify-center mx-auto mb-4 border border-[#BDE5C8]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase tracking-widest font-bold text-[#8E3E53]">
            Thank You For Your Order
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] mt-1">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-md mx-auto leading-relaxed">
            Your beauty order <strong className="text-[#211D1B]">{currentOrder.orderNumber}</strong> has been received and is being prepared with utmost care.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-[#FAF8F5] px-4 py-2.5 rounded-2xl border border-[#E8E1D9] text-xs">
            <span className="text-[#736862]">Order ID: <strong className="text-[#211D1B] font-mono">{currentOrder.orderNumber}</strong></span>
            <span className="text-[#D8CCC4]">•</span>
            <span className="text-[#736862]">Payment: <strong className="text-[#8E3E53]">Cash on Delivery (COD)</strong></span>
            <span className="text-[#D8CCC4]">•</span>
            <span className="text-[#2E7D32] font-semibold">Ready to Dispatch</span>
          </div>
        </div>

        {/* Delivery & Timeline Details */}
        <div className="mt-6 bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F6EFE9] border border-[#E8E1D9]">
            <Truck className="w-6 h-6 text-[#8E3E53] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#211D1B] block">
                Estimated Doorstep Delivery: 2–4 Business Days
              </span>
              <span className="text-[#736862]">
                Our courier will call or WhatsApp you before arrival to verify cash collection.
              </span>
            </div>
          </div>

          {/* Customer Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8E3E53]" />
                <span>Delivery Address</span>
              </h3>
              <div className="text-xs text-[#524A45] space-y-1">
                <p className="font-bold text-[#211D1B]">{currentOrder.customerName}</p>
                <p>{currentOrder.deliveryAddress}</p>
                <p>{currentOrder.city} {currentOrder.postalCode ? `(${currentOrder.postalCode})` : ''}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#8E3E53]" />
                <span>Contact Details</span>
              </h3>
              <div className="text-xs text-[#524A45] space-y-1">
                <p>Phone: <strong className="text-[#211D1B]">{currentOrder.phone}</strong></p>
                {currentOrder.email && <p>Email: {currentOrder.email}</p>}
                <p>Date: {new Date(currentOrder.createdAt).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
          </div>

          {/* Items Breakdown */}
          <div className="pt-6 border-t border-[#F0EBE5]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#211D1B] mb-3 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#8E3E53]" />
              <span>Purchased Essentials ({currentOrder.items.length})</span>
            </h3>

            <div className="space-y-3">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-[#FAF8F5] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-xl bg-[#FAF8F5] overflow-hidden border border-[#E8E1D9] shrink-0">
                      <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold text-[#211D1B]">
                        {item.productName}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[10px] text-[#736862]">Shade: {item.selectedColor}</p>
                      )}
                      <p className="text-[10px] text-[#8C7E77]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-serif text-xs font-bold text-[#211D1B]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-[#F0EBE5] space-y-1.5 text-xs text-[#524A45]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {currentOrder.subtotal.toLocaleString()}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-[#8E3E53]">
                  <span>Discount</span>
                  <span>- Rs. {currentOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Delivery</span>
                <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${currentOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8E1D9] text-base font-serif font-bold text-[#211D1B]">
                <span>Total Due on Delivery</span>
                <span className="text-lg text-[#8E3E53]">Rs. {currentOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsAppStatus}
              className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#1fa851] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track Order via WhatsApp</span>
            </button>

            <button
              onClick={() => navigateTo('/shop')}
              className="flex-1 py-3 px-4 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
