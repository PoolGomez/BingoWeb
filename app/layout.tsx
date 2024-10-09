import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Providers } from './Providers';
import SessionWrapper from '@/components/SessionWrapper';
export const metadata: Metadata = {
  title: {
    template: '%s | Bingo',
    default: 'Bingo Web',
  },
  description: 'Bingo Web by Pool Gomez',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons:'/img/logo-ina.png'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* <Providers>
        {children}
        </Providers> */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
        
        </body>
    </html>
  );
}
