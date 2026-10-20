import { Poppins, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const logoFont = Playfair_Display({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata = {
  title: "LexMark",
  description:
    "LexMark is an industrial design store and blog for headphones, earbuds and speakers. Discover the best audio brands and be inspired.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${logoFont.variable} h-full`}
    >
      <body
        className="flex min-h-full flex-col bg-paper text-ink"
        suppressHydrationWarning
      >
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
        </StoreProvider>
      </body>
    </html>
  );
}
