import { Metadata } from 'next';
import '~/styles/global.css';

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
}
