'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, ArrowRight, Filter, Search, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    id: 1,
    name: "Original Whole Chicken",
    category: "poultry",
    price: 14.99,
    unit: "1.5kg",
    image: "/products/whole-chicken.png",
    tag: "Organic",
    rating: 4.9,
    reviews: 124
  },
  {
    id: 2,
    name: "Pasture-Raised Brown Eggs",
    category: "eggs",
    price: 4.50,
    unit: "Dozen",
    image: "/products/eggs.png",
    tag: "Daily Fresh",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    name: "Chicken Breast Fillets",
    category: "poultry",
    price: 9.99,
    unit: "500g",
    image: "/chicken.png",
    tag: "Best Seller",
    rating: 5.0,
    reviews: 215
  },
  {
    id: 4,
    name: "Farm-Style Drumsticks",
    category: "poultry",
    price: 7.50,
    unit: "1kg",
    image: "/hero.png",
    tag: "Value Pack",
    rating: 4.7,
    reviews: 56
  },
  {
    id: 5,
    name: "Duck Eggs (Free Range)",
    category: "eggs",
    price: 6.99,
    unit: "6 Pack",
    image: "/eggs.png",
    tag: "Premium",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 6,
    name: "Organic Chicken Wings",
    category: "poultry",
    price: 8.99,
    unit: "750g",
    image: "/chicken.png",
    tag: "Popular",
    rating: 4.6,
    reviews: 167
  }
];

const CATEGORIES = ["all", "poultry", "eggs", "deals"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const productsGridRef = useRef(null);

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
      // Hero Animation
      gsap.from(".products-hero-text > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      });

      // Filters Animation
      gsap.from(".filter-btn", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Animation for re-filtering products
  useEffect(() => {
    gsap.fromTo(".product-card-anim", 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" }
    );
  }, [activeCategory, searchQuery]);

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === "all" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main ref={containerRef} className="bg-slate-50 min-h-screen relative overflow-x-hidden pt-32 pb-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="products-hero-text mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
            Direct from Tahanaout Farm
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9]">
            OUR <br />
            <span className="text-orange-600 italic">Freshness.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
            From pasture-raised eggs to hormone-free organic chicken, explore our premium collection of farm-to-table products.
          </p>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 sticky top-28 z-40 py-4 bg-slate-50/80 backdrop-blur-md rounded-3xl px-2">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn px-8 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-slate-950 text-white shadow-xl shadow-slate-200" 
                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all text-slate-900 font-medium"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div ref={productsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-anim group">
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100">
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                  <button className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <button className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-3 hover:bg-orange-600 hover:text-white">
                        <ShoppingCart className="w-5 h-5" />
                        Quick Add
                     </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-none mb-2">{product.name}</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{product.unit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-orange-500 fill-orange-500" : "text-slate-200"}`} />
                    ))}
                    <span className="text-[10px] font-bold text-slate-400 ml-2">({product.reviews} REVIEWS)</span>
                  </div>

                  <div className="pt-4 flex justify-between items-center border-t border-slate-50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950">${product.price}</span>
                      <span className="text-xs text-slate-400 font-bold uppercase">USD</span>
                    </div>
                    <Link href={`/products/${product.id}`} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-600 hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 space-y-6">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto">
              <Filter className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black text-slate-950">No products found for this filter.</h3>
            <button 
              onClick={() => {setActiveCategory("all"); setSearchQuery("");}}
              className="text-orange-600 font-bold underline underline-offset-8"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-orange-100/30 rounded-full blur-[120px] -z-10 -mr-[25vw] -mt-[10vw]" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-emerald-100/20 rounded-full blur-[120px] -z-10 -ml-[20vw] -mb-[10vw]" />
    </main>
  );
}
