import { useQuery } from "@tanstack/react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle, ShieldBanIcon } from "lucide-react";
import "@splidejs/react-splide/css";
import Loading from "../Loading/Loading";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function FetchCategiers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  // Helper function to get first letter
  const getFirstLetter = (name) => {
    return name?.charAt(0)?.toUpperCase() || "?";
  };

  // Helper function to check if image is valid
  const isValidImage = (imageUrl) => {
    return (
      imageUrl &&
      imageUrl !== "" &&
      imageUrl !== "null" &&
      imageUrl !== "undefined"
    );
  };
  if (isLoading)
    return (
      <Loading
        type="spinner"
        size="lg"
        message="Loading categories..."
        fullScreen
      />
    );

  if (isError) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-error" />
          <p className="text-text-primary text-lg font-semibold">
            Error loading categories
          </p>
          <p className="text-text-secondary">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0)
    return (
      <NoDataFound
        title={"No Category Founed"}
        icon={<ShieldBanIcon />}
        des={"We couldn’t find any Category right now. Please try again later."}
      />
    );

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            Shop by Category
          </h2>
          <p className="text-text-secondary">
            Explore our wide range of products
          </p>
        </div>
        <Link className="hidden md:flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-medium">
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Slider */}
      <Splide
        options={{
          perPage: 6,
          gap: "1.5rem",
          pagination: false,
          arrows: false,
          breakpoints: {
            1536: {
              perPage: 6,
            },
            1280: {
              perPage: 5,
            },
            1024: {
              perPage: 4,
            },
            768: {
              perPage: 3,
            },
            640: {
              perPage: 2,
              gap: "1rem",
            },
          },
          loop: true,
          autoplay: false,
          type: "slide",
        }}
        className="categories-slider"
      >
        {data.map((category) => (
          <SplideSlide className="py-5" key={category.id}>
            <Link to={`/category/${category.id}`} className="group block">
              <div className="relative bg-surface border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
                {/* Image or Initial */}
                <div className="relative mb-4">
                  {isValidImage(category.image) ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-dark border-2 border-border group-hover:border-primary transition-colors">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initial if image fails to load
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full hidden items-center justify-center bg-gradient-primary text-white text-3xl font-bold">
                        {getFirstLetter(category.name)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-primary text-white text-3xl font-bold shadow-lg">
                      {getFirstLetter(category.name)}
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {category.name}
                </h3>

                {/* Hover Indicator */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-primary text-sm font-medium">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>

      {/* Mobile View All Button */}
      <div className="mt-6 md:hidden text-center">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border rounded-xl text-text-primary hover:bg-surface-dark hover:border-primary transition-colors font-medium"
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
