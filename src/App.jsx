import React, { useEffect, useState } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import { Route, Routes } from "react-router-dom"
import NotFound from "./components/pages/NotFound/NotFound"
import Cart from "./components/pages/Cart/Cart"

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
