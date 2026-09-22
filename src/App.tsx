import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPage } from './pages/ShippingPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { activePath, navigateTo } = useShop();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePath]);

  // Route Dispatcher
  const renderCurrentPage = () => {
    if (activePath.startsWith('/product/')) {
      const productId = activePath.replace('/product/', '');
      return <ProductDetailPage productId={productId} />;
    }

    if (activePath.startsWith('/order-confirmation/')) {
      const orderId = activePath.replace('/order-confirmation/', '');
      return <OrderConfirmationPage orderId={orderId} />;
    }

    if (activePath.startsWith('/category/')) {
      const catSlug = activePath.replace('/category/', '');
      const formattedCategory = catSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return <ShopPage initialCategory={formattedCategory} />;
    }

    switch (activePath) {
      case '/':
        return <HomePage />;
      case '/shop':
        return <ShopPage />;
      case '/skincare':
        return <ShopPage initialCategory="Skincare" />;
      case '/makeup':
        return <ShopPage initialCategory="Makeup" />;
      case '/lips':
        return <ShopPage initialCategory="Lips" />;
      case '/eyes':
        return <ShopPage initialCategory="Eyes" />;
      case '/hair-care':
        return <ShopPage initialCategory="Hair Care" />;
      case '/body-care':
        return <ShopPage initialCategory="Body Care" />;
      case '/new-arrivals':
        return <ShopPage isNewArrivalsOnly={true} />;
      case '/checkout':
        return <CheckoutPage />;
      case '/cart':
        return <CheckoutPage />;
      case '/order-confirmation':
        return <OrderConfirmationPage />;
      case '/wishlist':
        return <WishlistPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/faq':
        return <FAQPage />;
      case '/shipping':
        return <ShippingPage />;
      case '/returns':
        return <ReturnsPage />;
      case '/privacy':
      case '/terms':
        return <ReturnsPage />; // Comprehensive legal info
      case '/admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#211D1B] selection:bg-[#8E3E53] selection:text-[#FAF8F5]">
      {/* Sticky Header with Navigation, Search, Wishlist, Cart */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-in Shopping Bag Drawer */}
      <CartDrawer />

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Search Overlay */}
      <SearchModal />

      {/* Floating Notifications */}
      <ToastContainer />

      {/* Floating WhatsApp Concierge */}
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
