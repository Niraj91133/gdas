import './globals.css';

export const metadata = {
  title: 'Moritz Petersen - Design Engineer',
  description: 'Ganesha Digital Ads',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grass-bg"></div>
        {children}
      </body>
    </html>
  );
}
