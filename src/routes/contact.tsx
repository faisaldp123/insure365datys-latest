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
import { postContact } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({ title: "Contact Us | Insure365days" }),
  component: Contact,
});

const insuranceTypes = ["Health Insurance", "Life Insurance", "Car Insurance"];
const brands = ["Star Union", "Bharti AXA", "Pramerica Life", "Shri Ram", "Go Digit", "Ageas Federal", "Central General", "HDFC Life", "IndusInd Nippon", "ICICI Life"];

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  dob: z.string().min(1, "Select your date of birth"),
  mobile: z.string().trim().regex(/^\+?[0-9][0-9\s-]{7,18}$/, "Enter a valid mobile number"),
  alternativeMobile: z.string().trim().optional(),
  insuranceType: z.string().min(1, "Select insurance type"),
  brandType: z.string().min(1, "Select brand type"),
  termAndPpt: z.string().trim().min(1, "Enter term and PPT").max(80),
  applicationNumber: z.string().trim().min(1, "Enter application number").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  nomineeName: z.string().trim().min(2, "Enter nominee name").max(80),
  nomineeDob: z.string().min(1, "Select nominee date of birth"),
  shortAddress: z.string().trim().min(5, "Enter a short address").max(300),
  remarks: z.string().trim().max(1000, "Remarks must be 1000 characters or less"),
});

const initialForm = { name: "", dob: "", mobile: "", alternativeMobile: "", insuranceType: "", brandType: "", termAndPpt: "", applicationNumber: "", email: "", nomineeName: "", nomineeDob: "", shortAddress: "", remarks: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (field: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])));
      return;
    }
    try {
      await postContact(form);
      setErrors({});
      setForm(initialForm);
      toast.success("Your details have been submitted successfully.");
    } catch {
      toast.error("We couldn't submit your details. Please try again.");
    }
  }

  const field = (id: keyof typeof initialForm, label: string, type = "text", placeholder?: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={form[id]} placeholder={placeholder} onChange={(e) => update(id, e.target.value)} />
      {errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <SiteLayout>
      <section className="bg-[var(--gradient-soft)] py-10 md:py-12">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Insurance application details</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">Share your details securely and our insurance advisor will get in touch.</p>
        </div>
      </section>
      <section className="container mx-auto grid gap-6 py-8 lg:grid-cols-3">
        <Card className="border-border/80 p-5 shadow-[var(--shadow-card)] sm:p-6 lg:col-span-2">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold">Application form</h2>
            <p className="mt-1 text-sm text-muted-foreground">The date is recorded automatically when you submit this form.</p>
          </div>
          <form onSubmit={submit} className="mt-5 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            {field("name", "Full name", "text", "Enter full name")}
            {field("dob", "Date of birth", "date")}
            {field("mobile", "Mobile number", "tel", "Enter mobile number")}
            {field("alternativeMobile", "Alternative mobile number", "tel", "Optional")}
            <div className="space-y-1.5">
              <Label htmlFor="insuranceType">Type of insurance</Label>
              <select id="insuranceType" value={form.insuranceType} onChange={(e) => update("insuranceType", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select insurance type</option>{insuranceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              {errors.insuranceType && <p className="text-xs text-destructive">{errors.insuranceType}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandType">Brand type</Label>
              <select id="brandType" value={form.brandType} onChange={(e) => update("brandType", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="">Select brand</option>{brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
              {errors.brandType && <p className="text-xs text-destructive">{errors.brandType}</p>}
            </div>
            {field("termAndPpt", "Term & PPT", "text", "e.g. 20 years / 10 years")}
            {field("applicationNumber", "Application number", "text", "Enter application number")}
            {field("email", "Email address", "email", "name@example.com")}
            {field("nomineeName", "Nominee name", "text", "Enter nominee name")}
            {field("nomineeDob", "Nominee date of birth", "date")}
            {field("remarks", "Remarks", "text", "Add remarks")}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="shortAddress">Short address</Label>
              <Textarea id="shortAddress" rows={3} value={form.shortAddress} placeholder="House / street, city, state" onChange={(e) => update("shortAddress", e.target.value)} />
              {errors.shortAddress && <p className="text-xs text-destructive">{errors.shortAddress}</p>}
            </div>
            <div className="pt-1 sm:col-span-2"><Button type="submit" size="lg" className="w-full cursor-pointer sm:w-auto">Submit application details</Button></div>
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="p-5 sm:p-6"><h3 className="font-semibold">Need help?</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground"><li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /><span>A7, Moti Nagar<br />New Delhi 110015</span></li><li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /><span>+91 9870220211</span></li><li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-primary" /><span>info@insure365days.com</span></li><li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /><span>Mon–Sat, 9 AM–7 PM</span></li></ul></Card>
          <Card className="overflow-hidden p-0"><div className="aspect-video bg-secondary"><iframe title="Office location" src="https://www.google.com/maps?q=A7%20Moti%20Nagar%20New%20Delhi%20110094&output=embed" className="h-full w-full border-0" loading="lazy" /></div></Card>
        </div>
      </section>
    </SiteLayout>
  );
}
