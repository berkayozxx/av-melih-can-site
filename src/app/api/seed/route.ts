import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Vercel Pro limit

// Simplified posts - shorter content to avoid timeout
const posts = [
    { id: "1", title: "Anlaşmalı Boşanma Davası", slug: "anlasmali-bosanma-davasi", excerpt: "Anlaşmalı boşanma davası şartları ve süreci.", category: "Aile Hukuku", date: "2024-03-20", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80", content: "<h2>Anlaşmalı Boşanma Nedir?</h2><p>Anlaşmalı boşanma, evlilik birliğinin en az bir yıl sürmüş olması şartıyla gerçekleşen boşanma türüdür.</p>" },
    { id: "2", title: "İşten Çıkarılan İşçinin Hakları", slug: "isten-cikarilan-iscinin-haklari", excerpt: "Kıdem ve ihbar tazminatı hakları.", category: "İş Hukuku", date: "2024-03-18", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80", content: "<h2>İş Akdi Feshi</h2><p>İşten çıkarılan işçinin kıdem ve ihbar tazminatı hakları bulunmaktadır.</p>" },
    { id: "3", title: "Kiracı Tahliye Davası", slug: "kiraci-tahliye-davasi", excerpt: "Tahliye davası süreci ve şartları.", category: "Gayrimenkul Hukuku", date: "2024-03-15", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80", content: "<h2>Tahliye Nedenleri</h2><p>Kiracı tahliye davası belirli koşullarda açılabilir.</p>" },
    { id: "4", title: "Bilişim Suçları ve Cezaları", slug: "bilisim-suclari", excerpt: "Siber suçların hukuki boyutu.", category: "Ceza Hukuku", date: "2024-03-12", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", content: "<h2>Bilişim Suçları</h2><p>Bilişim suçları TCK'da özel olarak düzenlenmiştir.</p>" },
    { id: "5", title: "Miras Hukukunda Saklı Pay", slug: "miras-sakli-pay", excerpt: "Saklı pay oranları ve tenkis davası.", category: "Miras Hukuku", date: "2024-03-10", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80", content: "<h2>Saklı Pay</h2><p>Mirasçıların saklı pay hakları kanunla korunmaktadır.</p>" },
    { id: "6", title: "Trafik Kazası Tazminatı", slug: "trafik-kazasi-tazminati", excerpt: "Maddi ve manevi tazminat hakları.", category: "Tazminat Hukuku", date: "2024-03-08", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1599363032768-4e8d356614a5?auto=format&fit=crop&q=80", content: "<h2>Trafik Kazası</h2><p>Kazada kusursuz taraf tazminat talep edebilir.</p>" },
    { id: "7", title: "Velayet Davalarında Çocuğun Yararı", slug: "velayet-davalari", excerpt: "Velayet kararlarında çocuğun üstün yararı.", category: "Aile Hukuku", date: "2024-03-05", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80", content: "<h2>Velayet</h2><p>Velayet kararlarında çocuğun üstün yararı gözetilir.</p>" },
    { id: "8", title: "Marka ve Patent Hakları", slug: "marka-patent", excerpt: "Marka tescili ve koruma.", category: "Ticaret Hukuku", date: "2024-03-03", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80", content: "<h2>Marka Tescili</h2><p>Marka tescili işletmenizi korur.</p>" },
];

export async function GET() {
    try {
        let count = 0;

        // Write posts one by one to avoid batch timeout
        for (const post of posts) {
            const postRef = doc(db, "posts", post.id);
            await setDoc(postRef, {
                ...post,
                font: "font-sans",
                createdAt: new Date().toISOString()
            });
            count++;
        }

        return NextResponse.json({
            success: true,
            message: `Seed tamamlandı. ${count} yazı eklendi.`
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({
            error: 'Seeding failed',
            details: String(error)
        }, { status: 500 });
    }
}
