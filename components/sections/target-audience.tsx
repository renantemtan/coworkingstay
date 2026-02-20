'use client';

import {
    Briefcase, Laptop, Users, Palette, Code2, Mic2,
    Heart, Moon, GraduationCap, Dumbbell, CalendarClock,
    Rocket, Camera
} from 'lucide-react';

/* Each market segment gets short descriptor + icon for visual richness */
const ICON_MAP: Record<string, any> = {
    'Briefcase': Briefcase,
    'Laptop': Laptop,
    'Code2': Code2,
    'Palette': Palette,
    'Rocket': Rocket,
    'Camera': Camera,
    'Users': Users,
    'Moon': Moon,
    'GraduationCap': GraduationCap,
    'Dumbbell': Dumbbell,
    'CalendarClock': CalendarClock,
};

interface Persona {
    id: string;
    title: string;
    description: string;
    icon: string;
    color?: string;
}

interface TargetAudienceProps {
    personas: Persona[];
}

export function TargetAudience({ personas }: TargetAudienceProps) {
    return (
        <section className="bg-[#f3f4f7] py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-14">
                    <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Built for People Like You
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-muted-foreground font-inter">
                        CoWorkingStay is where high-performing, like-minded people converge—professionals who
                        demand excellence in their work environment and refuse to compromise on living life fully.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {personas.map((persona) => {
                        const Icon = ICON_MAP[persona.icon] || Users;
                        // Short display label (trim long parenthetical text for card title if needed, though title in JSON is usually clean)
                        const shortLabel = persona.title.split('(')[0].trim();

                        return (
                            <div
                                key={persona.id}
                                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0C4A96]/10 text-[#0C4A96]">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-sora text-sm font-bold text-gray-900 leading-snug">
                                        {shortLabel}
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-gray-500 font-inter">
                                        {persona.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
