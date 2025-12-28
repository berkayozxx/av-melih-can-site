'use client';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/905315893737"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="WhatsApp ile İletişime Geçin"
        >
            <MessageCircle size={32} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap group-hover:pl-2 font-bold">
                WhatsApp Destek
            </span>
        </a>
    );
}
