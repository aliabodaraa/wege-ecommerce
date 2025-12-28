"use client";

import { LucideKanban, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath } from "@/paths";
import { useState } from "react";
import { CartStore, useCartStore } from "@/lib/store/cartStore";
import CartSidebar from "@/features/cart/components/CartSidebar";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = useCartStore((state: CartStore) => state.getTotalItems());

  const navItems = (
    <>
      <Button
        aria-label="Open cart"
        variant="outline"
        size="icon"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </>
  );

  return (
    <>
      <nav
        className="
        animate-header-from-top
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
      >
        <div className="flex align-items gap-x-2">
          <Link
            href={homePath()}
            className={buttonVariants({ variant: "ghost" })}
          >
            <LucideKanban />
            <h1 className="text-lg font-semibold">TicketBounty</h1>
          </Link>
        </div>
        <div className="flex align-items gap-x-2">
          <ThemeSwitcher />
          {navItems}
        </div>
      </nav>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export { Header };
