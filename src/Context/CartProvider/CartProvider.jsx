import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { userContext } from "../UserContext/UserContext";

// إنشاء الـ Context
const CartContext = createContext();

// Hook مخصص لاستخدام الـ Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
const {token} = useContext(userContext)

  // تحميل البيانات من localStorage عند بداية التشغيل
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem("cart");
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites:", error);
        localStorage.removeItem("favorites");
      }
    }

    setIsLoaded(true);
  }, []);

  // حفظ السلة في localStorage عند أي تغيير (بعد التحميل الأولي)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // حفظ المفضلات في localStorage عند أي تغيير (بعد التحميل الأولي)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  // إضافة منتج للسلة
  const addToCart = (product, quantity = 1) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.success("Product added to cart successfully! 🛒");
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        toast.info("Product quantity increased successfully! 📈");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // حذف منتج من السلة
  const removeFromCart = (productId) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.warning("Product removed from cart! 🗑️");
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // تحديث كمية منتج في السلة
  const updateQuantity = (productId, quantity) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // زيادة الكمية
  const increaseQuantity = (productId) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.info("Product Quantity increased");
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // تقليل الكمية
  const decreaseQuantity = (productId) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    setCart((prevCart) => {
    //   const item = prevCart.find((i) => i.id === productId);
    //   if (item && item.quantity === 1) {
    //     toast.warning("Product removed from cart! 🗑️");
    //   }
      return prevCart
        .map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // مسح السلة بالكامل
  const clearCart = () => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.warning("Your cart has been cleared! 🧹");
    setCart([]);
  };

  // التحقق من وجود منتج في السلة
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // الحصول على كمية منتج معين
  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // حساب إجمالي السلة
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // حساب عدد المنتجات في السلة
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // إضافة منتج للمفضلات
  const addToFavorites = (product) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.success("Added to favorites! ❤️");
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === product.id);
      if (exists) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  };

  // حذف منتج من المفضلات
  const removeFromFavorites = (productId) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.warning("Removed from favorites! 💔");
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  // التبديل بين الإضافة والحذف من المفضلات
  const toggleFavorite = (product) => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    const exists = favorites.find((item) => item.id === product.id);
    if (exists) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
const getFavCount = () => {
  return favorites.length;
};

  // التحقق من وجود منتج في المفضلات
  const isInFavorites = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  // مسح المفضلات بالكامل
  const clearFavorites = () => {
if(!token) return toast.warning("You need to login first ! 🤦‍♀️")
    toast.warning("All favorites have been cleared! 🧹");
    setFavorites([]);
  };

  const value = {
    // البيانات
    cart,
    favorites,

    // وظائف السلة
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getCartTotal,
    getCartCount,

    // وظائف المفضلات
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isInFavorites,
    clearFavorites,
getFavCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
