import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Link } from 'wouter';

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart">
      <a className="relative p-2 flex items-center">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </a>
    </Link>
  );
}