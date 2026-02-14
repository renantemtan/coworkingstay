import Link from 'next/link';
import type { Location } from '@/types/content';
import { Mail, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  locations: Location[];
}

export function Footer({ locations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logos/coworkingstay_logo.svg"
                alt="CoWorkingStay"
                className="h-10 w-auto"
              />
              <span className="font-sora font-bold text-foreground">CoWorkingStay</span>
            </div>
            <p className="text-sm text-muted-foreground">Designed for those who refuse to choose between results and reality.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="mb-4 font-sora font-semibold text-foreground">Locations</h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.id}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-sora font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-sora font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:hello@coworkingstay.com" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  hello@coworkingstay.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/40" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} CoWorkingStay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/policies" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/policies" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
