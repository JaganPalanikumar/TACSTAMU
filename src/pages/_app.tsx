import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "./b4g/context/authContext";
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
    return (
      <div className={`${jost.variable} ${modak.variable} b4g font-jost`}>
        <AuthProvider>
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </div>
    );
  }

  return <Component {...pageProps} />;
}
