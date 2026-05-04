import { motion } from "framer-motion";
import { Clock, Trash2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { HistoryItem } from "@/hooks/use-history";
import { SiTiktok, SiInstagram, SiFacebook, SiX, SiYoutube } from "react-icons/si";

const platformColors: Record<string, string> = {
  tiktok: "#ff0050",
  instagram: "#e1306c",
  facebook: "#1877f2",
  twitter: "#1da1f2",
  youtube: "#ff0000",
};

const platformPaths: Record<string, string> = {
  tiktok: "/dl/tiktok",
  instagram: "/dl/instagram",
  facebook: "/dl/facebook",
  twitter: "/dl/twitter",
  youtube: "/dl/youtube",
};

const platformIcons: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  tiktok: SiTiktok as React.ComponentType<{ size?: number; color?: string }>,
  instagram: SiInstagram as React.ComponentType<{ size?: number; color?: string }>,
  facebook: SiFacebook as React.ComponentType<{ size?: number; color?: string }>,
  twitter: SiX as React.ComponentType<{ size?: number; color?: string }>,
  youtube: SiYoutube as React.ComponentType<{ size?: number; color?: string }>,
};

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onClear: () => void;
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-10" data-testid="history-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-[#9CA3AF]" />
          <h2 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider">
            Riwayat Download
          </h2>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-red-400 transition-colors"
          data-testid="btn-clear-history"
        >
          <Trash2 size={12} />
          Hapus Riwayat
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map((item, idx) => {
          const Icon = platformIcons[item.platform] || SiTiktok;
          const color = platformColors[item.platform] || "#3B82F6";
          const path = platformPaths[item.platform] || "/";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#4B5563] transition-all group"
              data-testid={`history-item-${idx}`}
            >
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-[#111827]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} color={color} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  {item.title || item.url}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon size={10} color={color} />
                  <span className="text-xs text-[#6B7280] capitalize">{item.platform}</span>
                  <span className="text-xs text-[#4B5563]">·</span>
                  <span className="text-xs text-[#4B5563]">{timeAgo(item.timestamp)}</span>
                </div>
              </div>

              <Link
                href={path}
                className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#374151] transition-colors opacity-0 group-hover:opacity-100"
                data-testid={`history-link-${idx}`}
              >
                <ExternalLink size={13} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
