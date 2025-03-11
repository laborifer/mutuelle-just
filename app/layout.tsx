import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Espace Adhérent - Mutuelle Just',
  description: 'Gérez votre contrat et vos remboursements en toute simplicité avec la Mutuelle Just',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={poppins.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 