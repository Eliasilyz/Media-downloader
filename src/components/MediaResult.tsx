import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Music, Film, Image as ImageIcon,
  Copy, Check, Share2, Clock, AlertCircle,
  Lock, Globe, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

interface MediaResultProps {
  result: DownloadResult | null;
  error: DownloadError | null;
  onClear: () => void;
}

function downloadFile(url: string, filename?: string) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  if (filename) a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast.success("Download dimulai!");
}

function copyLink(url: string) {
  navigator.clipboard.writeText(url).then(() => {
    toast.success("Link berhasil disalin!");
  }).catch(() => {
    toast.error("Gagal menyalin link");
  });
}

function shareResult(title: string, url: string) {
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {});
  } else {
    copyLink(url);
  }
}

function getErrorIcon(code: string) {
  switch (code) {
    case "PRIVATE_CONTENT": return <Lock size={20} />;
    case "INVALID_URL": return <AlertCircle size={20} />;
    case "UNSUPPORTED": return <Globe size={20} />;
    default: return <AlertCircle size={20} />;
  }
}

function getQualityBadge(quality: string) {
  const badges: Record<string, { label: string; color: string }> = {
    hd: { label: "HD", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    "hd no watermark": { label: "HD NW", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    sd: { label: "SD", color: "bg-[#374151] text-[#9CA3AF] border-[#374151]" },
    normal: { label: "Normal", color: "bg-[#374151] text-[#9CA3AF] border-[#374151]" },
    mp3: { label: "MP3", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    audio: { label: "Audio", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  };
  const found = badges[quality.toLowerCase()];
  return found || { label: quality.toUpperCase(), color: "bg-[#374151] text-[#9CA3AF] border-[#374151]" };
}

function getTypeIcon(type: string) {
  switch (type) {
    case "audio": return <Music size={14} />;
    case "image": return <ImageIcon size={14} />;
    default: return <Film size={14} />;
  }
}

export function MediaResult({ result, error, onClear }: MediaResultProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = (url: string) => {
    copyLink(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-red-500/30 bg-red-500/5 p-6"
        data-testid="error-card"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 flex-shrink-0">
            {getErrorIcon(error.code)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Gagal Mengambil Media</h3>
            <p className="text-sm text-[#9CA3AF]">{error.error}</p>
            {error.code === "PRIVATE_CONTENT" && (
              <p className="text-xs text-[#6B7280] mt-2">
                Konten ini bersifat privat. Pastikan akun/post tersebut publik.
              </p>
            )}
          </div>
          <button
            onClick={onClear}
            className="text-[#6B7280] hover:text-white transition-colors"
            data-testid="btn-clear-error"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const videoItems = result.media.filter((m) => m.type === "video");
  const audioItems = result.media.filter((m) => m.type === "audio");
  const imageItems = result.media.filter((m) => m.type === "image");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#374151] bg-[#1F2937] overflow-hidden"
      data-testid="result-card"
    >
      {/* Media preview header */}
      <div className="flex flex-col sm:flex-row gap-4 p-5 border-b border-[#374151]">
        {result.thumbnail && (
          <div className="flex-shrink-0">
            <img
              src={result.thumbnail}
              alt={result.title || "Media thumbnail"}
              className="w-full sm:w-32 h-48 sm:h-20 object-cover rounded-lg bg-[#111827]"
              data-testid="result-thumbnail"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {result.title && (
            <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1.5" data-testid="result-title">
              {result.title}
            </h3>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">
              {result.platform}
            </span>
            {result.duration && (
              <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                <Clock size={11} />
                {result.duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF] capitalize">
              {getTypeIcon(result.mediaType)}
              {result.mediaType}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shareResult(result.title || "Media download", window.location.href)}
            className="p-2 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#374151] transition-colors"
            data-testid="btn-share"
            title="Bagikan"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={onClear}
            className="p-2 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#374151] transition-colors"
            data-testid="btn-clear-result"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Image carousel */}
      {imageItems.length > 0 && (
        <div className="p-5 border-b border-[#374151]">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Foto ({imageItems.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {imageItems.map((img, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden bg-[#111827] aspect-square">
                <img
                  src={img.url}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                  data-testid={`result-image-${idx}`}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => downloadFile(img.url, `photo-${idx + 1}.jpg`)}
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-400 transition-colors"
                    data-testid={`btn-download-image-${idx}`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={() => imageItems.forEach((img, idx) => downloadFile(img.url, `photo-${idx + 1}.jpg`))}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
            data-testid="btn-download-all-images"
          >
            <Download size={14} className="mr-2" />
            Download Semua Foto
          </Button>
        </div>
      )}

      {/* Video download buttons */}
      {videoItems.length > 0 && (
        <div className="p-5 border-b border-[#374151] last:border-b-0">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Download Video
          </p>
          <div className="space-y-2">
            {videoItems.map((item, idx) => {
              const badge = getQualityBadge(item.quality);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#111827] border border-[#374151] hover:border-blue-500/30 transition-all group"
                  data-testid={`download-item-${idx}`}
                >
                  <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="p-1.5 rounded-md text-[#6B7280] hover:text-white hover:bg-[#374151] transition-colors"
                      data-testid={`btn-copy-${idx}`}
                      title="Salin link"
                    >
                      {copiedUrl === item.url ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                    <Button
                      onClick={() => downloadFile(item.url)}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white h-8 px-3 text-xs"
                      data-testid={`btn-download-${idx}`}
                    >
                      <Download size={12} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Audio/MP3 download */}
      {audioItems.length > 0 && (
        <div className="p-5">
          <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
            Download Audio / MP3
          </p>
          <div className="space-y-2">
            {audioItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#111827] border border-purple-500/20 hover:border-purple-500/40 transition-all"
                data-testid={`audio-item-${idx}`}
              >
                <div className="p-1.5 rounded bg-purple-500/10 text-purple-400">
                  <Music size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border bg-purple-500/20 text-purple-400 border-purple-500/30">
                    MP3
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="p-1.5 rounded-md text-[#6B7280] hover:text-white hover:bg-[#374151] transition-colors"
                    data-testid={`btn-copy-audio-${idx}`}
                  >
                    {copiedUrl === item.url ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                  <Button
                    onClick={() => downloadFile(item.url, "audio.mp3")}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-3 text-xs"
                    data-testid={`btn-download-audio-${idx}`}
                  >
                    <Download size={12} className="mr-1" />
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
