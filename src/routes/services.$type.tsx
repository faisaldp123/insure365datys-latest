import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Car,
  HeartPulse,
  Users,
  CheckCircle2,
} from "lucide-react";

const data = {
  general: {
    icon: Shield,
    title: "General Insurance",
    tagline: "Comprehensive cover for life's everyday risks.",

    desc:
      "Protect your home, belongings and travel plans with flexible general insurance built around how you actually live.",

    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",

    overview:
      "General insurance helps protect you against unexpected financial losses caused by accidents, theft, travel emergencies, natural disasters, and more. Our insurance solutions are designed to provide maximum peace of mind with affordable premiums, fast claim settlements, and complete financial security.",

    benefits: [
      "Property & home protection",
      "Travel insurance worldwide",
      "Personal accident cover",
      "Liability protection",
      "Fast claim processing",
      "Affordable yearly premiums",
    ],

    coverage: [
      "Home structure protection",
      "Electronics & valuables coverage",
      "Travel baggage loss protection",
      "Fire & natural disaster protection",
      "Personal liability cover",
      "Accidental damage cover",
    ],

    whyChoose: [
      "24/7 claim assistance",
      "Trusted insurance partners",
      "Quick documentation process",
      "Flexible policy options",
    ],
  },

  motor: {
    icon: Car,
    title: "Motor Insurance",
    tagline: "Drive worry-free, every day of the year.",

    desc:
      "Comprehensive and third-party plans for cars, bikes and commercial vehicles with nationwide cashless garage support.",

    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",

    overview:
      "Motor insurance protects your vehicle against accidents, theft, natural calamities, and third-party liabilities. Whether you own a private car, bike, or commercial vehicle, our plans ensure complete protection with easy claim support and roadside assistance.",

    benefits: [
      "Comprehensive & third-party cover",
      "Zero depreciation add-on",
      "24/7 roadside assistance",
      "Quick cashless claims",
      "Theft protection",
      "Engine protection plans",
    ],

    coverage: [
      "Accidental vehicle damage",
      "Vehicle theft protection",
      "Third-party liability",
      "Flood & fire damage",
      "Roadside emergency assistance",
      "Cashless garage repairs",
    ],

    whyChoose: [
      "Nationwide garage network",
      "Affordable premium plans",
      "Instant online policy",
      "Hassle-free renewals",
    ],
  },

  health: {
    icon: HeartPulse,
    title: "Health Insurance",
    tagline: "Care for you and the people you love.",

    desc:
      "Cashless hospitalization, family floater plans and critical illness cover with extensive hospital network support.",

    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600&auto=format&fit=crop",

    overview:
      "Health insurance gives you financial support during medical emergencies and treatments. From hospitalization expenses to critical illness coverage, our plans help you focus on recovery instead of worrying about medical bills.",

    benefits: [
      "Cashless hospitalization",
      "Family floater options",
      "Critical illness cover",
      "Annual health checkups",
      "Emergency ambulance cover",
      "Tax-saving benefits",
    ],

    coverage: [
      "Hospitalization expenses",
      "Pre & post hospitalization",
      "Daycare treatments",
      "Critical illness support",
      "Emergency ambulance charges",
      "Health checkup benefits",
    ],

    whyChoose: [
      "10,000+ hospital network",
      "Affordable family plans",
      "Fast claim approvals",
      "Complete healthcare protection",
    ],
  },

  life: {
    icon: Users,
    title: "Life Insurance",
    tagline: "Plan today for the people who matter tomorrow.",

    desc:
      "Term, savings and ULIP plans designed to secure your family's future and grow long-term wealth.",

    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",

    overview:
      "Life insurance ensures financial security for your loved ones in your absence while helping you achieve future financial goals. Our policies include term plans, savings plans, retirement plans, and investment-linked options.",

    benefits: [
      "Term life protection",
      "Savings & investment plans",
      "Tax-saving benefits",
      "Flexible premium options",
      "Retirement planning",
      "Child future planning",
    ],

    coverage: [
      "Life cover protection",
      "Retirement planning solutions",
      "Investment-linked returns",
      "Child education support",
      "Long-term savings benefits",
      "Flexible payout options",
    ],

    whyChoose: [
      "High claim settlement ratio",
      "Trusted insurance advisors",
      "Flexible policy terms",
      "Long-term financial security",
    ],
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
          {
            title: `${loaderData.title} — Insure365days`,
          },
          {
            name: "description",
            content: loaderData.desc,
          },
          {
            property: "og:title",
            content: `${loaderData.title} — Insure365days`,
          },
          {
            property: "og:description",
            content: loaderData.tagline,
          },
        ]
      : [],
  }),

  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold">
          Service Not Found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The insurance service you're looking for doesn't exist.
        </p>

        <Button asChild className="mt-6">
          <Link to="/">Back Home</Link>
        </Button>
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
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden py-28"
        style={{
          backgroundImage: `url(${s.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-5xl px-4 text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <Icon className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-4xl font-bold md:text-6xl">
            {s.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {s.tagline}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
            {s.desc}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-500 text-white"
            >
              <Link to="/contact">Get a Quote</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black"
            >
              <Link to="/contact">
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            What's Included
          </h2>

          <p className="mt-4 text-muted-foreground">
            Comprehensive insurance benefits designed
            for your protection and peace of mind.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.benefits.map((b) => (
            <Card
              key={b}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <span className="text-sm leading-7">
                  {b}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold">
            About This Insurance
          </h2>

          <p className="mt-8 leading-8 text-muted-foreground">
            {s.overview}
          </p>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Coverage Includes
          </h2>

          <p className="mt-4 text-muted-foreground">
            Everything you need for complete insurance
            protection.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {s.coverage.map((item) => (
            <Card
              key={item}
              className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />

                <p>{item}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Why Choose Insure365days
            </h2>

            <p className="mt-4 text-muted-foreground">
              Trusted insurance solutions with expert
              support and reliable claim assistance.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.whyChoose.map((item) => (
              <Card
                key={item}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CheckCircle2 className="mx-auto mb-4 h-8 w-8 text-primary" />

                <p className="text-sm leading-7">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <Card className="rounded-[32px] bg-gradient-to-r from-primary to-blue-600 p-10 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Secure Your Future?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/80 leading-7">
              Speak with our insurance experts today
              and get personalized insurance solutions
              tailored for your needs and budget.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Link to="/contact">
                  Get Free Consultation
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}