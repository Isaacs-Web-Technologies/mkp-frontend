import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';



export const metadata = {
  title: 'My Kitchen Power',
  description: 'Cook with AI, share with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Toaster />
        <main className='app'>
        {children}
        </main>
        </body>
    </html>
  )
}
