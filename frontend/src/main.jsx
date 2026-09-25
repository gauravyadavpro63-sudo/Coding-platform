import react from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {BrowserRouter} from "react-router"

function Main(){

  return (
    <div>
     
     <BrowserRouter>
        <App/>
     </BrowserRouter>

    </div>
  )
}



const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main/>)