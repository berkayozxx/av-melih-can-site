'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
    const [query, setQuery] = useState('');

    const handleConsult = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Try to pre-fill the subject or message if possible (client-side only trick)
            const messageBox = document.querySelector('textarea') as HTMLTextAreaElement;
            if (messageBox && query) {
                messageBox.value = `Danışma Talebi: ${query}\n\n`;
                messageBox.focus();
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">

            {/* Background Gradients */}
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 pointer-events-none" />

            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                            <span className="text-xl">⚖️</span>
                        </div>
                        <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">Uşak Hukuk Bürosu</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-sans font-bold leading-tight mb-8">
                        Adaletin <br />
                        <span className="relative inline-block">
                            Güvencesi
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.00025 6.99997C66.5002 2.49997 121 2.99997 197.5 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>
                        <br />
                        <span className="text-white">Av. Melih Can Yılmaz</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                        Hukuki süreçlerinizde modern, şeffaf ve sonuç odaklı çözümler. Davalarınız emin ellerde.
                    </p>



                    {/* Email / Contact Input */}
                    <div className="bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 flex items-center max-w-md shadow-2xl relative z-30">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 shrink-0 ml-1">
                            <MessageSquare size={18} />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConsult()}
                            placeholder="Hukuki sorununuz nedir?"
                            className="bg-transparent border-none focus:outline-none text-white px-4 flex-grow placeholder:text-gray-600 font-medium"
                        />
                        <button
                            onClick={handleConsult}
                            className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-dark transition-all shrink-0"
                        >
                            Danışın
                        </button>
                    </div>
                </motion.div>

                {/* Right Content - Visuals */}
                <div className="relative h-[600px] hidden lg:block">
                    {/* Top Advocate Circle */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-10 left-10 z-20"
                    >
                        <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/10 w-48 shadow-2xl hover:scale-105 transition-transform duration-300 group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                    <img src="/melih-can-yilmaz-hero.png" alt="Melih Can Yılmaz" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Melih Can Yılmaz</div>
                                    <div className="text-primary text-xs">Kurucu Avukat</div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/4 group-hover:w-full transition-all duration-700" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Character / Abstract Shape */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-[500px] h-[500px] rounded-full border border-white/5 border-dashed"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[350px] h-[350px] rounded-full border border-primary/20"
                        />

                        {/* Center Image Placeholder */}
                        <div className="w-[300px] h-[400px] rounded-[100px] overflow-hidden border-4 border-white/5 relative z-10 bg-gradient-to-b from-gray-800 to-black">
                            <img
                                src="/melih-can-yilmaz-hero.png"
                                alt="Av. Melih Can Yılmaz"
                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-center z-20">
                                <button
                                    onClick={handleConsult}
                                    className="bg-primary hover:bg-white hover:text-primary text-white px-6 py-2 rounded-full font-bold transition-all text-sm z-30 relative"
                                >
                                    Randevu Al
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Floating Tag */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-10 -right-8 z-20"
                    >
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:-translate-y-2 transition-transform shadow-2xl">
                            <div className="text-white font-bold text-2xl">500+</div>
                            <div className="text-gray-400 text-xs leading-tight">
                                Başarılı <br /> Dava
                            </div>
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                <ArrowRight size={14} className="-rotate-45" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
