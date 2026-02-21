const fs = require('fs');
const path = require('path');

const brandPath = path.join(__dirname, '..', 'content', 'brand.json');
const data = JSON.parse(fs.readFileSync(brandPath, 'utf8'));

// Apply text updates to all locations
data.locations.forEach(location => {
    // 1. Accommodation updates
    if (location.accommodation && location.accommodation.amenities) {
        location.accommodation.amenities = location.accommodation.amenities.map(amenity => {
            if (amenity === "Projector setup for binge-watching") return "Projector for big-screen binge-watching";
            if (amenity === "24/7 security") return "CCTV security";
            return amenity;
        });
    }

    // 2. Target Market "What brings them here?" to "Your space, your agenda."
    // Actually this is hardcoded in the component, so we don't need to change it here.

    // We can also handle the CoWorking parenthesis lowercase here if we want,
    // but doing it in the component is safer and cleaner for formatting.
});

fs.writeFileSync(brandPath, JSON.stringify(data, null, 4));
console.log("Updated brand.json with text changes.");
