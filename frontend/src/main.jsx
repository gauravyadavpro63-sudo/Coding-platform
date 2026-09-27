import react from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {BrowserRouter} from "react-router"
import {Provider} from "react-redux"
import store from "./store&slice/store.js"


function Main(){

  return (
    <div>
     <Provider store={store}>
     <BrowserRouter>
        <App/>
     </BrowserRouter>
     </Provider>

    </div>
  )
}



const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main/>)