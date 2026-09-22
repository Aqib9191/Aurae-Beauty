import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubscribed(true);
    showToast('Subscribed!', 'Welcome to the AURAÉ circle! Use promo code GLOW10 for 10% off your first order.');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#E8E1D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-14 border border-[#E5DACF] shadow-sm relative overflow-hidden">
          {/* Subtle floral/petal ambient background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBD8CE]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E3E53]/10 text-[#8E3E53] text-[11px] font-semibold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Exclusive Beauty Circle</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
              ENJOY 10% OFF YOUR FIRST ORDER
            </h2>

            <p className="text-xs sm:text-sm text-[#736862] leading-relaxed">
              Subscribe for VIP product previews, limited-edition beauty drops, and bespoke skincare guidance. No spam, only intention.
            </p>

            {isSubscribed ? (
              <div className="pt-4 p-4 rounded-2xl bg-[#F2FAF4] border border-[#BDE5C8] text-[#1B7232] text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're subscribed! Use coupon code <strong className="font-mono bg-white px-2 py-0.5 rounded border border-[#BDE5C8]">GLOW10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#A89F91] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-[#211D1B] placeholder-[#A89F91] focus:outline-none focus:border-[#8E3E53]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0"
                >
                  <span>JOIN THE EDIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#A89F91] pt-1">
              By subscribing you agree to our Privacy Policy. You can opt out anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
