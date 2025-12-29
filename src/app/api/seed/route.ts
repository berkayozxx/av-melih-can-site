import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const posts = [
    {
        id: "1",
        title: "Anlaşmalı Boşanma Davası: Şartları, Süreci ve Protokol Hazırlama",
        slug: "anlasmali-bosanma-davasi",
        excerpt: "Anlaşmalı boşanma davası hakkında bilmeniz gereken tüm detaylar. Evlilik birliğinin sona ermesinde en hızlı yol olan anlaşmalı boşanma süreci.",
        category: "Aile Hukuku",
        date: "2024-03-20",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Anlaşmalı Boşanma Nedir?</h2><p>Anlaşmalı boşanma, Türk Medeni Kanunu'nun 166/3. maddesi uyarınca, evlilik birliğinin en az bir yıl sürmüş olması şartıyla, eşlerin boşanmanın mali ve hukuki tüm sonuçları üzerinde anlaşarak mahkemeye başvurmaları ile gerçekleşen boşanma türüdür.</p><h3>Anlaşmalı Boşanma Şartları</h3><ul><li><strong>Evlilik Süresi:</strong> Evlilik en az 1 yıl sürmüş olmalıdır</li><li><strong>Birlikte Başvuru:</strong> Eşler birlikte başvurmalı veya biri diğerinin davasını kabul etmelidir</li><li><strong>Hakim Huzurunda Beyan:</strong> Her iki eş de hakim huzurunda iradelerini özgürce açıklamalıdır</li><li><strong>Protokol Onayı:</strong> Hakimin protokolü uygun bulması gerekir</li></ul><h3>Boşanma Protokolünde Neler Bulunmalı?</h3><p>Boşanma protokolü, tarafların boşanma sonrasındaki haklarını ve yükümlülüklerini düzenleyen önemli bir belgedir. Protokolde şunlar yer almalıdır:</p><ul><li>Mal paylaşımı ve edinilmiş mallara katılma düzenlemesi</li><li>Varsa çocukların velayeti ve kişisel ilişki düzenlemesi</li><li>Nafaka talepleri (iştirak ve yoksulluk nafakası)</li><li>Maddi ve manevi tazminat talepleri</li></ul><h3>Dava Süreci Ne Kadar Sürer?</h3><p>Anlaşmalı boşanma davaları genellikle tek celsede sonuçlanır. Mahkeme yoğunluğuna göre 1-3 ay içinde kesinleşme sağlanabilir. Bu süre, çekişmeli boşanma davalarına kıyasla oldukça kısadır.</p>`
    },
    {
        id: "2",
        title: "İşten Çıkarılan İşçinin Hakları ve Tazminat Hesaplama",
        slug: "isten-cikarilan-iscinin-haklari",
        excerpt: "İşten çıkarıldığınızda hangi haklarınız var? Kıdem tazminatı, ihbar tazminatı ve işe iade davası süreçleri hakkında kapsamlı rehber.",
        category: "İş Hukuku",
        date: "2024-03-18",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>İş Akdi Feshinde İşçi Hakları</h2><p>4857 sayılı İş Kanunu, işçilerin haklarını koruma altına almaktadır. İşveren tarafından iş sözleşmesi sona erdirilen işçinin birçok yasal hakkı bulunmaktadır.</p><h3>Kıdem Tazminatı</h3><p>En az 1 yıl çalışmış olan işçi, iş sözleşmesi belirli koşullarda sona erdiğinde kıdem tazminatına hak kazanır. Her tam yıl için 30 günlük brüt ücret tutarında tazminat ödenir.</p><h4>Kıdem Tazminatı Hesaplama</h4><ul><li>Çalışılan süre: Yıl ve ay olarak hesaplanır</li><li>Son brüt ücret üzerinden hesaplama yapılır</li><li>Giydirilmiş ücret (yemek, yol, ikramiye vb.) dahil edilir</li><li>2024 tavanı: 35.058,58 TL'dir</li></ul><h3>İhbar Tazminatı</h3><p>İş sözleşmesi bildirim sürelerine uyulmadan feshedildiğinde ihbar tazminatı ödenir:</p><ul><li>6 aydan az çalışma: 2 haftalık ücret</li><li>6 ay - 1,5 yıl: 4 haftalık ücret</li><li>1,5 - 3 yıl: 6 haftalık ücret</li><li>3 yıldan fazla: 8 haftalık ücret</li></ul><h3>İşe İade Davası</h3><p>30 veya daha fazla işçi çalıştıran işyerlerinde en az 6 ay kıdemi olan işçiler, geçerli neden olmaksızın işten çıkarılırlarsa işe iade davası açabilirler. Dava 1 ay içinde açılmalıdır.</p>`
    },
    {
        id: "3",
        title: "Kiracı Tahliye Davası: Şartları ve Süreç",
        slug: "kiraci-tahliye-davasi",
        excerpt: "Ev sahibi olarak kiracınızı hangi durumlarda tahliye edebilirsiniz? Tahliye davası süreci ve yasal haklarınız.",
        category: "Gayrimenkul Hukuku",
        date: "2024-03-15",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Kiracı Tahliye Sebepleri</h2><p>6098 sayılı Türk Borçlar Kanunu, kiracıyı koruyan düzenlemeler içerse de belirli koşullarda mülk sahibinin tahliye talep etme hakkı bulunmaktadır.</p><h3>Tahliye Nedenleri</h3><ul><li><strong>İhtiyaç Nedeniyle Tahliye:</strong> Kiraya verenin kendisi, eşi, altsoyu, üstsoyu veya bakmakla yükümlü olduğu kişilerin konut ihtiyacı</li><li><strong>Yeni Malik İhtiyacı:</strong> Taşınmazı satın alan yeni malik, edinme tarihinden itibaren 1 ay içinde ihtiyaç bildirimi yapabilir</li><li><strong>Tadilat ve İnşaat:</strong> Esaslı onarım, genişletme veya değiştirme gerektiren durumlar</li><li><strong>Tahliye Taahhüdü:</strong> Kiracının yazılı tahliye taahhüdü vermesi</li></ul><h3>Kira Bedelinin Ödenmemesi</h3><p>Kiracı, kira bedelini ödemezse kiraya veren yazılı ihtar çekerek 30 gün süre verir. Bu süre içinde ödeme yapılmazsa tahliye davası açılabilir.</p><h3>10 Yıllık Uzama Süresi</h3><p>Kira sözleşmesi 10 yılı aştığında, kiraya veren herhangi bir sebep göstermeksizin sözleşmeyi sona erdirebilir. Bu hakkın kullanımı için 3 ay önceden yazılı bildirim gerekir.</p>`
    },
    {
        id: "4",
        title: "Bilişim Suçları: Türleri, Cezaları ve Savunma",
        slug: "bilisim-suclari",
        excerpt: "Siber suçlar nelerdir? Sosyal medya suçları, internet dolandırıcılığı ve bilişim sistemlerine izinsiz giriş cezaları.",
        category: "Ceza Hukuku",
        date: "2024-03-12",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Bilişim Suçları Nelerdir?</h2><p>Türk Ceza Kanunu'nun 243-246. maddeleri arasında düzenlenen bilişim suçları, teknolojinin gelişmesiyle birlikte giderek artan önemli bir suç kategorisidir.</p><h3>Bilişim Sistemine Girme (TCK 243)</h3><p>Bir bilişim sistemine hukuka aykırı olarak giren veya orada kalmaya devam eden kişi hakkında 1 yıla kadar hapis cezası öngörülmektedir. Sistemdeki verilerin değiştirilmesi halinde ceza 2 yıla kadar çıkabilir.</p><h3>Sistemi Engelleme ve Bozma (TCK 244)</h3><ul><li>Sistemin işleyişini engelleme: 1-5 yıl hapis</li><li>Verileri bozma, yok etme: 6 ay - 3 yıl hapis</li><li>Banka sistemlerinde suç işleme: 3-6 yıl hapis</li></ul><h3>Sosyal Medya Suçları</h3><p>Sosyal medya üzerinden işlenen hakaret, tehdit, özel hayatın gizliliğini ihlal gibi suçlar da bilişim suçları kapsamında değerlendirilmektedir. Özellikle Instagram, Twitter ve Facebook üzerinden işlenen suçlarda IP adresi tespiti ile failin kimliği belirlenmektedir.</p><h3>Kripto Para Dolandırıcılığı</h3><p>Son yıllarda artan kripto para dolandırıcılığı, nitelikli dolandırıcılık suçu kapsamında değerlendirilmekte ve 3-10 yıl hapis cezası öngörülmektedir.</p>`
    },
    {
        id: "5",
        title: "Miras Hukukunda Saklı Pay ve Tenkis Davası",
        slug: "miras-hukukunda-sakli-pay",
        excerpt: "Mirasçıların saklı pay hakları nelerdir? Mirastan mal kaçırma ve tenkis davası süreci hakkında hukuki bilgiler.",
        category: "Miras Hukuku",
        date: "2024-03-10",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Saklı Pay Nedir?</h2><p>Saklı pay, miras bırakanın tasarruf özgürlüğünü sınırlayan ve belirli mirasçıların miras hakkını güvence altına alan bir müessesedir. Türk Medeni Kanunu'na göre saklı pay sahibi mirasçılar, miras bırakanın tasarruflarına rağmen belirli bir miras payını almaya hak kazanırlar.</p><h3>Saklı Pay Oranları</h3><ul><li><strong>Altsoy (çocuklar, torunlar):</strong> Yasal miras payının 1/2'si</li><li><strong>Anne ve Baba:</strong> Yasal miras payının 1/4'ü</li><li><strong>Sağ kalan eş:</strong> Altsoy veya anne-baba ile birlikte mirasçı olduğunda yasal payının tamamı, diğer hallerde 3/4'ü</li></ul><h3>Tenkis Davası</h3><p>Miras bırakanın ölüme bağlı veya sağlararası kazandırmaları saklı pay oranlarını ihlal ettiğinde, saklı pay sahibi mirasçılar tenkis davası açabilir. Dava, saklı payın ihlal edildiğinin öğrenilmesinden itibaren 1 yıl ve her halde vasiyetnamenin açılmasından itibaren 10 yıl içinde açılmalıdır.</p><h3>Mirastan Mal Kaçırma</h3><p>Murisin sağlığında muvazaalı işlemlerle mal kaçırması halinde, mirasçılar tapu iptali ve tescil davası açabilirler. Bu dava tenkis davasından farklıdır ve zamanaşımına tabi değildir.</p>`
    },
    {
        id: "6",
        title: "Trafik Kazası Tazminat Davası ve Sigortadan Para Alma",
        slug: "trafik-kazasi-tazminati",
        excerpt: "Trafik kazası sonrası haklarınız nelerdir? Sigorta şirketinden tazminat alma süreci ve maddi-manevi tazminat hesaplama.",
        category: "Tazminat Hukuku",
        date: "2024-03-08",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1599363032768-4e8d356614a5?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Trafik Kazası Tazminat Türleri</h2><p>Trafik kazası mağdurları, uğradıkları zararın tamamını kusurlu taraftan ve sigorta şirketinden talep edebilir. Tazminat türleri şunlardır:</p><h3>Maddi Tazminat</h3><ul><li><strong>Tedavi Giderleri:</strong> Hastane, ilaç, fizik tedavi masrafları</li><li><strong>Geçici İş Göremezlik:</strong> İyileşme süresince çalışamama nedeniyle gelir kaybı</li><li><strong>Sürekli İş Göremezlik:</strong> Kalıcı sakatlık halinde ömür boyu gelir kaybı</li><li><strong>Araç Hasarı:</strong> Tamir veya pert durumunda değer kaybı</li></ul><h3>Manevi Tazminat</h3><p>Kazanın yarattığı acı, elem ve üzüntü karşılığında talep edilir. Yaralanma derecesi, kusur oranı ve tarafların ekonomik durumu dikkate alınarak belirlenir.</p><h3>Destekten Yoksun Kalma Tazminatı</h3><p>Ölümlü trafik kazalarında, ölenin desteğinden yoksun kalan aile bireyleri bu tazminatı talep edebilir. Hesaplamada ölenin geliri, yaşı ve bakmakla yükümlü olduğu kişilerin durumu dikkate alınır.</p><h3>Sigorta Başvurusu</h3><p>Öncelikle karşı tarafın zorunlu trafik sigortasına başvurulur. 15 gün içinde sonuç alınamazsa dava yoluna gidilir.</p>`
    },
    {
        id: "7",
        title: "Velayet Davası: Çocuğun Üstün Yararı İlkesi",
        slug: "velayet-davasi",
        excerpt: "Boşanmada çocuk kimde kalır? Velayet hakkı, kişisel ilişki düzenlemesi ve velayet değişikliği davası.",
        category: "Aile Hukuku",
        date: "2024-03-05",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Velayet Hakkı Nedir?</h2><p>Velayet, çocuğun bakımı, eğitimi, korunması ve temsili konusunda anne-babaya tanınan hak ve yükümlülüklerdir. Boşanma durumunda velayet, çocuğun üstün yararı gözetilerek eşlerden birine verilir.</p><h3>Velayet Kararında Dikkate Alınan Kriterler</h3><ul><li><strong>Çocuğun Yaşı:</strong> Küçük çocuklarda genellikle anne tercih edilir</li><li><strong>Çocuğun Görüşü:</strong> İdrak çağındaki çocuğun görüşü alınır (8-9 yaş üzeri)</li><li><strong>Ebeveynlerin Durumu:</strong> Ekonomik durum, yaşam koşulları, sağlık durumu</li><li><strong>Kardeşlerin Ayrılmaması:</strong> Kardeşler mümkün olduğunca birlikte kalmalıdır</li><li><strong>Sosyal Çevre:</strong> Okul, arkadaşlar, aile çevresi</li></ul><h3>Kişisel İlişki Düzenlemesi</h3><p>Velayeti almayan ebeveyn ile çocuk arasında kişisel ilişki kurulur. Genellikle her iki haftada bir hafta sonu ve yaz tatilinin belirli bir bölümü şeklinde düzenlenir.</p><h3>Velayet Değişikliği Davası</h3><p>Koşulların değişmesi veya velayeti alan ebeveynin velayet görevini yerine getirememesi halinde velayet değişikliği davası açılabilir. Yine çocuğun üstün yararı esas alınır.</p>`
    },
    {
        id: "8",
        title: "Marka Tescili ve Patent Hakları",
        slug: "marka-patent-haklari",
        excerpt: "İşletmenizi korumak için marka tescili nasıl yapılır? Marka ihlali, patent hakları ve fikri mülkiyet hukuku.",
        category: "Ticaret Hukuku",
        date: "2024-03-03",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Marka Nedir ve Neden Önemlidir?</h2><p>Marka, bir işletmenin mal veya hizmetlerini diğer işletmelerden ayırt etmeye yarayan her türlü işarettir. Tescilli marka, sahibine Türkiye genelinde tekel hakkı verir.</p><h3>Marka Tescil Süreci</h3><ul><li><strong>Ön Araştırma:</strong> Benzer markaların varlığı kontrol edilir</li><li><strong>Başvuru:</strong> Türk Patent ve Marka Kurumu'na (TÜRKPATENT) başvuru</li><li><strong>İnceleme:</strong> Mutlak ve nispi ret nedenleri incelenir</li><li><strong>İlan:</strong> 2 ay süreyle Resmi Marka Bülteninde ilan</li><li><strong>Tescil:</strong> İtiraz olmazsa tescil belgesi verilir</li></ul><h3>Marka İhlali ve Hukuki Yollar</h3><p>Tescilli markanın izinsiz kullanımı marka ihlali oluşturur. Hak sahibi tecavüzün durdurulması, maddi-manevi tazminat ve cezai şikayet haklarına sahiptir.</p><h3>Patent Koruması</h3><p>Buluşlar için patent koruması alınabilir. Patent süresi başvuru tarihinden itibaren 20 yıldır. Faydalı model belgesi ise 10 yıl koruma sağlar. Patent, sahibine buluşu üretme, satma ve lisanslama tekel hakkı verir.</p>`
    },
    {
        id: "9",
        title: "Kamulaştırma ve Bedel Tespiti Davası",
        slug: "kamulastirma-davasi",
        excerpt: "Mülkünüz kamulaştırıldığında haklarınız nelerdir? Kamulaştırma bedeli nasıl belirlenir? İtiraz ve dava süreci.",
        category: "İdare Hukuku",
        date: "2024-03-01",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Kamulaştırma Nedir?</h2><p>Kamulaştırma, devletin veya kamu tüzel kişilerinin kamu yararı amacıyla özel mülkiyetteki taşınmazları bedelini ödeyerek elde etmesidir. Anayasa'nın 46. maddesi bu konuyu düzenlemektedir.</p><h3>Kamulaştırma Süreci</h3><ul><li><strong>Kamu Yararı Kararı:</strong> Yetkili idare tarafından alınır</li><li><strong>Satın Alma:</strong> Öncelikle uzlaşma yoluyla satın alma denenir</li><li><strong>Bedel Tespiti:</strong> Uzlaşma sağlanamazsa mahkemeden bedel tespiti istenir</li><li><strong>Tescil:</strong> Bedel ödendikten sonra taşınmaz idare adına tescil edilir</li></ul><h3>Bedel Tespiti Davası</h3><p>Taşınmaz sahibi belirlenen bedeli düşük bulursa itiraz edebilir. Mahkeme, bilirkişi aracılığıyla taşınmazın gerçek değerini tespit eder. Emsal satışlar, arsa nitelikleri ve varsa yapılar değerlemeye dahil edilir.</p><h3>Acele Kamulaştırma</h3><p>Olağanüstü durumlarda acele kamulaştırma yapılabilir. Bu durumda taşınmaza el konulur, bedel tespit davası sonradan görülür. Mülk sahiplerinin bedel haklarını korumaları önemlidir.</p>`
    },
    {
        id: "10",
        title: "İcra Takibi ve Haciz İşlemleri",
        slug: "icra-takibi-haciz",
        excerpt: "Alacaklarınızı tahsil etmek için icra takibi nasıl başlatılır? Haciz işlemleri, maaş haczi ve haczedilemeyecek mallar.",
        category: "İcra Hukuku",
        date: "2024-02-28",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>İcra Takibi Nedir?</h2><p>İcra takibi, alacaklının alacağını devlet gücü aracılığıyla tahsil etmek için başvurduğu hukuki yoldur. İlamlı ve ilamsız olmak üzere iki türü vardır.</p><h3>İlamsız İcra Takibi</h3><p>Mahkeme kararı olmaksızın başlatılır. Borçlu 7 gün içinde itiraz etmezse takip kesinleşir. İtiraz halinde alacaklının itirazın iptali davası açması gerekir.</p><h3>İlamlı İcra Takibi</h3><p>Mahkeme kararına dayanan takiptir. Borçlunun itiraz hakkı çok sınırlıdır, sadece borcun ödendiğini veya zamanaşımını ileri sürebilir.</p><h3>Haciz İşlemleri</h3><ul><li><strong>Maaş Haczi:</strong> Net maaşın 1/4'ünü aşamaz</li><li><strong>Banka Hesabı:</strong> Hesaplardaki para haczedilebilir</li><li><strong>Taşınır Mallar:</strong> Araç, ev eşyası vs.</li><li><strong>Taşınmazlar:</strong> Gayrimenkul haczi ve satışı</li></ul><h3>Haczedilemeyecek Mallar</h3><p>Zorunlu ev eşyaları, meslek için gerekli aletler, çiftçinin çift hayvanları ve tohumu gibi mallar haczedilemez. Ayrıca nafaka alacağı hariç emekli maaşı haczedilemez.</p>`
    },
    {
        id: "11",
        title: "Kat Mülkiyeti ve Site Yönetimi Uyuşmazlıkları",
        slug: "kat-mulkiyeti-site-yonetimi",
        excerpt: "Apartman ve site yönetimi ile ilgili sorunlar nasıl çözülür? Aidat borçları, ortak alan kullanımı ve genel kurul kararları.",
        category: "Gayrimenkul Hukuku",
        date: "2024-02-25",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Kat Mülkiyeti Kanunu</h2><p>634 sayılı Kat Mülkiyeti Kanunu, apartman ve sitelerdeki mülkiyet ilişkilerini düzenler. Her kat maliki bağımsız bölümü üzerinde mülkiyet hakkına, ortak yerlerde ise paydaşlık hakkına sahiptir.</p><h3>Aidat Borçları</h3><p>Aidatını ödemeyen kat malikine karşı yönetim icra takibi başlatabilir. Gecikme faizi aylık %5'i geçemez. Üst üste 3 aidatını ödemeyen malikin bağımsız bölümünün satışı istenebilir.</p><h3>Ortak Alan Kullanımı</h3><ul><li>Otopark paylaşımı ve park yeri uyuşmazlıkları</li><li>Balkon kapatma ve cephe değişiklikleri</li><li>Bahçe kullanımı ve çit yapımı</li><li>Gürültü ve komşuluk hukuku</li></ul><h3>Genel Kurul Kararları</h3><p>Genel kurul kararlarına itiraz 1 ay içinde Sulh Hukuk Mahkemesi'ne yapılır. Toplantı ve karar yeter sayıları önemli olup, usulsüz kararlar iptal edilebilir.</p><h3>Yönetici Sorumluluğu</h3><p>Yönetici, kat maliklerinin vekili konumundadır. Hesap verme yükümlülüğü bulunur ve görevini gereği gibi yerine getirmezse azledilebilir ve tazminat sorumluluğu doğabilir.</p>`
    },
    {
        id: "12",
        title: "İş Kazası Tazminatı ve İşveren Sorumluluğu",
        slug: "is-kazasi-tazminati",
        excerpt: "İş kazası geçirdiniz mi? SGK hakları, işveren sorumluluğu ve tazminat davası süreci hakkında bilmeniz gerekenler.",
        category: "İş Hukuku",
        date: "2024-02-22",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>İş Kazası Nedir?</h2><p>5510 sayılı Kanun'a göre iş kazası, sigortalının işyerinde, işverenin yürüttüğü iş nedeniyle veya işveren tarafından görevlendirme ile başka bir yere gönderilirken meydana gelen ve sigortalıyı hemen veya sonradan bedence ya da ruhen engeli bırakan olaydır.</p><h3>İş Kazası Bildirimi</h3><p>İşveren, iş kazasını kazadan sonra 3 iş günü içinde SGK'ya bildirmek zorundadır. Bildirim yapılmazsa işverene idari para cezası uygulanır.</p><h3>SGK Hakları</h3><ul><li><strong>Geçici İş Göremezlik Ödeneği:</strong> İyileşme süresince günlük kazancın 2/3'ü</li><li><strong>Sürekli İş Göremezlik Geliri:</strong> %10 ve üzeri maluliyet halinde aylık bağlanır</li><li><strong>Cenaze ve Ölüm Ödeneği:</strong> Ölümlü kazalarda hak sahiplerine ödenir</li></ul><h3>İşveren Tazminat Sorumluluğu</h3><p>İşveren, iş sağlığı ve güvenliği önlemlerini almakla yükümlüdür. Kusuru oranında maddi ve manevi tazminat ödemek zorundadır. SGK, işverene rücu davası açar.</p><h3>Zamanaşımı</h3><p>İş kazası tazminat davası 10 yıllık zamanaşımına tabidir. Sürekli iş göremezlik halinde süre maluliyet raporunun alındığı tarihten başlar.</p>`
    },
    {
        id: "13",
        title: "Boşanmada Mal Paylaşımı ve Edinilmiş Mallara Katılma",
        slug: "bosanmada-mal-paylasimi",
        excerpt: "Boşanma davasında mallar nasıl paylaşılır? Edinilmiş mallara katılma rejimi, kişisel mallar ve mal kaçırma.",
        category: "Aile Hukuku",
        date: "2024-02-20",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Yasal Mal Rejimi: Edinilmiş Mallara Katılma</h2><p>1 Ocak 2002'den sonra evlenenler için geçerli olan yasal mal rejimi, edinilmiş mallara katılma rejimidir. 2002 öncesi evlilikler mal ayrılığı rejimine tabidir.</p><h3>Edinilmiş Mallar</h3><ul><li>Çalışma karşılığı elde edilen gelirler</li><li>Sosyal güvenlik ödemeleri</li><li>İş gücü kaybı tazminatları</li><li>Kişisel malların gelirleri</li></ul><h3>Kişisel Mallar</h3><ul><li>Evlilik öncesi sahip olunan mallar</li><li>Miras veya bağışlama yoluyla edinilen mallar</li><li>Manevi tazminat alacakları</li><li>Kişisel kullanıma özgü eşyalar</li></ul><h3>Mal Paylaşımı Hesaplaması</h3><p>Boşanma davasında her eşin edinilmiş mallarının toplam değerinden borçlar düşülür. Kalan artık değerin yarısı diğer eşe katılma alacağı olarak ödenir.</p><h3>Mal Kaçırma ve Önleme Tedbirleri</h3><p>Boşanma davası açıldığında mal kaçırma riskine karşı ihtiyati tedbir talep edilebilir. Dava öncesi devredilen mallar için değer artış payı davası açılabilir.</p>`
    },
    {
        id: "14",
        title: "Uyuşturucu Suçları ve Cezaları",
        slug: "uyusturucu-suclari-cezalari",
        excerpt: "Uyuşturucu bulundurmak, kullanmak ve ticareti yapmak suç mu? TCK kapsamında uyuşturucu suçları ve yaptırımları.",
        category: "Ceza Hukuku",
        date: "2024-02-18",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Uyuşturucu Suçları Türleri</h2><p>Türk Ceza Kanunu'nun 188-192. maddeleri uyuşturucu suçlarını düzenlemektedir. Suçun türüne ve uyuşturucunun miktarına göre farklı cezalar öngörülmüştür.</p><h3>Uyuşturucu Ticareti (TCK 188)</h3><p>İmal, ithal, ihraç veya satış halinde 10-20 yıl hapis cezası verilir. Suçun örgütlü işlenmesi veya belirli maddelerin kullanılması halinde ceza artırılır.</p><h3>Kullanmak İçin Bulundurma (TCK 191)</h3><ul><li><strong>İlk kez:</strong> 2-5 yıl hapis, tedavi ve denetimli serbestlik uygulanabilir</li><li><strong>Tekrar:</strong> Ceza infaz edilir, etkin pişmanlık indirimi uygulanmaz</li></ul><h3>Etkin Pişmanlık</h3><p>Uyuşturucu suçlarında etkin pişmanlık hükümleri önemli rol oynar. Failin suç ortaklarını veya uyuşturucu kaynağını bildirmesi halinde cezasında indirim yapılabilir.</p><h3>Tedavi ve Denetimli Serbestlik</h3><p>Kullanıcılar için mahkeme tedavi ve denetimli serbestlik kararı verebilir. 1 yıllık süre içinde kurallara uyulursa dava düşer. Uyulmazsa hapis cezası infaz edilir.</p>`
    },
    {
        id: "15",
        title: "Tüketici Hakları ve Ayıplı Mal Davası",
        slug: "tuketici-haklari-ayipli-mal",
        excerpt: "Aldığınız ürün bozuk çıktı mı? Tüketici hakları, ayıplı mal iadesi, cayma hakkı ve şikayet süreci.",
        category: "Tüketici Hukuku",
        date: "2024-02-15",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Tüketici Hakları Nelerdir?</h2><p>6502 sayılı Tüketicinin Korunması Hakkında Kanun, tüketicilere geniş haklar tanımaktadır. Satın alınan mal veya hizmetteki ayıplar karşısında tüketicinin seçimlik hakları vardır.</p><h3>Ayıplı Mal ve Hizmette Seçimlik Haklar</h3><ul><li><strong>Ücretsiz onarım</strong> isteme hakkı</li><li><strong>Yenisi ile değişim</strong> hakkı</li><li><strong>Bedel iadesi</strong> (sözleşmeden dönme) hakkı</li><li><strong>Bedel indirimi</strong> talep etme hakkı</li></ul><h3>Cayma Hakkı</h3><p>Mesafeli satışlarda (internet, telefon) tüketici 14 gün içinde sebep göstermeksizin cayma hakkını kullanabilir. Ürünü iade ederek bedelin iadesini talep edebilir.</p><h3>Garanti Süresi</h3><p>Asgari 2 yıl garanti zorunludur. Arızalanan ürünler 2 yıl içinde ücretsiz onarılmalıdır. 1 yıl içinde 4 kez arızalanan üründe tüketici değişim talep edebilir.</p><h3>Tüketici Hakem Heyeti</h3><p>2024 yılı için 104.000 TL altındaki uyuşmazlıklarda hakem heyetine başvuru zorunludur. 30 gün içinde karar verilir. Karara itiraz tüketici mahkemesine yapılır.</p>`
    },
    {
        id: "16",
        title: "Nafaka Davası: Nafaka Türleri ve Hesaplama",
        slug: "nafaka-davasi-hesaplama",
        excerpt: "Nafaka nedir, türleri nelerdir? Tedbir nafakası, iştirak nafakası, yoksulluk nafakası farkları ve artırım davası.",
        category: "Aile Hukuku",
        date: "2024-02-12",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Nafaka Türleri</h2><p>Türk hukukunda nafaka, kişinin geçimini sağlayamayacak durumda olması halinde hısımlarından veya eşinden talep edebileceği parasal yardımdır. Boşanma sürecinde ve sonrasında farklı nafaka türleri söz konusu olur.</p><h3>Tedbir Nafakası</h3><p>Boşanma davası süresince eş ve çocukların geçimi için hükmedilen nafakadır. Dava sonuçlanana kadar devam eder.</p><h3>İştirak Nafakası (Çocuk Nafakası)</h3><p>Velayeti almayan ebeveynin çocuğun bakım, eğitim ve geçim giderlerine katılması için ödediği nafakadır. Çocuk reşit olana kadar veya eğitimi devam ediyorsa 25 yaşına kadar sürer.</p><h3>Yoksulluk Nafakası</h3><p>Boşanma nedeniyle yoksulluğa düşecek eşe, kusuru daha ağır olmamak koşuluyla hükmedilir. Süresiz olabilir, yeniden evlenme veya fiilen evlilik birliği kurma halinde kalkar.</p><h3>Nafaka Artırım Davası</h3><p>Yaşam koşullarının değişmesi halinde nafaka artırımı talep edilebilir. ÜFE/TÜFE oranları, tarafların ekonomik durumları ve çocuğun ihtiyaçları dikkate alınır.</p>`
    },
    {
        id: "17",
        title: "Şirket Kuruluşu ve Türleri",
        slug: "sirket-kurulusu-turleri",
        excerpt: "Türkiye'de şirket nasıl kurulur? Limited şirket, anonim şirket, şahıs şirketi karşılaştırması ve kuruluş maliyetleri.",
        category: "Ticaret Hukuku",
        date: "2024-02-10",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Şirket Türleri</h2><p>Türk Ticaret Kanunu'na göre şirketler şahıs şirketleri (adi ortaklık, kolektif, komandit) ve sermaye şirketleri (limited, anonim, sermayesi paylara bölünmüş komandit) olarak ayrılır.</p><h3>Limited Şirket (Ltd. Şti.)</h3><ul><li><strong>Asgari sermaye:</strong> 50.000 TL (2024)</li><li><strong>Ortak sayısı:</strong> 1-50 kişi</li><li><strong>Sorumluluk:</strong> Sermaye ile sınırlı</li><li><strong>Hisse devri:</strong> Noter huzurunda</li></ul><h3>Anonim Şirket (A.Ş.)</h3><ul><li><strong>Asgari sermaye:</strong> 250.000 TL (kayıtlı sermaye 500.000 TL)</li><li><strong>Ortak sayısı:</strong> 1 veya daha fazla</li><li><strong>Yönetim:</strong> Yönetim Kurulu mecburi</li><li><strong>Halka arz:</strong> Mümkün</li></ul><h3>Kuruluş Süreci</h3><p>MERSİS üzerinden ön başvuru yapılır. Ana sözleşme hazırlanır, noter onayı alınır. Banka hesabı açılarak sermaye yatırılır. Ticaret Sicil Müdürlüğü'ne tescil ile şirket tüzel kişilik kazanır.</p><h3>Şahıs Şirketi Avantajları</h3><p>Küçük işletmeler için şahıs şirketi basit muhasebe, düşük maliyet ve kolay yönetim avantajları sunar. Ancak sorumluluk sınırsızdır.</p>`
    },
    {
        id: "18",
        title: "İdari Para Cezası İtirazı",
        slug: "idari-para-cezasi-itirazi",
        excerpt: "Trafik cezası, vergi cezası veya belediye cezasına nasıl itiraz edilir? Süre, dilekçe örneği ve mahkeme süreci.",
        category: "İdare Hukuku",
        date: "2024-02-08",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>İdari Para Cezaları</h2><p>İdari para cezaları, idari makamlar tarafından kabahat niteliğindeki davranışlara karşılık uygulanan yaptırımlardır. Trafik cezaları, belediye zabıta cezaları, SGK cezaları bu kapsamdadır.</p><h3>İtiraz Süresi</h3><p>İdari para cezalarına itiraz süresi cezanın tebliğinden itibaren 15 gündür. Bu süre hak düşürücü süre olup, geçirilmesi halinde itiraz hakkı kaybedilir.</p><h3>İtiraz Mercii</h3><ul><li><strong>Trafik cezaları:</strong> Sulh Ceza Hakimliği</li><li><strong>SGK cezaları:</strong> İdare Mahkemesi</li><li><strong>Belediye cezaları:</strong> Sulh Ceza Hakimliği</li><li><strong>Vergi cezaları:</strong> Vergi Mahkemesi</li></ul><h3>İtiraz Dilekçesinde Bulunması Gerekenler</h3><p>Cezanın hukuka aykırılık gerekçesi, deliller ve varsa tanık bilgileri dilekçede yer almalıdır. Usul hatası veya yetkisizlik gibi şekli itirazlar da öne sürülebilir.</p><h3>Cezanın Ödenmesi</h3><p>İtiraz, cezanın tahsilini durdurmaz. Ancak peşin ödemede %25 indirim uygulanır. Taksitlendirme de talep edilebilir. İtiraz kabul edilirse ödenen tutar iade edilir.</p>`
    },
    {
        id: "19",
        title: "Hakaret ve Tehdit Suçları",
        slug: "hakaret-tehdit-suclari",
        excerpt: "Hakaret ve tehdit suçu nedir? Sosyal medyada hakaret, hapis cezası, şikayet süreci ve uzlaşma.",
        category: "Ceza Hukuku",
        date: "2024-02-05",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1453906971074-ce568cccbc63?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Hakaret Suçu (TCK 125)</h2><p>Bir kimsenin onur, şeref ve saygınlığını zedeleyecek şekilde somut bir fiil veya olgu isnat etmek ya da sövmek hakaret suçunu oluşturur. 3 aydan 2 yıla kadar hapis veya adli para cezası öngörülmektedir.</p><h3>Nitelikli Hakaret</h3><ul><li><strong>Kamu görevlisine:</strong> Ceza yarı oranında artırılır</li><li><strong>Alenen işlenmesi:</strong> Ceza 1/6 oranında artırılır</li><li><strong>Basın yoluyla:</strong> Ceza yarı oranında artırılır</li></ul><h3>Tehdit Suçu (TCK 106)</h3><p>Bir başkasının hayatına, vücut bütünlüğüne veya malvarlığına yönelik zarar vereceğini bildirmek tehdit suçunu oluşturur. 6 aydan 2 yıla kadar hapis cezası verilir.</p><h3>Sosyal Medyada Hakaret</h3><p>Instagram, Twitter, Facebook gibi platformlarda yapılan hakaret de suç oluşturur. IP adresi tespiti ile fail belirlenir. Aleniyet koşulu nedeniyle ceza artırılır.</p><h3>Uzlaşma</h3><p>Hakaret ve basit tehdit suçları uzlaşmaya tabidir. Taraflar uzlaşırsa dava düşer. Uzlaşılamazsa yargılama devam eder. Şikayet süresi 6 aydır.</p>`
    },
    {
        id: "20",
        title: "Kira Sözleşmesi Hazırlama ve Dikkat Edilecekler",
        slug: "kira-sozlesmesi-hazirlama",
        excerpt: "Kira sözleşmesi nasıl hazırlanır? Depozito, kira artış oranı, fesih şartları ve kiracı-kiraya veren hakları.",
        category: "Gayrimenkul Hukuku",
        date: "2024-02-02",
        author: "Av. Melih Can Yılmaz",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
        font: "font-sans",
        content: `<h2>Kira Sözleşmesi Unsurları</h2><p>Geçerli bir kira sözleşmesi için taraflar, kiralanan, kira bedeli ve süre gibi temel unsurların belirlenmesi gerekir. Yazılı şekil şartı olmasa da ispat açısından yazılı yapılması önerilir.</p><h3>Sözleşmede Bulunması Gerekenler</h3><ul><li>Taraf bilgileri (TC kimlik, adres)</li><li>Kiralananın açık adresi ve özellikleri</li><li>Kira bedeli ve ödeme tarihi</li><li>Depozito tutarı (3 aylık kirayı aşamaz)</li><li>Kira artış oranı</li><li>Aidat ve giderlerin paylaşımı</li></ul><h3>Kira Artış Oranı</h3><p>Konut kiralarında yıllık artış oranı TÜFE 12 aylık ortalamasını geçemez. 2024 yılı için %25 tavan sınırlaması devam etmektedir. Ticari kiralarda serbestçe belirlenebilir.</p><h3>Depozito (Güvence Bedeli)</h3><p>3 aylık kirayı aşamaz. Kira sonunda hasar yoksa iade edilir. Banka hesabına yatırılması ve kira sonunda neması ile birlikte iade zorunludur.</p><h3>Fesih ve Tahliye</h3><p>Belirli süreli sözleşmelerde süre sonunda 15 gün önceden bildirim gerekir. Belirsiz süreli sözleşmelerde 3 ay önceden fesih bildirimi yapılmalıdır.</p>`
    }
];

export async function GET() {
    try {
        let count = 0;
        for (const post of posts) {
            const postRef = doc(db, "posts", post.id);
            await setDoc(postRef, { ...post, createdAt: new Date().toISOString() });
            count++;
        }
        return NextResponse.json({ success: true, message: `${count} blog yazısı eklendi.` });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: 'Seed başarısız', details: String(error) }, { status: 500 });
    }
}
