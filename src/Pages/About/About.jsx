import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import {
  ShoppingBag,
  Users,
  Award,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Globe,
  Target,
  Rocket,
  Star,
  Check,
} from "lucide-react";
import { teamMembers, testimonials, values } from "../../Data/Data";
import { Helmet } from "react-helmet";

export default function About() {
  // Stats
  const stats = [
    { icon: Users, value: "500K+", label: "Happy Customers" },
    { icon: ShoppingBag, value: "1M+", label: "Products Sold" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Globe, value: "100+", label: "Countries Served" },
  ];

  // Features
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Bank-level security for all transactions",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Lightning-fast shipping worldwide",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "24/7 support that actually cares",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      icon: Target,
      title: "Quality First",
      description: "Handpicked products, guaranteed quality",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: TrendingUp,
      title: "Best Prices",
      description: "Competitive pricing, maximum value",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Always improving, always evolving",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <>
      <Helmet>
        <title>StorePilot – About</title>
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Building the Future of{" "}
              <span className="text-accent">E-Commerce</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              Connecting millions of shoppers with their perfect products since
              2020
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:scale-105 transition-transform">
                Our Story
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-primary transition-all">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-text-primary mb-6">
                  Our Story
                </h2>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  Founded in 2020, we started with a simple mission: make online
                  shopping better for everyone. What began as a small startup
                  has grown into a thriving marketplace serving customers
                  worldwide.
                </p>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  We believe shopping should be easy, enjoyable, and accessible.
                  That's why we've built a platform that combines cutting-edge
                  technology with genuine human care.
                </p>
                <div className="space-y-3">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {value.title}
                        </h3>
                        <p className="text-text-secondary">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-surface">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Why Choose Us
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                We're not just another online store. Here's what makes us
                different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-background border border-border rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${feature.bg} rounded-2xl mb-6`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Slider */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Meet Our Team
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                The passionate people behind our success
              </p>
            </motion.div>

            <Splide
              options={{
                type: "loop",
                perPage: 4,
                perMove: 1,
                gap: "2rem",
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
            >
              {teamMembers.map((member) => (
                <SplideSlide key={member.id}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                What Our Customers Say
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Real stories from real customers
              </p>
            </motion.div>

            <Splide
              options={{
                type: "loop",
                perPage: 3,
                perMove: 1,
                gap: "2rem",
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                arrows: false,
                pagination: false,
                breakpoints: {
                  1024: { perPage: 2 },
                  640: { perPage: 1 },
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <SplideSlide key={testimonial.id}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-surface border border-border rounded-2xl p-8 shadow-lg h-full"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-warning text-warning"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </motion.div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-accent rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of happy customers and discover amazing products
              today
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Shop Now
            </motion.button>
          </motion.div>
        </section>
      </div>
    </>
  );
}
