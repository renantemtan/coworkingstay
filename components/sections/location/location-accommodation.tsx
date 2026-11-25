"use client";

import { useState } from "react";
import Link from "next/link";
import { AccommodationDetails } from "@/types/content";
import Image from "next/image";
import {
    BedDouble,
    Wind,
    Droplets,
    Wifi,
    MonitorPlay,
    Bath,
    ShieldCheck,
    Users,
    CheckCircle2,
    Info,
    ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency, type CurrencyCode } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

interface LocationAccommodationProps {
    accommodation?: AccommodationDetails;
    locationName?: string;
    locationSlug?: string;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    "Air conditioning": <Wind className="h-5 w-5" />,
    "Water heater": <Droplets className="h-5 w-5" />,
    "High-speed internet access": <Wifi className="h-5 w-5" />,
    "Projector setup for binge-watching": <MonitorPlay className="h-5 w-5" />,
    "Fresh towels & linens": <Bath className="h-5 w-5" />,
    "24/7 security": <ShieldCheck className="h-5 w-5" />,
};

export function LocationAccommodation({
    accommodation,
    locationName,
    locationSlug,
}: LocationAccommodationProps) {
    const [currency, setCurrency] = useState<CurrencyCode>("PHP");

    if (!accommodation) return null;

    const bookingHref = locationName
        ? `/contact?mode=booking&location=${encodeURIComponent(locationSlug || "")}&subject=${encodeURIComponent(`Booking Inquiry for ${locationName}`)}`
        : "/contact?mode=booking";

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FAF8F5" }} id="accommodation">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                        style={{ backgroundColor: "rgba(234, 167, 133, 0.2)", color: "#E8704F" }}
                    >
                        Rest &amp; Recovery
                    </span>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: "#333F50" }}>
                        Sleep Like You Mean It
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ color: "#333F50", opacity: 0.75 }}>
                        {accommodation.description}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT: Photos */}
                    <div className="grid grid-cols-2 gap-4">
                        {accommodation.photos?.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className={`relative rounded-2xl overflow-hidden shadow-md ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                            >
                                <Image
                                    src={photo}
                                    alt={`Room view ${i + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT: Details */}
                    <div className="space-y-8">
                        {/* Bed Type */}
                        <div className="flex items-center gap-4 pb-6" style={{ borderBottom: "1px solid #D6DCE5" }}>
                            <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#E8704F" }}>
                                <BedDouble className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h3 className="font-sora text-xl font-bold" style={{ color: "#333F50" }}>Room Configuration</h3>
                                <p style={{ color: "#333F50", opacity: 0.7 }}>{accommodation.beds}</p>
                            </div>
                        </div>

                        {/* Amenities Grid */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#E8704F" }}>
                                In-Room Amenities
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {accommodation.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm" style={{ border: "1px solid #D6DCE5" }}>
                                        <div className="flex-shrink-0" style={{ color: "#0C4A96" }}>
                                            {AMENITY_ICONS[amenity] || <ShieldCheck className="h-5 w-5" />}
                                        </div>
                                        <span className="text-sm font-medium" style={{ color: "#333F50" }}>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra note */}
                        <div className="rounded-2xl p-6 bg-white shadow-sm" style={{ border: "1px solid #D6DCE5" }}>
                            <p className="text-sm leading-relaxed" style={{ color: "#333F50", opacity: 0.7 }}>
                                Our rooms are intentionally simple — no excess, no clutter. Just clean sheets, cool air, and the quiet you need for proper recovery. Because tomorrow, you&apos;ve got things to build.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Room Rates Card */}
                {accommodation.rates && accommodation.rates.tiers.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-16 rounded-3xl bg-white p-8 sm:p-10 shadow-sm"
                        style={{ border: "1px solid #D6DCE5" }}
                        id="rates"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8" style={{ borderBottom: "1px solid #D6DCE5" }}>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#03B1F7" }}>
                                    Room Rates
                                </span>
                                <h3 className="font-sora text-2xl sm:text-3xl font-bold mt-1" style={{ color: "#333F50" }}>
                                    Simple Per-Night Pricing
                                </h3>
                                <p className="text-sm mt-1" style={{ color: "#333F50", opacity: 0.65 }}>
                                    All rooms feature 2 double beds (max {accommodation.rates.maxGuestsPerRoom} guests per room).
                                </p>
                            </div>

                            {/* PHP / USD Toggle */}
                            <div
                                className="inline-flex rounded-full p-1 self-start sm:self-center"
                                style={{ backgroundColor: "#F0F2F5" }}
                                role="group"
                                aria-label="Currency selector"
                            >
                                {(["PHP", "USD"] as CurrencyCode[]).map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => setCurrency(code)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                            currency === code
                                                ? "bg-[#0C4A96] text-white shadow-sm"
                                                : "text-[#333F50]/70 hover:text-[#333F50]"
                                        }`}
                                    >
                                        {code === "PHP" ? "PHP (₱)" : "USD ($)"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {accommodation.rates.tiers.map((tier) => {
                                const primary = currency === "PHP" ? formatCurrency(tier.php, "PHP") : formatCurrency(tier.usd, "USD");
                                const secondary = currency === "PHP" ? formatCurrency(tier.usd, "USD") : formatCurrency(tier.php, "PHP");
                                return (
                                    <div
                                        key={tier.guests}
                                        className="rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md"
                                        style={{ backgroundColor: "#FAF8F5", border: "1px solid #D6DCE5" }}
                                    >
                                        <div className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: "#0C4A96" }}>
                                            <Users className="h-4 w-4" />
                                            <span>{tier.guests === 1 ? "1 Person, 1 Room" : `${tier.guests} Persons, 1 Room`}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="font-sora text-3xl font-bold" style={{ color: "#333F50" }}>
                                                    {primary}
                                                </span>
                                                <span className="text-xs font-medium" style={{ color: "#333F50", opacity: 0.6 }}>
                                                    / night
                                                </span>
                                            </div>
                                            <p className="text-xs mt-1 font-medium" style={{ color: "#333F50", opacity: 0.5 }}>
                                                {secondary} / night
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Inclusions & CTA */}
                        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6" style={{ borderTop: "1px solid #D6DCE5" }}>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "#333F50", opacity: 0.8 }}>
                                <span className="inline-flex items-center gap-2 font-medium">
                                    <CheckCircle2 className="h-4 w-4" style={{ color: "#03D2D8" }} />
                                    {accommodation.rates.inclusions}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Info className="h-4 w-4" style={{ color: "#E8704F" }} />
                                    {accommodation.rates.exclusions}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Info className="h-4 w-4" style={{ color: "#03B1F7" }} />
                                    {accommodation.rates.availabilityNote}
                                </span>
                            </div>

                            <Link
                                href={bookingHref}
                                onClick={() =>
                                    trackEvent("book_now_click", {
                                        location: locationName || "Work 'n Wave",
                                        source: "accommodation_rates",
                                    })
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E53652] hover:bg-[#C82D45] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all shrink-0"
                            >
                                Request a Booking
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
