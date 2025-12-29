"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "@/features/product/components/ui/ProductImage";
import QuantityControls from "./QuantityControls";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const handleCheckout = () => {
    onClose();
    router.push("/cart");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6" />
            <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
            <Badge variant="secondary" className="text-sm">
              {getTotalItems()} items
            </Badge>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
            <div className="rounded-full bg-muted p-6 mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart
            </p>
            <Button onClick={onClose} size="lg">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0flex-shrink-0 w-24 h-24">
                          <ProductImage
                            src={item.image}
                            alt={item.title}
                            className={`w-10 h-10 object-cover group-hover:scale-105 transition-transform duration-300`}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col min-w-0">
                          <div className="flex justify-between">
                            <div className="min-w-0">
                              <h4 className="font-medium truncate">
                                {item.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <p className="font-bold">
                              ${item.price.toFixed(2)}
                            </p>

                            <QuantityControls
                              quantity={item.quantity}
                              isMinusDisabled={item.quantity <= 1}
                              onMinusClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              onPlusClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col sm:flex-col gap-4 mt-6">
              <div className="w-full space-y-4">
                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button onClick={handleCheckout} size="lg">
                    Checkout
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
