# Av. Melih Can Yılmaz - Hukuk Bürosu Web Sitesi

Bu proje, Av. Melih Can Yılmaz için hazırlanmış modern, profesyonel ve responsive bir hukuk bürosu web sitesidir.

## Özellikler

- **Modern Tasarım:** Navy Blue (#0C2D48), Gold (#D4AF37) ve Beyaz renk paletiyle kurumsal görünüm.
- **Responsive:** Mobil, tablet ve masaüstü uyumlu.
- **Blog Sistemi (CMS):** Yönetim paneli üzerinden blog yazısı ekleme/silme.
- **SEO Uyumlu:** Next.js metadata ve semantik HTML yapısı.
- **İletişim Entegrasyonları:** İletişim formu, WhatsApp yüzen butonu ve Harita.
- **Animasyonlar:** Framer Motion ile akıcı geçişler.

## Kurulum ve Çalıştırma

Proje dosyaları `C:\Users\berka\.gemini\antigravity\scratch\av-melih-can-yilmaz` dizinindedir.

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

3. Tarayıcınızda açın:
   - Ana Sayfa: [http://localhost:3000](http://localhost:3000)
   - Admin Paneli: [http://localhost:3000/admin](http://localhost:3000/admin) (Şifre: `admin`)
   - Blog: [http://localhost:3000/blog](http://localhost:3000/blog)

## Klasör Yapısı

- `src/app`: Sayfa yönlendirmeleri (Home, Blog, Admin).
- `src/components`: UI bileşenleri (Header, Footer, Hero, vb.).
- `src/data/posts.json`: Blog yazılarının tutulduğu JSON dosyası.
- `src/app/api`: Backend API rotaları.
