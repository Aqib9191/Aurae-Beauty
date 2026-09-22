import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, businessConfig } from '../config/business';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I need assistance with shade matching and orders.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1fa851] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2 group hover:scale-105 active:scale-95"
      aria-label="Order or Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide">
        WhatsApp Concierge
      </span>
    </a>
  );
};
