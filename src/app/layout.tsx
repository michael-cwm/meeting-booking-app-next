

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Mobile from "./components/MobileFrame";
import { ModalProvider } from "./context/ModalContext";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Meeting Booking",
  description: "Book your meetings easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">
      <body className={roboto.className}>
        <ModalProvider>
          <Mobile>
            {children}
          </Mobile>
        </ModalProvider>
      </body>
    </html>
  );
}