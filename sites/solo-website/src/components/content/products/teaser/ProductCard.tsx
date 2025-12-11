import { getFeaturedProducts } from "lib/data";
import { ProductCard } from "./_productCard";

export function Default() {
  const products = getFeaturedProducts(1);
  return <ProductCard product={products[0]} />;
}
