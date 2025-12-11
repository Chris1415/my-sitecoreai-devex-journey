import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../ui/button";
import { getFeaturedProducts } from "../../../../lib/data";
import { ProductCard } from "../teaser/_productCard";

export function Tiles() {
  const products = getFeaturedProducts(3);

  if (products.length === 0) return null;

  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              Official Sitecore Merchandise
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Show your Sitecore pride with our exclusive community merchandise.
              Premium quality apparel and accessories for developers, marketers,
              and digital experience enthusiasts.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
