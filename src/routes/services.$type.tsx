import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Car, HeartPulse, Users, CheckCircle2 } from "lucide-react";

const data = {
  general: {
    icon: Shield,
    title: "General Insurance",
    tagline: "Comprehensive cover for life's everyday risks.",
    desc: "Protect your home, belongings and travel plans with flexible general insurance built around how you actually live.",
    benefits: ["Property & home protection", "Travel insurance worldwide", "Personal accident cover", "Liability protection"],
  },
  motor: {
    icon: Car,
    title: "Motor Insurance",
    tagline: "Drive worry-free, every day of the year.",
    desc: "Comprehensive and third-party plans for cars, two-wheelers and commercial vehicles — with cashless garages nationwide.",
    benefits: ["Comprehensive & third-party cover", "Zero-depreciation add-on", "24/7 roadside assistance", "Quick cashless claims"],
  },
  health: {
    icon: HeartPulse,
    title: "Health Insurance",
    tagline: "Care for you and the people you love.",
    desc: "Cashless hospitalization, family floater plans and critical illness cover with a network of 10,000+ hospitals.",
    benefits: ["Cashless hospitalization", "Family floater options", "Critical illness cover", "Annual health checkups"],
  },
  life: {
    icon: Users,
    title: "Life Insurance",
    tagline: "Plan today for the people who matter tomorrow.",
    desc: "Term, savings and ULIP plans designed to secure your family's future and grow your wealth over time.",
    benefits: ["Term life protection", "Savings & investment plans", "Tax-saving benefits", "Flexible premium payments"],
  },
} as const;

type ServiceType = keyof typeof data;

export const Route = createFileRoute("/services/$type")({
  loader: ({ params }) => {
    if (!(params.type in data)) throw notFound();
    return data[params.type as ServiceType];
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Insure365days` },
          { name: "description", content: loaderData.desc },
          { property: "og:title", content: `${loaderData.title} — Insure365days` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="mt-3 text-muted-foreground">The insurance plan you're looking for doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/">Back home</Link></Button>
      </div>
    </SiteLayout>
  ),
  component: ServicePage,
});

function ServicePage() {
  const s = Route.useLoaderData();
  const Icon = s.icon;
  return (
    <SiteLayout>
      <section className="bg-[var(--gradient-soft)] py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{s.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{s.tagline}</p>
          <p className="mt-4 max-w-2xl text-foreground/80">{s.desc}</p>
          <div className="mt-8 flex gap-3">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[var(--primary-glow)]">
              <Link to="/contact">Get a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact">Talk to an Expert</Link></Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">What's included</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {s.benefits.map((b) => (
            <Card key={b} className="flex items-start gap-3 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{b}</span>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}