'use client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const responseData = await res.json();

            if (res.ok) {
                setFormStatus('success');
                (e.target as HTMLFormElement).reset();
                setTimeout(() => setFormStatus('idle'), 5000); // 5 seconds to read success message
            } else {
                console.error("Form submission failed:", responseData);
                setFormStatus('error');
            }
        } catch (error) {
            console.error("Network error:", error);
            setFormStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-black relative">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Form */}
                    <div>
                        <h2 className="text-4xl font-sans font-bold text-white mb-6">İletişime <span className="text-primary">Geçin</span></h2>
                        <p className="text-gray-400 mb-8">
                            Hukuki problemleriniz için aşağıdaki formu doldurarak randevu talep edebilir veya doğrudan ofisimizi arayabilirsiniz.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Adınız Soyadınız</label>
                                    <input required name="name" type="text" className="w-full px-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-black text-white placeholder-gray-600" placeholder="İsim Soyisim" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Telefon Numaranız</label>
                                    <input required name="phone" type="tel" className="w-full px-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-black text-white placeholder-gray-600" placeholder="05XX XXX XX XX" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">E-posta Adresiniz</label>
                                <input required name="email" type="email" className="w-full px-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-black text-white placeholder-gray-600" placeholder="ornek@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Konu</label>
                                <select name="subject" className="w-full px-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-black text-white">
                                    <option>Genel Danışmanlık</option>
                                    <option>Ceza Hukuku</option>
                                    <option>Aile Hukuku</option>
                                    <option>Ticaret Hukuku</option>
                                    <option>Gayrimenkul Hukuku</option>
                                    <option>İcra Hukuku</option>
                                    <option>Diğer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2">Mesajınız</label>
                                <textarea required name="message" rows={4} className="w-full px-4 py-3 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all bg-black text-white placeholder-gray-600" placeholder="Hukuki sorununuzu kısaca özetleyiniz..."></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'sending' || formStatus === 'success'}
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${formStatus === 'success' ? 'bg-green-600 text-white' : (formStatus === 'error' ? 'bg-red-600 text-white' : 'bg-primary text-white hover:bg-white hover:text-primary')}`}
                            >
                                {formStatus === 'sending' ? 'Gönderiliyor...' : formStatus === 'success' ? 'Mesajınız İletildi' : formStatus === 'error' ? 'Hata Oluştu (Tekrar Dene)' : (
                                    <>
                                        Gönder <Send size={18} />
                                    </>
                                )}
                            </button>
                            {formStatus === 'success' && <p className="text-green-500 text-sm text-center mt-2">Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.</p>}
                        </form>
                    </div>

                    {/* Info & Map */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-[#111] to-black p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <h3 className="text-2xl font-sans font-bold text-white mb-6">İletişim Bilgileri</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-primary w-6 h-6 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-primary">Adres</h4>
                                        <p className="text-gray-400">İslice, Fatih Cd. No:39 Kat:5 Daire:15, 64000 Merkez/Uşak</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="text-primary w-6 h-6" />
                                    <div>
                                        <h4 className="font-bold text-primary">Telefon</h4>
                                        <a href="tel:+905315893737" className="text-gray-400 hover:text-white transition-colors">+90 531 589 37 37</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="text-primary w-6 h-6" />
                                    <div>
                                        <h4 className="font-bold text-primary">E-posta</h4>
                                        <a href="mailto:av.melihcanyilmaz@gmail.com" className="text-gray-400 hover:text-white transition-colors">av.melihcanyilmaz@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Placeholder */}
                        <div className="w-full h-[400px] bg-gray-900 rounded-3xl shadow-lg overflow-hidden relative group border border-white/5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12484.72973715206!2d29.40058356977539!3d38.674229900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c87f870295166f%3A0x19a084666f286828!2zw5zFnGFrLCBVxZ9hayBNZXJrZXovVcWfYWs!5e0!3m2!1str!2str!4v1703649033377!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
