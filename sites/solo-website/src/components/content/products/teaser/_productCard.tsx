import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import type { Product } from "../../../../lib/data";
import { formatPrice } from "../../../../lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const showLowStockWarning = product.inStock && product.stock <= 10;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <Badge className="absolute right-2 top-2 bg-destructive text-destructive-foreground">
              Out of Stock
            </Badge>
          )}
          {showLowStockWarning && (
            <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground">
              <AlertCircle className="mr-1 h-3 w-3" />
              Only {product.stock} left
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            disabled={!product.inStock}
            className="group/btn transition-transform duration-200 hover:scale-[1.02] [&:not(:disabled)]:active:scale-[0.98]"
          >
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-200 group-hover/btn:scale-110" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
