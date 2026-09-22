import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Review, ContactMessage, Customer, OrderStatus } from '../types';
import { initialProducts } from '../data/products';
import { initialReviews } from '../data/reviews';
import { initialOrders, initialMessages, initialCustomers } from '../data/initialOrders';
import { businessConfig } from '../config/business';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Navigation
  activePath: string;
  navigateTo: (path: string, scrollToTop?: boolean) => void;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  freeDeliveryRemaining: number;
  isFreeDelivery: boolean;
  deliveryFee: number;
  appliedCoupon: string | null;
  couponCode?: string | null;
  discountAmount: number;
  cartTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  recordRecentlyViewed: (product: Product) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  createOrder: (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    city: string;
    postalCode?: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Reviews
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Messages
  messages: ContactMessage[];
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageAsRead: (id: string) => void;

  // Customers (for admin)
  customers: Customer[];

  // UI Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toasts: Toast[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Helper function to extract normalized relative route
const getNormalizedPath = (): string => {
  if (typeof window === 'undefined') return '/';

  // Support spa-github-pages redirect parameter if present (?/path)
  const search = window.location.search;
  if (search && search.startsWith('?/')) {
    const rawQueryPath = search.slice(1).split('&')[0];
    return rawQueryPath.startsWith('/') ? rawQueryPath : '/' + rawQueryPath;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  let pathname = window.location.pathname || '/';

  if (cleanBase && pathname.startsWith(cleanBase)) {
    pathname = pathname.slice(cleanBase.length);
  }
  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }
  return pathname || '/';
};

// Helper function to construct full URL respecting Vite base path
const toAppUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return cleanBase ? `${cleanBase}${cleanPath}` : cleanPath;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activePath, setActivePath] = useState<string>(() => {
    return getNormalizedPath();
  });

  const navigateTo = (path: string, scrollToTop = true) => {
    const normalized = path.startsWith('/') ? path : '/' + path;
    setActivePath(normalized);
    if (typeof window !== 'undefined') {
      const fullUrl = toAppUrl(normalized);
      window.history.pushState({}, '', fullUrl);
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Products state (localStorage fallback to initialProducts)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed saving cart to localStorage', e);
    }
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_recent', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error('Failed saving recently viewed to localStorage', e);
    }
  }, [recentlyViewed]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed saving reviews to localStorage', e);
    }
  }, [reviews]);

  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_messages');
      return saved ? JSON.parse(saved) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumera_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed saving messages to localStorage', e);
    }
  }, [messages]);

  // Customers state (calculated or persisted)
  const [customers] = useState<Customer[]>(() => {
    return initialCustomers;
  });

  // UI State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product management helpers
  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = 'lum-' + (products.length + 1).toString().padStart(2, '0');
    const newProduct: Product = { ...productData, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Added', `${newProduct.name} has been added to catalog.`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Product Updated', 'Product details saved successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Deleted', 'Product removed from catalog.', 'info');
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = p.stock > 0 ? 0 : 25;
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
    showToast('Reset Complete', 'Product catalog reset to factory defaults.');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    const shadeText = selectedColor ? ` (${selectedColor})` : '';
    showToast('Added to Cart', `${product.name}${shadeText} added to your beauty bag.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor)));
    showToast('Item Removed', 'Product removed from your shopping bag.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeDeliveryRemaining = Math.max(0, businessConfig.freeDeliveryThreshold - cartSubtotal);
  const isFreeDelivery = cartSubtotal >= businessConfig.freeDeliveryThreshold && cartSubtotal > 0;
  const deliveryFee = cartSubtotal === 0 ? 0 : isFreeDelivery ? 0 : businessConfig.standardDeliveryFee;

  let discountAmount = 0;
  if (appliedCoupon === 'GLOW10') {
    discountAmount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'AURAE15' || appliedCoupon === 'LUMERA15') {
    discountAmount = Math.round(cartSubtotal * 0.15);
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GLOW10') {
      setAppliedCoupon('GLOW10');
      showToast('Coupon Applied', '10% discount applied to your order!');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'AURAE15' || clean === 'LUMERA15') {
      setAppliedCoupon('AURAE15');
      showToast('Coupon Applied', '15% VIP discount applied to your order!');
      return { success: true, message: '15% VIP discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "GLOW10" or "AURAE15".' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Discount promo code removed.', 'info');
  };

  // Wishlist operations
  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast('Wishlist', `${product.name} removed from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast('Wishlist', `${product.name} saved to your wishlist!`);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const wishlistCount = wishlist.length;

  // Recently viewed
  const recordRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const orderId = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber: (orderData as any).orderNumber || orderId,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const createOrder = (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    city: string;
    postalCode?: string;
    notes?: string;
  }): Order => {
    const orderId = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    }));

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      postalCode: orderData.postalCode,
      orderNotes: orderData.notes,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      discount: discountAmount,
      couponCode: appliedCoupon || undefined,
      total: cartTotal,
      paymentMethod: 'Cash on Delivery',
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)));
    showToast('Order Status Updated', `Order ${orderId} marked as ${status}.`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((ord) => ord.id === orderId);
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Review Submitted', 'Thank you for sharing your experience!');
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showToast('Review Deleted', 'Review removed successfully.', 'info');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  // Messages
  const sendMessage = (msgData: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: 'Just now',
      read: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
    showToast('Message Sent', 'Thank you for reaching out! Our beauty concierge will reply shortly.');
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <ShopContext.Provider
      value={{
        activePath,
        navigateTo,
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        resetProductsToDefault,
        cart,
        cartCount,
        cartSubtotal,
        freeDeliveryRemaining,
        isFreeDelivery,
        deliveryFee,
        appliedCoupon,
        couponCode: appliedCoupon,
        discountAmount,
        cartTotal,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        wishlistCount,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        recentlyViewed,
        recordRecentlyViewed,
        orders,
        placeOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        reviews,
        addReview,
        deleteReview,
        getProductReviews,
        messages,
        sendMessage,
        markMessageAsRead,
        customers,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
