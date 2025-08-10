//Purpose: Mobile bottom nav with Home, Search, Cart
//visible on small screens;hidden on md+
//uses lucide icons;subtle elevation and safe-area padding.

import React from "react";
import { Home, Search, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Item = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center flex-1 py-2 rounded-xl transition-transform active:scale-95 ${
        active ? "text-primary" : "text-foreground/70"
      }`}
      aria-current={active ? `page` : undefined}
    >
      <Icon size={20} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default function BottomNav() {
  return (
    <nav className="md:hidden sticky bottom-0 safe-area-inline safe-area-block bg-background/95 backdrop-blur shadow-soft border-t border-border">
      <div className="mx-auto max-w-6xl px-3 py-1 flex items-center gap-2">
        <Item to="/" icon={Home} label="Home" />
        <Item to="" icon={Search} label="Search" />
        <Item to="/cart" icon={ShoppingCart} label="Cart" />
      </div>
    </nav>
  );
}
