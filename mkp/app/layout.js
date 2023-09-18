// import { Navbar } from '@/components/navbar/NavBar';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
// import { usePathname, useRouter } from 'next/navigation'


export const metadata = {
  title: 'My Kitchen Power',
  description: 'Cook with AI, share with ease',
}

const RootLayout = ({ children }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const pagesWithoutNavbar = ['/signUp', '/signIn']

  // const shouldRenderNavbar = !pagesWithoutNavbar.includes(router.pathname);
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

export default RootLayout;