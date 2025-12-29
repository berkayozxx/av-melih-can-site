import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const posts = [
    { id: "1", title: "Anlaşmalı Boşanma Davası Nasıl Açılır?", slug: "anlasmali-bosanma-davasi-nasil-acilir", excerpt: "Anlaşmalı boşanma davası şartları, süreci ve protokol hazırlama detayları hakkında kapsamlı rehber.", category: "Aile Hukuku", date: "2024-03-20", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Anlaşmalı Boşanma Nedir?</h2><p>Anlaşmalı boşanma, evlilik birliğinin en az bir yıl sürmüş olması şartıyla, eşlerin boşanmanın hukuki ve mali tüm sonuçları üzerinde uzlaşarak mahkemeye başvurmaları ile gerçekleşen boşanma türüdür.</p><h3>Şartları</h3><ul><li>Evlilik en az 1 yıl sürmüş olmalı</li><li>Eşler birlikte başvurmalı</li><li>Hakim huzurunda irade beyanı</li></ul>" },
    { id: "2", title: "İşten Çıkarılan İşçinin Hakları Nelerdir?", slug: "isten-cikarilan-iscinin-haklari-nelerdir", excerpt: "Kıdem tazminatı, ihbar tazminatı ve işe iade davası süreçleri hakkında bilinmesi gerekenler.", category: "İş Hukuku", date: "2024-03-18", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>İş Akdi Feshinde İşçi Alacakları</h2><p>İş sözleşmesi işveren tarafından sona erdirilen işçinin birçok hakkı bulunmaktadır.</p><h3>Kıdem Tazminatı</h3><p>En az 1 yıl çalışmış olması şartıyla her yıl için 30 günlük brüt ücret ödenir.</p>" },
    { id: "3", title: "Kiracı Tahliye Davası ve Süreci", slug: "kiraci-tahliye-davasi-ve-sureci", excerpt: "Kiracı hangi durumlarda evden çıkarılabilir? Tahliye davası ne kadar sürer?", category: "Gayrimenkul Hukuku", date: "2024-03-15", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Tahliye Nedenleri</h2><p>Türk Borçlar Kanunu kiracıyı korur ancak belirli koşullarda tahliye istenebilir.</p><ul><li>İhtiyaç nedeniyle tahliye</li><li>Kira bedelinin ödenmemesi</li><li>10 yıllık sürenin dolması</li></ul>" },
    { id: "4", title: "Bilişim Suçları ve Cezaları", slug: "bilisim-suclari-ve-cezalari", excerpt: "Siber suçlar, sosyal medya hakaretleri ve dolandırıcılık suçlarının hukuki boyutu.", category: "Ceza Hukuku", date: "2024-03-12", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Teknoloji Çağında Siber Suçlar</h2><p>Bilişim suçları TCK'da özel olarak düzenlenmiştir.</p><ul><li>Bilişim sistemine girme: 1 yıla kadar hapis</li><li>Banka kartı kötüye kullanımı: 3-6 yıl hapis</li></ul>" },
    { id: "5", title: "Miras Hukukunda Saklı Pay Nedir?", slug: "miras-hukukunda-sakli-pay-nedir", excerpt: "Vasiyetname ile mirasçılık hakları engellenebilir mi? Saklı pay oranları ve tenkis davası.", category: "Miras Hukuku", date: "2024-03-10", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Miras Paylaşımı</h2><p>Saklı pay, yakın aile bireylerinin miras hakkını korumak amacıyla düzenlenmiştir.</p><ul><li>Çocuklar: Yasal payın 1/2'si</li><li>Anne-Baba: Yasal payın 1/4'ü</li></ul>" },
    { id: "6", title: "Trafik Kazası Tazminat Davaları", slug: "trafik-kazasi-tazminat-davalari", excerpt: "Kaza sonrası sigortadan para alma süreci ve maddi-manevi tazminat hesaplama.", category: "Tazminat Hukuku", date: "2024-03-08", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1599363032768-4e8d356614a5?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Trafik Kazalarında Tazminat</h2><p>Kazada kusursuz taraf maddi ve manevi tazminat talep edebilir.</p>" },
    { id: "7", title: "Velayet Davalarında Çocuğun Üstün Yararı", slug: "velayet-davalarinda-cocugun-ustun-yarari", excerpt: "Boşanmada çocuk kimde kalır? Velayet değiştirme davası şartları.", category: "Aile Hukuku", date: "2024-03-05", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Velayet Kime Verilir?</h2><p>Velayet kararlarında tek kriter çocuğun üstün yararıdır.</p>" },
    { id: "8", title: "Marka Patent ve Fikri Sınai Haklar", slug: "marka-patent-ve-fikri-sinai-haklar", excerpt: "Marka tescili nasıl yapılır? Patent haklarının korunması.", category: "Ticaret Hukuku", date: "2024-03-03", author: "Av. Melih Can Yılmaz", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80", font: "font-sans", content: "<h2>Marka Tescili</h2><p>Marka tescili işletmenizi korur ve tekel hakkı sağlar.</p>" },
];

export async function GET() {
    try {
        let count = 0;

        for (const post of posts) {
            const postRef = doc(db, "posts", post.id);
            await setDoc(postRef, {
                ...post,
                createdAt: new Date().toISOString()
            });
            count++;
        }

        return NextResponse.json({
            success: true,
            message: `${count} blog yazısı Firebase'e eklendi.`
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({
            error: 'Seed başarısız',
            details: String(error)
        }, { status: 500 });
    }
}
