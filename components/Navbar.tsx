'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Farm Story', href: '/farm-story' },
        { name: 'Quality', href: '#' },
    ];

    return (
        <header className={`fixed top-0 z-[100] w-full transition-all duration-700 ease-in-out ${isScrolled ? 'py-4' : 'py-8'}`}>
            <nav className="w-full max-w-[1400px] mx-auto px-6 flex justify-center">
                <div className={`w-full transition-all duration-700 ease-in-out rounded-[2.5rem] flex items-center justify-between px-8 py-4 ${
                    isScrolled 
                    ? 'bg-background/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5' 
                    : (pathname === '/products' || pathname === '/' || pathname === '/farm-story' ? 'bg-black/10 backdrop-blur-xl border border-white/10' : 'bg-background/20 backdrop-blur-xl border border-black/5')
                }`} style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', willChange: 'backdrop-filter, padding, background-color' }}>
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:bg-orange-600 group-hover:rotate-[10deg]">
                            <span className="text-white font-black text-2xl">T</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-slate-950 leading-none">TAHANAOUT</span>
                            <span className="text-[10px] font-black tracking-[0.4em] text-orange-600 leading-none mt-1.5 opacity-80">POULTRY</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name}
                                href={link.href}
                                className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all relative group ${
                                    isScrolled 
                                    ? (pathname === link.href ? 'text-orange-600' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50')
                                    : (pathname === link.href ? 'text-orange-400' : 'text-white hover:text-white/80 hover:bg-white/10')
                                }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-600 rounded-full transition-all duration-500 ${
                                    pathname === link.href ? 'opacity-100' : 'opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-100'
                                }`} />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-100 transition-all text-slate-950 bg-white/40 border border-white/40 group">
                            <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 border-2 border-white rounded-full text-[9px] font-black text-white flex items-center justify-center shadow-lg">2</span>
                        </button>
                        
                        <button className="hidden sm:flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-200 active:scale-95 group">
                            Order Now
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-950 text-white hover:bg-orange-600 transition-all"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-xl lg:hidden transition-all duration-700 ${
                isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                <div className={`absolute top-32 left-6 right-6 bg-white rounded-[3rem] p-10 shadow-3xl transition-all duration-700 transform ${
                    isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-20 scale-90 opacity-0'
                }`}>
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-4xl font-black tracking-tighter flex items-center justify-between group uppercase ${
                                    pathname === link.href ? 'text-orange-600' : 'text-slate-950'
                                }`}
                            >
                                {link.name}
                                <ChevronRight className={`w-8 h-8 transition-transform ${pathname === link.href ? 'translate-x-0' : '-translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                            </Link>
                        ))}
                        <div className="h-[2px] bg-slate-50 my-4" />
                        <button className="w-full bg-slate-950 text-white py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-orange-600 transition-all">
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
