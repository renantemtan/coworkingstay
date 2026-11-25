"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";
import Link from "next/link";
import { WaitlistModal } from "@/components/ui/waitlist-modal";
import { trackEvent } from "@/lib/analytics";

interface LocationHeroProps {
    name: string;
    tagline: string;
    image: string;
    logoUrl?: string;
    status: string;
    hideStatus?: boolean;
    statusColor?: string;
    cta: string;
}

export function LocationHero({ name, tagline, image, logoUrl, status, hideStatus, statusColor, cta }: LocationHeroProps) {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    const scrollToOverview = () => {
        const el = document.getElementById("overview");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const handleCTAClick = (e: React.MouseEvent) => {
        if (cta.toLowerCase().includes('waitlist')) {
            e.preventDefault();
            trackEvent('waitlist_modal_open', { location: name, source: 'location_hero' });
            setIsWaitlistOpen(true);
        } else {
            trackEvent('book_now_click', { location: name, source: 'location_hero' });
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={`${name} — CoWorkingStay`}
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            {/* Navy-tinted gradient overlay — matches Home page */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A96]/50 via-[#0C4A96]/35 to-[#0C4A96]/55" />

            {/* Content box — mirrors Home Hero glass card */}
            <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl border border-white/50 bg-black/30 backdrop-blur-sm px-8 py-12 sm:px-12 sm:py-16 text-center overflow-hidden"
                >
                    {/* Status Badge — top-right corner, matching home page style */}
                    {status && (
                        <div className="absolute top-4 right-4 z-10">
                            {status.toLowerCase() === 'soft open' || status.toLowerCase() === 'open' ? (
                                <span className="inline-flex items-center rounded-full bg-[#03B1F7] px-4 py-1.5 text-xs font-semibold tracking-wide text-white lowercase">
                                    {status}
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 text-xs font-semibold tracking-wide text-white border border-white/20 lowercase">
                                    {status}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Logo + Name */}
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
                        {logoUrl && (
                            <img
                                src={logoUrl}
                                alt={`${name} Logo`}
                                className="h-20 w-auto sm:h-28 lg:h-32"
                            />
                        )}
                        <h1 className="font-sora text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl sm:text-left">
                            {name}
                        </h1>
                    </div>

                    {/* Tagline */}
                    <p className="mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-caveat leading-tight" style={{ color: "#03B1F7", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                        {tagline}
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 font-semibold text-base text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-60 h-14"
                            style={{ backgroundColor: cta.toLowerCase().includes('waitlist') ? "#03B1F7" : "#E53652" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = cta.toLowerCase().includes('waitlist') ? "#0296D1" : "#C82D45"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = cta.toLowerCase().includes('waitlist') ? "#03B1F7" : "#E53652"; }}
                            onClick={handleCTAClick}
                        >
                            <Link href={`/contact?subject=${encodeURIComponent('Booking Inquiry for ' + name)}`}>
                                {cta}
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>

                        {!hideStatus && (
                            <Link
                                href="/contact?subject=Investor+Inquiry"
                                onClick={() => trackEvent('investor_inquiry_click', { location: name, source: 'location_hero' })}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-sm font-medium text-[#333F50] border border-[#333F50]/20 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-60 h-14"
                            >
                                <Handshake className="h-4 w-4" />
                                Investor Inquiry
                            </Link>
                        )}
                    </div>

                    <WaitlistModal 
                        isOpen={isWaitlistOpen} 
                        onClose={() => setIsWaitlistOpen(false)} 
                        locationName={name} 
                    />
                </motion.div>
            </div>

            {/* Scroll indicator — matches Home page */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="h-1.5 w-1.5 rounded-full bg-white/60"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
