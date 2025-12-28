'use client';
import { motion } from 'framer-motion';
import { Gavel, HeartHandshake, Briefcase, Home, FileText, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: Gavel,
        title: 'Ceza Hukuku',
        desc: 'Soruşturma ve kovuşturma süreçlerinde titiz savunma.',
    },
    {
        icon: HeartHandshake,
        title: 'Aile Hukuku',
        desc: 'Boşanma, velayet ve nafaka davalarında hassas yaklaşım.',
    },
    {
        icon: Briefcase,
        title: 'Ticaret Hukuku',
        desc: 'Şirketler için kurumsal danışmanlık ve sözleşme süreçleri.',
    },
    {
        icon: Home,
        title: 'Gayrimenkul',
        desc: 'Tapu, kira ve kamulaştırma davalarında uzman destek.',
    },
    {
        icon: FileText,
        title: 'İcra Hukuku',
        desc: 'Alacak takibi ve iflas süreçlerinin yönetimi.',
    },
];

export default function ServicesSection() {
    const handleServiceClick = (serviceTitle: string) => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });

            const messageBox = document.querySelector('textarea') as HTMLTextAreaElement;
            const subjectSelect = document.querySelector('select') as HTMLSelectElement;

            if (messageBox) {
                if (serviceTitle !== 'Tüm Hizmetler') {
                    messageBox.value = `${serviceTitle} hakkında detaylı bilgi almak istiyorum.\n\n`;
                    if (subjectSelect) {
                        for (let i = 0; i < subjectSelect.options.length; i++) {
                            if (subjectSelect.options[i].text === serviceTitle) {
                                subjectSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                } else {
                    messageBox.value = "Tüm hizmetleriniz hakkında bilgi almak istiyorum.\n\n";
                }
                messageBox.focus();
            }
        }
    };

    return (
        <section id="services" className="py-24 bg-[#0a0a0a]">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Uzmanlık Alanları</span>
                        <h2 className="text-4xl lg:text-5xl font-sans font-bold text-white">
                            Hukuki <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Çözümlerimiz</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-md text-right md:text-left">
                        Geniş hizmet yelpazemizle, karmaşık hukuki süreçleri sizin için basitleştiriyor ve en iyi sonucu hedefliyoruz.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            onClick={() => handleServiceClick(service.title)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <service.icon size={24} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors">
                                    {service.desc}
                                </p>

                                <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Detaylı Bilgi <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Last Card - CTA */}
                    <motion.div
                        onClick={() => handleServiceClick('Tüm Hizmetler')}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-primary p-8 rounded-2xl flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Tüm Hizmetler</h3>
                            <p className="text-blue-100 text-sm mb-6">Detaylı bilgi için iletişime geçin.</p>
                            <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                                <ArrowRight size={24} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
