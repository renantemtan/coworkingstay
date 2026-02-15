'use client';

import { CheckCircle2, Briefcase, Laptop, Users, Palette, Code2 } from 'lucide-react';
import type { Persona } from '@/types/content';

const iconMap: Record<string, any> = {
    Briefcase,
    Laptop,
    Users,
    Palette,
    Code2
};

interface TargetAudienceProps {
    personas: Persona[];
}

export function TargetAudience({ personas }: TargetAudienceProps) {
    return (
        <section className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Built for People Like You
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground font-inter">
                        CoWorkingStay is engineered for professionals who demand high standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
                    {personas.map((persona, index) => {
                        const Icon = iconMap[persona.icon] || Users;
                        return (
                            <div
                                key={persona.title}
                                className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-white shadow-sm ring-1 ring-gray-900/5 hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${persona.color}`}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-sora text-xl font-bold text-gray-900">
                                        {persona.title}
                                    </h3>
                                    <p className="mt-3 text-base leading-7 text-gray-600 font-inter">
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
