'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Search, Filter, ArrowRight, Star, Heart, CheckCircle2, Package, Truck, ShieldCheck, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const products = [
    {
        id: 1,
        name: 'Whole Organic Chicken',
        category: 'Whole Poultry',
        price: 14.99,
        unit: '1.5kg',
        image: '/chicken.png',
        tag: 'Best Seller',
        tagColor: 'bg-emerald-600',
        description: 'Slow-grown, pasture-raised chicken with exceptional flavor and texture.'
    },
    {
        id: 2,
        name: 'Pasture-Raised Brown Eggs',
        category: 'Eggs',
        price: 4.50,
        unit: 'Dozen',
        image: '/eggs.png',
        tag: 'Daily Fresh',
        tagColor: 'bg-orange-600',
        description: 'Rich, golden yolks from hens free to roam the sunny valleys of Tahanaout.'
    },
    {
        id: 3,
        name: 'Organic Chicken Breast',
        category: 'Cuts',
        price: 9.99,
        unit: '500g',
        image: '/products/chicken-breast.png',
        tag: 'Lean Protein',
        tagColor: 'bg-orange-600',
        description: 'Perfectly trimmed, tender breasts from our organic-certified farm.'
    },
    {
        id: 4,
        name: 'Chicken Drumsticks',
        category: 'Cuts',
        price: 6.99,
        unit: '1kg',
        image: '/products/drumsticks.png',
        tag: 'Farm Favorite',
        tagColor: 'bg-slate-900',
        description: 'Juicy and flavorful, ideal for roasting, grilling or slow cooking.'
    },
    {
        id: 5,
        name: 'Organic Quail Eggs',
        category: 'Eggs',
        price: 5.25,
        unit: '12 pcs',
        image: '/products/quail-eggs.png',
        tag: 'Premium Choice',
        tagColor: 'bg-orange-600',
        description: 'Boutique-quality quail eggs, packed with nutrition and delicate flavor.'
    },
    {
        id: 6,
        name: 'Clean Chicken Wings',
        category: 'Cuts',
        price: 7.50,
        unit: '1kg',
        image: '/products/wings.png',
        tag: 'Perfect for Grill',
        tagColor: 'bg-orange-600',
        description: 'Crispy and succulent, our wings are a local favorite for any occasion.'
    }
];

const categories = ['All', 'Whole Poultry', 'Cuts', 'Eggs'];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            // Set global defaults for GSAP
            gsap.defaults({
                ease: "power2.out",
                duration: 0.8,
                force3D: true,
            });

            // New Hero Animation
            gsap.from(".hero-text", {
                y: 60,
                autoAlpha: 0,
                duration: 1.2,
                delay: 0.5
            });

            gsap.to(".hero-bg-parallax", {
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    lazy: true,
                },
                y: 60,
                ease: "none"
            });

            // Card Entrance
            gsap.from(".product-card", {
                autoAlpha: 0,
                y: 30,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: ".products-grid",
                    start: "top 90%",
                }
            });
        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main ref={containerRef} className="bg-background min-h-screen selection:bg-orange-600 selection:text-white overflow-hidden relative">

            {/* New "Editorial" Hero Section - Now Full Screen to fix unwanted bottom gap */}
            <section className="hero-section relative h-screen flex items-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0 hero-bg-parallax">
                    <Image
                        src="/products/new-hero.png"
                        alt="High Altitude Farm Tahanaout"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                    {/* Modern Overlay Treatment */}
                    <div className="absolute inset-0 bg-slate-950/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-20">
                    <div className="max-w-6xl hero-text">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-orange-200 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl">
                            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,1)]" />
                            Premium Selection 2026
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase mb-10 md:mb-12">
                            THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300 italic">Finest.</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed italic border-l-4 border-orange-500 pl-6 md:pl-8">
                            &quot;Curated organic poultry from the legendary ridges of the Atlas Mountains.&quot;
                        </p>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-16 right-20 flex flex-col items-center gap-8 hidden md:flex">
                    <span className="text-white/30 text-[10px] uppercase font-black tracking-[0.6em] rotate-90 mb-14">SCROLL</span>
                    <div className="w-[1px] h-32 bg-gradient-to-b from-orange-500 to-transparent shadow-[0_0_10px_rgba(249,115,22,0.3)]" />
                </div>
            </section>

            {/* Content Area - Smooth Transition */}
            <div className="bg-background relative z-10 pt-24 pb-24">

                {/* Subtle Section Shadow to break the stark white */}
                <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-background to-transparent pointer-events-none" />

                {/* Floating Elements removed */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">

                    {/* Balanced Utility Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-orange-600 font-black text-xs uppercase tracking-[0.3em]">
                                <span className="h-[2px] w-12 bg-orange-600" />
                                Available Today
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                                Fresh <br />
                                <span className="text-slate-400 italic font-medium">From Farm</span>
                            </h2>
                        </div>

                        <div className="w-full md:w-auto flex flex-col items-end gap-6">
                            <div className="flex bg-white shadow-xl p-2 rounded-3xl border border-slate-100 gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                            ? 'bg-slate-950 text-white shadow-2xl'
                                            : 'text-slate-400 hover:text-slate-950 hover:bg-background'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-card group cursor-pointer">
                                <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-4xl group-hover:-translate-y-4 group-hover:rotate-1 bg-white p-0">
                                    <div className="absolute inset-0 bg-slate-100 animate-pulse" />
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-8 left-8">
                                        <span className={`${product.tagColor} text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl`}>{product.tag}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent flex flex-col justify-end p-12 opacity-90 group-hover:opacity-100 transition-opacity">
                                        <h3 className="text-4xl font-black text-white mb-3 tracking-tight leading-none">{product.name}</h3>
                                        <p className="text-white/60 text-sm font-medium mb-8 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{product.description}</p>
                                        <div className="flex justify-between items-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                            <p className="text-orange-400 font-black text-3xl">${product.price.toFixed(2)} <span className="text-xs text-white/40 font-medium ml-1">/{product.unit}</span></p>
                                            <button className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center text-slate-950 shadow-2xl hover:bg-orange-600 hover:text-white transition-all hover:scale-110 active:scale-95">
                                                <ShoppingCart className="w-8 h-8" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="py-40 text-center">
                            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">No items found</h2>
                            <p className="text-slate-400 font-medium">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 text-white py-40 relative overflow-hidden px-6 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
                    <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase whitespace-pre-wrap">Real food <br /><span className="text-orange-500 italic">Today.</span></h2>

                    <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-black text-2xl">T</span>
                            </div>
                            <span className="font-black tracking-tighter text-2xl uppercase">Tahanaout Poultry</span>
                        </div>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Tahanaout Poultry.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
