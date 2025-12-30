import ProductCard from "@/features/product/components/ProductCard";
import { Product } from "@/lib/types/product";
import { render, screen } from "@testing-library/react";

describe("Basic Component Tests", () => {
  const mockProduct: Product = {
    id: 1,
    title: "Coffee Mug",
    rating: { rate: 42.5, count: 120 },
    price: 15.99,
    image: "/mug.jpg",
    category: "Home",
    description: "A nice coffee mug",
  };

  test("ProductCard renders product information", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Coffee Mug")).toBeInTheDocument();

    expect(screen.getByText("$15.99")).toBeInTheDocument();

    expect(screen.getByAltText("Coffee Mug")).toBeInTheDocument();
  });
});
