import type { Metadata } from 'next';
import { Inter, Mohave, Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/Header/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mohave = Mohave({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-mohave',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Marketing Site Factory',
  description: 'Professional marketing websites for local businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mohave.variable} ${roboto.variable}`}>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
