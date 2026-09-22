import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/business';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'When you place an order with Cash on Delivery, no payment is required upfront. We prepare and dispatch your parcel via courier. Once the delivery agent arrives at your door, you inspect the parcel seal and hand over the exact cash amount.',
    },
    {
      q: 'How long does delivery take across Pakistan?',
      a: 'Orders within major cities (Lahore, Karachi, Islamabad, Rawalpindi) typically arrive in 24 to 48 hours. Deliveries to other cities and regional towns usually take 2 to 4 business days. You will receive tracking notifications as soon as the courier scans your package.',
    },
    {
      q: 'Are your cosmetics 100% original and authentic?',
      a: 'Yes, absolutely. Every formulation sold at AURAÉ BEAUTY is formulated to pristine dermatological standards and is 100% genuine. We manufacture with cruelty-free, skin-compatible botanical actives and seal every carton.',
    },
    {
      q: 'Can I order directly on WhatsApp?',
      a: 'Yes! We offer a dedicated WhatsApp ordering channel. You can click any "Order via WhatsApp" button on our product pages or checkout, and our automated assistant will generate a formatted order message for immediate confirmation.',
    },
    {
      q: 'What is the minimum order for Free Shipping?',
      a: 'All orders with a subtotal of Rs. 5,000 or above automatically qualify for free shipping nationwide. For orders under Rs. 5,000, a flat courier fee of Rs. 250 applies.',
    },
    {
      q: 'What if I receive a damaged or incorrect item?',
      a: 'In the rare event of damage during transit or an incorrect shade delivery, notify us within 7 days via WhatsApp or email with a photograph. We will dispatch a complimentary replacement immediately with zero return courier costs to you.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-full bg-[#F5EFEA] text-[#8E3E53] flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Everything you need to know about our products, Cash on Delivery, and shipping procedures.
          </p>
        </div>

        <div className="space-y-3 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E8E1D9] shadow-xs">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-[#F0EBE5] last:border-0 pb-3 last:pb-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-3 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-base font-bold text-[#211D1B] group-hover:text-[#8E3E53] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C7E77] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#8E3E53]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pt-1 pb-3 text-xs sm:text-sm text-[#524A45] leading-relaxed font-sans animate-in fade-in-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F6EFE9] border border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base font-bold text-[#211D1B]">Have an unanswered question?</h3>
            <p className="text-xs text-[#736862] mt-0.5">Our beauty consultants are available on WhatsApp 6 days a week.</p>
          </div>
          <a
            href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I have a quick question.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1fa851] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};
