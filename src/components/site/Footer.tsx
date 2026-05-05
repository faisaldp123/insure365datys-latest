import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, Shield, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </span>
            Insure365days
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Your trusted partner for insurance solutions — every single day of the year.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/services/$type" params={{ type: "general" }} className="hover:text-primary">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services/$type" params={{ type: "general" }} className="hover:text-primary">General Insurance</Link></li>
            <li><Link to="/services/$type" params={{ type: "motor" }} className="hover:text-primary">Motor Insurance</Link></li>
            <li><Link to="/services/$type" params={{ type: "health" }} className="hover:text-primary">Health Insurance</Link></li>
            <li><Link to="/services/$type" params={{ type: "life" }} className="hover:text-primary">Life Insurance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>A7, Moti Nagar, New Delhi 110094</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+1 (800) 365-0000</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>hello@insure365days.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Insure365days. All rights reserved.
      </div>
    </footer>
  );
}