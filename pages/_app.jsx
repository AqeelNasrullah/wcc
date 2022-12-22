import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "../styles/main.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" theme="dark" />
    </SessionProvider>
  );
}
