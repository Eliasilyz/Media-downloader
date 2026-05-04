import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, CheckCircle2, Clipboard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloaderFormProps {
  platform: string;
  placeholder: string;
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

function detectPlatformFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    if (host.includes("tiktok.com") || host.includes("vm.tiktok.com")) return "tiktok";
    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("facebook.com") || host.includes("fb.com") || host.includes("fb.watch")) return "facebook";
    if (host.includes("twitter.com") || host.includes("x.com") || host.includes("t.co")) return "twitter";
    if (host.includes("youtube.com") || host.includes("youtu.be")) return "youtube";
    return null;
  } catch {
    return null;
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function DownloaderForm({ platform, placeholder, onSubmit, isLoading }: DownloaderFormProps) {
  const [url, setUrl] = useState("");
  const [validState, setValidState] = useState<"idle" | "valid" | "invalid" | "wrong-platform">("idle");

  useEffect(() => {
    if (!url.trim()) {
      setValidState("idle");
      return;
    }
    if (!isValidUrl(url.trim())) {
      setValidState("invalid");
      return;
    }
    const detected = detectPlatformFromUrl(url.trim());
    if (!detected) {
      setValidState("invalid");
      return;
    }
    if (detected !== platform) {
      setValidState("wrong-platform");
      return;
    }
    setValidState("valid");
  }, [url, platform]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // Clipboard API not available
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    onSubmit(url.trim());
  };

  const borderColor =
    validState === "valid"
      ? "border-green-500/60 focus-within:border-green-400"
      : validState === "invalid" || validState === "wrong-platform"
      ? "border-red-500/60 focus-within:border-red-400"
      : "border-[#374151] focus-within:border-blue-500/60";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center rounded-xl border-2 transition-all duration-200 bg-[#1F2937] ${borderColor}`}>
        <div className="pl-4 text-[#6B7280]">
          <Search size={20} />
        </div>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-4 text-white placeholder-[#4B5563] text-sm md:text-base outline-none"
          data-testid="url-input"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Validation indicator */}
        <div className="pr-2 flex items-center gap-2">
          {url && validState === "valid" && (
            <CheckCircle2 size={18} className="text-green-400" />
          )}
          {url && (validState === "invalid" || validState === "wrong-platform") && (
            <AlertCircle size={18} className="text-red-400" />
          )}

          <button
            type="button"
            onClick={handlePaste}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#9CA3AF] hover:text-white bg-[#111827] hover:bg-[#374151] rounded-lg transition-colors border border-[#374151]"
            data-testid="btn-paste"
          >
            <Clipboard size={12} />
            Paste
          </button>

          <Button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 h-auto rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
            data-testid="btn-analyze"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                <span className="hidden sm:inline">Analyzing...</span>
              </div>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>
      </div>

      {/* Validation message */}
      <AnimatePresence>
        {validState === "wrong-platform" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-sm text-yellow-400 flex items-center gap-1.5"
          >
            <AlertCircle size={13} />
            URL ini bukan dari {platform.charAt(0).toUpperCase() + platform.slice(1)}. Tetap lanjutkan?
          </motion.p>
        )}
        {validState === "invalid" && url && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-sm text-red-400 flex items-center gap-1.5"
          >
            <AlertCircle size={13} />
            URL tidak valid. Pastikan format URL benar.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
