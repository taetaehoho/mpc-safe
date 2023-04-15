import '@/styles/globals.css'
import { Toaster } from "react-hot-toast";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const toastOptions = {
    style: {
      background: "rgba(0, 0, 0)",
      color: "#ffffff",
    },
    success: {
      className: `${inter.className} border border-green-500`,
      iconTheme: {
        primary: "#10B981",
        secondary: "white",
      },
    },
    error: {
      className: `${inter.className}` + " border border-red-500",
      iconTheme: {
        primary: "#EF4444",
        secondary: "white",
      },
    },
    loading: { className: `${inter.className}` + " border border-yello-300" },
  };
  return (
    <>
      <Toaster position="top-right" toastOptions={toastOptions} />
      <Component {...pageProps} />
    </>

  )
}
