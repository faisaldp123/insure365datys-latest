"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { postContact, checkApplicationNumber } from "@/lib/api";

const insuranceTypes = ["Health Insurance", "Life Insurance", "Car Insurance"];
const brands = ["Star Union", "Bharti AXA", "Pramerica Life", "Shri Ram", "Go Digit", "Ageas Federal", "Central General", "HDFC Life", "IndusInd Nippon", "ICICI Life"];
const initialForm = { name: "", dob: "", mobile: "", alternativeMobile: "", insuranceType: "", brandType: "", termAndPpt: "", applicationNumber: "", premiumAmount: "", email: "", nomineeName: "", nomineeDob: "", shortAddress: "", remarks: "" };
const schema = z.object({ name: z.string().trim().min(2, "Enter your name"), dob: z.string().min(1, "Select date of birth"), mobile: z.string().trim().min(8, "Enter a valid mobile number"), alternativeMobile: z.string(), insuranceType: z.string().min(1, "Select insurance type"), brandType: z.string().min(1, "Select brand"), termAndPpt: z.string().trim().min(1, "Enter term and PPT"), applicationNumber: z.string().trim().min(1, "Enter application number"), premiumAmount: z.string().trim().min(1, "Enter premium amount").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Enter a valid premium amount"), email: z.string().trim().email("Enter a valid email"), nomineeName: z.string().trim().min(2, "Enter nominee name"), nomineeDob: z.string().min(1, "Select nominee date of birth"), shortAddress: z.string().trim().min(5, "Enter a short address"), remarks: z.string().trim().max(1000, "Remarks must be 1000 characters or less") });
const STORAGE_KEY = "insure365_popup_seen";
const DUPLICATE_APPLICATION_ERROR = "This application number has already been submitted.";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAppNumber, setIsCheckingAppNumber] = useState(false);
  const [isDuplicateAppNumber, setIsDuplicateAppNumber] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, "1");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Debounced live check against previously submitted application numbers.
  useEffect(() => {
    const applicationNumber = form.applicationNumber.trim();
    if (!applicationNumber) {
      setIsDuplicateAppNumber(false);
      return;
    }
    let cancelled = false;
    setIsCheckingAppNumber(true);
    const timer = setTimeout(async () => {
      try {
        const exists = await checkApplicationNumber(applicationNumber);
        if (cancelled) return;
        setIsDuplicateAppNumber(exists);
        setErrors((prev) => {
          if (!exists) {
            const { applicationNumber: _omit, ...rest } = prev;
            return rest;
          }
          return { ...prev, applicationNumber: DUPLICATE_APPLICATION_ERROR };
        });
      } catch {
        // Check endpoint not available yet — fall back to catching the
        // duplicate at submit time instead of blocking typing.
      } finally {
        if (!cancelled) setIsCheckingAppNumber(false);
      }
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [form.applicationNumber]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (isSubmitting) return;

    const result = schema.safeParse(form);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])));
      return;
    }
    if (isDuplicateAppNumber) {
      setErrors((prev) => ({ ...prev, applicationNumber: DUPLICATE_APPLICATION_ERROR }));
      return;
    }

    setIsSubmitting(true);
    try {
      await postContact({ ...form, premiumAmount: Number(form.premiumAmount) });
      setErrors({});
      setForm(initialForm);
      setIsDuplicateAppNumber(false);
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message === "DUPLICATE_APPLICATION_NUMBER") {
        setIsDuplicateAppNumber(true);
        setErrors((prev) => ({ ...prev, applicationNumber: DUPLICATE_APPLICATION_ERROR }));
        toast.error(DUPLICATE_APPLICATION_ERROR);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Reset the success view once the dialog is fully closed so it's
      // ready to collect a fresh entry next time it opens.
      setTimeout(() => setSubmitted(false), 200);
    }
  }

  const canSubmit = !isSubmitting && !isCheckingAppNumber && !isDuplicateAppNumber;

  const field = (id: keyof typeof initialForm, label: string, type = "text") => (
    <div className="space-y-1">
      <Label htmlFor={`popup-${id}`}>{label}</Label>
      <Input id={`popup-${id}`} type={type} value={form[id]} onChange={(event) => update(id, event.target.value)} />
      {errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <DialogTitle className="mt-3 text-xl">Application submitted</DialogTitle>
            <DialogDescription className="mt-1">Thanks! We've received your details and our advisor will contact you shortly.</DialogDescription>
            <Button onClick={() => handleOpenChange(false)} className="mt-5 w-full cursor-pointer">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Insurance application details</DialogTitle>
              <DialogDescription>Complete the form and our advisor will contact you. Submission date is captured automatically.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name")}
              {field("dob", "Date of birth", "date")}
              {field("mobile", "Mobile number", "tel")}
              {field("alternativeMobile", "Alternative mobile", "tel")}
              <div className="space-y-1">
                <Label htmlFor="popup-insuranceType">Type of insurance</Label>
                <select id="popup-insuranceType" value={form.insuranceType} onChange={(event) => update("insuranceType", event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select type</option>{insuranceTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
                {errors.insuranceType && <p className="text-xs text-destructive">{errors.insuranceType}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="popup-brandType">Brand type</Label>
                <select id="popup-brandType" value={form.brandType} onChange={(event) => update("brandType", event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select brand</option>{brands.map((item) => <option key={item}>{item}</option>)}
                </select>
                {errors.brandType && <p className="text-xs text-destructive">{errors.brandType}</p>}
              </div>
              {field("termAndPpt", "Term & PPT")}
              <div className="space-y-1">
                <Label htmlFor="popup-applicationNumber">Application number</Label>
                <Input id="popup-applicationNumber" value={form.applicationNumber} onChange={(event) => update("applicationNumber", event.target.value)} />
                {isCheckingAppNumber && !errors.applicationNumber && <p className="text-xs text-muted-foreground">Checking application number…</p>}
                {errors.applicationNumber && <p className="text-xs text-destructive">{errors.applicationNumber}</p>}
              </div>
              {field("premiumAmount", "Premium amount", "number")}
              {field("email", "Email address", "email")}
              {field("nomineeName", "Nominee name")}
              {field("nomineeDob", "Nominee date of birth", "date")}
              {field("remarks", "Remarks")}
              <div className="space-y-1 sm:col-span-2">
                <Label htmlFor="popup-shortAddress">Short address</Label>
                <Textarea id="popup-shortAddress" rows={2} value={form.shortAddress} onChange={(event) => update("shortAddress", event.target.value)} />
                {errors.shortAddress && <p className="text-xs text-destructive">{errors.shortAddress}</p>}
              </div>
              <Button type="submit" disabled={!canSubmit} className="w-full cursor-pointer sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Submitting…" : "Submit details"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
