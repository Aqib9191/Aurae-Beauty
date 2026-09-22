import React from 'react';
import { RotateCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/business';
import { useShop } from '../context/ShopContext';

export const ReturnsPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-bold block mb-2">
            Confidence Guarantee
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            Returns &amp; Exchange Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Hassle-free 7-day guarantee for damaged, leaked, or incorrect deliveries.
          </p>
        </div>

        <div className="bg-[#FFFFFF] p-6 sm:p-10 rounded-3xl border border-[#E8E1D9] shadow-xs space-y-6 text-xs sm:text-sm text-[#524A45] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#8E3E53]" />
              <span>7-Day Replacement Guarantee</span>
            </h2>
            <p>
              Your satisfaction and skin safety are our absolute priorities. If you receive an item that arrived defective, leaked during transit, or is the incorrect shade/product, we will issue an immediate replacement at zero cost to you within 7 days of delivery.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#F0EBE5]">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8E3E53]" />
              <span>Cosmetic Hygiene Guidelines</span>
            </h2>
            <p>
              Due to strict health and safety standards for personal cosmetics and skincare, products that have been unsealed, opened, or used cannot be returned for a change-of-mind. All sealed items in their original, undamaged secondary packaging remain eligible for exchange.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#F0EBE5]">
            <h2 className="font-serif text-xl font-bold text-[#211D1B]">
              How to Initiate an Exchange
            </h2>
            <ol className="space-y-2 list-decimal pl-5">
              <li>Take a clear photograph of the parcel and the affected product.</li>
              <li>Send your Order Number and photo to our WhatsApp Concierge.</li>
              <li>Our support team will verify the details within 2 to 4 hours.</li>
              <li>A replacement item will be booked for immediate courier dispatch.</li>
            </ol>
          </section>

          <div className="pt-6 border-t border-[#F0EBE5]">
            <a
              href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I need assistance with an exchange.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#1fa851] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Initiate Exchange on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
