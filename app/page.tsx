'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Leaf, ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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

      // 2. Hero Content Animations
      const heroTl = gsap.timeline();
      heroTl.from(".hero-content > *", {
        y: 40,
        autoAlpha: 0,
        stagger: 0.08,
        delay: 0.3
      });

      // 3. Parallax Hero Background
      gsap.to(".hero-image", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          lazy: true,
        },
        y: 50,
        ease: "none"
      });

      // 4. Reveal Animation for Sections
      gsap.from(".reveal-section", {
        scrollTrigger: {
          trigger: ".reveal-section",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        autoAlpha: 0,
        y: 30,
      });

      // 5. Product Cards Staggered Entry
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 30,
        stagger: 0.08,
      });

      // 6. Floating elements parallax
      gsap.to(".floating-card", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          lazy: true,
        },
        y: -30,
        ease: "none"
      });

      // 7. Feature Items Slide In
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.5,
      });

      // 8. Quality Section Highlight
      gsap.from(".quality-card", {
        scrollTrigger: {
          trigger: ".quality-card",
          start: "top 95%",
        },
        scale: 0.98,
        autoAlpha: 0,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-white min-h-screen relative overflow-x-hidden">

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Organic Poultry Farm"
            fill
            className="object-cover hero-image"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 pt-28 md:pt-36">
          <div className="max-w-3xl hero-content space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-orange-200 text-[10px] font-black uppercase tracking-[0.4em]  shadow-2xl">
              <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,115,22,1)]" />
              Premium Farm-To-Table Quality
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              FRESH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 italic">Poultry.</span>
            </h1>
            <p className="text-lg md:text-xl text-orange-50/80 leading-relaxed max-w-lg">
              Experience the taste of Tahanaout&apos;s finest organic poultry and pasture-raised eggs. Delivered straight from our farm to your kitchen.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products" className="btn-primary flex items-center gap-2 group">
                Shop Our Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-all border border-white/30"
                style={{ transform: 'translateZ(0)' }}
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section ref={productsRef} className="py-32 bg-slate-50 relative overflow-hidden reveal-section">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase whitespace-pre-wrap">Daily <br /><span className="text-orange-600 italic leading-none">Fresh picks</span></h2>
              <p className="text-slate-500 max-w-sm text-lg font-medium">Hand-selected, organic, and prepared specifically for your order today.</p>
            </div>
            <Link href="/products" className="text-orange-700 font-bold flex items-center gap-2 group border-b-2 border-orange-200 pb-2 transition-all hover:border-orange-600">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Product Card 1 */}
            <div className="product-card group cursor-pointer">
              <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-700 group-hover:shadow-3xl group-hover:-translate-y-4 group-hover:rotate-1">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                <Image
                  src="/chicken.png"
                  alt="Organic Whole Chicken"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-emerald-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Organic</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Whole Chicken</h3>
                  <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-orange-400 font-black text-2xl">$14.99 <span className="text-xs text-white/50 font-medium">/ 1.5kg</span></p>
                    <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl hover:bg-orange-600 hover:text-white transition-all hover:scale-110 active:scale-95">
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="product-card group cursor-pointer">
              <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-700 group-hover:shadow-3xl group-hover:-translate-y-4 group-hover:-rotate-1">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                <Image
                  src="/eggs.png"
                  alt="Pasture-Raised Brown Eggs"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-orange-600 text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Daily Fresh</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Brown Eggs</h3>
                  <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-orange-400 font-black text-2xl">$4.50 <span className="text-xs text-white/50 font-medium">/ Dozen</span></p>
                    <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl hover:bg-orange-600 hover:text-white transition-all hover:scale-110 active:scale-95">
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Section Highlight */}
            <div className="quality-card lg:block hidden">
              <div className="aspect-[3/4] bg-emerald-950 rounded-[2.5rem] p-12 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-700/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" style={{ transform: 'translateZ(0)' }} />
                <div className="space-y-8 relative z-10">
                  <div
                    className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/10"
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <ShieldCheck className="w-10 h-10 text-orange-500" />
                  </div>
                  <h3 className="text-5xl font-black leading-[0.9] tracking-tighter">QUALITY <br /> GUARANTEED.</h3>
                </div>
                <div className="relative z-10 mt-auto">
                  <p className="text-emerald-100/60 mb-10 text-lg leading-relaxed italic">&quot;We ensure every product meets the highest standards before it leaves our farm in Tahanaout.&quot;</p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl border-2 border-orange-500 p-0.5 overflow-hidden relative shadow-lg">
                      <Image src="/manager.png" alt="Rachid lachgar" fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-white">Rachid lachgar</p>
                      <p className="text-sm text-emerald-500 font-bold uppercase tracking-widest">Farm Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuredRef} className="py-40 bg-white relative overflow-hidden px-6 md:px-12 lg:px-16 reveal-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="absolute -left-20 -top-20 w-96 h-96 bg-orange-100/40 rounded-full blur-[80px] -z-10" style={{ transform: 'translateZ(0)' }} />
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-4xl border-[16px] border-slate-50">
                <Image
                  src="/hero.png"
                  alt="Farm detail"
                  fill
                  className="object-cover scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-16 -right-5 bg-white p-10 rounded-[3rem] shadow-4xl max-w-xs border border-slate-100 floating-card hidden md:block">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-5">
                    {['/p1.png', '/p2.png', '/p3.png'].map((src, i) => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-200 relative overflow-hidden shadow-lg">
                        <Image src={src} alt="Customer" fill className="object-cover" sizes="56px" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-950 leading-none">500+</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Happy Locals</p>
                  </div>
                </div>
                <p className="text-slate-600 font-bold leading-snug">The organic revolution has arrived in Tahanaout!</p>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.85] tracking-tighter uppercase pr-10">THE PURE <br /><span className="text-orange-600 italic leading-none">TRADITION</span></h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">Our farm is a commitment to our community and the environment. We believe in transparency and ethics at every single step.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {[
                  { icon: <Leaf />, color: 'bg-orange-50', text: 'text-orange-600', title: '100% Organic', desc: 'No antibiotics, no growth hormones. Just nature\'s best.' },
                  { icon: <Truck />, color: 'bg-emerald-50', text: 'text-emerald-600', title: 'Quick Delivery', desc: 'Harvested in the morning, on your doorstep by dinner.' },
                  { icon: <ShieldCheck />, color: 'bg-orange-50', text: 'text-orange-600', title: 'Safe & Clean', desc: 'Rigorous sanitation and handling standards at every stage.' },
                  { icon: <ShoppingCart />, color: 'bg-emerald-50', text: 'text-emerald-600', title: 'Fair Pricing', desc: 'Premium quality at prices that honor farmer and customer.' },
                ].map((item, i) => (
                  <div key={i} className="feature-item space-y-6 group">
                    <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center transition-all group-hover:scale-110`}>
                      <div className={item.text}>{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 font-medium mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="bg-slate-950 text-white py-40 relative overflow-hidden px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
          <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase whitespace-pre-wrap">Real food <br /><span className="text-orange-500 italic">Today.</span></h2>
          <p className="text-2xl text-slate-400 font-medium max-w-2xl mx-auto">Join our weekly delivery list and get the freshest poultry in Tahanaout delivered to your door every Friday.</p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 px-10 py-6 rounded-3xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-600 text-white text-lg transition-all"
            />
            <button className="btn-primary w-full sm:w-auto px-12 py-6 text-lg uppercase tracking-widest">Join now</button>
          </div>

          <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">T</span>
              </div>
              <span className="font-black tracking-tighter text-2xl uppercase">Tahanaout Poultry</span>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Wholesale</Link>
            </div>

            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Tahanaout Poultry.</p>
          </div>
        </div>

        {/* Improved Decorative elements that won't cause horizontal overflow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" style={{ transform: 'translateZ(0)' }} />
      </footer>
    </main>
  );
}