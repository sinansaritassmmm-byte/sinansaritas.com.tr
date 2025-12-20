export default function HizmetlerPage() {
  const hizmetler = [
    {
      title: "Aylık Muhasebe & Beyannameler",
      desc:
        "KDV, Muhtasar/Prim, Geçici Vergi, BA–BS, Kurumlar/Gelir ve diğer tüm beyan süreçlerini düzenli takip eder; kayıt–beyan uyumunu koruruz.",
      bullets: [
        "KDV / Muhtasar / Geçici vergi",
        "E-beyanname ve tahakkuk takibi",
        "Aylık kapanış ve kontrol",
      ],
    },
    {
      title: "E-Defter / E-Fatura / E-Arşiv Süreç Yönetimi",
      desc:
        "E-belge süreçlerini baştan sona kurar, hatasız düzen ve mutabakatla ilerleriz. GİB uyumlu e-belge akışı ve arşiv düzeni oluştururuz.",
      bullets: ["E-fatura / E-arşiv", "E-defter berat süreçleri", "Kontrol & hata önleme"],
    },
    {
      title: "SGK, Bordro ve Personel İşlemleri",
      desc:
        "İşe giriş/çıkış, bordro ve SGK bildirgelerini mevzuata uygun şekilde yönetir; işçilik maliyeti hesaplarıyla karar süreçlerinizi destekleriz.",
      bullets: ["Bordro", "SGK bildirgeleri", "İşçilik maliyeti hesapları"],
    },
    {
      title: "Raporlama & Finansal Görünürlük",
      desc:
        "Gelir-gider, kârlılık ve nakit akışı perspektifi ile yönetim için anlaşılır raporlar üretiriz. Aylık sürprizleri azaltan sistem kurarız.",
      bullets: ["Nakit akışı", "Kârlılık analizi", "Aylık yönetim raporları"],
    },
    {
      title: "Şirket Kuruluş & Yapılandırma",
      desc:
        "Şahıs / Ltd / A.Ş. kuruluş süreçleri, vergi dairesi ve e-belge geçiş planı dahil; işletmenin ilk günden doğru düzende başlamasını sağlarız.",
      bullets: ["Şirket kuruluş süreçleri", "E-belge geçiş planı", "Hesap planı kurgu"],
    },
    {
      title: "Danışmanlık & Uygulama Desteği",
      desc:
        "Mevzuat yorumundan uygulamaya kadar pratik, uygulanabilir danışmanlık verir; sektörünüze uygun süreçleri birlikte kurarız.",
      bullets: ["Mevzuat & uygulama", "Süreç tasarımı", "Denetim öncesi hazırlık"],
    },
  ];

  const sektorler = [
    { slug: "e-ticaret-muhasebe", title: "E-Ticaret", icon: "🛒" },
    { slug: "kargo-kurye-muhasebe", title: "Kargo / Kurye", icon: "🚚" },
    { slug: "basit-usulden-gercek-usule-gecis", title: "Basit → Gerçek Usul", icon: "🧾" },
    { slug: "imalat-sanayi-muhasebe", title: "İmalat / Sanayi", icon: "🏭" },
    { slug: "restoran-kafe-muhasebe", title: "Restoran / Kafe", icon: "☕" },
    { slug: "yazilim-it-muhasebe", title: "Yazılım / IT", icon: "💻" },
  ];

  return (
    <main className="section">
      <div className="container">
        <p className="hero-kicker">Hizmetler</p>

        <h1 className="hero-title" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
          Mali Müşavirlik ve Muhasebe Hizmetleri
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: 900 }}>
          İşletmenizin vergi ve muhasebe süreçlerini düzenli, şeffaf ve mevzuata uygun şekilde yönetmek için
          uçtan uca hizmet sunuyorum. İstanbul / Sarıyer merkezli çalışıyorum; uzaktan hizmet modeliyle Türkiye
          geneline destek verebilirim.
        </p>

        <div className="hero-actions" style={{ marginTop: 18 }}>
          <a
            className="btn btn-primary"
            href="https://wa.me/905435172198"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp ile Hızlı İletişim
          </a>
          <a className="btn btn-outline" href="/iletisim">
            İletişim Bilgileri
          </a>
        </div>

        <div className="hero-highlight" style={{ marginTop: 14 }}>
          <span>📍 İstanbul / Sarıyer</span>
          <span>📑 SMMM Ruhsatlı</span>
          <span>✅ E-Defter & E-Fatura süreç yönetimi</span>
        </div>

        <section className="section" style={{ paddingTop: 26 }}>
          <h2 className="section-title">Hizmet Kapsamı</h2>
          <p className="section-intro" style={{ maxWidth: 900 }}>
            Aşağıdaki başlıklar, en sık talep edilen hizmet alanlarını özetler. İşletmenizin özel durumuna göre
            kapsam birlikte netleştirilir.
          </p>

          <div className="grid">
            {hizmetler.map((h) => (
              <div key={h.title} className="card">
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                  {h.bullets.map((b) => (
                    <li key={b} style={{ margin: "6px 0" }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <div className="card" style={{ padding: 18 }}>
            <h2 style={{ marginTop: 0 }}>Hatayı azaltan çalışma düzeni</h2>
            <p style={{ marginBottom: 10 }}>
              “Tek rapor” yerine, kayıt–beyan–tahsilat uyumunu koruyan düzen kurmak hedefimiz:
            </p>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li style={{ margin: "6px 0" }}>
                Banka/pos hareketleri ↔ satış/fatura ↔ e-belge kontrolü
              </li>
              <li style={{ margin: "6px 0" }}>
                E-defter öncesi aylık kapanış kontrol listesi
              </li>
              <li style={{ margin: "6px 0" }}>
                İade/iptal/komisyon gibi kalemlerin doğru sınıflandırılması
              </li>
            </ul>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">Sektör odaklı sayfalar</h2>
          <p className="section-intro" style={{ maxWidth: 900 }}>
            Bazı sektörlerde süreçler daha hassastır. Örnek sektör sayfaları:
          </p>

          <div className="grid">
            {sektorler.map((s) => (
              <a
                key={s.slug}
                className="card"
                href={`/sektorler/${s.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span aria-hidden="true">{s.icon}</span>
                  <span>{s.title}</span>
                </h3>
                <p style={{ marginBottom: 0 }}>
                  Detayları gör →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <div className="contact-box">
            <p className="contact-box-title">Ücretsiz Ön Görüşme</p>
            <p className="contact-box-text">
              İşletmenizin mevcut durumunu kısaca anlatın; size uygun yol haritasını birlikte çıkaralım.
            </p>
            <a
              className="btn btn-primary full"
              href="https://wa.me/905435172198"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp’tan Yaz
            </a>
          </div>
        </section>

        <p style={{ marginTop: 14, opacity: 0.85 }}>
          Not: Bu sayfa bilgilendirme amaçlıdır. Hizmet kapsamı, işletmenin faaliyet alanı ve süreçlerine göre
          değişebilir.
        </p>
      </div>
    </main>
  );
}
