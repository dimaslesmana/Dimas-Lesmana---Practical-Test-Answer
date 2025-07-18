// components/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menu = [
    { label: "Home", href: "/home" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Order Status", href: "/order" },
    { label: "Distributors", href: "/distributors" },
    { label: "Upload", href: "/upload" },
  ];

  if (!user) return null;

  return (
    <header className="bg-amber-900 text-white px-6 py-4 shadow">
      <h1 className="text-3xl font-bold">Coffee Valley</h1>
      <nav className="mt-3 flex flex-wrap gap-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`underline-offset-4 ${
              pathname === item.href ? "underline" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button onClick={logout} className="ml-auto underline text-red-200">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
