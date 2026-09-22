import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { formatOrderWhatsAppMessage, getWhatsAppUrl } from '../config/business';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  MessageCircle, 
  Share2, 
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { products, addToCart, toggleWishlist, isInWishlist, navigateTo, showToast, reviews, addReview } = useShop();

  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients' | 'shipping'>('benefits');

  // Review submission state for this product
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    city: '',
    rating: 5,
    title: '',
    comment: '',
  });

  const isSaved = isInWishlist(product.id);

  // Filter reviews matching this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products from same category or complementary
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.bestSeller))
    .slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedColor);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigateTo('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const msg = formatOrderWhatsAppMessage({
      customerName: 'Direct Customer',
      phone: 'To be confirmed',
      deliveryAddress: 'To be confirmed on WhatsApp',
      city: 'Pakistan',
      items: [
        {
          productName: product.name,
          quantity: quantity,
          price: product.price,
          selectedColor: selectedColor,
        },
      ],
      subtotal: product.price * quantity,
      deliveryFee: product.price * quantity >= 5000 ? 0 : 250,
      total: (product.price * quantity) + (product.price * quantity >= 5000 ? 0 : 250),
    });
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment || !newReview.title) return;

    addReview({
      productId: product.id,
      productName: product.name,
      author: newReview.author,
      city: newReview.city || 'Verified Buyer',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    });

    setIsWritingReview(false);
    setNewReview({ author: '', city: '', rating: 5, title: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#736862] mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('/')} className="hover:text-[#211D1B]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A89F91]" />
          <button onClick={() => navigateTo('/shop')} className="hover:text-[#211D1B]">Shop</button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A89F91]" />
          <button onClick={() => navigateTo(`/${product.category.toLowerCase().replace(' ', '-')}`)} className="hover:text-[#211D1B]">
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A89F91]" />
          <span className="text-[#211D1B] font-semibold truncate">{product.name}</span>
        </nav>

        {/* Product Showcase (Two Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FFFFFF] border border-[#E8E1D9] shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount && (
                  <span className="bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {product.discount}
                  </span>
                )}
                {product.bestSeller && (
                  <span className="bg-[#211D1B] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                  isSaved
                    ? 'bg-[#8E3E53] text-[#FAF8F5] shadow-md scale-105'
                    : 'bg-[#FAF8F5]/80 text-[#3D3632] hover:bg-[#FAF8F5] hover:text-[#8E3E53]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      selectedImage === img
                        ? 'border-[#8E3E53] scale-105 shadow-sm'
                        : 'border-[#E8E1D9] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Options & Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#736862] mb-2">
                <span className="text-[#8E3E53] font-bold uppercase tracking-widest text-[11px]">
                  {product.category} • {product.subcategory}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#211D1B]">{product.rating}</span>
                  <span className="text-[#8C7E77]">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#211D1B] leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-3xl font-bold text-[#211D1B]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#A89F91] line-through">
                    Rs. {product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                  Cash on Delivery Available
                </span>
              </div>

              {/* Short Lead */}
              <p className="text-xs sm:text-sm text-[#5C524C] mt-4 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Shade Selector if product has colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6 pt-5 border-t border-[#E8E1D9]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-[#211D1B]">
                      Select Shade:{' '}
                      <strong className="text-[#8E3E53]">
                        {selectedColor || product.colors[0].name}
                      </strong>
                    </span>
                    <span className="text-[11px] text-[#8C7E77]">
                      {product.colors.length} shades available
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => {
                      const isCurrent = (selectedColor || product.colors![0].name) === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                            isCurrent
                              ? 'border-[#8E3E53] bg-[#F5EFEA] font-semibold text-[#211D1B] ring-1 ring-[#8E3E53]'
                              : 'border-[#E0D7CE] bg-[#FFFFFF] text-[#615752] hover:border-[#8E3E53]'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-2xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Stock */}
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <span className="text-xs font-semibold text-[#211D1B] block mb-2">Quantity</span>
                  <div className="flex items-center border border-[#E0D7CE] rounded-xl bg-[#FFFFFF] shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2 text-xs font-bold text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] rounded-l-xl transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold text-[#211D1B]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2 text-xs font-bold text-[#524A45] hover:text-[#211D1B] hover:bg-[#F5EFEA] rounded-r-xl transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#211D1B] block mb-2">Availability</span>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#2E7D32]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
                    <span>In Stock • Dispatches in 24h</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md ${
                      isAdding
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5]'
                    }`}
                  >
                    {isAdding ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{isAdding ? 'Added to Bag' : 'Add to Shopping Bag'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest bg-[#8E3E53] hover:bg-[#722F41] text-[#FAF8F5] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Instant COD Checkout</span>
                  </button>
                </div>

                {/* WhatsApp Quick Order button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 bg-[#F2FAF4] hover:bg-[#E2F5E7] text-[#1B7232] border border-[#BDE5C8] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order via WhatsApp (Quick Cash on Delivery Confirmation)</span>
                </button>
              </div>

              {/* Service Badges */}
              <div className="mt-8 pt-6 border-t border-[#E8E1D9] grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#8E3E53] mb-1" />
                  <span className="text-xs font-semibold text-[#211D1B]">Nationwide COD</span>
                  <span className="text-[10px] text-[#736862]">2–4 business days</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-[#8E3E53] mb-1" />
                  <span className="text-xs font-semibold text-[#211D1B]">100% Authentic</span>
                  <span className="text-[10px] text-[#736862]">Direct from brand</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#8E3E53] mb-1" />
                  <span className="text-xs font-semibold text-[#211D1B]">Hassle-Free</span>
                  <span className="text-[10px] text-[#736862]">Easy 7-day exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Information (Benefits, How to Use, Ingredients, Shipping) */}
        <div className="mt-16 bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 sm:p-10 shadow-2xs">
          <div className="flex border-b border-[#E8E1D9] gap-4 sm:gap-8 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'benefits', label: 'Key Benefits' },
              { id: 'howToUse', label: 'How to Use' },
              { id: 'ingredients', label: 'Formulation & Actives' },
              { id: 'shipping', label: 'Delivery & COD' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-serif text-base sm:text-lg font-bold transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#8E3E53] border-b-2 border-[#8E3E53]'
                    : 'text-[#8C7E77] hover:text-[#211D1B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-6 font-sans text-xs sm:text-sm text-[#5C524C] leading-relaxed">
            {activeTab === 'benefits' && (
              <div className="space-y-3">
                <p className="font-serif text-lg font-bold text-[#211D1B] mb-3">
                  Why you'll love this formula
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D9]">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#211D1B]">{benefit}</span>
                    </div>
                  ))}
                </div>
                {product.skinType && (
                  <p className="text-xs text-[#736862] pt-2">
                    <strong>Recommended Skin Type:</strong> {product.skinType}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4 max-w-2xl">
                <p className="font-serif text-lg font-bold text-[#211D1B]">
                  Recommended Application Ritual
                </p>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D9] text-xs leading-relaxed text-[#211D1B]">
                  {product.howToUse}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8E3E53] font-medium">
                  <Info className="w-4 h-4" />
                  <span>Pro-tip: Patch test on the inner forearm 24 hours before first facial application.</span>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3 max-w-3xl">
                <p className="font-serif text-lg font-bold text-[#211D1B]">
                  Clean, Conscious Ingredients
                </p>
                <p className="text-xs text-[#524A45] leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D9]">
                  {product.ingredients}
                </p>
                <p className="text-[11px] text-[#8C7E77]">
                  Formulated without parabens, sulfates, phthalates, synthetic mineral oil, or animal testing.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 max-w-2xl text-xs">
                <p className="font-serif text-lg font-bold text-[#211D1B]">
                  Shipping &amp; Cash on Delivery Information
                </p>
                <ul className="space-y-2 list-disc pl-4 text-[#524A45]">
                  <li><strong>Cash on Delivery (COD):</strong> Available across all cities, towns, and regions in Pakistan. Pay courier cash upon delivery.</li>
                  <li><strong>Delivery Time:</strong> 2 to 4 business days nationwide (Karachi, Lahore, Islamabad 24-48h).</li>
                  <li><strong>Free Delivery:</strong> All orders above Rs. 5,000 qualify for complimentary courier shipping.</li>
                  <li><strong>Customer Support:</strong> Receive real-time WhatsApp updates and courier tracking notifications.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews for this Product */}
        <div className="mt-16 bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E1D9] gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#211D1B]">
                Customer Reviews ({productReviews.length})
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#211D1B]">{product.rating} out of 5 stars</span>
              </div>
            </div>

            <button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="px-5 py-2.5 bg-[#211D1B] hover:bg-[#8E3E53] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs"
            >
              {isWritingReview ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Inline Write Review Form */}
          {isWritingReview && (
            <form onSubmit={handleReviewSubmit} className="mt-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5DACF] space-y-4 max-w-xl">
              <h4 className="font-serif text-lg font-bold text-[#211D1B]">Write Your Feedback</h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maha S."
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full bg-white border border-[#E0D7CE] rounded-xl px-3 py-2 text-xs text-[#211D1B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#211D1B] mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Islamabad"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full bg-white border border-[#E0D7CE] rounded-xl px-3 py-2 text-xs text-[#211D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#211D1B] mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incredible texture and fast delivery"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full bg-white border border-[#E0D7CE] rounded-xl px-3 py-2 text-xs text-[#211D1B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#211D1B] mb-1">Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience with this product..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-white border border-[#E0D7CE] rounded-xl px-3 py-2 text-xs text-[#211D1B]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#8E3E53] hover:bg-[#722F41] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                Post Review
              </button>
            </form>
          )}

          {/* List of reviews */}
          <div className="mt-6 space-y-4 divide-y divide-[#F0EBE5]">
            {productReviews.length === 0 ? (
              <p className="text-xs text-[#736862] py-4">
                Be the first to share your experience with {product.name}!
              </p>
            ) : (
              productReviews.map((r) => (
                <div key={r.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#211D1B]">{r.author}</span>
                      {r.verified && (
                        <span className="text-[10px] bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full font-medium">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#A89F91]">{r.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[#D4AF37] mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-[#E0D7CE]'}`}
                      />
                    ))}
                  </div>

                  <h5 className="font-serif text-sm font-bold text-[#211D1B] mb-1">
                    "{r.title}"
                  </h5>
                  <p className="text-xs text-[#524A45] leading-relaxed font-sans">
                    {r.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* You May Also Love Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[11px] uppercase font-semibold tracking-widest text-[#8E3E53] block mb-1">
                Complementary Ritual
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211D1B]">
                YOU MAY ALSO LOVE
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
