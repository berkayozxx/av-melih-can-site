'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Award, Briefcase, Users, Scale, AlertCircle } from 'lucide-react';

const achievements = [
    {
        icon: Briefcase,
        title: "1607+",
        subtitle: "Deneyimli Avukatlar",
        desc: "Alanında uzman kadromuzla hizmetinizdeyiz."
    },
    {
        icon: Users,
        title: "1070+",
        subtitle: "Mutlu Müvekkil",
        desc: "Güven ve sonuç odaklı çalışma prensibi."
    },
    {
        icon: Award,
        title: "98%",
        subtitle: "Başarı Oranı",
        desc: "Kazanılan davalar ve memnuniyet."
    },
    {
        icon: Scale,
        title: "15+",
        subtitle: "Yıllık Tecrübe",
        desc: "Hukuk sisteminde köklü geçmiş."
    }
];

export default function AchievementsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
            <div className="container-custom relative z-10">

                <div className="text-center mb-24">
                    <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white mb-4">
                        Başarılarımız & <span className="text-primary">İstatistikler</span>
                        <div className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full" />
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Rakamlarla başarımızı ve güvenilirliğimizi kanıtlıyoruz.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Connecting Line - Snake Shape */}
                    <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 hidden lg:block -z-10 opacity-30 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
                            <motion.path
                                d="M0 50 C 150 50, 150 90, 300 90 C 450 90, 450 10, 600 10 C 750 10, 750 90, 900 90 C 1050 90, 1050 50, 1200 50"
                                stroke="#3B82F6"
                                strokeWidth="4"
                                fill="none"
                                style={{ pathLength: scrollYProgress }}
                            />
                        </svg>
                    </div>

                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className={`
                        relative bg-[#111] p-8 rounded-2xl border border-white/5 
                        hover:border-primary/50 transition-all duration-500 overflow-hidden
                        ${index % 2 === 0 ? 'lg:translate-y-0' : 'lg:translate-y-16'}
                    `}>
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-lg border border-white/5">
                                        <item.icon size={32} />
                                    </div>

                                    <h3 className="text-4xl font-bold text-white mb-2">{item.title}</h3>
                                    <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">{item.subtitle}</h4>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            </div>

                            {/* Dot on line */}
                            <div className={`hidden lg:block w-4 h-4 bg-primary rounded-full border-4 border-black absolute left-1/2 -translate-x-1/2 z-0
                        ${index % 2 === 0
                                    ? 'top-[calc(100%+2rem)]' // Approx pos for upper cards
                                    : '-top-12' // Approx pos for lower cards
                                }
                    `} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
