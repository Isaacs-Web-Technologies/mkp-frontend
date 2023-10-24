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
                <link rel="canonical" href="https://mykitchenpower-c3ab88b9a2f9.herokuapp.com/" />
                <meta name="language" content="EN" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />

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
