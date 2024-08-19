import type { Metadata } from 'next';
import 'minireset.css';

export const metadata: Metadata = {
  title: 'React Modal Demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="portal--modal" />
      </body>
    </html>
  );
}
