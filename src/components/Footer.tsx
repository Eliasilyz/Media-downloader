import { Link } from "wouter";
import { Zap, Shield, Zap as BoltIcon } from "lucide-react";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-[#1F2937] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <BoltIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Save<span className="text-blue-400">Flow</span>
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] max-w-xs leading-relaxed">
              Platform downloader media profesional untuk TikTok, Instagram, Facebook, Twitter, dan YouTube. Gratis, cepat, dan tanpa watermark.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Shield size={12} className="text-green-500" />
                <span>Aman & Terpercaya</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <BoltIcon size={12} className="text-blue-400" />
                <span>Cepat & Gratis</span>
              </div>
            </div>
          </div>

          {/* Downloaders */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Downloaders</h3>
            <ul className="space-y-2">
              {[
                { name: "TikTok Downloader", href: "/dl/tiktok" },
                { name: "Instagram Downloader", href: "/dl/instagram" },
                { name: "Facebook Downloader", href: "/dl/facebook" },
                { name: "Twitter Downloader", href: "/dl/twitter" },
                { name: "YouTube Downloader", href: "/dl/youtube" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Informasi</h3>
            <ul className="space-y-2">
              {[
                { name: "Beranda", href: "/" },
                { name: "Cara Penggunaan", href: "/" },
                { name: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4B5563]">
            &copy; {year} SaveFlow. Dibuat untuk memudahkan download media sosial.
          </p>
          <p className="text-xs text-[#4B5563]">
            Hanya untuk konten publik. Hormati hak cipta kreator.
          </p>
        </div>
      </div>
    </footer>
  );
}
