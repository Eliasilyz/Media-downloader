import { useState } from "react";

// ============================================================
// STUB — Ganti implementasi ini ketika API/scraper sudah siap
// ============================================================

export interface DownloadResult {
  // Sesuaikan dengan shape response API kamu nanti
  title?: string;
  thumbnail?: string;
  downloads: Array<{
    label: string;      // e.g. "HD 1080p", "MP3", "No Watermark"
    url: string;
    ext?: string;       // e.g. "mp4", "mp3"
  }>;
}

export interface DownloadMutation {
  mutate: (payload: { url: string }) => void;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: DownloadResult | undefined;
  error: Error | null;
  reset: () => void;
}

function useDownloadStub(platform: string): DownloadMutation {
  const [state, setState] = useState<{
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: DownloadResult | undefined;
    error: Error | null;
  }>({
    isPending: false,
    isSuccess: false,
    isError: false,
    data: undefined,
    error: null,
  });

  const mutate = async ({ url }: { url: string }) => {
    setState({ isPending: true, isSuccess: false, isError: false, data: undefined, error: null });

    // TODO: Ganti dengan fetch ke endpoint API kamu
    // Contoh:
    // const res = await fetch(`/api/download/${platform}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ url }),
    // });
    // const data = await res.json();

    // Simulasi loading sementara
    await new Promise((r) => setTimeout(r, 1000));
    setState({
      isPending: false,
      isSuccess: false,
      isError: true,
      data: undefined,
      error: new Error(`API ${platform} belum tersedia. URL: ${url}`),
    });
  };

  const reset = () =>
    setState({ isPending: false, isSuccess: false, isError: false, data: undefined, error: null });

  return { mutate, reset, ...state };
}

export const useDownloadYoutube    = () => useDownloadStub("youtube");
export const useDownloadTiktok     = () => useDownloadStub("tiktok");
export const useDownloadInstagram  = () => useDownloadStub("instagram");
export const useDownloadFacebook   = () => useDownloadStub("facebook");
export const useDownloadTwitter    = () => useDownloadStub("twitter");