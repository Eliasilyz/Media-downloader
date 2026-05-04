import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Download, Zap } from "lucide-react";
import { SiTiktok, SiInstagram, SiFacebook, SiX, SiYoutube } from "react-icons/si";

const platforms = [
  { name: "TikTok", path: "/dl/tiktok", icon: SiTiktok, color: "#ff0050" },
  { name: "Instagram", path: "/dl/instagram", icon: SiInstagram, color: "#e1306c" },
  { name: "Facebook", path: "/dl/facebook", icon: SiFacebook, color: "#1877f2" },
  { name: "Twitter", path: "/dl/twitter", icon: SiX, color: "#1da1f2" },
  { name: "YouTube", path: "/dl/youtube", icon: SiYoutube, color: "#ff0000" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111827]/95 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" data-testid="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center group-hover:bg-blue-400 transition-colors">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Save<span className="text-blue-400">Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {platforms.map((p) => {
              const Icon = p.icon;
              const isActive = location === p.path;
              return (
                <Link
                  key={p.path}
                  href={p.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]"
                  }`}
                  data-testid={`nav-${p.name.toLowerCase()}`}
                >
                  <Icon size={13} style={{ color: isActive ? p.color : undefined }} />
                  {p.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#1F2937] bg-[#111827] px-4 py-3 space-y-1">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.path}
                href={p.path}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all"
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-${p.name.toLowerCase()}`}
              >
                <Icon size={15} style={{ color: p.color }} />
                {p.name} Downloader
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
