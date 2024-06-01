
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Ring from './Pages/Ring'
import Diamond from './Pages/Diamond'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Admin from './Admin/Admin'
// import LogoutAndRedirect from './Auth/AuthFucntion'

import CaratWeight from './Admin/Elements/CaratWeight/CaratWeight'
import Clarity from './Admin/Elements/Clarity/Clarity'
import Cut from './Admin/Elements/Cut/Cut'
import Origin from './Admin/Elements/Origin/Origin'
import Account from './Admin/Elements/Account/Account'
export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LogoutAndRedirect /> */}

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/diamond' element={<Diamond />}></Route>
          <Route path='/ring' element={<Ring />}></Route>
          <Route path='/a' element={<Home />}></Route>
          <Route path='/b' element={<Home />}></Route>
          <Route path='/c' element={<Home />}></Route>
          <Route path='/d' element={<Home />}></Route>
          <Route path='/e' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/admin/caratWeight' element={<CaratWeight />}></Route>
          <Route path='/admin/clarity' element={<Clarity />}></Route>
          <Route path='//admin/cut' element={<Cut />}></Route>
          <Route path='/admin/origin' element={<Origin />}></Route>
          <Route path='/admin/account' element={<Account />}></Route>
        </Routes >
      </BrowserRouter >

    </>
  )
}