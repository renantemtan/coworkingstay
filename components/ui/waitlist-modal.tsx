'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import countriesData from '@/data/countries.json';

interface Country {
  name: string;
  iso: string;
  iso2: string;
  prefix: string;
}

// Pinned ISO codes for the "Most Used" section
const PINNED_ISOS = ['PHL', 'AUS', 'GBR', 'JPN', 'USA'];

const allCountries: Country[] = countriesData as Country[];

// Build sorted groups from the single JSON source
const top5Countries = PINNED_ISOS
  .map((iso) => allCountries.find((c) => c.iso === iso)!)
  .filter(Boolean);

const mainCountries = allCountries
  .filter((c) => !PINNED_ISOS.includes(c.iso))
  .sort((a, b) => a.name.localeCompare(b.name));

const otherCountry: Country = { name: 'Other', iso: 'OTH', iso2: 'un', prefix: '' };

const sortedCountries = [
  ...top5Countries,
  ...mainCountries,
  otherCountry
];

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName?: string;
}

export function WaitlistModal({ isOpen, onClose, locationName }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(top5Countries[0]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMessage('Please agree to the Privacy Notice before joining the waitlist.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          countryName: selectedCountry.name,
          countryIso: selectedCountry.iso,
          dialPrefix: selectedCountry.prefix,
          phone: phoneNumber,
          locationName: locationName || 'Upcoming Locations',
          consent,
          website,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setErrorMessage(
          payload.error || 'Could not submit your signup. Please try again.'
        );
        setLoading(false);
        return;
      }

      trackEvent('waitlist_signup', {
        location: locationName || 'Upcoming Locations',
        country: selectedCountry.iso,
      });
      setLoading(false);
      setSubmitted(true);
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setSubmitted(false);
      setErrorMessage(null);
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setConsent(false);
      setWebsite('');
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl overflow-hidden">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-sora text-2xl font-bold">Join the Waitlist</DialogTitle>
              <DialogDescription className="font-inter text-muted-foreground mt-2">
                Be the first to know when {locationName || 'our new locations'} open for bookings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="waitlist-website">Website</label>
                <input
                  id="waitlist-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 flex items-start gap-2.5 text-xs text-red-900 font-inter"
                >
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold ml-1 font-inter">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-[#03B1F7] focus:ring-[#03B1F7] font-inter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold ml-1 font-inter">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-[#03B1F7] focus:ring-[#03B1F7] font-inter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold ml-1 font-inter">Phone Number</Label>
                <div className="flex gap-2 h-12">
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={popoverOpen}
                        className="w-[110px] h-full justify-between px-3 rounded-xl border-slate-200"
                      >
                        <span className="flex items-center gap-2 text-sm font-bold">
                          {selectedCountry.iso2 === 'un' ? (
                            <span className="text-[10px]">🌐</span>
                          ) : (
                            <img 
                              src={`https://flagcdn.com/${selectedCountry.iso2}.svg`} 
                              className="w-5 h-[14px] object-cover rounded-[1px]" 
                              alt="" 
                            />
                          )}
                          {selectedCountry.iso}
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[300px] rounded-2xl overflow-hidden shadow-2xl border-none" align="start">
                      <Command className="border-none">
                        <CommandInput placeholder="Search country..." className="border-none h-14" />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup heading="Most Used">
                            {top5Countries.map((country) => (
                              <CommandItem
                                key={country.iso}
                                value={country.name}
                                onSelect={() => {
                                  setSelectedCountry(country);
                                  setPopoverOpen(false);
                                }}
                                className="flex items-center justify-between py-3 px-4 cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={`https://flagcdn.com/${country.iso2}.svg`} 
                                    alt="" 
                                    className="w-7 h-5 object-cover rounded-[2px] border border-slate-200"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900">{country.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{country.iso} ({country.prefix})</span>
                                  </div>
                                </div>
                                {selectedCountry.iso === country.iso && (
                                  <Check className="h-4 w-4 text-sky-500" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup heading="All Countries">
                            {mainCountries.map((country) => (
                              <CommandItem
                                key={country.iso}
                                value={country.name}
                                onSelect={() => {
                                  setSelectedCountry(country);
                                  setPopoverOpen(false);
                                }}
                                className="flex items-center justify-between py-3 px-4 cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={`https://flagcdn.com/${country.iso2}.svg`} 
                                    alt="" 
                                    className="w-7 h-5 object-cover rounded-[2px] border border-slate-200"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-900">{country.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{country.iso} ({country.prefix})</span>
                                  </div>
                                </div>
                                {selectedCountry.iso === country.iso && (
                                  <Check className="h-4 w-4 text-sky-500" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                          <CommandGroup>
                            <CommandItem
                              key={otherCountry.iso}
                              value={otherCountry.name}
                              onSelect={() => {
                                setSelectedCountry(otherCountry);
                                setPopoverOpen(false);
                              }}
                              className="flex items-center justify-between py-3 px-4 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">🌐</span>
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-slate-900">{otherCountry.name}</span>
                                  <span className="text-xs text-muted-foreground">Select if your country is not listed</span>
                                </div>
                              </div>
                              {selectedCountry.iso === otherCountry.iso && (
                                <Check className="h-4 w-4 text-sky-500" />
                              )}
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex-none">
                    <Input
                      value={selectedCountry.prefix}
                      readOnly
                      tabIndex={-1}
                      className="w-[70px] h-full rounded-xl bg-slate-50 border-slate-200 text-center font-bold text-muted-foreground pointer-events-none"
                    />
                  </div>

                  <div className="flex-1">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9XX XXX XXXX"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full h-full rounded-xl border-slate-200 focus:border-[#03B1F7] focus:ring-[#03B1F7] font-inter"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-muted-foreground font-inter leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#03B1F7] focus:ring-[#03B1F7]"
                  />
                  <span>
                    I agree to the{' '}
                    <Link
                      href="/policies#privacy-policy"
                      onClick={handleClose}
                      className="font-semibold text-[#0C4A96] underline hover:text-[#03B1F7]"
                    >
                      Privacy Notice
                    </Link>{' '}
                    and consent to CoWorkingStay contacting me when this location opens.
                  </span>
                </label>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleClose}
                  className="w-full sm:w-1/2 rounded-xl py-6 font-semibold font-inter"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:w-1/2 bg-[#03B1F7] hover:bg-[#029ADE] text-white rounded-xl py-6 font-bold font-inter shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? 'Submitting...' : 'Join Now'}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="font-sora text-3xl font-bold text-slate-900 mb-4">You&apos;re on the list!</h3>
            <p className="font-inter text-slate-600 mb-8 max-w-[280px]">
              Thanks for your interest in {locationName}. We&apos;ll reach out to you as soon as we open.
            </p>
            <Button onClick={handleClose} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-10 py-6 font-bold font-inter">
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
