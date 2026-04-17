'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, Award, CheckCircle2, FlaskConical, Search, ArrowRight, Microscope } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function QualityPage() {
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
                        toggleActions: "play none none none"
                    },
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.8,
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
            
            {/* Editorial Quality Hero */}
            <section className="hero-section relative h-screen flex items-center overflow-hidden bg-background">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/quality_hero.png"
                        alt="Quality Standards Tahanaout"
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
                            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                            Certified Excellence • 2026
                        </div>
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.8] uppercase mb-12">
                            ZERO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300 italic">Compromise.</span>
                        </h1>
                        <p className="text-white/90 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed italic border-l-4 border-orange-500 pl-8">
                            &quot;Nature dictates the pace, science ensures the safety. The intersection of tradition and modern standards.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Standards Section */}
            <section className="py-24 bg-background relative z-10">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
                        <div className="reveal-section space-y-12">
                            <div className="space-y-4">
                                <span className="text-orange-600 font-black text-xs uppercase tracking-[0.4em]">The Protocol</span>
                                <h2 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.85]">ELEVATING THE <br /><span className="text-slate-400 italic font-medium text-5xl md:text-7xl">Standard.</span></h2>
                            </div>
                            <p className="text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
                                We don&apos;t just meet local regulations; we exceed them. Our quality framework is built on four non-negotiable pillars that ensure every product leaving our farm is a testament to purity and health.
                            </p>
                            <div className="flex gap-6">
                                <div className="space-y-2">
                                    <p className="text-5xl font-black text-slate-950">24/7</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Bio-Security Monitoring</p>
                                </div>
                                <div className="w-[1px] h-16 bg-slate-200" />
                                <div className="space-y-2">
                                    <p className="text-5xl font-black text-slate-950">0%</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Chemical Residue</p>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-section relative">
                            <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-4xl border-[12px] border-black/5">
                                <Image
                                    src="/organic_feed.png"
                                    alt="Organic Feed Close-up"
                                    fill
                                    className="object-cover"
                                    quality={100}
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-slate-950 text-white p-12 rounded-[3.5rem] shadow-4xl max-w-xs transition-transform hover:scale-105 duration-700">
                                <Search className="w-10 h-10 text-orange-500 mb-6" />
                                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">FEED ANALYSIS</h4>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">Our in-house lab tests every batch of organic corn and soy to ensure nutrient density and zero contamination.</p>
                            </div>
                        </div>
                    </div>

                    <div className="standards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-section">
                        {[
                            { icon: <Award className="w-8 h-8"/>, title: "ONSSA Certified", desc: "Fully compliant with Morocco's highest sanitary standards for food production." },
                            { icon: <ShieldCheck className="w-8 h-8"/>, title: "Cold-Chain Integrity", desc: "Temperature-controlled handling from harvest until it reaches your door." },
                            { icon: <Microscope className="w-8 h-8"/>, title: "Lab Verified", desc: "Bi-weekly microbial testing to ensure 100% safety and shelf-life stability." },
                            { icon: <Zap className="w-8 h-8"/>, title: "Rapid Harvest", desc: "Freshness guaranteed via a 'Harvest-to-Order' system that minimizes storage." },
                        ].map((item, i) => (
                            <div key={i} className="standard-card p-10 bg-background/50 border border-black/5 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-700 group">
                                <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-4">{item.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Freshness Section - High Contrast */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
                
                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="reveal-section order-2 lg:order-1">
                            <div className="relative aspect-square rounded-[4rem] overflow-hidden border-[16px] border-white/5 shadow-3xl">
                                <Image
                                    src="/fresh_quality.png"
                                    alt="Fresh Poultry Display"
                                    fill
                                    className="object-cover"
                                    quality={100}
                                />
                            </div>
                        </div>
                        <div className="reveal-section space-y-12 order-1 lg:order-2">
                            <div className="space-y-6">
                                <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">PURE <br /><span className="text-orange-500 italic">FRESHNESS.</span></h2>
                                <p className="text-2xl text-slate-300 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-8">
                                    &quot;Our meat is never frozen. We believe that true quality can only be experienced in its freshest state.&quot;
                                </p>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { t: "NO Hormones", d: "Naturally slow-grown (minimum 81 days) for superior texture." },
                                    { t: "NO Antibiotics", d: "Natural herb-based preventatives for bird health." },
                                    { t: "YES Traceability", d: "Each package features a farm-origin code." },
                                ].map((list, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="mt-1 w-6 h-6 bg-orange-600 rounded-full flex-shrink-0 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h5 className="text-xl font-black uppercase tracking-tight">{list.t}</h5>
                                            <p className="text-slate-400 font-medium">{list.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <footer className="bg-background text-slate-950 py-24 relative px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="reveal-section inline-flex items-center gap-4 bg-slate-950 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest mb-10">
                        <FlaskConical className="w-4 h-4 text-orange-500" />
                        Scientifically Backed
                    </div>
                    <h2 className="reveal-section text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase">TRUST THE <br /><span className="text-orange-600 italic">Source.</span></h2>
                    
                    <div className="reveal-section pt-10">
                        <Link href="/products" className="btn-primary inline-flex items-center gap-4 px-16 py-8 text-xl">
                            Taste the Quality
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>

                    <div className="mt-40 pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-black text-2xl">T</span>
                            </div>
                            <div>
                                <span className="font-black tracking-tighter text-2xl uppercase block leading-none">Tahanaout Poultry</span>
                                <span className="text-[10px] text-slate-400 font-bold tracking-[0.4em] uppercase">Est. 2018</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Tahanaout Poultry.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
