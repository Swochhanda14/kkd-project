import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ProductList from './Pages/ProductList'
import AddProduct from './Pages/AddProduct'
import Orders from './Pages/Orders'
import UpdateProduct from './Pages/UpdateProduct'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'


const RouterComponent = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/list" element={<ProductList />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/updateproduct/:id" element={<UpdateProduct/>}></Route>
    </Routes>
  )
}

export default RouterComponent
