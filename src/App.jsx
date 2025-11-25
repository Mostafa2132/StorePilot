import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts.jsx";
import Login from "./Pages/Auth/Login/Login.jsx";
import Signup from "./Pages/Auth/Signup/Signup.jsx";
import { ToastContainer } from "react-toastify";
import UserProvider from "./Context/UserContext/UserContext.jsx";
import CartProvider from "./Context/CartProvider/CartProvider.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Wishlist from "./Pages/Wishlist/Wishlist.jsx";
import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "category/:catId", element: <CategoryProducts /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </UserProvider>
        </QueryClientProvider>
      </Suspense>
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
