import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../Context/CartProvider/CartProvider";

/**
 * ProductCard Component with smooth animations
 */
export default function ProductCard({
  product,
  showWishlist = true,
  showCart = true,
}) {
  const { addToCart, isInCart, toggleFavorite, isInFavorites } = useCart();

  // Get product image
  const getProductImage = () => {
    if (Array.isArray(product.images)) {
      return product.images[0] || product.images;
    }
    return product.images || product.image;
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Get rating
  const rating = useMemo(() => {
    if (product.rating) return product.rating;
    const stableValue = ((product.id * 0.1) % 1.5) + 3.5;
    return parseFloat(stableValue.toFixed(1));
  }, [product.rating, product.id]);

  const productImage = getProductImage();

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-surface-dark overflow-hidden group">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <motion.img
            src={productImage}
            alt={product.title}
            variants={imageVariants}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badge - Sale */}
        {product.price < 50 && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10"
          >
            Sale
          </motion.div>
        )}

        {/* Wishlist Button */}
        {showWishlist && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(product)}
            className={`absolute top-3 right-3 p-2 rounded-full border transition-all z-10 ${
              isInFavorites(product.id)
                ? "bg-error border-error text-white shadow-lg"
                : "bg-background/90 border-border text-text-primary hover:bg-error hover:border-error hover:text-white"
            }`}
          >
            <motion.div
              animate={
                isInFavorites(product.id)
                  ? { scale: [1, 1.3, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 ${
                  isInFavorites(product.id) ? "fill-current" : ""
                }`}
              />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Product Info */}
      <motion.div variants={contentVariants} className="p-5">
        {/* Category */}
        {product.category && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to={`/category/${product.category.id}`}
              className="text-xs text-text-primary bg-primary p-1 rounded-2xl hover:text-fuchsia-800 transition-colors mb-2 inline-block"
            >
              {product.category.name}
            </Link>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-colors line-clamp-1 mb-2">
              {product.title}
            </h3>
          </Link>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1 mb-4"
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <Star
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-warning text-warning"
                      : "fill-none text-border"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-1">({rating})</span>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-4"
        >
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
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3">
          {showCart && (
            <motion.button
              variants={buttonVariants}
              custom={0}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product)}
              className={` ${
                isInCart(product.id)
                  ? "bg-accent text-white hover:bg-accent-dark"
                 : " bg-primary text-white  hover:bg-primary-dark"
              } w-full flex items-center justify-center gap-2 rounded-xl font-semibold cursor-pointer px-4 py-3  transition-colors`}
            >
              <ShoppingCart className="w-5 h-5" />
              {!isInCart(product.id) ? (
                <span>Add to Cart</span>
              ) : (
                <span>In Your Cart</span>
              )}
            </motion.button>
          )}

          <motion.div variants={buttonVariants} custom={1} className="w-full">
            <Link
              to={`/product/${product.id}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface border-2 border-border rounded-xl font-semibold text-text-primary hover:border-primary hover:text-primary transition-colors group"
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
