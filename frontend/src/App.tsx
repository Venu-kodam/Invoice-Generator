import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Products from './components/Products'
import { Toaster } from 'sonner'
import Invoice from './components/Invoice'
import AppContextProvider from './Context/appContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Toaster richColors position='bottom-right' />
          <Navbar />
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
