import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Award, Heart, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Insure365days" },
      { name: "description", content: "Learn about Insure365days, our mission to protect families and our commitment to year-round service." },
      { property: "og:title", content: "About Insure365days" },
      { property: "og:description", content: "Our mission, vision and why thousands trust us." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-[var(--gradient-soft)] py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            About Us
          </span>
          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Protecting families, <span className="bg-gradient-to-r from-primary to-[var(--primary-glow)] bg-clip-text text-transparent">365 days a year</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Insure365days was founded with a simple belief: insurance should be clear, accessible
            and there for you on the day you need it most. For over a decade we've helped families
            and businesses protect what matters with honest advice and lightning-fast service.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-2">
        <Card className="p-8">
          <Target className="h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            To make quality insurance simple, transparent and genuinely supportive — empowering
            every customer to face tomorrow with confidence.
          </p>
        </Card>
        <Card className="p-8">
          <Eye className="h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
          <p className="mt-3 text-muted-foreground">
            To become the most trusted insurance partner in every community we serve, known for
            integrity, speed and unwavering customer care.
          </p>
        </Card>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why choose Insure365days</h2>
            <p className="mt-3 text-muted-foreground">A team that shows up for you, every single day.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Award, title: "10+ Years Experience", desc: "A decade of helping families navigate life's uncertainties." },
              { icon: Heart, title: "Customer First", desc: "Every plan is shaped around your real needs, not ours." },
              { icon: Users, title: "Expert Advisors", desc: "Licensed humans who explain things in plain language." },
              { icon: Clock, title: "Fast Settlements", desc: "Most claims paid within 48 hours of approval." },
              { icon: Target, title: "Tailored Plans", desc: "Build coverage that fits your life and budget." },
              { icon: Eye, title: "Full Transparency", desc: "No hidden fees, no fine print surprises." },
            ].map((r) => (
              <Card key={r.title} className="p-6">
                <r.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-[var(--primary-glow)]">
              <Link to="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}