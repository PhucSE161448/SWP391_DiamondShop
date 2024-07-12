import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Homepage from '../src/Components/Content/HomePage'
import Product from './Pages/Product'
import DiamondPage from './Pages/DiamondPage'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
// import LogoutAndRedirect from './Auth/AuthFunction'

import Category from './Admin/Elements/Category/Category'
import Account from './Admin/Elements/Account/Account'
import Admin from './Admin/Admin'
import ShowAllProduct from './Admin/Elements/Products/ShowAllProduct'
import Warranty from './Admin/Elements/Warranty/Warranty'
import Cart from './Pages/Cart'
import ProductDetail from './Components/Products/ProductDetail'
import ShowAllDiamond from './Admin/Elements/Diamonds/ShowAllDiamond'
import DiamondDetail from './Components/Diamonds/DiamondDetail'
import DiamondCase from './Admin/Elements/DiamondCase/DiamondCase'
import Collections from './Admin/Elements/Collections/Collections'
import GetPageCategory from './Components/CategoryPage/GetPageCategory'
import GetPageCollection from './Components/CollectionPage/GetPageCollection'
import Profile from './Pages/Profile'
import Order from './Pages/Order'
import ShowAllType from './Admin/Elements/Type/ShowAllType'
import OrderAdmin from './Admin/Elements/Orders/OrderAdmin'
import ShowAllPayment from './Admin/Elements/Payment/ShowAllPayment'
import PaymentSuccessful from './Pages/PaymentSuccessful'
import Certificate from './Admin/Elements/Certificate/Certificate'
import { gapi } from 'gapi-script'
import { GoogleOAuthProvider } from '@react-oauth/google'
export default function App() {
  const clientId = "629470625241-289cmgv2sgrusl96bhmhsnpjjbr0m98b.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: clientId,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
  })
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        {/* <LogoutAndRedirect /> */}

        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Homepage />} />
            <Route path='diamondPage/:PageNumberFromURL' element={<DiamondPage />}></Route>
            <Route path='product/:PageNumberFromURL' element={<Product />}></Route>
            <Route path='product/detail/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='diamond/detail/:id' element={<DiamondDetail></DiamondDetail>}></Route>
            <Route path='category/:id' element={<GetPageCategory></GetPageCategory>}></Route>
            <Route path='collection/:id' element={<GetPageCollection></GetPageCollection>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/order' element={<Order></Order>}></Route>
            <Route path='/payment/success' element={<PaymentSuccessful></PaymentSuccessful>}></Route>
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/admin' element={<Admin />}>
            <Route path='account' element={<Account />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<ShowAllProduct />}></Route>
            <Route path='warranty' element={<Warranty></Warranty>}> </Route>
            <Route path='diamond' element={<ShowAllDiamond></ShowAllDiamond>}></Route>
            <Route path='diamondCase' element={<DiamondCase></DiamondCase>}> </Route>
            <Route path='collections' element={<Collections></Collections>}></Route>
            <Route path='type' element={<ShowAllType></ShowAllType>}></Route>
            <Route path='order' element={<OrderAdmin></OrderAdmin>}></Route>
            <Route path='payment' element={<ShowAllPayment></ShowAllPayment>}></Route>
            <Route path='certificate' element={<Certificate></Certificate>}></Route>
          </Route>

        </Routes >
      </BrowserRouter >
    </GoogleOAuthProvider>
  )
}