import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import API from '../API';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetchOrders();
    API.get('/product').then(res => {
      setProduct(res.data);
    });
  }, []);

  const fetchOrders = () => {
    API.get('/order').then(res => {
      setOrders(res.data);
    });
  };

  const handleComplete = async (id) => {
    try {
      await API.put(`/order/${id}`, { status: 'complete' });
      alert('Order marked as complete.');
      fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to complete order.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/order/${id}`);
      alert('Order deleted successfully.');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    }
  };

  const getProductName = (proId) => {
    const product = products.find((prod) => prod._id === proId);
    return product ? product.name : "unknown";
  };

  const getProductImage = (proId) => {
    const product = products.find((prod) => prod._id === proId);
    return product ? product.image : "unknown";
  };

  return (
    <div className='flex gap-5'>
      <Sidebar />
      <div className='p-5 w-full'>
        <h1 className='text-2xl font-bold font-inter text-gray-800'>Orders</h1>
        <div className="overflow-hidden mt-10 w-full">
          <table className="w-full rounded-xl">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Order No.</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Image</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Ordered By</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="p-5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {orders.map((order) => (
                <tr key={order._id} className="bg-white hover:bg-gray-50">
                  <td className="p-5">{order._id}</td>
                  <td className="p-5">
                    <img src={getProductImage(order.productId)} className='w-12' alt="" />
                  </td>
                  <td className="p-5">{getProductName(order.productId)}</td>
                  <td className="p-5">{order.quantity}</td>
                  <td className="p-5">{order.price}</td>
                  <td className="p-5">{order.orderedBy}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded ${order.status === 'complete' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-5 flex gap-3">
                    {order.status !== 'complete' && (
                      <button 
                        className="px-3 py-2 bg-green-500 text-white rounded" 
                        onClick={() => handleComplete(order._id)}
                      >
                        Complete
                      </button>
                    )}
                    <button 
                      className="px-3 py-2 bg-red-500 text-white rounded" 
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;