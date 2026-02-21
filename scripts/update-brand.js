const fs = require('fs');
const path = require('path');

const brandPath = path.join(__dirname, '..', 'content', 'brand.json');
const data = JSON.parse(fs.readFileSync(brandPath, 'utf8'));

// ─── Shared data (same policies, same target activities, same coworking disclaimer) ───
const sharedPolicies = {
    guidelines: [
        "No loud music or karaoke.",
        "Quiet-by-policy in designated areas to respect deep focus.",
        "Coworking etiquette: No swimwear or top-off in work areas. Observe silence and be mindful.",
        "No food in the coworking space (use designated eating areas). Only spill-proof BYO mugs allowed inside.",
        "Be considerate: Do not occupy multiple shared spaces simultaneously.",
        "No parties or heavy drinking inside the premises, especially in shared spaces.",
        "No smoking inside rooms and shared spaces. Please use designated smoking areas.",
        "No gambling inside the premises.",
        "Clean-as-you-go policy applies to all shared areas.",
        "Conserve water (water is supplied from a reserve source).",
        "Conserve electricity to prevent intermittent power interruptions.",
        "No outside visitors allowed."
    ],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    deposit: "50% deposit required, remaining balance due before check-in.",
    cancellation: "No refund for cancellations within 48 hours. Please contact us for rebooking options."
};

const sharedTargetActivities = [
    "Strategy planning",
    "Hackathon",
    "Team building",
    "Focus-work sprints",
    "Deep study sessions",
    "Training seminars",
    "Conferences",
    "Product building",
    "Sprint planning",
    "Technical delivery",
    "Weekend-warrior sprints",
    "Overnight-work grinds"
];

const sharedTechDisclaimer = "Note: Technology and amenities are provided on a best-effort basis and are dependent on external factors such as local ISPs and electricity providers.";

const sharedAccommodationDescription = "Basic but deeply comfortable. Our rooms are intentionally designed to be restful sanctuaries, focused entirely on providing you with proper sleep and recovery after a long day of work or play.";

// ─── WORK 'N LAKE ───
const lakeIdx = data.locations.findIndex(l => l.id === 'work-n-lake');
if (lakeIdx !== -1) {
    const lake = data.locations[lakeIdx];

    lake.image = "/locations/placeholders/lake-hero-bg.png";
    lake.logoUrl = "/logos/worknlake_logo_darkbg.svg";
    lake.hideStatus = false;
    lake.description = "An exclusive lakeside retreat engineered for deep focus and meaningful collaboration. Surrounded by the serene mountains of Laguna, Work 'n Lake is where teams come to build, strategize, and recharge — far from the noise of the city.";
    lake.amenities = [
        "Coworking Space",
        "Workstations",
        "Focus-Zones",
        "Collab-Zones",
        "Conference Room",
        "Lounge",
        "Failover Internet",
        "Power Backup",
        "Lakeside Deck"
    ];
    lake.overviewHighlights = [
        "Private lakeside setting",
        "Deep focus environment",
        "Built for teams & strategy"
    ];
    lake.contact = {
        email: "worknlake@coworkingstay.com",
        number: "TBD",
        socials: {
            facebook: "tbd",
            instagram: "tbd",
            linkedin: "tbd"
        }
    };

    lake.coworking = {
        description: "A sanctuary of concentration nestled by the lake. The workspace is designed to minimize distractions and maximize creative output, with zones tailored for solo deep work and team collaboration alike.",
        zones: [
            "Focus Zones (Quiet area)",
            "Collab Zones (Open discussion)",
            "Lakeside Deck (Outdoor workspace)"
        ],
        conferenceRooms: "Dedicated conference and training room available for team strategy sessions, workshops, and client presentations.",
        technology: [
            "Dual monitors available on select workstations",
            "Projector equipped in the conference/training room",
            "High-speed WiFi with failover backup",
            "Power backup (Site generator)",
            "Whiteboards for brainstorming"
        ],
        disclaimer: sharedTechDisclaimer,
        activities: [
            "Focus work sprints",
            "Team collaboration",
            "Strategy planning",
            "Hackathons"
        ],
        photos: [
            "/locations/placeholders/coworking-1.png",
            "/locations/placeholders/coworking-2.png"
        ]
    };

    lake.accommodation = {
        beds: "Configuration TBD (Room setup being finalized)",
        amenities: [
            "Air conditioning",
            "Water heater",
            "High-speed internet access",
            "Projector setup for binge-watching",
            "Fresh towels & linens",
            "24/7 security"
        ],
        description: sharedAccommodationDescription,
        photos: [
            "/locations/placeholders/room-1.png",
            "/locations/placeholders/room-2.png"
        ]
    };

    lake.activitiesDescription = "Wake up to misty mountain views, crush a focused work block, then kayak across the lake before lunch. Afternoons are for waterfall hikes or lakeside strategy sessions — and when the rain rolls in, fire up the in-room projector for guilt-free downtime.";
    lake.activitiesDisclaimer = "Please note: Most outdoor and adventure activities are provided by trusted third-party local operators and are not directly affiliated with CoWorkingStay.";

    lake.activities = [
        {
            category: "Lake Activities",
            items: ["Kayaking", "Fishing", "Paddleboarding", "Lake swimming"]
        },
        {
            category: "Land Adventures",
            items: ["Waterfall trekking", "Mountain biking", "Nature trails", "Farm visits"]
        },
        {
            category: "Leisure",
            items: ["Sunrise meditation", "Lakeside yoga", "Stargazing", "Local cuisine tours"]
        },
        {
            category: "Culture & Eco-Tourism",
            items: ["Pagsanjan Falls day trip", "Hot springs", "Local artisan workshops"]
        }
    ];

    lake.targetActivities = sharedTargetActivities;

    lake.gettingHere = {
        publicTransport: "From Manila: Take a bus to Santa Cruz, Laguna → Jeepney or Tricycle to Cavinti → Local transport to the property.",
        publicTransportDetails: [
            "Bus to Santa Cruz, Laguna: ~₱150 - ₱250 ($3 - $5)",
            "Jeepney to Cavinti: ~₱50 - ₱80 ($1 - $2)",
            "Tricycle to property: ~₱50 - ₱100 ($1 - $2)"
        ],
        privateTransport: "Drive via SLEX → Calamba exit → through Pagsanjan to Cavinti. Approximately 3-4 hours from Metro Manila.",
        privateTransportDetails: [
            "Free parking available at the property.",
            "Road is fully paved but winding in mountainous sections."
        ],
        disclaimer: "Fares and schedules are estimates and subject to change by the transport operators.",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61826.22!2d121.48!3d14.24!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6c6b5a6e97d1%3A0x5c4e63c7c0e1cae2!2sCavinti%2C%20Laguna!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph",
        photos: []
    };

    lake.locationPolicies = sharedPolicies;

    lake.gallery = [
        { src: "/locations/placeholders/lake-hero-bg.png", alt: "Lakeside retreat aerial view", label: "concept" },
        { src: "/locations/placeholders/coworking-1.png", alt: "Coworking space", label: "concept" },
        { src: "/locations/placeholders/room-1.png", alt: "Room interior", label: "concept" },
        { src: "/locations/placeholders/coworking-2.png", alt: "Conference room", label: "concept" },
        { src: "/locations/placeholders/room-2.png", alt: "Room projector setup", label: "concept" },
        { src: "/locations/placeholders/gallery-1.png", alt: "Outdoor activities", label: "concept" }
    ];
}

// ─── WORK 'N SURF ───
const surfIdx = data.locations.findIndex(l => l.id === 'work-n-surf');
if (surfIdx !== -1) {
    const surf = data.locations[surfIdx];

    surf.image = "/locations/placeholders/surf-hero-bg.png";
    surf.logoUrl = "/logos/worknsurf_logo_darkbg.svg";
    surf.hideStatus = false;
    surf.description = "Where the best waves meet peak performance. Work 'n Surf in La Union is designed for creators, builders, and remote professionals who want the energy of a surf town with the discipline of a proper workspace.";
    surf.amenities = [
        "Coworking Space",
        "Workstations",
        "Focus-Zones",
        "Collab-Zones",
        "Conference Room",
        "Lounge",
        "Failover Internet",
        "Power Backup",
        "Surf Gear Storage"
    ];
    surf.overviewHighlights = [
        "Steps from the surf break",
        "Young energy, serious output",
        "Built for builders & creators"
    ];
    surf.contact = {
        email: "worknsurf@coworkingstay.com",
        number: "TBD",
        socials: {
            facebook: "tbd",
            instagram: "tbd",
            linkedin: "tbd"
        }
    };

    surf.coworking = {
        description: "A high-energy workspace infused with the rhythm of La Union's surf culture. Built for people who work hard and play harder — with zones for heads-down focus and open-floor collaboration.",
        zones: [
            "Focus Zones (Quiet area)",
            "Collab Zones (Open discussion)",
            "Lounge Area"
        ],
        conferenceRooms: "Dedicated conference and training room available for team strategy sessions, workshops, and client presentations.",
        technology: [
            "Dual monitors available on select workstations",
            "Projector equipped in the conference/training room",
            "High-speed WiFi with failover backup",
            "Power backup (Site generator)",
            "Whiteboards for brainstorming"
        ],
        disclaimer: sharedTechDisclaimer,
        activities: [
            "Focus work sprints",
            "Team collaboration",
            "Strategy planning",
            "Hackathons"
        ],
        photos: [
            "/locations/placeholders/coworking-1.png",
            "/locations/placeholders/coworking-2.png"
        ]
    };

    surf.accommodation = {
        beds: "Configuration TBD (Room setup being finalized)",
        amenities: [
            "Air conditioning",
            "Water heater",
            "High-speed internet access",
            "Projector setup for binge-watching",
            "Fresh towels & linens",
            "24/7 security"
        ],
        description: sharedAccommodationDescription,
        photos: [
            "/locations/placeholders/room-1.png",
            "/locations/placeholders/room-2.png"
        ]
    };

    surf.activitiesDescription = "Dawn patrol before your first standup call. Afternoon surf sessions between deep work blocks. Sunset sessions with your team. Or when the swell is flat, fire up the in-room projector and recover properly — because tomorrow, the waves (and the work) won't wait.";
    surf.activitiesDisclaimer = "Please note: Most outdoor and adventure activities are provided by trusted third-party local operators and are not directly affiliated with CoWorkingStay.";

    surf.activities = [
        {
            category: "Surf & Ocean",
            items: ["Surfing (beginners to advanced)", "Surf lessons", "Paddleboarding", "Beach volleyball"]
        },
        {
            category: "Land Adventures",
            items: ["Mountain biking", "Grape farm tours", "Hiking trails", "Motorcycle rides"]
        },
        {
            category: "Leisure",
            items: ["Sunset watching", "Bar hopping", "Night market", "Live music & acoustic nights"]
        },
        {
            category: "Culture & Community",
            items: ["Surf community events", "Local food crawl", "Art galleries", "Weekend farmers market"]
        }
    ];

    surf.targetActivities = sharedTargetActivities;

    surf.gettingHere = {
        publicTransport: "From Manila: Take a bus (Partas, Dominion, or Philippine Rabbit) direct to San Fernando, La Union → Tricycle or shuttle to Luna/San Juan beach area.",
        publicTransportDetails: [
            "Bus to San Fernando, La Union: ~₱400 - ₱700 ($7 - $12)",
            "Tricycle to surf area: ~₱50 - ₱150 ($1 - $3)"
        ],
        privateTransport: "Drive via TPLEX (Tarlac-Pangasinan-La Union Expressway). Approximately 4-5 hours from Metro Manila.",
        privateTransportDetails: [
            "Free parking available at the property.",
            "Well-paved highway with minimal traffic outside peak travel seasons."
        ],
        disclaimer: "Fares and schedules are estimates and subject to change by the transport operators.",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30536.48!2d120.32!3d16.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a17dbb18e031%3A0x74f7d1e10260a48e!2sLuna%2C%20La%20Union!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph",
        photos: []
    };

    surf.locationPolicies = sharedPolicies;

    surf.gallery = [
        { src: "/locations/placeholders/surf-hero-bg.png", alt: "La Union surf beach aerial", label: "concept" },
        { src: "/locations/placeholders/coworking-1.png", alt: "Coworking space", label: "concept" },
        { src: "/locations/placeholders/room-1.png", alt: "Room interior", label: "concept" },
        { src: "/locations/placeholders/coworking-2.png", alt: "Conference room", label: "concept" },
        { src: "/locations/placeholders/room-2.png", alt: "Room projector setup", label: "concept" },
        { src: "/locations/placeholders/gallery-1.png", alt: "Outdoor activities", label: "concept" }
    ];
}

fs.writeFileSync(brandPath, JSON.stringify(data, null, 4));
console.log("Updated brand.json with Work 'n Lake and Work 'n Surf full content.");
