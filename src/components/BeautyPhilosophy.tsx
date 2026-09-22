import React from 'react';
import { Sparkles, HeartHandshake, ShoppingBag, ShieldCheck } from 'lucide-react';

export const BeautyPhilosophy: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Carefully Selected',
      description: 'Every formula is chosen with pristine quality, skin compatibility, and genuine usability in mind.',
    },
    {
      icon: ShieldCheck,
      title: 'Everyday Essentials',
      description: 'Beauty essentials designed to fit effortlessly into simple morning and evening rituals.',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Shopping',
      description: 'A smooth online shopping experience from quick discovery to doorstep Cash on Delivery nationwide.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer First',
      description: 'Dedicated beauty advice and personal order assistance via WhatsApp whenever you need us.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F4EDE6] border-y border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans">
            Our Brand Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
            BEAUTY MADE SIMPLE
          </h2>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            We believe premium beauty should feel effortless, skin-kind, and accessible without unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-7 rounded-2xl border border-[#E5DACF] shadow-2xs hover:shadow-md hover:border-[#D4C8BD] transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F0EBE5] text-[#8E3E53] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#8E3E53] group-hover:text-[#FAF8F5] transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#211D1B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#736862] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
