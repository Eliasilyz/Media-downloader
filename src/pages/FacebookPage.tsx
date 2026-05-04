import { SiFacebook } from "react-icons/si";
import { useDownloadFacebook } from "@/lib/api";
import { DownloaderPage } from "./DownloaderPage";

const config = {
  id: "facebook",
  name: "Facebook Downloader",
  tagline: "Download video Facebook publik dalam kualitas HD dan SD",
  placeholder: "Paste link video Facebook disini... (contoh: https://www.facebook.com/watch/...)",
  color: "#1877f2",
  icon: <SiFacebook size={20} />,
  seo: {
    title: "Facebook Video Downloader HD Gratis | SaveFlow",
    description: "Download video Facebook HD gratis dengan mudah. Support video publik dalam kualitas HD dan SD tanpa aplikasi tambahan.",
    canonical: "/dl/facebook",
    keywords: "download video facebook hd, facebook video downloader, cara download video facebook, save facebook video",
  },
  features: ["HD Quality", "SD Quality", "Video Publik", "Cepat", "Gratis"],
};

export default function FacebookPage() {
  const mutation = useDownloadFacebook();
  return <DownloaderPage config={config} mutation={mutation as Parameters<typeof DownloaderPage>[0]["mutation"]} />;
}