'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Scale } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-black relative">
            <div className="container-custom">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Texts */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-16 h-[2px] bg-primary"></span>
                            <span className="text-primary uppercase tracking-widest font-bold text-sm">Biz Kimiz</span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-sans font-bold text-white leading-tight mb-8">
                            Kendimizi <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Tanıtalım</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Av. Melih Can Yılmaz Hukuk Bürosu, klasik avukatlık anlayışının ötesinde, stratejik ve analitik bir yaklaşımla müvekkillerine hizmet vermektedir.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            Süreç yönetiminde şeffaf, duruşmada kararlı, masada uzlaşmacı. Hukukun her alanında en güncel içtihatları takip ederek, size özel çözümler üretiyoruz.
                        </p>

                        <div className="flex gap-6">
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors font-bold"
                            >
                                Daha Fazla Bilgi <ArrowUpRight className="text-primary" size={18} />
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:text-white transition-colors font-bold"
                            >
                                Bize Ulaşın <ArrowUpRight className="text-white" size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Cards / Visuals */}
                    <div className="relative">
                        {/* Card 1 - Main Lawyer */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#111] border border-white/10 rounded-3xl p-6 relative z-20 max-w-sm ml-auto shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border-2 border-primary">
                                    {/* Avatar Placeholder */}
                                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl">Melih Can Yılmaz</h3>
                                    <span className="text-primary text-sm font-medium">Ceza Avukatı</span>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 border-b border-white/5 pb-6">
                                "Adalet, sadece kanun maddelerinde değil, vicdanlarda tecelli ettiğinde anlam kazanır."
                            </p>

                            <div className="flex justify-between items-center">
                                <div className="text-white font-bold">309+ <span className="text-gray-500 font-normal text-xs ml-1">Dava</span></div>
                                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-primary transition-colors">
                                    Profili İncele
                                </button>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl z-10" />

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-8 left-0 z-30 bg-[#1a1a1a] p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-xl"
                        >
                            <div className="bg-primary text-white p-2 rounded-lg">
                                <Scale size={20} />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Yüksek Memnuniyet</div>
                                <div className="text-xs text-gray-500">Müvekkil Anketleri</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}
