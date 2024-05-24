import React from 'react';
import Script from 'next/script'
import { Toaster } from 'react-hot-toast';
import { Providers } from '@/redux/provider'; 
import '../public/styles/globals.css';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export default function RootLayout({ children }) {
  const GTM_ID = 'GTM-PL87LPRW'; 

  return (
    <html lang="en">
<head>
        {/* Google Tag Manager Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6822803825285284"
          crossorigin="anonymous"
        ></Script>
        {/* New Monetag Script */}
        <Script 
        src="https://alwingulla.com/88/tag.min.js" 
        data-zone="67241" 
        async data-cfasync="false">
        </Script>
      </head>
      <body>
        <main className="app">
          <Toaster />
          <Providers>
            <ServiceWorkerRegister />
            {children}
          </Providers>
        </main>

        {/* Google Tag Manager NoScript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}
