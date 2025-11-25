import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Headphones,
  Globe,
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Contact info
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@yourstore.com",
      subDetails: "info@yourstore.com",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "Mon-Fri 9am-6pm EST",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Street",
      subDetails: "New York, NY 10001",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  // Features
  const features = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here whenever you need us",
    },
    {
      icon: MessageSquare,
      title: "Quick Response",
      description: "Average response time: 2 hours",
    },
    {
      icon: Globe,
      title: "Worldwide",
      description: "Supporting customers globally",
    },
  ];

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>StorePilot – Contact</title>
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-accent"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="py-16 px-4 -mt-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-surface border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 ${info.bg} rounded-xl mb-4`}
                  >
                    <info.icon className={`w-7 h-7 ${info.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {info.title}
                  </h3>
                  <p className="text-text-primary font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {info.subDetails}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-text-primary mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Fill out the form below and we'll get back to you shortly
                  </p>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-primary"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-primary"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-text-primary"
                        placeholder="How can we help?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-text-primary"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Right Side - Info & Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Why Contact Us */}
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Why Contact Us?
                  </h2>
                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-text-primary mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-text-secondary text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Store Location"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-text-primary mb-2">
                      Visit Our Office
                    </h3>
                    <p className="text-text-secondary text-sm">
                      123 Business Street, New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Need Quick Help?</h3>
                  <p className="mb-6 text-white/90">
                    Check out our FAQ or chat with our support team
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors"
                    >
                      Visit FAQ
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary transition-all"
                    >
                      Live Chat
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="py-16 px-4 bg-surface">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary mb-8">
                Find quick answers to common questions
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    q: "What are your shipping times?",
                    a: "We ship within 24 hours. Standard delivery takes 3-5 business days.",
                  },
                  {
                    q: "Do you offer international shipping?",
                    a: "Yes! We ship to over 100 countries worldwide.",
                  },
                  {
                    q: "What's your return policy?",
                    a: "30-day hassle-free returns on all products.",
                  },
                  {
                    q: "How can I track my order?",
                    a: "You'll receive a tracking number via email once shipped.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background border border-border rounded-xl p-6"
                  >
                    <h3 className="font-bold text-text-primary mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-text-secondary text-sm">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
