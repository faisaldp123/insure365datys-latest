import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { postContact } from "@/lib/api"; // ✅ ONLY ADDITION

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Insure365days" },
      { name: "description", content: "Get in touch with Insure365days. Visit our office, call, email, or send a message." },
      { property: "og:title", content: "Contact Insure365days" },
      { property: "og:description", content: "Reach our team for quotes, claims and support." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const result = schema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fe[i.path[0] as string] = i.message;
      });
      setErrors(fe);
      return;
    }

    try {
      await postContact({
        name: form.name,
        email: form.email,
        mobile: form.phone,
        message: form.message,
      });

      setErrors({});
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });

    } catch {
      toast.error("Failed to send message");
    }
  }

  return (
    <SiteLayout>
      <section className="bg-[var(--gradient-soft)] pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Let's talk</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions, quotes or claims — our team is ready to help, 365 days a year.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 pt-8 pb-16 lg:grid-cols-3">
        
        {/* LEFT FORM */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold">Send us a message</h2>

          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
            
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-[var(--primary-glow)] sm:w-auto"
              >
                Send Message
              </Button>
            </div>

          </form>
        </Card>

        {/* RIGHT SIDE (UNCHANGED) */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold">Office</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span>A7, Moti Nagar<br />New Delhi 110094</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+1 (800) 365-0000</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>hello@insure365days.com</span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <span>Mon–Sun, 8 AM – 8 PM</span>
              </li>
            </ul>
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="aspect-video w-full bg-secondary">
              <iframe
                title="Office location"
                src="https://www.google.com/maps?q=A7%20Moti%20Nagar%20New%20Delhi%20110094&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </Card>
        </div>

      </section>
    </SiteLayout>
  );
}