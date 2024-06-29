
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Homepage from './Pages/Homepage'
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
export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LogoutAndRedirect /> */}

        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Homepage />} />
            <Route path='diamondPage/:PageNumberFromURL' element={<DiamondPage />}></Route>
            <Route path='product/:PageNumberFromURL' element={<Product />}></Route>
            <Route path='product/detail/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='diamond/detail/:id' element={<DiamondDetail></DiamondDetail>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
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
          </Route>

        </Routes >
      </BrowserRouter >

    </>
  )
}