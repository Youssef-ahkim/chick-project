'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart, Leaf, ShieldCheck, Star, ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FarmStoryPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const ctx = gsap.context(() => {
            gsap.defaults({
                ease: "power2.out",
                duration: 1,
                force3D: true,
            });

            // Hero Animation
            gsap.from(".hero-content > *", {
                y: 50,
                autoAlpha: 0,
                stagger: 0.1,
                delay: 0.5
            });

            gsap.to(".hero-image", {
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
                y: 100,
                ease: "none"
            });

            // Reveal Sections
            const revealSections = containerRef.current?.querySelectorAll(".reveal-section");
            revealSections?.forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                    },
                    y: 30,
                    autoAlpha: 0,
                    clearProps: "all"
                });
            });

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={containerRef} className="bg-background min-h-screen selection:bg-orange-600 selection:text-white overflow-hidden">
            
            {/* High-Resolution Panoramic Hero */}
            <section className="hero-section relative h-screen flex items-center overflow-hidden bg-background">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/farm_hero.png"
                        alt="The Farm at Tahanaout"
                        fill
                        className="object-cover hero-image"
                        priority
                        quality={100}
                        style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-20">
                    <div className="max-w-4xl hero-content">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-black/10 backdrop-blur-lg border border-white/20 rounded-full text-orange-200 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl">
                            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,1)]" />
                            Est. 2018 • Tahanaout
                        </div>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.8] uppercase mb-12">
                            OUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300 italic">Roots.</span>
                        </h1>
                        <p className="text-white/90 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed italic border-l-4 border-orange-500 pl-8">
                            &quot;Born from a passion for traditional farming and a vision for a sustainable future.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* The Story Section - Zero White approach */}
            <section className="py-24 bg-background relative z-10">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="reveal-section space-y-10">
                            <div className="space-y-4">
                                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.4em]">The Beginning</span>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9]">A vision carved <br /><span className="text-slate-400 italic font-medium">In the hills.</span></h2>
                            </div>
                            <div className="space-y-6 text-lg text-slate-700 font-medium leading-relaxed max-w-xl">
                                <p>
                                    Tahanaout Poultry started as a small family initiative in the fertile valleys of Al Haouz. Our founders saw a disconnect between the industrial food system and the rich agricultural heritage of Morocco.
                                </p>
                                <p>
                                    We decided to go back to the basics: slow growth, natural cycles, and the highest respect for the animals and the land. Today, we are proud to be the region&apos;s leading provider of truly organic poultry.
                                </p>
                            </div>
                        </div>

                        <div className="relative reveal-section">
                            <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-4xl border-[12px] border-black/5">
                                <Image
                                    src="/pasture.png"
                                    alt="Our organic pastures"
                                    fill
                                    className="object-cover"
                                    quality={100}
                                />
                            </div>
                            <div className="absolute -top-10 -left-10 bg-background/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-black/5 hidden md:block">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                        <Leaf />
                                    </div>
                                    <p className="font-black text-slate-950 uppercase tracking-tighter text-sm">Eco-Responsibility</p>
                                </div>
                                <p className="text-xs text-slate-600 font-bold max-w-[180px]">We recycle 95% of our farm waste into organic compost.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars Grid - Replaced "Cloudy" elements with structured design */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal-section">
                        <span className="text-orange-600 font-black text-xs uppercase tracking-[0.4em]">Our Philosophy</span>
                        <h2 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase mt-6">THREE PILLARS OF <br /><span className="text-orange-600 italic">Integrity.</span></h2>
                    </div>

                    <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-12 reveal-section">
                        {[
                            {
                                icon: <Heart className="w-10 h-10" />,
                                title: "Animal Welfare",
                                desc: "No cages, ever. Our chickens enjoy the freedom to roam, forage, and live a life consistent with their natural instincts.",
                                color: "bg-orange-600",
                                text: "text-white"
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10" />,
                                title: "Total Purity",
                                desc: "Zero antibiotics, zero hormones, and zero artificial additives. What you see is exactly what you get: pure nature.",
                                color: "bg-emerald-900",
                                text: "text-white"
                            },
                            {
                                icon: <Users className="w-10 h-10" />,
                                title: "Local Heart",
                                desc: "We employ from our village, source from local neighbors, and reinvest in the Tahanaout community infrastructure.",
                                color: "bg-slate-300",
                                text: "text-slate-950"
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="pillar-item group">
                                <div className={`h-full ${pillar.color} ${pillar.text} p-12 rounded-[3.5rem] shadow-xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-4`}>
                                    <div className="mb-10 w-20 h-20 bg-black/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-4xl font-black mb-6 tracking-tight uppercase leading-none">{pillar.title}</h3>
                                    <p className="opacity-80 text-lg font-medium leading-relaxed">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Section - Crystal Clear */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="reveal-section h-[600px] relative rounded-[3.5rem] overflow-hidden group shadow-4xl border-[12px] border-black/5">
                           <Image
                                src="/hands_eggs.png"
                                alt="Fresh eggs"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-16">
                                <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Harvested Daily</h3>
                                <p className="text-white/60 text-lg font-medium mt-4">Every morning, our basket is filled with the finest organic eggs.</p>
                            </div>
                        </div>
                        <div className="reveal-section h-[600px] bg-slate-200 rounded-[3.5rem] p-16 flex flex-col justify-between border border-black/5 shadow-2xl">
                            <div className="space-y-8">
                                <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center text-white shadow-xl">
                                    <MapPin className="w-10 h-10" />
                                </div>
                                <h3 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9]">Visit us in <br /><span className="text-orange-600 italic">Tahanaout.</span></h3>
                                <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                                    We believe in radical transparency. Our doors are open for educational tours twice a month for local schools and partners.
                                </p>
                            </div>
                            <div className="pt-10 border-t border-black/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Calendar className="text-orange-600" />
                                    <span className="font-bold text-slate-500">Next Tour: May 15, 2026</span>
                                </div>
                                <button className="text-slate-950 font-black flex items-center gap-2 group">
                                    Book Visit
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <footer className="bg-slate-950 text-white py-24 relative overflow-hidden px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
                    <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase">Taste the <br /><span className="text-orange-500 italic">Tradition.</span></h2>
                    <p className="text-2xl text-slate-400 font-medium max-w-2xl mx-auto italic">&quot;Each purchase supports our mission to keep Moroccan agriculture clean, healthy, and ethical.&quot;</p>
                    <div className="pt-10">
                        <Link href="/products" className="btn-primary inline-flex items-center gap-4 px-16 py-8 text-xl">
                            Shop Our Farm
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>

                    <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-black text-2xl">T</span>
                            </div>
                            <div>
                                <span className="font-black tracking-tighter text-2xl uppercase block leading-none">Tahanaout Poultry</span>
                                <span className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase">The Atlas Region</span>
                            </div>
                        </div>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Tahanaout Poultry.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
