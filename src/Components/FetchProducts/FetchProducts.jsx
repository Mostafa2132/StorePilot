import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldBanIcon,
} from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
import NoDataFound from "../NoDataFound/NoDataFound";

/**
 * FetchProducts Component
 *
 * Fetches and displays products from the API using React Query.
 * Supports loading, error, empty states, and pagination.
 *
 * @param {number} limit - Maximum number of products per page (default: 12)
 * @param {number} categoryId - Filter products by category ID (optional)
 */
export default function FetchProducts({ limit = 12, categoryId = null }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate offset based on current page
  const offset = (currentPage - 1) * limit;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", limit, offset, categoryId, currentPage],
    queryFn: async () => {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep previous data while loading new page
  });

  // Calculate total pages (assuming we have more data if current page has full limit)
  const hasMore = data && data.length === limit;

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: document.getElementById("productGrid").offsetTop - 150,
      behavior: "smooth",
    });
  };

  if (isLoading && !data) {
    return <Loading type="skeleton" message="Loading products..." />;
  }

  if (isError) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-error" />
          <p className="text-text-primary text-lg font-semibold">
            Error loading products
          </p>
          <p className="text-text-secondary">
            {error?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0)
    return (
      <NoDataFound
        title={"No Products Founed"}
        icon={<ShieldBanIcon />}
        des={"We couldn’t find any products right now. Please try again later."}
      />
    );

  return (
    <>
      {/* Products Grid */}
      <div
        id="productGrid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {data.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.05, // تأخير بسيط بناءً على الترتيب
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            viewport={{
              once: true, // يظهر مرة واحدة فقط
              amount: 0.2, // يبدأ الـ animation لما 20% من العنصر يظهر
              margin: "0px 0px -50px 0px", // يبدأ قبل ما العنصر يظهر بشوية
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.4 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-center gap-4 mt-12">
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
              currentPage === 1 || isLoading
                ? "bg-surface border border-border text-text-light cursor-not-allowed"
                : "bg-surface border border-border cursor-pointer text-text-primary hover:border-primary hover:text-primary"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 rounded-xl font-semibold bg-surface border border-border text-text-primary hover:border-primary hover:text-primary transition-all"
                >
                  1
                </button>
                {currentPage > 3 && (
                  <span className="px-2 text-text-secondary">...</span>
                )}
              </>
            )}

            {/* Previous Page */}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 rounded-xl font-semibold cursor-pointer bg-surface border border-border text-text-primary hover:border-primary hover:text-primary transition-all"
              >
                {currentPage - 1}
              </button>
            )}

            {/* Current Page */}
            <button
              className="px-4 py-2 rounded-xl cursor-pointer font-semibold bg-primary text-white border border-primary"
              disabled
            >
              {currentPage}
            </button>

            {/* Next Page */}
            {hasMore && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 cursor-pointer rounded-xl font-semibold bg-surface border border-border text-text-primary hover:border-primary hover:text-primary transition-all"
              >
                {currentPage + 1}
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasMore || isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
              !hasMore || isLoading
                ? "bg-surface border border-border text-text-light cursor-not-allowed"
                : "bg-surface border cursor-pointer border-border text-text-primary hover:border-primary hover:text-primary"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Loading indicator for page change */}
        {isLoading && data && (
          <div className="mt-4">
            <Loading type="spinner" size="sm" />
          </div>
        )}
      </div>
    </>
  );
}
