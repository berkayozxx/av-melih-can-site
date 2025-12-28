import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfUse() {
    return (
        <div className="flex flex-col min-h-screen bg-[#050505] font-sans text-gray-300">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-6">
                        Kullanım Şartları ve Yasal Uyarı
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-gray-400 mb-8">
                            Bu web sitesini ziyaret ederek ve kullanarak, aşağıda belirtilen kullanım şartlarını ve yasal uyarıları kabul etmiş sayılırsınız.
                        </p>

                        <h2 className="text-white mt-8 mb-4">1. Hukuki Niteliği</h2>
                        <p>
                            Bu web sitesinde yer alan her türlü bilgi, makale, blog yazısı ve görsel içerik yalnızca genel bilgilendirme amacı taşımaktadır. Sitedeki içerikler, Türkiye Barolar Birliği'nin reklam yasağı yönetmeliğine ve meslek kurallarına uygun olarak hazırlanmıştır. Bu sitedeki hiçbir bilgi, hukuki tavsiye veya mütalaa niteliğinde değildir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">2. Avukat-Müvekkil İlişkisi</h2>
                        <p>
                            Bu web sitesini ziyaret etmeniz, site üzerinden soru yöneltmeniz veya iletişim formunu doldurmanız, Av. Melih Can Yılmaz ile aranızda bir avukat-müvekkil ilişkisi kurmaz. Hukuki danışmanlık hizmeti, ancak karşılıklı anlaşma ve vekalet ilişkisinin kurulmasıyla başlar.
                        </p>

                        <h2 className="text-white mt-8 mb-4">3. İçerik ve Telif Hakkı</h2>
                        <p>
                            Sitede yer alan tüm makaleler, tasarım öğeleri ve logolar Av. Melih Can Yılmaz'a aittir veya lisanslı olarak kullanılmaktadır. 5846 sayılı Fikir ve Sanat Eserleri Kanunu uyarınca, sitedeki içeriklerin kaynak gösterilmeden veya izin alınmadan kopyalanması, çoğaltılması ve yayınlanması yasaktır.
                        </p>

                        <h2 className="text-white mt-8 mb-4">4. Sorumluluk Reddi</h2>
                        <p>
                            Web sitesindeki bilgilerin güncelliği ve doğruluğu konusunda azami özen gösterilmekle birlikte, mevzuat değişiklikleri nedeniyle bilgiler zamanla güncelliğini yitirebilir. Bu nedenle, sitedeki bilgilere dayanarak işlem yapmadan önce profesyonel hukuki destek almanız önerilir. Sitedeki olası yanlışlık veya eksikliklerden doğabilecek zararlardan hukuk büromuz sorumlu tutulamaz.
                        </p>

                        <h2 className="text-white mt-8 mb-4">5. Dış Bağlantılar</h2>
                        <p>
                            Bu site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantıların içeriğinden ve gizlilik politikalarından Av. Melih Can Yılmaz sorumlu değildir.
                        </p>

                        <h2 className="text-white mt-8 mb-4">6. Değişiklik Hakkı</h2>
                        <p>
                            Av. Melih Can Yılmaz, işbu kullanım şartlarını dilediği zaman önceden bildirmeksizin değiştirme hakkını saklı tutar.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
