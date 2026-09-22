export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Makeup' | 'Lips' | 'Eyes' | 'Hair Care' | 'Body Care';
  subcategory: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock: number;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  image: string;
  gallery: string[];
  skinType?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    price: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'Order via WhatsApp';
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  author: string;
  city?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
}
