import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
  type?: "website" | "article" | "profile";
  locale?: string;
  alternates?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateMetadata = ({
  title = `Favor Select E-Commerce`,
  description = `Favor Select is a online e-commerce platform for shoping`,
  icons = [
    {
      rel: "icon",
      url: "/icons/icon-dark.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icons/icon.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  keywords = [
    "AI marketing automation",
    "social media marketing",
    "content generation",
    "marketing analytics",
    "campaign management",
    "multilingual marketing",
    "AI copywriting",
    "marketing workflow",
    "performance tracking",
    "digital marketing tools",
  ],
  author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL("https://vetra-platform.vercel.app");

  return {
    metadataBase,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: process.env.NEXT_PUBLIC_APP_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons,
  };
};
