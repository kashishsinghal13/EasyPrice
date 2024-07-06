import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { fetchAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import { Product } from "@/types";



const Home = async () => {
  
    const products: Product[] = await fetchAllProducts();
    return (
      <>
        <MainSection />
        <TrendingSection products={products} />
      </>
    );
};

const MainSection = () => (
  <section className="px-6 md:px-20">
    <div className="flex max-xl:flex-col gap-10">
      <div className="flex flex-col justify-center">
        <p className="small-text">
          Empower Your Commerce. Elevate Your Business:
        </p>
        <h1 className="head-text">
          Elevate Shopping with <span className="text-primary">EasyPrice </span>
        </h1>

        <p className="mt-6">
          Empower your e-commerce with our innovative and intuitive insights.
          Unleash the power of data to seamlessly convert, engage, and retain your customers.
        </p>

        <Searchbar />
      </div>
    </div>
  </section>
);

const TrendingSection = ({ products }: { products: Product[] }) => (
  <section className="trending-section">
    <h2 className="section-text">Trending</h2>

    <div className="flex flex-wrap gap-x-8 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </section>
);

export default Home;