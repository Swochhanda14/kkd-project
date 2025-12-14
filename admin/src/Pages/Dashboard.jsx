import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { Package, ShoppingCart, DollarSign, Users, Menu } from 'lucide-react'
import Sidebar from '../Components/Sidebar/Sidebar'
import API from '../API'
import { mergeProductSalesToHistory, getTopProductsFromHistory } from '../utils/productSalesHistory'

const DASHBOARD_HISTORY_KEY = 'kkd_dashboard_history';

function mergeOrdersToHistory(orders) {
  let history = JSON.parse(localStorage.getItem(DASHBOARD_HISTORY_KEY)) || {};
  let processedIds = JSON.parse(localStorage.getItem('kkd_dashboard_processed_order_ids')) || [];
  let newProcessedIds = [...processedIds];
  orders.forEach(order => {
    if (!order._id || processedIds.includes(order._id)) return; // skip if already processed
    const date = order.createdAt ? new Date(order.createdAt) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;
    if (!history[key]) {
      history[key] = { revenue: 0, sales: 0 };
    }
    history[key].revenue += order.price || 0;
    history[key].sales += order.quantity || 0;
    newProcessedIds.push(order._id);
  });
  localStorage.setItem(DASHBOARD_HISTORY_KEY, JSON.stringify(history));
  localStorage.setItem('kkd_dashboard_processed_order_ids', JSON.stringify(newProcessedIds));
  return history;
}

function getHistoryAsMonthlyArray() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let history = JSON.parse(localStorage.getItem(DASHBOARD_HISTORY_KEY)) || {};
  const now = new Date();
  const year = now.getFullYear();
  // Build array for this year
  let arr = Array(12).fill(0).map((_, i) => ({ month: months[i], sales: 0, revenue: 0, orders: 0 }));
  Object.entries(history).forEach(([key, val]) => {
    const [y, m] = key.split('-').map(Number);
    if (y === year && arr[m]) {
      arr[m].sales = val.sales;
      arr[m].revenue = val.revenue;
      arr[m].orders = val.sales; // Use sales as orders for the bar graph
    }
  });
  return arr;
}

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    API.get('/product').then(res => setProducts(res.data))
    API.get('/order').then(res => setOrders(res.data))
    API.get('/user').then(res => setCustomers(res.data)).catch(() => setCustomers([]))
  }, [])

  const totalProducts = products.length
  const totalOrders = orders.length
  // Use revenue from localStorage history for summary
  const history = JSON.parse(localStorage.getItem(DASHBOARD_HISTORY_KEY)) || {};
  const now = new Date();
  const year = now.getFullYear();
  let totalRevenue = 0;
  Object.entries(history).forEach(([key, val]) => {
    const [y] = key.split('-').map(Number);
    if (y === year) {
      totalRevenue += val.revenue;
    }
  });
  const totalCustomers = customers.length

  useEffect(() => {
    if (orders.length > 0) {
      mergeOrdersToHistory(orders);
      mergeProductSalesToHistory(orders, products);
    }
    setSalesData(getHistoryAsMonthlyArray());
  }, [orders, products]);

  // Use product sales history for top products
  const topProducts = getTopProductsFromHistory(products, 5);

  const summary = [
    {
      title: 'Products',
      value: totalProducts,
      icon: <Package className="w-7 h-7 text-indigo-500" />,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      title: 'Orders',
      value: totalOrders,
      icon: <ShoppingCart className="w-7 h-7 text-emerald-500" />,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Revenue',
      value: `Rs.${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-7 h-7 text-yellow-500" />,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Customers',
      value: totalCustomers,
      icon: <Users className="w-7 h-7 text-pink-500" />,
      color: 'from-pink-400 to-pink-600'
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-x-hidden backdrop-blur-xl bg-white/30">
        {/* Top Nav */}
        <header className="bg-white/60 shadow-lg px-10 py-6 flex items-center justify-between rounded-b-3xl border-b border-indigo-100">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow">Welcome, Admin!</h1>
            <p className="text-gray-500 mt-1 text-lg font-medium">Here&apos;s your business at a glance.</p>
          </div>
          <Menu className="w-7 h-7 text-indigo-400 md:hidden" />
        </header>

        {/* Main Content */}
        <main className="p-10 flex flex-col gap-12 flex-1">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {summary.map((card, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${card.color} shadow-xl rounded-2xl flex items-center p-6 gap-5 hover:scale-105 hover:shadow-2xl transition-all duration-300 glass-card`}
                style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.25)' }}
              >
                <div className="p-4 rounded-full bg-white/40 shadow-inner">
                  {card.icon}
                </div>
                <div>
                  <p className="text-black/80 text-base font-bold mb-1 tracking-wide">{card.title}</p>
                  <p className="text-2xl font-extrabold text-black drop-shadow">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Sales & Revenue and Recent Orders Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/70 rounded-2xl shadow-lg p-8 glass-card w-full">
              <h2 className="text-xl font-bold mb-6 text-indigo-700">Monthly Sales & Revenue</h2>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white/70 rounded-2xl shadow-lg p-8 glass-card w-full flex flex-col">
              <h2 className="text-xl font-bold mb-6 text-emerald-700">Recent Orders</h2>
              <div className="overflow-x-auto flex-1">
                <table className="text-left w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">#</th>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">Customer</th>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">Product</th>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">Qty</th>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">Price</th>
                      <th className="px-2 py-2 text-gray-700 font-semibold whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-7).reverse().map((order, idx) => {
                      const product = products.find(p => p._id === (order.productId && order.productId._id ? order.productId._id : order.productId));
                      return (
                        <tr key={order._id || idx} className="hover:bg-emerald-50 transition">
                          <td className="px-2 py-2 font-bold whitespace-nowrap">{idx + 1}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{order.orderedBy || '-'}</td>
                          <td className="px-2 py-2 flex items-center gap-2 whitespace-nowrap">
                            {product && <img src={Array.isArray(product.image) ? product.image[0] : product.image} alt={product.name} className="w-7 h-7 object-cover rounded" />}
                            <span className="truncate max-w-[120px]">{product ? product.name : '-'}</span>
                          </td>
                          <td className="px-2 py-2 whitespace-nowrap">{order.quantity}</td>
                          <td className="px-2 py-2 whitespace-nowrap">Rs.{order.price}</td>
                          <td className="px-2 py-2 whitespace-nowrap">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Row: Monthly Orders & Top Selling Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/70 rounded-2xl shadow-lg p-8 glass-card">
              <h2 className="text-xl font-bold mb-6 text-pink-700">Monthly Orders</h2>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#a855f7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Selling Products List */}
            <div className="bg-white/70 rounded-2xl shadow-lg p-8 glass-card">
              <h2 className="text-xl font-bold mb-6 text-indigo-700">Top Selling Products</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-gray-700 font-semibold">#</th>
                      <th className="px-4 py-2 text-gray-700 font-semibold">Product</th>
                      <th className="px-4 py-2 text-gray-700 font-semibold">Category</th>
                      <th className="px-4 py-2 text-gray-700 font-semibold">Sold</th>
                      <th className="px-4 py-2 text-gray-700 font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((prod, idx) => (
                      <tr key={prod._id} className="hover:bg-indigo-50 transition">
                        <td className="px-4 py-2 font-bold">{idx + 1}</td>
                        <td className="px-4 py-2 flex items-center gap-3">
                          <img src={Array.isArray(prod.image) ? prod.image[0] : prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded" />
                          <span>{prod.name}</span>
                        </td>
                        <td className="px-4 py-2">{prod.categoryName || prod.category || '-'}</td>
                        <td className="px-4 py-2">{prod.sold}</td>
                        <td className="px-4 py-2">Rs.{prod.new_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style>{`
        .glass-card {
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          border: 1px solid rgba(255,255,255,0.18);
        }
      `}</style>
    </div>
  )
}

export default Dashboard
