"use client";

import { Persona } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Laptop, Code2, Palette } from "lucide-react";

interface LocationTargetMarketProps {
    personas: Persona[];
}

const ICONS: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="h-6 w-6 text-white" />,
    Laptop: <Laptop className="h-6 w-6 text-white" />,
    Code2: <Code2 className="h-6 w-6 text-white" />,
    Palette: <Palette className="h-6 w-6 text-white" />,
    Users: <Users className="h-6 w-6 text-white" />,
};

const BRAND_COLORS: Record<string, string> = {
    "bg-blue-500": "#0158F5", // Blue
    "bg-sky-500": "#03B1F7",  // Sky
    "bg-emerald-500": "#03D2D8", // Aqua
    "bg-rose-500": "#E53652", // Red
    "bg-indigo-500": "#0C4A96", // Navy
    "bg-pink-500": "#E53652", // Red fallback
    "bg-amber-500": "#E8704F", // Orange
    "bg-violet-500": "#0C4A96", // Navy fallback
    "bg-teal-500": "#03D2D8", // Aqua fallback
    "bg-green-500": "#03B1F7", // Sky fallback
    "bg-orange-500": "#E8704F" // Orange fallback
};

export function LocationTargetMarket({ personas }: LocationTargetMarketProps) {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-border/40" id="target-market">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 uppercase tracking-widest">Built For People Like You</Badge>
                    <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Find Your Tribe
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Surround yourself with high-performing individuals who refuse to choose between their career and lifestyle.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                    {personas.slice(0, 8).map((persona) => {
                        const bgColor = BRAND_COLORS[persona.color] || "#0158F5";
                        return (
                            <div key={persona.id} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-border/40 hover:shadow-md transition-all duration-300">
                                <div
                                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transform group-hover:scale-110 transition-transform shadow-md"
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {ICONS[persona.icon] || <Users className="h-6 w-6 text-white" />}
                                </div>
                                <h3 className="font-sora text-lg font-bold text-foreground leading-tight mb-2">
                                    {persona.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {persona.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
