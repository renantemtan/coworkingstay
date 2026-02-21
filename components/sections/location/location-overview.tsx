"use client";

import { Zap, Wind, Network, Monitor, BedDouble, MapPin, Palmtree, Wifi, Dumbbell, ShieldCheck, Projector, Armchair, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Pillar {
    id: string;
    title: string;
    promise: string;
    icon?: string;
    color?: string;
}

interface LocationOverviewProps {
    description?: string;
    highlights?: string[];
    amenities?: string[];
    address?: string;
    coworkingDescription?: string;
    coworkingZones?: string[];
    accommodationDescription?: string;
    accommodationBeds?: string;
    activitiesDescription?: string;
    pillars?: Pillar[];
}

const PILLAR_ICON_MAP: Record<string, React.ReactNode> = {
    Zap: <Zap className="h-6 w-6" />,
    Wind: <Wind className="h-6 w-6" />,
    Network: <Network className="h-6 w-6" />,
};

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    "Coworking Space": <Monitor className="h-4 w-4" />,
    "Workstations": <Monitor className="h-4 w-4" />,
    "Focus-Zones": <ShieldCheck className="h-4 w-4" />,
    "Collab-Zones": <Network className="h-4 w-4" />,
    "Conference Room": <Projector className="h-4 w-4" />,
    "Outdoor Gym": <Dumbbell className="h-4 w-4" />,
    "Lounge": <Armchair className="h-4 w-4" />,
    "Failover Internet": <Wifi className="h-4 w-4" />,
    "Power Backup": <Zap className="h-4 w-4" />,
    "Lakeside Deck": <Palmtree className="h-4 w-4" />,
    "Surf Gear Storage": <Palmtree className="h-4 w-4" />,
    "default": <Coffee className="h-4 w-4" />,
};

function cleanZone(zone: string): string {
    return zone.replace(/\s*\([^)]*\)/g, "").trim();
}

function summarize(text: string | undefined, maxLen = 200): string {
    if (!text) return "";
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    let result = "";
    for (const s of sentences) {
        if ((result + s).length > maxLen) break;
        result += s;
    }
    return result.trim() || text.substring(0, maxLen).trimEnd() + "…";
}

export function LocationOverview({
    description,
    amenities,
    address,
    coworkingDescription,
    coworkingZones,
    accommodationDescription,
    accommodationBeds,
    activitiesDescription,
    pillars,
}: LocationOverviewProps) {
    const topAmenities = (amenities || []).slice(0, 8);

    const teasers = [
        {
            label: "CoWorking",
            icon: <Monitor className="h-5 w-5" />,
            color: "#0C4A96",
            text: summarize(coworkingDescription, 180),
            detail: coworkingZones?.slice(0, 2).map(cleanZone).join("  ·  "),
        },
        {
            label: "Stay",
            icon: <BedDouble className="h-5 w-5" />,
            color: "#E8704F",
            text: summarize(accommodationDescription, 300),
            detail: accommodationBeds,
        },
        {
            label: "Lifestyle",
            icon: <Palmtree className="h-5 w-5" />,
            color: "#03B1F7",
            text: summarize(activitiesDescription, 300),
            detail: undefined,
        },
    ];

    return (
        <section className="py-12 sm:py-16 bg-white" id="overview">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

                {/* Section header */}
                <div className="text-center">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: "#EEF4FF", color: "#0C4A96" }}>
                        At a Glance
                    </span>
                    <h2 className="font-sora text-3xl sm:text-4xl font-bold" style={{ color: "#0C4A96" }}>
                        Everything you need.{" "}
                        <span style={{ color: "#E53652" }}>Nothing you don&apos;t.</span>
                    </h2>
                    {description && (
                        <p className="mt-3 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#333F50" }}>
                            {summarize(description, 160)}
                        </p>
                    )}
                    {address && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#0C4A96" }}>
                            <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: "#E53652" }} />
                            {address}
                        </div>
                    )}
                </div>

                {/* Two-column: Teasers LEFT | Photo + Amenities RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

                    {/* LEFT: CoWorking / Stay / Lifestyle */}
                    <div className="flex flex-col divide-y" style={{ borderColor: "#D6DCE5" }}>
                        {teasers.map((t, i) => (
                            <motion.div
                                key={t.label}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="flex gap-5 py-6 first:pt-0 last:pb-0"
                            >
                                <div
                                    className="flex-shrink-0 h-11 w-11 flex items-center justify-center rounded-xl text-white mt-0.5"
                                    style={{ backgroundColor: t.color }}
                                >
                                    {t.icon}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <p className="font-sora font-bold text-base" style={{ color: t.color }}>
                                        {t.label}
                                    </p>
                                    <p className="text-sm leading-relaxed" style={{ color: "#333F50" }}>
                                        {t.text}
                                    </p>
                                    {t.detail && (
                                        <p className="text-sm font-semibold mt-1" style={{ color: t.color }}>
                                            {t.detail}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT: Photo on top + Amenity pills below */}
                    <div className="flex flex-col gap-5">
                        {/* Exterior photo */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full rounded-2xl overflow-hidden shadow-md"
                            style={{ aspectRatio: "4/3" }}
                        >
                            <Image
                                src="/images/overview-exterior-placeholder.png"
                                alt="Hotel exterior"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>

                        {/* Amenity pills */}
                        {topAmenities.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {topAmenities.map((amenity, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.04 }}
                                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border"
                                        style={{ borderColor: "#D6DCE5", color: "#333F50", backgroundColor: "#F8F9FB" }}
                                    >
                                        <span style={{ color: "#0C4A96" }}>
                                            {AMENITY_ICONS[amenity] ?? AMENITY_ICONS["default"]}
                                        </span>
                                        {amenity.replace(/-/g, " ")}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* BOTTOM: 3 Pillars full-width */}
                {pillars && pillars.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-8" style={{ borderColor: "#D6DCE5" }}>
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-start gap-5 px-6 py-5 rounded-2xl"
                                style={{
                                    background: `${pillar.color ?? "#0C4A96"}12`,
                                    border: `1px solid ${pillar.color ?? "#0C4A96"}33`,
                                }}
                            >
                                <div
                                    className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl text-white"
                                    style={{ backgroundColor: pillar.color ?? "#0C4A96" }}
                                >
                                    {(pillar.icon ? PILLAR_ICON_MAP[pillar.icon] : null) ?? <Zap className="h-6 w-6" />}
                                </div>
                                <div>
                                    <p className="font-sora font-bold text-base" style={{ color: pillar.color ?? "#0C4A96" }}>
                                        {pillar.title}
                                    </p>
                                    <p className="text-sm leading-snug mt-1" style={{ color: "#333F50" }}>
                                        {pillar.promise}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
