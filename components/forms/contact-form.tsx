'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  CalendarDays,
  MessageSquare,
  BedDouble,
  Users,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trackEvent } from '@/lib/analytics';
import {
  calculateNights,
  calculateStayEstimate,
  formatCurrency,
  WORK_N_WAVE_PRICING,
  type CurrencyCode,
  type StayEstimate,
} from '@/lib/pricing';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  subject: z.string().trim().min(2, 'Please enter a subject.').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'Please share a few more details (at least 10 characters).')
    .max(5000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Please agree to the Privacy Notice before sending your message.',
  }),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface BookableLocationOption {
  slug: string;
  name: string;
}

interface ContactFormProps {
  defaultMode?: 'booking' | 'inquiry';
  defaultLocationSlug?: string;
  defaultSubject?: string;
  bookableLocations: BookableLocationOption[];
  fallbackEmail: string;
}

function addDaysIso(baseIso: string, days: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(baseIso);
  if (!match) return baseIso;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
  return date.toISOString().slice(0, 10);
}

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function amountIn(currency: CurrencyCode, php: number, usd: number): string {
  return currency === 'PHP' ? formatCurrency(php, 'PHP') : formatCurrency(usd, 'USD');
}

export function ContactForm({
  defaultMode = 'inquiry',
  defaultLocationSlug,
  defaultSubject = '',
  bookableLocations,
  fallbackEmail,
}: ContactFormProps) {
  const [mode, setMode] = useState<'booking' | 'inquiry'>(defaultMode);

  // General inquiry state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState<string | null>(null);

  // Booking request state
  const todayIso = useMemo(() => getTodayIso(), []);
  const initialLocation =
    bookableLocations.find((l) => l.slug === defaultLocationSlug) ||
    bookableLocations[0] || {
      slug: 'work-n-wave-puerto-galera',
      name: "Work 'n Wave",
    };

  const [locationSlug, setLocationSlug] = useState(initialLocation.slug);
  const [checkInDate, setCheckInDate] = useState(() => addDaysIso(todayIso, 1));
  const [checkOutDate, setCheckOutDate] = useState(() => addDaysIso(todayIso, 3));
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [currency, setCurrency] = useState<CurrencyCode>('PHP');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingConsent, setBookingConsent] = useState(false);
  const bookingHoneypotRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceCode: string;
    estimate: StayEstimate;
    locationName: string;
    currency: CurrencyCode;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: defaultSubject,
      message: '',
      consent: false,
      website: '',
    },
  });

  useEffect(() => {
    if (defaultSubject) {
      setValue('subject', defaultSubject);
    }
  }, [defaultSubject, setValue]);

  // Bring the confirmation (or error banner) into view after submit so it is never off-screen
  useEffect(() => {
    if (bookingConfirmation || inquirySubmitted || bookingError || inquiryError) {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [bookingConfirmation, inquirySubmitted, bookingError, inquiryError]);

  const maxGuestsForRooms = rooms * WORK_N_WAVE_PRICING.maxGuestsPerRoom;
  const nights = calculateNights(checkInDate, checkOutDate);
  const estimate = calculateStayEstimate({ rooms, guests, nights });

  const handleRoomsChange = (nextRooms: number) => {
    setRooms(nextRooms);
    const maxAllowed = nextRooms * WORK_N_WAVE_PRICING.maxGuestsPerRoom;
    if (guests < nextRooms) setGuests(nextRooms);
    else if (guests > maxAllowed) setGuests(maxAllowed);
  };

  const handleCheckInChange = (nextIn: string) => {
    setCheckInDate(nextIn);
    if (calculateNights(nextIn, checkOutDate) < 1) {
      setCheckOutDate(addDaysIso(nextIn, 1));
    }
  };

  const onSubmitInquiry = async (values: ContactFormValues) => {
    setInquiryError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setInquiryError(
          payload.error ||
            `Something went wrong. Please try again or email ${fallbackEmail}.`
        );
        return;
      }

      trackEvent('contact_form_submit', { subject: values.subject });
      setInquirySubmitted(true);
      reset({
        name: '',
        email: '',
        subject: defaultSubject,
        message: '',
        consent: false,
        website: '',
      });
    } catch {
      setInquiryError(
        `Network error. Please check your connection or email ${fallbackEmail} directly.`
      );
    }
  };

  const onSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!bookingConsent) {
      setBookingError('Please agree to the Privacy Notice before submitting your booking request.');
      return;
    }

    if (!estimate) {
      setBookingError('Please select valid check-in/check-out dates, rooms, and guest count.');
      return;
    }

    const selectedLocation =
      bookableLocations.find((l) => l.slug === locationSlug) || initialLocation;

    setBookingSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationSlug: selectedLocation.slug,
          locationName: selectedLocation.name,
          guestName,
          guestEmail,
          guestPhone,
          checkInDate,
          checkOutDate,
          rooms,
          guests,
          currency,
          notes,
          consent: bookingConsent,
          website: bookingHoneypotRef.current?.value ?? '',
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        referenceCode?: string;
        estimate?: StayEstimate;
      };

      if (!response.ok || !payload.ok) {
        setBookingError(
          payload.error ||
            `Could not submit your booking request. Please try again or email ${fallbackEmail}.`
        );
        setBookingSubmitting(false);
        return;
      }

      trackEvent('booking_request_submit', {
        location: selectedLocation.name,
        rooms,
        guests,
        nights: estimate.nights,
        currency,
      });

      setBookingConfirmation({
        referenceCode: payload.referenceCode || 'CWS-PENDING',
        estimate: payload.estimate || estimate,
        locationName: selectedLocation.name,
        currency,
      });
      setBookingSubmitting(false);
    } catch {
      setBookingError(
        `Network error. Please check your connection or email ${fallbackEmail} directly.`
      );
      setBookingSubmitting(false);
    }
  };

  return (
    <div ref={formTopRef} className="flex flex-col h-full scroll-mt-28">
      {/* Mode Switcher */}
      <div
        className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 mb-8"
        role="tablist"
        aria-label="Form type"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'booking'}
          onClick={() => setMode('booking')}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-sora font-semibold transition-all ${
            mode === 'booking'
              ? 'bg-white text-[#0C4A96] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CalendarDays className="h-4 w-4" />
          Book a Stay
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'inquiry'}
          onClick={() => setMode('inquiry')}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-sora font-semibold transition-all ${
            mode === 'inquiry'
              ? 'bg-white text-[#0C4A96] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          General Inquiry
        </button>
      </div>

      {mode === 'booking' ? (
        bookingConfirmation ? (
          <div className="flex flex-col items-center justify-center text-center py-8 my-auto animate-in fade-in duration-300">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
              <CheckCircle2 className="h-9 w-9 text-emerald-500" />
            </div>
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Booking Request Received!
            </h2>
            <p className="text-sm font-semibold text-[#03B1F7] mb-4">
              Reference: {bookingConfirmation.referenceCode}
            </p>
            <p className="font-inter text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
              We&apos;ve received your stay request for <strong>{bookingConfirmation.locationName}</strong> ({checkInDate} → {checkOutDate}, {bookingConfirmation.estimate.rooms} room{bookingConfirmation.estimate.rooms > 1 ? 's' : ''}, {bookingConfirmation.estimate.guests} guest{bookingConfirmation.estimate.guests > 1 ? 's' : ''}). We will verify room availability and email you payment instructions for the 50% reservation deposit.
            </p>
            <div className="w-full max-w-sm rounded-2xl bg-slate-50 border border-slate-200 p-4 text-left text-sm space-y-1.5 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Total</span>
                <span className="font-bold text-foreground">
                  {amountIn(bookingConfirmation.currency, bookingConfirmation.estimate.totalPhp, bookingConfirmation.estimate.totalUsd)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">50% Deposit to Confirm</span>
                <span className="font-semibold text-[#0C4A96]">
                  {amountIn(bookingConfirmation.currency, bookingConfirmation.estimate.depositPhp, bookingConfirmation.estimate.depositUsd)}
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setBookingConfirmation(null);
                setGuestName('');
                setGuestEmail('');
                setGuestPhone('');
                setNotes('');
                setBookingConsent(false);
              }}
              className="rounded-xl h-12 px-8 font-semibold font-inter"
            >
              Submit Another Request
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmitBooking} className="space-y-6 flex flex-col h-full">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="booking-website">Website</label>
              <input
                id="booking-website"
                ref={bookingHoneypotRef}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>

            {bookingError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50/80 p-4 flex items-start gap-3 text-sm text-red-900"
              >
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{bookingError}</p>
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="mt-1 inline-block font-semibold underline hover:text-red-700"
                  >
                    Email {fallbackEmail} directly →
                  </a>
                </div>
              </div>
            )}

            {/* Location & Currency */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="booking-location" className="text-sm font-semibold text-foreground font-sora">
                  Location
                </label>
                <select
                  id="booking-location"
                  value={locationSlug}
                  onChange={(e) => setLocationSlug(e.target.value)}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-transparent px-4 text-sm font-inter focus:bg-white focus:border-[#03B1F7] focus:outline-none transition-all"
                >
                  {bookableLocations.map((loc) => (
                    <option key={loc.slug} value={loc.slug}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-semibold text-foreground font-sora block">
                  Display Currency
                </span>
                <div className="grid grid-cols-2 gap-2 h-12 p-1 rounded-xl bg-slate-50">
                  {(['PHP', 'USD'] as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setCurrency(code)}
                      className={`rounded-lg text-xs font-bold transition-all ${
                        currency === code
                          ? 'bg-[#0C4A96] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {code === 'PHP' ? 'PHP (₱)' : 'USD ($)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Check-in / Check-out */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="checkInDate" className="text-sm font-semibold text-foreground font-sora">
                  Check-in Date
                </label>
                <Input
                  id="checkInDate"
                  type="date"
                  min={todayIso}
                  value={checkInDate}
                  onChange={(e) => handleCheckInChange(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="checkOutDate" className="text-sm font-semibold text-foreground font-sora">
                  Check-out Date
                </label>
                <Input
                  id="checkOutDate"
                  type="date"
                  min={addDaysIso(checkInDate, 1)}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7]"
                />
              </div>
            </div>

            {/* Rooms & Guests */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="booking-rooms" className="text-sm font-semibold text-foreground font-sora flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4 text-[#0C4A96]" />
                  Rooms (1–8)
                </label>
                <select
                  id="booking-rooms"
                  value={rooms}
                  onChange={(e) => handleRoomsChange(Number(e.target.value))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-transparent px-4 text-sm font-inter focus:bg-white focus:border-[#03B1F7] focus:outline-none transition-all"
                >
                  {Array.from({ length: WORK_N_WAVE_PRICING.maxRooms }, (_, i) => i + 1).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? 'Room' : 'Rooms'} (2 double beds each)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-guests" className="text-sm font-semibold text-foreground font-sora flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#03B1F7]" />
                  Total Guests (max {maxGuestsForRooms})
                </label>
                <select
                  id="booking-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-12 rounded-xl bg-slate-50 border border-transparent px-4 text-sm font-inter focus:bg-white focus:border-[#03B1F7] focus:outline-none transition-all"
                >
                  {Array.from({ length: maxGuestsForRooms - rooms + 1 }, (_, i) => rooms + i).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Rate Estimate Card */}
            {estimate && (
              <div className="rounded-2xl p-5 bg-[#FAF8F5] border border-[#D6DCE5] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Nightly Rate ({rooms} {rooms === 1 ? 'room' : 'rooms'}, {guests} {guests === 1 ? 'guest' : 'guests'})
                  </span>
                  <span className="font-semibold text-slate-900">
                    {amountIn(currency, estimate.nightlyRatePhp, estimate.nightlyRateUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base pt-2 border-t border-[#D6DCE5]">
                  <span className="font-sora font-bold text-slate-900">
                    Estimated Total ({estimate.nights} {estimate.nights === 1 ? 'night' : 'nights'})
                  </span>
                  <span className="font-sora font-bold text-[#0C4A96] text-lg">
                    {amountIn(currency, estimate.totalPhp, estimate.totalUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>50% Deposit Required to Confirm</span>
                  <span className="font-semibold text-slate-800">
                    {amountIn(currency, estimate.depositPhp, estimate.depositUsd)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#03B1F7]" />
                  <span>
                    Per night, includes coworking space access. No breakfast included. Subject to room availability.
                  </span>
                </p>
              </div>
            )}

            {/* Guest Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="guestName" className="text-sm font-semibold text-foreground font-sora">
                  Full Name
                </label>
                <Input
                  id="guestName"
                  placeholder="Your full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="guestEmail" className="text-sm font-semibold text-foreground font-sora">
                  Email Address
                </label>
                <Input
                  id="guestEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="guestPhone" className="text-sm font-semibold text-foreground font-sora">
                Mobile / WhatsApp / Viber Number
              </label>
              <Input
                id="guestPhone"
                type="tel"
                placeholder="+63 9XX XXX XXXX"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                required
                className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bookingNotes" className="text-sm font-semibold text-foreground font-sora">
                Notes or Special Requests <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
              </label>
              <Textarea
                id="bookingNotes"
                placeholder="Estimated arrival time, dual-monitor request, team conference room needs, parking inquiry..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[96px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] p-4 resize-none"
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer text-xs text-muted-foreground font-inter leading-relaxed">
                <input
                  type="checkbox"
                  checked={bookingConsent}
                  onChange={(e) => setBookingConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#03B1F7] focus:ring-[#03B1F7]"
                />
                <span>
                  I agree to the{' '}
                  <Link
                    href="/policies#privacy-policy"
                    className="font-semibold text-[#0C4A96] underline hover:text-[#03B1F7]"
                  >
                    Privacy Notice
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/policies#booking-cancellation"
                    className="font-semibold text-[#0C4A96] underline hover:text-[#03B1F7]"
                  >
                    Booking Policy
                  </Link>{' '}
                  (50% deposit, no-refund, 48-hour rebooking window).
                </span>
              </label>
            </div>

            <div className="mt-auto pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={bookingSubmitting}
                className="w-full bg-[#E53652] hover:bg-[#C82D45] text-white rounded-xl h-12 font-semibold shadow-sm hover:shadow-md transition-all"
              >
                {bookingSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Booking Request...
                  </span>
                ) : (
                  'Request Booking'
                )}
              </Button>
            </div>
          </form>
        )
      ) : inquirySubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-12 my-auto animate-in fade-in duration-300">
          <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" />
          </div>
          <h2 className="font-sora text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Message Sent!
          </h2>
          <p className="font-inter text-muted-foreground max-w-md mb-8 leading-relaxed">
            Thank you for reaching out to CoWorkingStay. Our team has received your inquiry and will get back to you shortly.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setInquirySubmitted(false)}
            className="rounded-xl h-12 px-8 font-semibold font-inter"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitInquiry)} className="space-y-6 flex flex-col h-full" noValidate>
          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('website')}
            />
          </div>

          {inquiryError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50/80 p-4 flex items-start gap-3 text-sm text-red-900"
            >
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{inquiryError}</p>
                <a
                  href={`mailto:${fallbackEmail}`}
                  className="mt-1 inline-block font-semibold underline hover:text-red-700"
                >
                  Email {fallbackEmail} directly →
                </a>
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground font-sora">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground font-sora">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                aria-invalid={Boolean(errors.email)}
                className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs font-medium text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-semibold text-foreground font-sora">
              Subject
            </label>
            <Input
              id="subject"
              placeholder="What is this regarding?"
              aria-invalid={Boolean(errors.subject)}
              className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all"
              {...register('subject')}
            />
            {errors.subject && (
              <p className="text-xs font-medium text-red-600">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-foreground font-sora">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell us more about your inquiry (e.g., Partnerships, Investor Inquiries, Group Events)..."
              aria-invalid={Boolean(errors.message)}
              className="min-h-[160px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#03B1F7] transition-all p-4 resize-none"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-xs font-medium text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-muted-foreground font-inter leading-relaxed">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#03B1F7] focus:ring-[#03B1F7]"
                {...register('consent')}
              />
              <span>
                I agree to the{' '}
                <Link
                  href="/policies#privacy-policy"
                  className="font-semibold text-[#0C4A96] underline hover:text-[#03B1F7]"
                >
                  Privacy Notice
                </Link>{' '}
                and consent to CoWorkingStay using my details to respond to this inquiry.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs font-medium text-red-600">{errors.consent.message}</p>
            )}
          </div>

          <div className="mt-auto pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-[#03B1F7] hover:bg-sky-500 text-white rounded-xl h-12 font-semibold shadow-sm hover:shadow-md transition-all"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Message...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
