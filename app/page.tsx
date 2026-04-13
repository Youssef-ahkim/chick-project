'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Leaf, ShieldCheck, Truck, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


export default function Home() {
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    // Hero Animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(".hero-image", {
        scale: 1.1,
        duration: 2,
        ease: "power2.out"
      });

      // Character/Floating animations
      gsap.to(".floating", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Product Cards animation on scroll
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.7)"
      });

      // Feature items animation
      gsap.from(".feature-item", {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 85%",
        },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    }, [heroRef]);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Organic Poultry Farm"
            fill
            className="object-cover hero-image brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">

          <div className="max-w-2xl hero-content space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-orange-200 text-sm font-semibold uppercase tracking-widest">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              Premium Farm-To-Table Quality
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
              Freshness You <br />
              <span className="text-orange-500">Can Trust.</span>
            </h1>
            <p className="text-xl text-orange-50/90 leading-relaxed max-w-lg">
              Experience the taste of Tahanaout&apos;s finest organic poultry and pasture-raised eggs. Delivered straight from our farm to your kitchen.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-primary flex items-center gap-2 group">
                Shop Our Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl transition-all border border-white/30">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section ref={productsRef} className="py-24 bg-orange-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Today&apos;s <span className="text-orange-600">Fresh Picks</span></h2>
              <p className="text-slate-600 max-w-md text-lg">Hand-selected, organic, and prepared specifically for your order today.</p>
            </div>
            <button className="text-orange-700 font-bold flex items-center gap-2 group border-b-2 border-orange-200 pb-1">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Product Card 1 */}
            <div className="product-card group relative">
              <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/chicken.png"
                  alt="Organic Whole Chicken"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter">Organic</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold text-white mb-2">Organic Whole Chicken</h3>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <p className="text-orange-400 font-black text-xl">$14.99 <span className="text-xs text-white/60 font-medium">/ 1.5kg avg</span></p>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-orange-500 hover:text-white transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="product-card group relative">
              <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src="/eggs.png"
                  alt="Pasture-Raised Brown Eggs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter">Fresh Daily</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold text-white mb-2">Pasture-Raised Brown Eggs</h3>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <p className="text-orange-400 font-black text-xl">$4.50 <span className="text-xs text-white/60 font-medium">/ Dozen</span></p>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-orange-500 hover:text-white transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Highlight Card */}
            <div className="product-card lg:block hidden">
              <div className="aspect-[4/5] bg-emerald-900 rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-1000" />
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-4xl font-black leading-tight">Tested for Quality, <br /> Loved for Taste.</h3>
                </div>
                <div className="relative z-10 mt-auto">
                  <p className="text-emerald-100/70 mb-8 italic">&quot;We ensure every single product meets the highest standards of safety and freshness before it leaves our farm in Tahanaout.&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-orange-500 p-0.5 overflow-hidden relative">
                      <Image src="/manager.png" alt="Rachid lachgar" fill className="object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Rachid lachgar</p>
                      <p className="text-xs text-emerald-400">Farm Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuredRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl" />
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl floating">
                <Image
                  src="/hero.png"
                  alt="Farm detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs border border-orange-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-4">
                    {['/p1.png', '/p2.png', '/p3.png'].map((src, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 relative overflow-hidden">
                        <Image src={src} alt={`Happy Customer ${i+1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-800">500+ Happy Locals</p>
                </div>
                <p className="text-sm text-slate-600 font-medium underline decoration-orange-400 underline-offset-4 decoration-2">Joining the organic revolution in Tahanaout!</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">The <span className="text-orange-600">Pure Tradition</span> of Tahanaout</h2>
                <p className="text-lg text-slate-600">Our farm is more than just a business; it&apos;s a commitment to our community and the environment. We believe in transparency and ethics at every step.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="feature-item space-y-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold">100% Organic</h4>
                  <p className="text-slate-500">No antibiotics, no growth hormones. Just nature&apos;s best for your family.</p>
                </div>

                <div className="feature-item space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold">Same-Day Delivery</h4>
                  <p className="text-slate-500">Harvested in the morning, on your doorstep in time for dinner.</p>
                </div>

                <div className="feature-item space-y-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-bold">Safe & Clean</h4>
                  <p className="text-slate-500">Rigorous sanitation and handling standards at every stage.</p>
                </div>

                <div className="feature-item space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <ShoppingCart className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold">Fair Pricing</h4>
                  <p className="text-slate-500">Premium quality at prices that honor both the farmer and the customer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-black">Ready for <span className="text-orange-500">Real Food?</span></h2>
            <p className="text-xl text-slate-400">Join our weekly delivery list and get the freshest poultry in Tahanaout delivered to your door every Friday.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-80 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              />
              <button className="w-full sm:w-auto btn-primary">Join the Farm List</button>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <span className="font-bold tracking-tight">Tahanaout Poultry</span>
            </div>

            <div className="flex gap-8 text-slate-400 text-sm">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Wholesale</Link>
            </div>

            <p className="text-slate-500 text-sm">© 2024 Tahanaout Poultry. All rights Reserved.</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />
      </footer>
    </main>
  );
}