import { motion } from "motion/react";
import { Layers, ShoppingBag, ArrowRight, Star } from "lucide-react";

export default function StaticSection1() {
  return (
    <section
      className="relative w-full py-28 mt-20 overflow-hidden 
      bg-surface dark:bg-surface-dark 
      rounded-[40px] shadow-xl"
    >
      {/* ==== Soft Background Glow ==== */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 left-10 w-72 h-72 
          bg-primary/15 dark:bg-primary/10 blur-[120px] rounded-full"
        ></div>

        <div
          className="absolute bottom-10 right-10 w-72 h-72 
          bg-accent/20 dark:bg-accent/10 blur-[140px] rounded-full"
        ></div>
      </div>

      <div
        className="relative z-10 container mx-auto px-8 max-w-6xl 
        grid md:grid-cols-2 gap-16 items-center"
      >
        {/* ==== Left Text Content ==== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-black/5 dark:bg-white/5 backdrop-blur-sm
            border border-white/10 text-text-secondary text-sm"
          >
            <Layers className="w-4 h-4 text-primary" />
            <span>Advanced Commerce Features</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
            Boost Your
            <span className="text-transparent bg-clip-text bg-gradient-text">
              {" "}
              Store Power{" "}
            </span>
            With Smart Systems
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
            Take your online business to the next level using intuitive tools,
            modern UI, and smooth motion interactions crafted for professional
            e-commerce platforms.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-xl bg-primary text-white font-semibold 
              shadow-lg hover:bg-primary-dark transition flex items-center gap-2"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-xl 
                bg-white dark:bg-surface-dark 
                border border-border font-semibold 
dark:border-slate-200 text-text-primary 
dark:text-text-primary hover:border-primary 
                transition flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              View Products
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">120+</div>
              <div className="text-sm text-text-secondary">Features</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-yellow-500">4.9</div>
              <div className="text-sm text-text-secondary">User Rating</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-text-secondary">Support</div>
            </div>
          </div>
        </motion.div>

        {/* ==== Right Visual Card ==== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-[90%] max-w-[420px] rounded-3xl 
              bg-white dark:bg-surface-dark p-8 shadow-xl 
              border border-border relative overflow-hidden"
          >
            <h4 className="font-semibold text-text-primary mb-6">
              Performance Overview
            </h4>

            <div className="space-y-4">
              <div className="h-3 rounded-full bg-border overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full"></div>
              </div>

              <div className="h-3 rounded-full bg-border overflow-hidden">
                <div className="h-full w-2/3 bg-secondary rounded-full"></div>
              </div>

              <div className="h-3 rounded-full bg-border overflow-hidden">
                <div className="h-full w-4/5 bg-accent rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-6 p-4 rounded-2xl 
              bg-primary text-white shadow-xl"
          >
            <Star className="w-7 h-7" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 p-4 rounded-2xl 
              bg-accent text-white shadow-xl"
          >
            <Layers className="w-7 h-7" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
