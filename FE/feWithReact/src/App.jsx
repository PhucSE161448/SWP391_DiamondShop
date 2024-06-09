
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Homepage from './Pages/Homepage'
import Ring from './Pages/Ring'
import DiamondPage from './Pages/DiamondPage'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
// import LogoutAndRedirect from './Auth/AuthFucntion'

import Category from './Admin/Elements/Category/Category'
import Account from './Admin/Elements/Account/Account'
import Admin from './Admin/Admin'
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
            <Route path='category' element={<Category />}></Route>
            <Route path='account' element={<Account />}></Route>
          </Route>

        </Routes >
      </BrowserRouter >

    </>
  )
}