import React from 'react';
import Script from 'next/script'
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/redux/provider'; // Assuming your Redux provider is here
import '../public/styles/globals.css';

export default function RootLayout({ children }) {
  const GTM_ID = 'GTM-PL87LPRW'; 

  return (
    <html lang="en">
      <Script id="google-tag-manager" 
      strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
    </Script>
      <body>
        <main className="app">
          <Toaster />
          <Providers>
            {children}
          </Providers>
        </main>
      

        </body>
        {/* <noscript
        dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }} 
    /> */}
    </html>
  );
};
