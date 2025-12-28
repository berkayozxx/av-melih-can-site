'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success(data.message, { position: "bottom-right", theme: "dark" });
                setEmail('');
            } else if (data.message) {
                toast.info(data.message, { position: "bottom-right", theme: "dark" });
            } else {
                toast.error(data.error || 'Bir hata oluştu.', { position: "bottom-right", theme: "dark" });
            }
        } catch (error) {
            toast.error('Bağlantı hatası.', { position: "bottom-right", theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-black text-white pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
            <ToastContainer />
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-custom relative z-10 grid gap-16 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">M</div>
                        <span className="text-xl font-sans font-bold">Av. Melih Can Yılmaz</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Hukuki süreçlerinizde güven, şeffaflık ve profesyonellik ilkeleriyle yanınızdayız. Modern hukuk anlayışı ile çözüm ortağınız.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders */}
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                            <span className="font-bold">Li</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                            <span className="font-bold">Ig</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                            <span className="font-bold">X</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white">Hızlı Erişim</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-primary" /> Ana Sayfa</Link></li>
                        <li><Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-primary" /> Hakkımızda</Link></li>
                        <li><Link href="/#services" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-primary" /> Hizmetlerimiz</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-primary" /> Blog</Link></li>
                        <li><Link href="/#contact" className="hover:text-primary transition-colors flex items-center gap-2"><ArrowRight size={14} className="text-primary" /> İletişim</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white">İletişim</h4>
                    <div className="space-y-4 text-sm text-gray-400">
                        <div className="flex items-start gap-4 group">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <MapPin size={16} />
                            </div>
                            <span className="mt-1">İslice, Fatih Cd. No:39 Kat:5 Daire:15, 64000 Merkez/Uşak</span>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Phone size={16} />
                            </div>
                            <a href="tel:+905315893737" className="hover:text-white transition-colors font-medium">+90 531 589 37 37</a>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Mail size={16} />
                            </div>
                            <a href="mailto:av.melihcanyilmaz@gmail.com" className="hover:text-white transition-colors">av.melihcanyilmaz@gmail.com</a>
                        </div>
                    </div>
                </div>

                {/* Newsletter (New) */}
                <div className="space-y-6">
                    <h4 className="text-lg font-bold text-white">Bülten</h4>
                    <p className="text-gray-400 text-sm">Hukuki gelişmelerden haberdar olmak için e-posta adresinizi bırakın.</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="E-posta adresi"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-12"
                        />
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="absolute right-2 top-2 p-1.5 bg-primary rounded text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <p>&copy; {new Date().getFullYear()} Av. Melih Can Yılmaz. Tüm hakları saklıdır.</p>
                <div className="flex gap-6">
                    <Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikası</Link>
                    <Link href="/kullanim-sartlari" className="hover:text-white">Kullanım Şartları</Link>
                </div>
            </div>
        </footer>
    );
}
