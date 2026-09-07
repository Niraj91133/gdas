import './globals.css';

export const metadata = {
  title: 'GDAs — Performance Paid Ads Agency | Scale Your Brand',
  description: 'GDAs (Ganesha Digital Ads) is a performance-driven paid acquisition agency helping DTC and high-growth brands scale with Meta, Google & TikTok ads.',
  keywords: 'GDAs, Ganesha Digital Ads, paid ads agency, digital marketing, Meta ads, Google ads, TikTok ads, conversion agency',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
