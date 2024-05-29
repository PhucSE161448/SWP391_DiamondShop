

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Ring from './Pages/Ring'
import Diamond from './Pages/Diamond'
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import Admin from './Admin/Admin'
function App() {

  return (
    <>
      <BrowserRouter>
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
        </Routes >
      </BrowserRouter >

    </>
  )
}

export default App
