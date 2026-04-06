"use client";

import { LocationPolicies } from "@/types/content";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface LocationPoliciesProps {
    locationPolicies?: LocationPolicies;
}

export function LocationPoliciesSection({ locationPolicies }: LocationPoliciesProps) {
    if (!locationPolicies) return null;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="policies">
            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-4 mx-auto"
                        style={{ backgroundColor: "rgba(12, 74, 150, 0.1)" }}
                    >
                        <ShieldCheck className="h-7 w-7" style={{ color: "#0C4A96" }} />
                    </div>
                    <h2 className="font-sora text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#333F50" }}>
                        Location Policies
                    </h2>
                    <p className="text-lg" style={{ color: "#333F50", opacity: 0.6 }}>
                        Built for productivity. Powered by respect.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* General Guidelines */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-8 h-full" style={{ backgroundColor: "#FAF8F5", border: "1px solid #D6DCE5" }}>
                            <h3 className="font-sora text-xl font-bold mb-6 pb-4" style={{ color: "#333F50", borderBottom: "1px solid #D6DCE5" }}>
                                Community Guidelines
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                {locationPolicies.guidelines.map((rule, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#333F50", opacity: 0.75 }}>
                                        <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: "#03D2D8" }} />
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Booking Policies */}
                    <div className="space-y-6">
                        <div className="rounded-2xl p-8" style={{ backgroundColor: "#FAF8F5", border: "1px solid #D6DCE5" }}>
                            <h3 className="font-sora text-xl font-bold mb-6 pb-4" style={{ color: "#333F50", borderBottom: "1px solid #D6DCE5" }}>
                                Booking
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#0C4A96" }}>Check-in</p>
                                    <p className="font-medium" style={{ color: "#333F50" }}>{locationPolicies.checkIn}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#0C4A96" }}>Check-out</p>
                                    <p className="font-medium" style={{ color: "#333F50" }}>{locationPolicies.checkOut}</p>
                                </div>
                                <div className="pt-4" style={{ borderTop: "1px solid #D6DCE5" }}>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0C4A96" }}>Deposit &amp; Payment</p>
                                    <p className="text-sm leading-relaxed" style={{ color: "#333F50", opacity: 0.75 }}>
                                        {locationPolicies.deposit}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(229, 54, 82, 0.08)", border: "1px solid rgba(229, 54, 82, 0.15)" }}>
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 flex-shrink-0" style={{ color: "#E53652" }} />
                                <div>
                                    <h4 className="font-bold text-sm mb-1" style={{ color: "#E53652" }}>Cancellation & Rebooking</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: "#333F50", opacity: 0.75 }}>
                                        {locationPolicies.cancellation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/faq"
                        className="text-sm font-medium hover:underline inline-flex items-center gap-2 transition-colors"
                        style={{ color: "#0158F5" }}
                    >
                        Have questions? Read our full FAQ here →
                    </Link>
                </div>
            </div>
        </section>
    );
}
