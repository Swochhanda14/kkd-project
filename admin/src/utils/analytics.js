// Utility to fetch analytics from backend
import API from '../API';

export const fetchOrderAnalytics = async () => {
  const res = await API.get('/order');
  const orders = res.data;
  let totalOrders = orders.length;
  let totalSales = 0;
  let totalRevenue = 0;
  let salesByDate = {};

  orders.forEach(order => {
    totalSales += order.quantity || 0;
    totalRevenue += (order.price || 0) * (order.quantity || 0);
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!salesByDate[date]) salesByDate[date] = 0;
    salesByDate[date] += (order.price || 0) * (order.quantity || 0);
  });

  return { totalOrders, totalSales, totalRevenue, salesByDate };
};
