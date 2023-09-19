import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Products from "./pages/Products";
import Todo from "./components/Todo";
import Login from "./pages/Login";
import Todo2 from "./pages/Todo2";
import Cart from "./pages/Cart";
import Productsdetail from "./pages/Productsdetail";

import Categories from "./pages/Categories";
import Brand from "./pages/Brand";
import Bills from "./pages/Bills";

// import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/bills" element={<Bills />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/categories/*" element={<Categories />}></Route>
          <Route path="/brands/*" element={<Brand />}></Route>
          <Route path="/chitiet/:id/*" element={<Productsdetail />} />

          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/todo2" element={<Todo2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
