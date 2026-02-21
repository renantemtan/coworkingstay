"use client";

import { Persona } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Laptop, Code2, Palette } from "lucide-react";

interface LocationTargetMarketProps {
    personas: Persona[];
    targetActivities?: string[];
}

const ICONS: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="h-6 w-6 text-white" />,
    Laptop: <Laptop className="h-6 w-6 text-white" />,
    Code2: <Code2 className="h-6 w-6 text-white" />,
    Palette: <Palette className="h-6 w-6 text-white" />,
    Users: <Users className="h-6 w-6 text-white" />,
};

export function LocationTargetMarket({ personas, targetActivities }: LocationTargetMarketProps) {
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
                    {personas.slice(0, 8).map((persona) => (
                        <div key={persona.id} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-border/40 hover:shadow-md transition-all duration-300">
                            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${persona.color} shadow-lg shadow-${persona.color}/20 transform group-hover:scale-110 transition-transform`}>
                                {ICONS[persona.icon] || <Users className="h-6 w-6 text-white" />}
                            </div>
                            <h3 className="font-sora text-lg font-bold text-foreground leading-tight mb-2">
                                {persona.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {persona.description}
                            </p>
                        </div>
                    ))}
                </div>

                {targetActivities && targetActivities.length > 0 && (
                    <div className="max-w-4xl mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-border/40">
                        <h3 className="font-sora text-2xl font-bold mb-8">What brings them here?</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {targetActivities.map((activity, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-sm text-foreground font-medium border border-border/50 hover:border-primary/30 hover:bg-primary/5 cursor-default transition-colors">
                                    {activity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
