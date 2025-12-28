'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Boşanma davası ne kadar sürer?",
        answer: "Çekişmeli boşanma davaları delillerin toplanması, tanıkların dinlenmesi gibi süreçler nedeniyle ortalama 1.5 - 3 yıl sürebilirken, anlaşmalı boşanma davaları genellikle tek celsede, dosya durumuna göre 1-3 ay içinde sonuçlanabilmektedir."
    },
    {
        question: "Avukat tutmak zorunlu mudur?",
        answer: "Türk hukuk sisteminde (bazı zorunlu müdafilik halleri hariç) davalarda avukat ile temsil zorunluluğu yoktur. Ancak usul hukuku kuralları karmaşık olduğundan, hak kaybına uğramamak adına uzman bir avukattan hukuki yardım almanız önemle tavsiye edilir."
    },
    {
        question: "Hukuki danışmanlık ücreti ne kadardır?",
        answer: "Avukatlık Kanunu ve ilgili yönetmelikler gereği avukatların ücretsiz iş yapması yasaktır. Danışmanlık ücretleri, her yıl yayınlanan Avukatlık Asgari Ücret Tarifesi'nin altında olmamak kaydıyla, konunun niteliğine ve süresine göre belirlenir."
    },
    {
        question: "İcra takibi nasıl başlatılır?",
        answer: "İcra takibi, alacaklının talebi üzerine İcra Müdürlükleri nezdinde başlatılır. İlamlı (mahkeme kararına dayalı) ve ilamsız takip olarak ayrılır. Sürecin sağlıklı yürütülmesi için hukuki destek alınması önerilir."
    },
    {
        question: "Hangi şehirlere hizmet veriyorsunuz?",
        answer: "Merkez ofisimiz Uşak'ta olmakla birlikte, Türkiye'nin her yerindeki dava ve hukuki süreçlerin takibini yapmaktayız."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-background border-t border-white/5">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-sans font-bold text-white mb-4">Sıkça Sorulan <span className="text-primary">Sorular</span></h2>
                    <p className="text-gray-400">Hukuki süreçlerle ilgili merak ettiklerinizi cevaplıyoruz.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-[#111] transition-all hover:border-primary/50">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={`w-full flex items-center justify-between p-6 transition-colors text-left font-bold text-lg ${openIndex === index ? 'text-primary' : 'text-white hover:text-primary'}`}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? <Minus className="text-primary" /> : <Plus className="text-gray-500" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
