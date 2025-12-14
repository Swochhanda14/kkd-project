// Utility to clear dashboard and product sales history
export function clearDashboardHistory() {
  localStorage.removeItem('kkd_dashboard_history');
  localStorage.removeItem('kkd_dashboard_processed_order_ids');
  localStorage.removeItem('kkd_product_sales_history');
}
