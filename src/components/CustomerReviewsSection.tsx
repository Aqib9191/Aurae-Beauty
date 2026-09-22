import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const { reviews, addReview, products } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    city: '',
    productId: products[0]?.id || 'lum-01',
    rating: 5,
    title: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.comment || !formData.title) return;

    const matchedProduct = products.find((p) => p.id === formData.productId);

    addReview({
      productId: formData.productId,
      productName: matchedProduct ? matchedProduct.name : 'Hydrating Glow Serum',
      author: formData.author,
      city: formData.city || 'Pakistan',
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    });

    setIsModalOpen(false);
    setFormData({
      author: '',
      city: '',
      productId: products[0]?.id || 'lum-01',
      rating: 5,
      title: '',
      comment: '',
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-2 font-sans">
              Verified Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] tracking-tight">
              LOVED BY BEAUTY LOVERS
            </h2>
            <p className="text-xs sm:text-sm text-[#736862] mt-2 max-w-lg leading-relaxed">
              Real reviews from real skin journeys across Pakistan. Discover why customers trust AURAÉ for their daily routine.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#211D1B] border border-[#D8CCC4] hover:border-[#8E3E53] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-2xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#8E3E53]" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E8E1D9] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-current text-[#D4AF37]' : 'text-[#E0D7CE]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#A89F91]">{review.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="font-serif text-base font-bold text-[#211D1B] mb-2 leading-snug">
                  "{review.title}"
                </h3>

                {/* Comment */}
                <p className="text-xs text-[#524A45] leading-relaxed line-clamp-4 font-sans">
                  {review.comment}
                </p>
              </div>

              {/* Author & Product */}
              <div className="mt-5 pt-4 border-t border-[#F0EBE5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#E8E1D9]"
                    />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-[#211D1B] flex items-center gap-1">
                      <span>{review.author}</span>
                      {review.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle className="w-3 h-3 text-[#2E7D32]" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-[#8C7E77]">{review.city || 'Verified Buyer'}</p>
                  </div>
                </div>

                {review.productName && (
                  <span className="text-[10px] text-[#8E3E53] font-medium bg-[#F5EFEA] px-2 py-0.5 rounded-md truncate max-w-[110px]">
                    {review.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211D1B]/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DACF] relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#736862] hover:text-[#211D1B]"
                aria-label="Close review dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl font-bold text-[#211D1B]">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#736862] mt-1 mb-5">
                Your authentic feedback helps other beauty enthusiasts make confident choices.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                    Select Product
                  </label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      Your First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zara K."
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore, Karachi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-[#D8CCC4]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Loved the lightweight texture!"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">
                    Review Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about how the product felt, longevity, or your delivery experience..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl px-3.5 py-2.5 text-xs text-[#211D1B] focus:outline-none focus:border-[#8E3E53]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
