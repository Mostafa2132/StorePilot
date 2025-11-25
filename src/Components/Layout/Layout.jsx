import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mt-32">
          <ScrollRestoration />
        <Outlet>
          {children}
        </Outlet>
      </div>
      <Footer />
    </>
  );
}
