import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const contactInquiries = pgTable('contact_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 160 }).notNull(),
  subject: varchar('subject', { length: 200 }).notNull(),
  message: text('message').notNull(),
  consentGiven: boolean('consent_given').notNull().default(true),
  status: varchar('status', { length: 32 }).notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const waitlistSignups = pgTable('waitlist_signups', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 160 }).notNull(),
  countryName: varchar('country_name', { length: 100 }).notNull(),
  countryIso: varchar('country_iso', { length: 8 }).notNull(),
  dialPrefix: varchar('dial_prefix', { length: 12 }).notNull().default(''),
  phone: varchar('phone', { length: 32 }).notNull(),
  formattedPhone: varchar('formatted_phone', { length: 48 }).notNull(),
  locationName: varchar('location_name', { length: 120 }).notNull(),
  consentGiven: boolean('consent_given').notNull().default(true),
  status: varchar('status', { length: 32 }).notNull().default('waiting'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const bookingRequests = pgTable('booking_requests', {
  id: serial('id').primaryKey(),
  referenceCode: varchar('reference_code', { length: 32 }).notNull().unique(),
  locationName: varchar('location_name', { length: 120 }).notNull(),
  locationSlug: varchar('location_slug', { length: 120 }).notNull(),
  guestName: varchar('guest_name', { length: 120 }).notNull(),
  guestEmail: varchar('guest_email', { length: 160 }).notNull(),
  guestPhone: varchar('guest_phone', { length: 40 }).notNull(),
  checkInDate: varchar('check_in_date', { length: 16 }).notNull(),
  checkOutDate: varchar('check_out_date', { length: 16 }).notNull(),
  nights: integer('nights').notNull(),
  rooms: integer('rooms').notNull(),
  guests: integer('guests').notNull(),
  currency: varchar('currency', { length: 8 }).notNull().default('PHP'),
  nightlyRatePhp: integer('nightly_rate_php').notNull(),
  totalPhp: integer('total_php').notNull(),
  depositPhp: integer('deposit_php').notNull(),
  nightlyRateUsd: integer('nightly_rate_usd').notNull(),
  totalUsd: integer('total_usd').notNull(),
  depositUsd: integer('deposit_usd').notNull(),
  notes: text('notes').notNull().default(''),
  consentGiven: boolean('consent_given').notNull().default(true),
  status: varchar('status', { length: 32 }).notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export type ContactInquiryRow = typeof contactInquiries.$inferSelect;
export type WaitlistSignupRow = typeof waitlistSignups.$inferSelect;
export type BookingRequestRow = typeof bookingRequests.$inferSelect;
