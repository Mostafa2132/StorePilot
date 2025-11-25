import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Heart, ShieldBanIcon } from "lucide-react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useCart } from "../../Context/CartProvider/CartProvider";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const {
    addToCart,
    isInCart,
    toggleFavorite,
    isInFavorites,
    getItemQuantity,
    updateQuantity,
  } = useCart();

  // تحديث الكمية المحلية بناءً على السلة
  useEffect(() => {
    const cartQty = getItemQuantity(id);
    if (cartQty > 0) {
      setQty(cartQty);
    }
  }, [id, getItemQuantity]);

  // Fetch product data Details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`https://api.escuelajs.co/api/v1/products/${id}`).then((res) =>
        res.json()
      ),
    staleTime: 1000 * 60 * 2,
  });

  // Fetching Related Products
  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", id],
    queryFn: () =>
      fetch(`https://api.escuelajs.co/api/v1/products/${id}/related`).then(
        (res) => res.json()
      ),
    enabled: !!data,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-6 text-red-500 bg-surface dark:bg-surface-dark rounded-lg">
        Error: {error?.message}
      </div>
    );

  if (!data)
    return (
      <NoDataFound
        title={"No Product Details "}
        icon={<ShieldBanIcon className="text-red-600" />}
        des={
          "We couldn’t find any product Details right now. Please try again later."
        }
      />
    );

  // destructure safely
  const {
    id: productId,
    title = "Untitled product",
    description = "No description available.",
    price,
    category,
    images = [],
    ...rest
  } = data;

  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : price ?? "-";

  // دالة التعامل مع زر Add to Cart
  const handleAddToCart = () => {
    if (isInCart(productId)) {
      // إذا كان المنتج موجود، حدّث الكمية
      updateQuantity(productId, qty);
    } else {
      // إذا كان المنتج جديد، أضفه بالكمية المحددة
      addToCart(data, qty);
    }
  };

  // دالة التعامل مع زيادة الكمية
  const handleIncreaseQty = () => {
    const newQty = qty + 1;
    setQty(newQty);
    // إذا كان المنتج موجود في السلة، حدّث الكمية مباشرة
    if (isInCart(productId)) {
      updateQuantity(productId, newQty);
    }
  };

  // دالة التعامل مع تقليل الكمية
  const handleDecreaseQty = () => {
    const newQty = Math.max(1, qty - 1);
    setQty(newQty);
    // إذا كان المنتج موجود في السلة، حدّث الكمية مباشرة
    if (isInCart(productId)) {
      updateQuantity(productId, newQty);
    }
  };

  return (
    <>
      <Helmet>
        <title>StorePilot – {title}</title>
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[85rem] mt-40 mx-auto rounded-2xl px-4 shadow sm:px-6 lg:px-8 py-12 bg-surface/50 dark:bg-surface-dark/50"
        aria-labelledby="product-title"
      >
        <div className="container mx-auto max-w-[84rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* ===== LEFT: Images + Thumbs ===== */}
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-border bg-white dark:bg-surface-dark shadow-2xl">
                <Splide
                  options={{
                    type: "loop",
                    perPage: 1,
                    autoplay: false,
                    interval: 3500,
                    pauseOnHover: true,
                    arrows: false,
                    pagination: true,
                    lazyLoad: true,
                  }}
                  aria-label={`${title} images`}
                >
                  {images && images.length > 0 ? (
                    images.map((src, i) => (
                      <SplideSlide key={i}>
                        <div className="w-full h-[420px] sm:h-[520px] flex items-center justify-center bg-surface dark:bg-surface-dark">
                          <img
                            src={src}
                            alt={`${title} - ${i + 1}`}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </SplideSlide>
                    ))
                  ) : (
                    <SplideSlide>
                      <div className="w-full h-[420px] flex items-center justify-center bg-surface dark:bg-surface-dark text-text-secondary">
                        No images available
                      </div>
                    </SplideSlide>
                  )}
                </Splide>
              </div>
            </div>

            {/* ===== RIGHT: Info & Actions ===== */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Title + Category + Rating */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h1
                    id="product-title"
                    className="text-2xl md:text-3xl font-extrabold text-text-primary leading-tight"
                  >
                    {title}
                  </h1>

                  <div className="mt-3 flex flex-wrap gap-3 items-center">
                    {/* rating */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-dark)]/40 dark:bg-[var(--color-surface)]/10 border border-border">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-text-primary">
                        4.5
                      </span>
                      <span className="text-xs text-text-secondary">(250)</span>
                    </div>

                    {/* category */}
                    {category?.name && (
                      <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/10">
                        {category.name}
                      </span>
                    )}

                    {/* availability placeholder */}
                    <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/10">
                      In stock
                    </span>
                  </div>
                </div>

                {/* Price block */}
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
                    {formattedPrice}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Tax & shipping calculated at checkout
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-base text-text-secondary max-w-3xl leading-relaxed">
                {description}
              </p>

              {/* Quantity + CTAs */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-text-secondary">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border border-border rounded-lg overflow-hidden bg-surface dark:bg-surface-dark">
                    <button
                      onClick={handleDecreaseQty}
                      className="px-3 py-2 hover:bg-surface-dark/40 dark:bg-surface-dark/10 shadow dark:hover:bg-surface/10 transition"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 text-sm font-medium text-text-primary">
                      {qty}
                    </div>
                    <button
                      onClick={handleIncreaseQty}
                      className="px-3 py-2 hover:bg-surface-dark/40 dark:bg-surface-dark/10 shadow dark:hover:bg-surface/10 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3 w-full sm:w-auto">
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 sm:flex-none inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-semibold shadow-lg hover:brightness-95 transition"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {!isInCart(productId) ? (
                      <span>Add to Cart</span>
                    ) : (
                      <span>In Your Cart</span>
                    )}
                  </motion.button>

                  <button
                    className="ml-auto inline-flex items-center gap-2 px-3 py-3 rounded-2xl border border-border bg-white dark:bg-surface-dark text-text-primary hover:bg-error hover:text-white transition-colors"
                    aria-label="Add to wishlist"
                    title="Add to wishlist"
                    onClick={() => toggleFavorite(data)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInFavorites(productId) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Key specs grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-[var(--color-surface-dark)]/20 dark:bg-[var(--color-surface)]/10 border border-border">
                  <div className="text-xs text-text-secondary">Product ID</div>
                  <div className="font-medium text-text-primary">
                    {productId}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--color-surface-dark)]/20 dark:bg-[var(--color-surface)]/10 border border-border">
                  <div className="text-xs text-text-secondary">Category</div>
                  <div className="font-medium text-text-primary">
                    {category?.name ?? "—"}
                  </div>
                </div>

                {rest?.brand && (
                  <div className="p-4 rounded-xl bg-[var(--color-surface-dark)]/20 dark:bg-[var(--color-surface)]/10 border border-border">
                    <div className="text-xs text-text-secondary">Brand</div>
                    <div className="font-medium text-text-primary">
                      {rest.brand}
                    </div>
                  </div>
                )}

                {rest?.discountPercentage && (
                  <div className="p-4 rounded-xl bg-[var(--color-surface-dark)]/20 dark:bg-[var(--color-surface)]/10 border border-border">
                    <div className="text-xs text-text-secondary">Discount</div>
                    <div className="font-medium text-text-primary">
                      {rest.discountPercentage}%
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[85rem] mt-20 mx-auto rounded-2xl px-4 shadow sm:px-6 lg:px-8 py-12 bg-surface/50 dark:bg-surface-dark/50"
          aria-labelledby="related-products-title"
        >
          <h2
            id="related-products-title"
            className="text-2xl font-extrabold text-text-primary mb-8"
          >
            Related Products
          </h2>
          <Splide
            options={{
              perPage: 4,
              gap: "1rem",
              autoplay: true,
              interval: 3000,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              breakpoints: {
                1280: { perPage: 3 },
                768: { perPage: 2 },
                480: { perPage: 1 },
              },
            }}
            aria-label="Related Products"
          >
            {relatedProducts?.map((product) => (
              <SplideSlide key={product.id}>
                <ProductCard product={product} />
              </SplideSlide>
            ))}
          </Splide>
        </motion.section>
      )}
    </>
  );
}
