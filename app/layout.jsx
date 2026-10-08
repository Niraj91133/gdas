import './globals.css';
import EyesCursor from '../components/EyesCursor';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
  title: 'GDAs — One Platform. All Solutions. | Ganesha Digital Ads',
  description: 'Digital Ka Saath, Aapke Business Ka Vikas. GDAs (Ganesha Digital Ads) helps businesses grow with Digital Marketing, Branding & Technology solutions all under one roof.',
  keywords: 'GDAs, Ganesha Digital Ads, Digital Marketing, Branding, Website Development, SEO, Social Media Marketing, Business Growth India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('gdas-theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'light') {
                  document.documentElement.classList.add('light-theme');
                } else {
                  document.documentElement.classList.add('dark-theme');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <EyesCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
