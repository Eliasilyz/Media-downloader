import { SiX } from "react-icons/si";
import { useDownloadTwitter } from "@/lib/api";
import { DownloaderPage } from "./DownloaderPage";

const config = {
  id: "twitter",
  name: "Twitter / X Downloader",
  tagline: "Download video Twitter dan X dalam berbagai kualitas",
  placeholder: "Paste link tweet/post X disini... (contoh: https://twitter.com/user/status/...)",
  color: "#1da1f2",
  icon: <SiX size={20} />,
  seo: {
    title: "Twitter/X Video Downloader HD Gratis | SaveFlow",
    description: "Download video Twitter dan X (formerly Twitter) dalam kualitas HD dan SD. Cepat, gratis, dan tanpa aplikasi tambahan.",
    canonical: "/dl/twitter",
    keywords: "twitter video downloader, download video twitter, save twitter video hd, x video download, cara download video twitter",
  },
  features: ["HD Quality", "SD Quality", "Multi-Quality", "Cepat", "Gratis"],
};

export default function TwitterPage() {
  const mutation = useDownloadTwitter();
  return <DownloaderPage config={config} mutation={mutation as Parameters<typeof DownloaderPage>[0]["mutation"]} />;
}