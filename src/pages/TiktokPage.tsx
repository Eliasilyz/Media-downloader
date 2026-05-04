import { SiTiktok } from "react-icons/si";
import { useDownloadTiktok } from "@/lib/api";
import { DownloaderPage } from "./DownloaderPage";

const config = {
  id: "tiktok",
  name: "TikTok Downloader",
  tagline: "Download video TikTok tanpa watermark dalam kualitas HD",
  placeholder: "Paste link video TikTok disini... (contoh: https://www.tiktok.com/@user/video/...)",
  color: "#ff0050",
  icon: <SiTiktok size={20} />,
  seo: {
    title: "TikTok Video Downloader Tanpa Watermark HD Gratis | SaveFlow",
    description: "Download video TikTok tanpa watermark gratis dalam kualitas HD secara cepat tanpa aplikasi. Support video, slide foto, dan ekstraksi audio MP3.",
    canonical: "/dl/tiktok",
    keywords: "download video tiktok tanpa watermark, tiktok downloader hd, save tiktok no wm, tiktok video download, cara download tiktok",
  },
  features: ["HD No Watermark", "Slide Foto", "Ekstraksi MP3", "Cepat", "Gratis"],
};

export default function TiktokPage() {
  const mutation = useDownloadTiktok();
  return <DownloaderPage config={config} mutation={mutation as Parameters<typeof DownloaderPage>[0]["mutation"]} />;
}