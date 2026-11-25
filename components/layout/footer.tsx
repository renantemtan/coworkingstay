import Link from 'next/link';
import type { Location } from '@/types/content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getLiveSocialEntries } from '@/lib/socials';

interface FooterProps {
  locations: Location[];
}

export function Footer({ locations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const primaryContact = locations[0]?.contact;
  const liveSocials = getLiveSocialEntries(primaryContact?.socials);

  return (
    <footer className="border-t border-border/40 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex items-center gap-2">
              <img
                src="/logos/coworkingstay_logo.svg"
                alt="CoWorkingStay"
                className="h-10 w-auto"
              />
              <span className="font-sora font-bold text-foreground">CoWorkingStay</span>
            </div>
            <p className="text-sm text-muted-foreground">Designed for those who refuse to choose between future results and today&apos;s reality.</p>
            {liveSocials.length > 0 && (
              <div className="flex gap-4">
                {liveSocials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
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
          <div className="lg:col-span-2">
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
          <div className="lg:col-span-3">
            <h3 className="mb-4 font-sora font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              {primaryContact?.email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a href={`mailto:${primaryContact.email}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {primaryContact.email}
                  </a>
                </li>
              )}
              {primaryContact?.number && primaryContact.number !== 'TBD' && (
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a href={`tel:${primaryContact.number.replace(/\s/g, '')}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {primaryContact.number}
                  </a>
                </li>
              )}
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
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/policies#privacy-policy" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/policies#community-guidelines" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Community Guidelines
            </Link>
            <Link href="/policies#booking-cancellation" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Booking Policy
            </Link>
            <Link href="/policies#liability-disclaimer" className="text-xs text-muted-foreground transition-colors hover:text-primary">
              Terms &amp; Liability
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
