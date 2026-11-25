'use client';

import { Mail, Phone, MessageCircle, ArrowRight, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { LocationContact } from '@/types/content';
import { useState } from 'react';
import { WaitlistModal } from '@/components/ui/waitlist-modal';
import { getLiveSocialEntries } from '@/lib/socials';
import { trackEvent } from '@/lib/analytics';

interface LocationContactSectionProps {
    contact?: LocationContact;
    locationName: string;
    isComingSoon?: boolean;
}

export function LocationContactSection({ contact, locationName, isComingSoon }: LocationContactSectionProps) {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    if (!contact) return null;
    const liveSocials = getLiveSocialEntries(contact.socials);

    return (
        <section className="py-20 sm:py-28" style={{ backgroundColor: "#f0f2f5" }} id="contact">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-14">
                    {isComingSoon && (
                        <p 
                            className="font-caveat text-5xl sm:text-7xl font-bold mb-4" 
                            style={{ 
                                color: locationName.toLowerCase().includes('lake') ? '#03D2D8' : locationName.toLowerCase().includes('surf') ? '#E8704F' : '#03B1F7',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            {locationName}
                        </p>
                    )}
                    <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#333F50" }}>
                        {isComingSoon ? "Be the First to Know" : "Get in Touch"}
                    </h2>
                    <p className="mt-4 text-lg font-inter" style={{ color: "#333F50", opacity: 0.6 }}>
                        {isComingSoon 
                            ? `Join the waitlist or explore investor opportunities.`
                            : `Ready to experience ${locationName}? Reach out — we'd love to hear from you.`}
                    </p>
                </div>

                {isComingSoon ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Button
                            onClick={() => {
                                trackEvent('waitlist_modal_open', { location: locationName, source: 'location_contact' });
                                setIsWaitlistOpen(true);
                            }}
                            className="inline-flex items-center justify-center gap-1.5 font-medium text-sm text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-60 h-14 px-6"
                            style={{ backgroundColor: "#03B1F7" }}
                        >
                            Join the Waitlist
                            <ArrowRight className="h-4 w-4" />
                        </Button>

                        <Link
                            href="/contact?subject=Investor+Inquiry"
                            onClick={() => trackEvent('investor_inquiry_click', { location: locationName, source: 'location_contact' })}
                            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-6 text-sm font-medium text-[#333F50] border border-[#333F50]/20 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-60 h-14"
                        >
                            <Handshake className="h-4 w-4" />
                            Investor Inquiry
                        </Link>
                    </div>
                ) : (
                    <>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
                    {/* Email */}
                    {contact.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(12, 74, 150, 0.1)", color: "#0C4A96" }}>
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider">Email</p>
                                <p className="mt-1 text-sm font-medium text-gray-900 whitespace-nowrap">{contact.email}</p>
                            </div>
                        </a>
                    )}

                    {/* Mobile / WhatsApp */}
                    {contact.number && (
                        <a
                            href={`tel:${contact.number.replace(/\s/g, '')}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(3, 177, 247, 0.1)", color: "#03B1F7" }}>
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider">Mobile • WhatsApp • Viber • Telegram</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{contact.number}</p>
                            </div>
                        </a>
                    )}

                    {/* Landline */}
                    {contact.landline && (
                        <a
                            href={`tel:${contact.landline.replace(/\s/g, '')}`}
                            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow text-center"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(3, 210, 216, 0.1)", color: "#03D2D8" }}>
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
                        href={`/contact?subject=${encodeURIComponent('Booking Inquiry for ' + locationName)}`}
                        onClick={() => trackEvent('book_now_click', { location: locationName, source: 'location_contact' })}
                        className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors"
                        style={{ backgroundColor: "#0C4A96" }}
                    >
                        <MessageCircle className="h-4 w-4" />
                        Send Us a Message
                    </Link>
                </div>
                </>
                )}
            </div>
            <WaitlistModal 
                isOpen={isWaitlistOpen} 
                onClose={() => setIsWaitlistOpen(false)} 
                locationName={locationName} 
            />
        </section>
    );
}
