import { notFound } from "next/navigation";
import ProductDetails from "@/features/product/components/ProductDetails";
import { Suspense } from "react";
import ProductDetailsSkeleton from "@/features/product/components/ProductDetailsSkeleton";
import { getProduct } from "@/features/product/queries/get-product";
import { getProducts } from "@/features/product/queries/get-products";
import { makeRandomDelay } from "@/lib/api";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="h-auto w-auto">
      <ProductDetails product={product} />
    </div>
  );
}
