import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  PackageX,
} from "lucide-react";
import { useCart } from "../../Context/CartProvider/CartProvider";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: 100,
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

  // Empty cart state
  if (cart.length === 0) {
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
            <PackageX className="w-32 h-32 text-text-secondary mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-text-secondary mb-8">
            Looks like you haven't added any items to your cart yet. Start
            shopping now!
          </p>
          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </motion.a>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>StorePilot – Your Cart</title>
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
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Shopping Cart
            </h1>
            <p className="text-text-secondary">
              You have {getCartCount()}{" "}
              {getCartCount() === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Cart Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    exit="exit"
                    className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-32 h-32 bg-surface-dark rounded-xl overflow-hidden"
                      >
                        <img
                          src={getProductImage(item)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
                              {item.title}
                            </h3>
                            {item.category && (
                              <span className="text-xs text-text-secondary bg-primary/10 px-2 py-1 rounded-full">
                                {item.category.name}
                              </span>
                            )}
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-text-secondary">
                              Qty:
                            </span>
                            <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                              <motion.button
                                whileHover={{
                                  backgroundColor:
                                    "rgba(var(--color-primary-rgb), 0.1)",
                                }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => decreaseQuantity(item.id)}
                                className="px-3 py-2 hover:bg-surface-dark/40 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus
                                  className={`w-4 ${
                                    item.quantity == 1
                                      ? "cursor-not-allowed"
                                      : "cursor-pointer"
                                  } h-4 `}
                                />
                              </motion.button>
                              <div className="px-4 py-2 text-sm font-medium text-text-primary min-w-[3rem] text-center">
                                {item.quantity}
                              </div>
                              <motion.button
                                whileHover={{
                                  backgroundColor:
                                    "rgba(var(--color-primary-rgb), 0.1)",
                                }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => increaseQuantity(item.id)}
                                className="px-3 py-2 hover:bg-surface-dark/40 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 cursor-pointer h-4" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-text-secondary">
                              {formatPrice(item.price)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="w-full py-3 border-2 border-error text-error rounded-xl font-semibold hover:bg-error hover:text-white transition-colors"
              >
                Clear Cart
              </motion.button>
            </motion.div>

            {/* Right Side - Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-lg font-semibold text-text-primary">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="text-lg font-semibold text-accent">
                      Free
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Tax (10%)</span>
                    <span className="text-lg font-semibold text-text-primary">
                      {formatPrice(getCartTotal() * 0.1)}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-text-primary">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(getCartTotal() * 1.1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-primary-dark transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Continue Shopping */}
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-3 bg-surface border-2 border-border text-text-primary rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Continue Shopping
                </motion.a>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <p className="text-sm text-text-secondary text-center">
                    <span className="font-semibold text-accent">
                      Free shipping
                    </span>{" "}
                    on orders over $50
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
