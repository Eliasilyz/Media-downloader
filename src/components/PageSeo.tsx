import { Helmet } from "react-helmet-async";

interface PageSeoProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
}

const SITE_NAME = "SaveFlow";
const BASE_URL = "https://tool.farelhanafi.my.id";

export function PageSeo({ title, description, canonical, keywords }: PageSeoProps) {
  const fullUrl = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@saveflow" />
    </Helmet>
  );
}
