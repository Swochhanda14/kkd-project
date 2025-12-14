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

  const getCategory = () => {
    API.get('/category').then(res => {
      setCategory(res.data);
    }).catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const insertProduct = (e) => {
    e.preventDefault();
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
        alert("Product Added Successfully");
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
      } else {
        alert("Cannot Add Product");
      }
    }).catch(err => {
      console.log(err);
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
    <div className='flex gap-5'>
      <Sidebar />
      <div className='p-5'>
        <h1 className='text-2xl font-bold font-inter text-gray-800'>Add New Product</h1>
        <div className='flex gap-10'>
          <div className="bg-white  border-4 rounded-lg shadow  mt-7">
            <div className="p-6">
              <form onSubmit={insertProduct}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="product-name" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type='text' name="product-name" id="product-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required="" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                    <select name="category" onChange={(e) => setCategoryId(e.target.value)} id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required="">
                      <option value="" disabled selected>Select Category</option>
                      {category && category.map((cat, index) => (
                        <option key={index} value={cat._id}>{cat.cat_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="old_price" className="text-sm font-medium text-gray-900 block mb-2">Old Price</label>
                    <input type="number" onChange={(e) => setOldPrice(e.target.value)} value={old_price} name="old_price" min={1} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required="" />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="new_price" className="text-sm font-medium text-gray-900 block mb-2">New Price</label>
                    <input type="number" name="new_price" onChange={(e) => setNewPrice(e.target.value)} value={new_price} min={1} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required="" />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                    <input type="number" name="quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} min={1} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required="" />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">Images</label>
                    <div className='flex gap-5'>
                      <input
                        id="imageInput"
                        type="file"
                        name="image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={handleImageChange}
                        multiple
                        required
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="sizes" className="text-sm font-medium text-gray-900 block mb-2">Sizes</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        id="sizes"
                        value={sizeInput}
                        onChange={e => setSizeInput(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Enter size (e.g. S, M, L, XL)"
                      />
                      <button
                        onClick={handleAddSize}
                        className="bg-cyan-600 text-white px-3 py-2 rounded-lg hover:bg-cyan-700"
                        type="button"
                      >Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size, idx) => (
                        <span key={idx} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full flex items-center">
                          {size}
                          <button type="button" className="ml-2 text-red-500 hover:text-red-700" onClick={() => handleRemoveSize(size)}>&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="product-details" className="text-sm font-medium text-gray-900 block mb-2">Product Description</label>
                    <textarea id="product-details" rows="6" onChange={(e) => setDescription(e.target.value)} value={description} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" ></textarea>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add Product</button>
                </div>
              </form>
            </div>
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-4">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx+1}`}
                  className="w-[120px] h-[120px] object-cover border-2 p-2 rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
