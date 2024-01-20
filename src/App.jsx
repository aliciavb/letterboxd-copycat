import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";
import { Index } from "./pages/Index";
import { Films } from "./pages/Films";

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
