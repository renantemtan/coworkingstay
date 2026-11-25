"use client";

import Image from "next/image";
import { Monitor, Wifi, Zap, Presentation, Users, Briefcase, CheckCircle2, Info } from "lucide-react";
import { CoworkingDetails } from "@/types/content";
import { motion } from "framer-motion";

interface LocationCoworkingProps {
    coworking?: CoworkingDetails;
    targetActivities?: string[];
}

export function LocationCoworking({ coworking, targetActivities }: LocationCoworkingProps) {
    if (!coworking) return null;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0C4A96]" id="coworking">
            {/* Background Pattern matched from standard amenities */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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
                        style={{ backgroundColor: "rgba(3, 177, 247, 0.2)", color: "#03B1F7" }}
                    >
                        Where Outcomes are Crafted
                    </span>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Designed for Focused Work
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {coworking.description}
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* LEFT: Content */}
                    <div className="space-y-8">
                        {/* Zones */}
                        <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: "#1254A4" }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#03D2D8" }}>
                                    <Briefcase className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white">Dedicated Zones</h3>
                            </div>
                            <ul className="space-y-3">
                                {coworking.zones.map((zone, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#03B1F7" }} />
                                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{zone}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Conference Rooms */}
                        <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: "#1254A4" }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0158F5" }}>
                                    <Presentation className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white">Meeting &amp; Training Room</h3>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.8)" }}>
                                {coworking.conferenceRooms}
                            </p>
                        </div>

                        {/* Tech Specs */}
                        <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: "#1254A4" }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#03B1F7" }}>
                                    <Monitor className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white">Standard Tech Setup</h3>
                            </div>
                            <ul className="space-y-3">
                                {coworking.technology.map((tech, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#03D2D8" }} />
                                        <span style={{ color: "rgba(255,255,255,0.85)" }}>
                                            {tech.replace(/\((.*?)\)/g, (match, p1) => `(${p1.toLowerCase()})`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Disclaimer */}
                        {coworking.disclaimer && (
                            <p className="mt-4 text-xs italic" style={{ color: "rgba(255,255,255,0.45)" }}>
                                {coworking.disclaimer}
                            </p>
                        )}

                    </div>

                    {/* RIGHT: Photos */}
                    <div className="space-y-6">
                        {coworking.photos?.map((photo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl"
                                style={{ aspectRatio: i === 0 ? "16/10" : "16/9" }}
                            >
                                <Image
                                    src={photo}
                                    alt={`Coworking space ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Centered "What to Bring" (i) box after Standard Tech Setup & Note */}
                {coworking.whatToBring && (
                    <div className="mt-12 max-w-3xl mx-auto">
                        <div
                            className="rounded-xl p-5 flex items-start gap-3 text-sm leading-relaxed shadow-sm"
                            style={{
                                backgroundColor: "#FDF4F1",
                                border: "1px solid rgba(232, 112, 79, 0.25)",
                                color: "#E8704F",
                            }}
                        >
                            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <p style={{ color: "#333F50", opacity: 0.9 }}>
                                <strong style={{ color: "#333F50" }}>What to Bring:</strong>{" "}
                                {coworking.whatToBring.split(/(\*\*.*?\*\*)/g).map((part, idx) =>
                                    part.startsWith("**") && part.endsWith("**") ? (
                                        <strong key={idx}>{part.slice(2, -2)}</strong>
                                    ) : (
                                        part
                                    )
                                )}
                            </p>
                        </div>
                    </div>
                )}

                {/* Your Space, Your Agenda */}
                <div className="mt-20 w-full relative z-20">
                    <h4 className="font-sora text-3xl sm:text-4xl lg:text-4xl font-bold mb-10 text-center drop-shadow-sm" style={{ color: "#03B1F7" }}>
                        Your space, your agenda.
                    </h4>
                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {(targetActivities || coworking.activities).map((activity, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white shadow-sm"
                                style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.15)", borderWidth: 1 }}
                            >
                                <CheckCircle2 className="h-5 w-5" style={{ color: "#03D2D8" }} />
                                <span className="lowercase">{activity}</span>
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    );
}
