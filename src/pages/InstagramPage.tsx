import { SiInstagram } from "react-icons/si";
import { useDownloadInstagram } from "@/lib/api";
import { DownloaderPage } from "./DownloaderPage";

const config = {
  id: "instagram",
  name: "Instagram Downloader",
  tagline: "Download Reel, foto, dan carousel Instagram kualitas HD",
  placeholder: "Paste link Instagram disini... (contoh: https://www.instagram.com/reel/...)",
  color: "#e1306c",
  icon: <SiInstagram size={20} />,
  seo: {
    title: "Instagram Downloader HD - Download Reel, Foto, Carousel Gratis | SaveFlow",
    description: "Download Reel, foto, dan carousel Instagram kualitas HD gratis tanpa aplikasi. Support foto tunggal, carousel multi-foto, dan Reel video.",
    canonical: "/dl/instagram",
    keywords: "download instagram reel, instagram photo downloader, save IG video, cara download foto instagram, instagram carousel download",
  },
  features: ["Reel Video", "Foto & Carousel", "Multi-Foto", "HD Quality", "Gratis"],
};

export default function InstagramPage() {
  const mutation = useDownloadInstagram();
  return <DownloaderPage config={config} mutation={mutation as Parameters<typeof DownloaderPage>[0]["mutation"]} />;
}