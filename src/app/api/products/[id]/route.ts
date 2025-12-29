import { NextResponse } from "next/server";
import products from "@/lib/data/products.json";
import { makeRandomDelay, headers } from "@/lib/api";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await makeRandomDelay();
  const { id } = await params;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product, { headers });
}
