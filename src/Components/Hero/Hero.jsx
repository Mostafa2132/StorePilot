import { ArrowRight, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.06] dark:opacity-[0.1]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 dark:opacity-35 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 dark:opacity-35 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 dark:opacity-35 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-text-secondary text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Modern E-Commerce Solution</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-text-primary">
                Transform Your
              </span>
              <br />
              <span className="text-gradient-text">
                Store Experience
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover the future of online shopping with our cutting-edge platform. 
              Fast, secure, and designed for success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-primary text-text-primary rounded-xl font-semibold text-lg shadow-lg dark:shadow-[0_10px_30px_rgba(129,140,248,0.4)] hover:shadow-xl dark:hover:shadow-[0_15px_40px_rgba(129,140,248,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-surface text-text-primary rounded-xl font-semibold text-lg border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Store</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-text-secondary mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-sm text-text-secondary mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-sm text-text-secondary mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-surface rounded-3xl p-8 shadow-2xl dark:shadow-[0_20px_50px_rgba(15,23,42,0.8)] border border-border transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-surface-dark flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">Sales Growth</div>
                      <div className="text-sm text-text-secondary">Last 30 days</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-3 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full w-3/4"></div>
                    </div>
                    <div className="h-3 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full w-2/3"></div>
                    </div>
                    <div className="h-3 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-primary text-white rounded-2xl p-4 shadow-lg dark:shadow-[0_10px_30px_rgba(129,140,248,0.3)] animate-float">
                <ShoppingBag className="w-8 h-8" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl p-4 shadow-lg dark:shadow-[0_10px_30px_rgba(52,211,153,0.3)] animate-float animation-delay-2000">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-light dark:border-text-secondary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-light dark:bg-text-secondary rounded-full mt-2"></div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
