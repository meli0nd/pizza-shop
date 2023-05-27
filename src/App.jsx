import React, { createContext, useEffect, useState } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import { Route, Routes } from "react-router-dom"
import NotFound from "./components/pages/NotFound/NotFound"
import Cart from "./components/pages/Cart/Cart"

export const AppContext = createContext()

const App = () => {
  const [searchValue, setSearchValue] = useState("")

  return (
    <div className="App">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <div className="content">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
