'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Search, Filter, ArrowRight, Star, Heart } from 'lucide-react';
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
    tagColor: 'bg-orange-600'
  },
  {
    id: 2,
    name: 'Pasture-Raised Brown Eggs',
    category: 'Eggs',
    price: 4.50,
    unit: 'Dozen',
    image: '/eggs.png',
    tag: 'Daily Fresh',
    tagColor: 'bg-emerald-600'
  },
  {
    id: 3,
    name: 'Organic Chicken Breast',
    category: 'Cuts',
    price: 9.99,
    unit: '500g',
    image: '/products/chicken-breast.png',
    tag: 'Lean Protein',
    tagColor: 'bg-blue-600'
  },
  {
    id: 4,
    name: 'Chicken Drumsticks',
    category: 'Cuts',
    price: 6.99,
    unit: '1kg',
    image: '/products/drumsticks.png',
    tag: 'Farm Favorite',
    tagColor: 'bg-slate-900'
  },
  {
    id: 5,
    name: 'Organic Quail Eggs',
    category: 'Eggs',
    price: 5.25,
    unit: '12 pcs',
    image: '/products/quail-eggs.png',
    tag: 'Premium',
    tagColor: 'bg-purple-600'
  },
  {
    id: 6,
    name: 'Clean Chicken Wings',
    category: 'Cuts',
    price: 7.50,
    unit: '1kg',
    image: '/products/wings.png',
    tag: 'Perfect for Grill',
    tagColor: 'bg-orange-500'
  }
];

const categories = ['All', 'Whole Poultry', 'Cuts', 'Eggs'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Hero Animation - Simpler and faster
      gsap.from(".hero-text > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Parallax for hero background - Keep it light
      gsap.to(".bg-image-hero", {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: "section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Cards Entrance - Simple fade and lift
      gsap.from(".product-card-view", {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main ref={containerRef} className="bg-slate-50 min-h-screen pb-40 overflow-hidden relative selection:bg-orange-500 selection:text-white">
      {/* Texture Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />

      {/* Hero Header with Background Image */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-center overflow-hidden bg-slate-900 mb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/products/header-bg.png"
            alt="Farm Background"
            fill
            className="object-cover opacity-60 scale-105 bg-image-hero"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 pt-40 md:pt-48">
            <div className="hero-text">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-orange-200 text-xs font-black uppercase tracking-[0.2em] border border-white/20 mb-6">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    Premium Organic Selection
                </div>
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-6">
                    OUR <br />
                    <span className="text-orange-500 italic">Catalog.</span>
                </h1>
                <p className="text-orange-50/80 text-xl font-medium max-w-xl">
                    Straight from the golden valleys of Tahanaout to your doorstep.
                </p>
            </div>
        </div>
      </section>

      {/* Dynamic Background Elements */}
      <div className="absolute top-[60vh] right-0 w-[60vw] h-[60vw] bg-orange-200/30 rounded-full blur-[120px] -mr-[20vw] bg-shape" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-emerald-100/40 rounded-full blur-[120px] -ml-[20vw] bg-shape" />
      <div className="absolute top-[120vh] left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] bg-blue-100/20 rounded-full blur-[120px] bg-shape" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Filters & Search - Adjusted margin since we have a hero now */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all border-2 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                    : 'bg-white text-slate-500 border-white hover:border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-96 group">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-white rounded-2xl focus:outline-none focus:border-orange-500 transition-all shadow-sm group-hover:shadow-md font-medium"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card-view group"
            >
              <div className="bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 relative border border-slate-100 h-full flex flex-col">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-8">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className={`${product.tagColor} text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                      {product.tag}
                    </span>
                  </div>
                  <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-red-500 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-4 pb-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-orange-600 font-bold text-xs uppercase tracking-widest">{product.category}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                      <span className="text-xs font-bold text-slate-400">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price</p>
                      <p className="text-2xl font-black text-slate-950">${product.price.toFixed(2)} <span className="text-xs text-slate-400 font-medium">/ {product.unit}</span></p>
                    </div>
                    <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-110 active:scale-95 shadow-xl">
                      <ShoppingCart className="w-6 h-6" />
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
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No products found</h3>
            <p className="text-slate-500 font-medium">Try selecting a different category or refining your search.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-40 bg-orange-600 rounded-[4rem] p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-6">
                Bulk Order <br />For Events?
              </h2>
              <p className="text-orange-100 text-lg font-medium max-w-md">
                We supply restaurants and special occasions with the same high-quality organic poultry.
              </p>
            </div>
            <button className="px-12 py-6 bg-white text-orange-600 font-black rounded-3xl transition-all shadow-2xl hover:-translate-y-2 active:scale-95 text-lg uppercase tracking-widest flex items-center gap-3">
              Contact Sales
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
