import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./Redux/store/store"

const rootElem = document.getElementById("root")

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)
  root.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
}
