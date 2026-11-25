'use client';

import { Mail, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import type { Location } from '@/types/content';
import { getLiveSocialEntries } from '@/lib/socials';
import { trackEvent } from '@/lib/analytics';

interface ContactSectionProps {
    location: Location;
}

export function ContactSection({ location }: ContactSectionProps) {
    const contact = location.contact;
    const liveSocials = getLiveSocialEntries(contact?.socials);

    return (
        <section className="bg-[#f0f2f5] py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground font-inter">
                        Ready to experience {location.name}? Reach out — we&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
                    {/* Email */}
                    {contact?.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0C4A96]/10 text-[#0C4A96]">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider">Email</p>
                                <p className="mt-1 text-sm font-medium text-gray-900 whitespace-nowrap">{contact.email}</p>
                            </div>
                        </a>
                    )}

                    {/* Mobile / WhatsApp */}
                    {contact?.number && (
                        <a
                            href={`tel:${contact.number.replace(/\s/g, '')}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03B1F7]/10 text-[#03B1F7]">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider">Mobile • WhatsApp • Viber • Telegram</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{contact.number}</p>
                            </div>
                        </a>
                    )}

                    {/* Landline */}
                    {contact?.landline && (
                        <a
                            href={`tel:${contact.landline.replace(/\s/g, '')}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03D2D8]/10 text-[#03D2D8]">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider">Landline</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{contact.landline}</p>
                            </div>
                        </a>
                    )}
                </div>

                {/* Social Links (rendered only when official URLs are live) */}
                {liveSocials.length > 0 && (
                    <div className="mt-10 flex items-center justify-center gap-5">
                        {liveSocials.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 text-gray-500 hover:text-[#0C4A96] hover:shadow-md transition-all text-xs font-bold"
                            >
                                {social.label.slice(0, 2)}
                            </a>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href="/contact"
                        onClick={() => trackEvent('contact_cta_click', { source: 'home_contact_section' })}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0C4A96] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0a3d7d] transition-colors"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Send Us a Message
                    </Link>
                </div>
            </div>
        </section>
    );
}
