import Checkout from "@/components/sections/Checkout";

export const metadata = {
  title: "Checkout — LexMark",
  description: "Review your LexMark order, enter your delivery details and place your order securely.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <Checkout />;
}
