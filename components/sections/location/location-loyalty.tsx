"use client";

import { Crown, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function LocationLoyalty() {
    return (
        <section
            className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0C4A96 0%, #0158F5 100%)" }}
            id="loyalty"
        >
            <div className="max-w-5xl mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div
                        className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mb-6 mx-auto"
                        style={{ backgroundColor: "rgba(3, 177, 247, 0.2)" }}
                    >
                        <Crown className="h-8 w-8" style={{ color: "#03B1F7" }} />
                    </div>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Loyalty Rewards Program
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                        The more you stay, the more you save. Our loyalty program rewards regulars who make CoWorkingStay part of their rhythm.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Silver Tier */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl p-8 relative overflow-hidden"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                        <Star className="absolute top-6 right-6 h-20 w-20 opacity-5 text-white" />
                        <div className="relative z-10">
                            <span
                                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4"
                                style={{ backgroundColor: "rgba(3, 210, 216, 0.2)", color: "#03D2D8" }}
                            >
                                Silver Tier
                            </span>
                            <h3 className="font-sora text-2xl font-bold text-white mb-4">6-Month Streak</h3>
                            <p className="mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                                Check in at least once a month for 6 consecutive rolling months.
                            </p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-white">25%</span>
                                <span className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>Off</span>
                            </div>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>From prevailing rack rates.</p>
                        </div>
                    </motion.div>

                    {/* Gold Tier */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl p-8 relative overflow-hidden"
                        style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                        <Sparkles className="absolute top-6 right-6 h-20 w-20 opacity-5 text-white" />
                        <div className="relative z-10">
                            <span
                                className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4"
                                style={{ backgroundColor: "rgba(3, 177, 247, 0.2)", color: "#03B1F7" }}
                            >
                                Gold Tier
                            </span>
                            <h3 className="font-sora text-2xl font-bold text-white mb-4">12-Month Streak</h3>
                            <p className="mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
                                Check in at least once a month for 12 consecutive rolling months.
                            </p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-white">50%</span>
                                <span className="text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>Off</span>
                            </div>
                            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>From prevailing rack rates.</p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 text-center">
                    <button
                        className="rounded-full px-8 py-3.5 text-sm font-bold cursor-not-allowed opacity-60 text-white"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                        disabled
                    >
                        Registration Coming Soon
                    </button>
                    <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Terms and conditions apply. Member portal launching soon.
                    </p>
                </div>
            </div>
        </section>
    );
}
