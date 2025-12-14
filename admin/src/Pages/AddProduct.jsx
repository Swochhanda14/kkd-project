import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import API from '../API'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [new_price, setNewPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const getCategory = () => {
    setLoadingCategories(true);
    API.get('/category').then(res => {
      setCategory(res.data);
      setLoadingCategories(false);
    }).catch(err => {
      console.error(err);
      setError('Failed to load categories');
      setLoadingCategories(false);
    });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const insertProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    let data = new FormData();
    data.append('name', name);
    data.append('categoryId', categoryId);
    data.append('old_price', old_price);
    data.append('new_price', new_price);
    data.append('description', description);
    data.append('quantity', quantity);
    // Append all images
    images.forEach(img => data.append('image', img));
    // Append sizes as comma separated string
    if (sizes.length > 0) {
      data.append('size', sizes.join(','));
    }

    API.post('/product', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      if (res.data.success) {
        setSuccess(true);
        // Reset form
        setName('');
        setCategoryId('');
        setOldPrice('');
        setNewPrice('');
        setDescription('');
        setQuantity('');
        setImages([]);
        setImagePreviews([]);
        setSizes([]);
        setSizeInput("");
        // Reset file input
        const fileInput = document.getElementById('imageInput');
        if (fileInput) fileInput.value = '';
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to add product. Please try again.");
      }
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add product. Please check all fields and try again.");
      setLoading(false);
    });
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    // Preview all selected images
    const previews = files.map(file => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(previews);
  }

  // Handler for adding a size
  const handleAddSize = (e) => {
    e.preventDefault();
    const value = sizeInput.trim();
    if (value && !sizes.includes(value)) {
      setSizes([...sizes, value]);
      setSizeInput("");
    }
  };
  // Handler for removing a size
  const handleRemoveSize = (size) => {
    setSizes(sizes.filter(s => s !== size));
  };

  return (
    <div className='flex gap-5 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30'>
      <Sidebar />
      <div className='p-6 lg:p-8 w-full'>
        <div className="mb-8">
          <h1 className='text-3xl font-extrabold font-inter text-gray-800 mb-2'>Add New Product</h1>
          <p className="text-gray-600">Create a new product listing</p>
        </div>
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 animate-slide-down">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="text-green-800 font-semibold">Product added successfully!</p>
              <p className="text-green-600 text-sm">Your product has been added to the inventory.</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3 animate-slide-down">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button 
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 flex-1">
            <div className="p-6 md:p-8">
              <form onSubmit={insertProduct}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="product-name" className="text-sm font-semibold text-gray-700 block mb-2">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type='text' name="product-name" id="product-name" className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200" required="" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
                    {loadingCategories ? (
                      <div className="border-2 border-gray-200 rounded-xl p-3 bg-gray-50 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                      </div>
                    ) : (
                      <select 
                        name="category" 
                        onChange={(e) => setCategoryId(e.target.value)} 
                        value={categoryId}
                        id="category" 
                        className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200" 
                        required=""
                      >
                        <option value="" disabled>Select Category</option>
                        {category && category.map((cat, index) => (
                          <option key={index} value={cat._id}>{cat.cat_name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="old_price" className="text-sm font-semibold text-gray-700 block mb-2">Old Price</label>
                    <input type="number" onChange={(e) => setOldPrice(e.target.value)} value={old_price} name="old_price" min={1} className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200" required="" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="new_price" className="text-sm font-semibold text-gray-700 block mb-2">New Price</label>
                    <input type="number" name="new_price" onChange={(e) => setNewPrice(e.target.value)} value={new_price} min={1} className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200" required="" />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="quantity" className="text-sm font-semibold text-gray-700 block mb-2">Quantity</label>
                    <input type="number" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} min={1} className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200" required="" />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="image" className="text-sm font-semibold text-gray-700 block mb-2">Images</label>
                    <div className='flex gap-5'>
                      <input
                        id="imageInput"
                        type="file"
                        name="image"
                        className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-2.5 transition-all duration-200"
                        onChange={handleImageChange}
                        multiple
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="sizes" className="text-sm font-semibold text-gray-700 block mb-2">Sizes</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="sizes"
                        value={sizeInput}
                        onChange={e => setSizeInput(e.target.value)}
                        className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-3 transition-all duration-200"
                        placeholder="Enter size (e.g. S, M, L, XL)"
                      />
                      <button
                        onClick={handleAddSize}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold"
                        type="button"
                      >Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, idx) => (
                        <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center text-sm font-semibold">
                          {size}
                          <button type="button" className="ml-2 text-red-500 hover:text-red-700 font-bold" onClick={() => handleRemoveSize(size)}>&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="product-details" className="text-sm font-semibold text-gray-700 block mb-2">Product Description</label>
                    <textarea id="product-details" rows="6" onChange={(e) => setDescription(e.target.value)} value={description} className="border-2 border-gray-200 rounded-xl text-gray-900 sm:text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 block w-full p-4 transition-all duration-200 resize-none" ></textarea>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 rounded-b flex items-center gap-4">
                  <button 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 font-semibold rounded-xl text-sm px-8 py-3 text-center transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Product...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                  {loading && (
                    <p className="text-sm text-gray-500">Please wait while we add your product...</p>
                  )}
                </div>
              </form>
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-7 bg-white rounded-2xl shadow-soft p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Previews</h3>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${idx+1}`}
                      className="w-32 h-32 object-cover border-2 border-gray-200 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
                    />
                    <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
