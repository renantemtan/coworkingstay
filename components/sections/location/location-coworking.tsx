"use client";

import Image from "next/image";
import { Monitor, Wifi, Zap, Presentation, Users, Briefcase } from "lucide-react";
import { CoworkingDetails } from "@/types/content";
import { motion } from "framer-motion";

interface LocationCoworkingProps {
    coworking?: CoworkingDetails;
}

export function LocationCoworking({ coworking }: LocationCoworkingProps) {
    if (!coworking) return null;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: "#0C4A96" }} id="coworking">

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
                        Where the Magic Happens
                    </span>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Your Productivity Fortress
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
                        <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
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
                        <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0158F5" }}>
                                    <Presentation className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white">Meeting &amp; Training Rooms</h3>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.8)" }}>
                                {coworking.conferenceRooms}
                            </p>
                        </div>

                        {/* Tech Specs */}
                        <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#03B1F7" }}>
                                    <Monitor className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-sora text-xl font-bold text-white">Standard Tech Arsenal</h3>
                            </div>
                            <ul className="space-y-3">
                                {coworking.technology.map((tech, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#03D2D8" }} />
                                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{tech}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Perfect For */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#03B1F7" }}>
                                Perfect For
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {coworking.activities.map((activity, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white"
                                        style={{ backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.15)", borderWidth: 1 }}
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </div>
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

                {/* Disclaimer */}
                {coworking.disclaimer && (
                    <p className="mt-12 text-center text-xs italic max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {coworking.disclaimer}
                    </p>
                )}
            </div>
        </section>
    );
}
