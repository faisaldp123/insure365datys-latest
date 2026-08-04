"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { postContact } from "@/lib/api";

const insuranceTypes = ["Health Insurance", "Life Insurance", "Car Insurance"];
const brands = ["Star Union", "Bharti AXA", "Pramerica Life", "Shri Ram", "Go Digit", "Ageas Federal", "Central General", "HDFC Life", "IndusInd Nippon", "ICICI Life"];
const initialForm = { name: "", dob: "", mobile: "", alternativeMobile: "", insuranceType: "", brandType: "", termAndPpt: "", applicationNumber: "", email: "", nomineeName: "", nomineeDob: "", shortAddress: "" };
const schema = z.object({ name: z.string().trim().min(2, "Enter your name"), dob: z.string().min(1, "Select date of birth"), mobile: z.string().trim().min(8, "Enter a valid mobile number"), alternativeMobile: z.string(), insuranceType: z.string().min(1, "Select insurance type"), brandType: z.string().min(1, "Select brand"), termAndPpt: z.string().trim().min(1, "Enter term and PPT"), applicationNumber: z.string().trim().min(1, "Enter application number"), email: z.string().trim().email("Enter a valid email"), nomineeName: z.string().trim().min(2, "Enter nominee name"), nomineeDob: z.string().min(1, "Select nominee date of birth"), shortAddress: z.string().trim().min(5, "Enter a short address") });
const STORAGE_KEY = "insure365_popup_seen";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (field: keyof typeof initialForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  useEffect(() => { if (!localStorage.getItem(STORAGE_KEY)) { const timer = setTimeout(() => { setOpen(true); localStorage.setItem(STORAGE_KEY, "1"); }, 2500); return () => clearTimeout(timer); } }, []);
  async function submit(event: React.FormEvent) { event.preventDefault(); const result = schema.safeParse(form); if (!result.success) { setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message]))); return; } try { await postContact(form); setErrors({}); setForm(initialForm); setOpen(false); toast.success("Your details have been submitted successfully."); } catch { toast.error("Something went wrong. Please try again."); } }
  const field = (id: keyof typeof initialForm, label: string, type = "text") => <div className="space-y-1"><Label htmlFor={`popup-${id}`}>{label}</Label><Input id={`popup-${id}`} type={type} value={form[id]} onChange={(event) => update(id, event.target.value)} />{errors[id] && <p className="text-xs text-destructive">{errors[id]}</p>}</div>;
  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl"><DialogHeader><DialogTitle className="text-2xl">Insurance application details</DialogTitle><DialogDescription>Complete the form and our advisor will contact you. Submission date is captured automatically.</DialogDescription></DialogHeader><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">{field("name", "Full name")}{field("dob", "Date of birth", "date")}{field("mobile", "Mobile number", "tel")}{field("alternativeMobile", "Alternative mobile", "tel")}<div className="space-y-1"><Label htmlFor="popup-insuranceType">Type of insurance</Label><select id="popup-insuranceType" value={form.insuranceType} onChange={(event) => update("insuranceType", event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Select type</option>{insuranceTypes.map((item) => <option key={item}>{item}</option>)}</select>{errors.insuranceType && <p className="text-xs text-destructive">{errors.insuranceType}</p>}</div><div className="space-y-1"><Label htmlFor="popup-brandType">Brand type</Label><select id="popup-brandType" value={form.brandType} onChange={(event) => update("brandType", event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="">Select brand</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>{errors.brandType && <p className="text-xs text-destructive">{errors.brandType}</p>}</div>{field("termAndPpt", "Term & PPT")}{field("applicationNumber", "Application number")}{field("email", "Email address", "email")}{field("nomineeName", "Nominee name")}{field("nomineeDob", "Nominee date of birth", "date")}<div className="space-y-1 sm:col-span-2"><Label htmlFor="popup-shortAddress">Short address</Label><Textarea id="popup-shortAddress" rows={2} value={form.shortAddress} onChange={(event) => update("shortAddress", event.target.value)} />{errors.shortAddress && <p className="text-xs text-destructive">{errors.shortAddress}</p>}</div><Button type="submit" className="w-full sm:col-span-2">Submit details</Button></form></DialogContent></Dialog>;
}
