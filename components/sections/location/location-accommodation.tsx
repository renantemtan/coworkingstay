"use client";

import { AccommodationDetails } from "@/types/content";
import Image from "next/image";
import { BedDouble, Wind, Droplets, Wifi, MonitorPlay, Bath, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface LocationAccommodationProps {
    accommodation?: AccommodationDetails;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    "Air conditioning": <Wind className="h-5 w-5" />,
    "Water heater": <Droplets className="h-5 w-5" />,
    "High-speed internet access": <Wifi className="h-5 w-5" />,
    "Projector setup for binge-watching": <MonitorPlay className="h-5 w-5" />,
    "Fresh towels & linens": <Bath className="h-5 w-5" />,
    "24/7 security": <ShieldCheck className="h-5 w-5" />,
};

export function LocationAccommodation({ accommodation }: LocationAccommodationProps) {
    if (!accommodation) return null;

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
            </div>
        </section>
    );
}
