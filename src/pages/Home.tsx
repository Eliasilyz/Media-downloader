import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Zap, Shield, Globe, Music, Image as ImageIcon,
  ChevronDown, ChevronUp, ArrowRight, Star, Check
} from "lucide-react";
import {
  SiTiktok, SiInstagram, SiFacebook, SiX, SiYoutube
} from "react-icons/si";
import { AdSense } from "@/components/AdSense";
import { HistoryPanel } from "@/components/HistoryPanel";
import { PageSeo } from "@/components/PageSeo";
import { useHistory } from "@/hooks/use-history";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    id: "tiktok",
    name: "TikTok",
    path: "/dl/tiktok",
    icon: SiTiktok,
    color: "#ff0050",
    bg: "rgba(255, 0, 80, 0.08)",
    description: "Download video, slide foto, dan audio TikTok tanpa watermark dalam kualitas HD.",
    features: ["No Watermark", "Slide Foto", "MP3 Audio"],
    urlPattern: /tiktok\.com|vm\.tiktok\.com/,
  },
  {
    id: "instagram",
    name: "Instagram",
    path: "/dl/instagram",
    icon: SiInstagram,
    color: "#e1306c",
    bg: "rgba(225, 48, 108, 0.08)",
    description: "Download Reel, foto, dan carousel Instagram dalam kualitas terbaik.",
    features: ["Reel & Post", "Carousel", "HD Quality"],
    urlPattern: /instagram\.com/,
  },
  {
    id: "facebook",
    name: "Facebook",
    path: "/dl/facebook",
    icon: SiFacebook,
    color: "#1877f2",
    bg: "rgba(24, 119, 242, 0.08)",
    description: "Download video publik Facebook dalam kualitas HD dan SD.",
    features: ["HD & SD", "Video Publik", "Cepat"],
    urlPattern: /facebook\.com|fb\.com|fb\.watch/,
  },
  {
    id: "twitter",
    name: "Twitter / X",
    path: "/dl/twitter",
    icon: SiX,
    color: "#1da1f2",
    bg: "rgba(29, 161, 242, 0.08)",
    description: "Download video dari Twitter dan X dalam berbagai pilihan kualitas.",
    features: ["HD Quality", "Multi-Format", "Gratis"],
    urlPattern: /twitter\.com|x\.com|t\.co/,
  },
  {
    id: "youtube",
    name: "YouTube",
    path: "/dl/youtube",
    icon: SiYoutube,
    color: "#ff0000",
    bg: "rgba(255, 0, 0, 0.08)",
    description: "Download video YouTube hingga 1080p dan konversi ke MP3.",
    features: ["1080p HD", "MP3 Convert", "Multi-Quality"],
    urlPattern: /youtube\.com|youtu\.be/,
  },
];

const features = [
  { icon: Download, label: "HD Quality", desc: "Download hingga resolusi 1080p", color: "text-blue-400", bg: "bg-blue-400/10" },
  { icon: Shield, label: "Tanpa Watermark", desc: "Video bersih tanpa logo platform", color: "text-green-400", bg: "bg-green-400/10" },
  { icon: Music, label: "MP3 Extraction", desc: "Ekstrak audio dari video apapun", color: "text-purple-400", bg: "bg-purple-400/10" },
  { icon: ImageIcon, label: "Multi-Image", desc: "Download carousel foto sekaligus", color: "text-pink-400", bg: "bg-pink-400/10" },
  { icon: Star, label: "100% Gratis", desc: "Tidak ada biaya tersembunyi", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { icon: Zap, label: "Super Cepat", desc: "Analisis dan download dalam hitungan detik", color: "text-orange-400", bg: "bg-orange-400/10" },
];

const faqs = [
  {
    q: "Cara download video TikTok tanpa watermark?",
    a: "Buka TikTok, salin link video yang ingin didownload, lalu tempel di kolom input pada halaman TikTok Downloader kami. Klik 'Analyze' dan pilih opsi 'HD No Watermark'. Video akan terdownload langsung ke perangkat Anda.",
  },
  {
    q: "Apakah downloader ini gratis?",
    a: "Ya, SaveFlow 100% gratis tanpa biaya tersembunyi. Kami mendukung layanan ini melalui iklan yang tidak mengganggu.",
  },
  {
    q: "Apakah aman digunakan?",
    a: "Sangat aman. Kami tidak menyimpan video atau data pribadi Anda. Semua proses dilakukan secara langsung dan tidak ada file yang disimpan di server kami.",
  },
  {
    q: "Berapa kualitas video yang bisa didownload?",
    a: "Tergantung platform dan konten aslinya. Untuk TikTok kami menyediakan HD tanpa watermark. Untuk YouTube bisa hingga 1080p. Untuk platform lain tersedia pilihan HD dan SD.",
  },
  {
    q: "Apakah bisa download foto carousel Instagram?",
    a: "Ya! SaveFlow mendukung download carousel foto Instagram. Semua foto dalam satu post akan ditampilkan dan bisa didownload satu per satu atau sekaligus.",
  },
  {
    q: "Apakah ada limit download?",
    a: "Tidak ada limit download. Anda bisa menggunakan SaveFlow sebanyak yang dibutuhkan tanpa batasan.",
  },
];

function detectPlatformFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    for (const p of platforms) {
      if (p.urlPattern.test(host)) return p.id;
    }
    return null;
  } catch {
    return null;
  }
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-[#374151] rounded-xl overflow-hidden"
      data-testid={`faq-${q.slice(0, 20)}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1F2937]/50 transition-colors"
      >
        <span className="font-medium text-white text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp size={16} className="flex-shrink-0 text-blue-400" />
        ) : (
          <ChevronDown size={16} className="flex-shrink-0 text-[#6B7280]" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[#9CA3AF] leading-relaxed border-t border-[#374151] pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [heroUrl, setHeroUrl] = useState("");
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { history, clearHistory } = useHistory();
  const downloaderRef = useRef<HTMLDivElement>(null);

  const handleHeroUrlChange = (val: string) => {
    setHeroUrl(val);
    setDetectedPlatform(detectPlatformFromUrl(val));
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (detectedPlatform) {
      setLocation(`/dl/${detectedPlatform}`);
    }
  };

  return (
    <>
      <PageSeo
        title="SaveFlow - Download Video TikTok, Instagram, Facebook, Twitter Tanpa Watermark HD"
        description="Platform downloader media sosial terbaik. Download video TikTok tanpa watermark, Instagram Reel, Facebook, Twitter, dan YouTube dalam kualitas HD secara gratis."
        canonical="/"
        keywords="download video tiktok tanpa watermark, instagram downloader, facebook video downloader, twitter video download, youtube downloader gratis"
      />

      <div className="min-h-screen bg-[#111827]">
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[200px] h-[200px] bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6"
            >
              <Zap size={12} />
              Download Media Sosial Gratis & Cepat
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Download Video & Foto{" "}
              <span className="gradient-text">Sosial Media</span>{" "}
              Gratis Tanpa Watermark
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#9CA3AF] mb-10 max-w-2xl mx-auto"
            >
              Downloader cepat untuk TikTok, Instagram, Facebook, Twitter, dan YouTube dalam kualitas HD. Gratis, tanpa watermark, tanpa batas.
            </motion.p>

            {/* Smart URL input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <form onSubmit={handleHeroSubmit}>
                <div className="relative flex items-center rounded-2xl border-2 border-[#374151] focus-within:border-blue-500/60 bg-[#1F2937] transition-all overflow-hidden shadow-xl">
                  <div className="pl-5 flex items-center gap-2">
                    {detectedPlatform ? (
                      (() => {
                        const p = platforms.find((x) => x.id === detectedPlatform);
                        if (!p) return <Globe size={20} className="text-[#6B7280]" />;
                        const Icon = p.icon;
                        return <Icon size={18} color={p.color} />;
                      })()
                    ) : (
                      <Globe size={20} className="text-[#6B7280]" />
                    )}
                  </div>
                  <input
                    type="url"
                    value={heroUrl}
                    onChange={(e) => handleHeroUrlChange(e.target.value)}
                    placeholder="Tempel link TikTok, Instagram, Facebook, Twitter atau YouTube..."
                    className="flex-1 bg-transparent px-4 py-4 md:py-5 text-white placeholder-[#4B5563] text-sm md:text-base outline-none"
                    data-testid="hero-url-input"
                    autoComplete="off"
                  />
                  <div className="pr-2">
                    {detectedPlatform ? (
                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 h-auto rounded-xl font-semibold text-sm gap-2"
                        data-testid="btn-hero-download"
                      >
                        Download
                        <ArrowRight size={15} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => downloaderRef.current?.scrollIntoView({ behavior: "smooth" })}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 h-auto rounded-xl font-semibold text-sm gap-2"
                        data-testid="btn-hero-choose"
                      >
                        Pilih Platform
                        <ArrowRight size={15} />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
              {detectedPlatform && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-blue-400 flex items-center justify-center gap-1.5"
                >
                  <Check size={12} />
                  Platform terdeteksi:{" "}
                  <span className="font-semibold capitalize">{detectedPlatform}</span>
                  — klik Download untuk melanjutkan
                </motion.p>
              )}
            </motion.div>

            {/* Platform mini icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="flex flex-col items-center gap-1">
                    <Icon size={20} color={p.color} />
                    <span className="text-xs text-[#4B5563] hidden sm:block">{p.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* AdSense below hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <AdSense slot="homepage-hero" size="medium" />
        </div>

        {/* Platform Cards */}
        <section ref={downloaderRef} className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Platform yang Didukung</h2>
            <p className="text-[#9CA3AF]">Pilih platform dan mulai download konten favorit Anda</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform, idx) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.id}
                  href={platform.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="group block p-6 rounded-2xl bg-[#1F2937] border border-[#374151] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer"
                  data-testid={`platform-card-${platform.id}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: platform.bg }}
                    >
                      <Icon size={22} color={platform.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{platform.name}</h3>
                      <p className="text-sm text-[#9CA3AF] mt-0.5 leading-relaxed">{platform.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {platform.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#111827] text-[#9CA3AF] border border-[#374151]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: platform.color }}
                  >
                    Buka Downloader
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#0d1117] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-3">Fitur Unggulan SaveFlow</h2>
              <p className="text-[#9CA3AF]">Semua yang Anda butuhkan untuk download media sosial</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07 }}
                    className="p-5 rounded-xl bg-[#1F2937] border border-[#374151]"
                  >
                    <div className={`w-10 h-10 rounded-lg ${f.bg} ${f.color} flex items-center justify-center mb-3`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{f.label}</h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-3 text-center">Cara Download dari Setiap Platform</h2>
            <p className="text-[#9CA3AF] text-center mb-10">Panduan singkat untuk setiap platform yang kami dukung</p>

            <div className="space-y-4">
              {[
                {
                  platform: "TikTok",
                  color: "#ff0050",
                  icon: SiTiktok,
                  desc: "Download video TikTok tanpa watermark sangat mudah dengan SaveFlow. Cukup salin link video dari aplikasi TikTok, tempel di downloader kami, dan pilih kualitas HD. Anda juga bisa download slide foto dan audio/musik dari video TikTok.",
                },
                {
                  platform: "Instagram",
                  color: "#e1306c",
                  icon: SiInstagram,
                  desc: "SaveFlow mendukung download Reel, foto tunggal, dan carousel multi-foto dari Instagram. Semua dalam kualitas asli tanpa kompresi. Hanya konten publik yang bisa didownload.",
                },
                {
                  platform: "Facebook",
                  color: "#1877f2",
                  icon: SiFacebook,
                  desc: "Download video Facebook publik dalam kualitas HD dan SD. Cocok untuk menyimpan video berita, tutorial, atau konten yang ingin ditonton offline.",
                },
                {
                  platform: "Twitter / X",
                  color: "#1da1f2",
                  icon: SiX,
                  desc: "Simpan video dari tweet atau post di Twitter/X dalam berbagai kualitas. Cukup salin URL tweet dan biarkan SaveFlow bekerja untuk Anda.",
                },
                {
                  platform: "YouTube",
                  color: "#ff0000",
                  icon: SiYoutube,
                  desc: "Download video YouTube hingga resolusi 1080p HD dan konversi ke format MP3 untuk audio saja. Ideal untuk konten edukasi, musik, dan video yang ingin ditonton offline.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.platform} className="flex items-start gap-4 p-4 rounded-xl bg-[#1F2937] border border-[#374151]">
                    <Icon size={20} color={item.color} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">Download dari {item.platform}</h3>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* AdSense middle */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
          <AdSense slot="homepage-middle" size="large" />
        </div>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-[#9CA3AF]">Jawaban untuk pertanyaan umum tentang SaveFlow</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* History */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <HistoryPanel history={history} onClear={clearHistory} />
        </div>

        {/* AdSense footer */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <AdSense slot="homepage-footer" size="medium" />
        </div>
      </div>
    </>
  );
}
