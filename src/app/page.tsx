"use client";

import { useEffect, useMemo, useState } from "react";

type FxState = {
  USD: string;
  EUR: string;
  GBP: string;
};

type CostResult = {
  net: number;
  employerCost: number;
  employeeSgk: number;
  employeeUnemp: number;
  incomeTax: number;
  stampTax: number;
  employerSgk: number;
  employerUnemp: number;
};

function formatTL(value: number): string {
  if (!isFinite(value)) return "-";
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseNumberTR(input: string): number {
  const cleaned = input.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

export default function Page() {
  /* ===========================
   *  Yukarı çık butonu
   * =========================== */
  useEffect(() => {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    const onScroll = () => {
      if (window.scrollY > 300) btn.classList.add("show");
      else btn.classList.remove("show");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===========================
   *  TCMB kurları
   * =========================== */
  const [fx, setFx] = useState<FxState>({
    USD: "—",
    EUR: "—",
    GBP: "—",
  });

  useEffect(() => {
    async function loadFx() {
      // 1) /api/tcmb varsa
      try {
        const r = await fetch("/api/tcmb", { cache: "no-store" });
        if (r.ok) {
          const j = await r.json();
          if (j?.ok && j?.data) {
            const { USD, EUR, GBP } = j.data;
            setFx({
              USD: USD ? Number(USD).toFixed(2).replace(".", ",") : "—",
              EUR: EUR ? Number(EUR).toFixed(2).replace(".", ",") : "—",
              GBP: GBP ? Number(GBP).toFixed(2).replace(".", ",") : "—",
            });
            return;
          }
        }
      } catch {
        // sessiz geç
      }

      // 2) Proxy yoksa doğrudan TCMB (CORS olursa fallback)
      try {
        const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml");
        if (!res.ok) throw new Error("TCMB response not ok");
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const pick = (code: string) => {
          const node = xml.querySelector(
            `Currency[CurrencyCode="${code}"] > ForexSelling`
          );
          if (!node?.textContent) return null;
          const num = parseFloat(node.textContent.replace(",", "."));
          if (!isFinite(num)) return null;
          return num.toFixed(2).replace(".", ",");
        };

        const usd = pick("USD");
        const eur = pick("EUR");
        const gbp = pick("GBP");

        setFx((prev) => ({
          USD: usd ?? prev.USD,
          EUR: eur ?? prev.EUR,
          GBP: gbp ?? prev.GBP,
        }));
      } catch {
        // statik fallback
        setFx({ USD: "33,10", EUR: "36,40", GBP: "42,20" });
      }
    }

    loadFx();
  }, []);

  /* ===========================
   *  İşçilik maliyeti hesap
   * =========================== */
  const [grossInput, setGrossInput] = useState("20000");
  const [cost, setCost] = useState<CostResult | null>(null);

  const handleCalc = () => {
    const gross = parseNumberTR(grossInput);
    if (!isFinite(gross) || gross <= 0) {
      setCost(null);
      return;
    }

    const employeeSgk = gross * 0.14;
    const employeeUnemp = gross * 0.01;
    const taxBase = gross - employeeSgk - employeeUnemp;
    const incomeTax = taxBase * 0.15;
    const stampTax = gross * 0.00759;

    const net = gross - (employeeSgk + employeeUnemp + incomeTax + stampTax);

    const employerSgk = gross * 0.205;
    const employerUnemp = gross * 0.02;
    const employerCost = gross + employerSgk + employerUnemp;

    setCost({
      net,
      employerCost,
      employeeSgk,
      employeeUnemp,
      incomeTax,
      stampTax,
      employerSgk,
      employerUnemp,
    });
  };

  /* ===========================
   *  HESAPLAMALAR BLOĞU
   * =========================== */

  // 1) KDV Dahil/Hariç
  const [kdvAmount, setKdvAmount] = useState("1000");
  const [kdvRate, setKdvRate] = useState("20");
  const [kdvMode, setKdvMode] = useState<"haricToDahil" | "dahilToHaric">(
    "haricToDahil"
  );

  const kdvResult = useMemo(() => {
    const amt = parseNumberTR(kdvAmount);
    const rate = parseNumberTR(kdvRate) / 100;
    if (!isFinite(amt) || !isFinite(rate) || rate < 0) return null;

    if (kdvMode === "haricToDahil") {
      const kdv = amt * rate;
      const total = amt + kdv;
      return { base: amt, kdv, total };
    } else {
      const base = amt / (1 + rate);
      const kdv = amt - base;
      return { base, kdv, total: amt };
    }
  }, [kdvAmount, kdvRate, kdvMode]);

  // 2) Tevkifatlı KDV
  const [tevMatrah, setTevMatrah] = useState("10000");
  const [tevKdvRate, setTevKdvRate] = useState("20");
  const [tevRatio, setTevRatio] = useState("7/10");

  const tevResult = useMemo(() => {
    const matrah = parseNumberTR(tevMatrah);
    const kdvRate = parseNumberTR(tevKdvRate) / 100;
    if (!isFinite(matrah) || !isFinite(kdvRate)) return null;

    const kdv = matrah * kdvRate;

    let buyerShare = 0;
    try {
      const [a, b] = tevRatio.split("/").map((x) => parseFloat(x));
      if (isFinite(a) && isFinite(b) && b !== 0) buyerShare = a / b;
    } catch {
      // ignore
    }
    buyerShare = Math.min(Math.max(buyerShare, 0), 1);

    const kdvBuyer = kdv * buyerShare;
    const kdvSeller = kdv - kdvBuyer;
    const totalToSeller = matrah + kdvSeller;

    return { matrah, kdv, kdvBuyer, kdvSeller, totalToSeller };
  }, [tevMatrah, tevKdvRate, tevRatio]);

  // 3) Stopaj
  const [stopajBrut, setStopajBrut] = useState("20000");
  const [stopajRate, setStopajRate] = useState("20");

  const stopajResult = useMemo(() => {
    const brut = parseNumberTR(stopajBrut);
    const rate = parseNumberTR(stopajRate) / 100;
    if (!isFinite(brut) || !isFinite(rate)) return null;

    const stopaj = brut * rate;
    const net = brut - stopaj;
    return { brut, stopaj, net };
  }, [stopajBrut, stopajRate]);

  // 4) Kıdem / İhbar
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2025-01-01");
  const [kidBrut, setKidBrut] = useState("30000");
  const [noticeWeeks, setNoticeWeeks] = useState("8");

  const kidemResult = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const brut = parseNumberTR(kidBrut);
    const ihbarW = parseNumberTR(noticeWeeks);

    if (!isFinite(s.getTime()) || !isFinite(e.getTime()) || !isFinite(brut))
      return null;

    const diffMs = Math.max(0, e.getTime() - s.getTime());
    const years = diffMs / (1000 * 60 * 60 * 24 * 365);

    const kidem = brut * years;
    const weekly = brut / 4.33;
    const ihbar = weekly * (isFinite(ihbarW) ? ihbarW : 0);
    const stamp = kidem * 0.00759;

    return { years, kidem, ihbar, stamp, total: kidem + ihbar - stamp };
  }, [startDate, endDate, kidBrut, noticeWeeks]);

  // 5) Faiz / Vadeli TL
  const [faizAna, setFaizAna] = useState("100000");
  const [faizOran, setFaizOran] = useState("45");
  const [faizGun, setFaizGun] = useState("32");
  const [faizStopaj, setFaizStopaj] = useState("5");

  const faizResult = useMemo(() => {
    const ana = parseNumberTR(faizAna);
    const oran = parseNumberTR(faizOran) / 100;
    const gun = parseNumberTR(faizGun);
    const stopaj = parseNumberTR(faizStopaj) / 100;

    if (!isFinite(ana) || !isFinite(oran) || !isFinite(gun)) return null;

    const brutFaiz = ana * oran * (gun / 365);
    const stopajTutar = brutFaiz * (isFinite(stopaj) ? stopaj : 0);
    const netFaiz = brutFaiz - stopajTutar;
    const vadeSonu = ana + netFaiz;

    return { brutFaiz, stopajTutar, netFaiz, vadeSonu };
  }, [faizAna, faizOran, faizGun, faizStopaj]);

  return (
    <>
      <main id="anasayfa">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <p className="hero-kicker">
              Sinan Sarıtaş — Serbest Muhasebeci Mali Müşavir
            </p>
            <h1 className="hero-title">
              KOBİ’ler ve Şirketler İçin Profesyonel Mali Müşavirlik ve
              Muhasebe Hizmetleri
            </h1>
            <p className="hero-subtitle">
              E-Defter, e-Fatura ve vergi süreçlerinde ulaşılabilir ve güvenilir
              mali müşavirlik desteği.
            </p>

            <div className="hero-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/905435172198"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ile Hızlı İletişim
              </a>

              <a className="btn btn-outline" href="#hizmetler">
                Hizmetleri Gör
              </a>

              <details className="alpha-details">
                <summary className="btn btn-outline">
                  Pratik Bilgi Menüsü
                </summary>
                <div className="alpha-panel">
                  <p className="alpha-intro">
                    Sık kullanılan mevzuat, hesaplama ve bilgi başlıklarına
                    buradan hızlıca ulaşabilirsiniz.
                  </p>

                  {/* Artık pratik bilgiler ayrı sayfa olduğu için buradaki iç-linkleri /pratik-bilgiler'e yönlendiriyoruz */}
                  <ul className="alpha-menu">
                    <li>
                      <a href="/pratik-bilgiler">Asgari Ücretler</a>
                    </li>
                    <li>
                      <a href="/pratik-bilgiler">KDV Oranları Listesi</a>
                    </li>
                    <li>
                      <a href="/pratik-bilgiler">SGK (Sigorta)</a>
                    </li>
                    <li>
                      <a href="/pratik-bilgiler">İşçilik Maliyetleri</a>
                    </li>
                    <li>
                      <a href="/pratik-bilgiler">Hesaplamalar</a>
                    </li>
                    <li>
                      <a
                        href="https://gib.gov.tr/vergi-takvimi"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Vergi Takvimi (GİB Resmi)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.ismmmo.org.tr/dosya/415/Mevzuat-Dosya/tekduzhesapplani.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Tek Düzen Hesap Planı (PDF)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.turmob.org.tr/arsiv/mbs/pratikBilgiler/G%C3%9CNCEL%20AMORT%C4%B0SMAN%20ORANLARI-2024.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Amortisman Oranları / Faydalı Ömürler (PDF)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.turmob.org.tr/ekutuphane/Read/2ed63c4f-ed2c-4ae2-976b-557cc0e0cc25"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Bağ-Kur Primleri 2025 (TÜRMOB PDF)
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="hero-highlight">
              <span>📍 İstanbul</span>
              <span>📑 SMMM Ruhsatlı</span>
              <span>👨‍💼 KOBİ ve bireysel mükellefler</span>
            </div>
          </div>
        </section>

        {/* ÜST BİLGİ KUTULARI */}
        <section className="section">
          <div className="container info-cards">
            <div className="info-card">
              <h3>📈 Güncel Döviz Kurları</h3>
              <div className="kur-list">
                <p>USD: {fx.USD}</p>
                <p>EUR: {fx.EUR}</p>
                <p>GBP: {fx.GBP}</p>
              </div>
            </div>

            <div className="info-card">
              <h3>📅 Vergi Takvimi (Resmi)</h3>
              <a
                className="btn btn-primary full"
                href="https://gib.gov.tr/vergi-takvimi"
                target="_blank"
                rel="noreferrer"
              >
                GİB Güncel Vergi Takvimi
              </a>
            </div>
          </div>
        </section>

        {/* HİZMETLER */}
        <section id="hizmetler" className="section">
          <div className="container">
            <h2 className="section-title">Hizmetler</h2>
            <p className="section-intro">
              Mükelleflerimin mali yükümlülüklerini zamanında ve doğru şekilde
              yerine getirebilmeleri için uçtan uca hizmet sunuyorum.
            </p>

            <div className="grid">
              <div className="card">
                <h3>Aylık / 3 Aylık / Yıllık Beyannameler</h3>
                <p>
                  KDV, Muhtasar, Geçici Vergi, BA–BS ve Yıllık Gelir/Kurumlar
                  beyannamelerinin hazırlanması, kontrolü ve elektronik ortamda
                  gönderimi.
                </p>
              </div>

              <div className="card">
                <h3>Bordro ve SGK İşlemleri</h3>
                <p>
                  Personel bordrolarının hazırlanması, SGK bildirgelerinin
                  düzenlenmesi, işe giriş–çıkış bildirimi ve yasal
                  yükümlülüklerin takibi.
                </p>
              </div>

              <div className="card">
                <h3>Gelir–Gider Analizi &amp; Raporlama</h3>
                <p>
                  İşletme gelir ve giderlerinin düzenli analiz edilmesi, nakit
                  akışı ve kârlılık odaklı raporlar ile yönetim kararlarına
                  destek olunması.
                </p>
              </div>

              <div className="card">
                <h3>Finansal Danışmanlık</h3>
                <p>
                  Yatırım kararları, kredi kullanımı, finansman yapısı ve mali
                  planlama süreçlerinde işletme ölçeğine uygun danışmanlık.
                </p>
              </div>

              <div className="card">
                <h3>Ön Muhasebe Hizmetleri</h3>
                <p>
                  Fatura, stok ve cari hesap takibi, banka kayıtlarının
                  işlenmesi ve muhasebeye hazır veri setlerinin oluşturulması.
                </p>
              </div>

              <div className="card">
                <h3>Muhasebe Sistemi Kurulum Danışmanlığı</h3>
                <p>
                  Yeni kurulan veya büyüyen işletmeler için muhasebe
                  süreçlerinin baştan yapılandırılması, hesap planı ve iş
                  akışlarının oluşturulması.
                </p>
              </div>

              <div className="card">
                <h3>Yazılım ve Entegrasyon Danışmanlığı</h3>
                <p>
                  E-Fatura, e-Arşiv, e-Defter ve ticari programların seçimi,
                  kurulumu, muhasebe ile entegrasyonu ve kullanıcı eğitimleri.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="section">
          <div className="container contact">
            <div>
              <h2 className="section-title">İletişim</h2>
              <p className="section-intro">
                Detaylı bilgi, fiyat teklifi veya randevu için aşağıdaki
                bilgiler üzerinden benimle iletişime geçebilirsiniz.
              </p>
              <div className="contact-lines">
                <div>
                  <strong>Telefon:</strong> 0543 517 21 98
                </div>
                <div>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/905435172198"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +90 543 517 21 98
                  </a>
                </div>
                <div>
                  <strong>E-posta:</strong>{" "}
                  <a href="mailto:sinansaritas@hotmail.com">
                    sinansaritas@hotmail.com
                  </a>
                </div>
                <div>
                  <strong>Adres:</strong> TARABYA MAH. ARABA YOLU CAD. NO: 194 B
                  İÇ KAPI NO: 5, SARIYER / İSTANBUL
                </div>
              </div>
            </div>

            <div className="contact-box">
              <p className="contact-box-title">WhatsApp Üzerinden Mesaj Gönder</p>
              <p className="contact-box-text">
                Soru, talep veya bilgi almak için hızlıca mesaj
                gönderebilirsiniz.
              </p>
              <a
                className="btn btn-primary full"
                href="https://wa.me/905435172198"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Aç
              </a>
            </div>
          </div>
        </section>

        {/* YUKARI ÇIK BUTONU */}
        <button
          id="scrollTopBtn"
          className="scroll-top-btn"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Yukarı çık"
        >
          ↑
        </button>
      </main>
    </>
  );
}
