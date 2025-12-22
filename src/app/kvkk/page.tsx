export default function KvkkPage() {
  return (
    <main className="section">
      <div className="container">
        <p className="hero-kicker">KVKK</p>

        <h1 className="hero-title" style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}>
          KVKK Aydınlatma Metni
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: 900 }}>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında;
          veri sorumlusu sıfatıyla{" "}
          <strong>Sinan Sarıtaş — Serbest Muhasebeci Mali Müşavir</strong> tarafından,
          kişisel verilerinizin işlenmesine ilişkin bilgilendirme amacıyla hazırlanmıştır.
        </p>

        <div className="card" style={{ marginTop: 18 }}>
          <h2 style={{ marginTop: 0 }}>1) Veri Sorumlusu</h2>
          <p>
            Veri sorumlusu: <strong>Sinan Sarıtaş — SMMM</strong>
          </p>
          <p style={{ marginBottom: 0 }}>
            İletişim:{" "}
            <a href="mailto:sinansaritas@hotmail.com">sinansaritas@hotmail.com</a>{" "}
            •{" "}
            <a
              href="https://wa.me/905435172198"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </p>
        </div>

        <section className="section" style={{ paddingTop: 18 }}>
          <h2 className="section-title">2) İşlenen Kişisel Veriler</h2>
          <p className="section-intro" style={{ maxWidth: 900 }}>
            Hizmet süreçlerinin niteliğine göre aşağıdaki veri kategorileri işlenebilir:
          </p>

          <div className="grid">
            <div className="card">
              <h3>Kimlik ve İletişim</h3>
              <p>
                Ad-soyad, telefon, e-posta, adres gibi iletişim ve kimlik bilgileri.
              </p>
            </div>
            <div className="card">
              <h3>Müşteri İşlem</h3>
              <p>
                Talep/mesaj içerikleri, randevu bilgileri, hizmete ilişkin kayıt ve yazışmalar.
              </p>
            </div>
            <div className="card">
              <h3>Finans ve Vergisel Bilgiler</h3>
              <p>
                Muhasebe hizmeti kapsamında, mevzuat gereği gerekli olabilecek ticari/finansal belgeler
                (fatura, banka, bordro vb.).
              </p>
            </div>
            <div className="card">
              <h3>Web Sitesi Kullanım</h3>
              <p>
                Site kullanımına ilişkin teknik veriler (IP, tarayıcı, log kayıtları) ve çerezler
                (varsa).
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">3) Kişisel Verilerin İşlenme Amaçları</h2>
          <ul style={{ paddingLeft: 18 }}>
            <li style={{ margin: "8px 0" }}>
              Muhasebe ve mali müşavirlik hizmetlerinin sunulması, yürütülmesi ve planlanması
            </li>
            <li style={{ margin: "8px 0" }}>
              İletişim faaliyetlerinin yürütülmesi (talep/şikâyet yönetimi, randevu, bilgilendirme)
            </li>
            <li style={{ margin: "8px 0" }}>
              Mevzuattan doğan yükümlülüklerin yerine getirilmesi
            </li>
            <li style={{ margin: "8px 0" }}>
              Hizmet kalitesinin artırılması ve süreçlerin geliştirilmesi
            </li>
            <li style={{ margin: "8px 0" }}>
              Bilgi güvenliği süreçlerinin yürütülmesi ve sistem/erişim güvenliğinin sağlanması
            </li>
          </ul>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">4) Hukuki Sebepler</h2>
          <p style={{ maxWidth: 900 }}>
            Kişisel verileriniz; KVKK’nın 5. maddesinde belirtilen hukuki sebeplere dayalı olarak,
            özellikle <strong>kanunlarda açıkça öngörülmesi</strong>,{" "}
            <strong>bir sözleşmenin kurulması veya ifası</strong>,{" "}
            <strong>veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</strong> ve{" "}
            <strong>meşru menfaat</strong> kapsamında işlenebilir. Açık rıza gerektiren hallerde
            gerekli açık rıza alınır.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">5) Kişisel Verilerin Aktarılması</h2>
          <p style={{ maxWidth: 900 }}>
            Kişisel verileriniz; hizmetin gerektirdiği ölçüde ve mevzuata uygun olarak,{" "}
            <strong>yetkili kamu kurum ve kuruluşlarına</strong> (ör. vergi/SGK süreçleri kapsamında),
            ayrıca teknik hizmet sağlayıcılarına (barındırma, e-posta, güvenlik vb.) aktarılabilir.
            Yurt dışına aktarım söz konusu olduğunda KVKK’daki şartlara uygun hareket edilir.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">6) Saklama Süresi</h2>
          <p style={{ maxWidth: 900 }}>
            Kişisel veriler, ilgili mevzuatta öngörülen veya işleme amacının gerektirdiği süre boyunca
            saklanır. Süre bitiminde silme, yok etme veya anonim hale getirme işlemleri uygulanır.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 10 }}>
          <h2 className="section-title">7) KVKK Kapsamındaki Haklarınız</h2>
          <p style={{ maxWidth: 900 }}>
            KVKK’nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme,
            işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, aktarım
            yapılan üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme ve KVKK’da
            öngörülen şartlarla silinmesini/yok edilmesini isteme gibi haklara sahipsiniz.
          </p>

          <div className="contact-box" style={{ marginTop: 14 }}>
            <p className="contact-box-title">Başvuru</p>
            <p className="contact-box-text">
              Haklarınızı kullanmak için e-posta ile başvurabilirsiniz:
            </p>
            <a className="btn btn-primary full" href="mailto:sinansaritas@hotmail.com">
              sinansaritas@hotmail.com
            </a>
          </div>

          <p style={{ marginTop: 12, opacity: 0.85 }}>
            Not: Bu metin bilgilendirme amaçlıdır. Hizmetin niteliğine göre süreçler değişebilir.
          </p>
        </section>
      </div>
    </main>
  );
}
