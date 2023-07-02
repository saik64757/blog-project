import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";

import { Toaster } from "react-hot-toast";

// endpoint: `https://blog-backend-anvk.onrender.com/api/v1`,
// endpoint: `http://127.0.0.1:5000/api/v1`,

export const config = {
  endpoint: `https://blog-backend-anvk.onrender.com/api/v1`,
};

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
export default App;
