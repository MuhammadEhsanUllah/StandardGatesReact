import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gates", label: "Gates" },
  { href: "/fences", label: "Fences" },
  { href: "/features", label: "Features" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [location] = useLocation();
  const [cartItems] = useState(0);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-heading text-primary">SecureGates</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "font-heading text-slate-800 hover:text-primary transition-all font-medium",
                  location === item.href && "text-primary"
                )}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/gates">
              <Button className="hidden md:block">
                Get Started
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative text-slate-800 hover:text-primary transition-all">
              <ShoppingCart className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full text-xs text-white flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col mt-8 space-y-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a className={cn(
                        "font-heading text-slate-800 hover:text-primary transition-all font-medium px-3 py-2 rounded-md",
                        location === item.href && "bg-slate-100 text-primary"
                      )}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/gates">
                    <Button className="w-full mt-4">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
