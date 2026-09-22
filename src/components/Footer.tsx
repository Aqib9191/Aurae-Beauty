import React from 'react';
import { useShop } from '../context/ShopContext';
import { businessConfig, getWhatsAppUrl } from '../config/business';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  ArrowUp,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1816] text-[#D8CCC4] border-t border-[#2F2926] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#2F2926]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#1C1816] flex items-center justify-center font-serif text-lg font-bold">
                L
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-widest text-[#FAF8F5] uppercase block">
                  {businessConfig.logoText}
                </span>
                <span className="text-[9px] tracking-[0.3em] text-[#A89F91] uppercase block font-medium">
                  BEAUTY
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B5A89E] leading-relaxed max-w-sm font-sans">
              AURAÉ BEAUTY is dedicated to elevating your everyday self-care ritual. We craft weightless, high-performance skincare, velvety makeup, and botanical essentials with Cash on Delivery nationwide.
            </p>

            <div className="space-y-2 text-xs text-[#A89F91] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{businessConfig.address}, {businessConfig.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{businessConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{businessConfig.email}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={businessConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2421] hover:bg-[#8E3E53] text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2421] hover:bg-[#8E3E53] text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2421] hover:bg-[#8E3E53] text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
              <a
                href={businessConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2421] hover:bg-[#8E3E53] text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I have a question about an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#1da851] text-[#FFFFFF] flex items-center justify-center transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF8F5] tracking-widest uppercase">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A89E]">
              {['Skincare', 'Makeup', 'Lips', 'Eyes', 'Hair Care', 'Body Care', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigateTo(`/${item.toLowerCase().replace(' ', '-')}`)}
                    className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF8F5] tracking-widest uppercase">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A89E]">
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/faq')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/shipping')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/returns')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I would like to track my order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors flex items-center gap-1 text-[#4ADE80]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Track via WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FAF8F5] tracking-widest uppercase">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A89E]">
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/privacy')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/terms')}
                  className="hover:text-[#FAF8F5] hover:underline underline-offset-4 transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/admin')}
                  className="hover:text-[#D4AF37] transition-colors text-[#D4AF37] font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E77]">
          <p>© 2026 AURAÉ BEAUTY. All Rights Reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Cash on Delivery (COD)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              100% Authentic Beauty
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-[#2A2421] hover:bg-[#3E3530] text-[#FAF8F5] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
