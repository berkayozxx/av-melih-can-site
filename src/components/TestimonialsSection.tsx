'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        text: "Melih Bey, boşanma sürecimde bana çok destek oldu. Hukuki bilgisinin yanı sıra insani yaklaşımıyla da süreç boyunca kendimi güvende hissettim. Profesyonelliği için teşekkür ederim.",
        author: "Ayşe Y.",
        role: "Müvekkil"
    },
    {
        text: "Şirketimizin ticari davalarında gösterdiği titiz çalışma ve stratejik yaklaşım sayesinde olumlu sonuçlar aldık. İşini ciddiyetle yapan bir hukukçu.",
        author: "Mehmet K.",
        role: "İş İnsanı"
    },
    {
        text: "Miraz davamızdaki karmaşık süreci sadeleştirerek bize anlattı ve haklarımızı sonuna kadar savundu. Uşak'ta güvenebileceğiniz deneyimli bir avukat.",
        author: "Ahmet T.",
        role: "Müvekkil"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white mb-4">Müvekkil <span className="text-primary italic">Yorumları</span></h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Güveniniz, en büyük referansımızdır.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 relative group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Quote size={80} className="text-white" />
                            </div>
                            <Quote className="text-primary w-8 h-8 mb-6" />
                            <p className="text-gray-300 italic mb-6 leading-relaxed relative z-10 font-light">"{t.text}"</p>
                            <div>
                                <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{t.author}</h4>
                                <span className="text-gray-500 text-sm">{t.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
