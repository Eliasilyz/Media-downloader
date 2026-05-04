import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { DownloaderForm } from "@/components/DownloaderForm";
import { MediaResult } from "@/components/MediaResult";
import { AdSense } from "@/components/AdSense";
import { HistoryPanel } from "@/components/HistoryPanel";
import { PageSeo } from "@/components/PageSeo";
import { useHistory } from "@/hooks/use-history";
import { toast } from "sonner";
import type { UseMutationResult } from "@tanstack/react-query";

interface MediaItem {
  quality: string;
  url: string;
  type: string;
  label: string;
}

interface DownloadResult {
  success: boolean;
  platform: string;
  title?: string | null;
  thumbnail?: string | null;
  duration?: string | null;
  mediaType: string;
  media: MediaItem[];
  mp3?: string | null;
}

interface DownloadError {
  success: false;
  error: string;
  code: string;
}

interface PlatformConfig {
  id: string;
  name: string;
  tagline: string;
  placeholder: string;
  color: string;
  icon: React.ReactNode;
  seo: {
    title: string;
    description: string;
    canonical: string;
    keywords: string;
  };
  features: string[];
}

interface DownloaderPageProps {
  config: PlatformConfig;
  mutation: UseMutationResult<DownloadResult, Error, { data: { url: string } }>;
}

export function DownloaderPage({ config, mutation }: DownloaderPageProps) {
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState<DownloadError | null>(null);
  const { history, addHistory, clearHistory } = useHistory();

  const handleSubmit = useCallback((url: string) => {
    setResult(null);
    setError(null);

    mutation.mutate(
      { data: { url } },
      {
        onSuccess: (data) => {
          if (data.success) {
            setResult(data);
            addHistory({
              url,
              platform: config.id,
              title: data.title,
              thumbnail: data.thumbnail,
            });
            toast.success("Media berhasil ditemukan!");
          } else {
            const err = data as unknown as DownloadError;
            setError(err);
            toast.error(err.error || "Gagal mengambil media");
          }
        },
        onError: (err: Error & { data?: DownloadError }) => {
          const errData = err.data || { success: false as const, error: err.message || "Terjadi kesalahan. Coba lagi.", code: "FETCH_FAILED" };
          setError(errData);
          toast.error(errData.error);
        },
      }
    );
  }, [mutation, config.id, addHistory]);

  return (
    <>
      <PageSeo
        title={config.seo.title}
        description={config.seo.description}
        canonical={config.seo.canonical}
        keywords={config.seo.keywords}
      />

      <div className="min-h-screen bg-[#111827] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors mb-8 group"
            data-testid="btn-back"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: config.color + "22", color: config.color }}
              >
                {config.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{config.name}</h1>
                <p className="text-sm text-[#9CA3AF]">{config.tagline}</p>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {config.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#1F2937] text-[#9CA3AF] border border-[#374151]"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AdSense top */}
          <AdSense slot="downloader-top" size="small" className="mb-6" />

          {/* Downloader form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1F2937] rounded-2xl border border-[#374151] p-6 mb-6"
          >
            <DownloaderForm
              platform={config.id}
              placeholder={config.placeholder}
              onSubmit={handleSubmit}
              isLoading={mutation.isPending}
            />
          </motion.div>

          {/* Loading */}
          <AnimatePresence>
            {mutation.isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-[#9CA3AF]"
                data-testid="loading-state"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[#374151] flex items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-blue-400" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
                </div>
                <p className="text-sm font-medium">Menganalisis media...</p>
                <p className="text-xs text-[#6B7280] mt-1">Mohon tunggu sebentar</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {(result || error) && !mutation.isPending && (
              <div className="mb-6">
                <MediaResult
                  result={result}
                  error={error}
                  onClear={() => { setResult(null); setError(null); }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* AdSense below result */}
          {(result || error) && (
            <AdSense slot="downloader-result" size="medium" className="mb-8" />
          )}

          {/* SEO content */}
          <div className="mt-10 p-6 rounded-xl bg-[#1F2937] border border-[#374151]">
            <h2 className="text-lg font-semibold text-white mb-3">
              Cara Download dari {config.name.replace(" Downloader", "")}
            </h2>
            <ol className="space-y-2 text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <span>Buka aplikasi atau website {config.name.replace(" Downloader", "")} dan temukan konten yang ingin didownload.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <span>Salin (copy) URL/link dari konten tersebut.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <span>Tempel (paste) URL ke kolom input di atas dan klik tombol "Analyze".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                <span>Pilih kualitas yang diinginkan dan klik tombol "Download".</span>
              </li>
            </ol>
          </div>

          {/* History */}
          <HistoryPanel history={history} onClear={clearHistory} />
        </div>
      </div>
    </>
  );
}
