import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';
import { 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  Search,
  Filter,
  PlusCircle,
  Eye,
  Star
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { orders, updateOrderStatus, products, reviews, createOrder, showToast, navigateTo } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'reviews'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === OrderStatus.PENDING).length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSimulateTestOrder = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const testNames = ['Amina Sheikh', 'Hira Khan', 'Zainab Noor', 'Bilal Ahmed', 'Maryam Tariq'];
    const testCities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan'];

    const newOrder = createOrder({
      customerName: testNames[Math.floor(Math.random() * testNames.length)],
      phone: `0300 ${Math.floor(1000000 + Math.random() * 9000000)}`,
      email: 'customer@demo.pk',
      deliveryAddress: 'House 42-B, Street 7, Defense Phase 5',
      city: testCities[Math.floor(Math.random() * testCities.length)],
      notes: 'Demo test order via admin dashboard',
    });

    showToast('Test COD Order Generated', `Created order ${newOrder.orderNumber} successfully!`);
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case OrderStatus.PROCESSING:
        return 'bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]';
      case OrderStatus.SHIPPED:
        return 'bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]';
      case OrderStatus.DELIVERED:
        return 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]';
      case OrderStatus.CANCELLED:
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E3E53]/10 text-[#8E3E53] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Store Operations Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#211D1B]">
              AURAÉ Business Manager
            </h1>
            <p className="text-xs text-[#736862] font-sans">
              Oversee live Cash on Delivery orders, manage inventory status, and review customer satisfaction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateTestOrder}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#8E3E53] border border-[#8E3E53] text-xs font-semibold rounded-xl shadow-2xs flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Generate Test Order</span>
            </button>

            <button
              onClick={() => navigateTo('/')}
              className="px-4 py-2.5 bg-[#211D1B] hover:bg-[#8E3E53] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              View Live Storefront
            </button>
          </div>
        </div>

        {/* Business Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E1D9] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider">Total Sales</span>
              <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#8E3E53]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-2xl font-bold text-[#211D1B]">
              Rs. {totalRevenue.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#2E7D32] block mt-1">Cash on Delivery</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E1D9] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider">Orders Placed</span>
              <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#211D1B]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-2xl font-bold text-[#211D1B]">
              {totalOrders}
            </span>
            <span className="text-[11px] text-[#736862] block mt-1">All-time lifetime</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E1D9] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider">Pending Orders</span>
              <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#D97706]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-2xl font-bold text-[#D97706]">
              {pendingOrders}
            </span>
            <span className="text-[11px] text-[#736862] block mt-1">Requires courier dispatch</span>
          </div>

          <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E1D9] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8C7E77] uppercase tracking-wider">Average Order</span>
              <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#2E7D32]">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <span className="font-serif text-2xl font-bold text-[#211D1B]">
              Rs. {averageOrderValue.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#736862] block mt-1">Per transaction</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E1D9] mb-6 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#8E3E53] text-[#8E3E53]'
                : 'border-transparent text-[#8C7E77] hover:text-[#211D1B]'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'inventory'
                ? 'border-[#8E3E53] text-[#8E3E53]'
                : 'border-transparent text-[#8C7E77] hover:text-[#211D1B]'
            }`}
          >
            Product Catalog &amp; Stock ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#8E3E53] text-[#8E3E53]'
                : 'border-transparent text-[#8C7E77] hover:text-[#211D1B]'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] shadow-xs overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C7E77] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search order #, customer, city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-[#211D1B]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[#736862] whitespace-nowrap">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl px-3 py-1.5 text-xs text-[#211D1B]"
                >
                  <option value="All">All Statuses</option>
                  <option value={OrderStatus.PENDING}>Pending</option>
                  <option value={OrderStatus.PROCESSING}>Processing</option>
                  <option value={OrderStatus.SHIPPED}>Shipped</option>
                  <option value={OrderStatus.DELIVERED}>Delivered</option>
                  <option value={OrderStatus.CANCELLED}>Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-[#736862] font-semibold uppercase tracking-wider border-b border-[#E8E1D9]">
                  <tr>
                    <th className="px-5 py-3">Order ID</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">City</th>
                    <th className="px-5 py-3">Items</th>
                    <th className="px-5 py-3">Total (COD)</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE5]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-[#8C7E77]">
                        No orders match this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FDFBF7] transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-[#211D1B]">
                          {order.orderNumber}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-bold text-[#211D1B]">{order.customerName}</p>
                          <p className="text-[11px] text-[#736862]">{order.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 text-[#524A45]">
                          {order.city}
                        </td>
                        <td className="px-5 py-3.5 text-[#524A45]">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </td>
                        <td className="px-5 py-3.5 font-serif font-bold text-[#211D1B]">
                          Rs. {order.total.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusBadgeColor(order.status)} focus:outline-none cursor-pointer`}
                          >
                            <option value={OrderStatus.PENDING}>Pending</option>
                            <option value={OrderStatus.PROCESSING}>Processing</option>
                            <option value={OrderStatus.SHIPPED}>Shipped</option>
                            <option value={OrderStatus.DELIVERED}>Delivered</option>
                            <option value={OrderStatus.CANCELLED}>Cancelled</option>
                          </select>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-[#8E3E53] hover:bg-[#F5EFEA] rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Catalog */}
        {activeTab === 'inventory' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D9] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-[#736862] font-semibold uppercase tracking-wider border-b border-[#E8E1D9]">
                  <tr>
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Stock Units</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EBE5]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FDFBF7]">
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-12 rounded-lg object-cover border border-[#E8E1D9]" />
                        <div>
                          <p className="font-serif font-bold text-[#211D1B]">{p.name}</p>
                          <p className="text-[10px] text-[#736862]">{p.subcategory}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#524A45]">{p.category}</td>
                      <td className="px-5 py-3.5 font-serif font-bold text-[#211D1B]">Rs. {p.price.toLocaleString()}</td>
                      <td className="px-5 py-3.5 font-bold">{p.stock} units</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.stock > 10 ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}>
                          {p.stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 flex items-center gap-1 text-[#D4AF37]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[#211D1B] font-bold">{p.rating}</span>
                        <span className="text-[#8C7E77]">({p.reviewCount})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8E1D9] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#211D1B]">{rev.author} ({rev.city || 'Verified Buyer'})</span>
                  <span className="text-[11px] text-[#8C7E77]">{rev.date}</span>
                </div>
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-[#E0D7CE]'}`} />
                  ))}
                </div>
                <h4 className="font-serif text-sm font-bold text-[#211D1B]">"{rev.title}"</h4>
                <p className="text-xs text-[#524A45] leading-relaxed">{rev.comment}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#8E3E53] font-medium border-t border-[#F0EBE5]">
                  <span>Product: {rev.productName}</span>
                  <span className="text-[#2E7D32] font-semibold">Active &amp; Published</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211D1B]/60 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DACF] relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D9]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8E3E53]">Order Record</span>
                  <h3 className="font-mono text-lg font-bold text-[#211D1B]">{selectedOrder.orderNumber}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-[#736862] hover:text-[#211D1B] rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#211D1B] mb-1">Customer &amp; Address:</h4>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  <p><strong>Address:</strong> {selectedOrder.deliveryAddress}, {selectedOrder.city}</p>
                  {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
                </div>

                <div>
                  <h4 className="font-bold text-[#211D1B] mb-2">Purchased Items:</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-[#E8E1D9]">
                        <div>
                          <p className="font-bold text-[#211D1B]">{item.productName || item.product?.name}</p>
                          {item.selectedColor && <p className="text-[10px] text-[#736862]">Shade: {item.selectedColor}</p>}
                          <p className="text-[10px] text-[#8C7E77]">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-serif font-bold text-[#211D1B]">
                          Rs. {((item.price || item.product?.price || 0) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E1D9] space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{selectedOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${selectedOrder.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#211D1B] pt-1">
                    <span>Total Cash to Collect:</span>
                    <span className="text-[#8E3E53]">Rs. {selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E1D9] flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 bg-[#211D1B] text-white text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
