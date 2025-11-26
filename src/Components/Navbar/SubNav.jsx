import { useQuery } from "@tanstack/react-query";
import { Heart, MoonStar, Search, ShoppingCart } from "lucide-react";
import { useRef, useState, memo, useEffect } from "react";

import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartProvider/CartProvider";

// ✅ SubNavbar Component

function SubNavbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const inputRef = useRef(null);

  // 🔍 التحكم في قيمة البحث
  const [inpVal, setInpVal] = useState("");
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://api.escuelajs.co/api/v1/products").then((res) =>
        res.json()
      ),
  });

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(inpVal.toLowerCase())
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const { getCartCount ,getFavCount} = useCart();

  return (
    // 📌 nav بدل div عشان SEO + إضافة aria-label
    <nav
      className="w-full border-b border-border fixed md:top-12 top-13  left-0 z-40"
      aria-label="Main navigation with categories, search, wishlist and cart"
    >
      <div className="w-full mx-auto bg-background py-3 px-6 flex items-center justify-between">
        {/* =============================== */}
        {/* ✅ الجزء الأيسر: زر القائمة (Categories) */}
        {/* =============================== */}
        <div className="">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem("darkMode", !darkMode ? "true" : "false");
            }}
            type="button"
            className="size-9.5 flex justify-center items-center rounded-xl border border-border text-text-primary hover:bg-surface hover:text-primary transition-colors"
            aria-label="Toggle dark mode"
          >
            <MoonStar className="w-4 h-4" />
          </button>
        </div>

        {/* =============================== */}
        {/* ✅ الجزء الأوسط: البحث (Search Bar) */}
        {/* =============================== */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-lg">
            <input
              ref={inputRef}
              onChange={(e) => setInpVal(e.target.value)}
              type="search"
              aria-label="Search for products"
              placeholder="Search products..."
              className="w-full py-2 pl-4 pr-10 border border-border rounded-lg shadow-sm bg-surface text-text-primary placeholder:text-text-light
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />

            {/* ✅ زر Clear أو Search Icon */}
            {inpVal ? (
              <button
                onClick={() => {
                  inputRef.current.value = "";
                  setInpVal("");
                }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              ></button>
            ) : (
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            )}

            {/* ✅ نتائج البحث */}
            {/* نتائج البحث */}
            {inpVal.trim() !== "" && (
              <div
                className="absolute left-0 right-0 top-full mt-2 
               bg-surface border border-border rounded-xl 
               shadow-xl max-h-72 overflow-y-auto z-50 p-2"
              >
                {filtered && filtered.length > 0 ? (
                  filtered.map((item) => (
                    <Link
                      to={`/product/${item.id}`}
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg 
                     hover:bg-background transition cursor-pointer"
                      onClick={() => {
                        inputRef.current.value = "";
                        setInpVal("");
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover border border-border"
                      />

                      {/* Details */}
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {item.title}
                        </h3>

                        <span className="text-primary font-bold text-sm">
                          ${item.price}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-text-secondary">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =============================== */}
        {/* ✅ الجزء الأيمن: Wishlist + Cart */}
        {/* =============================== */}
        <div className="flex gap-2">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="View your wishlist"
            className="relative size-9.5 flex justify-center items-center rounded-xl 
              bg-surface border border-border text-text-primary 
              hover:bg-surface-dark hover:text-primary transition-colors"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold 
              rounded-full w-4 h-4 flex items-center justify-center"
            >
              {/* {localStorage.getItem("favorites").length} */}
{getFavCount()}
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="View your cart"
            className="relative size-9.5 flex justify-center items-center rounded-xl 
              bg-surface border border-border text-text-primary 
              hover:bg-surface-dark hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-4 h-4" aria-hidden="true" />
            <span
              className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold 
              rounded-full w-4 h-4 flex items-center justify-center"
            >
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default memo(SubNavbar);
