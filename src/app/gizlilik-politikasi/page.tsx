import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] font-sans text-gray-300">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-6">
                        Gizlilik Politikası ve KVKK Aydınlatma Metni
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-gray-400 mb-8">
                            Av. Melih Can Yılmaz Hukuk Bürosu olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, web sitemizi ziyaret eden ve hizmetlerimizden faydalanan şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVK Kanunu”)’na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
                        </p>

                        <h2 className="text-white mt-8 mb-4">1. Kişisel Verilerin Toplanması ve İşlenmesi</h2>
                        <p>
                            Kişisel verileriniz, ofisimiz tarafından verilen hukuksal hizmetlerin değişkenliğine ve niteliğine bağlı olarak; sözlü, yazılı ya da elektronik ortamda toplanabilecektir. Web sitemizin iletişim formunu kullanmanız, e-bültenimize abone olmanız veya ofisimizle iletişime geçmeniz halinde; adınız, soyadınız, e-posta adresiniz, telefon numaranız ve mesaj içeriğindeki verileriniz işlenebilir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">2. İşleme Amaçları</h2>
                        <p>
                            Toplanan kişisel verileriniz; hukuki danışmanlık hizmetlerinin sunulabilmesi, iletişim faaliyetlerinin yürütülmesi, randevu taleplerinin oluşturulması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
                        <p>
                            Toplanan kişisel verileriniz; yasal olarak aktarılması gereken idari ve resmi makamlara, hukuki uyuşmazlıkların giderilmesi amacıyla yargı mercilerine ve mevzuatın gerektirdiği hallerde ilgili kurumlara KVK Kanunu’nun 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde aktarılabilecektir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">4. Kişisel Veri Sahibinin Hakları</h2>
                        <p>
                            KVK Kanunu’nun 11. maddesi uyarınca veri sahipleri;
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme haklarına sahiptir.</li>
                        </ul>

                        <h2 className="text-white mt-8 mb-4">5. Çerez Politikası</h2>
                        <p>
                            Web sitemizde, kullanıcı deneyimini iyileştirmek amacıyla çerezler (cookies) kullanılmaktadır. Çerezler, ziyaret ettiğiniz web siteleri tarafından bilgisayarınıza kaydedilen küçük metin dosyalarıdır. Tarayıcı ayarlarınızı değiştirerek çerez kullanımını engelleyebilirsiniz, ancak bu durumda sitenin bazı fonksiyonları çalışmayabilir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">6. İletişim</h2>
                        <p>
                            KVK Kanunu kapsamındaki haklarınızı kullanmak ve taleplerinizi iletmek için <strong>av.melihcanyilmaz@gmail.com</strong> adresine e-posta gönderebilirsiniz.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
