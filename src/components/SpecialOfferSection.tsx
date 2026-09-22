import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const SpecialOfferSection: React.FC = () => {
  const { navigateTo } = useShop();

  // Configurable countdown (3 days, 14 hours, 28 minutes, 40 seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 28,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 sm:py-18 bg-[#F5ECE4] border-y border-[#E5DACF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 shadow-sm border border-[#E5DACF] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E3E53]/10 text-[#8E3E53] text-xs font-semibold uppercase tracking-wider mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Promotional Event</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
              GLOW WEEK
            </h2>
            <p className="text-sm sm:text-base text-[#615752] mt-2 font-sans">
              Up to <strong>25% off</strong> selected beauty essentials. Enjoy complimentary shipping on orders over Rs. 5,000 and Cash on Delivery nationwide.
            </p>
          </div>

          {/* Countdown Blocks */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2.5 text-center">
              <div className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-2xl p-3 w-16 sm:w-18 shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B] block">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8C7E77] tracking-wider">
                  Days
                </span>
              </div>
              <span className="text-xl font-bold text-[#A89F91]">:</span>
              <div className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-2xl p-3 w-16 sm:w-18 shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B] block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8C7E77] tracking-wider">
                  Hours
                </span>
              </div>
              <span className="text-xl font-bold text-[#A89F91]">:</span>
              <div className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-2xl p-3 w-16 sm:w-18 shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B] block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8C7E77] tracking-wider">
                  Mins
                </span>
              </div>
              <span className="text-xl font-bold text-[#A89F91]">:</span>
              <div className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-2xl p-3 w-16 sm:w-18 shadow-2xs">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#8E3E53] block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#8C7E77] tracking-wider">
                  Secs
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigateTo('/shop')}
              className="px-7 py-3.5 bg-[#8E3E53] hover:bg-[#722F41] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2 group shrink-0"
            >
              <span>SHOP OFFERS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
