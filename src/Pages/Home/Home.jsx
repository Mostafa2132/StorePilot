import Marquee from "react-fast-marquee";
import FetchCategiers from "../../Components/FetchCategiers/FetchCategiers";
import Hero from "../../Components/Hero/Hero";
import FetchProducts from "../../Components/FetchProducts/FetchProducts";
import StaticSection1 from "../../Components/StaticSection1/StaticSection1";
import { Helmet } from "react-helmet";
import FlashSale from "../../Components/FlashSale/FlashSale";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>StorePilot – Smart Shopping & Product Finder</title>
      </Helmet>

      <Hero />
      <div className="mt-20 w-full">
        <Marquee
          className="bg-primary-dark text-white py-4"
          gradient={false}
          speed={50}
          pauseOnHover={true}
          direction="rtl"
        >
          <span className="mx-8 text-lg font-semibold">
            Welcome to StorePilot - Your One-Stop Shop for Everything! 🛒
          </span>
          <span className="mx-8 text-lg font-semibold">
            Discover Amazing Deals and Discounts Daily! 💸
          </span>
          <span className="mx-8 text-lg font-semibold">
            Quality Products Handpicked Just for You! 🌟
          </span>
          <span className="mx-8 text-lg font-semibold">
            Shop with Confidence - Secure Payments Guaranteed! 🔒
          </span>
        </Marquee>
      </div>
      <div className="max-w-[85rem] mx-auto mt-20 px-4 md:px-6 lg:px-8">
        <FetchCategiers />
      </div>

      <div className=" mx-auto mt-20 px-4 md:px-6 lg:px-8">
        <FlashSale />
      </div>


      <div className="mt-20 w-full">
        <Marquee
          className="bg-primary-dark text-white py-4"
          gradient={false}
          speed={50}
          pauseOnHover={true}
        >
          <span className="mx-8 text-lg font-semibold">
            Free Shipping on Orders Over $50! 🎉
          </span>
          <span className="mx-8 text-lg font-semibold">
            24/7 Customer Support Available! 🎶
          </span>
          <span className="mx-8 text-lg font-semibold">
            30-Day Money-Back Guarantee!
          </span>
          <span className="mx-8 text-lg font-semibold">
            Exclusive Deals for Newsletter Subscribers!
          </span>
          <span className="mx-8 text-lg font-semibold">
            New Arrivals Added Weekly!
          </span>
        </Marquee>
      </div>
      <div className="max-w-[85rem] mx-auto mt-20 px-4 md:px-6 lg:px-8">
        <FetchProducts />
        <StaticSection1 />
      </div>
    </>
  );
}
