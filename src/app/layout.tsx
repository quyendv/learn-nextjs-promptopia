import { Metadata } from 'next';
import Nav from '~/components/Nav';
import Provider from '~/components/Provider';
import '~/styles/global.css';

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover and Share AI Prompts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
