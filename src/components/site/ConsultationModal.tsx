"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { postContact } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),

  phone: z.string().trim().min(7, "Enter a valid phone").max(20),

  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(120),

  insuranceType: z
    .string()
    .trim()
    .min(1, "Select insurance type"),
});

const STORAGE_KEY = "insure365_popup_seen";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    insuranceType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((i) => {
        if (i.path[0]) {
          fieldErrors[i.path[0] as string] = i.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      await postContact({
        name: form.name,
        mobile: form.phone,
        email: form.email,
        insuranceType: form.insuranceType,
      });

      setErrors({});

      toast.success(
        "Thanks! We'll call you back within 24 hours."
      );

      setOpen(false);

      setForm({
        name: "",
        phone: "",
        email: "",
        insuranceType: "",
      });
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Get Your Free Insurance Consultation
          </DialogTitle>

          <DialogDescription>
            Speak to a licensed expert. No obligations —
            just clarity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          {/* NAME */}
          <div className="space-y-1.5">
            <Label htmlFor="m-name">Name</Label>

            <Input
              id="m-name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Your full name"
            />

            {errors.name && (
              <p className="text-xs text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div className="space-y-1.5">
            <Label htmlFor="m-phone">Phone</Label>

            <Input
              id="m-phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="+1 555 000 0000"
            />

            {errors.phone && (
              <p className="text-xs text-destructive">
                {errors.phone}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <Label htmlFor="m-email">Email</Label>

            <Input
              id="m-email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="you@email.com"
            />

            {errors.email && (
              <p className="text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* INSURANCE TYPE */}
          <div className="space-y-1.5">
            <Label htmlFor="insuranceType">
              Insurance Type
            </Label>

            <select
              id="insuranceType"
              value={form.insuranceType}
              onChange={(e) =>
                setForm({
                  ...form,
                  insuranceType: e.target.value,
                })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">
                Select Insurance Type
              </option>

              <option value="Life Insurance">
                Life Insurance
              </option>

              <option value="Health Insurance">
                Health Insurance
              </option>

              <option value="General Insurance">
                General Insurance
              </option>

              <option value="Motor Insurance">
                Motor Insurance
              </option>
            </select>

            {errors.insuranceType && (
              <p className="text-xs text-destructive">
                {errors.insuranceType}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-[var(--primary-glow)]"
          >
            Request Callback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}