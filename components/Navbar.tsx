import React from 'react';

import Link from 'next/link';

function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full px-4 md:px-8 lg:px-12 py-4 flex justify-center pointer-events-none">
            <nav className="max-w-[1536px] w-full glass rounded-3xl pointer-events-auto" style={{ transform: 'translateZ(0)' }}>
                <div className="flex justify-between items-center px-4 md:px-8 py-3">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                            <span className="text-white font-black text-xl">T</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800">Tahanaout <span className="text-orange-600">Poultry</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="#" className="hover:text-orange-600 transition-colors">Products</Link>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Farm Story</Link>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Quality</Link>
                        <Link href="#" className="hover:text-orange-600 transition-colors">Contact</Link>
                    </div>

                    <button
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
                        aria-label="Order Now"
                    >
                        Order Now
                    </button>
                </div>
            </nav>
        </header>


    );
}

export default Navbar;
