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
import { Shield, Car, HeartPulse, Users, CheckCircle2, Clock, HeadphonesIcon, BadgeDollarSign, Star, ClipboardList, FileCheck2, Handshake, ArrowRight } from "lucide-react";

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

const process = [
  { icon: ClipboardList, title: "Share your details", desc: "Tell us your insurance needs in one simple form." },
  { icon: Handshake, title: "Get expert guidance", desc: "An advisor helps compare suitable plan options." },
  { icon: FileCheck2, title: "Apply with confidence", desc: "Complete your application with clear support at every step." },
];

const partners = ["Star Union", "Bharti AXA", "Pramerica Life", "Shri Ram", "Go Digit", "Ageas Federal", "HDFC Life", "ICICI Life"];

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
        <div className="container mx-auto px-4 pt-7 pb-14 md:pt-10 md:pb-16">
          <div className="mx-auto max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Shield className="h-3.5 w-3.5" /> Trusted insurance, every day
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Protect What Matters Every Day{" "}
              <span className="bg-gradient-to-r from-primary to-[var(--primary-glow)] bg-clip-text text-transparent">
                Health, Life, Motor & General Insurance in India
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
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div><div className="text-2xl font-bold text-primary">50K+</div><div className="text-muted-foreground">Customers</div></div>
              <div><div className="text-2xl font-bold text-primary">48h</div><div className="text-muted-foreground">Avg. Claims</div></div>
              <div><div className="text-2xl font-bold text-primary">4.9★</div><div className="text-muted-foreground">Rated</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-background">
        <div className="container mx-auto grid grid-cols-2 divide-x divide-y divide-border px-5 sm:grid-cols-4 sm:divide-y-0 md:px-8">
          {["Personalized plans", "Clear guidance", "Quick assistance", "Secure applications"].map((item) => (
            <div key={item} className="flex items-center justify-center gap-2 px-3 py-4 text-center text-sm font-medium text-foreground/80">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{item}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Insurance for every part of life</h2>
          <p className="mt-3 text-muted-foreground">Choose the coverage that fits — and adapt it as life changes.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card key={s.title} className="group p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
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

      {/* Process */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">SIMPLE PROCESS</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Insurance support, made straightforward</h2>
          <p className="mt-3 text-muted-foreground">From your first question to your application, we keep every step clear.</p>
        </div>
        <div className="relative mt-8 grid gap-4 md:grid-cols-3">
          {process.map((step, index) => (
            <Card key={step.title} className="relative p-5">
              <span className="absolute right-5 top-4 text-4xl font-bold text-primary/10">0{index + 1}</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><step.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/40 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why choose Insure365days</h2>
            <p className="mt-3 text-muted-foreground">Built on trust, powered by service.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-card p-5 shadow-sm">
                <r.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-secondary/40 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div><span className="text-sm font-semibold text-primary">BRAND OPTIONS</span><h2 className="mt-2 text-3xl font-bold">Plans from leading insurers</h2></div>
            <Link to="/contact" className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline">Explore your options <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partners.map((partner) => <div key={partner} className="rounded-xl border border-border bg-background px-4 py-4 text-center text-sm font-semibold text-foreground/75 shadow-sm">{partner}</div>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Loved by customers</h2>
          <p className="mt-3 text-muted-foreground">Real stories from real policyholders.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-5">
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

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-[var(--primary-glow)] px-6 py-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)] md:px-12">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to find the right cover?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/85">Share your details once and get the guidance you need for a confident insurance decision.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6 bg-background text-primary hover:bg-background/90"><Link to="/contact">Start your application</Link></Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-14 md:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know before choosing a plan.</p>
          </div>
          <Accordion type="single" collapsible className="mt-7">
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
