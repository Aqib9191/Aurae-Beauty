import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { businessConfig, getWhatsAppUrl } from '../config/business';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  SlidersHorizontal,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePath, 
    navigateTo, 
    cartCount, 
    wishlistCount, 
    setIsCartDrawerOpen, 
    setIsSearchModalOpen,
    cartSubtotal 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  // Rotate announcement messages subtly
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % businessConfig.announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Sticky header scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Skincare', path: '/skincare' },
    { label: 'Makeup', path: '/makeup' },
    { label: 'Hair Care', path: '/hair-care' },
    { label: 'Body Care', path: '/body-care' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Promotional Bar */}
      <aside aria-label="Store announcement" className="bg-[#211D1B] text-[#F3EFEA] text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-[#D8CCC4]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Authentic Premium Beauty
            </span>
            <span className="text-[#524A45]">•</span>
            <span>Cash on Delivery Available</span>
          </div>

          <div className="flex-1 sm:flex-none text-center font-medium tracking-wide">
            <span className="inline-block transition-all duration-300">
              {businessConfig.announcements[announcementIndex]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[#D8CCC4]">
            <a
              href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I would like to inquire about products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#FAF8F5] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              WhatsApp Support
            </a>
            <span className="text-[#524A45]">•</span>
            <button
              onClick={() => navigateTo('/admin')}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#FAF8F5]/95 backdrop-blur-md border-b ${
          isScrolled ? 'border-[#E8E1D9] shadow-sm py-3' : 'border-[#F0EBE5] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#211D1B] hover:text-[#8E3E53] transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 ml-1 text-[#211D1B] hover:text-[#8E3E53] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo & Monogram */}
            <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
              <button
                onClick={() => navigateTo('/')}
                className="group text-left flex items-center gap-2.5 focus:outline-none"
              >
                {/* Custom Elegant Monogram */}
                <div className="w-8 h-8 rounded-full bg-[#211D1B] text-[#FAF8F5] flex items-center justify-center font-serif text-lg tracking-wider border border-[#E5DACF] shadow-xs group-hover:bg-[#8E3E53] transition-colors">
                  <span>L</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#211D1B] group-hover:text-[#8E3E53] transition-colors uppercase block">
                    {businessConfig.logoText}
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-[#8C7E77] uppercase block font-sans font-medium -mt-1">
                    BEAUTY
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = activePath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`text-xs font-medium tracking-[0.08em] uppercase transition-colors relative py-1 focus:outline-none ${
                      isActive
                        ? 'text-[#211D1B] font-semibold'
                        : 'text-[#615752] hover:text-[#211D1B]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8E3E53] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Desktop Search */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8E1D9] bg-[#FFFFFF]/80 text-[#736862] hover:text-[#211D1B] hover:border-[#D8CCC4] transition-all text-xs focus:outline-none"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="tracking-wide text-[11px]">Search beauty...</span>
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="p-2 text-[#4A423D] hover:text-[#211D1B] transition-colors rounded-full hover:bg-[#F3EFEA] focus:outline-none"
                  aria-label="Account & Settings"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {accountMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setAccountMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-52 bg-[#FFFFFF] rounded-xl shadow-xl border border-[#E8E1D9] py-2 z-40 text-xs text-[#3D3632]">
                      <div className="px-4 py-2 border-b border-[#F0EBE5]">
                        <p className="font-medium text-[#211D1B]">{businessConfig.businessName}</p>
                        <p className="text-[11px] text-[#8C7E77]">Customer &amp; Admin Concierge</p>
                      </div>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigateTo('/shop');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] transition-colors"
                      >
                        Browse All Products
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigateTo('/wishlist');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] transition-colors flex items-center justify-between"
                      >
                        <span>My Saved Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="bg-[#8E3E53] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigateTo('/admin');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] transition-colors text-[#8E3E53] font-medium flex items-center gap-1.5"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Admin Dashboard UI
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('/wishlist')}
                className="p-2 text-[#4A423D] hover:text-[#8E3E53] transition-colors relative rounded-full hover:bg-[#F3EFEA] focus:outline-none"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#8E3E53] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-[#211D1B] bg-[#EFE9E2] hover:bg-[#E5DACF] transition-all rounded-full focus:outline-none"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#211D1B]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#8E3E53] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:inline text-xs font-semibold text-[#211D1B]">
                  {cartSubtotal > 0 ? `Rs. ${cartSubtotal.toLocaleString()}` : 'Bag'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#211D1B]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl z-10 border-r border-[#E8E1D9] overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E8E1D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#211D1B] text-[#FAF8F5] flex items-center justify-center font-serif text-sm">
                  L
                </div>
                <div>
                  <span className="font-serif font-bold text-lg tracking-widest text-[#211D1B]">
                    {businessConfig.logoText}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#736862] hover:text-[#211D1B]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input */}
            <div className="p-4 border-b border-[#E8E1D9]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-[#FFFFFF] border border-[#E0D7CE] rounded-xl text-xs text-[#736862] shadow-xs"
              >
                <Search className="w-4 h-4 text-[#A89F91]" />
                <span>Search products, shades &amp; ingredients...</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 px-4 py-3 divide-y divide-[#F0EBE5]">
              <div className="py-2 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigateTo(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-colors text-left ${
                      activePath === link.path
                        ? 'bg-[#EFE9E2] text-[#211D1B] font-semibold'
                        : 'text-[#524A45] hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#A89F91]" />
                  </button>
                ))}
              </div>

              {/* Admin & Support Links */}
              <div className="py-3 space-y-1">
                <button
                  onClick={() => {
                    navigateTo('/admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-[#8E3E53] font-medium hover:bg-[#F3EFEA] text-left"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>
                <a
                  href={getWhatsAppUrl('Hello AURAÉ BEAUTY, I would like to inquire about products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm text-[#1B7232] font-medium hover:bg-[#F3EFEA]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="p-4 bg-[#F5EFE9] border-t border-[#E8E1D9] text-xs text-[#736862] space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#211D1B]" />
                <span>{businessConfig.phone}</span>
              </div>
              <p className="text-[11px] text-[#8C7E77]">Cash on Delivery Available Nationwide</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
