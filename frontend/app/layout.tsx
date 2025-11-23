import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Spice&Sweet - Premium Gourmet Spices, Nuts & Sweets",
  description: "Discover the finest gourmet spices, nuts, and sweets delivered to your door. Premium quality ingredients for your culinary adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <CartProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
