import { Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  Shield,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-7 px-4 py-10 md:grid-cols-4">

        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </span>
            Insure365days
          </Link>

          <p className="mt-4 text-sm text-muted-foreground">
            Your trusted partner for Life, Health, Motor and General Insurance solutions.
          </p>

          <div className="mt-5 flex gap-3">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
  >
    <FaFacebookF size={14} />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
  >
    <FaInstagram size={14} />
  </a>

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
  >
    <FaXTwitter size={14} />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
  >
    <FaLinkedinIn size={14} />
  </a>
</div>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>

          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>

            <li>
              <Link
                to="/services/$type"
                params={{ type: "general" }}
                className="hover:text-primary"
              >
                Services
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Insurance Services</h4>

          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                to="/services/$type"
                params={{ type: "general" }}
                className="hover:text-primary"
              >
                General Insurance
              </Link>
            </li>

            <li>
              <Link
                to="/services/$type"
                params={{ type: "motor" }}
                className="hover:text-primary"
              >
                Motor Insurance
              </Link>
            </li>

            <li>
              <Link
                to="/services/$type"
                params={{ type: "health" }}
                className="hover:text-primary"
              >
                Health Insurance
              </Link>
            </li>

            <li>
              <Link
                to="/services/$type"
                params={{ type: "life" }}
                className="hover:text-primary"
              >
                Life Insurance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact Us</h4>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">

            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>New Delhi, India</span>
            </li>

            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 XXXXX XXXXX</span>
            </li>

            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@insure365days.com</span>
            </li>

          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Insure365days. All rights reserved.
      </div>
    </footer>
  );
}
