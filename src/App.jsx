/*-------------------------------------
  * App.jsx
  *   Hooks:
  *     - Routes, Route, BrowserRouter
  *   Rutas: 
  *     - "/" entra a Index.jsx
  *     - "/films" entra a Films.jsx
--------------------------------------*/
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Index } from "./pages/Index"
import { Films } from "./pages/Films"
import "./App.css"

/**
* React-router
*
* route   {/}       carga la página <Index />
* route   {/films}  carga la página <Films />
*/
function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/films" element={<Films />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
