import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./components/ProductDetails";
import Order from "./components/Order";
import Stories from "./components/Stories";
import ScrollToTop from "./components/hooks/ScrollToTop";
import Missions from "./components/Missions";

function App() {
  return (
    <div className="scrollbar-hide">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all/:id" element={<ProductDetails />} />
          <Route path="all" element={<ProductsPage />} />
          <Route path="order" element={<Order />} />
          <Route path="stories" element={<Stories />} />
          <Route path="missions" element={<Missions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
