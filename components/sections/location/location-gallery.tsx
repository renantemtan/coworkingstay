"use client";

import { GalleryItem } from "@/types/content";
import Image from "next/image";
import { motion } from "framer-motion";

interface LocationGalleryProps {
    gallery?: GalleryItem[];
}

export function LocationGallery({ gallery }: LocationGalleryProps) {
    if (!gallery || gallery.length === 0) return null;

    const displayPhotos = gallery.slice(0, 6);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white" id="gallery">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-sora text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#333F50" }}>
                        Gallery
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: "#333F50", opacity: 0.6 }}>
                        A glimpse into your next sanctuary.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[280px]">
                    {displayPhotos.map((item, index) => {
                        // First photo and fourth photo span 2 rows/cols for visual rhythm
                        const spanClass =
                            index === 0 ? "col-span-2 row-span-2" :
                                index === 3 ? "col-span-2 md:col-span-1 row-span-2" :
                                    "col-span-1 row-span-1";

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                className={`relative rounded-2xl overflow-hidden group ${spanClass}`}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4 sm:p-6">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span
                                            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                                            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
