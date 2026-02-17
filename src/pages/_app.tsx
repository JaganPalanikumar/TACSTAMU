import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "@/b4g/context/authContext";
import { Jost, Modak } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

const modak = Modak({
  subsets: ["latin"],
  weight: ["400"], // Modak is usually one weight
  variable: "--font-modak",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/TACS")) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
    );
  }

  if (router.pathname.startsWith("/b4g")) {
    const title = "Build4Good 2026";
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Hello this is B4G" />
          <meta name="theme-color" content="black" />

          {/* Open Graph */}
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content="Build4Good is a 1.5-day hackathon hosted by the Texas A&M
              Computing Society (TACS). In this event, teams of students
              collaborate on innovative projects based on curated prompts and
              challenges."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tacs.tamu.edu/b4g" />
          <meta
            property="og:image"
            content="https://tacs.tamu.edu/b4g/og-image.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://tacs.tamu.edu/b4g/og-image.png"
          />
        </Head>
        <div className={`${jost.variable} ${modak.variable} b4g font-jost`}>
          <AuthProvider>
            <div className="flex-1">
              <Component {...pageProps} />
            </div>
          </AuthProvider>
        </div>
      </>
    );
  }

  return <Component {...pageProps} />;
}
