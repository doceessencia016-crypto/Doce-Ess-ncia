import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-ink">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="/carrinho" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
