import Loading from "components/Loading";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "../styles/main.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const routeStart = () => setLoading(true);
  const routeEnd = () => setLoading(false);

  useEffect(() => {
    router.events.on("routeChangeStart", routeStart);
    router.events.on("routeChangeComplete", routeEnd);
    router.events.on("routeChangeError", routeEnd);

    return () => {
      router.events.off("routeChangeStart", routeStart);
      router.events.off("routeChangeComplete", routeEnd);
      router.events.off("routeChangeError", routeEnd);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SessionProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" theme="dark" />
    </SessionProvider>
  );
}
