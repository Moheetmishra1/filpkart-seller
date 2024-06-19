import { Suspense, lazy } from 'react'
// import { useContext, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Products from './Components/Pages/Products'
import Login from './Components/Pages/Login'
import SignUp from './Components/Pages/SignUp'
import Update from './Components/Pages/Update'
import Authonication from './Components/Authonticate/Authontication'
import ProtectedProducts from './Components/ProtectedProduct'
import FormData from './Components/Pages/FormData'

let LazyProductDetails = lazy(()=> import('./Components/Pages/ProductDetails'))
// lazy(() => import("./components/pages/Images"))S

function App() {
 

  return (
    <>
      <Authonication >
      <BrowserRouter >
      <Navbar   />
      <Routes >
        <Route path='/' element={<Home />} />
         <Route path='/products' element={<ProtectedProducts ><Products /></ProtectedProducts>} />  


       
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
       <Route path='/formdata' element={<FormData />}/>
      
        <Route path='/productdetails/:pid' element={<Suspense falling="Its is loading"><LazyProductDetails /></Suspense>} />

        <Route path='/update/:pid' element={<Update />} />
      </Routes>
      
      </BrowserRouter>
      </Authonication>

    </>
  )
}

export default App
