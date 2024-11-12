import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react"
import Login from "./components/login";

function App() {

  const [navegarpagina, setNevegarPagina] = useState("login");


  return (
    <>
      {
        navegarpagina === "login" ? <Login setNevegarPagina={setNevegarPagina} /> : ""
      }

    </>
  )
}

export default App
