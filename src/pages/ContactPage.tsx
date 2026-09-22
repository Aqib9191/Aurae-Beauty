import React, { useState } from 'react';
import { businessConfig, getWhatsAppUrl } from '../config/business';
import { useShop } from '../context/ShopContext';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Sparkles 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Product Consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setSubmitted(true);
    showToast('Inquiry Received', 'Thank you! An AURAÉ beauty specialist will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#8E3E53] font-bold block mb-2">
            Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B]">
            We'd Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-[#736862] mt-2 leading-relaxed">
            Need advice choosing a shade or have questions regarding your order? Our beauty specialists are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Highlight Box */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E8E1D9] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F2FAF4] text-[#25D366] flex items-center justify-center border border-[#BDE5C8]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#211D1B]">WhatsApp Concierge</h3>
                  <span className="text-[10px] text-[#2E7D32] font-semibold">Fastest Response (Instant)</span>
                </div>
              </div>
              <p className="text-xs text-[#615752] leading-relaxed mb-4">
                Chat directly with our Lahore beauty specialists for custom skincare routines, shade swatches, and order tracking.
              </p>
              <a
                href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I have an inquiry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1fa851] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({businessConfig.phone})</span>
              </a>
            </div>

            {/* Other contact info */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E8E1D9] shadow-xs space-y-4 text-xs text-[#524A45]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#8E3E53] shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-[#211D1B] block">Phone Inquiries</span>
                  <span>{businessConfig.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8E3E53] shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-[#211D1B] block">Email Support</span>
                  <span>{businessConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8E3E53] shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-[#211D1B] block">Boutique Office</span>
                  <span>{businessConfig.address}, {businessConfig.city}, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8E3E53] shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-[#211D1B] block">Business Hours</span>
                  <span>{businessConfig.businessHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E8E1D9] shadow-xs">
            <h2 className="font-serif text-xl font-bold text-[#211D1B] mb-2">
              Send an Online Inquiry
            </h2>
            <p className="text-xs text-[#736862] mb-6">
              Fill out this form and we'll reply within 24 hours to your email or WhatsApp number.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#F2FAF4] border border-[#BDE5C8] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#2E7D32] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#211D1B]">Message Sent!</h3>
                <p className="text-xs text-[#524A45]">
                  Thank you for reaching out. We have logged your inquiry and our beauty advisory team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-[#8E3E53] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sana Malik"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="0300 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="sana@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    >
                      <option value="Product Consultation">Product Consultation</option>
                      <option value="Order Tracking">Order Tracking</option>
                      <option value="Cash on Delivery Question">Cash on Delivery Question</option>
                      <option value="Wholesale / Partnerships">Wholesale / Partnerships</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help your beauty routine today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
