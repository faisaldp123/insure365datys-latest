import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Car, HeartPulse, Users, CheckCircle2, Clock, HeadphonesIcon, BadgeDollarSign, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Insure365days — Protect What Matters Every Day" },
      { name: "description", content: "Insure365days is your trusted partner for motor, health, life and general insurance — 365 days a year." },
      { property: "og:title", content: "Insure365days — Protect What Matters Every Day" },
      { property: "og:description", content: "Trusted insurance solutions, every day of the year." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Shield, title: "General Insurance", desc: "Property, travel and personal coverage tailored to you.", type: "general" as const },
  { icon: Car, title: "Motor Insurance", desc: "Comprehensive cover for cars, bikes and commercial vehicles.", type: "motor" as const },
  { icon: HeartPulse, title: "Health Insurance", desc: "Cashless hospitalization and family floater plans.", type: "health" as const },
  { icon: Users, title: "Life Insurance", desc: "Secure your family's future with flexible life plans.", type: "life" as const },
];

const reasons = [
  { icon: CheckCircle2, title: "Trusted by Thousands", desc: "Over 50,000 families protected nationwide." },
  { icon: Clock, title: "Fast Claims", desc: "Most claims settled within 48 hours." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Real humans on call, every hour of the year." },
  { icon: BadgeDollarSign, title: "Affordable Plans", desc: "Transparent pricing with no hidden fees." },
];

const testimonials = [
  { name: "Sarah K.", role: "Homeowner", quote: "The claim process was unbelievably smooth. I felt taken care of the whole time." },
  { name: "Daniel M.", role: "Small Business Owner", quote: "Best insurance experience I've had. Their team genuinely listens." },
  { name: "Priya R.", role: "Parent of two", quote: "Affordable health cover with zero paperwork hassle. Highly recommend." },
];

const faqs = [
  { q: "How quickly can I get a quote?", a: "Most quotes are generated in under 2 minutes through our online form or a quick call." },
  { q: "Do you offer family plans?", a: "Yes — our health and life insurance plans include flexible family floater options." },
  { q: "How are claims processed?", a: "Claims can be filed online or via phone. Most are resolved within 48 hours of submission." },
  { q: "Can I customize my coverage?", a: "Absolutely. Every plan can be tailored with add-ons to match your needs and budget." },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)]" />
        <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 pt-8 pb-20 md:pt-12 md:pb-24">
          <div className="mx-auto max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Shield className="h-3.5 w-3.5" /> Trusted insurance, every day
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Protect What Matters{" "}
              <span className="bg-gradient-to-r from-primary to-[var(--primary-glow)] bg-clip-text text-transparent">
                Every Day
              </span>
            </h1>
            <p className="mt-5 mx-auto max-w-xl text-lg text-muted-foreground">
              Your trusted partner for insurance solutions — 365 days a year.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[var(--primary-glow)] shadow-[var(--shadow-elegant)]">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
              <div><div className="text-2xl font-bold text-primary">50K+</div><div className="text-muted-foreground">Customers</div></div>
              <div><div className="text-2xl font-bold text-primary">48h</div><div className="text-muted-foreground">Avg. Claims</div></div>
              <div><div className="text-2xl font-bold text-primary">4.9★</div><div className="text-muted-foreground">Rated</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Insurance for every part of life</h2>
          <p className="mt-3 text-muted-foreground">Choose the coverage that fits — and adapt it as life changes.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card key={s.title} className="group p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <Link to="/services/$type" params={{ type: s.type }} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Learn more →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why choose Insure365days</h2>
            <p className="mt-3 text-muted-foreground">Built on trust, powered by service.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-card p-6 shadow-sm">
                <r.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Loved by customers</h2>
          <p className="mt-3 text-muted-foreground">Real stories from real policyholders.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm text-foreground/80">"{t.quote}"</p>
              <div className="mt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know before choosing a plan.</p>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
