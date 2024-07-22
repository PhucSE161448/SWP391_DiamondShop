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
import OrderAdmin from './Admin/Elements/Orders/OrderAdmin'
import ShowAllPayment from './Admin/Elements/Payment/ShowAllPayment'
import PaymentSuccessful from './Pages/PaymentSuccessful'
import Certificate from './Admin/Elements/Certificate/Certificate'
import PdfFileWarranty from './Pages/PdfFileWarranty'
import PaymentFail from './Pages/DiamondPage'
import Voucher from './Admin/Elements/Voucher/Voucher'
import PdfFileCertificate from './Pages/PdfFileCertificate'
import Dashboard from './Admin/Dashboard'
import { gapi } from 'gapi-script'
import PolicyPage from './Pages/PolicyPage'
import ShowAllPromotion from './Admin/Elements/Promotions/Promotion'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Service1 from './Components/Content/NewsDetail/ServiceDetail1'
import Service2 from './Components/Content/NewsDetail/ServiceDetail2'
import CustomerPolicy from './Pages/CustomerPolicy'
import FAQ from './Pages/FAQ'
import RefundPolicy from './Pages/RefundPolicy'
import ShippingPolicy from './Pages/ShippingPolicy'
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
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Homepage />} />
            <Route path='diamondPage' element={<DiamondPage />}></Route>
            <Route path='product' element={<Product />}></Route>
            <Route path='product/detail/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='diamond/detail/:id' element={<DiamondDetail></DiamondDetail>}></Route>
            <Route path='category/:id' element={<GetPageCategory></GetPageCategory>}></Route>
            <Route path='collection/:id' element={<GetPageCollection></GetPageCollection>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/order' element={<Order></Order>}></Route>
            <Route path='/payment/success' element={<PaymentSuccessful></PaymentSuccessful>}></Route>
            <Route path='/payment/cancel' element={<PaymentFail></PaymentFail>}></Route>
            <Route path='/DiamondPolicy' element={<PolicyPage></PolicyPage>}></Route>
            <Route path='/Service1' element={<Service1></Service1>}></Route>
            <Route path='/Service2' element={<Service2></Service2>}></Route>
            <Route path='/customerPolicy' element={<CustomerPolicy></CustomerPolicy>}></Route>
            <Route path='/faq' element={<FAQ></FAQ>}></Route>
            <Route path='/refundPolicy' element={<RefundPolicy></RefundPolicy>}></Route>
            <Route path='/shippingPolicy' element={<ShippingPolicy></ShippingPolicy>}></Route>
          </Route>

          <Route path='/pdfWarranty/:id' element={<PdfFileWarranty />}></Route>
          <Route path='/pdfCert/:id' element={<PdfFileCertificate />}></Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/admin' element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path='account' element={<Account />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<ShowAllProduct />}></Route>
            <Route path='diamond' element={<ShowAllDiamond></ShowAllDiamond>}></Route>
            <Route path='diamondCase' element={<DiamondCase></DiamondCase>}> </Route>
            <Route path='collections' element={<Collections></Collections>}></Route>
            <Route path='order' element={<OrderAdmin></OrderAdmin>}></Route>
            <Route path='payment' element={<ShowAllPayment></ShowAllPayment>}></Route>
            <Route path='certificate' element={<Certificate></Certificate>}></Route>
            <Route path='voucher' element={<Voucher></Voucher>}></Route>
            <Route path='promotion' element={<ShowAllPromotion></ShowAllPromotion>}></Route>
          </Route>

        </Routes >
      </BrowserRouter >
    </GoogleOAuthProvider>
  )
}