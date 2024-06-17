
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
import Product from './Admin/Elements/Products/Product'
import CreateProduct from './Admin/Elements/Products/CreateProduct'
import ShowAllProduct from './Admin/Elements/Products/ShowAllProduct'
import Warranty from './Admin/Elements/Warranty/Warranty'
export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LogoutAndRedirect /> */}

        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Homepage />} />
            <Route path='diamondPage' element={<DiamondPage />}></Route>
            <Route path='ring' element={<Ring />}></Route>
          </Route>


          {/* <Route path='/a' element={<Home />}></Route>
          <Route path='/b' element={<Home />}></Route>
          <Route path='/c' element={<Home />}></Route>
          <Route path='/d' element={<Home />}></Route>
          <Route path='/e' element={<Home />}></Route> */}
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/admin' element={<Admin />}>
            <Route path='account' element={<Account />} />
            <Route path='category' element={<Category />} />
            <Route path='product' element={<Product />}>
              <Route path='create' element={<CreateProduct />}></Route>
              <Route path='showAllProduct' element={<ShowAllProduct></ShowAllProduct>}></Route>
            </Route>
            <Route path='warranty' element={<Warranty></Warranty>}> </Route>
          </Route>

        </Routes >
      </BrowserRouter >

    </>
  )
}