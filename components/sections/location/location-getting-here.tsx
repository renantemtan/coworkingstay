"use client";

import { GettingHere } from "@/types/content";
import { Bus, Car, AlertCircle, Ship, Info } from "lucide-react";

interface LocationGettingHereProps {
    gettingHere?: GettingHere;
}

export function LocationGettingHere({ gettingHere }: LocationGettingHereProps) {
    if (!gettingHere) return null;

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#FAF8F5" }} id="getting-here">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="font-sora text-3xl sm:text-4xl font-bold mb-6" style={{ color: "#333F50" }}>
                        Getting Here
                    </h2>
                    <p className="text-lg" style={{ color: "#333F50", opacity: 0.6 }}>
                        We recommend checking transport schedules directly with operators before travel.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Transport Options */}
                    <div className="space-y-8">
                        {/* Public Transport */}
                        <div className="rounded-2xl p-8 bg-white shadow-sm" style={{ border: "1px solid #D6DCE5" }}>
                            <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid #D6DCE5" }}>
                                <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(12, 74, 150, 0.1)" }}>
                                    <Bus className="h-6 w-6" style={{ color: "#0C4A96" }} />
                                </div>
                                <h3 className="font-sora text-2xl font-bold" style={{ color: "#333F50" }}>Public Transport</h3>
                            </div>
                            <p className="leading-relaxed mb-6 font-medium" style={{ color: "#333F50" }}>
                                {gettingHere.publicTransport}
                            </p>
                            {gettingHere.publicTransportDetails && (
                                <ul className="space-y-3">
                                    {gettingHere.publicTransportDetails.map((detail, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm" style={{ color: "#333F50", opacity: 0.75 }}>
                                            <span style={{ color: "#0C4A96" }}>•</span>
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Private Transport */}
                        <div className="rounded-2xl p-8 bg-white shadow-sm" style={{ border: "1px solid #D6DCE5" }}>
                            <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid #D6DCE5" }}>
                                <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(3, 210, 216, 0.1)" }}>
                                    <Car className="h-6 w-6" style={{ color: "#03D2D8" }} />
                                </div>
                                <h3 className="font-sora text-2xl font-bold" style={{ color: "#333F50" }}>Private Transport</h3>
                            </div>
                            <p className="leading-relaxed mb-6 font-medium" style={{ color: "#333F50" }}>
                                {gettingHere.privateTransport}
                            </p>
                            {gettingHere.privateTransportDetails && (
                                <ul className="space-y-3">
                                    {gettingHere.privateTransportDetails.map((detail, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm" style={{ color: "#333F50", opacity: 0.75 }}>
                                            <span style={{ color: "#03D2D8" }}>•</span>
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {gettingHere.parkingInfo && (
                                <div className="mt-6 rounded-xl p-4 flex gap-3 text-sm" style={{ backgroundColor: "rgba(232, 112, 79, 0.08)", border: "1px solid rgba(232, 112, 79, 0.15)", color: "#E8704F" }}>
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p style={{ color: "#333F50", opacity: 0.8 }}>{gettingHere.parkingInfo}</p>
                                </div>
                            )}
                        </div>

                        {/* Late Arrival Alternative (Separate Box right after Private Transport) */}
                        {gettingHere.lateArrivalAlternative && (
                            <div className="rounded-2xl p-8 bg-white shadow-sm" style={{ border: "1px solid #D6DCE5" }}>
                                <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid #D6DCE5" }}>
                                    <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(232, 112, 79, 0.1)" }}>
                                        <Ship className="h-6 w-6" style={{ color: "#E8704F" }} />
                                    </div>
                                    <h3 className="font-sora text-2xl font-bold" style={{ color: "#333F50" }}>
                                        {gettingHere.lateArrivalAlternative.title}
                                    </h3>
                                </div>
                                <p className="leading-relaxed mb-4 font-medium" style={{ color: "#333F50" }}>
                                    {gettingHere.lateArrivalAlternative.description}
                                </p>
                                {gettingHere.lateArrivalAlternative.note && (
                                    <div className="mt-4 rounded-xl p-4 flex gap-3 text-sm" style={{ backgroundColor: "rgba(232, 112, 79, 0.08)", border: "1px solid rgba(232, 112, 79, 0.15)", color: "#E8704F" }}>
                                        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                        <p className="leading-relaxed" style={{ color: "#333F50", opacity: 0.8 }}>
                                            {gettingHere.lateArrivalAlternative.note}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {gettingHere.shippingLines && (
                            <p className="text-sm italic" style={{ color: "#333F50", opacity: 0.5 }}>
                                Ferry Operators: {gettingHere.shippingLines}
                            </p>
                        )}
                        {gettingHere.disclaimer && (
                            <p className="text-xs" style={{ color: "#333F50", opacity: 0.4 }}>
                                * {gettingHere.disclaimer}
                            </p>
                        )}
                    </div>

                    {/* Map */}
                    <div>
                        {gettingHere.mapEmbedUrl && (
                            <div className="aspect-square sm:aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden shadow-sm bg-white" style={{ border: "1px solid #D6DCE5" }}>
                                <iframe
                                    src={gettingHere.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
