"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LocationHeroProps {
    name: string;
    tagline: string;
    image: string;
    logoUrl?: string;
    status: string;
    hideStatus?: boolean;
    cta: string;
}

export function LocationHero({ name, tagline, image, logoUrl, status, hideStatus, cta }: LocationHeroProps) {
    const scrollToOverview = () => {
        const el = document.getElementById("overview");
        if (el) el.scrollIntoView({ behavior: "smooth" });
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
                    <p className="mx-auto mt-6 max-w-2xl text-xl sm:text-2xl font-caveat" style={{ color: "#03B1F7" }}>
                        {tagline}
                    </p>

                    {/* Status Badge — only show for non-hidden */}
                    {!hideStatus && status && (
                        <div className="mt-4">
                            <span className="inline-block rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
                                {status}
                            </span>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-10">
                        <Button
                            size="lg"
                            onClick={scrollToOverview}
                            className="gap-2 font-semibold text-base text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: "#E53652" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C82D45"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E53652"; }}
                        >
                            {cta}
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
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
