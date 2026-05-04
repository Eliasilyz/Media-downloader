import { SiYoutube } from "react-icons/si";
import { useDownloadYoutube } from "@/lib/api";
import { DownloaderPage } from "./DownloaderPage";

const config = {
  id: "youtube",
  name: "YouTube Downloader",
  tagline: "Download video YouTube dan konversi ke MP3 secara gratis",
  placeholder: "Paste link video YouTube disini... (contoh: https://www.youtube.com/watch?v=...)",
  color: "#ff0000",
  icon: <SiYoutube size={20} />,
  seo: {
    title: "YouTube Video Downloader & MP3 Converter Gratis | SaveFlow",
    description: "Download video YouTube dalam berbagai kualitas dan konversi ke MP3 secara gratis. Support resolusi 1080p, 720p, 480p, dan 360p.",
    canonical: "/dl/youtube",
    keywords: "youtube downloader, download video youtube, youtube to mp3, cara download youtube, save youtube video hd",
  },
  features: ["1080p HD", "720p", "MP3 Converter", "Multi-Quality", "Gratis"],
};

export default function YoutubePage() {
  const mutation = useDownloadYoutube();
  return <DownloaderPage config={config} mutation={mutation as Parameters<typeof DownloaderPage>[0]["mutation"]} />;
}