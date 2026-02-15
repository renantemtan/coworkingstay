'use client';

import {
    Briefcase, Laptop, Users, Palette, Code2, Mic2,
    Heart, Moon, GraduationCap, Dumbbell, CalendarClock,
    Rocket, Camera
} from 'lucide-react';

/* Each market segment gets short descriptor + icon for visual richness */
const segmentMeta: Record<string, { description: string; icon: any }> = {
    'Remote Working Professionals': {
        description: 'Escape the office without missing a beat. Bring your A-game to the beach.',
        icon: Briefcase,
    },
    'Digital Nomads': {
        description: 'Stable fiber internet, backup power, and a community of doers wherever you land.',
        icon: Laptop,
    },
    'Programmers / Developers / Indie Hackers': {
        description: 'Deep-focus zones, dual monitors, failover internet. Ship code, not excuses.',
        icon: Code2,
    },
    'Freelancers & Independent Consultants (Designers, Writers, Marketers)': {
        description: 'Client calls from paradise. Creative flow fueled by nature, not noise.',
        icon: Palette,
    },
    'Startup Founders / Startup Teams / Product Builders': {
        description: 'War rooms with ocean views. Retreats that actually produce results.',
        icon: Rocket,
    },
    'Content Creators, Influencers, Vloggers, YouTubers, Podcasters': {
        description: 'Stunning backdrops, reliable uploads, and a creator-friendly atmosphere.',
        icon: Camera,
    },
    "Couples/Friends on 'work + vacation' (hackathons, strategy planning, team building)": {
        description: 'Blend productivity with play—hack, plan, bond, then unwind together.',
        icon: Users,
    },
    'Night Warriors (call center & nightshift workers)': {
        description: 'Quiet-by-policy spaces with 24/7 power and internet for your graveyard shift.',
        icon: Moon,
    },
    "Students on 'study + vacation' (grad students, board reviewers, exam takers)": {
        description: 'Focus zones for cramming, nature breaks for recharging. Pass and play.',
        icon: GraduationCap,
    },
    'Wellness-Oriented High Performers': {
        description: 'Balance peak output with mindful recovery in nature-rich environments.',
        icon: Dumbbell,
    },
    'Weekend Work Warriors (workathons)': {
        description: 'Turn your weekend into a sprint—arrive Friday, ship Monday, surf in between.',
        icon: CalendarClock,
    },
};

interface TargetAudienceProps {
    targetMarket: string[];
}

export function TargetAudience({ targetMarket }: TargetAudienceProps) {
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
                    {targetMarket.map((segment) => {
                        const meta = segmentMeta[segment] || {
                            description: 'High-performers who belong in our community.',
                            icon: Users,
                        };
                        const Icon = meta.icon;
                        // Short display label (trim long parenthetical text for card title)
                        const shortLabel = segment.split('(')[0].trim();

                        return (
                            <div
                                key={segment}
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
                                        {meta.description}
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
