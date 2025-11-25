import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import {
  AlertCircle,
  Zap,
  Clock,
  TrendingUp,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function FlashSale() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

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

  // Get sale products (products with price < 100)
  const saleData = data?.filter((product) => product.price < 100).slice(0, 12) || [];

  if (saleData.length === 0) return null;

  // Timer box component
  const TimerBox = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-surface-dark rounded-xl p-3 sm:p-4 shadow-lg min-w-[60px] sm:min-w-[80px]"
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl sm:text-4xl font-bold text-primary text-center"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-xs sm:text-sm text-text-secondary text-center mt-1">
        {label}
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 px-4 bg-gradient-to- shadow rounded-2xl from-accent/5 via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          {/* Flash Sale Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-error rounded-full text-white font-semibold mb-4 shadow-lg"
          >
            <Flame className="w-5 h-5 animate-pulse" />
            <span>FLASH SALE</span>
            <Zap className="w-5 h-5 animate-pulse" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            🔥 Hot Deals Today!
          </h2>
          <p className="text-text-secondary text-lg mb-6">
            Limited time offers - Don't miss out!
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-text-primary">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-semibold">Hurry! Sale ends in:</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <TimerBox value={timeLeft.hours} label="Hours" />
              <span className="text-2xl sm:text-4xl font-bold text-text-primary">:</span>
              <TimerBox value={timeLeft.minutes} label="Minutes" />
              <span className="text-2xl sm:text-4xl font-bold text-text-primary">:</span>
              <TimerBox value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-text-secondary">
                <span className="font-bold text-text-primary">50%</span> Off
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-text-secondary">
                <span className="font-bold text-text-primary">{saleData.length}</span> Items
              </span>
            </div>
          </div>
        </motion.div>

        {/* Products Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Splide
            options={{
              type: "loop",
              perPage: 4,
              perMove: 1,
              gap: "1.5rem",
              autoplay: true,
              interval: 3000,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              breakpoints: {
                1280: { perPage: 3 },
                1024: { perPage: 2 },
                640: { perPage: 1 },
              },
            }}
            aria-label="Flash Sale Products"
          >
            {saleData.map((product) => (
              <SplideSlide key={product.id}>
                <div className="relative">
              
                  <ProductCard product={product} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <motion.a
            // href="/products?filter=sale"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-error text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Limited Time Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              Limited stock available - First come, first served!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}