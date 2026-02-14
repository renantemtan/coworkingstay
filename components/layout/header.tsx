'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Location } from '@/types/content';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  locations: Location[];
  activeLocation?: Location;
}

const logoMap: Record<string, string> = {
  'work-n-wave': '/logos/worknwave_logo.svg',
  'work-n-lake': '/logos/worknlake_logo.svg',
  'work-n-surf': '/logos/worknsurf_logo.svg',
};

export function Header({ locations, activeLocation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isHoveredTop, setIsHoveredTop] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showFromHover = isVisible || isHoveredTop;

  const logoSrc = activeLocation ? (logoMap[activeLocation.id] || '/logos/coworkingstay_logo.svg') : '/logos/coworkingstay_logo.svg';
  const brandName = activeLocation ? activeLocation.name : 'CoWorkingStay';
  const brandTagline = activeLocation ? activeLocation.tagline : 'Your best workday starts here.';
  const logoLink = '/';

  return (
    <>
      {/* Invisible hover zone at top of viewport */}
      <div
        className="fixed top-0 left-0 w-full h-5 z-[60]"
        onMouseEnter={() => {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
          setIsHoveredTop(true);
        }}
      />
      <header
        className={`fixed top-0 z-50 w-full border-b border-border/40 bg-white shadow-sm transition-all duration-500 ease-in-out ${showFromHover
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        onMouseEnter={() => {
          if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        }}
        onMouseLeave={() => {
          hideTimeoutRef.current = setTimeout(() => {
            setIsHoveredTop(false);
          }, 800);
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Logo */}
            <Link href={logoLink} className="flex items-center gap-2">
              <img
                src={logoSrc}
                alt={brandName}
                className="h-10 w-auto"
              />
              <div className="hidden flex-col sm:flex">
                <span className="font-sora text-sm font-bold text-foreground">{brandName}</span>
                <span className="text-xs text-muted-foreground">{brandTagline}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                    Locations
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {locations.map((location) => (
                    <DropdownMenuItem key={location.id} asChild>
                      <Link href={`/locations/${location.slug}`} className="flex cursor-pointer items-center justify-between">
                        <span>{location.name}</span>
                        <Badge variant={location.status === 'Open' ? 'default' : 'secondary'} className="ml-2">
                          {location.status}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/experience" className="text-sm font-medium transition-colors hover:text-primary">
                Experience
              </Link>
              <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
                FAQ
              </Link>
            </nav>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="hidden bg-primary hover:bg-blue-600 sm:inline-flex"
              >
                <a href="#booking">Book Now</a>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-colors hover:bg-muted md:hidden"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="border-t border-border/40 px-0 py-4 md:hidden">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="px-4 py-2">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">LOCATIONS</p>
                  <div className="space-y-1">
                    {locations.map((location) => (
                      <Link
                        key={location.id}
                        href={`/locations/${location.slug}`}
                        className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{location.name}</span>
                        <Badge variant={location.status === 'Open' ? 'default' : 'secondary'} className="ml-2 text-xs">
                          {location.status}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/experience"
                  className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Experience
                </Link>
                <Link
                  href="/faq"
                  className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="border-t border-border/40 px-4 pt-4">
                  <Button asChild className="w-full bg-primary hover:bg-blue-600" onClick={() => setMobileMenuOpen(false)}>
                    <a href="#booking">Book Now</a>
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
