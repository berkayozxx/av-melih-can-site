'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Ana Sayfa', href: '/' },
        { name: 'Uzmanlık Alanları', href: '/#services' },
        { name: 'Ekibimiz', href: '/#about' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container-custom flex justify-between items-center text-white">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform">
                        M
                    </div>
                    <span className="text-xl font-sans font-bold tracking-tight group-hover:text-primary transition-colors">
                        Av. Melih Can Yılmaz
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="hover:text-primary transition-colors hover:bg-white/5 px-4 py-2 rounded-full relative overflow-hidden group">
                            <span className="relative z-10">{link.name}</span>
                        </Link>
                    ))}
                    <Link href="/#contact" className="px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
                        Hemen Başlayın
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-primary transition-colors">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black fixed inset-0 z-40 flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center space-y-8 text-white font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="hover:text-primary transition-colors text-2xl"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                onClick={() => setIsOpen(false)}
                                className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all text-xl"
                            >
                                Hemen Başlayın
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
