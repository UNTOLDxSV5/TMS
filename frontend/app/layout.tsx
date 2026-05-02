import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FMAE-TMS',
  description: 'Team Management System for competitions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
