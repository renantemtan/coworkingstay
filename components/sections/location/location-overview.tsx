import { Wifi, Zap, BedDouble, MapPin, Shield, Monitor } from "lucide-react";

interface OverviewStat {
    icon: string;
    label: string;
}

interface LocationOverviewProps {
    description?: string;
    highlights?: string[];
    amenities?: string[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-6 w-6" />,
    zap: <Zap className="h-6 w-6" />,
    bed: <BedDouble className="h-6 w-6" />,
    mappin: <MapPin className="h-6 w-6" />,
    shield: <Shield className="h-6 w-6" />,
    monitor: <Monitor className="h-6 w-6" />,
};

// Derive clean stat icons from amenities list
const AMENITY_ICONS: Record<string, { icon: string; short: string }> = {
    "Coworking Space": { icon: "monitor", short: "Coworking Space" },
    "Workstations": { icon: "monitor", short: "Dual-Monitor Desks" },
    "Focus-Zones": { icon: "shield", short: "Focus Zones" },
    "Collab-Zones": { icon: "wifi", short: "Collab Zones" },
    "Conference Room": { icon: "monitor", short: "Conference Room" },
    "Outdoor Gym": { icon: "zap", short: "Outdoor Gym" },
    "Lounge": { icon: "bed", short: "Chill Lounge" },
    "Failover Internet": { icon: "wifi", short: "Failover WiFi" },
    "Power Backup": { icon: "zap", short: "Power Backup" },
};

export function LocationOverview({ description, highlights, amenities }: LocationOverviewProps) {
    // Build stat items from amenities
    const stats = (amenities || []).map((a) => {
        const mapped = AMENITY_ICONS[a];
        return mapped ? mapped : { icon: "mappin", short: a };
    });

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white" id="overview">
            <div className="max-w-6xl mx-auto">

                {/* Description */}
                {description && (
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "#333F50" }}>
                            {description}
                        </p>
                    </div>
                )}

                {/* Highlights badges */}
                {highlights && highlights.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {highlights.map((h, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm"
                                style={{ backgroundColor: "#0C4A96", color: "white" }}
                            >
                                {h}
                            </span>
                        ))}
                    </div>
                )}

                {/* At-a-glance stat grid */}
                {stats.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {stats.slice(0, 10).map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl border transition-shadow hover:shadow-md"
                                style={{ borderColor: "#D6DCE5" }}
                            >
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-3"
                                    style={{ backgroundColor: "#0C4A96", color: "white" }}
                                >
                                    {ICON_MAP[stat.icon] || <MapPin className="h-6 w-6" />}
                                </div>
                                <span className="text-sm font-semibold" style={{ color: "#333F50" }}>
                                    {stat.short}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
