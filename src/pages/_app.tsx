import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "./b4g/context/authContext";

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
      <div className="b4g">
        <AuthProvider>
          <div className="flex-1 grow">
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </div>
    );
  }

  return <Component {...pageProps} />;
}
