"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, CreditCard, Lock, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import { useStore } from "@/context/StoreContext";
import { cn, formatPrice, parsePrice } from "@/lib/utils";

const TAX_RATE = 0.08;
const FREE_SHIPPING_OVER = 100;

const shippingOptions = [
  { id: "standard", label: "Standard", eta: "4–6 business days", cost: 5 },
  { id: "express", label: "Express", eta: "1–2 business days", cost: 15 },
];

const field =
  "h-11 w-full border border-line bg-white px-3 text-sm outline-none transition-colors placeholder:text-slate focus:border-ink";
const labelStyle = "mb-1.5 block text-[11px] font-medium";

function Field({ label, id, className, ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelStyle}>{label}</label>
      <input id={id} name={id} className={field} {...props} />
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <fieldset className="border border-line p-5 sm:p-7">
      <legend className="-ml-1 flex items-center gap-3 bg-white px-1 text-sm font-semibold">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] text-white">{number}</span>
        {title}
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
function createOrderNumber() {
  return `LM-${Math.floor(100000 + Math.random() * 900000)}`;
}
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

export default function Checkout() {
  const { items, hydrated, subtotal, setQty, clearCart } = useStore();
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [order, setOrder] = useState(null);

  const shippingOption = shippingOptions.find((o) => o.id === shipping);
  const shippingCost = subtotal >= FREE_SHIPPING_OVER && shipping === "standard" ? 0 : shippingOption.cost;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setOrder({
      number: createOrderNumber(),
      email: data.get("email"),
      name: data.get("firstName"),
      total,
      count: items.reduce((n, i) => n + i.qty, 0),
      eta: shippingOption.eta,
    });
    clearCart();
    window.scrollTo({ top: 0 });
  };

  if (order) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-lg text-center">
          <div className="animate-fade-up mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white">
            <Check size={28} />
          </div>
          <h1 className="animate-fade-up mt-6 text-3xl font-medium tracking-tight [animation-delay:100ms]">
            Thank you, {order.name}!
          </h1>
          <p className="animate-fade-up mt-3 text-sm text-muted [animation-delay:200ms]">
            Your order <span className="font-semibold text-ink">{order.number}</span> is confirmed. A receipt was sent
            to {order.email}.
          </p>
          <dl className="animate-fade-up mt-8 grid grid-cols-3 gap-px bg-line text-xs [animation-delay:300ms]">
            {[
              ["Items", order.count],
              ["Total", formatPrice(order.total)],
              ["Delivery", order.eta],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-3 py-4">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/"
            className="mt-8 inline-block border border-ink bg-ink px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-white hover:text-ink"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  if (!hydrated) {
    return <Container className="min-h-[60vh] py-16" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center sm:py-32">
        <h1 className="text-2xl font-medium tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted">Add a product before heading to checkout.</p>
        <Link
          href="/#shop"
          className="mt-6 inline-block border border-ink bg-ink px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-white hover:text-ink"
        >
          Browse products
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink">
        <ArrowLeft size={13} /> Back to shop
      </Link>
      <h1 className="animate-fade-up mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_430px]">
        <form id="checkout-form" onSubmit={onSubmit} className="flex flex-col gap-6">
          <Step number="1" title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" id="email" type="email" required autoComplete="email" placeholder="you@example.com" className="sm:col-span-2" />
              <Field label="Phone" id="phone" type="tel" required autoComplete="tel" placeholder="+1 555 000 1234" className="sm:col-span-2" />
            </div>
          </Step>

          <Step number="2" title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" id="firstName" required autoComplete="given-name" />
              <Field label="Last name" id="lastName" required autoComplete="family-name" />
              <Field label="Address" id="address" required autoComplete="street-address" className="sm:col-span-2" />
              <Field label="City" id="city" required autoComplete="address-level2" />
              <Field label="Postal code" id="zip" required autoComplete="postal-code" />
              <Field label="Country" id="country" required autoComplete="country-name" className="sm:col-span-2" defaultValue="United States" />
            </div>
          </Step>

          <Step number="3" title="Delivery method">
            <div className="flex flex-col gap-3">
              {shippingOptions.map((o) => {
                const free = o.id === "standard" && subtotal >= FREE_SHIPPING_OVER;
                return (
                  <label
                    key={o.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border p-4 transition-colors",
                      shipping === o.id ? "border-ink bg-surface-soft" : "border-line hover:border-slate",
                    )}
                  >
                    <input type="radio" name="shipping" value={o.id} checked={shipping === o.id} onChange={() => setShipping(o.id)} className="accent-ink" />
                    <Truck size={16} className="text-muted" />
                    <span className="flex-1">
                      <span className="block text-xs font-medium">{o.label}</span>
                      <span className="block text-[11px] text-muted">{o.eta}</span>
                    </span>
                    <span className="text-xs font-semibold">{free ? "Free" : formatPrice(o.cost)}</span>
                  </label>
                );
              })}
            </div>
          </Step>

          <Step number="4" title="Payment">
            <div className="mb-4 grid grid-cols-2 gap-3">
              {[
                ["card", "Card", CreditCard],
                ["cod", "Cash on delivery", Truck],
              ].map(([id, label, Icon]) => (
                <label
                  key={id}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 border p-3 text-xs font-medium transition-colors",
                    payment === id ? "border-ink bg-surface-soft" : "border-line hover:border-slate",
                  )}
                >
                  <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => setPayment(id)} className="sr-only" />
                  <Icon size={15} /> {label}
                </label>
              ))}
            </div>

            {payment === "card" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Card number" id="cardNumber" required inputMode="numeric" autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456" pattern="[0-9 ]{15,19}" title="Enter a valid card number"
                  value={card} onChange={(e) => setCard(formatCard(e.target.value))} className="sm:col-span-2"
                />
                <Field
                  label="Expiry" id="cardExpiry" required inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY"
                  pattern="(0[1-9]|1[0-2]) / [0-9]{2}" title="Use MM / YY"
                  value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                />
                <Field
                  label="CVC" id="cardCvc" required inputMode="numeric" autoComplete="cc-csc" placeholder="123"
                  pattern="[0-9]{3,4}" title="3 or 4 digits"
                  value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                />
                <p className="flex items-center gap-1.5 text-[11px] text-muted sm:col-span-2">
                  <Lock size={11} /> Demo store — no real payment is processed. Don&apos;t enter a real card.
                </p>
              </div>
            ) : (
              <p className="text-xs text-muted">Pay in cash when your order arrives. No card details needed.</p>
            )}
          </Step>
        </form>

        <aside aria-labelledby="summary-title" className="border border-line bg-surface-soft p-5 sm:p-7 lg:sticky lg:top-20">
          <h2 id="summary-title" className="text-sm font-semibold uppercase tracking-[0.15em]">Order summary</h2>
          <ul className="mt-5 divide-y divide-line">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-surface">
                  <Image src={item.image} alt={item.alt} fill sizes="64px" className="object-cover mix-blend-multiply" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-medium leading-snug">{item.title}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <label htmlFor={`qty-${item.id}`} className="text-muted">Qty</label>
                    <select
                      id={`qty-${item.id}`}
                      value={item.qty}
                      onChange={(e) => setQty(item.id, Number(e.target.value))}
                      className="border border-line bg-white px-1.5 py-0.5 text-xs outline-none focus:border-ink"
                    >
                      {Array.from({ length: Math.max(10, item.qty) }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                      <option value={0}>Remove</option>
                    </select>
                  </div>
                </div>
                <span className="text-xs font-semibold">{formatPrice(parsePrice(item.price) * item.qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-2 space-y-2 border-t border-line pt-4 text-xs">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd>
            </div>
            <div className="flex justify-between"><dt className="text-muted">Estimated tax (8%)</dt><dd>{formatPrice(tax)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-sm font-semibold">
              <dt>Total</dt><dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          {shipping === "standard" && subtotal < FREE_SHIPPING_OVER && (
            <p className="mt-3 text-[11px] text-muted">
              Add {formatPrice(FREE_SHIPPING_OVER - subtotal)} more for free standard shipping.
            </p>
          )}

          <button
            type="submit"
            form="checkout-form"
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 border border-ink bg-ink py-3.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            <Lock size={13} /> Place order · {formatPrice(total)}
          </button>
        </aside>
      </div>
    </Container>
  );
}
