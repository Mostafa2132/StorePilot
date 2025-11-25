import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { ShieldBanIcon } from "lucide-react";
import { Helmet } from "react-helmet";

export default function CategoryProducts() {
  const { catId } = useParams();
  // Fetch products by category ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", catId],
    queryFn: () =>
      fetch(
        `https://api.escuelajs.co/api/v1/categories/${catId}/products`
      ).then((res) => res.json()),
    staleTime: 1000 * 60 * 2,
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0)
    return (
      <NoDataFound
        title={"No Products Founed in this category"}
        icon={<ShieldBanIcon />}
        des={"We couldn’t find any products right now. Please try again later."}
      />
    );

  return (
    <>
      <Helmet>
        <title>StorePilot – {data[0]?.category?.name} Products </title>
      </Helmet>

      <div className="max-w-[85rem] mt-40 mx-auto rounded-2xl px-4 shadow   sm:px-6 lg:px-8 py-12 bg-surface/50 dark:bg-surface-dark/50  ">
        <h1 className="text-3xl text-center text-primary-dark mb-12 font-extrabold ">
          {data[0]?.category?.name} Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} showCart={true} />
          ))}
        </div>
      </div>
    </>
  );
}
