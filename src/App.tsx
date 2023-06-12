import { Suspense, lazy } from "react"
import "./scss/app.scss"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import { Route, Routes } from "react-router-dom"
import NotFound from "./components/pages/NotFound/NotFound"
import PageLoading from "./common/PageLoading"
import PizzaInfo from "./components/pages/PizzaInfo/PizzaInfo"

const Cart = lazy(() => import("./components/pages/Cart/Cart"))

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<PizzaInfo />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<PageLoading />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
export default App
