import BackToTop from "@/components/BackToTopBtn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import store, { persistor } from "@/store/store";
import "@/styles/globals.css";
import { getSeoDetails } from "@/utils/api";
import type { AppProps } from "next/app";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import GlobelPopUp from "@/components/GlobelPopUp";

interface SeoDetails {
  id: number;
  url: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  meta_robot: string;
  header_script: string;
  footer_script: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;
  const [isGlobOpen, setGlobOpen] = useState(false);

  // Initialize seoDetails with an empty object or a default structure
  const [seoDetails, setSeoDetails] = useState<SeoDetails | null>(null);

  useEffect(() => {
    const fetchSeoDetails = async () => {
      try {
        const response = await getSeoDetails(baseUrl);
        setSeoDetails(response);
      } catch (error) {
        console.error("Error fetching SEO details:", error);
      }
    };

    fetchSeoDetails();
  }, [baseUrl, pathname]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGlobOpen(true);
    }, 50000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>{seoDetails?.meta_title || "Home"}</title>
            <meta
              name="description"
              content={seoDetails?.meta_description || "Default description"}
            />
            <meta
              name="keywords"
              content={seoDetails?.meta_keyword || "default, keywords"}
            />
            <meta
              name="robots"
              content={seoDetails?.meta_robot || "index, follow"}
            />
            {/* Add other meta tags as needed */}
          </Head>
          <Header
            pathName={pathname}
            script={seoDetails?.header_script ?? ""}
          />
          <main className="container mx-auto pt-0">
            <Component {...pageProps} />
          </main>
          {seoDetails?.footer_script && (
            <script type="text/javascript">{seoDetails?.footer_script}</script>
          )}
          <Footer script={seoDetails?.footer_script ?? ""} />
          <GlobelPopUp isOpen={isGlobOpen} onClose={() => setGlobOpen(false)} />
          <BackToTop />
        </PersistGate>
      </Provider>
    </>
  );
}
