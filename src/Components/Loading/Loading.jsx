import { Loader2 } from "lucide-react";

/**
 * Loading Component
 * 
 * A professional loading component with multiple animation styles.
 * 
 * @param {string} type - Type of loading animation: 'spinner' | 'skeleton' | 'dots' | 'pulse' (default: 'spinner')
 * @param {string} size - Size of the loader: 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} message - Optional loading message to display
 * @param {boolean} fullScreen - Whether to display as full screen overlay (default: false)
 * 
 * @example
 * <Loading type="spinner" size="lg" message="Loading products..." />
 * <Loading type="skeleton" />
 * <Loading type="dots" fullScreen />
 */
export default function Loading({ 
  type = 'spinner', 
  size = 'md', 
  message = null,
  fullScreen = false 
}) {
  // Size configurations
  const sizeConfig = {
    sm: { spinner: 'w-4 h-4', dots: 'w-1 h-1', text: 'text-sm' },
    md: { spinner: 'w-8 h-8', dots: 'w-2 h-2', text: 'text-base' },
    lg: { spinner: 'w-12 h-12', dots: 'w-3 h-3', text: 'text-lg' },
  };

  const currentSize = sizeConfig[size];

  // Spinner Loading
  if (type === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : 'py-12'}`}>
        <div className="relative">
          <Loader2 className={`${currentSize.spinner} text-primary animate-spin`} />
          <div className={`absolute inset-0 ${currentSize.spinner} border-4 border-primary/20 rounded-full`}></div>
        </div>
        {message && (
          <p className={`${currentSize.text} text-text-secondary font-medium`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Dots Loading
  if (type === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : 'py-12'}`}>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${currentSize.dots} bg-primary rounded-full animate-bounce`}
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </div>
        {message && (
          <p className={`${currentSize.text} text-text-secondary font-medium`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Pulse Loading
  if (type === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : 'py-12'}`}>
        <div className={`${currentSize.spinner} bg-gradient-primary rounded-full animate-pulse`}></div>
        {message && (
          <p className={`${currentSize.text} text-text-secondary font-medium animate-pulse`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Skeleton Loading (for cards/grids)
  if (type === 'skeleton') {
    return (
      <div className={`${fullScreen ? 'fixed inset-0 bg-background z-50 overflow-auto' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
              {/* Image Skeleton */}
              <div className="w-full aspect-square bg-surface-dark"></div>
              
              {/* Content Skeleton */}
              <div className="p-5 space-y-4">
                {/* Category */}
                <div className="h-3 w-20 bg-surface-dark rounded"></div>
                
                {/* Title */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-surface-dark rounded"></div>
                  <div className="h-4 w-3/4 bg-surface-dark rounded"></div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 bg-surface-dark rounded"></div>
                </div>
                
                {/* Price */}
                <div className="h-8 w-32 bg-surface-dark rounded"></div>
                
                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="h-12 w-full bg-surface-dark rounded-xl"></div>
                  <div className="h-12 w-full bg-surface-dark rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50' : 'py-12'}`}>
      <Loader2 className={`${currentSize.spinner} text-primary animate-spin`} />
    </div>
  );
}
