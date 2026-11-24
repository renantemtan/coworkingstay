"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Palmtree, Waves, Ticket } from "lucide-react";

interface ActivityCategory {
    category: string;
    items: string[];
}

interface LocationWorkPlayProps {
    activitiesDescription?: string;
    activitiesDisclaimer?: string;
    activities?: ActivityCategory[];
    locationName?: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; icon: React.ReactNode }> = {
    // Water & Ocean / Lake
    "Water & Ocean": { bg: "#03B1F7", icon: <Waves className="h-5 w-5 text-white" /> },
    "Lake Activities": { bg: "#03B1F7", icon: <Waves className="h-5 w-5 text-white" /> },
    "Surf & Ocean": { bg: "#03B1F7", icon: <Waves className="h-5 w-5 text-white" /> },

    // Land adventures
    "Land adventure": { bg: "#E8704F", icon: <Compass className="h-5 w-5 text-white" /> },
    "Land Adventures": { bg: "#E8704F", icon: <Compass className="h-5 w-5 text-white" /> },

    // Leisure (Box 3) - Flipped color to Culture's original color (Aqua)
    "Leisure": { bg: "#03D2D8", icon: <Palmtree className="h-5 w-5 text-white" /> },

    // Culture / Eco-Tourism (Box 4) - Flipped color to Leisure's original color (Sand/Peach)
    "Local Culture": { bg: "#EAA785", icon: <Ticket className="h-5 w-5 text-white" /> },
};

export function LocationWorkPlay({ activitiesDescription, activitiesDisclaimer, activities, locationName }: LocationWorkPlayProps) {
    if (!activities || activities.length === 0) return null;

    const modifiedDisclaimer = activitiesDisclaimer
        ? activitiesDisclaimer.replace("CoWorkingStay", locationName || "CoWorkingStay")
        : "";

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#03B1F7" }} id="work-play">
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
                        className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm"
                        style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "#0C4A96" }}
                    >
                        The Lifestyle
                    </span>
                    <h2 className="font-caveat text-5xl sm:text-6xl md:text-7xl font-bold mb-6" style={{ filter: "drop-shadow(0px 2px 4px rgba(255,255,255,0.8))" }}>
                        <span style={{ color: "#E8704F" }}>Sprint.</span>{" "}
                        <span style={{ color: "#EAA785", textShadow: "2px 2px 4px #333F50" }}>Explore.</span>{" "}
                        <span style={{ color: "#0C4A96" }}>Recharge.</span>
                    </h2>
                    <p className="text-lg leading-relaxed font-medium" style={{ color: "#333F50" }}>
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
                                className="rounded-2xl p-6 h-full bg-white shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: colors.bg }}>
                                        {colors.icon}
                                    </div>
                                    <h3 className="font-caveat font-bold text-3xl leading-tight capitalize" style={{ color: colors.bg }}>{block.category}</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {block.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.bg }} />
                                            <span className="text-sm font-medium" style={{ color: "#333F50" }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Disclaimer placed subtly before photos */}
                {modifiedDisclaimer && (
                    <p className="text-center text-xs max-w-4xl mx-auto italic font-medium mb-12" style={{ color: "rgba(12, 74, 150, 0.7)" }}>
                        {modifiedDisclaimer}
                    </p>
                )}

                {/* Picture Grid showing lifestyle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {[
                        "/images/lifestyles/water.png",
                        "/images/lifestyles/culture.png",
                        "/images/lifestyles/leisure.png"
                    ].map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white/50"
                        >
                            <Image src={src} alt="Lifestyle activity" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
