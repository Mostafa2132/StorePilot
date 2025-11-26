import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Star, HeartOff } from "lucide-react";
import { useCart } from "../../Context/CartProvider/CartProvider";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const {
    favorites,
    removeFromFavorites,
    clearFavorites,
    addToCart,
    isInCart,
  } = useCart();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
      transition: { duration: 0.3 },
    },
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get product image
  const getProductImage = (product) => {
    if (Array.isArray(product.images)) {
      return product.images[0] || product.images;
    }
    return product.images || product.image;
  };

  // Get rating
  const getRating = (product) => {
    if (product.rating) return product.rating;
    const stableValue = ((product.id * 0.1) % 1.5) + 3.5;
    return parseFloat(stableValue.toFixed(1));
  };

  // Empty wishlist state
  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center px-4 py-12"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-block"
          >
            <HeartOff className="w-32 h-32 text-text-secondary mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-text-secondary mb-8">
            Start adding products you love to your wishlist and never lose track
            of them!
          </p>
          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            <Heart className="w-5 h-5" />
            Discover Products
          </motion.a>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>StorePilot – Your WishList</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-4 py-12 mt-28"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2 flex items-center gap-3">
                <Heart className="w-10 h-10 text-error fill-current" />
                My Wishlist
              </h1>
              <p className="text-text-secondary">
                You have {favorites.length}{" "}
                {favorites.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            {/* Clear Wishlist Button */}
            {favorites.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFavorites}
                className="flex items-center gap-2 px-5 py-3 border-2 border-error text-error rounded-xl font-semibold hover:bg-error hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </motion.button>
            )}
          </motion.div>

          {/* Wishlist Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {favorites.map((product) => {
                const rating = getRating(product);
                const productImage = getProductImage(product);

                return (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    exit="exit"
                    className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                  >
                    {/* Product Image */}
                    <div className="relative w-full aspect-square bg-surface-dark overflow-hidden">
                      <motion.img
                        src={productImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        whileHover={{ scale: 1.1 }}
                      />

                      {/* Overlay Buttons */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        {/* Add to Cart Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(product)}
                          className={`p-3 rounded-full shadow-lg transition-colors ${
                            isInCart(product.id)
                              ? "bg-accent text-white"
                              : "bg-white text-primary hover:bg-primary hover:text-white"
                          }`}
                          title="Add to cart"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </motion.button>

                        {/* Remove from Wishlist */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromFavorites(product.id)}
                          className="p-3 bg-error text-white rounded-full shadow-lg hover:bg-error/90 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Sale Badge */}
                      {product.price < 50 && (
                        <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
                          Sale
                        </div>
                      )}

                      {/* Favorite Badge */}
                      <div className="absolute top-3 right-3 bg-error text-white p-2 rounded-full shadow-lg z-10">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      {/* Category */}
                      {product.category && (
                        <span className="text-xs text-text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {product.category.name}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-text-primary mt-3 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(rating)
                                  ? "fill-warning text-warning"
                                  : "fill-none text-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-text-secondary ml-1">
                          ({rating})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.price > 100 && (
                            <span className="text-sm text-text-secondary line-through">
                              {formatPrice(product.price * 1.2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart(product)}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors ${
                            isInCart(product.id)
                              ? "bg-accent text-white"
                              : "bg-primary text-white hover:bg-primary-dark"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">
                            {isInCart(product.id) ? "In Cart" : "Add"}
                          </span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromFavorites(product.id)}
                          className="p-3 bg-surface border-2 border-error text-error rounded-xl hover:bg-error hover:text-white transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-surface border border-border rounded-2xl"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  Love everything you see?
                </h3>
                <p className="text-text-secondary">
                  Add all items to your cart and checkout faster
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  favorites.forEach((product) => addToCart(product));
                }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
              >
                <ShoppingCart className="w-5 h-5" />
                Add All to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
