import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import API from '../API';

const UpdateProduct = () => {
  const navigate=useNavigate();
  const initialProductState = {
    name: "",
    categoryId: "",
    old_price: "",
    new_price: "",
    description: "",
    quantity: "",
    image: null,
  };

  const { id } = useParams();
  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategory] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    API.get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImagePreview(res.data.image);
        // Set sizes if available
        if (Array.isArray(res.data.size)) {
          setSizes(res.data.size);
        } else if (typeof res.data.size === 'string') {
          setSizes(res.data.size.split(',').map(s => s.trim()));
        } else {
          setSizes([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    API.get('/category').then((res) => {
      setCategory(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('categoryId', product.categoryId);
    formData.append('old_price', product.old_price);
    formData.append('new_price', product.new_price);
    formData.append('description', product.description);
    formData.append('quantity', product.quantity);
    
    if (product.image) {
      formData.append('image', product.image);
    }
    if (sizes.length > 0) {
      formData.append('size', sizes.join(','));
    }

    API.put(`/product/${id}`, formData)
      .then((res) => {
        if (res.data.success) {
          alert("Updated Successfully");
          navigate('/list');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddSize = (e) => {
    e.preventDefault();
    const value = sizeInput.trim();
    if (value && !sizes.includes(value)) {
      setSizes([...sizes, value]);
      setSizeInput("");
    }
  };
  const handleRemoveSize = (size) => {
    setSizes(sizes.filter(s => s !== size));
  };

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="p-5">
        <h1 className="text-2xl font-bold font-inter text-gray-800">Update Product</h1>
        <div className="flex gap-10">
          <div className="bg-white border-4 rounded-lg shadow mt-7">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Product Name</label>
                    <input
                      onChange={inputChangeHandler}
                      value={product.name || ""}
                      type="text"
                      name="name"
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="categoryId" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                    <select
                      name="categoryId"
                      onChange={inputChangeHandler}
                      value={product.categoryId || ""}
                      id="categoryId"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    >
                      {categories && categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.cat_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="old_price" className="text-sm font-medium text-gray-900 block mb-2">Old Price</label>
                    <input
                      type="number"
                      onChange={inputChangeHandler}
                      value={product.old_price || ""}
                      name="old_price"
                      id="old_price"
                      min={1}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="new_price" className="text-sm font-medium text-gray-900 block mb-2">New Price</label>
                    <input
                      type="number"
                      name="new_price"
                      onChange={inputChangeHandler}
                      value={product.new_price || ""}
                      id="new_price"
                      min={1}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      onChange={inputChangeHandler}
                      value={product.quantity || ""}
                      id="quantity"
                      min={1}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="image" className="text-sm font-medium text-gray-900 block mb-2">Image</label>
                    <div className="flex gap-5">
                      <input
                        id="image"
                        type="file"
                        name="image"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={handleImageChange}
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
                    <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Product Description</label>
                    <textarea
                      id="description"
                      rows="6"
                      name="description"
                      onChange={inputChangeHandler}
                      value={product.description || ""}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                    ></textarea>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 rounded-b">
                  <button
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-7 w-[20%] h-[20%] border-2 p-4 rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
