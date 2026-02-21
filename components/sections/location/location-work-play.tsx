"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Palmtree, Waves, Ticket, MonitorPlay } from "lucide-react";

interface ActivityCategory {
    category: string;
    items: string[];
}

interface LocationWorkPlayProps {
    activitiesDescription?: string;
    activitiesDisclaimer?: string;
    activities?: ActivityCategory[];
}

const CATEGORY_COLORS: Record<string, { bg: string; icon: React.ReactNode }> = {
    "Water & Ocean": { bg: "#03B1F7", icon: <Waves className="h-5 w-5 text-white" /> },
    "Land adventure": { bg: "#E8704F", icon: <Compass className="h-5 w-5 text-white" /> },
    "Leisure": { bg: "#EAA785", icon: <Palmtree className="h-5 w-5 text-white" /> },
    "Local culture + eco-tourism": { bg: "#03D2D8", icon: <Ticket className="h-5 w-5 text-white" /> },
};

export function LocationWorkPlay({ activitiesDescription, activitiesDisclaimer, activities }: LocationWorkPlayProps) {
    if (!activities || activities.length === 0) return null;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#333F50" }} id="work-play">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                        style={{ backgroundColor: "rgba(3, 210, 216, 0.15)", color: "#03D2D8" }}
                    >
                        The Lifestyle
                    </span>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Sprint. Explore. Recharge.
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {activitiesDescription}
                    </p>
                </motion.div>

                {/* Activity cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {activities.map((block, i) => {
                        const colors = CATEGORY_COLORS[block.category] || { bg: "#0158F5", icon: <Compass className="h-5 w-5 text-white" /> };

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="rounded-2xl p-6 h-full"
                                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
                                        {colors.icon}
                                    </div>
                                    <h3 className="font-sora font-bold text-white text-sm leading-tight">{block.category}</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {block.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.bg }} />
                                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Binge Watching Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto rounded-2xl p-8 relative overflow-hidden mb-8"
                    style={{ backgroundColor: "rgba(232, 112, 79, 0.15)", border: "1px solid rgba(232, 112, 79, 0.25)" }}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        <div className="flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#E8704F" }}>
                            <MonitorPlay className="h-7 w-7 text-white" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="font-sora text-xl font-bold text-white mb-2">Rainy Day? Perfect.</h4>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                                Fire up the in-room projector, pull the curtains, and settle in for an uninterrupted binge-watching marathon. Big screen. Your picks. Zero guilt.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                {activitiesDisclaimer && (
                    <p className="text-center text-xs max-w-2xl mx-auto italic" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {activitiesDisclaimer}
                    </p>
                )}
            </div>
        </section>
    );
}
