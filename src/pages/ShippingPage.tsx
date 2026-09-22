import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ShippingPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-bold block mb-2">
            Logistics &amp; Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            Shipping &amp; Delivery Information
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Fast, secure, and temperature-conscious cosmetics delivery to all cities across Pakistan.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#E8E1D9] shadow-xs space-y-8 text-xs sm:text-sm text-[#524A45] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#8E3E53]" />
              <span>Nationwide Cash on Delivery (COD)</span>
            </h2>
            <p>
              We proudly offer Cash on Delivery (COD) service for 100% of Pakistan’s postal codes. You can place your order online or via WhatsApp without paying anything in advance. Hand over the payment only when the courier delivers the sealed package directly to your hands.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#F0EBE5]">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#8E3E53]" />
              <span>Estimated Delivery Timelines</span>
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Lahore, Karachi, Islamabad &amp; Rawalpindi:</strong> 24 to 48 business hours.</li>
              <li><strong>Major Cities (Faisalabad, Multan, Sialkot, Peshawar, Quetta, Gujranwala):</strong> 2 to 3 business days.</li>
              <li><strong>Regional Towns &amp; Remote Areas:</strong> 3 to 5 business days.</li>
            </ul>
            <p className="text-xs text-[#736862]">
              * Orders placed before 3:00 PM (Monday to Saturday) are dispatched the exact same day.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#F0EBE5]">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8E3E53]" />
              <span>Shipping Charges &amp; Free Delivery</span>
            </h2>
            <p>
              We offer <strong>Free Courier Delivery</strong> on all orders totaling Rs. 5,000 or above. For orders below this threshold, a standard flat fee of <strong>Rs. 250</strong> is applied at checkout to cover insured courier handling.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3 bg-[#211D1B] hover:bg-[#8E3E53] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};
