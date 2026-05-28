import type {Metadata} from 'next';
import './globals.css';
import ClientErrorObserver from '@/components/client-error-observer';

export const metadata: Metadata = {
  title: 'FraternitasQ — Investigación sobre la Fraternidad en Chile',
  description: 'Estudio de sociología computacional sobre las dimensiones latentes de la Fraternidad en el Chile contemporáneo. Corporación Aurora de Italia · Metodología Talk to the City.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ClientErrorObserver />
        {children}
      </body>
    </html>
  );
}
