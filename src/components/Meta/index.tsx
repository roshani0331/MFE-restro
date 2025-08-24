import React from 'react';
import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  locale?: string;
}

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  locale = 'en',
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://restroworks.com';
  const fullUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content={locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
};