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
    <div className='flex gap-5 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30'>
      <Sidebar />
      <div className='p-6 lg:p-8 w-full'>
        <div className="mb-8">
          <h1 className='text-3xl font-extrabold font-inter text-gray-800 mb-2'>Orders</h1>
          <p className="text-gray-600">Manage customer orders</p>
        </div>
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <th className="p-4 text-left text-sm font-bold text-white">Order No.</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Image</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Product</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Quantity</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Price</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Ordered By</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Status</th>
                  <th className="p-4 text-left text-sm font-bold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="bg-white hover:bg-indigo-50/50 transition-colors duration-200">
                    <td className="p-4 text-sm font-semibold text-gray-900">{order._id?.substring(0, 8)}...</td>
                    <td className="p-4">
                      <img src={Array.isArray(getProductImage(order.productId)) ? getProductImage(order.productId)[0] : getProductImage(order.productId)} className='w-16 h-16 object-cover rounded-lg shadow-md' alt="" />
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900">{getProductName(order.productId)}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900">{order.quantity}</td>
                    <td className="p-4 text-sm font-bold text-green-600">Rs. {order.price}</td>
                    <td className="p-4 text-sm font-medium text-gray-700">{order.orderedBy}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        order.status === 'complete' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {order.status !== 'complete' && (
                          <button 
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg" 
                            onClick={() => {
                              if (window.confirm("Mark this order as complete?")) {
                                handleComplete(order._id);
                              }
                            }}
                          >
                            Complete
                          </button>
                        )}
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg" 
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this order?")) {
                              handleDelete(order._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;