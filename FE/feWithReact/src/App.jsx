
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Homepage from './Pages/Homepage'
import Ring from './Pages/Ring'
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
export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LogoutAndRedirect /> */}

        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Homepage />} />
            <Route path='diamondPage' element={<DiamondPage />}></Route>
            <Route path='ring' element={<Ring />}>

            </Route>
            <Route path='ring/detail/:id' element={<ProductDetail></ProductDetail>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/admin' element={<Admin />}>
            <Route path='account' element={<Account />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<ShowAllProduct />}></Route>
            <Route path='warranty' element={<Warranty></Warranty>}> </Route>
          </Route>

        </Routes >
      </BrowserRouter >

    </>
  )
}