import { Link } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111827] pt-24 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-[#374151] flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={36} className="text-[#4B5563]" />
        </div>
        <h1 className="text-6xl font-extrabold text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-[#9CA3AF] mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-[#6B7280] mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors"
        >
          <Home size={16} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
