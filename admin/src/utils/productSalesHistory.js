// Returns an object: { [productId]: { sold: number, name, image, category, new_price } }
export function mergeProductSalesToHistory(orders, products) {
  let history = JSON.parse(localStorage.getItem('kkd_product_sales_history')) || {};
  orders.forEach(order => {
    const pid = typeof order.productId === 'object' && order.productId._id ? order.productId._id : order.productId;
    if (!pid) return;
    if (!history[pid]) {
      // Find product info for display
      const prod = products.find(p => p._id === pid) || {};
      history[pid] = {
        sold: 0,
        name: prod.name || '',
        image: prod.image || '',
        category: prod.categoryName || prod.category || '',
        new_price: prod.new_price || 0
      };
    }
    history[pid].sold += order.quantity || 0;
  });
  localStorage.setItem('kkd_product_sales_history', JSON.stringify(history));
  return history;
}

export function getTopProductsFromHistory(products, topN = 5) {
  let history = JSON.parse(localStorage.getItem('kkd_product_sales_history')) || {};
  // Merge with current product info for up-to-date display
  let arr = Object.entries(history).map(([pid, data]) => {
    const prod = products.find(p => p._id === pid) || {};
    return {
      _id: pid,
      sold: data.sold,
      name: prod.name || data.name,
      image: prod.image || data.image,
      category: prod.categoryName || prod.category || data.category,
      new_price: prod.new_price || data.new_price
    };
  });
  arr.sort((a, b) => b.sold - a.sold);
  return arr.slice(0, topN);
}
