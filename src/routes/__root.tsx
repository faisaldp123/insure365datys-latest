import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import InsuranceChatbot from "@/components/site/InsuranceChatbot";
import WhatsAppButton from "@/components/site/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
  title:
    "Insure365days | Health, Life, Motor & General Insurance in India",

  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    {
      name: "description",
      content:
        "Get the best Health Insurance, Life Insurance, Motor Insurance and General Insurance plans in India. Compare policies and get expert guidance from Insure365days.",
    },

    {
      name: "keywords",
      content:
        "health insurance, life insurance, motor insurance, car insurance, bike insurance, general insurance, insurance advisor, insurance agency india, insure365days",
    },

    {
      name: "author",
      content: "Insure365days",
    },

    {
      property: "og:title",
      content:
        "Insure365days | Health, Life, Motor & General Insurance in India",
    },

    {
      property: "og:description",
      content:
        "Compare Health, Life, Motor and General Insurance plans with expert guidance from Insure365days.",
    },

    {
      property: "og:type",
      content: "website",
    },

    {
      property: "og:url",
      content: "https://insure365days.com",
    },

    {
      property: "og:site_name",
      content: "Insure365days",
    },

    {
  property: "og:image",
  content: "https://insure365days.com/fevicon.png",
},

{
  name: "twitter:image",
  content: "https://insure365days.com/fevicon.png",
},

    {
      name: "twitter:card",
      content: "summary_large_image",
    },

    {
      name: "twitter:title",
      content:
        "Insure365days | Health, Life, Motor & General Insurance",
    },

    {
      name: "twitter:description",
      content:
        "Trusted insurance solutions for Health, Life, Motor and General Insurance.",
    },
  ],

  links: [
    {
      rel: "stylesheet",
      href: appCss,
    },

    {
      rel: "canonical",
      href: "https://insure365days.com",
    },

    {
  rel: "icon",
  type: "image/png",
  href: "/fevicon.png",
},
{
  rel: "shortcut icon",
  type: "image/png",
  href: "/fevicon.png",
}
  ],
}),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
  <HeadContent />

  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: "Insure365days",
      url: "https://insure365days.com",

      logo: "https://insure365days.com/fevicon.png",
      image: "https://insure365days.com/fevicon.png",

      telephone: "+919870220211",
      email: "info@insure365days.com",

      description:
        "Health, Life, Motor and General Insurance solutions across India.",

      areaServed: "India",

      address: {
        "@type": "PostalAddress",
        streetAddress: "A7 Moti Nagar",
        addressLocality: "New Delhi",
        postalCode: "110015",
        addressCountry: "IN",
      },
    }),
  }}
/>

{/* Website Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Insure365days",
        url: "https://insure365days.com",
      }),
    }}
  />
</head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />

      {/* Insurance Chatbot */}
      <InsuranceChatbot />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
