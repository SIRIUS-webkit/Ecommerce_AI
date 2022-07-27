import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
function App() {
  return (
    <div className="scrollbar-hide">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
