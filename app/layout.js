// layout.js
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { Providers } from '@/redux/provider';

export const metadata = {
  title: "My Kitchen Power",
  description: "Cook with AI, share with ease",
};

function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="follow, index" />
                <link rel="canonical" href="YOUR_WEBSITE_URL_HERE" />
                <meta name="language" content="EN" />
            </Head>
            <body>
                <Toaster />
                <main className='app'>
                    <Providers>
                        {children}
                    </Providers>
                </main>
            </body>
        </html>
    );
}

export default RootLayout;
